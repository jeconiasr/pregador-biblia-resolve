import React from "react";
import { Check, X, Compass } from "lucide-react";

export const FitSection: React.FC = () => {
  return (
    <section id="publico-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#F7F1E7]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#356F9F]" />
            <span>Alinhamento de Expectativas</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            Transparência: este treinamento é adequado para o seu momento?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Acreditamos que uma decisão consciente preserva o seu tempo e seus recursos. Veja com
            clareza o propósito do curso:
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Column 1: For whom it makes sense */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#2F7665]/30 shadow-xs">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#DED7CC]/70">
              <div className="w-8 h-8 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center font-bold">
                <Check className="w-5 h-5 text-[#2F7665]" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#17324D]">
                Pode fazer sentido para quem:
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-[#22303C]/90">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Deseja se preparar para a primeira oportunidade de pregar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Já prega e quer organizar melhor o sermão e as notas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Quer compreender e analisar o texto bíblico antes de ensinar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Depende excessivamente de esboços prontos por falta de método próprio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Deseja melhorar a explicação, a aplicação prática e a oratória</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Prefere estudar online, no próprio ritmo e horários disponíveis</span>
              </li>
            </ul>
          </div>

          {/* Column 2: When it might not be a fit */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#C86E45]/30 shadow-xs">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#DED7CC]/70">
              <div className="w-8 h-8 rounded-full bg-[#C86E45]/15 text-[#C86E45] flex items-center justify-center font-bold">
                <X className="w-5 h-5 text-[#C86E45]" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#17324D]">
                Talvez não seja o que procura se:
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-base text-[#22303C]/90">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Espera confirmação automática ou mística de chamado divino</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Procura graduação acadêmica superior reconhecida pelo MEC</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Não deseja dedicar tempo a estudar a Bíblia e praticar os exercícios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Espera convites ou oportunidades ministeriais garantidas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Procura fórmula mágica para nunca sentir frio na barriga</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#C86E45]/10 text-[#C86E45] flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span>Não se adapta ao modelo de videoaulas e estudo online</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
