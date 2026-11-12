import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Background Cinematic Image with Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_perfume_editorial_1794406292301.jpg"
          alt="Nishane Haute Parfumerie Flacon on Obsidian Stone"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-110 scale-105 animate-in fade-in duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered radial and vertical obsidian scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-[#0D0D0D]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0D0D0D_90%)] opacity-70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Clean Kicker (No Pill Enclosure) */}
        <div className="flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-[#DA4F37] mb-6 font-semibold">
          <span>Maison de Haute Parfumerie</span>
          <span aria-hidden="true" className="text-[#666666]">·</span>
          <span>Founded in Istanbul</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F5] max-w-4xl leading-[1.1] mb-6">
          Atmospheric <span className="italic font-normal text-[#E2DACB]">Olfactory Art</span>
        </h1>

        {/* Poetic Sub-headline */}
        <p className="font-sans text-base sm:text-lg text-[#B8B3A8] max-w-2xl leading-relaxed font-light mb-10 tracking-wide">
          Extraits de parfum meticulously distilled at unmatched 30%+ pure oil concentrations.
          Evocations of ancient silk corridors, untamed sea mist, and sacred botanical resin.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <a
            href="#collection"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#171717]/80 hover:bg-[#242424] text-[#FAF8F5] border border-[#3E3A33] hover:border-[#DA4F37] text-xs uppercase tracking-[0.2em] font-semibold rounded backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DA4F37] group-hover:rotate-12 transition-transform" />
            <span>Take Scent Quiz</span>
          </button>
        </div>

        {/* Editorial Trust Markers */}
        <div className="mt-16 pt-8 border-t border-[#262626]/70 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#8E8A80]">
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm text-[#FAF8F5] font-medium mb-1">30%–35%</span>
            <span className="tracking-wider uppercase text-[10px]">Pure Extrait Concentration</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm text-[#FAF8F5] font-medium mb-1">Bespoke</span>
            <span className="tracking-wider uppercase text-[10px]">Natural Harvest Extracts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm text-[#FAF8F5] font-medium mb-1">Complimentary</span>
            <span className="tracking-wider uppercase text-[10px]">Global Courier & 2 Samples</span>
          </div>
        </div>
      </div>
    </section>
  );
};
