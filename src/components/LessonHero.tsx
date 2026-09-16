import React from "react";
import { PlayCircle, Clock, ShieldCheck, Film } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export const LessonHero: React.FC = () => {
  const handleWatchClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackEvent("hero_watch_click");
    const videoSection = document.getElementById("player-aula");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="pt-10 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-[#17324D] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5">
          <Film className="w-3.5 h-3.5 text-[#356F9F]" />
          <span>AULA GRATUITA PARA QUEM DESEJA PREGAR</span>
        </div>

        {/* Main headline */}
        <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#17324D] tracking-tight leading-[1.18] mb-5">
          Aprenda a organizar um esboço de pregação passo a passo
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-[#22303C]/85 max-w-2xl mx-auto leading-relaxed mb-8">
          Assista à aula gratuita e descubra como transformar um texto bíblico em uma mensagem organizada, clara e aplicável — mesmo que você ainda esteja começando.
        </p>

        {/* CTA Button to scroll to the video */}
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href="#player-aula"
            onClick={handleWatchClick}
            id="hero-watch-button"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.98] text-[#FFFDF8] font-bold text-base sm:text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#2F7665]/30 cursor-pointer min-h-[48px]"
          >
            <PlayCircle className="w-5 h-5 text-[#E8BE58]" />
            <span>ASSISTIR À AULA GRATUITA</span>
          </a>

          {/* Microcopy */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#68727D] mt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#356F9F]" />
              Cerca de 24 minutos
            </span>
            <span className="text-[#DED7CC]">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F7665]" />
              Sem cadastro
            </span>
            <span className="text-[#DED7CC]">•</span>
            <span>Conteúdo prático</span>
          </div>
        </div>
      </div>
    </section>
  );
};
