import React from "react";
import { Check, ArrowRight, ShieldCheck, BookOpen, Lock, Sparkles, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { TIMED_OFFER_CONFIG, TIMED_OFFER_VARIANTS } from "../config/timedOffer";
import { OFFER_CONFIG } from "../config/offer";
import { navigateToCheckout } from "../lib/checkout";
import { trackTimedOfferClicked, trackTimedOfferDismissed } from "../lib/analytics";
import { OfficialPreacherCharacter } from "./OfficialPreacherCharacter";

interface TimedOfferCardProps {
  onContinueWatching?: () => void;
  wasAlreadyUnlockedOnMount?: boolean;
}

export const TimedOfferCard: React.FC<TimedOfferCardProps> = ({
  onContinueWatching,
  wasAlreadyUnlockedOnMount = false,
}) => {
  const variantCopy = TIMED_OFFER_VARIANTS[TIMED_OFFER_CONFIG.variant];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackTimedOfferClicked({
      buttonText: variantCopy.ctaText,
      offerVariant: TIMED_OFFER_CONFIG.variant,
    });
    navigateToCheckout({
      location: "video_midpoint",
      ctaText: variantCopy.ctaText,
    });
  };

  const handleContinueWatching = (e: React.MouseEvent) => {
    e.preventDefault();
    trackTimedOfferDismissed("continue_watching");
    if (onContinueWatching) {
      onContinueWatching();
    }
    const playerEl = document.getElementById("player-aula");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      id="timed-offer-card"
      role="region"
      aria-label="Oferta contextual de aprofundamento"
      initial={wasAlreadyUnlockedOnMount ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-6 rounded-3xl bg-[#FFFDF8] border-2 border-[#2F7665]/50 p-5 sm:p-7 md:p-9 shadow-lg relative overflow-hidden"
    >
      {/* Decorative subtle background corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8BE58]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Official Character */}
        <div className="shrink-0 flex flex-col items-center">
          <OfficialPreacherCharacter className="w-32 h-44 sm:w-40 sm:h-52" />
          <span className="text-[11px] font-semibold text-[#68727D] tracking-wide mt-1">
            Seu guia Bíblia Resolve
          </span>
        </div>

        {/* Content & Action */}
        <div className="flex-1 text-center md:text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8BE58]/20 border border-[#E8BE58]/40 text-[#17324D] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C86E45]" />
            <span>{TIMED_OFFER_CONFIG.eyebrow}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#17324D] leading-snug tracking-tight mb-2">
            {variantCopy.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#22303C]/85 leading-relaxed mb-4 max-w-2xl">
            {variantCopy.description}
          </p>

          {/* Highlights checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#17324D] font-medium mb-6 text-left">
            {TIMED_OFFER_CONFIG.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#2F7665]" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Price & Primary CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={OFFER_CONFIG.checkoutUrl}
              onClick={handleCtaClick}
              id="timed-offer-cta-button"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.99] text-[#FFFDF8] font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2F7665]/40 min-h-[48px]"
            >
              <span>{variantCopy.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#E8BE58]" />
            </a>

            <button
              type="button"
              onClick={handleContinueWatching}
              id="timed-offer-secondary-button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#DED7CC] bg-[#F7F1E7]/50 hover:bg-[#F7F1E7] text-[#17324D] font-semibold text-xs sm:text-sm transition-colors cursor-pointer min-h-[48px]"
            >
              <ChevronUp className="w-3.5 h-3.5 text-[#356F9F]" />
              <span>{TIMED_OFFER_CONFIG.secondaryActionText}</span>
            </button>
          </div>

          {/* Subtext and platform trust */}
          <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs text-[#68727D]">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#2F7665]" />
              {TIMED_OFFER_CONFIG.secureCheckoutNotice}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2F7665]" />
              Garantia de 7 dias
            </span>
            <span>•</span>
            <span>Até 7x de R$ 10,61 (ou R$ 64,90 à vista)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
