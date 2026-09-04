import React, { useState, useEffect } from "react";
import { Play, ExternalLink, RefreshCw, Sparkles } from "lucide-react";
import { VIDEO_CONFIG } from "../config/video";
import { trackEvent } from "../lib/analytics";

interface PrivacyYouTubePlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const PrivacyYouTubePlayer: React.FC<PrivacyYouTubePlayerProps> = ({ onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [startSeconds, setStartSeconds] = useState<number>(VIDEO_CONFIG.startSeconds);
  const [thumbnailError, setThumbnailError] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  const handleStartPlay = (customStart?: number) => {
    const start = customStart !== undefined ? customStart : 0;
    setStartSeconds(start);
    setIsPlaying(true);
    setIframeLoaded(false);

    trackEvent("video_thumbnail_click");
    trackEvent("video_start", { start_seconds: start });
  };

  const handleResumeSharedTimestamp = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("resume_shared_timestamp_click", {
      timestamp: VIDEO_CONFIG.sharedTimestampSeconds,
      formatted: "20:13",
    });
    handleStartPlay(VIDEO_CONFIG.sharedTimestampSeconds);
  };

  const currentEmbedUrl = `https://www.youtube-nocookie.com/embed/${VIDEO_CONFIG.youtubeId}?rel=0&playsinline=1&autoplay=1${
    startSeconds > 0 ? `&start=${startSeconds}` : ""
  }`;

  return (
    <section id="player-aula" className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
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

                {/* Big Center Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <button
                    type="button"
                    aria-label="Assistir à aula de esboço de pregação"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2F7665] group-hover:bg-[#24594D] text-[#FFFDF8] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#E8BE58]/80 cursor-pointer"
                  >
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-current text-[#FFFDF8]" />
                  </button>
                  <p className="mt-4 text-[#FFFDF8] font-medium text-sm sm:text-base drop-shadow-sm text-center">
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
              // Active YouTube Iframe
              <div className="relative w-full h-full bg-black">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#17324D] text-white/80 gap-3">
                    <div className="w-8 h-8 border-3 border-[#E8BE58] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-[#DED7CC]">Carregando aula segura sem anúncios invasivos...</span>
                  </div>
                )}
                <iframe
                  src={currentEmbedUrl}
                  title={`${VIDEO_CONFIG.title} - Aula Completa`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Player Metadata & Disclaimers Footer */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#68727D] border-b border-[#DED7CC]/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2F7665]" />
            <span>Aula publicada pelo canal <strong>{VIDEO_CONFIG.channelName}</strong></span>
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
                className="inline-flex items-center gap-1 text-[#68727D] hover:text-[#17324D] transition-colors"
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
            <span>Você recebeu o vídeo já em andamento?</span>
            <span className="font-semibold text-[#17324D]">Retomar do ponto compartilhado: 20:13</span>
          </button>
        </div>
      </div>
    </section>
  );
};
