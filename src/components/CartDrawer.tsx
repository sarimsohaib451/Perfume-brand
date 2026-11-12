import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { CartItem, Currency } from '../types/fragrance';
import { formatPrice } from '../data/fragrances';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD_USD = 200;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoAppliedMessage, setPromoAppliedMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmountUSD = rawSubtotalUSD * (discountPercent / 100);
  const discountedSubtotalUSD = rawSubtotalUSD - discountAmountUSD;
  
  const hasFreeShipping = discountedSubtotalUSD >= FREE_SHIPPING_THRESHOLD_USD;
  const shippingCostUSD = hasFreeShipping || items.length === 0 ? 0 : 25;
  const totalAmountUSD = discountedSubtotalUSD + shippingCostUSD;

  const progressPercent = Math.min(100, Math.round((discountedSubtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - discountedSubtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoAppliedMessage(null);

    const code = promoCode.trim().toUpperCase();
    if (code === 'MAISON15') {
      setDiscountPercent(15);
      setPromoAppliedMessage('Maison 15% VIP Privilège Applied');
    } else if (code === 'DISCOVERY') {
      setDiscountPercent(20);
      setPromoAppliedMessage('Discovery Coffret Credit (20% Off) Applied');
    } else {
      setPromoError('Invalid promotion code. Try "MAISON15" or "DISCOVERY".');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-[#FAF8F5] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl tracking-wider text-[#FAF8F5]">
                Your Shopping Bag
              </h2>
              <span className="font-mono text-xs text-[#8E8A80]">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#8E8A80] hover:text-[#FAF8F5] bg-[#1A1A1A] hover:bg-[#262626] rounded-full border border-[#2E2E2E] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-[#171717] border-b border-[#222222]">
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
              <span className="text-[#BDB8AC]">
                {hasFreeShipping
                  ? '✨ Complimentary insured global delivery unlocked!'
                  : `Add ${formatPrice(remainingForFreeShipping, currency)} more for complimentary shipping`}
              </span>
              <span className="text-[#DA4F37] font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#282828] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DA4F37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#1F1F1F]">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#55524B] mx-auto" />
                <p className="font-serif text-lg text-[#FAF8F5]">Your Bag is Currently Empty</p>
                <p className="text-xs text-[#807B73] max-w-xs mx-auto">
                  Explore our extraits de parfum or assemble your tailored discovery coffret.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#FAF8F5] text-[#0D0D0D] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#EAE4D9]"
                >
                  Explore Flacons
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded bg-[#0A0A0A] shrink-0 border border-[#2B2B2B]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif text-base text-[#FAF8F5] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#DA4F37] font-mono">
                          {item.size}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#FAF8F5] font-semibold tabular-nums ml-2">
                        {formatPrice(item.price * item.quantity, currency)}
                      </span>
                    </div>

                    {item.customVials && item.customVials.length > 0 && (
                      <p className="text-[10px] text-[#807B73] mt-1 leading-tight truncate">
                        Vials: {item.customVials.join(', ')}
                      </p>
                    )}

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#2B2B2B] bg-[#171717] rounded">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#8E8A80] hover:text-[#FAF8F5]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-mono text-xs text-[#FAF8F5]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#8E8A80] hover:text-[#FAF8F5]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#736E65] hover:text-[#DA4F37] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0E0E0E] border-t border-[#242424] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo / Voucher Code"
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 pl-8 outline-none uppercase font-mono"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#6B665E] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#222222] hover:bg-[#303030] border border-[#333333] text-xs uppercase tracking-wider text-[#FAF8F5] rounded font-medium cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoAppliedMessage && (
                  <p className="text-[11px] text-emerald-400 font-mono mt-1">
                    ✓ {promoAppliedMessage}
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 font-mono mt-1">
                    {promoError}
                  </p>
                )}
              </form>

              {/* Subtotal calculation */}
              <div className="space-y-1.5 text-xs text-[#99948A] border-t border-[#1C1C1C] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAF8F5] tabular-nums">
                    {formatPrice(rawSubtotalUSD, currency)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilège Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">
                      -{formatPrice(discountAmountUSD, currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Global Courier</span>
                  <span className="font-mono text-[#FAF8F5] tabular-nums">
                    {hasFreeShipping ? 'Complimentary' : formatPrice(shippingCostUSD, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-serif text-[#FAF8F5] font-semibold pt-2 border-t border-[#222222]">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">
                    {formatPrice(totalAmountUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D] text-xs uppercase tracking-[0.2em] font-semibold rounded flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#736E65]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DA4F37]" />
                <span>SSL 256-bit Encrypted Checkout · Sealed Authenticity Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
