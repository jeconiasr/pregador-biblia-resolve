import React from "react";
import { ArrowRight } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";
import { navigateToCheckout } from "../lib/checkout";
import { trackCheckoutClick } from "../lib/analytics";

interface MobileOfferBarProps {
  show: boolean;
}

export const MobileOfferBar: React.FC<MobileOfferBarProps> = ({ show }) => {
  if (!show) return null;

  const handleMobileCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCheckoutClick("mobile_sticky_bar", "QUERO ME INSCREVER");
    navigateToCheckout({
      location: "mobile_sticky_bar",
      ctaText: "QUERO ME INSCREVER",
    });
  };

  return (
    <aside
      id="mobile-offer-bar"
      aria-label="Acesso rápido à inscrição"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#17324D] text-[#FFFDF8] border-t border-[#DED7CC]/30 p-3 shadow-2xl animate-fadeIn no-print"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#DED7CC] uppercase tracking-wider font-semibold">
            {OFFER_CONFIG.accessType}
          </span>
          <span className="text-sm font-black text-[#FFFDF8] tracking-tight leading-none">
            7x de R$ 10,61
          </span>
          <span className="text-[10px] text-[#DED7CC]/80">ou R$ 64,90 à vista</span>
        </div>

        <a
          href={OFFER_CONFIG.checkoutUrl}
          onClick={handleMobileCheckout}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#2F7665] active:bg-[#24594D] text-[#FFFDF8] font-bold text-xs sm:text-sm shadow-md cursor-pointer min-h-[48px]"
        >
          <span>QUERO ME INSCREVER</span>
          <ArrowRight className="w-4 h-4 text-[#E8BE58]" />
        </a>
      </div>
    </aside>
  );
};
