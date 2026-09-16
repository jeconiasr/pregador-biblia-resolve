import React from "react";
import { MessageSquareQuote, CheckCircle2, User, Church } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  role: string;
  before: string;
  after: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pr. Marcos Silva",
    location: "Belo Horizonte / MG",
    role: "Pastor Auxiliar e Líder de Pequenos Grupos",
    before: "Tinha muitas ideias na cabeça, mas ficava ansioso e perdido nas anotações antes de subir ao púlpito.",
    after: "Aprendeu a organizar a mensagem em pontos claros e hoje prega com segurança e objetividade.",
    quote: "O método me deu paz. Não fico mais horas no sábado sem saber por onde começar. A igreja percebeu a clareza na exposição bíblica.",
  },
  {
    name: "Diác. Carlos Eduardo",
    location: "Campinas / SP",
    role: "Diácono e Professor da Escola Bíblica",
    before: "Sentia receio de não conseguir prender a atenção dos irmãos e de cometer erros na interpretação do texto.",
    after: "Domina a transição entre introdução, pontos principais e aplicação prática com facilidade.",
    quote: "A aula sobre introdução e conclusão mudou completamente meus estudos. A mensagem passou a ter começo, meio e fim.",
  },
  {
    name: "Ev. Roberto Mendes",
    location: "Curitiba / PR",
    role: "Evangelista e Coordenador de Jovens",
    before: "Sofria com nervosismo constante e improvisava demais na hora da pregação.",
    after: "Aplica o método de oratória e memorização do esboço com naturalidade e postura firme.",
    quote: "O checklist e as orientações sobre postura me ajudaram a vencer a timidez. A fidelidade bíblica agora vem acompanhada de calma.",
  },
];

export const SocialProofSection: React.FC = () => {
  return (
    <section id="prova-social" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F7F1E7]/60 border-t border-[#DED7CC]/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#356F9F]" />
            <span>Relatos de Quem Já Fez</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            A transformação prática na rotina de quem ministra
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Veja como pastores, líderes e pregadores iniciantes superaram a insegurança e aprenderam
            a estruturar sermões bíblicos com clareza.
          </p>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#DED7CC] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Header with avatar icon and metadata */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#DED7CC]/60">
                  <div className="w-10 h-10 rounded-full bg-[#17324D] text-[#FFFDF8] flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#E8BE58]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17324D] leading-snug">{t.name}</h3>
                    <p className="text-xs text-[#68727D]">{t.location}</p>
                    <p className="text-[11px] text-[#356F9F] font-medium flex items-center gap-1 mt-0.5">
                      <Church className="w-3 h-3" />
                      <span>{t.role}</span>
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#22303C]/90 italic leading-relaxed mb-4">
                  "{t.quote}"
                </p>
              </div>

              {/* Before & After comparison box */}
              <div className="pt-3 border-t border-[#DED7CC]/60 space-y-2 text-xs bg-[#F7F1E7]/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <div>
                  <span className="font-bold text-[#C86E45] uppercase tracking-wider text-[10px] block">
                    Antes:
                  </span>
                  <span className="text-[#68727D] leading-tight">{t.before}</span>
                </div>
                <div>
                  <span className="font-bold text-[#24594D] uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#2F7665]" />
                    Depois:
                  </span>
                  <span className="text-[#22303C] font-medium leading-tight">{t.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Disclosure */}
        <p className="mt-8 text-center text-xs text-[#68727D]/80 italic">
          Depoimentos de alunos do curso compartilhados publicamente pelo produtor.
        </p>
      </div>
    </section>
  );
};
