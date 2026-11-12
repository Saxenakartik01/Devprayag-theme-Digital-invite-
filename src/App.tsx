import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { MusicPlayer } from "./components/MusicPlayer";
import { DateSection } from "./sections/DateSection";
import { StorySection } from "./sections/StorySection";
import { CoupleSection } from "./sections/CoupleSection";
import { EventsSection } from "./sections/EventsSection";
import { VenueSection } from "./sections/VenueSection";
import { GallerySection } from "./sections/GallerySection";
import { RSVPSection } from "./sections/RSVPSection";
import { FinaleSection } from "./sections/FinaleSection";
import type { WeddingEvent } from "./data/wedding";

export function App() {
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);
  const [heroVideoEnded, setHeroVideoEnded] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.16 }
    );

    const observeAll = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    };

    observeAll();

    // Re-observe when DateSection is revealed dynamically
    const mutation = new MutationObserver(() => {
      observeAll();
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      mutation.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="invitation-shell">
      <DateSection
        onScrollCue={() => scrollTo("date")}
        onVideoEnd={() => setHeroVideoEnded(true)}
        onReplay={() => setHeroVideoEnded(false)}
      />

      <CoupleSection />
      <EventsSection onSelectEvent={setSelectedEvent} />
      <VenueSection />
      <GallerySection />
      <RSVPSection />
      <FinaleSection onReturnToTop={() => scrollTo("home")} />

      {/* Floating Music Button in Bottom Right (shows and plays devbhoomi-music.mp3 after video end) */}
      <MusicPlayer isVisible={heroVideoEnded} src="/devbhoomi-music.mp3" />

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        ariaLabel={selectedEvent ? `${selectedEvent.name} details` : undefined}
      >
        {selectedEvent && (
          <>
            <p>{selectedEvent.date} · {selectedEvent.year || "2025"}</p>
            <h2>{selectedEvent.name}</h2>
            <span>{selectedEvent.note}</span>
            <small>
              {selectedEvent.timeLocation || "Sangam Courtyard · 5:00 PM onwards"}
            </small>
            <button
              className="modal-done"
              onClick={() => setSelectedEvent(null)}
            >
              See you there
            </button>
          </>
        )}
      </Modal>
    </main>
  );
}

export default App;