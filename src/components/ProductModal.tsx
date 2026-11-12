import React, { useState } from 'react';
import { Fragrance, BottleSize, Currency } from '../types/fragrance';
import { formatPrice } from '../data/fragrances';
import { X, Sparkles, Check, Clock, Wind, Calendar, ShieldCheck, Heart } from 'lucide-react';

interface ProductModalProps {
  fragrance: Fragrance | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: BottleSize, quantity?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  fragrance,
  currency,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<BottleSize>('50ml');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!fragrance) return null;

  const currentPrice = fragrance.prices[selectedSize];
  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121212] border border-[#2B2B2B] rounded shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#99948A] hover:text-[#FAF8F5] bg-[#1A1A1A]/80 hover:bg-[#262626] rounded-full border border-[#333333] transition-colors cursor-pointer"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Column */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-[#0A0A0A] overflow-hidden min-h-[320px]">
            <img
              src={fragrance.image}
              alt={fragrance.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase font-semibold text-[#DA4F37] bg-[#0D0D0D]/85 px-3 py-1 rounded backdrop-blur-sm border border-[#2B2B2B]">
              {fragrance.collection}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Concentration */}
              <div className="flex items-center gap-2 text-xs text-[#8E887E] font-mono mb-1.5">
                <span>{fragrance.scentFamily}</span>
                <span aria-hidden="true">·</span>
                <span>{fragrance.concentration}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-wide font-normal mb-2">
                {fragrance.name}
              </h2>

              {/* Poet's Quote */}
              <p className="font-serif italic text-xs text-[#DA4F37] mb-4">
                {fragrance.quote}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#BDB8AC] font-light leading-relaxed mb-6">
                {fragrance.description}
              </p>

              {/* Fragrance Pyramid Deep Dive */}
              <div className="space-y-3 bg-[#0A0A0A] p-4 rounded border border-[#222222] mb-6">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#DA4F37] font-semibold border-b border-[#1E1E1E] pb-1.5">
                  The Olfactory Architecture
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#8F8A7F] font-mono text-[11px] uppercase mr-2 font-medium">Head Notes:</span>
                    <span className="text-[#FAF8F5]">{fragrance.notes.top.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#8F8A7F] font-mono text-[11px] uppercase mr-2 font-medium">Heart Accord:</span>
                    <span className="text-[#FAF8F5]">{fragrance.notes.heart.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="text-[#8F8A7F] font-mono text-[11px] uppercase mr-2 font-medium">Drydown Base:</span>
                    <span className="text-[#FAF8F5]">{fragrance.notes.base.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#A19B8F] border border-[#222222] p-2.5 rounded bg-[#171717]">
                <div className="flex flex-col items-center">
                  <Clock className="w-3.5 h-3.5 text-[#DA4F37] mb-1" />
                  <span className="text-white font-medium text-[11px]">{fragrance.longevity}</span>
                  <span className="text-[#736E65]">Longevity</span>
                </div>
                <div className="flex flex-col items-center border-x border-[#282828] px-1">
                  <Wind className="w-3.5 h-3.5 text-[#DA4F37] mb-1" />
                  <span className="text-white font-medium text-[11px] truncate w-full">{fragrance.sillage}</span>
                  <span className="text-[#736E65]">Sillage</span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="w-3.5 h-3.5 text-[#DA4F37] mb-1" />
                  <span className="text-white font-medium text-[11px] truncate w-full">{fragrance.season}</span>
                  <span className="text-[#736E65]">Season</span>
                </div>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="pt-4 border-t border-[#262626] space-y-4">
              {/* Size selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-wider text-[#8F8A7F] font-mono">Select Presentation</span>
                  <span className="text-sm font-serif text-[#FAF8F5] font-semibold tabular-nums">
                    {formatPrice(currentPrice, currency)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['50ml', '100ml', '2ml Discovery'] as BottleSize[]).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2 text-xs rounded transition-all text-center cursor-pointer font-medium ${
                        selectedSize === size
                          ? 'bg-[#2E2E2E] text-[#FAF8F5] border border-[#DA4F37] shadow-sm'
                          : 'bg-[#181818] text-[#8C867B] border border-[#2B2B2B] hover:text-[#FAF8F5]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#2E2E2E] bg-[#181818] rounded px-2 py-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 text-sm text-[#8F8A7F] hover:text-[#FAF8F5]"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-xs text-[#FAF8F5]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 text-sm text-[#8F8A7F] hover:text-[#FAF8F5]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.2em] font-semibold rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
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
                      <span>Add to Bag · {formatPrice(totalPrice, currency)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust statement */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-[#736E65]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DA4F37]" />
                <span>Complimentary insured shipping · 2 free samples included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
