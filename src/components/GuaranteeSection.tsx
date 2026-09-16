import React from "react";
import { ShieldCheck, Award, FileText, CheckCircle2 } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";

export const GuaranteeSection: React.FC = () => {
  return (
    <section id="garantia-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F7F1E7]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guarantee Card */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#DED7CC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2F7665]/10 text-[#24594D] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#2F7665]" />
              </div>

              <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#17324D] mb-3">
                {OFFER_CONFIG.guaranteeDays} dias para conhecer o treinamento
              </h3>

              <p className="text-sm sm:text-base text-[#22303C]/85 leading-relaxed">
                Se dentro desse período de <strong>7 dias</strong> você achar que o treinamento não
                atendeu às suas expectativas, pode solicitar o <strong>reembolso integral</strong> diretamente
                pela plataforma Hotmart. Sem burocracia, sem perguntas e com 100% de devolução do valor pago.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DED7CC]/60 text-xs text-[#68727D] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2F7665] shrink-0" />
              <span>Prazo de garantia informado pelo produtor na Hotmart</span>
            </div>
          </div>

          {/* Certificate & Legal Clarity Card */}
          <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-8 border border-[#DED7CC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#356F9F]/10 text-[#356F9F] flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#356F9F]" />
              </div>

              <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#17324D] mb-3">
                Certificado Digital de Conclusão
              </h3>

              <p className="text-sm sm:text-base text-[#22303C]/85 leading-relaxed mb-3">
                Ao concluir as aulas, você recebe um certificado digital de conclusão emitido pelo
                produtor para comprovar a realização dos estudos.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F7F1E7] border border-[#DED7CC]/80 text-xs text-[#68727D] leading-relaxed">
                <strong className="text-[#17324D] block mb-1">Natureza do curso:</strong>
                Curso livre com finalidade bíblica, ministerial e eclesiástica (Lei nº 9.394/96).
                Não se trata de graduação superior e não possui reconhecimento do MEC.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DED7CC]/60 text-xs text-[#68727D] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#356F9F] shrink-0" />
              <span>Emissão digital sem custo adicional após término das aulas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
