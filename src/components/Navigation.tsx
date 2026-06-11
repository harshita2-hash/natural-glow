import React, { useState } from "react";
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles, LogOut, Check, ArrowRight } from "lucide-react";
import { Product } from "../products";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  userEmail: string;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenCompare: () => void;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
  isLoggedIn,
  userEmail,
  onLogout,
  onOpenAuth,
  onOpenCompare
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Suggest products during searching
  const filteredSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    setActiveTab("shop");
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "collections", label: "Collections" },
    { id: "about", label: "About Us" },
    { id: "journal", label: "Journal" },
    { id: "offers", label: "Offers" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-beige shadow-sm">
      {/* Top micro promotion bar */}
      <div className="bg-brand-charcoal text-white py-2 text-center text-[11px] font-sans uppercase tracking-[0.2em] px-4 flex justify-between items-center md:px-12">
        <div className="hidden md:flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-rosegold animate-pulse" />
          <span>Formulated for absolute skin luminosity</span>
        </div>
        <div className="mx-auto md:mx-0 font-medium">
          ✨ Use Code <span className="text-brand-rosegold font-bold">GLOW20</span> for 20% Off + Free Shipping above ₹999 ✨
        </div>
        <button 
          onClick={onOpenCompare}
          className="hidden md:block hover:text-brand-rosegold transition-colors text-[10px] font-bold border-l border-white/20 pl-4"
        >
          Compare Products
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[76px]">
          {/* Logo */}
          <div 
            onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0 cursor-pointer text-2xl font-serif tracking-tight select-none font-bold"
          >
            <span className="text-brand-charcoal">Natural</span>{" "}
            <span className="italic text-brand-rosegold">Glow</span>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-10 text-[13px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setSearchQuery("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`py-2 transition-luxury border-b-2 hover:text-brand-rosegold font-semibold ${
                  activeTab === link.id
                    ? "text-brand-rosegold border-brand-rosegold"
                    : "text-brand-charcoal/80 border-transparent hover:border-brand-rosegold/30"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Icons: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block w-64">
              <input
                type="text"
                placeholder="Search beauty secrets..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 250)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-brand-beige/40 focus:bg-white focus:ring-1 focus:ring-brand-rosegold border border-brand-beige/70 focus:border-brand-rosegold/60 outline-none text-brand-charcoal placeholder-brand-charcoal/50 transition-all font-sans"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-brand-charcoal/50" />
              
              {/* Intelligent Suggestions Dropdown */}
              {showSearchDropdown && searchQuery.trim() && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-brand-beige overflow-hidden text-left z-50">
                  <div className="p-2.5 bg-brand-beige/20 text-[10px] font-bold text-brand-rosegold uppercase tracking-widest border-b border-brand-beige">
                    Matching Skincare Elements
                  </div>
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((product) => (
                      <div
                        key={product.id}
                        onMouseDown={() => {
                          onSelectProduct(product);
                          setSearchQuery("");
                        }}
                        className="p-3 hover:bg-brand-cream/30 flex items-center space-x-3 cursor-pointer transition-colors border-b border-brand-beige/50 last:border-0"
                      >
                        <div className={`w-8 h-10 ${product.bgDecorative} rounded-md flex items-center justify-center p-1 flex-shrink-0`}>
                          <span className="text-[8px] text-brand-rosegold font-bold uppercase truncate">{product.category}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brand-charcoal truncate">{product.name}</p>
                          <p className="text-[10px] text-brand-rosegold">{product.categoryLabel} • ₹{product.price}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-brand-rosegold flex-shrink-0" />
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-brand-charcoal/50 font-sans">
                      No skincare matches for "{searchQuery}"
                    </div>
                  )}
                  <div 
                    onMouseDown={() => {
                      setActiveTab("shop");
                      setShowSearchDropdown(false);
                    }}
                    className="p-2.5 bg-brand-cream/10 hover:bg-brand-cream/30 text-center text-[11px] font-semibold text-brand-rosegold block border-t border-brand-beige cursor-pointer"
                  >
                    View entire catalog
                  </div>
                </div>
              )}
            </form>

            {/* Mobile Search Icon Toggle */}
            <button 
              onClick={() => { setActiveTab("shop"); }}
              className="lg:hidden p-2 rounded-full hover:bg-brand-pink/30 text-brand-charcoal/80 hover:text-brand-charcoal transition-colors cursor-pointer"
              title="Search Shop"
              id="nav-search-mobile-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Badge indicator */}
            <button
              onClick={onOpenCompare}
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-brand-cream/40 border border-brand-rosegold/20 hover:bg-brand-pink/30 transition-colors text-xs text-brand-charcoal font-sans"
              title="Compare Products"
              id="nav-compare-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span className="text-[11px] font-medium hidden md:inline">Compare</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => { setActiveTab("wishlist"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="p-2 rounded-full hover:bg-brand-pink/30 text-brand-charcoal/80 hover:text-brand-rosegold transition-colors cursor-pointer relative"
              title="Saved Wishlist"
              id="nav-wishlist-btn"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? "fill-brand-rosegold text-brand-rosegold" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-rosegold text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => { setActiveTab("cart"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="p-2 rounded-full hover:bg-brand-pink/30 text-brand-charcoal/80 hover:text-brand-rosegold transition-colors cursor-pointer relative"
              title="Shopping Bag"
              id="nav-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-gold text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Authentication/Dashboard Profile Toggle */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-1 lg:border-l lg:border-brand-beige lg:pl-3">
                <button
                  onClick={() => { setActiveTab("dashboard"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="p-2 rounded-full hover:bg-brand-pink/30 text-brand-charcoal/80 hover:text-brand-rosegold transition-colors cursor-pointer flex items-center space-x-1"
                  title="My Premium Account"
                  id="nav-profile-logged-btn"
                >
                  <User className="w-5 h-5 text-brand-rosegold shrink-0" />
                  <span className="text-[11px] font-medium hidden xl:inline text-brand-charcoal truncate max-w-[80px]">Cabinet</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors hidden sm:block"
                  title="Log Out"
                  id="nav-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-2 rounded-full hover:bg-brand-pink/30 text-brand-charcoal/80 hover:text-brand-rosegold transition-colors cursor-pointer flex items-center space-x-1"
                title="Log In / Sign Up"
                id="nav-profile-guest-btn"
              >
                <User className="w-5 h-5" />
                <span className="text-[11px] uppercase tracking-wider font-semibold font-sans hidden lg:inline-block">Sign In</span>
              </button>
            )}

            {/* Hamburger Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-brand-charcoal hover:bg-brand-pink/30 cursor-pointer"
              aria-label="Toggle Menu"
              id="nav-hamburger-mobile-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-ivory border-t border-brand-beige px-6 py-6 space-y-4 animate-fade-in-up">
          <div className="flex flex-col space-y-4 text-sm font-poppins uppercase tracking-[0.15em] font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-bold ${
                  activeTab === link.id ? "text-brand-rosegold pl-2 border-l-2 border-brand-rosegold" : "text-brand-charcoal/80"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab(isLoggedIn ? "dashboard" : "home");
                if (!isLoggedIn) onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 flex items-center space-x-2 text-brand-rosegold"
            >
              <User className="w-4 h-4" />
              <span>{isLoggedIn ? "My Skincare Cabinet" : "Customer Portal Log In"}</span>
            </button>
            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 flex items-center space-x-2 text-brand-gold font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compare Products</span>
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative pt-4 border-t border-brand-beige">
            <input
              type="text"
              placeholder="Search botanical secrets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-brand-beige/40 outline-none text-brand-charcoal font-sans"
            />
            <Search className="absolute left-3 top-6.5 w-4 h-4 text-brand-charcoal/50" />
          </form>
        </div>
      )}
    </header>
  );
}
