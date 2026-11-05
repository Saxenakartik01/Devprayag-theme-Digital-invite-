import React, { useState, useRef, useEffect, useCallback } from "react";

export interface DraggableDecorProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  /** Maximum radius in px the element can be moved from its resting origin (0, 0) */
  maxRadius?: number;
}

/**
 * DraggableDecor provides interactive drag-and-release functionality
 * for decorative elements (e.g., boats).
 *
 * Interaction Flow:
 * 1. User can drag the element within a constrained radius area (default 12px).
 * 2. While dragging, the element smoothly follows the finger/mouse within that radius.
 * 3. On release:
 *    - Element stays at the dropped position for EXACTLY 1 second.
 *    - Then smoothly animates back to its original position (0, 0) with an elegant easing effect.
 *    - Restores exact original position, size, rotation, and alignment.
 * 4. Repeated dragging is fully supported without glitches or transform conflicts.
 */
export function DraggableDecor({
  children,
  className = "",
  style,
  ariaLabel,
  maxRadius = 12,
}: DraggableDecorProps) {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const itemRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  // Timers for 1-second delay and return animation completion
  const returnTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);

  // Boundary limits to keep element within parent section
  const boundsRef = useRef<{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);

  // Sync ref with state
  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (returnTimerRef.current !== null) {
        window.clearTimeout(returnTimerRef.current);
      }
      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
      }
    };
  }, []);

  const clearPendingTimers = useCallback(() => {
    if (returnTimerRef.current !== null) {
      window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = null;
    }
    if (finishTimerRef.current !== null) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle primary button (left click) or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    // Prevent default browser behavior (such as text selection or touch gestures)
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    clearPendingTimers();

    const item = itemRef.current;
    let currentX = offsetRef.current.x;
    let currentY = offsetRef.current.y;

    // If mid-return animation, sample current rendered transform to avoid jumps
    if (isReturning && item) {
      try {
        const computed = window.getComputedStyle(item).transform;
        if (computed && computed !== "none") {
          const matrix = new DOMMatrixReadOnly(computed);
          currentX = matrix.m41;
          currentY = matrix.m42;
        }
      } catch {
        // Fallback to offsetRef
      }
      setIsReturning(false);
    }

    if (typeof maxRadius === "number" && maxRadius > 0) {
      const dist = Math.hypot(currentX, currentY);
      if (dist > maxRadius) {
        const factor = maxRadius / dist;
        currentX *= factor;
        currentY *= factor;
      }
    }

    offsetRef.current = { x: currentX, y: currentY };
    setOffset({ x: currentX, y: currentY });

    // Set pointer capture for reliable tracking across viewport
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Browser fallback
    }

    pointerIdRef.current = e.pointerId;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    startOffsetRef.current = { x: currentX, y: currentY };
    setIsDragging(true);
    isDraggingRef.current = true;

    // Compute bounds relative to parent section so item remains strictly within boundaries
    if (item) {
      const section =
        (item.closest("section") ||
          item.closest(".section-container") ||
          item.offsetParent) as HTMLElement | null;

      if (section) {
        const sRect = section.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();

        const rawMinX = sRect.left - iRect.left + currentX;
        const rawMaxX = sRect.right - iRect.right + currentX;
        const rawMinY = sRect.top - iRect.top + currentY;
        const rawMaxY = sRect.bottom - iRect.bottom + currentY;

        boundsRef.current = {
          minX: Math.min(currentX, rawMinX),
          maxX: Math.max(currentX, rawMaxX),
          minY: Math.min(currentY, rawMinY),
          maxY: Math.max(currentY, rawMaxY),
        };
      } else {
        boundsRef.current = null;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return;

    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;

    let targetX = startOffsetRef.current.x + dx;
    let targetY = startOffsetRef.current.y + dy;

    // Constrain movement strictly within maxRadius area (e.g. 12px radius from origin)
    if (typeof maxRadius === "number" && maxRadius > 0) {
      const distance = Math.hypot(targetX, targetY);
      if (distance > maxRadius) {
        const factor = maxRadius / distance;
        targetX *= factor;
        targetY *= factor;
      }
    }

    // Clamp within parent boundaries
    if (boundsRef.current) {
      targetX = Math.max(boundsRef.current.minX, Math.min(boundsRef.current.maxX, targetX));
      targetY = Math.max(boundsRef.current.minY, Math.min(boundsRef.current.maxY, targetY));
    }

    offsetRef.current = { x: targetX, y: targetY };
    setOffset({ x: targetX, y: targetY });
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    pointerIdRef.current = null;
    setIsDragging(false);
    isDraggingRef.current = false;

    // If offset is already 0, nothing to return
    if (offsetRef.current.x === 0 && offsetRef.current.y === 0) {
      return;
    }

    // Exact 1-second (1000ms) delay at dropped position before returning
    returnTimerRef.current = window.setTimeout(() => {
      returnTimerRef.current = null;

      // Animate smoothly back to exact original position (0, 0)
      setIsReturning(true);
      offsetRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });

      // After return transition completes (850ms), reset state
      finishTimerRef.current = window.setTimeout(() => {
        finishTimerRef.current = null;
        setIsReturning(false);
      }, 850);
    }, 1000);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === "transform" && isReturning) {
      setIsReturning(false);
      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }
    }
  };

  // Determine transform and transition styles
  const hasOffset = offset.x !== 0 || offset.y !== 0;
  const transformStyle =
    hasOffset || isReturning
      ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
      : undefined;

  const transitionStyle = isReturning
    ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
    : "none";

  return (
    <div
      ref={itemRef}
      className={`draggable-decor-item ${isDragging ? "is-dragging" : ""} ${isReturning ? "is-returning" : ""} ${className}`}
      style={{
        ...style,
        ...(transformStyle ? { transform: transformStyle } : {}),
        transition: transitionStyle,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onTransitionEnd={handleTransitionEnd}
      aria-label={ariaLabel}
      role="img"
    >
      <div className="draggable-decor-inner">{children}</div>
    </div>
  );
}

export default DraggableDecor;
