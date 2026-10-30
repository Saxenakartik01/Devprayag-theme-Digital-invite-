import { useEffect, type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  ariaLabel,
  className = "",
  children,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={cn("event-modal", className)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
