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
              Transparência Editorial
            </h4>
            <p className="text-xs text-[#68727D]">
              A Bíblia Resolve é um projeto editorial independente de curadoria e recomendação de
              materiais para estudo bíblico. Esta página contém links de afiliado. Caso você decida
              se inscrever, podemos receber uma comissão sem nenhum custo adicional para você.
            </p>
          </div>

          {/* Column 3: Links & Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#17324D] text-xs uppercase tracking-wider">
              Dados do Treinamento
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <strong>Curso:</strong> Curso Manual Completo Pregador Vocacionado
              </li>
              <li>
                <strong>Produtor:</strong> Instituto de Aperfeiçoamento Cristão
              </li>
              <li>
                <strong>Plataforma:</strong> Hotmart (pagamento e entrega)
              </li>
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
            </ul>
          </div>
        </div>

        {/* Institutional Links and Copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68727D]">
          <div className="flex flex-wrap items-center gap-4">
            <a href="#termos" onClick={(e) => { e.preventDefault(); alert("Termos de Uso: Este site fornece conteúdo educativo e curadoria bibliográfica."); }} className="hover:text-[#17324D] transition-colors underline-offset-4 hover:underline">
              Termos de Uso
            </a>
            <span>•</span>
            <a href="#privacidade" onClick={(e) => { e.preventDefault(); alert("Política de Privacidade: Seus dados de anotações do esboço são salvos exclusivamente no seu próprio navegador e não são transmitidos a servidores."); }} className="hover:text-[#17324D] transition-colors underline-offset-4 hover:underline">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="mailto:contato@abibliaresolve.com.br" className="hover:text-[#17324D] transition-colors underline-offset-4 hover:underline">
              Contato / Suporte
            </a>
          </div>

          <p>© 2024 A Bíblia Resolve. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
