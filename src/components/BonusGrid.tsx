import React from "react";
import { Gift, BookCheck, Lightbulb, Library, FileText, Languages } from "lucide-react";

export const BONUSES = [
  {
    number: 1,
    title: "Coletânea de 5.000 Sermões",
    description:
      "Material amplo de consulta e estudo homilético para alimentar ideias, observar estruturas e inspirar a elaboração de mensagens próprias (sem incentivo a cópias).",
    icon: BookCheck,
  },
  {
    number: 2,
    title: "Coletânea de 2.700 Ilustrações",
    description:
      "Acervo de histórias, metáforas e referências para enriquecer a explicação do texto e tornar conceitos espirituais claros para a congregação.",
    icon: Lightbulb,
  },
  {
    number: 3,
    title: "Biblioteca do Pregador",
    description:
      "Materiais e subsídios de apoio bíblico e teológico selecionados e apresentados pelo produtor para consulta contínua do estudante.",
    icon: Library,
  },
  {
    number: 4,
    title: "E-book Pregador Vocacionado",
    description:
      "Livro digital complementar em formato PDF com os principais tópicos, tabelas e resumos do método para leitura em computadores, tablets ou celulares.",
    icon: FileText,
  },
  {
    number: 5,
    title: "Introdução ao Hebraico Bíblico para Pregadores",
    description:
      "Aulas introdutórias sobre o idioma original do Antigo Testamento, permitindo compreender raízes de palavras-chave e nuances do texto bíblico.",
    icon: Languages,
  },
];

export const BonusGrid: React.FC = () => {
  return (
    <section id="bonus-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F7F1E7]/70 border-t border-[#DED7CC]/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8BE58]/20 border border-[#E8BE58]/40 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5 text-[#C86E45]" />
            <span>Materiais Complementares Inclusos</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            5 bônus para enriquecer sua pesquisa e preparo
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Além das 40 videoaulas, o treinamento inclui acervos de pesquisa desenvolvidos para
            ampliar seu repertório bíblico e facilitar sua rotina de estudos.
          </p>
        </div>

        {/* Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BONUSES.map((bonus) => {
            const Icon = bonus.icon;
            return (
              <div
                key={bonus.number}
                className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#DED7CC] shadow-xs flex flex-col justify-between hover:border-[#356F9F]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C86E45] bg-[#C86E45]/10 px-2.5 py-0.5 rounded-full">
                      Bônus {bonus.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#17324D]/5 text-[#17324D] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#356F9F]" />
                    </div>
                  </div>

                  <h3 className="font-serif-editorial text-lg font-bold text-[#17324D] mb-2 leading-snug">
                    {bonus.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#68727D] leading-relaxed">
                    {bonus.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DED7CC]/60 text-[11px] text-[#2F7665] font-semibold flex items-center gap-1.5">
                  <span>✓ Incluso gratuitamente na inscrição</span>
                </div>
              </div>
            );
          })}

          {/* Balanced Note Card */}
          <div className="bg-[#17324D] text-[#FFFDF8] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8BE58] bg-[#E8BE58]/15 px-2.5 py-0.5 rounded-full inline-block mb-4">
                Uso Responsável
              </span>
              <h3 className="font-serif-editorial text-lg font-bold text-[#FFFDF8] mb-2">
                Subsídios de Apoio, Não Atalhos
              </h3>
              <p className="text-xs sm:text-sm text-[#DED7CC] leading-relaxed">
                Esses materiais servem como biblioteca de referência para momentos de pesquisa. O
                objetivo do curso é capacitar você a montar suas próprias mensagens com autonomia e
                fidelidade bíblica.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#E8BE58] font-medium">
              Disponibilizados diretamente na área de membros.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
