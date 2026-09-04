import React, { useEffect, useRef } from "react";
import { ArrowDown, BookOpen, GraduationCap, Info } from "lucide-react";
import { trackOnce, trackEvent } from "../lib/analytics";

export const CourseBridge: React.FC = () => {
  const bridgeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trackOnce("course_bridge_view");
        }
      },
      { threshold: 0.3 }
    );

    if (bridgeRef.current) {
      observer.observe(bridgeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollToCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent("course_details_click", { origin: "bridge_cta" });
    const target = document.getElementById("conteudo-curso");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="ponte-curso"
      ref={bridgeRef}
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#17324D] text-[#FFFDF8] relative overflow-hidden"
    >
      {/* Subtle decorative background line */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#E8BE58_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8]/10 border border-[#FFFDF8]/15 text-[#E8BE58] text-xs font-semibold tracking-wider uppercase mb-5">
          <GraduationCap className="w-4 h-4" />
          <span>SEU PRÓXIMO PASSO, SE QUISER APROFUNDAR</span>
        </div>

        {/* Title */}
        <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFDF8] leading-[1.2] mb-6">
          A aula mostrou uma parte do processo.
          <br className="hidden sm:inline" /> O treinamento organiza o caminho completo.
        </h2>

        {/* Editorial Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#DED7CC] max-w-2xl mx-auto leading-relaxed mb-8">
          Se o seu objetivo é sair de anotações soltas e desenvolver mensagens bíblicas com mais
          estrutura, o <strong>Curso Manual Completo Pregador Vocacionado</strong> reúne aulas sobre
          interpretação, escolha do texto, elaboração do sermão e comunicação. A proposta é começar
          pelos fundamentos e avançar de forma organizada.
        </p>

        {/* Navigation CTA Button */}
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="#conteudo-curso"
            onClick={handleScrollToCourse}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2F7665] hover:bg-[#24594D] active:scale-[0.98] text-[#FFFDF8] font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2F7665]/40"
          >
            <span>CONHECER O TREINAMENTO COMPLETO</span>
            <ArrowDown className="w-5 h-5 text-[#E8BE58]" />
          </a>
          <span className="text-xs text-[#DED7CC]/80 font-medium">
            Conheça as 40 aulas, os bônus e a proposta didática abaixo
          </span>
        </div>

        {/* Transparency note */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-[#FFFDF8]/5 border border-[#FFFDF8]/10 text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#E8BE58] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] text-[#DED7CC] leading-relaxed">
              <strong>Transparência:</strong> A Bíblia Resolve participa desta divulgação como
              afiliada. Ao realizar a inscrição por nossos links, podemos receber uma comissão, sem
              custo adicional para você. O curso, o conteúdo, o suporte, a garantia e a entrega são
              de responsabilidade do produtor na Hotmart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
