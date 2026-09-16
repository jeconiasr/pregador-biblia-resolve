import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, ExternalLink, RefreshCw, Sparkles, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VIDEO_CONFIG } from "../config/video";
import { TIMED_OFFER_CONFIG } from "../config/timedOffer";
import {
  trackEvent,
  trackTimedOfferRevealed,
  trackTimedOfferClicked,
  trackTimedOfferDismissed,
} from "../lib/analytics";
import { TimedOfferCard } from "./TimedOfferCard";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface PrivacyYouTubePlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const PrivacyYouTubePlayer: React.FC<PrivacyYouTubePlayerProps> = ({ onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [startSeconds, setStartSeconds] = useState<number>(VIDEO_CONFIG.startSeconds);
  const [thumbnailError, setThumbnailError] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [useFallbackIframe, setUseFallbackIframe] = useState<boolean>(false);

  // Timed Offer state
  const [isOfferUnlocked, setIsOfferUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(TIMED_OFFER_CONFIG.storageKey) === "true";
      } catch {
        return false;
      }
    }
    return false;
  });
  const [wasUnlockedOnMount] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(TIMED_OFFER_CONFIG.storageKey) === "true";
      } catch {
        return false;
      }
    }
    return false;
  });
  const [showOverlayBanner, setShowOverlayBanner] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // Refs for tracking and player instances
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackPlaybackSecondsRef = useRef<number>(0);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef<boolean>(isOfferUnlocked);

  // Sync isPlaying up to App
  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  // Unlock offer helper
  const unlockTimedOffer = useCallback(
    (source: "youtube_api" | "fallback_timer", currentTime: number, duration: number) => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      setIsOfferUnlocked(true);
      try {
        localStorage.setItem(TIMED_OFFER_CONFIG.storageKey, "true");
      } catch {
        // Safe storage fallback
      }

      // Track revealed event
      const watchedPct = duration > 0 ? (currentTime / duration) * 100 : 50;
      trackTimedOfferRevealed({
        currentTime,
        duration: duration || 1470,
        watchedPercentage: watchedPct,
        triggerSource: source,
        offerVariant: TIMED_OFFER_CONFIG.variant,
      });

      // Show overlay banner for 8 seconds
      setShowOverlayBanner(true);
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
      bannerTimerRef.current = setTimeout(() => {
        setShowOverlayBanner(false);
      }, TIMED_OFFER_CONFIG.bannerDisplayDurationSeconds * 1000);
    },
    []
  );

  // Milestone telemetry (standard 25%, 50%, complete)
  useEffect(() => {
    let t25: NodeJS.Timeout;
    let t50: NodeJS.Timeout;
    let tComplete: NodeJS.Timeout;

    if (isPlaying) {
      t25 = setTimeout(() => {
        trackEvent("video_25", { percent: 25 });
      }, 360000);

      t50 = setTimeout(() => {
        trackEvent("video_50", { percent: 50 });
      }, 720000);

      tComplete = setTimeout(() => {
        trackEvent("video_complete", { percent: 100 });
      }, 1440000);
    }

    return () => {
      clearTimeout(t25);
      clearTimeout(t50);
      clearTimeout(tComplete);
    };
  }, [isPlaying]);

  // Cleanup banner timer on unmount
  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  // Initialize YouTube IFrame API when user starts playing
  useEffect(() => {
    if (!isPlaying) return;

    let isSubscribed = true;
    let fallbackTimeout: NodeJS.Timeout;

    const initYTPlayer = () => {
      if (!isSubscribed) return;
      try {
        const playerElement = document.getElementById("youtube-player-mount");
        if (!playerElement || !window.YT || !window.YT.Player) {
          setUseFallbackIframe(true);
          return;
        }

        // Destroy previous player instance if exists
        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player("youtube-player-mount", {
          videoId: VIDEO_CONFIG.youtubeId,
          playerVars: {
            autoplay: 1,
            start: startSeconds,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              if (!isSubscribed) return;
              setIframeLoaded(true);
              try {
                event.target.playVideo();
              } catch {
                // Autoplay policy fallback
              }
            },
            onStateChange: (event: any) => {
              if (!isSubscribed) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              const isPlayingState = event.data === 1;
              setIsVideoPlaying(isPlayingState);

              // If playing, check progress immediately (e.g. if started at 20:13)
              if (isPlayingState && !hasTriggeredRef.current) {
                try {
                  const curr = event.target.getCurrentTime();
                  const dur = event.target.getDuration() || 1470;
                  if (dur > 0 && curr >= dur * TIMED_OFFER_CONFIG.triggerPercentage) {
                    unlockTimedOffer("youtube_api", curr, dur);
                  }
                } catch {
                  // ignore
                }
              }
            },
            onError: () => {
              if (isSubscribed) setUseFallbackIframe(true);
            },
          },
        });
      } catch {
        if (isSubscribed) setUseFallbackIframe(true);
      }
    };

    // Load YouTube API script if not loaded
    if (window.YT && window.YT.Player) {
      initYTPlayer();
    } else {
      const existingScript = document.getElementById("youtube-api-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "youtube-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initYTPlayer();
      };

      // Fallback timeout in case YouTube API script fails or is blocked
      fallbackTimeout = setTimeout(() => {
        if (!iframeLoaded && (!window.YT || !window.YT.Player)) {
          setUseFallbackIframe(true);
        }
      }, 4000);
    }

    return () => {
      isSubscribed = false;
      clearTimeout(fallbackTimeout);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [isPlaying, startSeconds, unlockTimedOffer]);

  // Real progress polling interval while video is playing
  useEffect(() => {
    if (!isPlaying || hasTriggeredRef.current) return;

    const interval = setInterval(() => {
      if (hasTriggeredRef.current) {
        clearInterval(interval);
        return;
      }

      // Check YouTube Player API
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration() || 1470;

          if (duration > 0 && currentTime >= duration * TIMED_OFFER_CONFIG.triggerPercentage) {
            unlockTimedOffer("youtube_api", currentTime, duration);
            clearInterval(interval);
          }
        } catch {
          // Player not yet responding
        }
      }

      // Fallback active ticker (runs ONLY if fallback iframe is active AND page is visible)
      if (useFallbackIframe && document.visibilityState === "visible") {
        fallbackPlaybackSecondsRef.current += 1;
        if (fallbackPlaybackSecondsRef.current >= TIMED_OFFER_CONFIG.fallbackTriggerSeconds) {
          unlockTimedOffer("fallback_timer", fallbackPlaybackSecondsRef.current, 1470);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, useFallbackIframe, unlockTimedOffer]);

  const handleStartPlay = (customStart?: number) => {
    const start = customStart !== undefined ? customStart : 0;
    setStartSeconds(start);
    fallbackPlaybackSecondsRef.current = start;
    setIsPlaying(true);
    setIframeLoaded(false);

    trackEvent("video_thumbnail_click");
    trackEvent("video_start", { start_seconds: start });

    // If starting at or past 50% (e.g. 20:13 = 1213s > 735s), trigger immediately
    if (start >= 1470 * TIMED_OFFER_CONFIG.triggerPercentage && !hasTriggeredRef.current) {
      unlockTimedOffer("youtube_api", start, 1470);
    }
  };

  const handleResumeSharedTimestamp = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("resume_shared_timestamp_click", {
      timestamp: VIDEO_CONFIG.sharedTimestampSeconds,
      formatted: "20:13",
    });
    handleStartPlay(VIDEO_CONFIG.sharedTimestampSeconds);
  };

  const handleBannerClose = () => {
    setShowOverlayBanner(false);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    trackTimedOfferDismissed("banner_close");
  };

  const handleBannerCtaClick = () => {
    setShowOverlayBanner(false);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    trackTimedOfferClicked({
      buttonText: TIMED_OFFER_CONFIG.overlayButtonText,
      offerVariant: TIMED_OFFER_CONFIG.variant,
    });

    const cardEl = document.getElementById("timed-offer-card");
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentFallbackEmbedUrl = `https://www.youtube-nocookie.com/embed/${VIDEO_CONFIG.youtubeId}?rel=0&playsinline=1&autoplay=1${
    startSeconds > 0 ? `&start=${startSeconds}` : ""
  }`;

  return (
    <section id="player-aula" className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8BE58]/15 border border-[#E8BE58]/30 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C86E45]" />
            <span>Conteúdo Principal da Página</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#17324D] mb-2">
            Dê o play e acompanhe o passo a passo
          </h2>
          <p className="text-sm sm:text-base text-[#68727D] max-w-xl mx-auto">
            Separe a Bíblia, um caderno e alguns minutos sem interrupções. Ao final, use o roteiro
            abaixo para revisar o seu próprio esboço.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative rounded-2xl overflow-hidden bg-[#17324D] shadow-xl border border-[#DED7CC]/60">
          {/* 16:9 Aspect Ratio Container */}
          <div className="relative w-full aspect-video">
            {!isPlaying ? (
              // Facade / Preview Thumbnail
              <div className="relative w-full h-full group cursor-pointer" onClick={() => handleStartPlay(0)}>
                <img
                  src={thumbnailError ? VIDEO_CONFIG.fallbackThumbnailUrl : VIDEO_CONFIG.thumbnailUrl}
                  alt={VIDEO_CONFIG.title}
                  onError={() => setThumbnailError(true)}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/80 via-[#17324D]/30 to-transparent group-hover:from-[#17324D]/70 transition-colors" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-[#17324D]/90 text-[#FFFDF8] text-xs font-semibold px-2.5 py-1 rounded-md tracking-wide shadow-sm border border-white/10">
                  24:30 min
                </div>

                {/* Big Center Play Button & Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#E8BE58] bg-[#17324D]/80 px-3 py-1 rounded-full mb-3 border border-[#E8BE58]/30">
                    Como montar um esboço bíblico
                  </span>
                  <button
                    type="button"
                    aria-label="Assistir à aula de esboço de pregação"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2F7665] group-hover:bg-[#24594D] text-[#FFFDF8] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#E8BE58]/80 cursor-pointer"
                  >
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-current text-[#FFFDF8]" />
                  </button>
                  <p className="mt-4 text-[#FFFDF8] font-semibold text-sm sm:text-base drop-shadow-sm text-center">
                    Clique para iniciar a aula gratuita
                  </p>
                </div>

                {/* Bottom title preview */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                  <span className="truncate font-medium">{VIDEO_CONFIG.title}</span>
                  <span className="shrink-0 ml-2 text-white/60">Canal {VIDEO_CONFIG.channelName}</span>
                </div>
              </div>
            ) : (
              // Active Player Container (API or Fallback iframe)
              <div className="relative w-full h-full bg-black">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#17324D] text-white/80 gap-3 z-10">
                    <div className="w-8 h-8 border-3 border-[#E8BE58] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-[#DED7CC]">Carregando aula segura...</span>
                  </div>
                )}

                {useFallbackIframe ? (
                  <iframe
                    src={currentFallbackEmbedUrl}
                    title={`${VIDEO_CONFIG.title} - Aula Completa`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                    onLoad={() => setIframeLoaded(true)}
                  />
                ) : (
                  <div id="youtube-player-mount" className="w-full h-full" />
                )}

                {/* 1. Discrete Overlay Banner over video (approx 8 seconds) */}
                <AnimatePresence>
                  {showOverlayBanner && (
                    <motion.div
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-30 bg-[#FFFDF8]/95 backdrop-blur-md border border-[#2F7665]/50 rounded-xl p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-2 pointer-events-auto"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 pl-1">
                        <span className="w-2 h-2 rounded-full bg-[#2F7665] shrink-0 animate-pulse" />
                        <p className="text-xs sm:text-sm font-semibold text-[#17324D] leading-tight line-clamp-2">
                          {TIMED_OFFER_CONFIG.overlayBannerText}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleBannerCtaClick}
                          className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#2F7665] hover:bg-[#24594D] active:scale-95 text-[#FFFDF8] font-bold text-xs shadow transition-all whitespace-nowrap min-h-[44px] cursor-pointer"
                        >
                          <span>{TIMED_OFFER_CONFIG.overlayButtonText}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E8BE58]" />
                        </button>

                        <button
                          type="button"
                          onClick={handleBannerClose}
                          aria-label="Fechar aviso de oferta"
                          className="p-2 rounded-lg text-[#68727D] hover:text-[#17324D] hover:bg-[#DED7CC]/40 transition-colors cursor-pointer min-h-[44px] min-w-[36px] flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Player Metadata & Disclaimers Footer */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#68727D] border-b border-[#DED7CC]/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2F7665]" />
            <span>
              Aula publicada pelo canal <strong>{VIDEO_CONFIG.channelName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={VIDEO_CONFIG.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("producer_page_click", { destination: "youtube_watch" })}
              className="inline-flex items-center gap-1.5 text-[#356F9F] hover:text-[#17324D] font-medium transition-colors"
            >
              <span>Assistir no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {isPlaying && (
              <button
                type="button"
                onClick={() => handleStartPlay(0)}
                className="inline-flex items-center gap-1 text-[#68727D] hover:text-[#17324D] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reiniciar do 0:00</span>
              </button>
            )}
          </div>
        </div>

        {/* Discrete Shared Timestamp Link (20:13) */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleResumeSharedTimestamp}
            className="text-xs sm:text-sm text-[#356F9F] hover:text-[#17324D] transition-colors underline-offset-4 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Já começou a assistir?</span>
            <span className="font-semibold text-[#17324D]">Continuar de 20:13</span>
          </button>
        </div>

        {/* 2. Permanent Card unlocked below video (at 50% or if already unlocked) */}
        {isOfferUnlocked && (
          <TimedOfferCard
            wasAlreadyUnlockedOnMount={wasUnlockedOnMount}
            onContinueWatching={() => setShowOverlayBanner(false)}
          />
        )}
      </div>
    </section>
  );
};

