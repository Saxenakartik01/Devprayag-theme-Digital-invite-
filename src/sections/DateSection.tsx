
import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { Section } from "../components/Section";
import { PapercraftFlyingBirds } from "../components/PapercraftFlyingBirds";
import { coupleDetails, dateDetails } from "../data/wedding";

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
        <Section id="date" className="date-scene">
          <video
            src="/images/backgrounds/Data-page.mp4"
            className="date-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          <div className="date-video-scrim" />

          <PapercraftFlyingBirds variant="date" />

          <div
            className="date-content"
            style={{
              transform: `translateY(${DATE_LAYOUT.contentY})`,
            }}
          >
            <div className="light-title">
              <p>{dateDetails.title}</p>

              <h2>
                {coupleDetails.bride} <i>&</i> {coupleDetails.groom}
              </h2>

              <div className="date-rule">
                <span />
                {dateDetails.dateFormatted}
                <span />
              </div>
            </div>

            <p className="date-note">
              {dateDetails.location}
              <br />
              <small>{dateDetails.note}</small>
            </p>
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
