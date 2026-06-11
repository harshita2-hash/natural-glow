import React, { useState } from "react";
import { Star, Heart, ShoppingCart, ShieldAlert, Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, RotateCw, CheckCircle, ThumbsUp, ArrowLeft } from "lucide-react";
import { Product, PRODUCTS } from "../products";
import { ProductSVG } from "./ProductCard";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onBackToShop,
  onSelectProduct
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "how-to-use" | "clinical">("details");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [is360Active, setIs360Active] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 deg
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviewedProductAnswers, setReviewedProductAnswers] = useState<Record<string, number>>({});

  // Filter 3 related upsell products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // If no same-category matches, get any first 3 products
  const displayRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle simulated Helpful voting
  const handleHelpfulVote = (reviewId: string) => {
    if (reviewedProductAnswers[reviewId]) return;
    setReviewedProductAnswers(prev => ({ ...prev, [reviewId]: 1 }));
  };

  // Generate fake review stars percentage indicators
  const ratingSpread = {
    "5 Stars": "88%",
    "4 Stars": "9%",
    "3 Stars": "2%",
    "2 Stars": "1%",
    "1 Star": "0%"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* Back breadcrumbs navigation button */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-brand-rosegold hover:text-brand-gold transition-colors"
          id="detail-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to skincare shop</span>
        </button>
        <span className="text-xs text-brand-charcoal/50 font-medium">
          Home • Catalog • {product.categoryLabel} • {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Product interactive galleries and rotation tools */}
        <div className="space-y-6">
          <div className="relative border border-brand-beige rounded-3xl bg-gradient-to-tr from-brand-ivory to-brand-beige flex items-center justify-center p-8 overflow-hidden aspect-[4/5]">
            
            {/* Absolute Badging */}
            {product.tag && (
              <span className="absolute top-6 left-6 bg-brand-charcoal text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-md">
                {product.tag}
              </span>
            )}

            {/* Standard static detail vs 360 degree dynamic visualizer toggler */}
            <div className="absolute top-6 right-6 z-10 flex space-x-2">
              <button
                onClick={() => setIs360Active(false)}
                className={`p-2.5 rounded-full border shadow-md transition-luxury cursor-pointer ${
                  !is360Active 
                    ? "bg-brand-rosegold text-white border-brand-rosegold" 
                    : "bg-white text-brand-charcoal/60 border-brand-beige"
                }`}
                title="Traditional Photo view"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIs360Active(true)}
                className={`p-2.5 rounded-full border shadow-md transition-luxury cursor-pointer flex items-center space-x-1.5 ${
                  is360Active 
                    ? "bg-brand-gold text-white border-brand-gold" 
                    : "bg-white text-brand-charcoal/60 border-brand-beige"
                }`}
                title="Virtual 360 Degree View"
              >
                <RotateCw className="w-4 h-4 animate-spin" style={{ animationDuration: "15s" }} />
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase px-0.5">360°</span>
              </button>
            </div>

            {/* Render Canvas Area */}
            {!is360Active ? (
              <div 
                onClick={() => setIsZoomed(true)}
                className="w-full h-full flex items-center justify-center cursor-zoom-in group relative overflow-hidden"
              >
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <>
                    {/* Clean beautiful enlargement shadows backing */}
                    <div className={`absolute p-1 w-48 h-48 rounded-full ${product.bgDecorative} opacity-20 blur-2xl pointer-events-none scale-150`}></div>
                    
                    {/* Drawn luxury SVG product element */}
                    <div className="scale-150 transition-transform duration-500 group-hover:scale-160">
                      <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                    </div>
                  </>
                )}
                
                <span className="absolute bottom-6 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-brand-beige/50 text-[10px] uppercase font-bold text-brand-charcoal tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  Click to Zoom and inspect formula label
                </span>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <div 
                  className="scale-150 relative"
                  style={{
                    transform: `scale(1.5) rotateY(${rotationAngle}deg)`,
                    transition: "transform 0.1s ease-out"
                  }}
                >
                  <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                  
                  {/* Digital 3D shine reflex line */}
                  <div 
                    className="absolute top-0 bottom-0 w-2.5 bg-white/70 opacity-30 filter blur-xs rounded-full pointer-events-none"
                    style={{
                      left: `${20 + (rotationAngle / 360) * 60}%`,
                      transform: "skewX(-15deg)"
                    }}
                  ></div>
                </div>

                {/* 360 rotation range slider picker */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 select-none">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-widest">
                    <span>🔄 Drag slider to spin brand vial</span>
                    <span>{rotationAngle}° Position</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-full h-1 bg-brand-beige rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Minimalist Multi-Image Selector row */}
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => { setIs360Active(false); }}
              className={`border p-1 rounded-2xl flex items-center justify-center bg-brand-cream/10 hover:bg-brand-cream/30 transition-colors cursor-pointer overflow-hidden ${!is360Active ? "border-brand-rosegold ring-1 ring-brand-rosegold" : "border-brand-beige"}`}
            >
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full aspect-square object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="scale-75 p-2">
                  <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                </div>
              )}
            </button>
            
            <button
              onClick={() => { setIs360Active(true); setRotationAngle(45); }}
              className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center bg-brand-pink/10 hover:bg-brand-pink/30 transition-colors cursor-pointer ${is360Active && rotationAngle === 45 ? "border-brand-rosegold ring-1 ring-brand-rosegold" : "border-brand-beige"}`}
            >
              <div className="rotate-[45deg] scale-50 transition-transform">
                <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
              </div>
              <span className="text-[8px] font-sans font-bold text-brand-rosegold uppercase mt-1">45° Profile</span>
            </button>

            <button
              onClick={() => { setIs360Active(true); setRotationAngle(180); }}
              className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center bg-brand-pink/10 hover:bg-brand-pink/30 transition-colors cursor-pointer ${is360Active && rotationAngle === 180 ? "border-brand-rosegold ring-1 ring-brand-rosegold" : "border-brand-beige"}`}
            >
              <div className="rotate-[180deg] scale-50 transition-transform">
                <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
              </div>
              <span className="text-[8px] font-sans font-bold text-brand-rosegold uppercase mt-1">Rear Tag</span>
            </button>

            <button
              onClick={() => { setIs360Active(true); setRotationAngle(270); }}
              className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center bg-brand-pink/10 hover:bg-brand-pink/30 transition-colors cursor-pointer ${is360Active && rotationAngle === 270 ? "border-brand-rosegold ring-1 ring-brand-rosegold" : "border-brand-beige"}`}
            >
              <div className="rotate-[270deg] scale-50 transition-transform">
                <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
              </div>
              <span className="text-[8px] font-sans font-bold text-brand-rosegold uppercase mt-1">side Seal</span>
            </button>
          </div>
        </div>

        {/* Right Side: Product Information and checkout actions */}
        <div className="space-y-6 text-left">
          
          {/* Main Category, Title & Rating Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-rosegold">
                {product.categoryLabel}
              </span>
              <span className="text-xs font-semibold text-brand-charcoal/50">
                Formula Size: {product.size}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-bold">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 pt-1">
              <div className="flex items-center space-x-1 bg-brand-cream/60 py-1 px-2.5 rounded-md border border-brand-rosegold/10">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-brand-charcoal">{product.rating}</span>
              </div>
              <span className="text-xs text-brand-charcoal/60 font-sans">
                ({product.reviewsCount} verified patient diagnostics & client testimonies)
              </span>
            </div>
          </div>

          <p className="text-brand-charcoal/80 text-sm leading-relaxed font-sans">
            {product.description}
          </p>

          <div className="border-t border-b border-brand-beige py-4 flex items-center justify-between bg-brand-cream/10 px-4 rounded-2xl">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-bold text-brand-charcoal font-sans">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-brand-charcoal/40 line-through text-sm">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-brand-rosegold font-bold uppercase tracking-widest mt-0.5 block">
                Free Delivery Applied
              </span>
            </div>

            {/* Stock status identifier badge style */}
            <div className="flex items-center space-x-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                product.stockStatus === "in-stock" ? "bg-green-500 animate-pulse" : product.stockStatus === "low-stock" ? "bg-orange-500 animate-pulse" : "bg-red-500"
              }`}></div>
              <span className="text-xs font-bold uppercase font-sans text-brand-charcoal/80">
                {product.stockStatus === "in-stock" ? "In Botanical Stock" : product.stockStatus === "low-stock" ? "Strictly Limited - Low Stock" : "Temporarily Sold Out"}
              </span>
            </div>
          </div>

          {/* Quantity selector and checkout button lines */}
          {product.stockStatus !== "out-of-stock" ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-stretch">
                
                {/* Counter */}
                <div className="flex items-center justify-between border border-brand-beige bg-white rounded-full p-1 w-full sm:w-36">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-full hover:bg-brand-beige/50 text-brand-charcoal font-bold text-sm transition-colors cursor-pointer"
                    id="quantity-dec-btn"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-sm text-brand-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-full hover:bg-brand-beige/50 text-brand-charcoal font-bold text-sm transition-colors cursor-pointer"
                    id="quantity-inc-btn"
                  >
                    +
                  </button>
                </div>

                {/* Add to shopping bag button */}
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 cursor-pointer py-4 px-6 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:scale-[1.01] transition-transform shadow-lg shadow-brand-rosegold/20 flex items-center justify-center space-x-2.5"
                  id="detail-add-bag-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Squeeze Into Bag</span>
                </button>
                
                {/* Save Heart Wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-4 rounded-full border border-brand-beige bg-white hover:bg-brand-pink/20 text-brand-rosegold transition-luxury cursor-pointer shadow-md"
                  id="detail-wishlist-toggle"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-brand-rosegold" : ""}`} />
                </button>
              </div>

              {/* Direct Buy Now button */}
              <button
                onClick={() => onBuyNow(product, quantity)}
                className="w-full cursor-pointer py-4 bg-brand-charcoal text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-rosegold transition-luxury shadow-lg flex items-center justify-center space-x-2"
                id="detail-buy-now-btn"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Express Buy Now (Fast checkout)</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs flex items-start space-x-2 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Formula formulation restock in progress.</strong> We do not accept active advance pre-orders on this. Click the chatbot or contact us to receive restock alarms immediately upon preparation.
              </span>
            </div>
          )}

          {/* Treatment Specifications and Active Ingredients Tabs */}
          <div className="pt-6">
            <div className="flex border-b border-brand-beige text-xs uppercase font-sans tracking-widest font-bold">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-3 pr-4 transition-colors cursor-pointer ${activeTab === "details" ? "text-brand-rosegold border-b-2 border-brand-rosegold" : "text-brand-charcoal/50"}`}
              >
                Core Treatment
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`pb-3 px-4 transition-colors cursor-pointer ${activeTab === "ingredients" ? "text-brand-rosegold border-b-2 border-brand-rosegold" : "text-brand-charcoal/50"}`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("how-to-use")}
                className={`pb-3 px-4 transition-colors cursor-pointer ${activeTab === "how-to-use" ? "text-brand-rosegold border-b-2 border-brand-rosegold" : "text-brand-charcoal/50"}`}
              >
                How To Use
              </button>
              <button
                onClick={() => setActiveTab("clinical")}
                className={`pb-3 pl-4 transition-colors cursor-pointer ${activeTab === "clinical" ? "text-brand-rosegold border-b-2 border-brand-rosegold" : "text-brand-charcoal/50"}`}
              >
                Clinical Outcomes
              </button>
            </div>

            <div className="py-5 text-xs text-brand-charcoal/80 leading-relaxed font-sans min-h-[140px]">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <p className="text-[13px] text-brand-charcoal/90">{product.description}</p>
                  <p className="font-bold text-brand-rosegold">Formulated Benefits:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "ingredients" && (
                <div className="space-y-3 bg-brand-beige/20 p-4 rounded-2xl border border-brand-beige/50">
                  <p className="font-bold text-[13px] text-brand-charcoal">Botanical & Lab Chemistry:</p>
                  <p className="italic text-[12px]">{product.ingredients}</p>
                  <p className="text-[10px] text-brand-charcoal/50 mt-1">Free from parabens, synthetic sulfates, formaldehydes, phthalates, and triclosan.</p>
                </div>
              )}
              {activeTab === "how-to-use" && (
                <div className="space-y-3">
                  <p className="font-bold text-[13px] text-brand-charcoal">Ritual Instruction:</p>
                  <p className="text-[12px] whitespace-pre-line leading-relaxed">{product.howToUse}</p>
                  <p className="text-[10px] text-brand-rosegold font-bold mt-1">Recommended Skin Match: {product.skinType}</p>
                </div>
              )}
              {activeTab === "clinical" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-brand-cream/30 text-brand-charcoal border border-brand-rosegold/10">
                    <p className="font-bold text-[12px] uppercase text-brand-rosegold tracking-widest mb-1.5 font-sans">Diagnostics In vivo Results:</p>
                    <p className="text-[12.5px] italic leading-relaxed">{product.expectedResults}</p>
                  </div>
                  <p className="text-[10px] text-brand-charcoal/50">Based on a 4-week clinical diagnostic test involving 120 adult volunteers aged 20-45 with dry, dehydrated, or combination skin types.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Expandable FAQs Accordion Drawer Section */}
      <div className="mt-16 pt-12 border-t border-brand-beige/60 text-left">
        <h2 className="text-2xl font-serif text-brand-charcoal mb-6">Expert Skincare FAQs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-brand-beige/70 bg-white rounded-2xl overflow-hidden transition-all filter hover:shadow-xs"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-charcoal cursor-pointer font-sans bg-brand-cream/5"
              >
                <span>{faq.question}</span>
                {openFAQ === index ? <ChevronUp className="w-4 h-4 text-brand-rosegold" /> : <ChevronDown className="w-4 h-4 text-brand-charcoal/40" />}
              </button>
              {openFAQ === index && (
                <div className="px-5 pb-5 pt-1 text-xs text-brand-charcoal/70 leading-relaxed font-sans border-t border-brand-beige/10 animate-fade-in-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ratings and Detailed Testimonies Section */}
      <section className="mt-16 pt-12 border-t border-brand-beige text-left">
        <h2 className="text-2xl font-serif text-brand-charcoal mb-8">Verified Customer Radiance Journal</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Summary Column */}
          <div className="bg-brand-cream/20 p-6 rounded-3xl border border-brand-beige/60">
            <h3 className="text-base uppercase tracking-widest font-bold text-brand-charcoal/80 mb-2">Overall Score</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-brand-charcoal">{product.rating}</span>
              <span className="text-lg text-brand-charcoal/40">/ 5.0</span>
            </div>
            
            {/* Visual Progress star lines */}
            <div className="space-y-3 mt-6">
              {Object.entries(ratingSpread).map(([label, pct]) => (
                <div key={label} className="flex items-center text-xs font-sans text-brand-charcoal/60">
                  <span className="w-16 font-bold">{label}</span>
                  <div className="flex-1 h-2 bg-brand-beige/60 rounded-full mx-3 overflow-hidden">
                    <div className="h-full bg-brand-gold rounded-full" style={{ width: pct }}></div>
                  </div>
                  <span className="w-8 text-right font-bold">{pct}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-brand-beige/60 text-xs text-brand-charcoal/50 leading-relaxed">
              💯 <strong>100% Verified Buyer Safety Program.</strong> We only display reviews submitted directly from premium customers who have parsed shipping receipt logs.
            </div>
          </div>

          {/* Individual Reviews Grid */}
          <div className="lg:col-span-2 space-y-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white rounded-3xl border border-brand-beige transition-luxury hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-full ${rev.avatarColor} text-brand-charcoal flex items-center justify-center font-bold text-xs uppercase`}>
                      {rev.userName.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xs font-sans font-bold text-brand-charcoal">{rev.userName}</h4>
                      <p className="text-[10px] text-brand-charcoal/40 font-medium">Published on {rev.date}</p>
                    </div>
                  </div>

                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-brand-gold text-brand-gold" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-left pl-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="text-[13px] font-sans font-bold text-brand-charcoal">{rev.title}</h5>
                    {rev.verified && (
                      <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-wider font-sans">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans pt-1">
                     "{rev.comment}"
                  </p>
                </div>

                {/* Helpful voting widget */}
                <div className="mt-5 pt-3 border-t border-brand-beige/20 flex items-center justify-between text-[11px] font-sans">
                  <button
                    onClick={() => handleHelpfulVote(rev.id)}
                    className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      reviewedProductAnswers[rev.id] ? "text-green-600 font-bold" : "text-brand-charcoal/40 hover:text-brand-rosegold"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulCount + (reviewedProductAnswers[rev.id] || 0)})</span>
                  </button>
                  <span className="text-brand-charcoal/30 font-medium">Was this diagnostic testimony valuable for you?</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Related / Complementary Products up-sell grid */}
      <section className="mt-20 pt-12 border-t border-brand-beige text-left">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-serif text-brand-charcoal">Formulate a Complete Routine</h2>
            <p className="text-xs text-brand-charcoal/50 font-sans mt-1">Excellent complementary skincare layers pairing beautifully with {product.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {displayRelated.map((p) => {
            const disc = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
            return (
              <div 
                key={p.id}
                onClick={() => { onSelectProduct(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group cursor-pointer bg-white border border-brand-beige p-4 rounded-2xl hover:border-brand-rosegold/40 transition-luxury flex flex-col justify-between"
              >
                <div className="aspect-[4/5] bg-brand-cream/10 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                  {disc > 0 && (
                    <span className="absolute top-2 left-2 bg-brand-gold text-[8px] text-white px-1.5 py-0.5 rounded font-sans uppercase font-semibold z-10">
                      {disc}% off
                    </span>
                  )}
                  {p.image ? (
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="scale-75">
                      <ProductSVG shapeType={p.shapeType} gradientFrom={p.gradientFrom} gradientTo={p.gradientTo} name={p.name} />
                    </div>
                  )}
                </div>

                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-widest text-[#D8A47F] font-bold">{p.categoryLabel}</p>
                  <h3 className="text-xs font-bold text-brand-charcoal truncate mt-0.5 hover:text-brand-rosegold">{p.name}</h3>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-brand-beige/40">
                    <span className="text-xs font-bold text-brand-charcoal">₹{p.price}</span>
                    <span className="text-[9px] font-sans font-bold text-brand-rosegold uppercase tracking-widest border-b border-brand-rosegold pb-0.5">Explore Layering</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox zoomed modal */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-brand-charcoal/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-xs cursor-zoom-out animate-fade-in-up"
        >
          <div className="max-w-md w-full bg-white p-8 rounded-3xl text-center space-y-6 flex flex-col items-center">
            <h3 className="text-base font-serif font-bold text-brand-charcoal border-b border-brand-beige pb-3 w-full">
              {product.name}
            </h3>
            <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-brand-beige flex items-center justify-center relative shadow-inner bg-brand-ivory">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover animate-pulse"
                  style={{ animationDuration: "3s" }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="scale-150">
                  <ProductSVG shapeType={product.shapeType} gradientFrom={product.gradientFrom} gradientTo={product.gradientTo} name={product.name} />
                </div>
              )}
            </div>
            
            <div className="space-y-2 text-left w-full bg-brand-cream/20 p-4 rounded-xl border border-brand-beige">
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-rosegold">Certificate Details:</div>
              <p className="text-xs leading-relaxed text-brand-charcoal/80">
                ⭐ {product.rating} Rating • Pure Chemical-Free Compound <br />
                📦 Liquid Volume: {product.size} <br />
                🌿 Primary Ingredients: {product.ingredients.split(",").slice(0, 3).join(", ")} & Organic Extracts!
              </p>
            </div>

            <button 
              onClick={() => setIsZoomed(false)}
              className="px-6 py-2 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-rosegold transition-colors"
            >
              Close Inspect
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
