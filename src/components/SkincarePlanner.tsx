import { useState } from "react";
import { Sparkles, Sun, Moon, ArrowRight, CheckCircle, Flame, Plus, ShieldCheck } from "lucide-react";
import { Product, PRODUCTS } from "../products";
import { ProductSVG } from "./ProductCard";

interface SkincarePlannerProps {
  onAddBundleToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

type SkinType = "dry" | "oily" | "sensitive" | "combination" | "dehydrated";
type SkinConcern = "acne" | "aging" | "dullness" | "pores";
type RoutineVolume = "minimalist" | "complete" | "ultimate";

export default function SkincarePlanner({ onAddBundleToCart, onSelectProduct }: SkincarePlannerProps) {
  const [skinType, setSkinType] = useState<SkinType>("dry");
  const [concern, setConcern] = useState<SkinConcern>("dullness");
  const [volume, setVolume] = useState<RoutineVolume>("complete");
  const [isCalculated, setIsCalculated] = useState(false);
  const [routineResults, setRoutineResults] = useState<{
    morning: Product[];
    evening: Product[];
    allUnique: Product[];
    totalOriginalPrice: number;
    totalDiscountedPrice: number;
  } | null>(null);

  // Core Algorithmic Routine Formulator
  const handleFormulate = () => {
    // 1. Identify best matches
    const pool = [...PRODUCTS];
    let morningItems: Product[] = [];
    let eveningItems: Product[] = [];

    // Always start with a gentle cleanse
    const cleanser = pool.find((p) => p.id === "gentle-foaming-cleanser") || pool[5];
    // Always load moisturizers and SPF
    const moisturizer = pool.find((p) => p.id === "daily-glow-moisturizer") || pool[3];
    const sunscreen = pool.find((p) => p.id === "ultra-shield-sunscreen") || pool[4];

    // Pick active treatment serum based on concern
    let primaryTreatment = pool.find((p) => p.id === "vit-c-serum")!; // Dullness default
    if (concern === "acne") {
      primaryTreatment = pool.find((p) => p.id === "salicylic-acne-care") || pool[6];
    } else if (concern === "aging") {
      primaryTreatment = pool.find((p) => p.id === "retinol-anti-aging") || pool[7];
    } else if (concern === "pores") {
      primaryTreatment = pool.find((p) => p.id === "niacinamide-serum") || pool[2];
    }

    // Pick supporting secondary hydrating serum
    const hydratingSerum = pool.find((p) => p.id === "hyaluronic-serum")!;

    if (volume === "minimalist") {
      // Cleanse, Active Treatment, Sunscreen
      morningItems = [cleanser, sunscreen];
      eveningItems = [cleanser, primaryTreatment, moisturizer];
    } else if (volume === "complete") {
      morningItems = [cleanser, hydratingSerum, sunscreen];
      eveningItems = [cleanser, primaryTreatment, moisturizer];
    } else {
      // Ultimate volume
      morningItems = [cleanser, hydratingSerum, sunscreen];
      // Include both primary concern active serum + general healing moisturizer
      eveningItems = [cleanser, hydratingSerum, primaryTreatment, moisturizer];
    }

    // Eliminate duplicates to obtain unique product listing
    const allUnique = Array.from(new Set([...morningItems, ...eveningItems]));

    // Pricing calculation
    const totalOriginalPrice = allUnique.reduce((acc, curr) => acc + curr.price, 0);
    // Apply special 15% catalog Routine Discount
    const totalDiscountedPrice = Math.round(totalOriginalPrice * 0.85);

    setRoutineResults({
      morning: morningItems,
      evening: eveningItems,
      allUnique,
      totalOriginalPrice,
      totalDiscountedPrice
    });
    setIsCalculated(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-beige overflow-hidden max-w-5xl mx-auto my-8 shadow-xl">
      <div className="p-6 md:p-10 bg-gradient-to-br from-brand-ivory via-brand-cream/10 to-brand-beige/50 text-left border-b border-brand-beige">
        <div className="flex items-center space-x-2.5 text-brand-rosegold mb-3">
          <Sparkles className="w-5 h-5 text-brand-gold animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold">Scientific Diagnostics</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal font-bold">
          Virtual Botanical Routine Builder
        </h2>
        <p className="text-brand-charcoal/70 text-xs sm:text-sm font-sans mt-1 max-w-2xl leading-relaxed">
          Input your biological skin configurations to get a customized, dermatologically balanced skincare timeline designed to trigger deep cell repair, safe hydration layers, and radiant moisture levels.
        </p>
      </div>

      <div className="p-6 md:p-10 text-left">
        {/* Step inputs */}
        {!isCalculated ? (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Skin type selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-sans tracking-widest font-bold text-brand-charcoal">
                1. What is your primary Skin Type?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(["dry", "oily", "sensitive", "combination", "dehydrated"] as SkinType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSkinType(type)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold uppercase transition-luxury border cursor-pointer text-center ${
                      skinType === type
                        ? "bg-brand-rosegold text-white border-brand-rosegold shadow-md"
                        : "bg-white text-brand-charcoal/70 border-brand-beige hover:border-brand-rosegold/50"
                    }`}
                  >
                    {type === "dry" && "🏜️ Dry"}
                    {type === "oily" && "✨ Oily"}
                    {type === "sensitive" && "🛡️ Sensitive"}
                    {type === "combination" && "⚖️ Combination"}
                    {type === "dehydrated" && "💧 Dehydrated"}
                  </button>
                ))}
              </div>
            </div>

            {/* Concern selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-sans tracking-widest font-bold text-brand-charcoal">
                2. What is your principal skin concern or objective?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["dullness", "acne", "aging", "pores"] as SkinConcern[]).map((conc) => (
                  <button
                    key={conc}
                    onClick={() => setConcern(conc)}
                    className={`py-3.5 px-3 rounded-2xl text-xs font-bold uppercase transition-luxury border cursor-pointer text-center ${
                      concern === conc
                        ? "bg-brand-rosegold text-white border-brand-rosegold shadow-md"
                        : "bg-white text-brand-charcoal/70 border-brand-beige hover:border-brand-rosegold/50"
                    }`}
                  >
                    {conc === "dullness" && "🌟 Dull Spot Brightening"}
                    {conc === "acne" && "💥 Active Acne Cleanse"}
                    {conc === "aging" && "🧬 Fine Wrinkle Renewal"}
                    {conc === "pores" && "🔬 Pore Shrinkage Control"}
                  </button>
                ))}
              </div>
            </div>

            {/* Routine complexity volume */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-sans tracking-widest font-bold text-brand-charcoal">
                3. Choose your daily routine volume:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "minimalist", label: "Minimalist Routine", desc: "2-Step fundamental layers. Focuses on gentle cleanse and primary treatment." },
                  { id: "complete", label: "Optimal Complete Routine", desc: "3-Step core routine. Adds hydration boosters to shield skin barriers completely." },
                  { id: "ultimate", label: "Ultimate Glow Special", desc: "4-Step professional routine. Fully optimizes brightness, barrier lipids, and deep line serums." }
                ].map((vol) => (
                  <div
                    key={vol.id}
                    onClick={() => setVolume(vol.id as RoutineVolume)}
                    className={`p-4 rounded-3xl border-2 cursor-pointer transition-luxury flex flex-col justify-between text-left ${
                      volume === vol.id
                        ? "bg-brand-cream/30 border-brand-rosegold shadow-sm"
                        : "bg-white border-brand-beige hover:border-brand-rosegold/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">{vol.label}</span>
                        <input
                          type="radio"
                          checked={volume === vol.id}
                          readOnly
                          className="text-brand-rosegold focus:ring-brand-rosegold h-3.5 w-3.5"
                        />
                      </div>
                      <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-sans">{vol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Formulation button */}
            <div className="pt-4 text-center">
              <button
                onClick={handleFormulate}
                className="px-10 py-4 cursor-pointer font-sans font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-brand-rosegold to-brand-gold rounded-full shadow-lg shadow-brand-rosegold/20 hover:shadow-brand-rosegold/40 transition-luxury inline-flex items-center space-x-2"
                id="formulate-submit-btn"
              >
                <span>Formulate Botanical Regiment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* Render outputs timelines */
          <div className="space-y-8 animate-fade-in-up">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Morning Timeline Column */}
              <div className="bg-brand-ivory border border-brand-beige p-6 rounded-3xl space-y-4">
                <div className="flex items-center space-x-2 text-brand-gold font-sans font-semibold mb-2">
                  <Sun className="w-5 h-5 text-brand-gold animate-bounce" />
                  <span className="text-xs uppercase tracking-widest">Morning Protection timeline</span>
                </div>
                
                {routineResults?.morning.map((product, idx) => (
                  <div 
                    key={`${product.id}-am-${idx}`}
                    className="p-3.5 bg-white border border-brand-beige/50 rounded-2xl flex items-center justify-between hover:border-brand-rosegold/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-brand-pink text-brand-rosegold flex items-center justify-center font-sans font-bold text-xs">
                        {idx + 1}
                      </span>
                      <div className="text-left font-sans">
                        <h4 className="text-xs font-bold text-brand-charcoal hover:text-brand-rosegold cursor-pointer" onClick={() => onSelectProduct(product)}>
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-brand-charcoal/40 font-semibold">{product.categoryLabel}</p>
                      </div>
                    </div>
                    {/* Tiny micro thumbnail */}
                    <div className="w-8 h-8 rounded-full bg-brand-cream/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="scale-50">
                          <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Evening Timeline Column */}
              <div className="bg-brand-charcoal text-white p-6 rounded-3xl space-y-4">
                <div className="flex items-center space-x-2 text-brand-pink font-sans font-semibold mb-2">
                  <Moon className="w-5 h-5 text-brand-pink animate-pulse" />
                  <span className="text-xs uppercase tracking-widest">Evening Cellular Repair timeline</span>
                </div>

                {routineResults?.evening.map((product, idx) => (
                  <div 
                    key={`${product.id}-pm-${idx}`}
                    className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center font-sans font-bold text-xs">
                        {idx + 1}
                      </span>
                      <div className="font-sans">
                        <h4 className="text-xs font-bold text-white hover:text-brand-rosegold cursor-pointer" onClick={() => onSelectProduct(product)}>
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-white/40 font-semibold">{product.categoryLabel}</p>
                      </div>
                    </div>
                    {/* Tiny micro thumbnail */}
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="scale-50">
                          <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Special Promotion Purchase Drawer */}
            <div className="bg-brand-cream/20 border border-brand-rosegold/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left font-sans">
                <span className="inline-block bg-[#F8D7DA] text-brand-rosegold font-sans font-bold text-[9px] px-2.5 py-1 roundeduppercase tracking-widest mb-2">
                  🎁 Premium Bundle Promotion
                </span>
                <h3 className="text-base font-serif font-bold text-brand-charcoal">
                  Collect Entire Routine (Save Flat 15%)
                </h3>
                <p className="text-brand-charcoal/60 text-xs mt-1 max-w-xl">
                  Add all unique products featured in your tailored morning and evening skincare timeline under a special package discount.
                </p>
                
                <div className="flex items-center space-x-4 mt-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Dermatologically Certified</span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right space-y-3 flex-shrink-0">
                <div className="font-sans">
                  <div className="flex items-baseline md:justify-end space-x-2">
                    <span className="text-brand-charcoal text-2xl font-bold">₹{routineResults?.totalDiscountedPrice}</span>
                    <span className="text-brand-charcoal/40 line-through text-xs">₹{routineResults?.totalOriginalPrice}</span>
                  </div>
                  <p className="text-[10px] text-green-600 font-bold uppercase mt-0.5">You Save ₹{Math.round((routineResults?.totalOriginalPrice || 0) - (routineResults?.totalDiscountedPrice || 0))}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsCalculated(false);
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-brand-rosegold border border-brand-rosegold rounded-full hover:bg-brand-cream/30 cursor-pointer"
                  >
                    Re-Diagnose
                  </button>
                  <button
                    onClick={() => {
                      if (routineResults?.allUnique) {
                        onAddBundleToCart(routineResults.allUnique);
                      }
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-luxury cursor-pointer shadow-md"
                    id="add-bundle-cart-btn"
                  >
                    Add Complete Routine (Save 15%)
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
