import React from "react";
import { CheckCircle2, ArrowRight, Layers, Compass } from "lucide-react";

export const VictorySection: React.FC = () => {
  return (
    <section id="vitoria-section" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F7665]/10 border border-[#2F7665]/20 text-[#24594D] text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2F7665]" />
            <span>Primeira Vitória Prática</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight max-w-2xl mx-auto">
            Se você já consegue enxergar a estrutura, a aula cumpriu seu primeiro papel
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#22303C]/85 max-w-2xl mx-auto leading-relaxed">
            Um esboço claro reduz a improvisação desnecessária e ajuda a mensagem a avançar com
            lógica. Mas um sermão completo também exige compreender o texto, escolher o foco,
            explicar, fundamentar, aplicar e comunicar.
          </p>
        </div>

        {/* Comparison Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Free Lesson role */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-7 border border-[#DED7CC] shadow-xs">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#DED7CC]/60">
              <div className="w-8 h-8 rounded-lg bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#17324D]">
                A aula ajuda você a iniciar
              </h3>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-[#22303C]/90">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Enxergar a estrutura geral do sermão</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Organizar a ideia em uma frase clara</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Pensar em começo, desenvolvimento e fim</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span>Revisar o roteiro antes de ministrar</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Complete Training role */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-7 border-2 border-[#2F7665]/40 shadow-xs relative">
            <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#2F7665] text-[#FFFDF8] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              Próxima Etapa
            </div>

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#DED7CC]/60">
              <div className="w-8 h-8 rounded-lg bg-[#2F7665]/10 text-[#24594D] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#17324D]">
                Uma formação completa aprofunda
              </h3>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-[#22303C]/90">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center text-xs font-bold">
                  <ArrowRight className="w-3 h-3 text-[#2F7665]" />
                </span>
                <span>Interpretar e delimitar o texto bíblico com método</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center text-xs font-bold">
                  <ArrowRight className="w-3 h-3 text-[#2F7665]" />
                </span>
                <span>Definir tema, título e propósito específico</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center text-xs font-bold">
                  <ArrowRight className="w-3 h-3 text-[#2F7665]" />
                </span>
                <span>Construir pontos, subdivisões e fundamentação sólida</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[#2F7665]/15 text-[#24594D] flex items-center justify-center text-xs font-bold">
                  <ArrowRight className="w-3 h-3 text-[#2F7665]" />
                </span>
                <span>Trabalhar aplicação, memorização e comunicação segura</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
