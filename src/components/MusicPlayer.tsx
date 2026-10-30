import { useState, useRef, useEffect } from "react";

export interface MusicPlayerProps {
  isVisible: boolean;
  src?: string;
}

/**
 * MusicPlayer renders a floating music button in the bottom right corner
 * that appears after the hero video ends and automatically starts playing
 * the wedding background song with full play/pause controls.
 */
export function MusicPlayer({
  isVisible,
  src = "/devbhoomi-music.mp3",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pre-load audio on initial user touch/interaction so browser allows immediate playback
  useEffect(() => {
    const handleFirstGesture = () => {
      if (audioRef.current) {
        audioRef.current.load();
      }
    };
    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("click", handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("click", handleFirstGesture);
    };
  }, []);

  // When isVisible becomes true (hero video ended), auto-play the wedding song with NO FADE from STARTING LINE
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isVisible) {
      // Ensure the song starts from the very beginning (starting line) with full volume (no fade)
      audio.currentTime = 0;
      audio.volume = 1;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Autoplay waiting for user gesture:", err);
            setIsPlaying(false);

            // Fallback: If browser autoplay policy requires user gesture,
            // play immediately from the starting line without fade on the very next user interaction
            const startOnInteraction = () => {
              if (audioRef.current && isVisible) {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 1;
                audioRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {});
              }
              cleanupListeners();
            };

            const cleanupListeners = () => {
              window.removeEventListener("click", startOnInteraction);
              window.removeEventListener("touchstart", startOnInteraction);
              window.removeEventListener("scroll", startOnInteraction);
              window.removeEventListener("keydown", startOnInteraction);
              window.removeEventListener("pointerdown", startOnInteraction);
            };

            window.addEventListener("click", startOnInteraction, { once: true });
            window.addEventListener("touchstart", startOnInteraction, { once: true });
            window.addEventListener("scroll", startOnInteraction, { once: true });
            window.addEventListener("keydown", startOnInteraction, { once: true });
            window.addEventListener("pointerdown", startOnInteraction, { once: true });
          });
      }
    } else {
      // When hero video is active or replaying, pause and reset to start line
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isVisible, src]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 1;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio play error:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`music-player-wrap ${isVisible ? "is-visible" : "is-hidden"}`}
      aria-label="Wedding background music player"
    >
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      {isVisible && (
        <button
          type="button"
          onClick={toggleMusic}
          className={`music-toggle-btn ${isPlaying ? "is-playing" : "is-paused"}`}
          aria-label={isPlaying ? "Pause background wedding music" : "Play background wedding music"}
          title={isPlaying ? "Pause background music" : "Play background music"}
        >
          {/* Subtle gold ripple rings pulsing when music is playing */}
          {isPlaying && <span className="music-pulse-ring" aria-hidden="true" />}
          {isPlaying && <span className="music-pulse-ring ring-2" aria-hidden="true" />}

          {/* Music Disc with Royal Icon */}
          <div className="music-icon-disc">
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="music-svg-icon"
                aria-hidden="true"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" fill="currentColor" />
                <circle cx="18" cy="16" r="3" fill="currentColor" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="music-svg-icon"
                aria-hidden="true"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" fill="currentColor" />
                <circle cx="18" cy="16" r="3" fill="currentColor" />
                <line x1="3" y1="3" x2="21" y2="21" stroke="#ff7b7b" strokeWidth="2.5" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
}

export default MusicPlayer;
