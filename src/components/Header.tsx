import React from 'react';
import { ShoppingBag, Sparkles, Globe, Menu, X } from 'lucide-react';
import { Currency } from '../types/fragrance';
import { CURRENCY_RATES, formatPrice } from '../data/fragrances';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartSubtotal,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenQuiz,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#262626]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="flex flex-col items-start group shrink-0 select-none text-left"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-[0.3em] font-semibold text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors duration-300">
              NISHANE
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8C8880] uppercase -mt-0.5">
              Haute Parfumerie · Istanbul
            </span>
          </a>

          {/* Zone 2: Navigation Links (Single-line, clean typography) */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium text-[#B8B4AE]">
            <a
              href="#collection"
              className="hover:text-[#FAF8F5] transition-colors duration-200 py-1 border-b border-transparent hover:border-[#DA4F37] whitespace-nowrap shrink-0"
            >
              Collection
            </a>
            <a
              href="#discovery-coffret"
              className="hover:text-[#FAF8F5] transition-colors duration-200 py-1 border-b border-transparent hover:border-[#DA4F37] whitespace-nowrap shrink-0"
            >
              Discovery Set
            </a>
            <button
              onClick={onOpenQuiz}
              className="hover:text-[#FAF8F5] transition-colors duration-200 py-1 border-b border-transparent hover:border-[#DA4F37] flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DA4F37]" />
              Scent Finder
            </button>
            <a
              href="#maison-philosophy"
              className="hover:text-[#FAF8F5] transition-colors duration-200 py-1 border-b border-transparent hover:border-[#DA4F37] whitespace-nowrap shrink-0"
            >
              The Maison
            </a>
          </nav>

          {/* Zone 3: Actions (Currency & Shopping Bag Drawer Trigger) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Currency Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-[#A39E93] hover:text-[#FAF8F5] px-2.5 py-1.5 rounded border border-[#2E2E2E] hover:border-[#4A4A4A] transition-colors"
                title="Select currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#DA4F37]" />
                <span className="font-mono">{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-[#1A1A1A] border border-[#2E2E2E] rounded-md shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        currency === curr
                          ? 'bg-[#2E2E2E] text-[#FAF8F5] font-semibold'
                          : 'text-[#A39E93] hover:bg-[#262626] hover:text-[#FAF8F5]'
                      }`}
                    >
                      <span>{CURRENCY_RATES[curr].label}</span>
                      <span className="font-mono text-xs">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Bag Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-md bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] hover:border-[#DA4F37]/50 text-[#FAF8F5] transition-all duration-200 cursor-pointer group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FAF8F5] group-hover:text-[#DA4F37] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#DA4F37] text-white text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-[#C4C0B6]">
                Bag
              </span>
              {cartCount > 0 && (
                <span className="hidden sm:inline text-xs font-mono text-[#DA4F37] font-semibold pl-1 border-l border-[#333333]">
                  {formatPrice(cartSubtotal, currency)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A39E93] hover:text-[#FAF8F5]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-[#262626] px-6 py-5 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-sm tracking-[0.15em] uppercase font-medium text-[#B8B4AE]">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FAF8F5] py-1 border-b border-[#222222]"
            >
              Collection
            </a>
            <a
              href="#discovery-coffret"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FAF8F5] py-1 border-b border-[#222222]"
            >
              Discovery Set
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left hover:text-[#FAF8F5] py-1 flex items-center gap-2 border-b border-[#222222]"
            >
              <Sparkles className="w-4 h-4 text-[#DA4F37]" />
              Scent Finder
            </button>
            <a
              href="#maison-philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#FAF8F5] py-1"
            >
              The Maison
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
