import { Section } from "../components/Section";
import { coupleDetails, weddingImages } from "../data/wedding";

// ==========================================
// ADJUSTABLE SETTINGS
// ==========================================
const COUPLE_LAYOUT = {
  // Center stage (frame & names) vertical position - shifted more bottom side
  stageY: "clamp(105px, 15svh, 140px)",
  // Frame width - increased size
  frameWidth: "clamp(265px, 72vw, 330px)",
  // Gap between arch frame and couple text
  wordsMarginTop: "clamp(10px, 1.6svh, 16px)",
};

export function CoupleSection() {
  return (
    <Section id="couple" image={weddingImages.couple} className="couple-scene">
      {/* Top Floating Papercraft Clouds with Gentle Floating Motion */}
      <div className="couple-clouds-container" aria-hidden="true">
        <div className="couple-cloud couple-cloud-left">
          <img
            src="/images/decorations/couple_cloud_left.png"
            alt=""
            className="couple-cloud-img"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="couple-cloud couple-cloud-right">
          <img
            src="/images/decorations/couple_cloud_right.png"
            alt=""
            className="couple-cloud-img"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>

      {/* Couple Center Stage: Arch Frame & Names directly below frame */}
      <div
        className="couple-center-stage"
        data-reveal
        style={{
          marginTop: COUPLE_LAYOUT.stageY,
          width: COUPLE_LAYOUT.frameWidth,
        }}
      >
        <div className="couple-frame-container">
          <img
            src="/images/decorations/couple_papercraft_jharokha.png"
            alt={`${coupleDetails.groom} and ${coupleDetails.bride}`}
            className="couple-arch-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Couple Names positioned directly below the frame */}
        <div
          className="couple-words"
          style={{
            marginTop: COUPLE_LAYOUT.wordsMarginTop,
          }}
        >
          <h2 className="couple-names">
            {coupleDetails.groom} <span className="couple-amp">&amp;</span> {coupleDetails.bride}
          </h2>
        </div>
      </div>

      {/* Bottom Botanical & Mountain Design matching background */}
      <div className="couple-bottom-decor" aria-hidden="true">
        <img
          src="/images/decorations/couple_bottom_decor.png"
          alt=""
          className="couple-bottom-decor-img"
          loading="eager"
          decoding="async"
        />
      </div>
    </Section>
  );
}

export default CoupleSection;
