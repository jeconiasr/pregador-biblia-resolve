import React from "react";
import { BookOpen, Sparkles } from "lucide-react";

export const MinimalHeader: React.FC = () => {
  const handleScrollToBridge = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("ponte-curso");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E7]/90 backdrop-blur-md border-b border-[#DED7CC]/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#17324D] text-[#FFFDF8] flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5 text-[#E8BE58]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-editorial text-lg font-bold tracking-tight text-[#17324D] leading-tight">
              A Bíblia Resolve
            </span>
            <span className="text-[11px] text-[#68727D] tracking-wide uppercase font-medium">
              Didática Bíblica & Homilética
            </span>
          </div>
        </div>

        {/* Center/Right items */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2F7665]/10 text-[#24594D] border border-[#2F7665]/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#2F7665]" />
            <span>Aula gratuita</span>
          </div>

          <a
            href="#ponte-curso"
            onClick={handleScrollToBridge}
            className="text-xs sm:text-sm font-medium text-[#356F9F] hover:text-[#17324D] transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#356F9F] focus:ring-offset-2 rounded-sm py-1 px-1.5"
            title="Pular para apresentação do curso completo"
          >
            Já assisti — conhecer o treinamento
          </a>
        </div>
      </div>
    </header>
  );
};
