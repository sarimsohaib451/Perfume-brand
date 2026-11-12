import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Lock, Package, ArrowRight } from 'lucide-react';
import { CartItem, Currency } from '../types/fragrance';
import { formatPrice } from '../data/fragrances';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  currency: Currency;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  currency,
  onClose,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    firstName: 'Julian',
    lastName: 'Vane',
    email: 'julian.vane@domain.com',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    postalCode: '10001',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  if (!isOpen) return null;

  const subtotalUSD = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingUSD = subtotalUSD >= 200 ? 0 : 25;
  const grandTotalUSD = subtotalUSD + shippingUSD;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = `NSH-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setStep('confirmation');
      onOrderSuccess();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#121212] border border-[#2B2B2B] rounded shadow-2xl overflow-hidden my-auto p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#8E8A80] hover:text-[#FAF8F5] bg-[#1A1A1A] rounded-full border border-[#2E2E2E] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6 border-b border-[#222222] pb-4">
              <span className="text-[10px] tracking-[0.25em] font-mono text-[#DA4F37] uppercase block mb-1">
                Haute Parfumerie Dispatch
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F5]">
                Complete Your Acquisition
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#A39E92] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#DA4F37]" />
                  <span>1. Insured Delivery Address</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">Email for Courier Tracking</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">Country / Territory</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#736E65] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#DA4F37] text-xs text-[#FAF8F5] rounded px-3 py-2 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-3 pt-3 border-t border-[#222222]">
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#A39E92] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#DA4F37]" />
                  <span>2. Payment Privilège</span>
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'apple', label: 'Apple Pay' },
                    { id: 'cod', label: 'Pay on Delivery' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                      className={`p-2.5 rounded text-xs text-center border font-medium cursor-pointer transition-colors ${
                        formData.paymentMethod === p.id
                          ? 'bg-[#262626] border-[#DA4F37] text-[#FAF8F5]'
                          : 'bg-[#181818] border-[#2A2A2A] text-[#807B72]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-3 bg-[#181818] border border-[#282828] rounded space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#8E8A80]">
                      <span className="font-mono">{formData.cardNumber}</span>
                      <span className="font-mono">{formData.cardExp}</span>
                    </div>
                    <div className="text-[10px] text-[#635F57] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#DA4F37]" />
                      <span>Encrypted direct payment through Maison SecureGateway</span>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="p-3 bg-[#181818] border border-[#282828] rounded text-xs text-[#A8A296]">
                    You may inspect the unbroken tamper seal upon courier handover before settling payment in cash or card.
                  </div>
                )}
              </div>

              {/* Order Summary & Submit */}
              <div className="pt-4 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[11px] text-[#7A756D] uppercase tracking-wider block font-mono">
                    Total Due ({items.length} Flacons)
                  </span>
                  <span className="text-2xl font-serif text-[#FAF8F5] tabular-nums font-medium">
                    {formatPrice(grandTotalUSD, currency)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D] text-xs uppercase tracking-[0.2em] font-semibold rounded flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl"
                >
                  {isSubmitting ? (
                    <span>Securing Flacons...</span>
                  ) : (
                    <>
                      <span>Authorize Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#16291C] border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#DA4F37] font-semibold block mb-1">
                Order Confirmed & Sealed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light">
                Gratitude from the Maison
              </h2>
              <p className="text-xs text-[#8E8A80] mt-2 font-mono">
                Acquisition Reference: <span className="text-[#FAF8F5] font-semibold">{orderNumber}</span>
              </p>
            </div>

            <p className="text-sm text-[#BDB8AC] max-w-md mx-auto leading-relaxed font-light">
              Your artisanal extraits are being prepared in our climate-controlled vault in bespoke velvet coffrets.
              Tracking details dispatched to <strong className="text-[#FAF8F5]">{formData.email}</strong>.
            </p>

            {/* Timeline Milestones */}
            <div className="bg-[#171717] border border-[#262626] p-4 rounded max-w-lg mx-auto text-left space-y-3">
              <div className="text-[11px] font-mono text-[#DA4F37] uppercase tracking-wider">
                Olfactory Fulfillment Progress
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 bg-[#222222] rounded border border-emerald-500/30 text-emerald-400 font-medium">
                  ✓ Batch Reserved
                </div>
                <div className="p-2 bg-[#1C1C1C] rounded border border-[#333333] text-[#A6A094]">
                  Bottle Hand-Inspected
                </div>
                <div className="p-2 bg-[#1C1C1C] rounded border border-[#333333] text-[#A6A094]">
                  Courier Handover
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#FAF8F5] text-[#0D0D0D] text-xs uppercase tracking-[0.2em] font-semibold rounded hover:bg-[#EAE4D9] transition-colors cursor-pointer"
              >
                Return to the Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
