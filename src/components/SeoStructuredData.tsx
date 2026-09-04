import React, { useEffect } from "react";
import { VIDEO_CONFIG } from "../config/video";
import { OFFER_CONFIG } from "../config/offer";
import { FAQ_ITEMS } from "./AccessibleFaq";

export const SeoStructuredData: React.FC = () => {
  useEffect(() => {
    // Inject VideoObject Schema
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": VIDEO_CONFIG.title,
      "description":
        "Aula gratuita ensinando o passo a passo para organizar um esboço de pregação bíblica com introdução, pontos e conclusão.",
      "thumbnailUrl": [VIDEO_CONFIG.thumbnailUrl, VIDEO_CONFIG.fallbackThumbnailUrl],
      "uploadDate": "2023-01-01T00:00:00Z", // conservative published date placeholder
      "duration": VIDEO_CONFIG.durationISO,
      "embedUrl": VIDEO_CONFIG.privacyEmbedUrl,
      "contentUrl": VIDEO_CONFIG.watchUrl,
      "author": {
        "@type": "Organization",
        "name": VIDEO_CONFIG.channelName,
      },
      "publisher": {
        "@type": "Organization",
        "name": "A Bíblia Resolve",
      },
    };

    // Inject Product Schema with ONLY verified confirmed data
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": OFFER_CONFIG.productName,
      "description": "Formação do texto bíblico à apresentação da mensagem em 40 videoaulas.",
      "provider": {
        "@type": "Organization",
        "name": OFFER_CONFIG.producerName,
        "sameAs": OFFER_CONFIG.producerPageUrl,
      },
      "offers": {
        "@type": "Offer",
        "price": "162.00",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "url": OFFER_CONFIG.checkoutUrl,
        "validFrom": OFFER_CONFIG.verifiedAt,
      },
    };

    // Inject FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    };

    const scriptId = "structured-data-jsonld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify([videoSchema, productSchema, faqSchema]);

    return () => {
      // Keep script in head or clean up on unmount
    };
  }, []);

  return null;
};
