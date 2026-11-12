import React, { useState } from 'react';
import { Fragrance, BottleSize, Currency } from '../types/fragrance';
import { formatPrice } from '../data/fragrances';
import { Sparkles, Eye, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductCardProps {
  fragrance: Fragrance;
  currency: Currency;
  onOpenDetail: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, size: BottleSize) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  fragrance,
  currency,
  onOpenDetail,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<BottleSize>('50ml');
  const [showPyramidPreview, setShowPyramidPreview] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = fragrance.prices[selectedSize];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(fragrance, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <div
      onClick={() => onOpenDetail(fragrance)}
      className="group relative bg-[#141414] border border-[#242424] hover:border-[#383838] transition-all duration-300 rounded-sm flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Visual Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
        <img
          src={fragrance.image}
          alt={fragrance.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
        
        {/* Quick View Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D]/90 text-xs tracking-widest uppercase font-medium text-[#FAF8F5] rounded border border-[#333333] shadow-lg">
            <Eye className="w-3.5 h-3.5 text-[#DA4F37]" /> Inspect Olfactory Notes
          </span>
        </div>

        {/* Quiet Top Left Kicker Tag (No pill capsule) */}
        <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#DA4F37] bg-[#0D0D0D]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#2B2B2B]">
          {fragrance.scentFamily}
        </div>
      </div>

      {/* Product Content Block */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata: Concentration & Longevity */}
          <div className="flex items-center gap-2 text-[11px] text-[#8C867B] mb-1 font-mono">
            <span>30% Extrait</span>
            <span aria-hidden="true">·</span>
            <span>{fragrance.longevity}</span>
          </div>

          {/* Fragrance Name */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors">
            {fragrance.name}
          </h3>

          {/* Poetic Essence */}
          <p className="text-xs text-[#B5B0A5] line-clamp-2 mt-1.5 font-light leading-relaxed">
            {fragrance.description}
          </p>

          {/* Olfactory Note Teaser (Clean unboxed tags) */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#A6A094] overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[#DA4F37] font-serif italic text-xs">Accords:</span>
            <span>{fragrance.notes.top[0]}</span>
            <span aria-hidden="true" className="text-[#4D4D4D]">/</span>
            <span>{fragrance.notes.heart[0]}</span>
            <span aria-hidden="true" className="text-[#4D4D4D]">/</span>
            <span>{fragrance.notes.base[0]}</span>
          </div>
        </div>

        {/* Fragrance Pyramid Accordion Preview */}
        <div className="border-t border-[#222222] pt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPyramidPreview(!showPyramidPreview);
            }}
            className="w-full flex items-center justify-between text-[11px] tracking-wider uppercase text-[#8F8A7F] hover:text-[#FAF8F5] transition-colors"
          >
            <span>Olfactory Pyramid</span>
            {showPyramidPreview ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#DA4F37]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#8F8A7F]" />
            )}
          </button>

          {showPyramidPreview && (
            <div className="mt-2.5 space-y-1.5 text-[11px] text-[#A8A296] bg-[#0E0E0E] p-2.5 rounded border border-[#222222] animate-in fade-in duration-200">
              <div className="flex items-start gap-2">
                <span className="text-[#DA4F37] font-semibold w-12 shrink-0">TOP:</span>
                <span className="text-[#DDD8CE]">{fragrance.notes.top.join(', ')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#DA4F37] font-semibold w-12 shrink-0">HEART:</span>
                <span className="text-[#DDD8CE]">{fragrance.notes.heart.join(', ')}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#DA4F37] font-semibold w-12 shrink-0">BASE:</span>
                <span className="text-[#DDD8CE]">{fragrance.notes.base.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Size Selector & Dynamic Pricing */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#8F8A7F]">Flacon Size:</span>
            <span className="text-base font-serif font-medium text-[#FAF8F5] tabular-nums">
              {formatPrice(currentPrice, currency)}
            </span>
          </div>

          {/* Size Choice Buttons */}
          <div className="grid grid-cols-3 gap-1.5" onClick={(e) => e.stopPropagation()}>
            {(['50ml', '100ml', '2ml Discovery'] as BottleSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`py-1.5 px-1 text-[11px] rounded transition-all text-center tracking-tight cursor-pointer font-medium ${
                  selectedSize === size
                    ? 'bg-[#2E2E2E] text-[#FAF8F5] border border-[#DA4F37]/80 shadow-sm'
                    : 'bg-[#1A1A1A] text-[#8F8A7F] border border-[#262626] hover:text-[#FAF8F5] hover:border-[#383838]'
                }`}
              >
                {size === '2ml Discovery' ? '2ml Sample' : size}
              </button>
            ))}
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 text-xs uppercase tracking-[0.15em] font-semibold rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
              isAdded
                ? 'bg-[#1E4D2B] text-white border border-[#2E7D32]'
                : 'bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#DA4F37]" />
                <span>Add to Bag · {formatPrice(currentPrice, currency)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
