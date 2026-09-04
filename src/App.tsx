import React, { useState, useEffect } from "react";
import { MinimalHeader } from "./components/MinimalHeader";
import { LessonHero } from "./components/LessonHero";
import { PrivacyYouTubePlayer } from "./components/PrivacyYouTubePlayer";
import { LessonCompanion } from "./components/LessonCompanion";
import { VictorySection } from "./components/VictorySection";
import { BlockerSelector, BlockerOption } from "./components/BlockerSelector";
import { CourseBridge } from "./components/CourseBridge";
import { CourseTracks } from "./components/CourseTracks";
import { BonusGrid } from "./components/BonusGrid";
import { InstructorSection } from "./components/InstructorSection";
import { FitSection } from "./components/FitSection";
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

    // Observe offer section reach
    const offerEl = document.getElementById("oferta");
    const offerObserver = new IntersectionObserver(
      (entries) => {
        setIsOfferInView(entries[0]?.isIntersecting || false);
      },
      { threshold: 0.05 }
    );
    if (offerEl) offerObserver.observe(offerEl);

    return () => {
      playerObserver.disconnect();
      offerObserver.disconnect();
    };
  }, []);

  const handleBlockerSelected = (blocker: BlockerOption) => {
    setHighlightedTrackId(blocker.matchingTrackId);
  };

  // Rule 10: Show mobile sticky bar only when offer section is reached AND player is not active/visible
  const shouldShowMobileBar = isOfferInView && !isPlayerVisible && !isPlayerActive;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E7] text-[#22303C]">
      {/* Structured SEO Data for Search Engines */}
      <SeoStructuredData />

      {/* Migration Notice Banner if user came from old /diagnostico-pregador route */}
      {redirectedFromOldRoute && (
        <div className="bg-[#356F9F] text-[#FFFDF8] px-4 py-2 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#E8BE58]" />
          <span>
            Você foi redirecionado para a nova rota oficial da aula gratuita. Seus parâmetros foram preservados.
          </span>
        </div>
      )}

      {/* Minimal Header with subtle link */}
      <MinimalHeader />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Specific Lesson Promise (Hero) */}
        <LessonHero />

        {/* 2. Featured Video (Privacy-friendly YouTube Embed starting at 0:00) */}
        <PrivacyYouTubePlayer onPlayingChange={setIsPlayerActive} />

        {/* 3. Practical Lesson Companion (5-question sermon outline tool with local save, copy, print) */}
        <LessonCompanion />

        {/* 4. Small Victory Section (Lesson role vs Complete training) */}
        <VictorySection />

        {/* 5. Identification of Visitor's Next Blocker (Interactive reflection) */}
        <BlockerSelector onBlockerSelected={handleBlockerSelected} />

        {/* 6. Editorial Bridge (First commercial bridge with affiliate disclosure) */}
        <CourseBridge />

        {/* 7. Course Content (5 Pedagogical Tracks + Accordion with all 40 lessons) */}
        <CourseTracks highlightedTrackId={highlightedTrackId} />

        {/* 8. 5 Verified Bonuses */}
        <BonusGrid />

        {/* 9. Instructor & Institutional Authority (Wallace Mello & Instituto de Aperfeiçoamento Cristão) */}
        <InstructorSection />

        {/* 10. Fit & Alignment (Para quem é e para quem não é) */}
        <FitSection />

        {/* 11. Verified Offer (Price R$ 162 or 12x R$ 16,17, Hotmart, ref=N107470566X) */}
        <OfferCard />

        {/* 12. 30-Day Guarantee & Digital Certificate */}
        <GuaranteeSection />

        {/* 13. Accessible FAQ */}
        <AccessibleFaq />

        {/* 14. Final Decision CTA */}
        <FinalCta />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Mobile Sticky Bar (strictly appears only when offer is reached and player is hidden) */}
      <MobileOfferBar show={shouldShowMobileBar} />
    </div>
  );
}
