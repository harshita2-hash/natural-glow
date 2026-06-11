import React, { useState, useEffect } from "react";
import { Star, Shield, ArrowRight, Instagram, MessageSquare, Sparkles, AlertCircle, ShoppingBag, Heart, CheckCircle, Scale, Eye, X, BookOpen, Clock, Twitter } from "lucide-react";
import { PRODUCTS, Product, BLOG_ARTICLES, PROMO_OFFERS } from "./products";

// Module Components Import
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProductCard, { ProductSVG } from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import SkincarePlanner from "./components/SkincarePlanner";
import SpinWheel from "./components/SpinWheel";
import ShopPage from "./components/ShopPage";
import CartCheckout from "./components/CartCheckout";
import Dashboard from "./components/Dashboard";
import SkincareChatbot from "./components/SkincareChatbot";

// Secondary Pages Import
import { AboutPage, BlogPage, OffersPage, ContactPage } from "./components/Pages";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  
  // Searching & Selection State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Auth & Promotions
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authStep, setAuthStep] = useState<"username" | "otp">("username");
  const [authEmailInput, setAuthEmailInput] = useState("");
  const [authOTPInput, setAuthOTPInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  
  // Comparison & Spin marketing drawers
  const [showCompareBar, setShowCompareBar] = useState(false);
  const [showSpinWheelPopup, setShowSpinWheelPopup] = useState(false);
  const [hasSubscribedNewsletter, setHasSubscribedNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Sync data with standard localStorage for premium persistent cabinet experience
  useEffect(() => {
    const cachedCart = localStorage.getItem("glow_cart");
    const cachedWishlist = localStorage.getItem("glow_wishlist");
    const cachedOrders = localStorage.getItem("glow_orders");
    const cachedUser = localStorage.getItem("glow_user_email");
    const cachedPromo = localStorage.getItem("glow_promo");

    if (cachedCart) setCartItems(JSON.parse(cachedCart));
    if (cachedWishlist) setWishlistIds(JSON.parse(cachedWishlist));
    if (cachedOrders) setOrderHistory(JSON.parse(cachedOrders));
    if (cachedUser) {
      setUserEmail(cachedUser);
      setIsLoggedIn(true);
    }
    if (cachedPromo) setAppliedPromo(cachedPromo);

    // Trigger welcoming marketing popup voucher spinner after short delay
    const timer = setTimeout(() => {
      setShowSpinWheelPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("glow_cart", JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWish: string[]) => {
    setWishlistIds(updatedWish);
    localStorage.setItem("glow_wishlist", JSON.stringify(updatedWish));
  };

  // 1. ADD TO CART MUTATOR
  const handleAddToCart = (product: Product, quantity = 1, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    const exists = cartItems.find((item) => item.product.id === product.id);
    let updated: CartItem[] = [];
    if (exists) {
      updated = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updated = [...cartItems, { product, quantity }];
    }
    saveCartToStorage(updated);
    
    // Smooth Micro Feedback Note
    alert(`🌿 Squeezed 1x "${product.name}" successfully into your Shopping Bag.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // 2. TOGGLE WISHLIST SAVER
  const handleToggleWishlist = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    let updated: string[] = [];
    if (wishlistIds.includes(product.id)) {
      updated = wishlistIds.filter((id) => id !== product.id);
    } else {
      updated = [...wishlistIds, product.id];
    }
    saveWishlistToStorage(updated);
  };

  // 3. COMPARE COMPARTMENT MULTIPLIER (Max 3 Products)
  const handleToggleCompare = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    let updated = [...comparedIds];
    if (comparedIds.includes(product.id)) {
      updated = comparedIds.filter((id) => id !== product.id);
    } else {
      if (comparedIds.length >= 3) {
        alert("🔬 Chemical comparisons are capped at a maximum of 3 formulas simultaneously.");
        return;
      }
      updated = [...comparedIds, product.id];
    }
    setComparedIds(updated);
    setShowCompareBar(updated.length > 0);
  };

  // 4. INSTANT COMPLETE BUNDLES CHECKOUT
  const handleAddBundleToCart = (productsArray: Product[]) => {
    let updatedCart = [...cartItems];
    productsArray.forEach((product) => {
      const exists = updatedCart.find((item) => item.product.id === product.id);
      if (exists) {
        updatedCart = updatedCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart.push({ product, quantity: 1 });
      }
    });
    saveCartToStorage(updatedCart);
    setAppliedPromo("GLOW20"); // Auto-reward coupon code GLOW20
    setActiveTab("cart");
    alert("✨ Complete diagnostic timeline loaded! Handed bundle rebate on the Checkout Ledger.");
  };

  // 5. SIGN IN / LOG OUT LOGIC SIMULATIONS
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === "username") {
      if (!authEmailInput.trim() || !authEmailInput.includes("@")) {
        alert("Please enter a valid customer email.");
        return;
      }
      setAuthStep("otp");
    } else {
      if (authOTPInput.trim().length < 4) {
        alert("Please enter the 4-digit security code received.");
        return;
      }
      // Log In verified
      setIsLoggedIn(true);
      setUserEmail(authEmailInput);
      localStorage.setItem("glow_user_email", authEmailInput);
      setIsAuthOpen(false);
      setAuthStep("username");
      setAuthOTPInput("");
      setAuthEmailInput("");
      alert("🔐 Credentials authorized. Welcome back to Natural Glow Boutique Cabinet.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("glow_user_email");
    setActiveTab("home");
  };

  const handleRegisterNewOrder = (newOrder: { id: string; items: any[]; totalAmount: number; date: string }) => {
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem("glow_orders", JSON.stringify(updatedHistory));
  };

  // Newsletter Sign up submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      alert("Please specify a valid subscription email.");
      return;
    }
    setHasSubscribedNewsletter(true);
    setAppliedPromo("WELCOME15");
    setNewsletterEmail("");
  };

  // Sync Category tab clicks
  const [activeCollectionCategory, setActiveCollectionCategory] = useState<string>("all");

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-pink selection:text-brand-charcoal">
      
      {/* 1. Navigational Header */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProduct(null); // Clear selected if tab shifts
        }}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            setActiveTab("shop");
          }
        }}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setActiveTab("details");
        }}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        onOpenAuth={() => {
          setAuthStep("username");
          setIsAuthOpen(true);
        }}
        onOpenCompare={() => {
          if (comparedIds.length === 0) {
            alert("🔬 Please flag some products using the 'Compare' checkmarks inside catalog cards first.");
            return;
          }
          setShowCompareBar(true);
        }}
      />

      {/* 2. Primary Page Router State Machine */}
      <main className="flex-grow">
        
        {/* DETAILS PAGE (Overrides activeTab if selectedProduct exists) */}
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={(prod, qty) => {
              handleAddToCart(prod, qty);
            }}
            onBuyNow={(prod, qty) => {
              handleAddToCart(prod, qty);
              setActiveTab("cart");
            }}
            onToggleWishlist={(prod) => handleToggleWishlist(prod)}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onBackToShop={() => {
              setSelectedProduct(null);
              setActiveTab("shop");
            }}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <div className="space-y-16">
                
                {/* Hero Section */}
                <Hero
                  onShopNow={() => setActiveTab("shop")}
                  onExploreCollection={() => setActiveTab("collections")}
                  onSelectProductById={(id) => {
                    const match = PRODUCTS.find((p) => p.id === id);
                    if (match) {
                      setSelectedProduct(match);
                    }
                  }}
                />

                {/* Promotional Offers Row (Buy 2 Get 1 Free, flat 20% off) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-cream/30 p-6 rounded-3xl border border-brand-beige">
                    <div className="flex items-center space-x-3.5 text-left p-2.5">
                      <div className="w-10 h-10 rounded-full bg-brand-pink/50 text-[#D8A47F] flex items-center justify-center font-bold text-sm shrink-0">🌱</div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#2B2B2B]">Buy 2 Choose 1 FREE</h4>
                        <p className="text-[11px] text-brand-charcoal/60 mt-0.5">Hydration face cleanser packed complementary inside serums cooler.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3.5 text-left p-2.5 border-y md:border-y-0 md:border-x border-brand-beige/70">
                      <div className="w-10 h-10 rounded-full bg-[#FFF5E6] text-[#C9A227] flex items-center justify-center font-bold text-sm shrink-0">🎟️</div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#2B2B2B]">Flat 20% Off</h4>
                        <p className="text-[11px] text-brand-charcoal/60 mt-0.5">Use active voucher GLOW20 across best seller serums.</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 text-left p-2.5">
                      <div className="w-10 h-10 rounded-full bg-brand-beige text-brand-rosegold flex items-center justify-center font-bold text-sm shrink-0">📦</div>
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#2B2B2B]">Automatic Free Shipping</h4>
                        <p className="text-[11px] text-brand-charcoal/60 mt-0.5">Any package dispatch exceeding ₹999 total shopping volume.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Collections categories */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-rosegold font-sans">Care Sectors</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-bold">Featured Categories</h2>
                    <div className="w-12 h-1 bg-brand-rosegold mx-auto mt-2"></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 font-sans">
                    {[
                      { icon: "💧", label: "Serums", val: "serums" },
                      { icon: "🧴", label: "Moisturizers", val: "moisturizers" },
                      { icon: "☀️", label: "Sunscreens", val: "sunscreens" },
                      { icon: "🧼", label: "Face Wash", val: "face-wash" },
                      { icon: "🛡️", label: "Acne Care", val: "acne-care" },
                      { icon: "🧬", label: "Anti-Aging", val: "anti-aging" }
                    ].map((cat) => (
                      <div
                        key={cat.val}
                        onClick={() => {
                          setActiveCollectionCategory(cat.val);
                          setActiveTab("collections");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group bg-white border border-brand-beige p-5 rounded-3xl hover:border-brand-rosegold/30 hover:shadow-lg transition-luxury cursor-pointer text-center space-y-2.5"
                      >
                        <div className="text-3xl transition-transform group-hover:scale-110 duration-300">{cat.icon}</div>
                        <h3 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider">{cat.label}</h3>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Best Sellers Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-8">
                  <div className="flex justify-between items-end pb-3 border-b border-[#F4EDE4]">
                    <div className="text-left font-sans">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#D8A47F]">Client Favorites</span>
                      <h2 className="text-xl sm:text-2xl font-serif text-brand-charcoal font-bold mt-1">Our Best Sellers</h2>
                    </div>
                    <button 
                      onClick={() => setActiveTab("shop")}
                      className="text-xs uppercase tracking-widest font-bold text-brand-rosegold border-b-2 border-brand-rosegold pb-1.5 hover:text-brand-gold hover:border-brand-gold transition-colors cursor-pointer"
                    >
                      View entire catalog
                    </button>
                  </div>

                  {/* Show first 4 best rated products in grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(prod, e) => handleAddToCart(prod, 1, e)}
                        onToggleWishlist={(prod, e) => handleToggleWishlist(prod, e)}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                        onQuickView={(prod, e) => handleAddToCart(prod, 1, e)}
                        onToggleCompare={(prod, e) => handleToggleCompare(prod, e)}
                        isCompared={comparedIds.includes(product.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* Custom Timelines Skincare Planner Builder promo row */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SkincarePlanner
                    onAddBundleToCart={handleAddBundleToCart}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                </section>

                {/* Testimonials */}
                <section className="bg-brand-cream/20 py-16 border-y border-brand-beige">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rosegold">Client Diaries</span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-bold">Tested & Loved By Real Skin</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                      {[
                        { name: "Sanya Roy, 28", quote: "I've dealt with chemical acne burn outs from standard store products. Switching to Natural Glow was the single best decision I've made. My pores are virtually non-existent, and the hydration levels are dewy all day.", role: "Verified Skincare Member" },
                        { name: "Devika G., 34", quote: "The 10% Niacinamide Pore corrector is some absolute genius formula. My skin texture smoothed perfectly inside 10 days of evening use. Highly recommend their smart Routine diagnostic builder!", role: "Clinical Consultant" },
                        { name: "Gautam V., 31", quote: "I was looking for a mineral sunscreen SPF that doesn't sweat white under humidity. Natural Glow's Matte fluid SPF is absolutely light and has zero white shadows. A real masterpiece.", role: "Skincare Blogger" }
                      ].map((t, i) => (
                        <div key={i} className="p-6 bg-white border border-brand-beige rounded-3xl space-y-4 shadow-xs">
                          <div className="flex text-[#C9A227]">
                            {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
                          </div>
                          <p className="text-xs text-brand-charcoal/80 leading-relaxed font-sans">"{t.quote}"</p>
                          <div className="pt-2 border-t border-brand-beige flex items-center justify-between text-[11px] font-sans">
                            <span className="font-bold text-brand-charcoal">{t.name}</span>
                            <span className="text-[#C9A227] font-semibold">{t.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Skincare Benefits Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rosegold">Formulation Targets</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-brand-[#2B2B2B] font-bold">Our Dermatological Objectives</h2>
                    <div className="w-12 h-1 bg-brand-rosegold mx-auto mt-2"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                    {[
                      { icon: "✨", title: "Brightening complex", desc: "Reduces dark spots & skin imperfections with Vitamin C." },
                      { icon: "💧", title: "Max Hydration", desc: "Restores deep cellular water reserves via Hyaluronic weights." },
                      { icon: "🛡️", title: "Acne Control", desc: "Drains pore sebum clogging with pure Salicylic properties." },
                      { icon: "🧬", title: "Cell Anti-Aging", desc: "Speeds skin collagen renewal with encapsulated Retinol." },
                      { icon: "🤍", title: "Lipid Matrix Repair", desc: "Builds absolute epidermal protection via Multi-Ceramides." }
                    ].map((ben, idx) => (
                      <div key={idx} className="p-5 bg-white border border-brand-beige rounded-3xl text-center space-y-3 hover:border-brand-rosegold/30 transition-colors">
                        <span className="text-3xl block">{ben.icon}</span>
                        <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">{ben.title}</h3>
                        <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-sans">{ben.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Dewy Instagram Skin gallery */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-8">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rosegold font-sans">Lifestyle Social</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-bold">#DiscoverYourGlow</h2>
                    <p className="text-xs text-brand-charcoal/50 font-sans mt-0.5">Tag our botanical lines over social channels to win luxury gift boxes monthly!</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 1, label: "Fresh dewy skin morning", bg: "bg-[#FFF5E6]" },
                      { id: 2, label: "Golden Hour Glow Serum", bg: "bg-[#F8D7DA]" },
                      { id: 3, label: "Self care routine dewy base", bg: "bg-[#F4EDE4]" },
                      { id: 4, label: "Clean hydration bottle pipettes", bg: "bg-brand-ivory" }
                    ].map((img) => (
                      <div 
                        key={img.id} 
                        className="aspect-square relative rounded-3xl overflow-hidden border border-brand-beige group cursor-pointer"
                      >
                        <div className={`absolute inset-0 ${img.bg} opacity-20 flex items-center justify-center p-6 text-brand-rosegold text-xs font-serif uppercase tracking-widest`}>
                           🌿 Dewy Skin Photography {img.id}
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-left text-white font-sans">
                          <Instagram className="w-5 h-5 mb-1.5" />
                          <span className="text-[10px] font-bold tracking-wide uppercase">{img.label}</span>
                          <span className="text-[8px] text-white/60">@naturalglow_india</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Newsletter Subscriber form */}
                <section className="bg-brand-charcoal text-white py-14 px-6 rounded-3xl max-w-5xl mx-auto my-12 text-center space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-brand-pink opacity-5 blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-brand-gold opacity-5 blur-3xl"></div>

                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D8A47F]">Botanical Society</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">Join the Natural Glow Community</h2>
                    <p className="text-xs text-white/70 leading-relaxed font-sans max-w-lg mx-auto">
                      Subscribe to receive early access botanical releases, private client diagnostics logs, and <strong>15% Welcome vouchers</strong> instantly.
                    </p>
                  </div>

                  {!hasSubscribedNewsletter ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2.5 font-sans">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="px-4 py-3 rounded-full text-xs font-medium text-brand-charcoal bg-white/95 placeholder-brand-charcoal/40 outline-none w-full sm:w-72 border border-white/20"
                      />
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase tracking-wider text-xs rounded-full hover:scale-105 transition-transform cursor-pointer"
                        id="newsletter-submit-btn"
                      >
                        Subscribe
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-full bg-white/10 max-w-sm mx-auto text-xs font-bold text-brand-gold font-sans uppercase tracking-wider border border-white/15 animate-fade-in-up">
                      🎉 Welcome Voucher WELCOME15 Applied To Cart!
                    </div>
                  )}
                </section>

              </div>
            )}

            {activeTab === "shop" && (
              <ShopPage
                onAddToCart={(prod, e) => handleAddToCart(prod, 1, e)}
                onToggleWishlist={(prod, e) => handleToggleWishlist(prod, e)}
                wishlistIds={wishlistIds}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onQuickView={(prod, e) => {
                  e.stopPropagation();
                  setQuickViewProduct(prod);
                }}
                onToggleCompare={(prod, e) => handleToggleCompare(prod, e)}
                comparedIds={comparedIds}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {/* COLLECTIONS / CATEGORIES PAGES RENDERING */}
            {activeTab === "collections" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up space-y-12">
                
                {/* Category tab controls */}
                <div className="flex flex-wrap gap-2 justify-center pb-6 border-b border-brand-beige">
                  {[
                    { val: "all", label: "✨ All Laboratories" },
                    { val: "serums", label: "💧 Face Serums" },
                    { val: "moisturizers", label: "🧴 Moisturizers" },
                    { val: "sunscreens", label: "☀️ Sunscreen fluids" },
                    { val: "face-wash", label: "🧼 Face Cleansers" },
                    { val: "acne-care", label: "🛡️ Acne treatments" },
                    { val: "anti-aging", label: "🧬 Anti-Aging series" }
                  ].map((tab) => (
                    <button
                      key={tab.val}
                      onClick={() => setActiveCollectionCategory(tab.val)}
                      className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeCollectionCategory === tab.val
                          ? "bg-brand-rosegold text-white shadow-sm"
                          : "bg-white border border-brand-beige hover:border-brand-rosegold/70 text-brand-charcoal/60"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Promotional categories Banner */}
                <div className="bg-brand-cream border border-brand-beige rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left font-sans space-y-1.5">
                    <span className="inline-block bg-brand-pink text-brand-rosegold font-bold uppercase text-[9px] px-2.5 py-1 rounded tracking-widest">Active collections deal</span>
                    <h3 className="text-lg font-serif font-bold text-brand-charcoal">Combine any face formulas, checkout with waived processing fees.</h3>
                    <p className="text-xs text-brand-charcoal/50 font-sans max-w-xl">Every bundle dispatched from Bandra West clinical boutique utilizes eco-certified protective fiber bubble wrapping to secure pipettes and glass seals.</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("shop");
                    }}
                    className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full font-bold uppercase tracking-wider text-xs shrink-0 self-start md:self-center cursor-pointer"
                  >
                    View catalog grid
                  </button>
                </div>

                {/* Filter and display category products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {PRODUCTS.filter(p => activeCollectionCategory === "all" || p.category === activeCollectionCategory).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(prod, e) => handleAddToCart(prod, 1, e)}
                      onToggleWishlist={(prod, e) => handleToggleWishlist(prod, e)}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onSelectProduct={(prod) => setSelectedProduct(prod)}
                      onQuickView={(prod, e) => {
                        e.stopPropagation();
                        setQuickViewProduct(prod);
                      }}
                      onToggleCompare={(prod, e) => handleToggleCompare(prod, e)}
                      isCompared={comparedIds.includes(product.id)}
                    />
                  ))}
                </div>

              </div>
            )}

            {/* WISHLIST TAB PAGE */}
            {activeTab === "wishlist" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <header className="border-b border-brand-beige pb-4 text-left mb-8">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-rosegold">Cabinet Registry</span>
                  <h1 className="text-2xl font-serif text-brand-charcoal font-bold mt-1">Saved Skincare Wishlist</h1>
                  <p className="text-xs text-brand-charcoal/50 font-sans mt-0.5">Toggle catalog hearts to lock active items inside this persistent cabinet book.</p>
                </header>

                {wishlistIds.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {PRODUCTS.filter(p => wishlistIds.includes(p.id)).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(prod, e) => handleAddToCart(prod, 1, e)}
                        onToggleWishlist={(prod, e) => handleToggleWishlist(prod, e)}
                        isWishlisted={true}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                        onQuickView={(prod, e) => {
                          e.stopPropagation();
                          setQuickViewProduct(prod);
                        }}
                        onToggleCompare={(prod, e) => handleToggleCompare(prod, e)}
                        isCompared={comparedIds.includes(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border border-brand-beige bg-white rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center mx-auto text-brand-rosegold">
                      <Heart className="w-8 h-8 font-light" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#2B2B2B]">Your Wishlist cabinet is empty</h3>
                    <p className="text-xs text-brand-charcoal/50 leading-relaxed font-sans">Lock your favorite Vitamin C serums, multi-ceramide moisturizers, or SPF matte fluids for easy routine tracking.</p>
                    <button
                      onClick={() => setActiveTab("shop")}
                      className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full font-bold uppercase text-xs tracking-wider hover:bg-brand-rosegold cursor-pointer"
                    >
                      Browse boutique shop
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CART & CHECKOUT PAGE TABS */}
            {activeTab === "cart" && (
              <CartCheckout
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                appliedPromo={appliedPromo}
                onApplyPromo={setAppliedPromo}
                onRegisterNewOrder={handleRegisterNewOrder}
                setActiveTab={setActiveTab}
              />
            )}

            {/* CORE DASHBOARD PAGE */}
            {activeTab === "dashboard" && (
              <Dashboard
                userEmail={userEmail}
                orderHistory={orderHistory}
                onUpdateEmail={setUserEmail}
                onLogout={handleLogout}
                setActiveTab={setActiveTab}
              />
            )}

            {/* SECONDARY PAGES PORTALS */}
            {activeTab === "about" && <AboutPage />}
            {activeTab === "journal" && <BlogPage />}
            {activeTab === "offers" && <OffersPage onApplyPromo={setAppliedPromo} appliedPromo={appliedPromo} />}
            {activeTab === "contact" && <ContactPage />}

          </>
        )}

      </main>

      {/* 3. Global Bottom Floating Products Comparison Compartment Drawer */}
      {showCompareBar && comparedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-brand-charcoal shadow-2xl p-4 sm:p-6 animate-fade-in-up max-h-[85vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Header row compare drawers */}
            <div className="flex justify-between items-center pb-4 border-b border-brand-beige mb-4">
              <div className="flex items-center space-x-2.5">
                <Scale className="w-5 h-5 text-brand-gold animate-bounce" />
                <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-[#2B2B2B]">
                  Boutique Formula Comparison ({comparedIds.length} of 3)
                </h3>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setComparedIds([])}
                  className="text-xs uppercase font-sans font-bold tracking-widest text-brand-charcoal/50 hover:text-red-500 cursor-pointer"
                >
                  Clear items
                </button>
                <button
                  onClick={() => setShowCompareBar(false)}
                  className="p-1 px-2 hover:bg-gray-100 rounded text-brand-charcoal border cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sidebar horizontal table values compare */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans text-left">
              
              {/* Table features label lines */}
              <div className="space-y-4 hidden md:block pt-32 font-bold text-brand-charcoal/40 uppercase tracking-wider">
                <p className="h-6">Vial Size</p>
                <p className="h-6">Retail Cost</p>
                <p className="h-10">Suitable Skin Type</p>
                <p className="h-24">Core Active Concentrate focus</p>
                <p className="h-10">Client Rating</p>
              </div>

              {/* Display selected products side-by-side */}
              {PRODUCTS.filter(p => comparedIds.includes(p.id)).map((p) => (
                <div key={p.id} className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl relative space-y-4">
                  <header className="flex items-center space-x-2.5">
                    <div className="w-8 h-10 bg-white p-1 rounded-md flex items-center justify-center shadow-xs">
                      <div className="scale-50">
                        <ProductSVG shapeType={p.shapeType} gradientFrom={p.gradientFrom} gradientTo={p.gradientTo} name={p.name} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-brand-charcoal truncate text-xs">{p.name}</h4>
                      <p className="text-[10px] text-brand-[#D8A47F] font-bold uppercase">{p.categoryLabel}</p>
                    </div>
                  </header>

                  {/* Comparisons attributes */}
                  <div className="space-y-4 text-brand-charcoal/80 border-t border-brand-beige/50 pt-3">
                    <p className="h-6"><strong>Size:</strong> {p.size}</p>
                    <p className="h-6"><strong>Cost:</strong> ₹{p.price}</p>
                    <p className="h-10 truncate" title={p.skinType}><strong>Match:</strong> {p.skinType}</p>
                    <p className="h-24 line-clamp-4 leading-relaxed bg-white/70 p-2 rounded-xl text-[11px] border" title={p.ingredients}><strong>Actives:</strong> {p.ingredients}</p>
                    <p className="h-10 flex items-center space-x-1 font-bold text-brand-gold">
                      <span>{p.rating}★</span>
                      <span className="text-[10px] text-brand-charcoal/40 font-normal">({p.reviewsCount} votes)</span>
                    </p>
                  </div>

                  {/* Drawer item actions panel */}
                  <div className="pt-3 border-t border-brand-beige flex gap-2">
                    <button
                      onClick={() => handleAddToCart(p, 1)}
                      className="flex-1 py-2 bg-brand-charcoal text-white rounded-lg text-[10px] uppercase font-bold tracking-wider hover:bg-brand-rosegold cursor-pointer"
                      id={`compare-to-cart-${p.id}`}
                    >
                      Cart Squeeze
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setShowCompareBar(false);
                      }}
                      className="p-2 border border-brand-rosegold text-brand-rosegold rounded-lg hover:bg-brand-rosegold hover:text-white transition-colors"
                      title="Inspect full details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* 4. Gamified Spin & Win marketing Voucher wheel popup */}
      {showSpinWheelPopup && (
        <div className="fixed inset-0 z-50 bg-brand-charcoal/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative">
            <SpinWheel
              onApplyPromo={(code) => {
                setAppliedPromo(code);
                // Hold applied code in standard cookies storage
                localStorage.setItem("glow_promo", code);
              }}
              onClose={() => setShowSpinWheelPopup(false)}
            />
          </div>
        </div>
      )}

      {/* 5. Secure Authentication Portal overlay modal drawer side */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-brand-charcoal/70 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in-up">
          <div className="bg-white border text-left border-brand-beige p-6 sm:p-8 rounded-3xl max-w-md w-full relative space-y-6">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-brand-charcoal/40 hover:bg-brand-cream/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <header className="space-y-1.5 border-b border-brand-beige pb-3">
              <div className="flex items-center space-x-1 text-brand-rosegold text-xs font-bold font-sans uppercase tracking-widest">
                <Shield className="w-4 h-4 text-brand-gold animate-pulse" />
                <span>Secured Diagnostic Cabinet</span>
              </div>
              <h2 className="text-xl font-serif text-brand-charcoal font-bold mt-1">Authenticating Skin Cabinet</h2>
              <p className="text-[11px] text-brand-charcoal/50 font-sans">Enter customer coordinates to restore pending cargo orders, diagnostics plans, and loyalty cash-backs.</p>
            </header>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-sans">
              {authStep === "username" ? (
                <div className="space-y-1.5">
                  <label className="font-bold text-brand-charcoal uppercase tracking-wider">Customer Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={authEmailInput}
                    onChange={(e) => setAuthEmailInput(e.target.value)}
                    className="w-full px-4 py-2.5 border rounded-xl outline-none focus:border-brand-rosegold bg-brand-cream/10 text-brand-charcoal font-bold text-xs"
                  />
                  <span className="text-[9px] text-[#D8A47F] block uppercase tracking-wider">✓ Automatic Free Registration For New Clients</span>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <p className="text-left font-sans text-brand-charcoal/60 leading-relaxed">A digital 4-digit security authentication pass code was sent to <strong className="text-brand-charcoal font-extrabold">{authEmailInput}</strong>. Enter code below.</p>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="9924"
                    value={authOTPInput}
                    onChange={(e) => setAuthOTPInput(e.target.value.replace(/\D/g, ''))}
                    className="px-4 py-3 border text-center rounded-xl bg-brand-cream/10 border-brand-beige font-mono font-black text-lg tracking-[0.45em] w-36 mx-auto block focus:border-brand-rosegold text-brand-charcoal"
                  />
                  <p className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-widest mt-2">Simulate OTP: 9924</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 text-center cursor-pointer bg-brand-charcoal text-white font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-brand-rosegold transition-colors shadow-md"
                id="sumbit-auth-credentials-btn"
              >
                {authStep === "username" ? "Send Security OTP code" : "Restore account cabinet portal"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Dynamic Quick View Modal overlays */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-brand-charcoal/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border text-left border-brand-beige p-6 rounded-3xl max-w-xl w-full relative space-y-6 animate-fade-in-up">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-brand-charcoal/40 hover:bg-brand-cream/40 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square bg-gradient-to-tr from-brand-ivory to-brand-beige border rounded-2xl flex items-center justify-center relative overflow-hidden">
                <ProductSVG shapeType={quickViewProduct.shapeType} gradientFrom={quickViewProduct.gradientFrom} gradientTo={quickViewProduct.gradientTo} name={quickViewProduct.name} />
              </div>

              <div className="space-y-4">
                <div className="font-sans">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-rosegold">{quickViewProduct.categoryLabel}</span>
                  <h3 className="text-base font-serif font-bold text-brand-charcoal leading-snug mt-0.5">{quickViewProduct.name}</h3>
                </div>

                <p className="text-brand-charcoal/70 text-xs font-sans line-clamp-4 leading-relaxed">{quickViewProduct.description}</p>
                
                <div className="font-sans">
                  <span className="text-brand-charcoal font-bold text-base">₹{quickViewProduct.price}</span>
                  {quickViewProduct.originalPrice && <span className="text-brand-charcoal/40 line-through text-xs ml-2">₹{quickViewProduct.originalPrice}</span>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-grow py-2.5 bg-brand-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-rosegold cursor-pointer"
                  >
                    Squeeze to bag
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="px-4 py-2.5 border border-brand-rosegold text-brand-rosegold rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-cream/20 cursor-pointer"
                  >
                    Specs
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 7. Unified Premium Brand Footer */}
      <footer className="bg-brand-charcoal text-white pt-16 pb-8 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Col 1 Brand values */}
          <div className="space-y-4">
            <div className="text-xl font-serif tracking-tight select-none font-bold text-white">
              Natural <span className="italic text-brand-rosegold">Glow</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-sans mt-2">
               Premium, clean skincare formulas formed in Bandra West labs. Free from petro-fillers, SLS, or synthetic color additives. Highly focused on skin ecology.
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-rosegold transition-colors"><Instagram className="w-4 h-4 text-white" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-rosegold transition-colors"><Twitter className="w-4 h-4 text-white" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-brand-rosegold transition-colors"><MessageSquare className="w-4 h-4 text-white" /></a>
            </div>
          </div>

          {/* Col 2 Shop Links */}
          <div className="space-y-4 font-sans text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D8A47F]">Formulation Lines</h4>
            <ul className="space-y-2.5 text-white/60">
              {["Face Serums", "Moisturizers", "Sunscreens", "Face Washes", "Acne care", "Anti-Aging"].map((line, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => {
                      const cats = ["serums", "moisturizers", "sunscreens", "face-wash", "acne-care", "anti-aging"];
                      setActiveCollectionCategory(cats[idx]);
                      setActiveTab("collections");
                      setSelectedProduct(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-brand-rosegold transition-colors text-left"
                  >
                    {line}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 Corporate links */}
          <div className="space-y-4 font-sans text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D8A47F]">Corporation Portal</h4>
            <ul className="space-y-2.5 text-white/60">
              <li><button onClick={() => { setActiveTab("about"); setSelectedProduct(null); }} className="hover:text-brand-rosegold transition-colors">Our Lab Story</button></li>
              <li><button onClick={() => { setActiveTab("journal"); setSelectedProduct(null); }} className="hover:text-brand-rosegold transition-colors">Botanical Journal</button></li>
              <li><button onClick={() => { setActiveTab("offers"); setSelectedProduct(null); }} className="hover:text-brand-rosegold transition-colors">Active Vouchers</button></li>
              <li><button onClick={() => { setActiveTab("contact"); setSelectedProduct(null); }} className="hover:text-brand-rosegold transition-colors">Experts Consultation</button></li>
              <li><button onClick={() => { setActiveTab("dashboard"); setSelectedProduct(null); }} className="hover:text-brand-rosegold transition-colors">Core Cabin cabinet</button></li>
            </ul>
          </div>

          {/* Col 4 Safety seals */}
          <div className="space-y-4 font-sans text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D8A47F]">Laboratory Badging</h4>
            <div className="space-y-2 text-white/60">
              <p className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D8A47F]"></span><span>Dermatologically Certified</span></p>
              <p className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D8A47F]"></span><span>Cruelty-Free & 100% Vegan</span></p>
              <p className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D8A47F]"></span><span>SLS & Paraben Free</span></p>
              <p className="flex items-center space-x-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D8A47F]"></span><span>Moisture Cooler Dispatched</span></p>
            </div>
            
            <button 
              onClick={() => setShowSpinWheelPopup(true)}
              className="mt-2 w-full py-2 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1 hover:scale-105 transition-transform"
              id="footer-spin-club-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Spin & Win Club</span>
            </button>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-white/5 text-center text-[10px] text-white/40 font-sans flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 Natural Glow Skincare Inc. Formulation laboratories. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Chemical Safety Statements</a>
            <a href="#" className="hover:text-white transition-colors">Returns Insurance Regulations</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Dermal Logs</a>
          </div>
        </div>
      </footer>

      {/* Persistent AI Skincare Chatbot */}
      <SkincareChatbot 
        onSelectProduct={setSelectedProduct} 
        onAddToCart={handleAddToCart} 
        setActiveTab={setActiveTab} 
      />

    </div>
  );
}
