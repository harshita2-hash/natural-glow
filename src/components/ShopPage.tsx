import React, { useState, useMemo } from "react";
import { Search, Star, Sparkles, Filter, Shuffle, ArrowRight, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { Product, PRODUCTS } from "../products";
import ProductCard from "./ProductCard";

interface ShopPageProps {
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
  onToggleCompare: (product: Product, e: React.MouseEvent) => void;
  comparedIds: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type CategoryType = "all" | "serums" | "moisturizers" | "sunscreens" | "face-wash" | "acne-care" | "anti-aging";
type SkinTypeFilter = "all" | "Dry" | "Oily" | "Sensitive" | "Combination" | "Dehydrated";
type SortOption = "newest" | "best-selling" | "price-asc" | "price-desc" | "highest-rated";

export default function ShopPage({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
  onQuickView,
  onToggleCompare,
  comparedIds,
  searchQuery,
  setSearchQuery
}: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [activeSkinType, setActiveSkinType] = useState<SkinTypeFilter>("all");
  const [maxPrice, setMaxPrice] = useState<number>(1800);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("all");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Dynamic values extraction for filters
  const ingredientOptions = ["all", "Vitamin C", "Hyaluronic Acid", "Niacinamide", "Centella", "Salicylic Acid", "Retinol", "Ceramide"];

  const categories = [
    { value: "all", label: "✨ All Botanical Lines" },
    { value: "serums", label: "💧 Face Serums" },
    { value: "moisturizers", label: "🧴 Moisturizers" },
    { value: "sunscreens", label: "☀️ Sunscreen Fluids" },
    { value: "face-wash", label: "🧼 Purifying Washes" },
    { value: "acne-care", label: "🛡️ Acne Exfoliants" },
    { value: "anti-aging", label: "🧬 Cell Anti-Aging" },
  ];

  // Filtering calculations
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredient = product.ingredients.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesIngredient) return false;
      }

      // 2. Category Block
      if (activeCategory !== "all" && product.category !== activeCategory) return false;

      // 3. Skin Type matcher
      if (activeSkinType !== "all") {
        if (!product.skinType.toLowerCase().includes(activeSkinType.toLowerCase())) return false;
      }

      // 4. Max Price slider
      if (product.price > maxPrice) return false;

      // 5. Star ratings
      if (product.rating < minRating) return false;

      // 6. Ingredient tags
      if (selectedIngredient !== "all") {
        if (!product.ingredients.toLowerCase().includes(selectedIngredient.toLowerCase())) return false;
      }

      // 7. Stock availability
      if (onlyInStock && product.stockStatus === "out-of-stock") return false;

      return true;
    }).sort((a, b) => {
      // Sorting Options
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "highest-rated") return b.rating - a.rating;
      
      // Best Selling or default
      if (sortOption === "best-selling") return b.reviewsCount - a.reviewsCount;
      
      // Newest (just reverse ID list order or ratings)
      return b.id.localeCompare(a.id);
    });
  }, [searchQuery, activeCategory, activeSkinType, maxPrice, minRating, selectedIngredient, onlyInStock, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveSkinType("all");
    setMaxPrice(1800);
    setMinRating(0);
    setSelectedIngredient("all");
    setOnlyInStock(false);
    setSortOption("best-selling");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up text-left">
      
      {/* Category banner header row with premium tags */}
      <section className="bg-gradient-to-r from-brand-beige/50 via-brand-pink/20 to-brand-cream/40 p-6 md:p-8 rounded-3xl border border-brand-beige mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left font-sans">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#D8A47F] mb-1.5 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Organic Pharmacological Science</span>
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-brand-charcoal font-bold">
            {activeCategory === "all" ? "Natural Glow Complete Collection" : categories.find(c => c.value === activeCategory)?.label.split(" ").slice(1).join(" ")}
          </h1>
          <p className="text-[11px] sm:text-xs text-brand-charcoal/60 mt-1 max-w-xl">
            Clean dermal treatments, free from petrochemical elements, silicones, or synthetic odor stabilizers. Rebuilt to stimulate optimal natural cell collagen.
          </p>
        </div>

        {/* Promo text box right */}
        <div className="bg-white/80 p-4 rounded-2xl border border-brand-beige/60 text-center w-full md:w-56 flex-shrink-0 shadow-xs">
          <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold">Active Promo</span>
          <p className="text-xs font-bold text-brand-charcoal mt-0.5">₹99 Delivery Waived</p>
          <span className="text-[10px] text-brand-charcoal/40 block mt-1">Automatic across all catalog packages!</span>
        </div>
      </section>

      {/* Sorting, filtering control panel for mobile & desktop */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-beige/60">
        
        {/* Sorting option select */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="lg:hidden flex items-center space-x-1.5 px-4 py-2 bg-white border border-brand-beige text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-orange-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-brand-rosegold" />
            <span>Refine Drawer</span>
          </button>

          <span className="text-xs text-brand-charcoal/40 font-bold uppercase tracking-widest font-sans hidden sm:inline">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="px-4 py-2 rounded-full border border-brand-beige text-xs bg-white text-brand-charcoal hover:border-brand-rosegold/50 outline-none cursor-pointer font-sans"
          >
            <option value="best-selling">🔥 Popularity & Best Sellers</option>
            <option value="newest">✨ Botanical Fresh Arrivals</option>
            <option value="price-asc">📈 Price: Low to High</option>
            <option value="price-desc">📉 Price: High to Low</option>
            <option value="highest-rated">⭐ Highest Customer Score</option>
          </select>
          
          <button 
            onClick={resetFilters}
            className="p-2 rounded-full hover:bg-brand-cream/40 border border-brand-beige bg-white text-brand-charcoal/50 hover:text-brand-rosegold title='Reset Settings'"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic products matches statistics counters */}
        <div className="text-xs text-brand-charcoal/60 font-sans font-medium text-right self-end lg:self-center">
          Delivering <span className="font-bold text-brand-rosegold">{filteredProducts.length}</span> luxury skin compounds of <span className="font-bold">{PRODUCTS.length} total</span>
        </div>
      </div>

      {/* Main catalog workspace workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Lateral Filter sidebar panel */}
        <aside className={`lg:block ${showFiltersMobile ? "block" : "hidden"} bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl border border-brand-beige lg:border-transparent space-y-6 lg:sticky lg:top-36`}>
          
          {/* Categories Selector */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-charcoal pb-1 border-b border-brand-beige">
              Serum Classes
            </h4>
            <div className="flex flex-col space-y-2 text-xs font-sans">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value as CategoryType)}
                  className={`text-left py-1.5 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-brand-pink text-brand-rosegold font-bold"
                      : "text-brand-charcoal/70 hover:bg-brand-cream/30 hover:text-brand-charcoal"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skin concern matcher selections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-charcoal pb-1 border-b border-brand-beige">
              Bio Skin Type
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["all", "Dry", "Oily", "Sensitive", "Combination", "Dehydrated"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveSkinType(type as SkinTypeFilter)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    activeSkinType === type
                      ? "bg-brand-charcoal text-white border-brand-charcoal"
                      : "bg-white text-brand-charcoal/70 border-brand-beige hover:border-brand-rosegold"
                  }`}
                >
                  {type === "all" ? "All match" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Maximizer range slider setting */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest text-brand-charcoal pb-1 border-b border-brand-beige">
              <span>Budget Cap</span>
              <span className="text-brand-rosegold font-sans font-extrabold text-[13px]">₹{maxPrice}</span>
            </div>
            <div className="pt-2 font-sans">
              <input
                type="range"
                min="500"
                max="1800"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-brand-beige rounded-lg appearance-none cursor-pointer accent-brand-rosegold"
              />
              <div className="flex justify-between text-[10px] text-brand-charcoal/40 font-bold uppercase mt-1">
                <span>₹500 min</span>
                <span>₹1,800 max</span>
              </div>
            </div>
          </div>

          {/* Key Activator elements dropdown filters */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-charcoal pb-1 border-b border-[#F4EDE4]">
              Active Ingredient Match
            </h4>
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl bg-white border-brand-beige text-xs text-brand-charcoal/80 outline-none cursor-pointer font-sans"
            >
              <option value="all">🔬 Any natural compound</option>
              {ingredientOptions.filter(i => i !== "all").map((ingred) => (
                <option key={ingred} value={ingred}>{ingred} concentrates</option>
              ))}
            </select>
          </div>

          {/* Ratings selections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-brand-charcoal pb-1 border-b border-brand-beige">
              Review rating floor
            </h4>
            <div className="flex space-x-1 justify-between">
              {[0, 3, 4, 4.5, 4.8].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`px-2 py-1.5 border hover:border-brand-rosegold transition-all text-[11px] font-sans font-bold uppercase rounded-lg cursor-pointer flex-1 text-center ${
                    minRating === stars ? "bg-brand-pink text-brand-rosegold border-brand-rosegold" : "bg-white border-brand-beige text-brand-charcoal/50"
                  }`}
                  title={`${stars} rating floor`}
                >
                  {stars === 0 ? "Any score" : `${stars}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* Stock toggle checkbox */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center space-x-2.5 text-xs font-sans text-brand-charcoal/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-brand-beige text-brand-rosegold focus:ring-brand-rosegold h-4 w-4"
              />
              <span className="font-bold">Display active in-stock only</span>
            </label>
          </div>

        </aside>

        {/* Dynamic products display grid col */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(prod, e) => onAddToCart(prod, e)}
                  onToggleWishlist={(prod, e) => onToggleWishlist(prod, e)}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onSelectProduct={(prod) => onSelectProduct(prod)}
                  onQuickView={(prod, e) => onQuickView(prod, e)}
                  onToggleCompare={(prod, e) => onToggleCompare(prod, e)}
                  isCompared={comparedIds.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty state feedback message */
            <div className="bg-white border border-brand-beige rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 font-sans shadow-xs">
              <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center mx-auto text-brand-rosegold">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-brand-charcoal">
                No matching botanical formulations
              </h3>
              <p className="text-xs text-brand-charcoal/50">
                Our clinical laboratory hasn't formatted any beauty routines matching your checked sidebar requirements. Try scaling down your price cap slider or resetting filters to restart diagnostics.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-rosegold transition-colors cursor-pointer"
              >
                Clear Settings
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
