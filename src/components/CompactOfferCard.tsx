import React from "react";
import { Check, ShieldCheck, Lock, ArrowRight, Sparkles } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";
import { navigateToCheckout } from "../lib/checkout";
import { trackCheckoutClick } from "../lib/analytics";

export const CompactOfferCard: React.FC = () => {
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCheckoutClick("first_compact_offer", "QUERO CONTINUAR MEU PREPARO");
    navigateToCheckout({
      location: "first_compact_offer",
      ctaText: "QUERO CONTINUAR MEU PREPARO",
    });
  };

  return (
    <section id="primeira-oferta" className="py-10 sm:py-14 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#FFFDF8] rounded-2xl border-2 border-[#2F7665]/50 shadow-md overflow-hidden">
          {/* Top banner */}
          <div className="bg-[#17324D] text-[#FFFDF8] p-5 sm:p-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8BE58]/20 text-[#E8BE58] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Formação Passo a Passo</span>
            </div>
            <h3 className="font-serif-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFDF8] tracking-tight">
              Continue seu preparo com o Manual Completo Pregador Vocacionado
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#DED7CC] max-w-xl mx-auto">
              Um treinamento passo a passo para quem deseja estudar, organizar e transmitir mensagens
              bíblicas com mais clareza e segurança.
            </p>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7">
            {/* 4 Items Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F1E7] border border-[#DED7CC]/60 text-xs sm:text-sm text-[#17324D] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#2F7665]" />
                </span>
                <span>40 videoaulas</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F1E7] border border-[#DED7CC]/60 text-xs sm:text-sm text-[#17324D] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#2F7665]" />
                </span>
                <span>5 bônus de apoio</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F1E7] border border-[#DED7CC]/60 text-xs sm:text-sm text-[#17324D] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#2F7665]" />
                </span>
                <span>Certificado digital</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F1E7] border border-[#DED7CC]/60 text-xs sm:text-sm text-[#17324D] font-medium">
                <span className="w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#2F7665]" />
                </span>
                <span>Acesso vitalício</span>
              </div>
            </div>

            {/* Price section */}
            <div className="text-center p-4 rounded-xl bg-[#F7F1E7]/70 border border-[#DED7CC] mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#68727D]">
                Investimento
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#17324D] tracking-tight mt-0.5">
                Até 7x de R$ 10,61
              </p>
              <p className="text-xs sm:text-sm text-[#22303C]/80 mt-0.5 font-medium">
                ou <strong className="text-[#17324D]">R$ 64,90</strong> à vista
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-2 text-center">
              <a
                href={OFFER_CONFIG.checkoutUrl}
                onClick={handleCheckout}
                id="compact-checkout-button"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.99] text-[#FFFDF8] font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <span>QUERO CONTINUAR MEU PREPARO</span>
                <ArrowRight className="w-5 h-5 text-[#E8BE58]" />
              </a>

              <p className="text-xs text-[#68727D] flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-[#2F7665]" />
                <span>Compra processada com segurança pela Hotmart</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
