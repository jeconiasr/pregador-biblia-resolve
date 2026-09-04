import React from "react";
import { BookOpen, ExternalLink, ShieldCheck, Mail } from "lucide-react";
import { OFFER_CONFIG } from "../config/offer";
import { trackEvent } from "../lib/analytics";

export const Footer: React.FC = () => {
  const handleProducerClick = () => {
    trackEvent("producer_page_click", { destination: "footer_producer_link" });
  };

  return (
    <footer className="bg-[#FFFDF8] border-t border-[#DED7CC] py-12 px-4 sm:px-6 text-[#68727D] text-xs leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-8 border-b border-[#DED7CC]/80">
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#17324D] text-[#FFFDF8] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#E8BE58]" />
              </div>
              <span className="font-serif-editorial text-base font-bold text-[#17324D]">
                A Bíblia Resolve
              </span>
            </div>
            <p className="text-xs text-[#68727D]">
              Portal dedicado à didática bíblica, estudo das Escrituras e capacitação de pregadores
              e líderes comprometidos com a Palavra de Deus.
            </p>
          </div>

          {/* Column 2: Disclosure & Transparency */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#17324D] text-xs uppercase tracking-wider">
              Transparência de Afiliado
            </h4>
            <p className="text-xs text-[#68727D]">
              A Bíblia Resolve participa na divulgação desta formação como afiliada. Ao realizar a
              inscrição por meio de nossos links, podemos receber uma comissão sem qualquer acréscimo
              no valor final para você. A responsabilidade técnica, pedagógica e de entrega é do
              Instituto de Aperfeiçoamento Cristão na plataforma Hotmart.
            </p>
          </div>

          {/* Column 3: Links & Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#17324D] text-xs uppercase tracking-wider">
              Produtor e Atendimento
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href={OFFER_CONFIG.producerPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleProducerClick}
                  className="text-[#356F9F] hover:text-[#17324D] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Página Oficial do Produtor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-[#68727D]">
                <Mail className="w-3.5 h-3.5 text-[#356F9F]" />
                <span>Contato editorial: contato@abibliaresolve.com.br</span>
              </li>
              <li className="pt-1">
                <span>Produtor: {OFFER_CONFIG.producerName}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="space-y-3 text-[11px] text-[#68727D]/90">
          <p>
            <strong>Aviso Legal sobre Curso Livre:</strong> Este curso possui modalidade livre,
            amparada pela Lei nº 9.394/96 (Diretrizes e Bases da Educação Nacional) e pelo Decreto
            Presidencial nº 5.154/04, com finalidade de capacitação bíblica, teológica e eclesiástica.
            Não se trata de curso superior de graduação ou pós-graduação e não depende de
            credenciamento ministerial junto ao MEC.
          </p>

          <p>
            <strong>Equilíbrio Ministerial:</strong> Preparo e técnica homilética não substituem
            oração, integridade de caráter, vida com Deus e dependência do Espírito Santo. Resultados
            práticos na elaboração e exposição dependem de dedicação ao estudo individual, prática
            contínua e contexto eclesiástico de cada servo.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-[#DED7CC]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#68727D]">
          <p>© {new Date().getFullYear()} A Bíblia Resolve. Todos os direitos reservados.</p>
          <p>Resultados dependem de estudo, prática e contexto individual.</p>
        </div>
      </div>
    </footer>
  );
};
