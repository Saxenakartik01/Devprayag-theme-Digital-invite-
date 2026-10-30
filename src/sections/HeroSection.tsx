
import { useState, useRef, useEffect } from "react";
import { Section } from "../components/Section";
import { HeroPapercraftDecorations } from "../components/HeroPapercraftDecorations";

// ==========================================
// HERO TEXT & OHM POSITION SETTINGS
// ==========================================

const HERO_LAYOUT = {
  ohm: {
    top: "10%",
    left: "50%",
    size: "70px",
  },

  heading: {
    top: "19%",
    left: "50%",
    fontSize: "32px",
  },
};

export interface HeroSectionProps {
  onScrollCue?: () => void;
  onVideoEnd?: () => void;
  onReplay?: () => void;
  videoEnded?: boolean;
}

export function HeroSection({
  onScrollCue,
  onVideoEnd,
  onReplay,
  videoEnded = false,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(videoEnded);

  useEffect(() => {
    setHasEnded(videoEnded);
  }, [videoEnded]);

  // Lock scroll until video ends
  useEffect(() => {
    const isLocked = !hasEnded;

    if (isLocked) {
      document.body.classList.add("video-scroll-locked");
      document.documentElement.classList.add("video-scroll-locked");

      const preventWheel = (e: WheelEvent) => {
        e.preventDefault();
      };

      const preventTouch = (e: TouchEvent) => {
        if (
          e.target instanceof Element &&
          e.target.closest(
            "button, video, .hero-control-bar, .hero-video-scrim"
          )
        ) {
          return;
        }
        e.preventDefault();
      };

      const preventKey = (e: KeyboardEvent) => {
        if (
          [
            "Space",
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Home",
            "End",
          ].includes(e.code)
        ) {
          if (
            !(
              e.target instanceof HTMLInputElement ||
              e.target instanceof HTMLTextAreaElement
            )
          ) {
            e.preventDefault();
          }
        }
      };

      window.addEventListener("wheel", preventWheel, {
        passive: false,
      });
      window.addEventListener("touchmove", preventTouch, {
        passive: false,
      });
      window.addEventListener("keydown", preventKey);

      return () => {
        document.body.classList.remove("video-scroll-locked");
        document.documentElement.classList.remove("video-scroll-locked");
        window.removeEventListener("wheel", preventWheel);
        window.removeEventListener("touchmove", preventTouch);
        window.removeEventListener("keydown", preventKey);
      };
    } else {
      document.body.classList.remove("video-scroll-locked");
      document.documentElement.classList.remove("video-scroll-locked");
    }
  }, [hasEnded]);

  const handlePlayTap = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (video.paused) {
      video.muted = isMuted;

      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true));
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!videoRef.current) return;

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime, duration } = videoRef.current;

    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    setProgress(100);

    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime =
        videoRef.current.duration || 10;
    }

    handleVideoEnded();
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onReplay) {
      onReplay();
    }

    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    videoRef.current.muted = isMuted;

    videoRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  const handleScrollCue = () => {
    if (onScrollCue) {
      onScrollCue();
    } else {
      document
        .getElementById("date")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="home" className="hero hero-video-scene">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/images/backgrounds/Hero-video.mp4"
        className="hero-video"
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayTap}
      />

      {/* Cinematic Vignette */}
      <div
        className="hero-video-scrim"
        onClick={handlePlayTap}
      />

      {/* Papercraft Decorations with Adjustable Positions */}
      <HeroPapercraftDecorations
        ohmStyle={{
          top: HERO_LAYOUT.ohm.top,
          left: HERO_LAYOUT.ohm.left,
          fontSize: HERO_LAYOUT.ohm.size,
        }}
        headingStyle={{
          top: HERO_LAYOUT.heading.top,
          left: HERO_LAYOUT.heading.left,
          fontSize: HERO_LAYOUT.heading.fontSize,
        }}
      />

      {/* Tap to Open */}
      {!isPlaying && !hasEnded && (
        <button
          type="button"
          className="hero-tap-to-open"
          onClick={handlePlayTap}
          aria-label="Tap to open invitation video"
        >
          <svg
            className="hero-tap-to-open-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="hero-tap-to-open-text">
            Tap to open
          </span>
        </button>
      )}

      {/* Video Controls */}
      {isPlaying && (
        <div className="hero-control-bar">
          <button
            type="button"
            className="hero-ctrl-btn"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          <button
            type="button"
            className="hero-ctrl-btn hero-skip-btn"
            onClick={handleSkip}
            aria-label="Skip to date section"
          >
            Skip intro →
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={`hero-progress-container ${isPlaying ? "is-active" : ""
          }`}
      >
        <div
          className="hero-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Post Video Actions */}
      {hasEnded && (
        <div className="hero-ended-actions">
          <button
            className="hero-replay-btn"
            onClick={handleReplay}
            aria-label="Replay invitation video"
          >
            <span>↺</span> Replay Video
          </button>

          <button
            className="scroll-cue"
            onClick={handleScrollCue}
            aria-label="Scroll to wedding date"
          >
            <span>↓</span>Begin
          </button>
        </div>
      )}
    </Section>
  );
}

export default HeroSection;
