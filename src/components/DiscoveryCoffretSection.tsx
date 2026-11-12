import React, { useState } from 'react';
import { FRAGRANCES, DISCOVERY_COFFRET, formatPrice } from '../data/fragrances';
import { Currency } from '../types/fragrance';
import { Sparkles, Check, Gift } from 'lucide-react';

interface DiscoveryCoffretSectionProps {
  currency: Currency;
  onAddCoffret: (customVials: string[]) => void;
}

export const DiscoveryCoffretSection: React.FC<DiscoveryCoffretSectionProps> = ({
  currency,
  onAddCoffret,
}) => {
  // Default 4 selected fragrances for the coffret
  const [selectedVials, setSelectedVials] = useState<string[]>([
    'hacivat',
    'ani',
    'wulong-cha',
    'fan-your-flames',
  ]);
  const [isAdded, setIsAdded] = useState(false);

  const toggleVial = (fragranceId: string) => {
    if (selectedVials.includes(fragranceId)) {
      if (selectedVials.length > 1) {
        setSelectedVials(selectedVials.filter((id) => id !== fragranceId));
      }
    } else {
      if (selectedVials.length < 4) {
        setSelectedVials([...selectedVials, fragranceId]);
      } else {
        // Replace oldest selection
        setSelectedVials([...selectedVials.slice(1), fragranceId]);
      }
    }
  };

  const handleAdd = () => {
    onAddCoffret(selectedVials);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <section id="discovery-coffret" className="py-24 bg-[#0A0A0A] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141414] border border-[#292929] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          
          {/* Editorial Visual Column */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[360px] bg-[#000000] overflow-hidden">
            <img
              src={DISCOVERY_COFFRET.image}
              alt="Nishane Artisanal Discovery Coffret"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent lg:hidden" />
            <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.25em] uppercase text-[#DA4F37] bg-[#0D0D0D]/90 px-3 py-1 rounded backdrop-blur-md border border-[#2B2B2B]">
              Artisanal Coffret Series
            </div>
          </div>

          {/* Configuration and Content Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-[#8F8A7F] font-mono mb-2">
                <span>Custom Curation</span>
                <span aria-hidden="true">·</span>
                <span>4 × 2ml Flacons</span>
                <span aria-hidden="true">·</span>
                <span>Pure Extrait</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-wide font-normal mb-3">
                {DISCOVERY_COFFRET.name}
              </h2>

              <p className="text-sm text-[#BDB8AC] font-light leading-relaxed mb-6">
                {DISCOVERY_COFFRET.description}
              </p>

              {/* Complimentary Voucher Banner */}
              <div className="flex items-center gap-3 p-3.5 bg-[#1C1C1C] border border-[#2F2F2F] rounded mb-6">
                <Gift className="w-5 h-5 text-[#DA4F37] shrink-0" />
                <div className="text-xs text-[#DDD8CE]">
                  <strong className="text-[#FAF8F5] block font-medium">100% Purchase Guarantee</strong>
                  Receive a complimentary {formatPrice(65, currency)} voucher with your coffret, redeemable toward your first full flacon.
                </div>
              </div>

              {/* Interactive Vial Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[#8F8A7F] uppercase tracking-wider">
                    Select Your 4 Flacons ({selectedVials.length}/4 selected):
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAGRANCES.map((frag) => {
                    const isSelected = selectedVials.includes(frag.id);
                    return (
                      <button
                        key={frag.id}
                        type="button"
                        onClick={() => toggleVial(frag.id)}
                        className={`p-2.5 rounded text-left text-xs transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#242424] border-[#DA4F37] text-[#FAF8F5]'
                            : 'bg-[#171717] border-[#262626] text-[#7F7A70] hover:text-[#FAF8F5] hover:border-[#383838]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-medium truncate">{frag.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#DA4F37] shrink-0 ml-1" />}
                        </div>
                        <div className="text-[10px] text-[#A39D91] truncate mt-0.5">
                          {frag.scentFamily}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price & Add Action */}
            <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#8C867B] uppercase tracking-wider block font-mono">
                  Coffret Investment
                </span>
                <span className="text-2xl font-serif text-[#FAF8F5] font-normal tabular-nums">
                  {formatPrice(DISCOVERY_COFFRET.price, currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={selectedVials.length === 0}
                className={`w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold rounded flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                  isAdded
                    ? 'bg-[#1E4D2B] text-white'
                    : 'bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#DA4F37]" />
                    <span>Add Custom Coffret ({selectedVials.length}/4)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
