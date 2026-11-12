import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1F1F1F] text-[#8C877D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Newsletter & Concierge Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#1C1C1C]">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] text-[#DA4F37] uppercase font-semibold">
              The Maison Correspondence
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">
              Receive Private Harvest Previews & Olfactory Musings
            </h3>
            <p className="text-xs text-[#999489] font-light leading-relaxed max-w-md">
              Subscribers receive advance allocation invitations for rare limited extraits, private salon consultations, and seasonal formulation notes.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#14261A] border border-emerald-500/40 rounded text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been entered into the Private Ledger of the Maison.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md pt-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#141414] border border-[#2B2B2B] focus:border-[#DA4F37] text-xs text-[#FAF8F5] px-3.5 py-3 rounded outline-none font-sans placeholder-[#5E5950]"
                  />
                  <Mail className="w-4 h-4 text-[#5E5950] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF8F5] hover:bg-[#EAE4D9] text-[#0D0D0D] text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Boutiques */}
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#FAF8F5] font-medium">
                Ateliers & Salons
              </h4>
              <ul className="space-y-2 text-[#7F7A70]">
                <li>Istanbul (Nişantaşı Flagship)</li>
                <li>Paris (Rue Saint-Honoré)</li>
                <li>London (Mayfair Salon)</li>
                <li>Milan (Via Montenapoleone)</li>
                <li>New York (Madison Avenue)</li>
              </ul>
            </div>

            {/* Client Services */}
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#FAF8F5] font-medium">
                Concierge Privé
              </h4>
              <ul className="space-y-2 text-[#7F7A70]">
                <li>Bespoke Scent Matching</li>
                <li>Insured Worldwide Transit</li>
                <li>Complimentary Sample Policy</li>
                <li>Authenticity Verification</li>
                <li>Private Gifting Coffrets</li>
              </ul>
            </div>

            {/* Legal & Standards */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#FAF8F5] font-medium">
                Heritage & Craft
              </h4>
              <ul className="space-y-2 text-[#7F7A70]">
                <li>30%+ Extrait Formulation</li>
                <li>Cruelty-Free & IFRA Certified</li>
                <li>Ethical Resin Sourcing</li>
                <li>Recyclable Heavy Glass</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#635E54] gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-widest text-sm text-[#A6A094]">NISHANE</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 NISHANE Haute Parfumerie. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[#8C877D]">
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Terms of Atelier</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Certificate of Purity</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
