
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
  Mehendi: "/images/Evevnt-cards/Mehandi-card.png",
  Mehandi: "/images/Evevnt-cards/Mehandi-card.png",
  Engagement: "/images/Evevnt-cards/Engagement-card.png",
  Sangeet: "/images/Evevnt-cards/Sangeet-card.png",
  Haldi: "/images/Evevnt-cards/Haldi-card.png",
  Bhaat: "/images/Evevnt-cards/Bhaat-card.png",
  Shaadi: "/images/Evevnt-cards/Shaadi-card.png",
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
  const [flippedEvent, setFlippedEvent] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSelect = (item: WeddingEvent) => {
    if (onSelectEvent) {
      onSelectEvent(item);
    } else {
      setInternalEvent(item);
    }
  };

  const handleCardClick = (item: WeddingEvent, index: number) => {
    if (index !== currentIndex) {
      scrollToIndex(index);
    }
    setFlippedEvent((prev) => (prev === item.name ? null : item.name));
    setIsPaused(true);
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
        setFlippedEvent(null);
      }
    },
    [events.length]
  );

  // Manual pagination
  const handleDotClick = (index: number) => {
    scrollToIndex(index);
    setIsPaused(true);
    setFlippedEvent(null);
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
    if (isPaused || events.length <= 1 || flippedEvent !== null) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        const nextIndex =
          previousIndex >= events.length - 1
            ? 0
            : previousIndex + 1;

        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 7000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, events.length, scrollToIndex, flippedEvent]);

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
              const isFlipped = flippedEvent === item.name;

              return (
                <div
                  key={item.name}
                  className={`event-scroll-item ${isActive ? "is-active" : ""
                    } ${isFlipped ? "is-card-flipped" : ""}`}
                >
                  <div
                    className={`event-card-flipper ${isFlipped ? "flipped" : ""
                      }`}
                    onClick={() => handleCardClick(item, index)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isFlipped}
                    aria-label={`${item.name} ceremony card. Tap to ${isFlipped ? "flip back" : "flip open for details"
                      }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(item, index);
                      }
                    }}
                  >
                    <div className="event-card-inner">
                      {/* FRONT OF CARD */}
                      <div className="event-card-front">
                        {/* Date Badge */}
                        <div className="event-card-header-badge">
                          <span className="badge-idx">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="badge-dt">{item.date}</span>
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
                          <span>{isFlipped ? "Tap to close ↺" : "Tap to flip open ↻"}</span>
                        </div>
                      </div>

                      {/* BACK OF CARD (FLIP OPEN VIEW) */}
                      <div className="event-card-back">
                        <div className="event-card-back-frame">
                          <div className="back-top-emblem" aria-hidden="true">
                            <svg
                              width="30"
                              height="20"
                              viewBox="0 0 34 22"
                              fill="none"
                            >
                              <path
                                d="M17 1.5 C15 6 14.5 13 17 18 C19.5 13 19 6 17 1.5 Z"
                                stroke="#9c6827"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17 18 C12 16 8 9 9.5 5 C11.5 8 14 13 17 18 Z"
                                stroke="#9c6827"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M17 18 C22 16 26 9 24.5 5 C22.5 8 20 13 17 18 Z"
                                stroke="#9c6827"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M7 19.5 C12 21 22 21 27 19.5"
                                stroke="#9c6827"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          <div className="back-badge">
                            <span>
                              {item.date} · {item.year || "2025"}
                            </span>
                          </div>

                          <h3 className="back-ceremony-title">
                            {item.name}
                          </h3>

                          <div className="back-divider" aria-hidden="true">
                            <span className="back-divider-line" />
                            <span className="back-divider-flower">✿</span>
                            <span className="back-divider-line" />
                          </div>

                          <p className="back-note">{item.note}</p>

                          <div className="back-time-location">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#8f5c1d"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>
                              {item.timeLocation ||
                                "Sangam Courtyard · 5:00 PM onwards"}
                            </span>
                          </div>

                          <div className="back-actions">
                            <button
                              type="button"
                              className="back-btn back-btn-flip"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlippedEvent(null);
                              }}
                              aria-label="Flip card back"
                            >
                              <span>Flip back ↺</span>
                            </button>

                            <button
                              type="button"
                              className="back-btn back-btn-modal"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(item);
                              }}
                              aria-label="View more details in popup"
                            >
                              <span>Details ↗</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
