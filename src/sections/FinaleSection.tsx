import { Section } from "../components/Section";
import { PapercraftFlyingBirds } from "../components/PapercraftFlyingBirds";
import { finaleDetails, weddingImages } from "../data/wedding";

export interface FinaleSectionProps {
  onReturnToTop?: () => void;
}

/**
 * Floating Papercraft Boat with water ripple reflection
 */
function PapercraftBoat({
  src,
  alt = "",
  className = "",
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`floating-boat-wrap ${className}`} style={style}>
      {/* Water ripple & reflection under the boat */}
      <div className="boat-water-ripple" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        className="boat-img"
        loading="eager"
        decoding="async"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * Movable Papercraft Cloud drifting across the sky
 */
function MovableCloud({
  src,
  className = "",
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`movable-cloud-wrap ${className}`} style={style} aria-hidden="true">
      <img
        src={src}
        alt=""
        className="cloud-img"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function FinaleSection({ onReturnToTop: _onReturnToTop }: FinaleSectionProps) {
  return (
    <Section id="thanks" image={weddingImages.finale} className="finale-scene">
      {/* Papercraft Clouds fixed at Top-Right and Top-Left with 2px-3px triangle motion */}
      <div className="finale-clouds-layer" aria-hidden="true">
        {/* Cloud fixed on top-right */}
        <MovableCloud
          src="/images/decorations/final_cloud_right.png"
          className="cloud-fixed-right"
        />
        {/* Cloud fixed on top-left */}
        <MovableCloud
          src="/images/decorations/final_cloud.png"
          className="cloud-fixed-left"
        />
      </div>

      {/* Handcrafted Paper-Cut Flying Birds across the morning sky */}
      <PapercraftFlyingBirds variant="finale" />

      {/* Header Copy */}
      <div className="finale-copy" data-reveal>
        <h2>{finaleDetails.title}</h2>
        <p>{finaleDetails.place}</p>
        <span>{finaleDetails.message}</span>
      </div>

      {/* Floating Boats with Realistic Water Physics & Triangle float motion */}
      <div className="finale-boats-layer" aria-hidden="true">
        {/* Boat 1: Distant upstream small sailboat */}
        <PapercraftBoat
          src="/images/decorations/final_boat_distant.png"
          className="floating-boat-distant"
        />

        {/* Boat 2: Small floating sailboat on left river bend */}
        <PapercraftBoat
          src="/images/decorations/final_boat_small.png"
          className="floating-boat-small"
        />

        {/* Boat 3: Center-foreground prominent hero sailboat */}
        <PapercraftBoat
          src="/images/decorations/final_boat_center.png"
          className="floating-boat-primary"
        />

        {/* Boat 4: Lower-right floating sailboat */}
        <PapercraftBoat
          src="/images/decorations/final_boat_side.png"
          className="floating-boat-secondary"
        />
      </div>

      {/* Footer Credit */}
      <footer className="finale-footer">
        <a
          href="https://patrikastudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="finale-credit-link"
        >
          Created by ParitkaStudio
        </a>
      </footer>
    </Section>
  );
}

export default FinaleSection;
