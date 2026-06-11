import { ArrowRight, Sparkles, Star, ShieldCheck, Waves } from "lucide-react";

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onSelectProductById: (id: string) => void;
}

export default function Hero({ onShopNow, onExploreCollection, onSelectProductById }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-ivory via-brand-cream to-brand-beige pt-8 pb-16 md:py-24 border-b border-brand-beige">
      {/* Absolute Decorative Glow Elements */}
      <div className="absolute top-10 right-10 w-[320px] h-[320px] rounded-full bg-brand-pink opacity-25 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-10 left-10 w-[240px] h-[240px] rounded-full bg-brand-cream opacity-35 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Text & Actions */}
          <div className="space-y-6 text-left animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-brand-pink/50 border border-brand-rosegold/20 px-3.5 py-1.5 rounded-full text-brand-rosegold text-xs font-semibold uppercase tracking-[0.2em] font-sans">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: "12s" }} />
              <span>Healthy Skin, Naturally Radiant</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight text-brand-charcoal">
              Discover Your <br />
              <span className="italic font-normal text-brand-rosegold relative">
                Natural Glow
                <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-gradient-to-r from-brand-pink to-brand-rosegold rounded-full"></span>
              </span>
            </h1>

            <p className="text-brand-charcoal/70 text-base sm:text-lg font-sans max-w-xl leading-relaxed">
              Premium chemical-free botanical skincare products formulated with clinical precision. We craft gentle, pH-balanced formulas designed dynamically to reveal your skin's innate luminosity.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3.5 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onShopNow}
                className="group relative cursor-pointer px-9 py-4 font-sans font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-rosegold to-brand-gold rounded-full shadow-lg shadow-brand-rosegold/20 hover:shadow-brand-rosegold/45 hover:scale-[1.02] transform transition-luxury flex items-center justify-center space-x-2"
                id="hero-shop-btn"
              >
                <span>Shop Formulation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onExploreCollection}
                className="cursor-pointer px-9 py-4 font-sans font-bold text-sm tracking-wider uppercase text-brand-rosegold border border-brand-rosegold hover:bg-brand-rosegold hover:text-white rounded-full transition-luxury flex items-center justify-center space-x-2"
                id="hero-explore-btn"
              >
                <span>Explore Care Collections</span>
              </button>
            </div>

            {/* Quick Benefits Badging */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-brand-beige/60">
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-rosegold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Eco Certified</h4>
                  <p className="text-[10px] text-brand-charcoal/60">100% Cruelty-Free</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Star className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">4.9 Skin Score</h4>
                  <p className="text-[10px] text-brand-charcoal/60">Over 15,000 Ratings</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Waves className="w-5 h-5 text-brand-rosegold shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Dermatologist</h4>
                  <p className="text-[10px] text-brand-charcoal/60">Active Formulations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Advanced Product Render Drawer */}
          <div className="relative flex justify-center items-center h-[380px] sm:h-[460px]">
            {/* Soft decorative visual circles backing */}
            <div className="absolute w-[280px] h-[360px] sm:w-[350px] sm:h-[430px] rounded-t-full bg-brand-pink/40 opacity-70 border border-brand-rosegold/10 scale-105 pointer-events-none"></div>
            
            {/* Premium 3D bottle vector mockup drawn in CSS */}
            <div className="relative w-[180px] h-[280px] sm:w-[220px] sm:h-[340px] bg-white/70 backdrop-blur-md rounded-t-full rounded-b-2xl shadow-2xl border-[10px] border-white/90 overflow-hidden flex flex-col justify-between p-6 hover:scale-105 transition-transform duration-700 select-none z-10">
              {/* Dropper Cap */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-gold rounded-full border-2 border-white pointer-events-none"></div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-4 h-1 bg-brand-rosegold pointer-events-none"></div>
              
              {/* Luxury Brand Label */}
              <div className="mt-8 border-b border-brand-beige pb-3 text-center">
                <div className="text-[9px] uppercase tracking-[0.3em] font-sans text-brand-rosegold font-bold">Natural Glow</div>
                <div className="text-sm font-serif italic text-brand-charcoal font-medium">Beauty Serum</div>
              </div>

              {/* Gold Droplet representation */}
              <div className="my-auto flex flex-col items-center justify-center py-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-rosegold to-brand-gold flex items-center justify-center shadow-md animate-float">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-sans mt-3 text-brand-charcoal/40">Pure Active Care</span>
              </div>

              {/* Bottle footer labels */}
              <div className="text-center">
                <div className="text-[11px] font-sans font-bold text-brand-charcoal uppercase tracking-widest">Vitamin C 15%</div>
                <div className="text-[9px] font-sans text-brand-gold tracking-widest mt-0.5">RADIANCE EMULSION</div>
              </div>
            </div>

            {/* Float Badge New Arrival */}
            <div 
              onClick={() => onSelectProductById("vit-c-serum")}
              className="absolute bottom-6 left-2 sm:-left-6 p-4 sm:p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-beige shadow-2xl cursor-pointer hover:scale-105 transition-luxury w-48 text-left z-20"
            >
              <span className="inline-block bg-brand-pink text-brand-rosegold font-sans font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-widest mb-1.5">
                New Arrival
              </span>
              <h3 className="text-xs font-serif font-bold text-brand-charcoal truncate">Vitamin C Radiance</h3>
              <p className="text-[10px] text-brand-charcoal/50 font-sans mt-0.5">Brighten & Revitalize Complex</p>
              
              <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-brand-beige">
                <span className="text-brand-rosegold font-bold text-xs font-sans">₹1,299</span>
                <span className="text-[9px] font-sans font-bold text-brand-charcoal uppercase tracking-widest border-b border-brand-charcoal">Details</span>
              </div>
            </div>

            {/* Float Badge Cruelty Free */}
            <div className="absolute top-10 right-4 p-3 bg-brand-cream/80 backdrop-blur-sm rounded-full border border-brand-rosegold/10 text-center text-xs text-brand-charcoal font-semibold z-20 shadow-md">
              🌱 Vegan & Safe
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
