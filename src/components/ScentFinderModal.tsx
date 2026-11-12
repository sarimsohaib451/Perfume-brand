import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { Fragrance, BottleSize, Currency, QuizAnswerState } from '../types/fragrance';
import { FRAGRANCES, formatPrice } from '../data/fragrances';

interface ScentFinderModalProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: BottleSize) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  currency,
  onClose,
  onAddToCart,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswerState>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSize, setSelectedSize] = useState<BottleSize>('50ml');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (key: keyof QuizAnswerState, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Analyze with simulated luxury olfactory matching delay
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(4); // Results step
      }, 750);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(1);
    setIsAnalyzing(false);
    setAddedItem(null);
  };

  // Matching algorithm based on selections
  const getRecommendation = () => {
    const vibe = answers.vibe || '';
    const note = answers.dominantNote || '';

    // Match priorities
    if (vibe.includes('Nocturnal') || note.includes('Rum') || note.includes('Tobacco')) {
      return {
        primary: FRAGRANCES.find((f) => f.id === 'fan-your-flames')!,
        secondary: FRAGRANCES.find((f) => f.id === 'ani')!,
        matchScore: 98,
        reason: 'Your preference for nocturnal mystery and smoldering depth harmonizes exquisitely with the dark rum, coconut, and roasted tobacco chords of Fan Your Flames.',
      };
    }

    if (vibe.includes('Regal') || note.includes('Oud') || note.includes('Honey')) {
      return {
        primary: FRAGRANCES.find((f) => f.id === 'nefs')!,
        secondary: FRAGRANCES.find((f) => f.id === 'hacivat')!,
        matchScore: 99,
        reason: 'Your desire for monumental presence and regal luxury matches the imperial Assafi oud, saffron, and wildflower honey architecture of Nefs.',
      };
    }

    if (vibe.includes('Luminous') || note.includes('Tea') || note.includes('Citrus')) {
      return {
        primary: FRAGRANCES.find((f) => f.id === 'wulong-cha')!,
        secondary: FRAGRANCES.find((f) => f.id === 'hacivat')!,
        matchScore: 97,
        reason: 'Your affinity for serenity and fresh botanical clarity is perfectly captured by the misty mountain Oolong tea and Mediterranean fig of Wūlóng Chá.',
      };
    }

    if (vibe.includes('Contemplation') || note.includes('Vanilla')) {
      return {
        primary: FRAGRANCES.find((f) => f.id === 'ani')!,
        secondary: FRAGRANCES.find((f) => f.id === 'hundred-silent-ways')!,
        matchScore: 96,
        reason: 'Your taste for warm, poetic soulfulness aligns with Ani’s famous spicy cardamom and Madagascar vanilla extrait.',
      };
    }

    // Default to flagship Hacivat
    return {
      primary: FRAGRANCES.find((f) => f.id === 'hacivat')!,
      secondary: FRAGRANCES.find((f) => f.id === 'hundred-silent-ways')!,
      matchScore: 95,
      reason: 'Your taste demands timeless charisma, sparkling Italian bergamot, and cedarwood strength.',
    };
  };

  const recommendation = getRecommendation();

  const handleAdd = (fragrance: Fragrance) => {
    onAddToCart(fragrance, selectedSize);
    setAddedItem(fragrance.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121212] border border-[#2E2E2E] rounded-md shadow-2xl overflow-hidden p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#8E8A80] hover:text-[#FAF8F5] bg-[#1C1C1C] rounded-full border border-[#2B2B2B] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Kicker */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-[11px] tracking-[0.3em] uppercase text-[#DA4F37] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Olfactory Consultation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F5]">
            Discover Your Signature Extrait
          </h2>
        </div>

        {/* Loading / Analyzing State */}
        {isAnalyzing && (
          <div className="py-16 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#DA4F37] border-t-transparent animate-spin" />
            <p className="font-serif text-lg text-[#FAF8F5]">Consulting the Master Perfumer’s Accord Tables...</p>
            <p className="text-xs text-[#8E8A80]">Synthesizing top, heart, and base affinities</p>
          </div>
        )}

        {/* Step 1: Mood & Aura */}
        {!isAnalyzing && currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#8E8A80] font-mono border-b border-[#222222] pb-2">
              <span>QUESTION 01 OF 03</span>
              <span className="text-[#DA4F37]">THE DESIRED AURA</span>
            </div>

            <p className="text-sm sm:text-base text-[#FAF8F5] font-light">
              What emotional atmosphere do you wish your presence to project?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Seductive & Nocturnal', desc: 'Hypnotic boozy woods, smoldering rum, and tobacco warmth' },
                { title: 'Commanding & Regal', desc: 'Precious oud, rare saffron, and majestic golden amber' },
                { title: 'Luminous & Refreshing', desc: 'Mountain tea serenity, dew drops, and sparkling citrus' },
                { title: 'Warm & Cozy Contemplation', desc: 'Spicy cardamom, bourbon vanilla, and cashmere comfort' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  onClick={() => handleSelectOption('vibe', opt.title)}
                  className="p-4 text-left bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#DA4F37] rounded transition-all duration-200 cursor-pointer group"
                >
                  <div className="font-serif text-base text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#8A857B] mt-1 leading-snug">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Occasion / Setting */}
        {!isAnalyzing && currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#8E8A80] font-mono border-b border-[#222222] pb-2">
              <span>QUESTION 02 OF 03</span>
              <span className="text-[#DA4F37]">THE OCCASION</span>
            </div>

            <p className="text-sm sm:text-base text-[#FAF8F5] font-light">
              In what setting will this flacon be your most frequent companion?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Crisp Morning & Daily Signature', desc: 'Effortless elevation for boardroom, studio, and travel' },
                { title: 'Intimate Candlelit Evenings', desc: 'Closer proximity, whispered conversations, and lingering allure' },
                { title: 'Celebratory Grand Galas', desc: 'Monumental sillage meant to linger in grand architectural spaces' },
                { title: 'Quiet Solitary Ritual', desc: 'Private reflection, reading, and contemplative morning tea' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  onClick={() => handleSelectOption('setting', opt.title)}
                  className="p-4 text-left bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#DA4F37] rounded transition-all duration-200 cursor-pointer group"
                >
                  <div className="font-serif text-base text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#8A857B] mt-1 leading-snug">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Dominant Note Preference */}
        {!isAnalyzing && currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#8E8A80] font-mono border-b border-[#222222] pb-2">
              <span>QUESTION 03 OF 03</span>
              <span className="text-[#DA4F37]">THE OLFACTORY ACCORD</span>
            </div>

            <p className="text-sm sm:text-base text-[#FAF8F5] font-light">
              Which raw natural botanical note speaks directly to your soul?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Smoky Woods, Rum & Pipe Tobacco', desc: 'Charred cedar, oakmoss, roasted coconut, and fine aged spirits' },
                { title: 'Imperial Oud, Saffron & Rose', desc: 'Rare agarwood resin, wildflower honey, and Damascus petals' },
                { title: 'Calabrian Bergamot & Oolong Tea', desc: 'Crisp green tea leaf, Mediterranean fig, and vibrant citrus peel' },
                { title: 'Bourbon Vanilla, Ginger & Cardamom', desc: 'Dry spiced sweetness, warm amber, and velvety sandalwood' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  onClick={() => handleSelectOption('dominantNote', opt.title)}
                  className="p-4 text-left bg-[#171717] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#DA4F37] rounded transition-all duration-200 cursor-pointer group"
                >
                  <div className="font-serif text-base text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors">
                    {opt.title}
                  </div>
                  <div className="text-xs text-[#8A857B] mt-1 leading-snug">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Results Screen */}
        {!isAnalyzing && currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-4 bg-[#181818] rounded border border-[#2E2E2E]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase text-[#DA4F37] font-semibold">
                  Primary Olfactory Match
                </span>
                <span className="text-xs font-mono px-2 py-0.5 bg-[#0D0D0D] text-[#FAF8F5] rounded border border-[#333333]">
                  {recommendation.matchScore}% Resonance
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center mt-3">
                <img
                  src={recommendation.primary.image}
                  alt={recommendation.primary.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded bg-black shrink-0 border border-[#333333]"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-serif text-2xl text-[#FAF8F5]">
                    {recommendation.primary.name}
                  </h3>
                  <p className="text-xs text-[#DA4F37] italic font-serif mt-0.5">
                    {recommendation.primary.subTitle} · {recommendation.primary.scentFamily}
                  </p>
                  <p className="text-xs text-[#B5B0A4] font-light mt-2 leading-relaxed">
                    {recommendation.reason}
                  </p>
                </div>
              </div>

              {/* Presentation Selector */}
              <div className="mt-4 pt-3 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  {(['50ml', '100ml', '2ml Discovery'] as BottleSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1.5 px-3 text-xs rounded transition-all font-medium ${
                        selectedSize === size
                          ? 'bg-[#2E2E2E] text-[#FAF8F5] border border-[#DA4F37]'
                          : 'bg-[#121212] text-[#8C867B] hover:text-[#FAF8F5]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAdd(recommendation.primary)}
                  className={`w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    addedItem === recommendation.primary.id
                      ? 'bg-[#1E4D2B] text-white'
                      : 'bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D]'
                  }`}
                >
                  {addedItem === recommendation.primary.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag · {formatPrice(recommendation.primary.prices[selectedSize], currency)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Alternative recommendation runner-up */}
            <div className="p-3 bg-[#0F0F0F] rounded border border-[#222222] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={recommendation.secondary.image}
                  alt={recommendation.secondary.name}
                  className="w-12 h-12 object-cover rounded bg-black shrink-0 border border-[#2B2B2B]"
                />
                <div>
                  <div className="text-[10px] text-[#807B73] font-mono uppercase">Complementary Nuance</div>
                  <div className="font-serif text-sm text-[#FAF8F5]">{recommendation.secondary.name}</div>
                  <div className="text-[11px] text-[#A6A094]">{recommendation.secondary.scentFamily}</div>
                </div>
              </div>

              <button
                onClick={() => handleAdd(recommendation.secondary)}
                className="px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#282828] text-xs text-[#FAF8F5] border border-[#333333] rounded transition-colors"
              >
                Add 2ml Sample · {formatPrice(18, currency)}
              </button>
            </div>

            {/* Reset / Retake Button */}
            <div className="text-center pt-2">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-[#8A857B] hover:text-[#FAF8F5] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
