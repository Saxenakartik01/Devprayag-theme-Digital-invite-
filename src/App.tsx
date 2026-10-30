import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
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
  const [active, setActive] = useState("home");
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

    const sections = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-42% 0px -42%" }
    );

    const observeAll = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
      document.querySelectorAll(".scene").forEach((el) => sections.observe(el));
    };

    observeAll();

    // Re-observe when DateSection is revealed dynamically
    const mutation = new MutationObserver(() => {
      observeAll();
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      sections.disconnect();
      mutation.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="invitation-shell">
      <Navigation activeSection={active} onNavigate={scrollTo} />

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