import { Section } from "../components/Section";
import { storyBeats, weddingImages } from "../data/wedding";

export function StorySection() {
  return (
    <Section id="story" image={weddingImages.story} className="story-scene">
      <header className="section-title cream" data-reveal>
        <h2>Our Story</h2>
        <p>Two paths, one journey</p>
      </header>
      <div className="story-beats">
        {storyBeats.map((beat) => (
          <article
            key={beat.className}
            className={`beat ${beat.className}`}
            data-reveal
          >
            <img src={beat.src} alt={beat.alt} />
            <p>
              <b>{beat.title}</b>
              <span>{beat.subtitle}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default StorySection;
