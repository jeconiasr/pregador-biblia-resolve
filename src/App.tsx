import React, { useState, useEffect } from "react";
import { MinimalHeader } from "./components/MinimalHeader";
import { LessonHero } from "./components/LessonHero";
import { PrivacyYouTubePlayer } from "./components/PrivacyYouTubePlayer";
import { LessonCompanion } from "./components/LessonCompanion";
import { VictorySection } from "./components/VictorySection";
import { BlockerSelector, BlockerOption } from "./components/BlockerSelector";
import { CompactOfferCard } from "./components/CompactOfferCard";
import { CourseTracks } from "./components/CourseTracks";
import { InstructorSection } from "./components/InstructorSection";
import { SocialProofSection } from "./components/SocialProofSection";
import { BonusGrid } from "./components/BonusGrid";
import { OfferCard } from "./components/OfferCard";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { AccessibleFaq } from "./components/AccessibleFaq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { MobileOfferBar } from "./components/MobileOfferBar";
import { SeoStructuredData } from "./components/SeoStructuredData";
import { PAGE_CONFIG } from "./config/page";
import { trackOnce } from "./lib/analytics";
import { Info } from "lucide-react";

export default function App() {
  const [highlightedTrackId, setHighlightedTrackId] = useState<number | null>(null);
  const [isPlayerActive, setIsPlayerActive] = useState<boolean>(false);
  const [isOfferInView, setIsOfferInView] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);
  const [redirectedFromOldRoute, setRedirectedFromOldRoute] = useState<boolean>(false);

  // Handle route migration & preservation of UTM parameters
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    if (currentPath.includes(PAGE_CONFIG.oldRoute)) {
      // Gracefully preserve all search params during redirect
      const newUrl = PAGE_CONFIG.route + window.location.search;
      window.history.replaceState(null, "", newUrl);
      setRedirectedFromOldRoute(true);
      setTimeout(() => setRedirectedFromOldRoute(false), 8000);
    }

    trackOnce("page_view_lesson", {
      path: window.location.pathname,
      search: window.location.search,
    });
  }, []);

  // Monitor visibility of player and offer section for mobile sticky bar behavior
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Observe player section visibility
    const playerEl = document.getElementById("player-aula");
    const playerObserver = new IntersectionObserver(
      (entries) => {
        setIsPlayerVisible(entries[0]?.isIntersecting || false);
      },
      { threshold: 0.1 }
    );
    if (playerEl) playerObserver.observe(playerEl);

    // Observe offer sections (compact offer or full offer)
    const offerCompactEl = document.getElementById("primeira-oferta");
    const offerFullEl = document.getElementById("oferta-completa");

    const offerObserver = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        if (anyVisible) {
          setIsOfferInView(true);
        }
      },
      { threshold: 0.05 }
    );

    if (offerCompactEl) offerObserver.observe(offerCompactEl);
    if (offerFullEl) offerObserver.observe(offerFullEl);

    return () => {
      playerObserver.disconnect();
      offerObserver.disconnect();
    };
  }, []);

  const handleBlockerSelected = (blocker: BlockerOption) => {
    setHighlightedTrackId(blocker.matchingTrackId);
  };

  // Mobile sticky bar: appears once an offer is reached AND player is not active/visible
  const shouldShowMobileBar = isOfferInView && !isPlayerVisible && !isPlayerActive;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E7] text-[#22303C]">
      {/* Structured SEO Data for Search Engines */}
      <SeoStructuredData />

      {/* Migration Notice Banner if user came from old route */}
      {redirectedFromOldRoute && (
        <div className="bg-[#356F9F] text-[#FFFDF8] px-4 py-2 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#E8BE58]" />
          <span>
            Você foi redirecionado para a nova rota oficial da aula gratuita. Seus parâmetros foram preservados.
          </span>
        </div>
      )}

      {/* 1. CABEÇALHO SUTIL */}
      <MinimalHeader />

      {/* Main Content: Exact 16-section flow */}
      <main className="flex-1">
        {/* 2. HERO DA AULA */}
        <LessonHero />

        {/* 3. VÍDEO PRINCIPAL */}
        <PrivacyYouTubePlayer onPlayingChange={setIsPlayerActive} />

        {/* 4. MATERIAL DE APOIO PRÁTICO */}
        <LessonCompanion />

        {/* 5. PRIMEIRA VITÓRIA PRÁTICA (PONTE EDITORIAL) */}
        <VictorySection />

        {/* 6. PERCEPÇÃO DO PRÓXIMO BLOQUEIO */}
        <BlockerSelector onBlockerSelected={handleBlockerSelected} />

        {/* 7. PRIMEIRA APRESENTAÇÃO DO CURSO (CARD COMPACTO) */}
        <CompactOfferCard />

        {/* 8. CONTEÚDO DO CURSO */}
        <CourseTracks highlightedTrackId={highlightedTrackId} />

        {/* 9. AUTORIDADE DO INSTRUTOR */}
        <InstructorSection />

        {/* 10. PROVA SOCIAL (DEPOIMENTOS / RELATOS) */}
        <SocialProofSection />

        {/* 11. BÔNUS OFICIAIS */}
        <BonusGrid />

        {/* 12. OFERTA COMPLETA */}
        <OfferCard />

        {/* 13. GARANTIA */}
        <GuaranteeSection />

        {/* 14. FAQ */}
        <AccessibleFaq />

        {/* 15. CTA FINAL */}
        <FinalCta />
      </main>

      {/* 16. RODAPÉ */}
      <Footer />

      {/* Mobile Sticky Bar */}
      <MobileOfferBar show={shouldShowMobileBar} />
    </div>
  );
}
