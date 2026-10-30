
import { Section } from "../components/Section";
import { galleryItems, weddingImages } from "../data/wedding";

// ==========================================
// ALL GALLERY ADJUSTMENTS IN ONE PLACE
// ==========================================
const GALLERY_LAYOUT = {
  // Gallery heading
  title: {
    fontSize: "58px",
    y: "65px",
  },

  // All images
  images: {
    gap: "clamp(25px, 3vh, 35px)",
    y: "-12px",
    size: "90%",
  },

  // Individual image position and size
  image1: { y: "10px", size: "100%" },
  image2: { y: "0px", size: "100%" },
  image3: { y: "0px", size: "100%" },
  image4: { y: "0px", size: "100%" },
};

// ==========================================

export function GallerySection() {
  const getImageStyle = (image: {
    y: string;
    size: string;
  }) => ({
    transform: `translateY(${image.y}) scale(${image.size === "100%" ? 1 : parseFloat(image.size) / 100}) rotate(var(--rotation, 0deg))`,
    transformOrigin: "top center",
  });

  return (
    <Section
      id="gallery"
      image={weddingImages.gallery}
      className="gallery-scene"
    >
      {/* Gallery Header */}
      <header
        className="gallery-header"
        data-reveal
        style={{
          position: "relative",
          zIndex: 2,
          transform: `translateY(${GALLERY_LAYOUT.title.y})`,
        }}
      >
        <div className="gallery-lotus" aria-hidden="true">
          <svg
            width="34"
            height="22"
            viewBox="0 0 34 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1.5 C15 6 14.5 13 17 18 C19.5 13 19 6 17 1.5 Z"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 18 C12 16 8 9 9.5 5 C11.5 8 14 13 17 18 Z"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 18 C22 16 26 9 24.5 5 C22.5 8 20 13 17 18 Z"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 18 C10 17 4 13 3 10 C5.5 11.5 11 15 17 18 Z"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 18 C24 17 30 13 31 10 C28.5 11.5 23 15 17 18 Z"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 19.5 C12 21 22 21 27 19.5"
              stroke="#9e6b2c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2
          className="gallery-title"
          style={{ fontSize: GALLERY_LAYOUT.title.fontSize }}
        >
          Gallery
        </h2>

        <p className="gallery-subtitle">
          FRAMES OF OUR HAPPIEST MOMENTS
        </p>
      </header>

      {/* Gallery Images */}
      <div
        className="gallery-grid"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: GALLERY_LAYOUT.images.gap,
          transform: `translateY(${GALLERY_LAYOUT.images.y})`,
        }}
      >
        {/* Left Column */}
        <div className="gallery-col gallery-col-left">
          <figure
            className="gallery-card gallery-card-1"
            data-reveal
            style={getImageStyle(GALLERY_LAYOUT.image1)}
          >
            <div className="gallery-card-inner">
              <img
                src={galleryItems[0].src}
                alt={galleryItems[0].alt}
                loading="lazy"
              />
            </div>
          </figure>

          <figure
            className="gallery-card gallery-card-3"
            data-reveal
            style={getImageStyle(GALLERY_LAYOUT.image3)}
          >
            <div className="gallery-card-inner">
              <img
                src={galleryItems[2].src}
                alt={galleryItems[2].alt}
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        {/* Right Column */}
        <div className="gallery-col gallery-col-right">
          <figure
            className="gallery-card gallery-card-2"
            data-reveal
            style={getImageStyle(GALLERY_LAYOUT.image2)}
          >
            <div className="gallery-card-inner">
              <img
                src={galleryItems[1].src}
                alt={galleryItems[1].alt}
                loading="lazy"
              />
            </div>
          </figure>

          <figure
            className="gallery-card gallery-card-4"
            data-reveal
            style={getImageStyle(GALLERY_LAYOUT.image4)}
          >
            <div className="gallery-card-inner">
              <img
                src={galleryItems[3].src}
                alt={galleryItems[3].alt}
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </div>
    </Section>
  );
}

export default GallerySection;
