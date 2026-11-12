import React from 'react';
import { Sparkles, Compass, Shield, Feather } from 'lucide-react';

export const MaisonPhilosophy: React.FC = () => {
  return (
    <section id="maison-philosophy" className="py-24 bg-[#0D0D0D] border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase text-[#DA4F37] font-semibold">
            <span>Philosophy of the Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF8F5] tracking-tight">
            Perfume as Atmospheric Poetry
          </h2>
          <p className="text-sm sm:text-base text-[#A8A398] font-light leading-relaxed max-w-2xl mx-auto">
            Nishane was born from a desire to elevate perfume beyond mere adornment.
            Every flacon is an intimate territory where Istanbul’s historical trade winds
            converge with Grasse’s classical French extraction heritage.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
            <span className="font-mono text-xs text-[#DA4F37] font-semibold">01. THE EXTRAIT DISCIPLINE</span>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Uncompromising 30%+ Concentration
            </h3>
            <p className="text-xs text-[#A8A398] leading-relaxed font-light">
              While conventional commercial houses dilute compositions to 12%–15%,
              our flacons hold up to 35% pure perfume oils. The result is an extraordinary
              tenacity of 14 to 20 hours with evolving sillage that adapts to skin chemistry.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
            <span className="font-mono text-xs text-[#DA4F37] font-semibold">02. BOTANICAL RARITIES</span>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Ethical Sacred Sourcing
            </h3>
            <p className="text-xs text-[#A8A398] leading-relaxed font-light">
              From sustainable Assafi agarwood aged over fifteen years in Assam to wild
              Calabrian bergamot groves and high-altitude Turkish roses picked before sunrise,
              our ingredients honor the biodiversity of their terroirs.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-[#242424] rounded-sm space-y-4">
            <span className="font-mono text-xs text-[#DA4F37] font-semibold">03. ARCHITECTURAL FLACONS</span>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Weighted Glass & Brushed Brass
            </h3>
            <p className="text-xs text-[#A8A398] leading-relaxed font-light">
              Each bottle is shaped from thick French crystal glass, crowned by a heavy
              custom-milled brushed gold cap engraved with the Maison talisman. Designed
              to safeguard fragile olfactory molecules from ambient light.
            </p>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="mt-16 p-10 bg-[#121212] border border-[#262626] text-center max-w-4xl mx-auto rounded-sm">
          <blockquote className="font-serif italic text-lg sm:text-2xl text-[#E5DFD3] font-light leading-relaxed">
            &ldquo;We do not merely make scents to turn heads; we craft scents that whisper stories to the soul long after the room has emptied.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-[11px] font-mono tracking-[0.25em] text-[#DA4F37] uppercase not-italic">
            — The Creative Directors · Nishane Istanbul
          </cite>
        </div>
      </div>
    </section>
  );
};
