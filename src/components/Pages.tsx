import React, { useState } from "react";
import { Copy, Check, Search, Calendar, User, Clock, ArrowRight, MapPin, Phone, Mail, MessageSquare, Instagram, Twitter, Heart, Sparkles, CheckCircle } from "lucide-react";
import { BLOG_ARTICLES, PROMO_OFFERS, BlogArticle, PromoOffer } from "../products";

/* ============================================================================
   1. ABOUT US PAGE COMPONENT
   ============================================================================ */
export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up text-left space-y-16">
      
      {/* Editorial Mission Statement */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#D8A47F]">Botanical Skin Science</span>
        <h1 className="text-3xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Healthy Skin, <br /><span className="italic font-normal text-brand-rosegold">Naturally Radiant</span>
        </h1>
        <p className="text-sm font-sans text-brand-charcoal/70 leading-relaxed pt-2">
          Natural Glow was founded in 2021 by a team of cosmetic chemists and dermatologist specialists. We were tired of the cosmetic industry's obsession with harsh acids and heavy silicone fillers that only provide artificial, short-term plumpness whilst degrading the skin's biological barrier in the long term.
        </p>
      </section>

      {/* Core Brand Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Premium Ingredients", desc: "We source our active botanicals globally — from certified cold-pressed jojoba yields to pure licorice extracts to guarantee active raw molecule vitality." },
          { title: "Dermatologist Tested", desc: "Every single base molecule is formulated and verified inside independent testing labs. No skin stinging or raw redness flares." },
          { title: "100% Cruelty-Free", desc: "No testing is ever performed on animals. Certifiably registered vegan formulations designed to integrate seamlessly on delicate face pores." },
          { title: "Absolute Transparency", desc: "No hidden chemicals, water fillers, synthetic fragrances, or artificial dye tints. Incredibly clean, honest, biological skincare." }
        ].map((pillar, idx) => (
          <div key={idx} className="p-6 bg-white border border-brand-beige rounded-3xl text-left space-y-3 hover:border-brand-rosegold/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-brand-pink/30 text-brand-rosegold font-bold font-sans text-sm flex items-center justify-center">
              0{idx + 1}
            </div>
            <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">{pillar.title}</h3>
            <p className="text-xs text-brand-charcoal/60 leading-relaxed font-sans">{pillar.desc}</p>
          </div>
        ))}
      </section>

      {/* Narrative Section with visual block placeholders */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-brand-beige">
        <div className="space-y-5 text-left">
          <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#D8A47F]">The Lab Chronicle</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-bold">Our Commitment to Skin Ecology</h2>
          <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-sans">
             We understand that your skin is a living, breathing ecosystem with its own delicate pH balance and complex lipid lipid barrier. That's why we utilize biomimetic formulas — substances that mirror your skin's natural molecular structures.
          </p>
          <div className="space-y-3 text-xs font-sans text-brand-charcoal/80">
            <div className="flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>pH 5.5 Balanced (Mirrors skin's natural acidic mantle)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>High lipid-ceramide ratios to restore broken cell moisture</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <span>Bio-fermented, cold-stabilized active molecule concentrations</span>
            </div>
          </div>
        </div>

        {/* Abstract luxury grid graphics */}
        <div className="grid grid-cols-2 gap-4 h-[300px]">
          <div className="bg-brand-cream/30 rounded-3xl border border-brand-beige p-6 flex flex-col justify-end text-left relative overflow-hidden">
            <span className="text-3xl font-serif italic text-brand-charcoal font-bold">2021</span>
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/40 tracking-wider">Foundation</span>
          </div>
          <div className="bg-brand-pink/20 rounded-3xl border border-brand-beige p-6 flex flex-col justify-end text-left relative overflow-hidden">
            <span className="text-3xl font-serif italic text-brand-charcoal font-bold">50k+</span>
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/40 tracking-wider">Clients Safe</span>
          </div>
          <div className="col-span-2 bg-brand-beige/25 rounded-3xl border border-brand-beige p-6 flex flex-col justify-end text-left">
            <span className="text-sm font-sans font-bold text-brand-charcoal">"Unrivaled clinical precision paired with organic beauty."</span>
            <span className="text-[10px] uppercase font-bold text-brand-rosegold tracking-widest mt-1">- London Skincare Society Review</span>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ============================================================================
   2. JOURNAL (BLOG) PAGE COMPONENT
   ============================================================================ */
export function BlogPage() {
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [activeBlogCategory, setActiveBlogCategory] = useState("all");
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const blogCategories = ["all", "Skincare Science", "Skin Rituals", "Ingredients Deep Dive"];

  // Filter blog articles
  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(blogSearchQuery.toLowerCase());
    
    const matchesCategory = activeBlogCategory === "all" || article.category === activeBlogCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up text-left">
      
      {/* If an article is open, show the reader mode */}
      {activeArticle ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-brand-rosegold hover:text-brand-gold transition-colors pb-4 border-b border-brand-beige w-full cursor-pointer"
            id="blog-back-to-list"
          >
            ← Back to skincare journal list
          </button>
          
          <div className="space-y-4">
            <span className="bg-brand-pink text-brand-rosegold font-sans font-bold text-[9px] px-2.5 py-1 rounded uppercase tracking-widest">
              {activeArticle.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs text-brand-charcoal/50 font-sans">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeArticle.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5" />
                <span>{activeArticle.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeArticle.readTime}</span>
              </span>
            </div>
          </div>

          {/* Styled Magazine article body */}
          <article className="prose prose-stone text-brand-charcoal/85 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-wrap selection:bg-brand-pink/50 pt-4 border-t border-brand-beige">
            {activeArticle.content}
          </article>

          {/* Social elements inside article footer */}
          <div className="p-6 bg-brand-cream/10 border border-brand-beige rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
            <div className="text-left font-sans text-xs">
              <h4 className="font-bold text-brand-charcoal">Did this cosmetic article clarify your doubts?</h4>
              <p className="text-brand-charcoal/50 mt-1">Bookmark skin diagnostics to check routine guides weekly.</p>
            </div>
            <div className="flex space-x-3 text-xs uppercase font-bold font-sans">
              <button className="px-5 py-2.5 rounded-full border border-brand-beige hover:border-brand-rosegold bg-white text-brand-charcoal cursor-pointer flex items-center space-x-1">
                <Heart className="w-3.5 h-3.5 text-brand-rosegold fill-brand-rosegold" />
                <span>Saves article</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog List Main Stage */
        <div className="space-y-12">
          
          {/* Header row with search block */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-6 pb-6 border-b border-brand-beige/60">
            <div>
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-brand-rosegold">Skincare Insights</span>
              <h1 className="text-3xl font-serif text-brand-charcoal font-bold mt-1">The Botanical Journal</h1>
              <p className="text-xs text-brand-charcoal/50 font-sans">Dermatological publications, active material sciences comparison reviews, and clinical face routine blueprints.</p>
            </div>

            {/* In-blog search input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={blogSearchQuery}
                onChange={(e) => setBlogSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-brand-cream/10 border border-brand-beige outline-none focus:bg-white text-brand-charcoal font-sans"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-brand-charcoal/40" />
            </div>
          </div>

          {/* Filter Categories Buttons */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveBlogCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider ${
                  activeBlogCategory === cat 
                    ? "bg-brand-rosegold text-white shadow-sm" 
                    : "bg-white border border-brand-beige hover:border-brand-rosegold text-brand-charcoal/60 cursor-pointer"
                }`}
              >
                {cat === "all" ? "All publications" : cat}
              </button>
            ))}
          </div>

          {/* Main articles grid list */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-white border border-brand-beige rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-luxury"
                >
                  <div className="space-y-3 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#D8A47F] block font-sans">{article.category} • {article.readTime}</span>
                    <h3 className="text-lg font-serif font-bold text-brand-charcoal leading-snug hover:text-brand-rosegold cursor-pointer" onClick={() => setActiveArticle(article)}>
                      {article.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-sans line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-beige/50 flex items-center justify-between">
                    <span className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-wider">{article.date}</span>
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest font-bold text-brand-rosegold hover:text-brand-gold transition-colors cursor-pointer"
                      id={`read-article-btn-${article.id}`}
                    >
                      <span>Read Publication</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-sans text-brand-charcoal/45">We haven't penned any clinical briefs matching query "{blogSearchQuery}". Try refreshing your filters.</div>
          )}

        </div>
      )}

    </div>
  );
}

/* ============================================================================
   3. OFFERS & PROMOTIONS PAGE COMPONENT
   ============================================================================ */
interface OffersPageProps {
  onApplyPromo: (code: string) => void;
  appliedPromo: string;
}

export function OffersPage({ onApplyPromo, appliedPromo }: OffersPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyPromo(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up text-left space-y-12">
      
      {/* Header Info */}
      <section>
        <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-brand-rosegold">Boutique Savings</span>
        <h1 className="text-3xl font-serif text-brand-charcoal font-bold mt-1">Exclusive Skin Codes & Vouchers</h1>
        <p className="text-xs text-brand-charcoal/50 font-sans mt-0.5">Copy and enter codes inside your cart ledger to redeem instant product markdowns and free courier shipping instantly.</p>
      </section>

      {/* Promos Grid show list */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROMO_OFFERS.map((promo) => (
          <div 
            key={promo.code}
            className="group relative bg-brand-ivory border border-brand-beige rounded-3xl p-6 space-y-6 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-luxury"
          >
            {/* Visual gradient accent strip */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${promo.bannerGradient}`}></div>

            <div className="space-y-3Text text-left font-sans">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-rosegold">Verified active voucher</span>
              <h3 className="text-base font-serif font-bold text-brand-charcoal mt-1">{promo.discountDescription}</h3>
              <p className="text-[11px] text-brand-charcoal/50 leading-relaxed font-sans">{promo.terms}</p>
            </div>

            <div className="pt-4 border-t border-brand-beige">
              <div className="flex items-center justify-between bg-white border border-brand-beige p-1.5 rounded-2xl">
                <code className="font-mono text-xs font-bold tracking-widest text-brand-charcoal/80 bg-brand-cream/10 px-3 py-1 rounded">
                  {promo.code}
                </code>
                
                <button
                  onClick={() => handleCopyCode(promo.code)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${
                    copiedCode === promo.code || appliedPromo === promo.code
                      ? "bg-green-600 text-white"
                      : "bg-brand-charcoal text-white hover:bg-brand-rosegold"
                  }`}
                  id={`copy-promo-btn-${promo.code}`}
                >
                  {copiedCode === promo.code || appliedPromo === promo.code ? "Redeemed ✓" : "Copy & Redeem"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Countdown Flash-Sale Block widget */}
      <section className="bg-brand-charcoal text-white p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-2 text-left">
          <span className="inline-block bg-brand-gold text-brand-charcoal font-bold font-sans text-[9px] px-2.5 py-1 rounded uppercase tracking-widest">
            Flash Bundle promotion
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white font-bold leading-tight">
            Buy 2 Face Serums, Choose 1 Cleanser FREE!
          </h3>
          <p className="text-xs text-white/65 leading-relaxed font-sans">
             Our clinical lab produces limited-batch hyaluronic acid serums every Thursday. Purchase any 2 hydration serums today, and our cargo clerks will pack a Full-Sized Centella Gentle Cleanser inside your shipping cooler box absolutely FREE!
          </p>
        </div>

        {/* Fake spinning countdown clock */}
        <div className="flex flex-col items-center sm:items-end justify-center">
          <div className="inline-flex space-x-3 text-center font-mono">
            {[
              { val: "02", label: "DAYS" },
              { val: "14", label: "HRS" },
              { val: "38", label: "MIN" },
              { val: "54", label: "SEC" },
            ].map((clock, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-2xl w-14 sm:w-16">
                <span className="text-base sm:text-lg font-bold text-white block">{clock.val}</span>
                <span className="text-[8px] text-white/40 tracking-wider font-sans font-bold">{clock.label}</span>
              </div>
            ))}
          </div>
          <span className="text-[9px] text-brand-pink tracking-widest uppercase font-bold mt-3.5 font-sans">No coupon code required. automatic at fulfillment.</span>
        </div>
      </section>

    </div>
  );
}

/* ============================================================================
   4. CONTACT US PAGE COMPONENT
   ============================================================================ */
export function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", concern: "routine", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const err: Record<string, string> = {};
    if (!contactForm.name.trim()) err.name = "Profile name is required";
    if (!contactForm.email.trim() || !/\S+@\S+\.\S+/.test(contactForm.email)) err.email = "Valid active email address is required";
    if (!contactForm.message.trim() || contactForm.message.length < 10) err.message = "Message brief must exceed 10 characters";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setContactForm({ name: "", email: "", concern: "routine", message: "" });
      }, 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up text-left grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
      
      {/* Narrative & quick contact channels */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#D8A47F]">Inquiries Desk</span>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold mt-1">Contact Botanical Experts</h1>
          <p className="text-xs sm:text-sm text-brand-charcoal/60 leading-relaxed font-sans mt-1">Our customer service line coordinates with molecular cosmetic specialists. Get personal advice on active routine builders, skin peeling concerns, or bulk shipments.</p>
        </div>

        <div className="space-y-4 font-sans text-xs">
          
          <div className="flex items-start space-x-3 bg-brand-cream/10 p-4 border border-brand-beige rounded-2xl">
            <MapPin className="w-5 h-5 text-brand-rosegold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-brand-charcoal uppercase tracking-wider">Natural Glow Elite Boutique</h4>
              <p className="text-brand-charcoal/60 mt-0.5 leading-relaxed">Suite 502, Orchid Science Towers, Bandra West, Mumbai, MH - 400050</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-brand-cream/10 p-4 border border-brand-beige rounded-2xl">
            <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-brand-charcoal uppercase tracking-wider">Voice Diagnostics Line</h4>
              <p className="text-brand-charcoal/60 mt-0.5 leading-relaxed">Toll Free: +91 1800-420-GLOW (09:00 AM - 06:00 PM IST, Monday-Saturday)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-brand-cream/10 p-4 border border-brand-beige rounded-2xl">
            <Mail className="w-5 h-5 text-brand-rosegold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-brand-charcoal uppercase tracking-wider">Clinical Mailbox Address</h4>
              <p className="text-brand-charcoal/60 mt-0.5 leading-relaxed">diagnostics@naturalglow.in / logistics@naturalglow.in</p>
            </div>
          </div>

        </div>

        {/* Abstract Vector Map representation drawn in CSS */}
        <div className="relative border border-brand-beige bg-gradient-to-tr from-brand-beige/50 to-brand-cream/30 h-[180px] rounded-3xl overflow-hidden flex flex-col justify-between p-4 shadow-xs select-none">
          {/* Faux map highway grid */}
          <div className="absolute inset-0 opacity-10 flex flex-col justify-between pointer-events-none">
            <div className="h-0.5 bg-brand-charcoal w-full"></div>
            <div className="h-0.5 bg-brand-charcoal w-full"></div>
            <div className="h-0.5 bg-brand-charcoal w-full"></div>
            <div className="w-0.5 bg-brand-charcoal h-full absolute left-1/3"></div>
            <div className="w-0.5 bg-brand-charcoal h-full absolute left-2/3"></div>
          </div>
          
          <div className="flex items-center space-x-2 text-brand-rosegold z-10 font-bold font-sans">
            <MapPin className="w-4 h-4 text-brand-gold animate-bounce" />
            <span className="text-[10px] uppercase tracking-wider">Live Elite Boutique Map Pin</span>
          </div>

          <div className="font-sans text-left z-10 bg-white/75 backdrop-blur-xs p-3.5 rounded-xl border border-brand-beige">
            <h5 className="text-[11px] font-bold text-brand-charcoal">Natural Glow Lab</h5>
            <p className="text-[9px] text-brand-charcoal/50 leading-relaxed mt-0.5">5 min walking radius from Bandra Metro Terminal. Private customer parking certified.</p>
          </div>
        </div>

      </div>

      {/* Form Card container */}
      <div className="lg:col-span-3 bg-white p-6 sm:p-8 border border-brand-beige rounded-3xl">
        <h2 className="text-xl font-serif text-brand-charcoal font-bold border-b border-brand-beige pb-3 mb-6">Dispatch Message</h2>
        
        {isSent ? (
          /* Sent confirmation screen form */
          <div className="py-12 text-center text-xs font-sans text-brand-charcoal/50 space-y-4 animate-fade-in-up">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-6 h-6 shrink-0" />
            </div>
            <h3 className="font-bold text-brand-charcoal">Cosmetic Dispatch Authorized!</h3>
            <p className="max-w-xs mx-auto leading-relaxed">Our chemical advisors received your message. A skincare clerk will examine your diagnostic requests and publish reply logs internally within 5 to 10 working hours.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="font-bold text-brand-charcoal uppercase tracking-wider">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aditi Sharma"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl outline-none hover:border-brand-rosegold/50 focus:border-brand-rosegold"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-brand-charcoal uppercase tracking-wider">Email koordinaten</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl outline-none hover:border-brand-rosegold/50 focus:border-brand-rosegold"
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email}</p>}
              </div>

            </div>

            <div className="space-y-1">
              <label className="font-bold text-brand-charcoal uppercase tracking-wider">Primary Subject Topic</label>
              <select
                value={contactForm.concern}
                onChange={(e) => setContactForm({ ...contactForm, concern: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl bg-white outline-none cursor-pointer hover:border-brand-rosegold/50"
              >
                <option value="routine">🧬 Advice on custom routine selections</option>
                <option value="delivery">📦 Courier shipping & cargo transit tracking</option>
                <option value="allergy">🛡️ Skin irritation diagnostic consulting</option>
                <option value="bulk">💼 Wholesale business distribution contracts</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-brand-charcoal uppercase tracking-wider">Message brief</label>
              <textarea
                rows={5}
                placeholder="State your unique cutaneous diagnostics or shopping concerns..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl outline-none hover:border-brand-rosegold/50 focus:border-brand-rosegold font-sans"
              ></textarea>
              {errors.message && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 text-center cursor-pointer bg-brand-charcoal text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-rosegold transition-luxury shadow-md"
              id="contact-form-submit-btn"
            >
              Dispatch Skincare message
            </button>

          </form>
        )}
      </div>

    </div>
  );
}
