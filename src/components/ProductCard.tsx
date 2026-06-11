import React from "react";
import { Heart, Star, Sparkles, Check, ShoppingCart, Eye } from "lucide-react";
import { Product } from "../products";

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
  onToggleCompare: (product: Product, e: React.MouseEvent) => void;
  isCompared: boolean;
}

// Custom pure SVG component rendering luxury packaging mockups
export function ProductSVG({ shapeType, gradientFrom, gradientTo, name }: { shapeType: string; gradientFrom: string; gradientTo: string; name: string }) {
  const gradId = `grad-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <svg viewBox="0 0 100 120" className="w-[80px] h-[100px] drop-shadow-xl overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>
      </defs>

      {shapeType === "dropper" && (
        <g>
          {/* Squeeze bulb topper */}
          <path d="M42,10 c0,-6 16,-6 16,0 z" fill="#FFFDF9" stroke="#E4E3E0" strokeWidth="0.5" />
          {/* Gold neck cap */}
          <rect x="42" y="10" width="16" height="8" rx="1.5" fill="#C9A227" />
          <line x1="42" y1="14" x2="58" y2="14" stroke="#FFF" strokeWidth="0.5" />
          
          {/* Glass body vial */}
          <path d="M30,18 h40 v60 a12,12 0 0,1 -12,12 h-16 a12,12 0 0,1 -12,-12 z" fill={`url(#${gradId})`} opacity="0.9" />
          {/* Luxury Label wrapper */}
          <rect x="34" y="28" width="32" height="36" rx="2" fill="#FFFDF9" opacity="0.94" stroke="#D8A47F" strokeWidth="0.5" />
          <circle cx="50" cy="46" r="5" fill="#D8A47F" opacity="0.8" />
          <rect x="38" y="56" width="24" height="2" fill="#2B2B2B" opacity="0.7" />
          
          {/* Serum liquid level shine */}
          <path d="M31,54 C35,52 65,58 69,54 V78 a11,11 0 0,1 -11,11 h-16 a11,11 0 0,1 -11,-11 z" fill="#FFF" opacity="0.15" />
        </g>
      )}

      {shapeType === "jar" && (
        <g>
          {/* Shiny gold lid */}
          <rect x="25" y="28" width="50" height="10" rx="3" fill="#C9A227" />
          <line x1="25" y1="33" x2="75" y2="33" stroke="#FFF" strokeWidth="0.5" />

          {/* Frosted cream jar container */}
          <path d="M28,38 h44 v36 a14,14 0 0,1 -14,14 h-16 a14,14 0 0,1 -14,-14 z" fill={`url(#${gradId})`} opacity="0.9" />
          {/* Centered ivory sticker label */}
          <rect x="34" y="44" width="32" height="28" rx="1" fill="#FFFDF9" opacity="0.96" stroke="#2B2B2B" strokeWidth="0.3" />
          <text x="50" y="54" fontSize="5" fontFamily="serif" textAnchor="middle" fill="#2B2B2B">GLOW</text>
          <line x1="38" y1="60" x2="62" y2="60" stroke="#D8A47F" strokeWidth="0.5" />
        </g>
      )}

      {shapeType === "tube" && (
        <g>
          {/* Hex screw-on bottom cap */}
          <rect x="42" y="82" width="16" height="8" rx="1.5" fill="#2B2B2B" />

          {/* Squeezable sunscreen tube body */}
          <path d="M30,12 h40 c-2,20 -4,50 -12,70 H42 C34,62 32,32 30,12 z" fill={`url(#${gradId})`} opacity="0.95" />
          {/* Slanted crimp sealer top */}
          <line x1="30" y1="12" x2="70" y2="12" stroke="#FFF" strokeWidth="2" opacity="0.8" />
          
          {/* Label text strip */}
          <rect x="35" y="28" width="30" height="32" fill="#FFFDF9" opacity="0.9" rx="2" />
          <rect x="40" y="32" width="20" height="2" fill="#C9A227" />
          <circle cx="50" cy="46" r="4" fill="#F8D7DA" />
        </g>
      )}

      {shapeType === "pump" && (
        <g>
          {/* Slim dispenser nozzle pump head */}
          <path d="M46,12 c0,-4 3,-5 6,-5 h4 v4 h-4 v8 h-6 z" fill="#FFFDF9" stroke="#E4E3E0" strokeWidth="0.5" />
          {/* Topper actuator segment */}
          <rect x="42" y="15" width="16" height="10" fill="#C9A227" />
          
          {/* Tall cylindrical pump bottle body */}
          <rect x="32" y="25" width="36" height="65" rx="6" fill={`url(#${gradId})`} opacity="0.92" />
          <rect x="36" y="34" width="28" height="38" rx="2" fill="#FFFDF9" opacity="0.95" stroke="#D8A47F" strokeWidth="0.4" />
          {/* Minimalist layout logo */}
          <line x1="42" y1="46" x2="58" y2="46" stroke="#2B2B2B" strokeWidth="0.5" />
          <circle cx="50" cy="56" r="3" fill="#C9A227" />
        </g>
      )}
    </svg>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onQuickView,
  onToggleCompare,
  isCompared
}: ProductCardProps) {
  // Compute percentage discount
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-brand-beige overflow-hidden hover:shadow-xl hover:border-brand-rosegold/30 transition-luxury flex flex-col h-full relative">
      {/* Top Tag badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2.5 items-start">
        {product.tag && (
          <span className="bg-brand-rosegold text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {product.tag}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-brand-gold text-white text-[9px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {discountPercent}% Off
          </span>
        )}
      </div>

      {/* Heart Wishlist Icon Bubble */}
      <button
        onClick={(e) => onToggleWishlist(product, e)}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-brand-beige/50 hover:bg-white text-brand-charcoal/40 hover:text-brand-rosegold transition-luxury shadow-md cursor-pointer"
        title="Add to Wishlist"
        id={`wish-btn-${product.id}`}
      >
        <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${isWishlisted ? "fill-brand-rosegold text-brand-rosegold" : ""}`} />
      </button>

      {/* Product Image Stage container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="aspect-[4/5] bg-gradient-to-tr from-brand-beige/10 via-brand-pink/5 to-brand-cream/10 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer p-6"
      >
        <div className={`absolute bottom-3 right-3 p-1 rounded-full ${product.bgDecorative} opacity-20 w-36 h-36 rounded-full blur-xl pointer-events-none`}></div>
        
        {/* Customized SVG Bottle Renderer */}
        <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />

        {/* Hover quick action overlay drawer bottom */}
        <div className="absolute inset-0 bg-brand-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 space-x-2">
          {/* Quick View Button */}
          <button
            onClick={(e) => onQuickView(product, e)}
            className="flex items-center space-x-1 bg-white text-brand-charcoal hover:bg-brand-cream hover:text-brand-rosegold text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-full shadow-lg transition-luxury translate-y-2 group-hover:translate-y-0 cursor-pointer"
            id={`quick-v-btn-${product.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick Secrets</span>
          </button>
        </div>
      </div>

      {/* Product Information Detail */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Subheader and comparison checkboxes */}
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-charcoal/40 mb-1.5 font-sans">
            <span>{product.categoryLabel} • {product.size}</span>
            
            {/* Compare Checkbox Toggles */}
            <label 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={isCompared}
                onChange={(e) => onToggleCompare(product, e as any)}
                className="rounded border-brand-beige text-brand-rosegold focus:ring-brand-rosegold h-3 w-3 transition-colors"
                id={`compare-check-${product.id}`}
              />
              <span className="text-[9px] tracking-tighter uppercase font-bold text-brand-charcoal/50 hover:text-brand-rosegold">Compare</span>
            </label>
          </div>

          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif font-bold text-[15px] leading-snug text-brand-charcoal hover:text-brand-rosegold transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Dynamic Star Ratings */}
          <div className="flex items-center mt-2.5">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-brand-gold" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-sans text-brand-charcoal/70 ml-2 font-medium">
              {product.rating} ({product.reviewsCount} reviews)
            </span>
          </div>

          <p className="text-brand-charcoal/70 text-xs font-sans mt-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Cart Add row */}
        <div className="mt-5 pt-4 border-t border-brand-beige/50 flex items-center justify-between">
          <div className="font-sans">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-brand-charcoal font-bold text-base">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-brand-charcoal/40 line-through text-xs font-normal">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-green-600 font-medium">VAT / Tax Included</span>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className="p-3 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white rounded-full hover:scale-105 transition-luxury active:scale-95 shadow-md shadow-brand-rosegold/10 cursor-pointer flex items-center justify-center hover:shadow-brand-rosegold/30"
            title="Instant Add To Cart"
            id={`cart-add-btn-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
