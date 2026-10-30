
import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { Section } from "../components/Section";
import { Modal } from "../components/Modal";
import {
  weddingEvents,
  type WeddingEvent,
} from "../data/wedding";

export interface EventsSectionProps {
  events?: WeddingEvent[];
  onSelectEvent?: (event: WeddingEvent) => void;
}

const eventCardImages: Record<string, string> = {
  Mayra: "/images/Evevnt-cards/Mayra-card.png",
  Shagun: "/images/Evevnt-cards/Shagun-card.png",
  Cocktail: "/images/Evevnt-cards/Cocktail-card.png",
  Tilak: "/images/Evevnt-cards/Tilak-card.png",
  Engagement: "/images/Evevnt-cards/Engagement-card.png",
  Bhaat: "/images/Evevnt-cards/Bhaat-card.png",
  Varmala: "/images/Evevnt-cards/Varmala-card.png",
  Pheras: "/images/Evevnt-cards/Pheras-card.png",
  Reception: "/images/Evevnt-cards/Reception-card.png",
  Vidaai: "/images/Evevnt-cards/Vidaai-card.png",
};

export function EventsSection({
  events = weddingEvents,
  onSelectEvent,
}: EventsSectionProps) {
  const [internalEvent, setInternalEvent] =
    useState<WeddingEvent | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSelect = (item: WeddingEvent) => {
    if (onSelectEvent) {
      onSelectEvent(item);
    } else {
      setInternalEvent(item);
    }
  };

  // Scroll to a particular event card
  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollContainerRef.current;
      if (!el || events.length === 0) return;

      const items =
        el.querySelectorAll<HTMLElement>(".event-scroll-item");

      const target = items[index];

      if (target) {
        el.scrollTo({
          left:
            target.offsetLeft -
            el.offsetLeft -
            (el.clientWidth - target.offsetWidth) / 2,
          behavior: "smooth",
        });

        setCurrentIndex(index);
      }
    },
    [events.length]
  );

  // Manual pagination
  const handleDotClick = (index: number) => {
    scrollToIndex(index);
    setIsPaused(true);
  };

  // Automatically update active event during manual or automatic scrolling
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const items =
          el.querySelectorAll<HTMLElement>(".event-scroll-item");

        const containerCenter =
          el.getBoundingClientRect().left + el.clientWidth / 2;

        let closestIdx = 0;
        let minDiff = Infinity;

        items.forEach((item, idx) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const diff = Math.abs(containerCenter - itemCenter);

          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        setCurrentIndex(closestIdx);
      });
    };

    el.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [events.length]);

  // Automatic horizontal scrolling
  useEffect(() => {
    if (isPaused || events.length <= 1) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        const nextIndex =
          previousIndex >= events.length - 1
            ? 0
            : previousIndex + 1;

        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 2000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, events.length, scrollToIndex]);

  // Current active ceremony
  const activeCeremony =
    events[currentIndex] || events[0];

  return (
    <>
      <Section
        id="events"
        image="/images/backgrounds/Event-page.png"
        className="events-scene"
      >
        {/* Section Header */}
        <header className="event-header-title" data-reveal>
          <p className="event-eyebrow">
            Sacred Rituals & Celebrations
          </p>

          <h2 className="event-main-title">
            Our Celebrations
          </h2>

          <div className="event-count-badge">
            <span className="badge-seq">
              Ceremony{" "}
              {String(currentIndex + 1).padStart(2, "0")}
              {" "}of{" "}
              {String(events.length).padStart(2, "0")}
            </span>

            <span className="badge-divider">·</span>

            <strong className="badge-name">
              {activeCeremony?.name}
            </strong>
          </div>
        </header>

        {/* Scrollable Event Cards */}
        <div
          className="events-carousel-shell"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (
              !e.currentTarget.contains(
                e.relatedTarget as Node | null
              )
            ) {
              setIsPaused(false);
            }
          }}
        >
          {/* Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="events-scroll-track"
            role="region"
            aria-label="Wedding Events Carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollToIndex(
                  Math.max(0, currentIndex - 1)
                );
              }

              if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollToIndex(
                  Math.min(
                    events.length - 1,
                    currentIndex + 1
                  )
                );
              }
            }}
          >
            {events.map((item, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={item.name}
                  className={`event-scroll-item ${isActive ? "is-active" : ""
                    }`}
                >
                  <button
                    type="button"
                    className={`event-card-btn event-card-${item.className}`}
                    onClick={() => handleSelect(item)}
                    aria-label={`View ceremony details for ${item.name}`}
                  >
                    {/* Date Badge */}
                    <div className="event-card-header-badge">
                      <span className="badge-idx">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="badge-dt">
                        {item.date}
                      </span>
                    </div>

                    {/* Event Image */}
                    <img
                      src={
                        eventCardImages[item.name] ||
                        "/images/Evevnt-cards/Mayra-card.png"
                      }
                      alt={`${item.name} Event Card`}
                      className="event-card-img"
                      loading="eager"
                      decoding="async"
                    />

                    {/* Tap Cue */}
                    <div className="event-card-tap-cue">
                      <span>Tap to view details</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <footer className="event-carousel-footer">
          <div
            className="event-dots-bar"
            role="tablist"
            aria-label="Ceremony pagination"
          >
            {events.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                className={`event-dot ${index === currentIndex ? "is-active" : ""
                  }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to ${item.name}`}
                aria-selected={index === currentIndex}
              />
            ))}
          </div>

          <p className="event-scroll-hint">
            <span>‹</span> Swipe or scroll to explore all{" "}
            {events.length} ceremonies <span>›</span>
          </p>
        </footer>

        {/* Bottom Lotus Flowers */}
        <div
          className="event-bottom-flowers-frame"
          aria-hidden="true"
        >
          <img
            src="/images/events/bottom_lotus.png"
            alt=""
            className="event-bottom-lotus-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </Section>

      {/* Event Details Modal */}
      {!onSelectEvent && (
        <Modal
          isOpen={!!internalEvent}
          onClose={() => setInternalEvent(null)}
          ariaLabel={
            internalEvent
              ? `${internalEvent.name} details`
              : undefined
          }
        >
          {internalEvent && (
            <>
              <p>
                {internalEvent.date} ·{" "}
                {internalEvent.year || "2025"}
              </p>

              <h2>{internalEvent.name}</h2>

              <span>{internalEvent.note}</span>

              <small>
                {internalEvent.timeLocation ||
                  "Sangam Courtyard · 5:00 PM onwards"}
              </small>

              <button
                className="modal-done"
                onClick={() => setInternalEvent(null)}
              >
                See you there
              </button>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default EventsSection;
