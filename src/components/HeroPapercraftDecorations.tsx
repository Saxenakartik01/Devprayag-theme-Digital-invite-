import React from "react";

/**
 * HeroPapercraftDecorations renders:
 * - Sacred 3D Embossed Ohm Symbol (ohm.png)
 * - Razor-sharp Typography: "WHERE TWO RIVERS MEET... TWO HEARTS TOO"
 */
export function HeroPapercraftDecorations() {
  return (
    <div className="hero-decorations-wrapper" aria-hidden="false">
      {/* ================= TOP OHM SYMBOL & TYPOGRAPHY ================= */}
      <div className="hero-top-header" role="banner">
        {/* Sacred 3D Embossed Ohm Symbol */}
        <div className="hero-ohm-wrap">
          <img
            src="/images/decorations/ohm.png"
            alt="Sacred Om symbol"
            className="hero-ohm-img"
            loading="eager"
            decoding="async"
          />
        </div>
        <br></br>
        {/* Clean, Razor-Sharp Vector Typography */}
        <div className="hero-top-title">
          <span className="hero-top-line">WHERE TWO RIVERS MEET...</span>
          <span className="hero-top-line">TWO HEARTS TOO</span>
        </div>
      </div>
    </div>
  );
}

export default HeroPapercraftDecorations;
