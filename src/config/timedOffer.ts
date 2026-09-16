import { OFFER_CONFIG } from "./offer";

export interface OfferVariantCopy {
  title: string;
  description: string;
  ctaText: string;
}

export const TIMED_OFFER_VARIANTS: Record<"A" | "B", OfferVariantCopy> = {
  A: {
    title: "Vamos continuar seu preparo?",
    description:
      "Nesta aula, você aprendeu os primeiros passos para organizar um esboço. No treinamento completo, você encontrará uma formação organizada para estudar, desenvolver e apresentar mensagens bíblicas com mais clareza e segurança.",
    ctaText: "QUERO COMEÇAR O TREINAMENTO",
  },
  B: {
    title: "Pronto para transformar esse primeiro esboço em uma preparação completa?",
    description:
      "A aula mostrou como começar. O treinamento conduz você pelas próximas etapas da preparação de uma mensagem com fidelidade bíblica e método estruturado.",
    ctaText: "QUERO CONHECER O CURSO COMPLETO",
  },
};

export const TIMED_OFFER_CONFIG = {
  enabled: true,
  triggerPercentage: 0.5,
  fallbackTriggerSeconds: 720,
  variant: "A" as "A" | "B",
  storageKey: "pregador_timed_offer_unlocked",
  checkoutUrl: OFFER_CONFIG.checkoutUrl,
  bannerDisplayDurationSeconds: 8,
  eyebrow: "SUA PRÓXIMA ETAPA",
  highlights: [
    "40 videoaulas práticas passo a passo",
    "Método organizado e progressivo",
    "Materiais complementares inclusos",
    "Certificado digital de conclusão",
    "Acesso vitalício à área de membros",
  ],
  overlayTitle: "Você já deu o primeiro passo.",
  overlaySubtitle: "Quando estiver pronto, continue seu preparo com o treinamento completo.",
  overlayBannerText: "Você já deu o primeiro passo.",
  overlayButtonText: "CONHECER O TREINAMENTO",
  overlayDismissText: "Continuar assistindo",
  secureCheckoutNotice: "Você será direcionado para o checkout seguro da Hotmart.",
  secondaryActionText: "CONTINUAR ASSISTINDO À AULA",
} as const;
