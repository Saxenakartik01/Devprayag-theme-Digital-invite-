import { Section } from "../components/Section";
import { coupleDetails, weddingImages } from "../data/wedding";

export function CoupleSection() {
  return (
    <Section id="couple" image={weddingImages.couple} className="couple-scene">
      {/* Top Floating Papercraft Clouds with Gentle Motion */}
      <div className="couple-clouds-container" aria-hidden="true">
        <div className="couple-cloud couple-cloud-left">
          <img
            src="/images/decorations/couple_cloud_left.png"
            alt=""
            className="couple-cloud-img"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="couple-cloud couple-cloud-right">
          <img
            src="/images/decorations/couple_cloud_right.png"
            alt=""
            className="couple-cloud-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Top Header Typography */}
      <header className="couple-header" data-reveal>
        <span className="couple-eyebrow">The Couple</span>
        <h2 className="couple-names">
          {coupleDetails.groom} <span className="couple-amp">&amp;</span> {coupleDetails.bride}
        </h2>
        {/* <p className="couple-tagline">{coupleDetails.eyebrow}</p> */}
      </header>

      {/* Couple Center Stage: Arch Frame & Vows directly below frame */}
      <div className="couple-center-stage" data-reveal>
        <div className="couple-frame-container">
          <img
            src="/images/decorations/couple_papercraft_jharokha.png"
            alt={`${coupleDetails.groom} and ${coupleDetails.bride}`}
            className="couple-arch-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Vows / Love Words positioned directly below the frame */}
        <div className="couple-words">
          <p>{coupleDetails.words.he}</p>
          <span>{coupleDetails.words.she}</span>
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
