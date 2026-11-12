
import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { Section } from "../components/Section";
import { DraggableDecor } from "../components/DraggableDecor";
import { PapercraftFlyingBirds } from "../components/PapercraftFlyingBirds";
import { coupleDetails, dateDetails, weddingImages } from "../data/wedding";

// ==========================================
// DATE TEXT POSITION - ADJUST HERE
// ==========================================
const DATE_LAYOUT = {
  contentY: "45px", // Positive = down, Negative = up
};
// ==========================================

export interface DateSectionProps {
  onScrollCue?: () => void;
  withHero?: boolean;
  onVideoEnd?: () => void;
  onReplay?: () => void;
}

export function DateSection({
  onScrollCue,
  withHero = true,
  onVideoEnd,
  onReplay,
}: DateSectionProps) {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleReplay = () => {
    setVideoEnded(false);
    if (onReplay) {
      onReplay();
    }
  };

  return (
    <div id="home" className="hero-date-stage">
      <div className="date-layer">
        <Section id="date" image={weddingImages.date} className="date-scene">
          <div className="date-video-scrim" />

          <PapercraftFlyingBirds variant="date" />

          <div className="date-clouds-layer" aria-label="Interactive floating clouds">
            <DraggableDecor
              className="date-cloud-wrap date-cloud-right"
              ariaLabel="Move right papercraft cloud"
              maxRadius={56}
            >
              <img
                src="/images/decorations/final_cloud_right.png"
                alt=""
                className="cloud-img"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </DraggableDecor>
            <DraggableDecor
              className="date-cloud-wrap date-cloud-left"
              ariaLabel="Move left papercraft cloud"
              maxRadius={56}
            >
              <img
                src="/images/decorations/final_cloud.png"
                alt=""
                className="cloud-img"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </DraggableDecor>
          </div>

          <div className="date-boats-layer" aria-label="Interactive river boats">
            <DraggableDecor
              className="date-boat-wrap date-boat-small"
              ariaLabel="Move small river sailboat"
              maxRadius={36}
            >
              <div className="boat-water-ripple" aria-hidden="true" />
              <img
                src="/images/decorations/final_boat_small.png"
                alt="Small papercraft boat floating on river"
                className="boat-img"
                draggable={false}
              />
            </DraggableDecor>
            <DraggableDecor
              className="date-boat-wrap date-boat-primary"
              ariaLabel="Move river sailboat"
              maxRadius={36}
            >
              <div className="boat-water-ripple" aria-hidden="true" />
              <img
                src="/images/decorations/final_boat_center.png"
                alt="Papercraft boat floating on river"
                className="boat-img"
                draggable={false}
              />
            </DraggableDecor>
          </div>

          <div
            className="date-content"
            style={{
              transform: `translateY(${DATE_LAYOUT.contentY})`,
            }}
          >
            <div className="light-title">
              <h2>
                {coupleDetails.bride} <i>&</i> {coupleDetails.groom}
              </h2>

              <div className="date-rule">
                <span />
                {dateDetails.dateFormatted}
                <span />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {withHero && (
        <div
          className={`hero-layer ${videoEnded ? "is-faded-out" : "is-active"
            }`}
        >
          <HeroSection
            onVideoEnd={handleVideoEnd}
            onReplay={handleReplay}
            onScrollCue={onScrollCue}
            videoEnded={videoEnded}
          />
        </div>
      )}
    </div>
  );
}

export default DateSection;
