
import { Section } from "../components/Section";
import { venueDetails, weddingImages } from "../data/wedding";

export function VenueSection() {
  // ==========================================
  // ADJUSTABLE SETTINGS
  // ==========================================

  // Venue card size and position
  const cardWidth = "min(430px, 94vw)";
  const cardTop = "clamp(55px, 9vh, 100px)";
  const cardX = "0px";

  // Top-left flower
  const leftFlowerWidth = "125px";
  const leftFlowerTop = "0px";
  const leftFlowerX = "0px";

  // Top-right flower
  const rightFlowerWidth = "125px";
  const rightFlowerTop = "0px";
  const rightFlowerX = "0px";

  return (
    <Section
      id="travel"
      image={weddingImages.venue}
      className="travel-scene"
    >
      {/* Top-left papercraft flower */}
      <img
        src="/images/decorations/Venue-top-left-flower.png"
        className="venue-corner-flower venue-flower-left"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          width: leftFlowerWidth,
          height: "auto",
          top: leftFlowerTop,
          left: leftFlowerX,
          right: "auto",
          transform: "none",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Top-right papercraft flower */}
      <img
        src="/images/decorations/Venue-top-right-flower.png"
        className="venue-corner-flower venue-flower-right"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          width: rightFlowerWidth,
          height: "auto",
          top: rightFlowerTop,
          right: rightFlowerX,
          left: "auto",
          transform: "none",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Section title */}
      <header className="venue-header" data-reveal>
        <h2 className="venue-title">Venue</h2>

        <div className="venue-title-divider" aria-hidden="true">
          <span className="venue-divider-line" />
          <span className="venue-divider-icon">✿</span>
          <span className="venue-divider-line" />
        </div>
      </header>

      {/* Enlarged and Lower Venue Card */}
      <div
        className="venue-card-container"
        data-reveal
        style={{
          position: "relative",
          width: cardWidth,
          maxWidth: "100%",
          marginTop: cardTop,
          marginLeft: "auto",
          marginRight: "auto",
          left: cardX,
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <a
          href={venueDetails.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="venue-card-link"
          aria-label="Open Sangam Ghat location in Google Maps"
          title="Open Sangam Ghat in Google Maps"
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <img
            src="/images/decorations/Venue-loaction-card.png"
            alt="Venue and Travel details for Sangam Ghat"
            className="venue-card-img"
            loading="eager"
            decoding="async"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "none",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </a>
      </div>

      {/* Bottom matching papercraft floral border */}
      <div
        className="venue-bottom-flowers-frame"
        aria-hidden="true"
      >
        <img
          src="/images/decorations/Venue-bottom-flowers.png"
          alt=""
          className="venue-bottom-flowers-img"
          loading="eager"
          decoding="async"
        />
      </div>
    </Section>
  );
}

export default VenueSection;
