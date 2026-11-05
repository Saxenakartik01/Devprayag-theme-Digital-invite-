import { useState, type FormEvent } from "react";
import { Section } from "../components/Section";
import { weddingImages } from "../data/wedding";

export function RSVPSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section
      id="rsvp"
      image={weddingImages.rsvp}
      className="rsvp-scene"
    >
      {/* Floating Papercraft Clouds with Gentle Floating Motion */}
      <div className="rsvp-clouds-layer" aria-hidden="true">
        <div className="rsvp-cloud rsvp-cloud-left">
          <img
            src="/images/decorations/final_cloud.png"
            alt=""
            className="rsvp-cloud-img"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="rsvp-cloud rsvp-cloud-right">
          <img
            src="/images/decorations/final_cloud_right.png"
            alt=""
            className="rsvp-cloud-img"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>

      {/* Centered RSVP Content */}
      <div
        className="rsvp-wrap"
        data-reveal
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: "420px",
          height: "auto",
          minHeight: "0",
          margin: "0",
          padding: "16px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* RSVP Header */}
        <header
          className="rsvp-header"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          <h2
            className="rsvp-title"
            style={{
              fontSize: "56px",
              lineHeight: "1.1",
              marginTop: "-15px",
              marginBottom: "5px",
              textAlign: "center",
            }}
          >
            RSVP
          </h2>

          <p className="rsvp-subtitle">Join Us</p>
        </header>

        <br />

        {/* Form or Success Message */}
        {sent ? (
          <div
            className="thank-message"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <b>With love, thank you.</b>

            <span>
              Your place at our celebration is saved.
            </span>

            <button
              type="button"
              className="rsvp-edit-btn"
              onClick={() => setSent(false)}
            >
              Edit response
            </button>
          </div>
        ) : (
          <form
            className="rsvp-form"
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            {/* Name Field */}
            <div
              className="rsvp-input-box"
              style={{
                width: "90%",
                maxWidth: "90%",
                boxSizing: "border-box",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rsvp-input-icon"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              <input
                required
                type="text"
                placeholder="Your full name"
                className="rsvp-field"
                aria-label="Your full name"
              />
            </div>

            {/* Guests Field */}
            <div
              className="rsvp-input-box"
              style={{
                width: "90%",
                maxWidth: "90%",
                boxSizing: "border-box",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rsvp-input-icon"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
                <circle cx="9" cy="7" r="3.5" />
                <path d="M16 3.13a3.5 3.5 0 0 1 0 7" />
              </svg>

              <input
                type="number"
                min="1"
                placeholder="Number of guests"
                className="rsvp-field"
                aria-label="Number of guests"
              />
            </div>

            {/* Message / Date Field */}
            <div
              className="rsvp-input-box"
              style={{
                width: "90%",
                maxWidth: "90%",
                boxSizing: "border-box",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rsvp-input-icon"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="8" cy="14" r="1" fill="currentColor" />
                <circle cx="12" cy="14" r="1" fill="currentColor" />
                <circle cx="16" cy="14" r="1" fill="currentColor" />
                <circle cx="8" cy="18" r="1" fill="currentColor" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
                <circle cx="16" cy="18" r="1" fill="currentColor" />
              </svg>

              <input
                type="text"
                placeholder="Message for couple / Date"
                className="rsvp-field"
                aria-label="Message for couple or arrival date"
              />
            </div>

            {/* Confirm RSVP Button */}
            <button
              type="submit"
              className="rsvp-button"
              aria-label="Confirm RSVP"
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img
                src="/images/decorations/rsvp_confirm_btn.png"
                alt="Confirm RSVP"
                className="rsvp-button-img"
                loading="eager"
                decoding="async"
              />
            </button>
          </form>
        )}

      </div>
    </Section>
  );
}

export default RSVPSection;
