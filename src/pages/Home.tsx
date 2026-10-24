import React from 'react';
import { EmbroideryHero } from '../components/EmbroideryHero';
import { BrandVideoShowcase } from '../components/BrandVideoShowcase';
import { SocialDesignsShowcase } from '../components/SocialDesignsShowcase';
import { SplitScreenShowcase } from '../components/SplitScreenShowcase';
import { InteractiveTrainJourney } from '../components/InteractiveTrainJourney';

export const Home: React.FC = () => {

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden bg-[#F8F7F3] dark:bg-[#071f1c]">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: Artisanal Hero with Golden Embroidery Animation
      ───────────────────────────────────────────────────────────── */}
      <EmbroideryHero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: Brand Video Showcase (كواليس معمل يوزرسيف)
      ───────────────────────────────────────────────────────────── */}
      <BrandVideoShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: Dynamic Split-Screen Showcase (Auto-Playing Deck)
      ───────────────────────────────────────────────────────────── */}
      <SplitScreenShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: Social Campaigns & Brand Assets
      ───────────────────────────────────────────────────────────── */}
      <SocialDesignsShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: Customer Journey Workflow (Interactive Train Animation)
      ───────────────────────────────────────────────────────────── */}
      <InteractiveTrainJourney />

    </div>
  );
};
