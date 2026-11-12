import React, { useState, useMemo } from 'react';
import { FRAGRANCES, DISCOVERY_COFFRET } from './data/fragrances';
import { Fragrance, ScentFamily, BottleSize, Currency, CartItem } from './types/fragrance';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ScentFinderModal } from './components/ScentFinderModal';
import { DiscoveryCoffretSection } from './components/DiscoveryCoffretSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MaisonPhilosophy } from './components/MaisonPhilosophy';
import { Footer } from './components/Footer';

export default function App() {
  // State: Currency
  const [currency, setCurrency] = useState<Currency>('USD');

  // State: Filters & Search
  const [selectedFamily, setSelectedFamily] = useState<ScentFamily>('All Fragrances');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State: Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // State: Modals & Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [detailModalFragrance, setDetailModalFragrance] = useState<Fragrance | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Derived: Filtered Fragrances
  const filteredFragrances = useMemo(() => {
    return FRAGRANCES.filter((frag) => {
      // Family filter
      const matchesFamily =
        selectedFamily === 'All Fragrances' || frag.scentFamily === selectedFamily;

      // Search query (matches name, description, notes, moodTags)
      if (!searchQuery.trim()) return matchesFamily;

      const q = searchQuery.toLowerCase();
      const matchesName = frag.name.toLowerCase().includes(q);
      const matchesDesc = frag.description.toLowerCase().includes(q);
      const matchesNotes = [
        ...frag.notes.top,
        ...frag.notes.heart,
        ...frag.notes.base,
      ].some((note) => note.toLowerCase().includes(q));
      const matchesMood = frag.moodTags.some((tag) => tag.toLowerCase().includes(q));

      return matchesFamily && (matchesName || matchesDesc || matchesNotes || matchesMood);
    });
  }, [selectedFamily, searchQuery]);

  // Derived: Cart totals
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Cart Handler: Add Fragrance Bottle
  const handleAddToCart = (fragrance: Fragrance, size: BottleSize, quantity: number = 1) => {
    const itemId = `${fragrance.id}-${size}`;
    const price = fragrance.prices[size];

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          fragranceId: fragrance.id,
          name: fragrance.name,
          subTitle: fragrance.subTitle,
          size,
          price,
          quantity,
          image: fragrance.image,
        },
      ];
    });

    // Subtly peek open the drawer to confirm acquisition
    setCartDrawerOpen(true);
  };

  // Cart Handler: Add Custom Discovery Coffret
  const handleAddDiscoveryCoffret = (customVials: string[]) => {
    const formattedVialNames = customVials
      .map((id) => FRAGRANCES.find((f) => f.id === id)?.name || id)
      .slice(0, 4);

    const itemId = `coffret-${Date.now()}`;

    setCart((prevCart) => [
      ...prevCart,
      {
        id: itemId,
        fragranceId: DISCOVERY_COFFRET.id,
        name: DISCOVERY_COFFRET.name,
        subTitle: '4 × 2ml Flacons',
        size: '2ml Discovery',
        price: DISCOVERY_COFFRET.price,
        quantity: 1,
        image: DISCOVERY_COFFRET.image,
        customVials: formattedVialNames,
      },
    ]);

    setCartDrawerOpen(true);
  };

  // Cart Handler: Update Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Cart Handler: Remove Item
  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Checkout Handler
  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF8F5] selection:bg-[#DA4F37] selection:text-white flex flex-col font-sans">
      
      {/* 1. Header */}
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenQuiz={() => setQuizModalOpen(true)}
      />

      {/* 2. Editorial Hero */}
      <Hero onOpenQuiz={() => setQuizModalOpen(true)} />

      {/* 3. Catalog Section with Note Filter */}
      <main id="collection" className="flex-1">
        <FilterBar
          selectedFamily={selectedFamily}
          onSelectFamily={setSelectedFamily}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredFragrances.length}
        />

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#222222]">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#DA4F37] block mb-1">
                The Permanent Archives
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">
                {selectedFamily === 'All Fragrances' ? 'Master Flacon Gallery' : selectedFamily}
              </h2>
            </div>
            <p className="text-xs text-[#8E8A80] font-light mt-2 sm:mt-0">
              Concentrations up to 35% pure extrait · Handcrafted flacons
            </p>
          </div>

          {filteredFragrances.length === 0 ? (
            <div className="py-24 text-center space-y-3 bg-[#121212] rounded border border-[#222222]">
              <p className="font-serif text-xl text-[#FAF8F5]">No Flacon Corresponds to this Query</p>
              <p className="text-xs text-[#8E8A80]">
                Try adjusting your search notes or reset the family filter.
              </p>
              <button
                onClick={() => {
                  setSelectedFamily('All Fragrances');
                  setSearchQuery('');
                }}
                className="mt-3 px-5 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-xs text-[#FAF8F5] rounded border border-[#383838] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFragrances.map((fragrance) => (
                <ProductCard
                  key={fragrance.id}
                  fragrance={fragrance}
                  currency={currency}
                  onOpenDetail={setDetailModalFragrance}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Discovery Coffret Highlight */}
        <DiscoveryCoffretSection
          currency={currency}
          onAddCoffret={handleAddDiscoveryCoffret}
        />

        {/* 5. Philosophy & Craftsmanship Section */}
        <MaisonPhilosophy />
      </main>

      {/* 6. Editorial Footer */}
      <Footer />

      {/* Slide-Out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        items={cart}
        currency={currency}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Interactive Scent Finder Mini-Quiz Modal */}
      <ScentFinderModal
        isOpen={quizModalOpen}
        currency={currency}
        onClose={() => setQuizModalOpen(false)}
        onAddToCart={(frag, size) => handleAddToCart(frag, size, 1)}
      />

      {/* Fragrance Detail Deep-Dive Modal */}
      <ProductModal
        fragrance={detailModalFragrance}
        currency={currency}
        onClose={() => setDetailModalFragrance(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout & Simulated Confirmation Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        items={cart}
        currency={currency}
        onClose={() => setCheckoutModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
