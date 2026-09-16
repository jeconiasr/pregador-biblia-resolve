import React, { useEffect, useRef } from "react";
import { Check, ShieldCheck, Lock, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";
import { navigateToCheckout } from "../lib/checkout";
import { trackOnce, trackCheckoutClick } from "../lib/analytics";

export const OFFER_ITEMS = [
  "40 videoaulas passo a passo",
  "E-book Pregador Vocacionado (220+ páginas)",
  "Sermões em Áudio para Estudo",
  "Curso Como Pregar em Vídeo",
  "Manual do Pregador de Sucesso",
  "Suporte direto e grupo de alunos",
  "Certificado digital de conclusão",
  "Acesso vitalício com atualizações",
];

export const OfferCard: React.FC = () => {
  const offerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trackOnce("offer_view");
        }
      },
      { threshold: 0.25 }
    );

    if (offerRef.current) {
      observer.observe(offerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCheckoutClick("full_offer_card", "QUERO GARANTIR MINHA VAGA AGORA");
    navigateToCheckout({
      location: "full_offer_card",
      ctaText: "QUERO GARANTIR MINHA VAGA AGORA",
    });
  };

  const handleProducerClick = () => {
    trackCheckoutClick("producer_link", "VER PÁGINA OFICIAL DO PRODUTOR");
  };

  return (
    <section id="oferta-completa" ref={offerRef} className="py-12 sm:py-18 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto">
        {/* Main Offer Card */}
        <div className="bg-[#FFFDF8] rounded-3xl border-2 border-[#2F7665] shadow-xl overflow-hidden relative">
          {/* Header Banner */}
          <div className="bg-[#17324D] text-[#FFFDF8] p-6 sm:p-8 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8BE58]/20 border border-[#E8BE58]/40 text-[#E8BE58] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FORMAÇÃO COMPLETA • ACESSO VITALÍCIO</span>
            </div>

            <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFDF8]">
              Tudo o que você recebe ao entrar hoje:
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#DED7CC] max-w-lg mx-auto">
              {OFFER_CONFIG.productName} — ministrado pelo prof. Wallace Mello.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Checklist items */}
            <div className="mb-8">
              <ul className="space-y-3">
                {OFFER_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-[#22303C]">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center text-xs font-bold">
                      <Check className="w-3.5 h-3.5 text-[#2F7665]" />
                    </span>
                    <span className="leading-snug font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-[#F7F1E7] border border-[#DED7CC] text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#68727D]">
                Valor Promocional
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17324D] tracking-tight">
                  Até 7x de R$ 10,61
                </span>
              </div>
              <p className="mt-1 text-sm sm:text-base text-[#22303C]/80 font-medium">
                ou <strong className="text-[#17324D] font-bold">R$ 64,90</strong> à vista
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#24594D] font-medium bg-[#2F7665]/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#2F7665]" />
                <span>Pagamento único • Acesso imediato • Sem mensalidades</span>
              </div>
            </div>

            {/* Buy CTA Button */}
            <div className="space-y-3 text-center">
              <a
                href={OFFER_CONFIG.checkoutUrl}
                onClick={handleCheckout}
                id="main-offer-checkout-button"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.99] text-[#FFFDF8] font-bold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2F7665]/40 min-h-[52px]"
              >
                <span>QUERO GARANTIR MINHA VAGA AGORA</span>
                <ArrowRight className="w-5 h-5 text-[#E8BE58]" />
              </a>

              {/* Microcopy */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#68727D] pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#2F7665]" />
                  Pagamento processado com segurança pela <strong>{OFFER_CONFIG.platform}</strong>
                </span>
                <span>•</span>
                <span>Garantia incondicional de <strong>7 dias</strong></span>
              </div>
            </div>

            {/* Link to producer's official page */}
            <div className="mt-6 pt-5 border-t border-[#DED7CC]/70 text-center">
              <a
                href={OFFER_CONFIG.producerPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleProducerClick}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#356F9F] hover:text-[#17324D] transition-colors underline-offset-4 hover:underline"
              >
                <span>VER PÁGINA OFICIAL DO PRODUTOR</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
