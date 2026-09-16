import React from "react";
import { Gift, BookCheck, Headphones, Video, Award, Users } from "lucide-react";

export const BONUSES = [
  {
    number: 1,
    title: "E-book Pregador Vocacionado",
    subtitle: "Mais de 220 páginas",
    description:
      "Manual completo em formato digital com todo o conteúdo teórico, diagramas e modelos práticos para leitura em celular, tablet ou computador.",
    icon: BookCheck,
  },
  {
    number: 2,
    title: "Sermões em Áudio para Estudo e Inspiração",
    subtitle: "Acervo em Áudio",
    description:
      "Mensagens selecionadas em áudio para você ouvir onde estiver, analisar a entonação, as ilustrações e a aplicação prática.",
    icon: Headphones,
  },
  {
    number: 3,
    title: "Curso Como Pregar em Vídeo",
    subtitle: "Treinamento Complementar",
    description:
      "Aulas específicas sobre gravação de mensagens, postura diante da câmera, iluminação simples e comunicação para a internet.",
    icon: Video,
  },
  {
    number: 4,
    title: "Manual do Pregador de Sucesso",
    subtitle: "Guia Rápido de Consulta",
    description:
      "Diretrizes práticas de ética pastoral, etiqueta no púlpito, conduta ministerial e boas práticas para ministrar com excelência.",
    icon: Award,
  },
  {
    number: 5,
    title: "Suporte Direto e Grupo Exclusivo de Alunos",
    subtitle: "Comunidade e Dúvidas",
    description:
      "Canal para esclarecer dúvidas com a equipe e interagir com outros estudantes e obreiros que compartilham a mesma vocação.",
    icon: Users,
  },
];

export const BonusGrid: React.FC = () => {
  return (
    <section id="bonus-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F7F1E7]/70 border-t border-[#DED7CC]/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8BE58]/20 border border-[#E8BE58]/40 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Gift className="w-3.5 h-3.5 text-[#C86E45]" />
            <span>Materiais Complementares Inclusos</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            5 bônus oficialmente confirmados pelo produtor
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Ao se inscrever no treinamento, você recebe acesso integral aos materiais complementares
            sem nenhum custo adicional.
          </p>
        </div>

        {/* Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {BONUSES.map((bonus) => {
            const Icon = bonus.icon;
            return (
              <div
                key={bonus.number}
                className="bg-[#FFFDF8] rounded-2xl p-5 sm:p-6 border border-[#DED7CC] shadow-xs flex flex-col justify-between hover:border-[#356F9F]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C86E45] bg-[#C86E45]/10 px-2.5 py-0.5 rounded-full">
                      Bônus {bonus.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#17324D]/5 text-[#17324D] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#356F9F]" />
                    </div>
                  </div>

                  <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#17324D] mb-1 leading-snug">
                    {bonus.title}
                  </h3>
                  <p className="text-xs text-[#356F9F] font-medium mb-2">{bonus.subtitle}</p>
                  <p className="text-xs sm:text-sm text-[#68727D] leading-relaxed">
                    {bonus.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DED7CC]/60 text-[11px] text-[#2F7665] font-semibold flex items-center gap-1.5">
                  <span>✓ Incluso sem custo extra</span>
                </div>
              </div>
            );
          })}

          {/* Balanced Note Card */}
          <div className="bg-[#17324D] text-[#FFFDF8] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8BE58] bg-[#E8BE58]/15 px-2.5 py-0.5 rounded-full inline-block mb-3">
                Acesso Direto
              </span>
              <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#FFFDF8] mb-2">
                Disponibilizados na Área de Membros
              </h3>
              <p className="text-xs sm:text-sm text-[#DED7CC] leading-relaxed">
                Todos os 5 bônus ficam liberados junto com as 40 videoaulas na plataforma Hotmart,
                com acesso permanente para download e consulta.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#E8BE58] font-medium">
              Sem mensalidades ou cobranças surpresa.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
