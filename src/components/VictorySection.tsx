import React from "react";
import { CheckCircle2, ArrowRight, Layers, BookCheck } from "lucide-react";

export const VictorySection: React.FC = () => {
  return (
    <section id="ponte-editorial" className="py-10 sm:py-14 px-4 sm:px-6 bg-[#F7F1E7]/80 border-b border-[#DED7CC]/60">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F7665]/10 border border-[#2F7665]/20 text-[#24594D] text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2F7665]" />
            <span>O que você aprendeu e qual é o próximo passo</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight leading-snug">
            Você já deu o primeiro passo. Agora precisa aprender a desenvolver a mensagem.
          </h2>
        </div>

        {/* Editorial Text Block */}
        <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#DED7CC] shadow-xs space-y-4 text-sm sm:text-base text-[#22303C]/90 leading-relaxed">
          <p>
            Este exercício ajuda você a organizar a estrutura inicial de uma pregação. Mas saber
            quais partes utilizar ainda não significa saber interpretar o texto, desenvolver cada
            ponto e transmitir a mensagem com segurança.
          </p>
          <p>
            É justamente essa próxima etapa que separa um esboço incompleto de uma mensagem bíblica
            clara, fiel e bem preparada.
          </p>

          <div className="pt-4 mt-4 border-t border-[#DED7CC]/80 flex items-center gap-3 bg-[#E8BE58]/15 -mx-6 -mb-8 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl border-t border-[#E8BE58]/30">
            <BookCheck className="w-5 h-5 text-[#C86E45] shrink-0" />
            <p className="font-serif-editorial text-sm sm:text-base font-bold text-[#17324D]">
              O treinamento completo foi criado para acompanhar você nessa evolução.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

