import React from "react";
import { ArrowRight, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";
import { navigateToCheckout } from "../lib/checkout";
import { trackCheckoutClick } from "../lib/analytics";

export const FinalCta: React.FC = () => {
  const handleFinalCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCheckoutClick("final_cta", "QUERO COMEÇAR O CURSO AGORA");
    navigateToCheckout({
      location: "final_cta",
      ctaText: "QUERO COMEÇAR O CURSO AGORA",
    });
  };

  return (
    <section id="cta-final" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#17324D] text-[#FFFDF8] text-center relative overflow-hidden">
      {/* Subtle radial pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#E8BE58_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8BE58]/20 border border-[#E8BE58]/40 text-[#E8BE58] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Decisão Pessoal</span>
        </div>

        <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFDF8] leading-snug mb-3">
          Pronto para pregar com clareza, fidelidade e segurança?
        </h2>

        <p className="text-sm sm:text-base text-[#DED7CC] max-w-xl mx-auto mb-8 leading-relaxed">
          Dê o próximo passo no seu ministério com o treinamento completo do professor Wallace Mello.
        </p>

        {/* Pricing reminder */}
        <div className="mb-6 p-4 rounded-xl bg-[#FFFDF8]/5 border border-[#FFFDF8]/10 max-w-md mx-auto">
          <p className="text-xs text-[#DED7CC] uppercase tracking-wider font-semibold">
            Inscrição Completa
          </p>
          <p className="text-2xl sm:text-3xl font-black text-[#FFFDF8] tracking-tight mt-1">
            Até 7x de R$ 10,61
          </p>
          <p className="text-xs text-[#DED7CC]/80 mt-0.5">
            ou R$ 64,90 à vista • Acesso vitalício
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href={OFFER_CONFIG.checkoutUrl}
            onClick={handleFinalCheckout}
            id="final-checkout-button"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.98] text-[#FFFDF8] font-bold text-base sm:text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2F7665]/50 w-full sm:w-auto min-h-[52px]"
          >
            <span>QUERO COMEÇAR O CURSO AGORA</span>
            <ArrowRight className="w-5 h-5 text-[#E8BE58]" />
          </a>

          {/* Microcopy trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#DED7CC]/90 mt-2 font-medium">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#E8BE58]" />
              Acesso imediato
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F7665]" />
              7 dias de garantia
            </span>
            <span>•</span>
            <span>Pagamento seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
};
