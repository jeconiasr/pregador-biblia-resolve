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
    question: "O curso começa do zero?",
    answer:
      "Sim, o treinamento começa pelos fundamentos da interpretação bíblica e da estruturação do sermão, atendendo tanto quem nunca pregou quanto quem já prega e busca organizar melhor o seu método.",
  },
  {
    id: "faq-2",
    question: "Preciso ter feito seminário para acompanhar?",
    answer:
      "Não há essa exigência na oferta. A linguagem utilizada pelo professor Wallace Mello é didática, acessível e voltada para a aplicação prática no ministério local, sem pré-requisito de formação teológica prévia.",
  },
  {
    id: "faq-3",
    question: "Como receberei o acesso ao curso?",
    answer:
      "O pagamento e o processamento são realizados pela Hotmart. Assim que a transação for confirmada (instantânea no cartão ou Pix), a Hotmart envia um e-mail com os dados e o link para criar sua senha e entrar na área de membros.",
  },
  {
    id: "faq-4",
    question: "Por quanto tempo terei acesso às aulas?",
    answer:
      "O produtor informa acesso vitalício. Isso significa que você pode assistir no seu ritmo, quando quiser, e revisitar os módulos sempre que for preparar uma nova pregação.",
  },
  {
    id: "faq-5",
    question: "Há certificado de conclusão?",
    answer:
      "Sim, ao concluir as 40 videoaulas, você pode emitir digitalmente o seu certificado de conclusão disponibilizado na própria plataforma.",
  },
  {
    id: "faq-6",
    question: "O curso é reconhecido pelo MEC?",
    answer:
      "Não. Trata-se de um curso livre de capacitação bíblica, ministerial e eclesiástica, amparado pela Lei de Diretrizes e Bases da Educação (Lei nº 9.394/96). Não confere grau acadêmico superior nem substitui graduação universitária.",
  },
  {
    id: "faq-7",
    question: "Existe suporte para tirar dúvidas?",
    answer:
      "O produtor informa que há suporte para os alunos tirarem dúvidas sobre os conteúdos do treinamento diretamente na plataforma de estudos.",
  },
  {
    id: "faq-8",
    question: "Como funciona a garantia de 30 dias?",
    answer:
      "O produtor informa um prazo de garantia incondicional de 30 dias. Se dentro desse período você avaliar que o treinamento não atende às suas expectativas, pode solicitar o cancelamento e reembolso de acordo com as diretrizes da Hotmart.",
  },
  {
    id: "faq-9",
    question: "A Bíblia Resolve é a produtora deste treinamento?",
    answer:
      "Não. A Bíblia Resolve é um portal independente de divulgação bíblica e atua nesta página como afiliada. O curso, as videoaulas, o suporte e a entrega são de responsabilidade do Instituto de Aperfeiçoamento Cristão na Hotmart.",
  },
  {
    id: "faq-10",
    question: "A aula gratuita acima faz parte do curso?",
    answer:
      "A aula disponibilizada nesta página é um conteúdo aberto publicado pelo canal Aperfeiçoamento Cristão no YouTube sobre esboço passo a passo. Ela foi selecionada para entregar valor imediato a você antes de qualquer decisão comercial.",
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
