import React from "react";
import { UserCheck, Award, Users, BookOpen } from "lucide-react";

export const InstructorSection: React.FC = () => {
  return (
    <section id="autoridade-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#356F9F]" />
            <span>Instrutor e Produtor</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            Conheça quem conduz o treinamento
          </h2>
        </div>

        {/* Profile Card */}
        <div className="bg-[#F7F1E7]/70 rounded-2xl p-6 sm:p-8 md:p-10 border border-[#DED7CC] shadow-xs">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Portrait/Badge avatar */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#17324D] text-[#FFFDF8] flex items-center justify-center shadow-md border-2 border-[#E8BE58]/40">
                <BookOpen className="w-12 h-12 text-[#E8BE58]" />
              </div>
              <span className="mt-3 text-xs font-bold text-[#17324D] text-center">
                Wallace Mello
              </span>
              <span className="text-[11px] text-[#68727D] text-center">
                Professor de Homilética
              </span>
            </div>

            {/* Description and Institutional Proof */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2F7665]/10 text-[#24594D] text-xs font-semibold mb-3">
                <span>Instituto de Aperfeiçoamento Cristão</span>
              </div>

              <p className="text-sm sm:text-base text-[#22303C] leading-relaxed mb-5">
                Segundo as informações apresentadas pelo <strong>Instituto de Aperfeiçoamento Cristão</strong>,{" "}
                <strong>Wallace Mello</strong> é mestrando e bacharel em Teologia, professor de
                homilética e ensina sobre pregação e elaboração de sermões há mais de seis anos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#DED7CC]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFFDF8] border border-[#DED7CC]/70">
                  <div className="w-8 h-8 rounded-lg bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#17324D]">+20.000 alunos capacitados</p>
                    <p className="text-[11px] text-[#68727D]">Dado informado pelo produtor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFFDF8] border border-[#DED7CC]/70">
                  <div className="w-8 h-8 rounded-lg bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#17324D]">+6 anos de ensino contínuo</p>
                    <p className="text-[11px] text-[#68727D]">Foco em didática e oratória bíblica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
