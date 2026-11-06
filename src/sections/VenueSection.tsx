
import { useState } from "react";
import { Section } from "../components/Section";
import { Modal } from "../components/Modal";
import { venueDetails, weddingImages, type TravelItem } from "../data/wedding";

export function VenueSection() {
  const [selectedTravelItem, setSelectedTravelItem] = useState<TravelItem | null>(null);

  // ==========================================
  // ADJUSTABLE SETTINGS
  // ==========================================

  // Venue card size and position
  const cardWidth = "min(430px, 94vw)";
  const cardTop = "clamp(55px, 9svh, 100px)";
  const cardX = "0px";

  // Section title settings
  const titleFontSize = "clamp(50px, 12.5vw, 65px)";
  const titleY = "16px";

  // Top-left flower
  const leftFlowerWidth = "125px";
  const leftFlowerTop = "0px";
  const leftFlowerX = "0px";

  // Top-right flower
  const rightFlowerWidth = "125px";
  const rightFlowerTop = "0px";
  const rightFlowerX = "0px";

  const handleTravelItemClick = (item: TravelItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else if (item.detail) {
      setSelectedTravelItem(item);
    }
  };

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
      <header
        className="venue-header"
        data-reveal
        style={{
          transform: `translateY(${titleY})`,
        }}
      >
        <h2
          className="venue-title"
          style={{
            fontSize: titleFontSize,
          }}
        >
          {venueDetails.sectionTitle || "Venue"}
        </h2>

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
        <div className="venue-card-wrapper">
          {/* Card background template */}
          <img
            src="/images/decorations/Venue-card-clean-bg.png"
            alt={`Venue and Travel details for ${venueDetails.name}`}
            className="venue-card-img"
            loading="eager"
            decoding="async"
          />

          {/* Dynamic text overlays (All customizable via src/data/wedding.ts) */}
          <div className="venue-card-text-layer">
            {/* 1. Top Header Location Text (next to the location pin badge) */}
            <a
              href={venueDetails.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="venue-card-top-title"
              title={`View ${venueDetails.headerTitle || venueDetails.name} in Google Maps`}
              aria-label={`Open ${venueDetails.headerTitle || venueDetails.name} in Google Maps`}
            >
              {venueDetails.headerTitle || venueDetails.name}
            </a>

            {/* 2. Papercraft Map Area (Clickable link to Google Maps) */}
            <a
              href={venueDetails.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="venue-card-map-area"
              title={`Navigate to ${venueDetails.name} on Google Maps`}
              aria-label={`Navigate to ${venueDetails.name} on Google Maps`}
            >
              {/* Map pin label placed under the red pin */}
              <span className="venue-card-map-label">
                {venueDetails.mapPinLabel || venueDetails.name}
              </span>
            </a>

            {/* 3. Middle Ceremony / Venue Title */}
            <h3 className="venue-card-mid-title">
              {venueDetails.name}
            </h3>

            {/* 4. Six Travel Mode Slots */}
            {(venueDetails.travelItems || []).map((item, index) => (
              <div
                key={index}
                className={`venue-travel-slot venue-travel-slot-${index + 1}`}
                onClick={(e) => handleTravelItemClick(item, e)}
                title={item.detail || item.label}
                role={item.detail || item.url ? "button" : undefined}
                tabIndex={item.detail || item.url ? 0 : undefined}
                aria-label={`${item.label}: ${item.detail || "View details"}`}
              >
                <span className="venue-travel-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Item Detail Modal */}
      <Modal
        isOpen={selectedTravelItem !== null}
        onClose={() => setSelectedTravelItem(null)}
        ariaLabel={selectedTravelItem?.label || "Travel Information"}
      >
        {selectedTravelItem && (
          <div className="venue-travel-modal-content">
            <h3 className="venue-modal-title">{selectedTravelItem.label}</h3>
            <div className="venue-title-divider" aria-hidden="true">
              <span className="venue-divider-line" />
              <span className="venue-divider-icon">✿</span>
              <span className="venue-divider-line" />
            </div>
            <p className="venue-modal-detail">{selectedTravelItem.detail}</p>
            <div className="venue-modal-actions">
              <a
                href={selectedTravelItem.url || venueDetails.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="venue-modal-btn"
              >
                <span>Open in Google Maps ↗</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

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
