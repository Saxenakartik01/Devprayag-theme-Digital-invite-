import React, { useRef, useEffect } from "react";

export interface PapercraftFlyingBirdsProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "date" | "finale";
}

/**
 * Handcrafted Green Paper-Cut Bird (Facing Left)
 * Cut from layered emerald, jade, and mint paper with soft shadows,
 * gold foil accents, articulated shoulder and wrist joints, and stabilizing tail.
 */
function GreenPapercutBird() {
  return (
    <svg
      viewBox="0 0 180 150"
      className="papercut-bird-svg green-bird-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Paper Gradients */}
        <linearGradient id="gb-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2e855a" />
          <stop offset="50%" stopColor="#1e6b45" />
          <stop offset="100%" stopColor="#0f3e28" />
        </linearGradient>

        <linearGradient id="gb-breast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#48a877" />
          <stop offset="60%" stopColor="#24784e" />
          <stop offset="100%" stopColor="#12482e" />
        </linearGradient>

        <linearGradient id="gb-wing-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3ba06c" />
          <stop offset="60%" stopColor="#1f6844" />
          <stop offset="100%" stopColor="#0f3822" />
        </linearGradient>

        <linearGradient id="gb-wing-far-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a5538" />
          <stop offset="100%" stopColor="#092618" />
        </linearGradient>

        <linearGradient id="gb-feather-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7ac79e" />
          <stop offset="100%" stopColor="#338e5e" />
        </linearGradient>

        <linearGradient id="gb-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8c6c10" />
        </linearGradient>

        {/* Papercraft Dimensional Shadows */}
        <filter id="gb-shadow-paper" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="-1" dy="1.4" stdDeviation="1.0" floodColor="#05140b" floodOpacity="0.4" />
        </filter>
        <filter id="gb-shadow-wing" x="-25%" y="-25%" width="160%" height="160%">
          <feDropShadow dx="-1.5" dy="2.2" stdDeviation="1.6" floodColor="#05140b" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Aerodynamic Bobbing & Pitch Group */}
      <g className="bird-bobber gb-bobber">
        {/* 1. Far Wing (Behind Body & Head) */}
        <g className="bird-wing-far gb-wing-far" filter="url(#gb-shadow-paper)">
          {/* Layered Far Wing Flight Quills */}
          <path
            d="M 82 60 Q 98 42 112 18 Q 116 28 108 48 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 82 60 Q 104 46 126 24 Q 130 36 118 54 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 82 60 Q 112 52 138 34 Q 140 46 126 62 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 82 60 Q 118 60 148 48 Q 146 58 130 70 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
        </g>

        {/* 2. Tail Feathers (Fanned Layered Paper) */}
        <g className="bird-tail gb-tail" filter="url(#gb-shadow-paper)">
          {/* Feather 1 (Top) */}
          <path
            d="M 112 85 Q 135 84 168 86 Q 140 92 112 88 Z"
            fill="url(#gb-feather-light)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          <path d="M 112 86 Q 140 85 166 86" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 2 */}
          <path
            d="M 112 87 Q 140 90 174 96 Q 142 102 112 90 Z"
            fill="url(#gb-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
          <path d="M 112 88 Q 142 92 172 96" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 3 (Longest Hero Quill) */}
          <path
            d="M 112 89 Q 145 98 180 108 Q 145 114 112 92 Z"
            fill="url(#gb-breast)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          <path d="M 112 90 Q 146 100 178 108" stroke="url(#gb-gold)" strokeWidth="0.8" fill="none" />

          {/* Feather 4 */}
          <path
            d="M 112 91 Q 140 106 168 118 Q 138 120 112 94 Z"
            fill="url(#gb-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
          <path d="M 112 92 Q 138 108 166 118" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 5 (Bottom) */}
          <path
            d="M 112 93 Q 132 114 152 126 Q 128 122 112 95 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
        </g>

        {/* 3. Main Torso, Breast, Head, Crest & Beak */}
        <g className="bird-body gb-body" filter="url(#gb-shadow-paper)">
          {/* Belly & Flank Layer */}
          <path
            d="M 52 98 Q 78 106 102 104 Q 114 100 112 88 Q 80 82 52 98 Z"
            fill="url(#gb-wing-far-grad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.6"
          />

          {/* Main Torso Contour */}
          <path
            d="M 32 72 Q 40 88 56 100 Q 82 104 106 94 Q 112 88 110 82 Q 78 60 52 54 Q 38 60 32 72 Z"
            fill="url(#gb-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.7"
          />

          {/* Scalloped Paper Breast Layer */}
          <path
            d="M 30 70 Q 36 84 48 94 Q 60 90 62 82 Q 54 74 46 66 Z"
            fill="url(#gb-breast)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.7"
          />
          {/* Gold Filigree on Breast */}
          <path
            d="M 34 76 Q 44 86 52 84 M 38 82 Q 46 88 52 86"
            stroke="url(#gb-gold)"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Head & Neck Paper Cut */}
          <path
            d="M 29 65 Q 26 56 34 50 Q 44 46 54 52 Q 52 64 42 68 Q 34 70 29 65 Z"
            fill="url(#gb-breast)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="0.7"
          />

          {/* Crown Crest Feather */}
          <path
            d="M 44 48 Q 42 34 32 24 Q 40 32 48 42 Z"
            fill="url(#gb-feather-light)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.6"
          />
          <circle cx="32" cy="24" r="2.0" fill="url(#gb-gold)" />

          {/* Paper Fold Beak */}
          <path
            d="M 29 63 L 13 67 L 29 70 Z"
            fill="url(#gb-gold)"
            stroke="#b8860b"
            strokeWidth="0.5"
          />
          <path d="M 29 66.5 L 14 67" stroke="#7a5505" strokeWidth="0.5" />

          {/* Paper Eye */}
          <circle cx="36" cy="56" r="3.2" fill="url(#gb-gold)" />
          <circle cx="36" cy="56" r="2.0" fill="#06160d" />
          <circle cx="35.3" cy="55.3" r="0.7" fill="#ffffff" />
        </g>

        {/* 4. Near Wing (Foreground Articulated Hero Wing) */}
        <g className="bird-wing-near gb-wing-near" filter="url(#gb-shadow-wing)">
          {/* Secondary Tier Feathers (Middle Scallops) */}
          <g className="wing-secondaries">
            <path
              d="M 74 70 Q 70 82 82 88 Q 88 78 74 70 Z"
              fill="url(#gb-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 78 68 Q 80 84 94 88 Q 98 76 78 68 Z"
              fill="url(#gb-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 84 64 Q 92 82 108 84 Q 108 72 84 64 Z"
              fill="url(#gb-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 90 60 Q 106 78 120 78 Q 118 66 90 60 Z"
              fill="url(#gb-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 98 54 Q 118 72 130 68 Q 124 58 98 54 Z"
              fill="url(#gb-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
          </g>

          {/* Primary Tier Feathers with Secondary Wrist Articulation */}
          <g className="wing-primaries gb-wing-primaries">
            <path
              d="M 96 54 Q 104 36 112 14 Q 116 26 108 48 Z"
              fill="url(#gb-feather-light)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.6"
            />
            <path d="M 96 54 Q 106 32 112 16" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 96 54 Q 110 40 128 20 Q 132 32 118 52 Z"
              fill="url(#gb-breast)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.6"
            />
            <path d="M 96 54 Q 114 36 126 22" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 96 54 Q 118 46 142 30 Q 142 42 126 58 Z"
              fill="url(#gb-body)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path d="M 96 54 Q 120 44 140 32" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 96 54 Q 124 52 152 44 Q 148 54 132 64 Z"
              fill="url(#gb-breast)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path d="M 96 54 Q 128 50 150 46" stroke="url(#gb-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 96 54 Q 128 58 158 58 Q 150 68 134 70 Z"
              fill="url(#gb-body)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
          </g>

          {/* Shoulder Covert Cap with Gold Leaf Embellishment */}
          <path
            d="M 74 70 Q 64 62 76 52 Q 92 48 104 56 Q 96 70 74 70 Z"
            fill="url(#gb-feather-light)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.75"
          />
          <path
            d="M 74 62 Q 86 54 96 60 M 78 68 Q 88 62 98 64"
            stroke="url(#gb-gold)"
            strokeWidth="1.0"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

/**
 * Handcrafted Orange Paper-Cut Bird (Facing Right)
 * Cut from layered saffron, amber, and golden-orange paper with soft shadows,
 * gold foil accents, articulated shoulder and wrist joints, and stabilizing tail.
 */
function OrangePapercutBird() {
  return (
    <svg
      viewBox="0 0 180 150"
      className="papercut-bird-svg orange-bird-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Paper Gradients */}
        <linearGradient id="ob-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e67e22" />
          <stop offset="50%" stopColor="#c44d12" />
          <stop offset="100%" stopColor="#872e0b" />
        </linearGradient>

        <linearGradient id="ob-breast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="60%" stopColor="#d95c14" />
          <stop offset="100%" stopColor="#9e350a" />
        </linearGradient>

        <linearGradient id="ob-wing-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8a335" />
          <stop offset="60%" stopColor="#d15612" />
          <stop offset="100%" stopColor="#8c2f08" />
        </linearGradient>

        <linearGradient id="ob-wing-far-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8450e" />
          <stop offset="100%" stopColor="#671f04" />
        </linearGradient>

        <linearGradient id="ob-feather-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed06e" />
          <stop offset="100%" stopColor="#ea8422" />
        </linearGradient>

        <linearGradient id="ob-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8cf" />
          <stop offset="50%" stopColor="#f1be3b" />
          <stop offset="100%" stopColor="#b0780c" />
        </linearGradient>

        {/* Papercraft Dimensional Shadows */}
        <filter id="ob-shadow-paper" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="1" dy="1.4" stdDeviation="1.0" floodColor="#210802" floodOpacity="0.4" />
        </filter>
        <filter id="ob-shadow-wing" x="-25%" y="-25%" width="160%" height="160%">
          <feDropShadow dx="1.5" dy="2.2" stdDeviation="1.6" floodColor="#210802" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Aerodynamic Bobbing & Pitch Group */}
      <g className="bird-bobber ob-bobber">
        {/* 1. Far Wing (Behind Body & Head) */}
        <g className="bird-wing-far ob-wing-far" filter="url(#ob-shadow-paper)">
          {/* Layered Far Wing Flight Quills (Facing Right) */}
          <path
            d="M 98 60 Q 82 42 68 18 Q 64 28 72 48 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 98 60 Q 76 46 54 24 Q 50 36 62 54 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 98 60 Q 68 52 42 34 Q 40 46 54 62 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
          <path
            d="M 98 60 Q 62 60 32 48 Q 34 58 50 70 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
        </g>

        {/* 2. Tail Feathers (Fanned Layered Paper) */}
        <g className="bird-tail ob-tail" filter="url(#ob-shadow-paper)">
          {/* Feather 1 (Top) */}
          <path
            d="M 68 85 Q 45 84 12 86 Q 40 92 68 88 Z"
            fill="url(#ob-feather-light)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          <path d="M 68 86 Q 40 85 14 86" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 2 */}
          <path
            d="M 68 87 Q 40 90 6 96 Q 38 102 68 90 Z"
            fill="url(#ob-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
          <path d="M 68 88 Q 38 92 8 96" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 3 (Longest Hero Quill) */}
          <path
            d="M 68 89 Q 35 98 0 108 Q 35 114 68 92 Z"
            fill="url(#ob-breast)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          <path d="M 68 90 Q 34 100 2 108" stroke="url(#ob-gold)" strokeWidth="0.8" fill="none" />

          {/* Feather 4 */}
          <path
            d="M 68 91 Q 40 106 12 118 Q 42 120 68 94 Z"
            fill="url(#ob-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.6"
          />
          <path d="M 68 92 Q 42 108 14 118" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

          {/* Feather 5 (Bottom) */}
          <path
            d="M 68 93 Q 48 114 28 126 Q 52 122 68 95 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.6"
          />
        </g>

        {/* 3. Main Torso, Breast, Head, Crest & Beak */}
        <g className="bird-body ob-body" filter="url(#ob-shadow-paper)">
          {/* Belly & Flank Layer */}
          <path
            d="M 128 98 Q 102 106 78 104 Q 66 100 68 88 Q 100 82 128 98 Z"
            fill="url(#ob-wing-far-grad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.6"
          />

          {/* Main Torso Contour */}
          <path
            d="M 148 72 Q 140 88 124 100 Q 98 104 74 94 Q 68 88 70 82 Q 102 60 128 54 Q 142 60 148 72 Z"
            fill="url(#ob-body)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.7"
          />

          {/* Scalloped Paper Breast Layer */}
          <path
            d="M 150 70 Q 144 84 132 94 Q 120 90 118 82 Q 126 74 134 66 Z"
            fill="url(#ob-breast)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.7"
          />
          {/* Gold Filigree on Breast */}
          <path
            d="M 146 76 Q 136 86 128 84 M 142 82 Q 134 88 128 86"
            stroke="url(#ob-gold)"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Head & Neck Paper Cut */}
          <path
            d="M 151 65 Q 154 56 146 50 Q 136 46 126 52 Q 128 64 138 68 Q 146 70 151 65 Z"
            fill="url(#ob-breast)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="0.7"
          />

          {/* Royal Plume Crest (Triple Feathers) */}
          <path
            d="M 136 48 Q 138 34 148 24 Q 140 32 132 42 Z"
            fill="url(#ob-feather-light)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.6"
          />
          <circle cx="148" cy="24" r="2.0" fill="url(#ob-gold)" />

          <path
            d="M 134 50 Q 133 38 140 30 Q 135 37 131 46 Z"
            fill="url(#ob-breast)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
          />
          <circle cx="140" cy="30" r="1.5" fill="url(#ob-gold)" />

          {/* Paper Fold Beak */}
          <path
            d="M 151 63 L 167 67 L 151 70 Z"
            fill="url(#ob-gold)"
            stroke="#b0780c"
            strokeWidth="0.5"
          />
          <path d="M 151 66.5 L 166 67" stroke="#7a4e03" strokeWidth="0.5" />

          {/* Paper Eye */}
          <circle cx="144" cy="56" r="3.2" fill="url(#ob-gold)" />
          <circle cx="144" cy="56" r="2.0" fill="#240802" />
          <circle cx="144.7" cy="55.3" r="0.7" fill="#ffffff" />
        </g>

        {/* 4. Near Wing (Foreground Articulated Hero Wing) */}
        <g className="bird-wing-near ob-wing-near" filter="url(#ob-shadow-wing)">
          {/* Secondary Tier Feathers (Middle Scallops) */}
          <g className="wing-secondaries">
            <path
              d="M 106 70 Q 110 82 98 88 Q 92 78 106 70 Z"
              fill="url(#ob-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 102 68 Q 100 84 86 88 Q 82 76 102 68 Z"
              fill="url(#ob-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 96 64 Q 88 82 72 84 Q 72 72 96 64 Z"
              fill="url(#ob-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 90 60 Q 74 78 60 78 Q 62 66 90 60 Z"
              fill="url(#ob-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M 82 54 Q 62 72 50 68 Q 56 58 82 54 Z"
              fill="url(#ob-wing-base)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
          </g>

          {/* Primary Tier Feathers with Secondary Wrist Articulation */}
          <g className="wing-primaries ob-wing-primaries">
            <path
              d="M 84 54 Q 76 36 68 14 Q 64 26 72 48 Z"
              fill="url(#ob-feather-light)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.6"
            />
            <path d="M 84 54 Q 74 32 68 16" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 84 54 Q 70 40 52 20 Q 48 32 62 52 Z"
              fill="url(#ob-breast)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.6"
            />
            <path d="M 84 54 Q 66 36 54 22" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 84 54 Q 62 46 38 30 Q 38 42 54 58 Z"
              fill="url(#ob-body)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path d="M 84 54 Q 60 44 40 32" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 84 54 Q 56 52 28 44 Q 32 54 48 64 Z"
              fill="url(#ob-breast)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path d="M 84 54 Q 52 50 30 46" stroke="url(#ob-gold)" strokeWidth="0.7" fill="none" />

            <path
              d="M 84 54 Q 52 58 22 58 Q 30 68 46 70 Z"
              fill="url(#ob-body)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
          </g>

          {/* Shoulder Covert Cap with Gold Leaf Embellishment */}
          <path
            d="M 106 70 Q 116 62 104 52 Q 88 48 76 56 Q 84 70 106 70 Z"
            fill="url(#ob-feather-light)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.75"
          />
          <path
            d="M 106 62 Q 94 54 84 60 M 102 68 Q 92 62 82 64"
            stroke="url(#ob-gold)"
            strokeWidth="1.0"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

/**
 * Realistic Handcrafted Paper-Cut Flying Birds System
 *
 * Implements:
 * 1. Green Bird (Right -> Left): Enters from right edge, flies horizontally,
 *    exits completely beyond left edge, waits EXACTLY 700ms (0.7s), and re-enters from right.
 * 2. Orange Bird (Left -> Right): Enters from left edge, flies horizontally in opposite direction,
 *    exits completely beyond right edge, waits EXACTLY 700ms (0.7s), and re-enters from left.
 * 3. Believable avian kinematics: Shoulder-joint wing flapping, wrist primary feather flex,
 *    aerodynamic lift bobbing, natural pitch tilts, and stabilizing tail flutter.
 * 4. Dynamic responsive measurement: Viewport & container query synchronization without horizontal overflow.
 */
export function PapercraftFlyingBirds({
  className = "",
  style,
  variant = "date",
}: PapercraftFlyingBirdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measureWidth = () => {
      const w = el.clientWidth || el.parentElement?.clientWidth || window.innerWidth;
      el.style.setProperty("--track-width", `${w}px`);
    };

    measureWidth();
    const ro = new ResizeObserver(measureWidth);
    ro.observe(el);
    window.addEventListener("resize", measureWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureWidth);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`paper-birds-system paper-birds-${variant} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Bird A: Green Handcrafted Paper-Cut Bird (Right -> Left) */}
      <div className="bird-flight-track green-bird-flight-track">
        <div className="bird-svg-container green-bird-container">
          <GreenPapercutBird />
        </div>
      </div>

      {/* Bird B: Orange Handcrafted Paper-Cut Bird (Left -> Right) */}
      <div className="bird-flight-track orange-bird-flight-track">
        <div className="bird-svg-container orange-bird-container">
          <OrangePapercutBird />
        </div>
      </div>
    </div>
  );
}

export default PapercraftFlyingBirds;
