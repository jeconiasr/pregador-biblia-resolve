import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Como recebo o acesso ao curso?",
    answer:
      "O acesso é enviado imediatamente após a confirmação do pagamento. Você receberá um e-mail da Hotmart com seus dados de login e o link para acessar a plataforma e começar a assistir às aulas agora mesmo.",
  },
  {
    id: "faq-2",
    question: "Por quanto tempo terei acesso às aulas?",
    answer:
      "O acesso é vitalício. Você pode assistir no seu próprio ritmo, rever quantas vezes precisar e consultar os materiais e bônus sempre que for preparar uma nova pregação.",
  },
  {
    id: "faq-3",
    question: "O curso serve para quem nunca pregou?",
    answer:
      "Sim, perfeitamente. O professor Wallace Mello ensina desde os primeiros passos da interpretação do texto bíblico até a montagem da estrutura e a oratória, com linguagem didática e acessível.",
  },
  {
    id: "faq-4",
    question: "O curso tem certificado?",
    answer:
      "Sim. Ao concluir a visualização das 40 videoaulas, você pode emitir digitalmente o seu certificado de conclusão diretamente na área de membros, sem custo adicional.",
  },
  {
    id: "faq-5",
    question: "Quais são as formas de pagamento?",
    answer:
      "Você pode pagar com cartão de crédito (em até 7x de R$ 10,61), Pix à vista (com liberação imediata) ou boleto bancário através da plataforma segura da Hotmart.",
  },
  {
    id: "faq-6",
    question: "Como funciona a garantia de 7 dias?",
    answer:
      "Você tem 7 dias para testar todo o conteúdo. Se achar que o treinamento não é para você, basta solicitar o reembolso com um clique na Hotmart e receber 100% do seu dinheiro de volta, sem burocracia.",
  },
  {
    id: "faq-7",
    question: "A aula gratuita acima faz parte do curso?",
    answer:
      "A aula gratuita disponibilizada nesta página é um conteúdo aberto sobre esboço bíblico em Isaías 6 para entregar valor imediato a você. O curso completo aprofunda todas as etapas com 40 aulas gravadas e 5 bônus.",
  },
  {
    id: "faq-8",
    question: "A Bíblia Resolve é a produtora deste treinamento?",
    answer:
      "Não. A Bíblia Resolve atua como portal independente de indicação e curadoria editorial. O treinamento, suporte, plataforma e certificação são de responsabilidade do Instituto de Aperfeiçoamento Cristão.",
  },
];

export const AccessibleFaq: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "faq-1": true });

  const toggleItem = (id: string, question: string) => {
    const isCurrentlyOpen = !!openItems[id];
    setOpenItems((prev) => ({
      ...prev,
      [id]: !isCurrentlyOpen,
    }));

    if (!isCurrentlyOpen) {
      trackEvent("faq_open", { faq_id: id, question });
    }
  };

  return (
    <section id="faq-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#356F9F]" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            Respostas claras sobre o treinamento e o acesso
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68727D]">
            Tire suas dúvidas sobre o formato, garantia, certificado e entrega das aulas.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openItems[item.id];
            const triggerId = `faq-trigger-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="border border-[#DED7CC] rounded-xl overflow-hidden bg-[#F7F1E7]/30 transition-all hover:border-[#356F9F]/40"
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id, item.question)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left bg-[#FFFDF8] hover:bg-[#F7F1E7]/60 transition-colors cursor-pointer"
                >
                  <span className="font-serif-editorial text-base sm:text-lg font-bold text-[#17324D]">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#356F9F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#68727D] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-5 py-4 border-t border-[#DED7CC]/70 bg-[#FFFDF8] text-sm sm:text-base text-[#22303C]/90 leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
