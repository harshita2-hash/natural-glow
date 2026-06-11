export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  title: string;
  helpfulCount: number;
  avatarColor: string;
}

export interface Product {
  id: string;
  name: string;
  category: "serums" | "moisturizers" | "sunscreens" | "face-wash" | "acne-care" | "anti-aging";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  skinType: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  expectedResults: string;
  size: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  description: string;
  faqs: FAQ[];
  reviews: Review[];
  // Aesthetic configuration for SVG representation
  gradientFrom: string;
  gradientTo: string;
  bgDecorative: string;
  shapeType: "dropper" | "jar" | "tube" | "pump";
}

export const PRODUCTS: Product[] = [
  {
    id: "vit-c-serum",
    name: "Vitamin C Radiance Serum",
    category: "serums",
    categoryLabel: "Face Serums",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 154,
    tag: "Best Seller",
    skinType: "All Skin Types, Dull Skin",
    benefits: ["Brightens dull complexion", "Fades dark spots & hyperpigmentation", "Boosts collagen production", "Protects against environmental stressors"],
    ingredients: "Pure L-Ascorbic Acid 15%, Ferulic Acid 0.5%, Vitamin E (Tocopherol) 1%, Pure Hyaluronic Acid, Organic Aloe Vera Extract",
    howToUse: "Apply 3-4 drops to cleansed face in the morning. Pat gently until fully absorbed, following up with your favorite moisturizer and a broad-spectrum sunscreen of SPF 30 or higher.",
    expectedResults: "Visible brightening and glowing skin texture in 7 days. Noticeable fading of dark spots and improved firmness within 4 weeks.",
    size: "30 ml",
    stockStatus: "in-stock",
    description: "An advanced, dermatologically-approved serum that targets dullness, uneven skin tone, and signs of tiredness. Formulated with a highly stable concentration of active pure Vitamin C, further enhanced with Vitamin E and Ferulic Acid to maximize antioxidant efficacy.",
    gradientFrom: "#D8A47F",
    gradientTo: "#C9A227",
    bgDecorative: "bg-[#FFF5E6]",
    shapeType: "dropper",
    faqs: [
      { question: "Why is Vitamin C good for my skin?", answer: "Vitamin C is a powerful antioxidant that neutralizes free radicals, brightens hyperpigmentation, stimulates collagen synthesis, and reverses UV damage." },
      { question: "Can I use this with Niacinamide?", answer: "Yes! Modern formulations allow layering them. However, we suggest spacing them: apply Vitamin C in the morning, and Niacinamide in the evening for unparalleled synergy." }
    ],
    reviews: [
      { id: "rev-1", userName: "Aanya S.", rating: 5, date: "2026-05-18", verified: true, title: "Literally a bottle of liquid gold", comment: "My pigmentation has faded significantly in just three weeks. My skin looks plump and naturally dewy without makeup!", helpfulCount: 42, avatarColor: "bg-[#F8D7DA]" },
      { id: "rev-2", userName: "Rohit K.", rating: 4, date: "2026-06-02", verified: true, title: "Great formula, absorbing fast", comment: "Doesn't feel sticky at all. It has a very premium texture. My skin feels healthier and moisturized.", helpfulCount: 18, avatarColor: "bg-[#F4EDE4]" }
    ]
  },
  {
    id: "hyaluronic-serum",
    name: "Hyaluronic Acid Multi-Moisture Booster",
    category: "serums",
    categoryLabel: "Face Serums",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 128,
    tag: "Top Rated",
    skinType: "Dehydrated, Dry, Sensitive Skin",
    benefits: ["Delivers multi-depth hydration", "Repairs skin moisture barrier", "Smoothes fine lines & dry patches", "Imparts instant plumping effect"],
    ingredients: "Multi-weight Hyaluronic Acid Complex 2%, Provitamin B5 (Panthenol) 1%, Centella Asiatica (Cica) Extract, Green Tea Extracts",
    howToUse: "Apply 3-5 drops to damp skin morning and night after cleansing. Lock in the ultimate deep hydration immediately after with a daily moisturizer.",
    expectedResults: "Instant cooling and moisture surge upon application. Reduced appearance of fine dehydration wrinkles and absolute skin suppleness in 2 weeks.",
    size: "30 ml",
    stockStatus: "in-stock",
    description: "Formulated with a revolutionary multi-molecular weight Hyaluronic Acid complex that penetrates multiple layers of skin, delivering intense, continuous hydration. Enriched with Centella Asiatica to soothe reactive, dehydrated skin instantly.",
    gradientFrom: "#9BBEC8",
    gradientTo: "#427D9D",
    bgDecorative: "bg-[#F4EDE4]",
    shapeType: "dropper",
    faqs: [
      { question: "Should I apply Hyaluronic Acid to wet or dry skin?", answer: "Always apply on damp skin! Hyaluronic Acid is a humectant that pulls moisture into the skin. If your skin is damp, it locks in that surface moisture for maximum plumping." },
      { question: "Is this suitable for breakout-prone skin?", answer: "Absolutely. It is ultra-lightweight, 100% oil-free, non-comedogenic, and deeply soothing." }
    ],
    reviews: [
      { id: "rev-3", userName: "Priya M.", rating: 5, date: "2026-05-24", verified: true, title: "Lifesaver for dry patches", comment: "My skin used to flake under foundation. This serum fully healed my face. Absolute staple!", helpfulCount: 29, avatarColor: "bg-[#FFF5E6]" }
    ]
  },
  {
    id: "niacinamide-serum",
    name: "10% Niacinamide Pore-Refining Corrector",
    category: "serums",
    categoryLabel: "Face Serums",
    price: 949,
    originalPrice: 1099,
    rating: 4.7,
    reviewsCount: 96,
    tag: "Trending",
    skinType: "Oily, Acne-Prone, Large Pores",
    benefits: ["Tightens and minimizes enlarged pores", "Regulates sebum & oil production", "Clears acne scars & blemishes", "Improve overall skin texture & redness"],
    ingredients: "Niacinamide (Vitamin B3) 10%, Zinc PCA 1%, Licorice Root Extract, Allantoin, White Willow Bark",
    howToUse: "Apply 2-3 drops to clean, dry skin. Gentle pat thoroughly over the skin. Use daily, ideal for evening routine, followed by lightweight non-comedogenic moisturizer.",
    expectedResults: "Visible reduction in daily oil shine in 3 days. Shrinking appearance of pores and fade-out of dark sports in 3 to 4 weeks.",
    size: "30 ml",
    stockStatus: "in-stock",
    description: "An high-potency refining formulation engineered to dramatically target sebum congestion, pore congestion, and redness. Combining 10% Niacinamide with Zinc PCA, it purifies hyperactive pores, balances facial sebum chemistry, and fosters flawless skin tone.",
    gradientFrom: "#D8A47F",
    gradientTo: "#FFF5E6",
    bgDecorative: "bg-[#F8D7DA]",
    shapeType: "dropper",
    faqs: [
      { question: "What does Zinc PCA do in this serum?", answer: "Zinc PCA regulates oil gland activity, reduces acne-causing bacterial proliferation, and offers fantastic healing properties." },
      { question: "Will 10% Niacinamide cause purging?", answer: "Unlike retinol, Niacinamide does not cause true purging. It is deeply soothing. If you experience minor redness initially, scale back to once-daily use." }
    ],
    reviews: [
      { id: "rev-4", userName: "Aditya R.", rating: 5, date: "2026-06-01", verified: true, title: "Goodbye oily nose and forehead!", comment: "I've struggled with shiny skin all my life. This serum coupled with a light moisturizer keeps me matte yet glowing all day long.", helpfulCount: 34, avatarColor: "bg-[#F4EDE4]" }
    ]
  },
  {
    id: "daily-glow-moisturizer",
    name: "Ceramide Deep Barrier Moisturizer",
    category: "moisturizers",
    categoryLabel: "Moisturizers",
    price: 749,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 84,
    tag: "Best Seller",
    skinType: "Normal to Very Dry, Compromised Skin",
    benefits: ["Restores essential skin lipids", "Provides intense 48-hour locked hydration", "Improves skin suppleness & elasticity", "Locks in serum treatment benefits"],
    ingredients: "Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Squalane 3%, Shea Butter, Natural Oatmeal Colloids",
    howToUse: "Squeeze a dime-sized amount of cream. Disperse evenly on cheeks, forehead, chin, and neck. Massage in upward-outward strokes using warmth of your hands.",
    expectedResults: "Instant shield of comfort. Damaged dry regions repaired in 48 hours. Stronger skin barrier and resilience against itching, dryness, or peeling.",
    size: "50 g",
    stockStatus: "in-stock",
    description: "An incredibly luxurious, velvety barrier repair moisturizer that delivers multi-ceramide replenishment. Mimics your skin's natural lipid structure to seal deep hydration, prevent transepidermal water loss, leaving a velvety, non-greasy satin skin profile.",
    gradientFrom: "#D8A47F",
    gradientTo: "#FFFDF9",
    bgDecorative: "bg-[#F8D7DA]",
    shapeType: "jar",
    faqs: [
      { question: "What are Ceramides?", answer: "Ceramides are natural lipids that make up over 50% of your skin's outer structure. They are the 'mortar' holding skin cells together to form a healthy, hydrated epidermal shield." },
      { question: "Does this feel too heavy for summers?", answer: "No, while it is intensely restorative, the squalane infusion keeps it lightweight and rapidly absorbing, leaving absolutely no greasy residue." }
    ],
    reviews: [
      { id: "rev-5", userName: "Nisha J.", rating: 5, date: "2026-04-12", verified: true, title: "The skin barrier absolute king!", comment: "I over-exfoliated and my skin was burning. This moisturizer healed my red skin in precisely two days. I am stocking up!", helpfulCount: 55, avatarColor: "bg-[#FFF5E6]" }
    ]
  },
  {
    id: "ultra-shield-sunscreen",
    name: "Ultra Shield Matte SPF 50+ PA++++",
    category: "sunscreens",
    categoryLabel: "Sunscreens",
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 45,
    tag: "Cruelty Free",
    skinType: "All Skin Types, Anti-Pollution",
    benefits: ["Broad spectrum UVA + UVB defence", "No white cast, completely sheer", "Ultra lightweight fluid, matte touch", "Infused with blue light protection"],
    ingredients: "Zinc Oxide (Non-nano), Titanium Dioxide, Hydrolyzed Hyaluronic Acid, Resveratrol Antioxidants, Green Tea, Vitamin E",
    howToUse: "Shake well. Apply generously (two finger rule) onto clean face, neck, and ears 15 minutes before stepping into natural light. Reapply every 2 hours.",
    expectedResults: "No heavy layer or sweating. Flat-matte smooth base ready for makeup or natural skin days, with continuous UV block defense.",
    size: "50 ml",
    stockStatus: "in-stock",
    description: "A state-of-the-art hybrid physical-mineral sunscreen fluid that shields skin from harsh UVA/UVB rays and infra-red rays. Extremely light, it absorbs into a zero-white-cast matte finish, acting as an optimal protective primer.",
    gradientFrom: "#C9A227",
    gradientTo: "#FFF5E6",
    bgDecorative: "bg-[#FFFDF9]",
    shapeType: "tube",
    faqs: [
      { question: "Is this chemical or mineral?", answer: "It is a highly modern physical-hybrid sunscreen that gives supreme UV defense with the absolute lowest risk of irritation even on raw, sensitive eyes and skin." },
      { question: "Will this sunscreen sweat off?", answer: "It is formulated to be sweat and water-resistant for up to 80 minutes of activity." }
    ],
    reviews: [
      { id: "rev-6", userName: "Kriti D.", rating: 5, date: "2026-05-30", verified: true, title: "Zero white cast, genuinely!", comment: "I struggle with sunscreens making me look like a ghost. This blends into skin in under ten seconds and feels weightless.", helpfulCount: 19, avatarColor: "bg-[#F4EDE4]" }
    ]
  },
  {
    id: "gentle-foaming-cleanser",
    name: "Centella Gentle Foaming Face Wash",
    category: "face-wash",
    categoryLabel: "Face Washes",
    price: 549,
    originalPrice: 649,
    rating: 4.7,
    reviewsCount: 210,
    tag: "Daily Essential",
    skinType: "Sensitive, Dehydrated, Normal Skin",
    benefits: ["Gentle, non-stripping daily cleanse", "Maintains healthy acidic skin pH (5.5)", "Soothes active irritation & redness", "Removes light makeup & sunscreen residue"],
    ingredients: "Centella Asiatica (Cica) 2%, Provitamin B5, Chamomile Extract, Glycerin, Coco-Glucoside (Natural ultra-mild foaming surfactant)",
    howToUse: "Dispense 1-2 pumps of cleanser onto wet hands. Lather beautifully and massage gently onto wet face in circular circular gestures for 60 seconds. Rinse thoroughly with lukewarm water.",
    expectedResults: "Squeaky clean skin without the tight, stretched, dehydrated dry sensation. Immediate calming of redness.",
    size: "150 ml",
    stockStatus: "in-stock",
    description: "An exceptionally gentle, soap-free, ph 5.5 balanced daily foaming cleanser that melts surface impurities, excess sebum, and everyday pollutants without breaking your skin's vital moisture barrier. Infused dry-soothing Centella Asiatica and Chamomile.",
    gradientFrom: "#F8D7DA",
    gradientTo: "#D8A47F",
    bgDecorative: "bg-[#F4EDE4]",
    shapeType: "pump",
    faqs: [
      { question: "Is this face wash SLS-free?", answer: "Yes, it contains zero SLS, SLES, or sulfates. It uses coco-glucosides, which are botanical, biodegradable cleaning agents perfect for sensitive skin." },
      { question: "Should I double-cleanse?", answer: "If you are wearing heavy waterproof makeup or thick physical sunscreen, we recommend using a gentle cleansing balm followed by this Centella Cleanser." }
    ],
    reviews: [
      { id: "rev-7", userName: "Meera P.", rating: 5, date: "2026-04-20", verified: true, title: "Amazing pH-balanced formula!", comment: "My face feels so soft and refreshed after washing. Every other cleanser leaves me desperately rushing for moisturizer. Highly recommended!", helpfulCount: 46, avatarColor: "bg-[#F8D7DA]" }
    ]
  },
  {
    id: "salicylic-acne-care",
    name: "2% Salicylic Acid Blemish gel",
    category: "acne-care",
    categoryLabel: "Acne Care",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    reviewsCount: 78,
    tag: "Active Treatment",
    skinType: "Acne-prone, Congested, Blackhead-prone",
    benefits: ["Unclogs deep sebaceous pores", "Quickly shrinks acne spots & whiteheads", "Removes dead skin cell build-up", "Diminishes post-acne dark marks"],
    ingredients: "Salicylic Acid (BHA) 2%, Tea Tree hydrosol, Willow Bark Extract, Allantoin, Hyaluronic Acid",
    howToUse: "Use in evenings. Apply a thin layer to targeted acne zones, or pat 3-4 drops all over cleansed face. Always top with a simple lipid barrier cream.",
    expectedResults: "Noticeable reduction in acne bump sizes overnight. Blackheads reduced and clear surface skin within two weeks of targeted periodic treatment.",
    size: "30 ml",
    stockStatus: "low-stock",
    description: "An targeted acne treatment serum loaded with optimized 2% Salicylic Acid to penetrate oily sebum blockages, exfoliate dead cellular debris directly inside pores, and drastically reduce active acne breakouts and pimple discomfort.",
    gradientFrom: "#2B2B2B",
    gradientTo: "#D8A47F",
    bgDecorative: "bg-[#F4EDE4]",
    shapeType: "dropper",
    faqs: [
      { question: "Can I use Salicylic Acid in the sun?", answer: "Salicylic Acid makes your skin more sensitive to UV rays. We highly recommend utilizing it during evening cycles, and always executing rigorous daytime SPF application." },
      { question: "Is a purging phase common?", answer: "Yes. BHA speed up cell turnover, pushing latent comedones and trapped blackheads to the surface. Clean clearing is visible after 2-3 weeks of use." }
    ],
    reviews: [
      { id: "rev-8", userName: "Tushar G.", rating: 4, date: "2026-05-15", verified: true, title: "Genuinely clears active pimples!", comment: "Whenever a painful blind pimple starts developing, I dab this on. By next morning, the red swelling is flattened. Recommended spot corrector.", helpfulCount: 22, avatarColor: "bg-[#FFF5E6]" }
    ]
  },
  {
    id: "retinol-anti-aging",
    name: "0.5% Retinol Youth Renewal Cream",
    category: "anti-aging",
    categoryLabel: "Anti-Aging",
    price: 1399,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 112,
    tag: "Luxury Ritual",
    skinType: "Mature, Aging Skin, Wrinkles & Fine lines",
    benefits: ["Accelerates healthy cell regeneration", "Dramatically reduces deep wrinkles", "Boosts elasticity, firmness, and natural lift", "Smoothes skin texture & discoloration"],
    ingredients: "Micro-encapsulated Retinol 0.5%, Bakuchiol (Natural Retinol alternative) 1%, Peptides, Rosehip Oil, Hydrolyzed Collagen",
    howToUse: "Use exclusively in evening routines. Apply pea-sized amount over completely dried skin. Introduce slowly: 2 times weekly for first fortnight, building up to daily night application.",
    expectedResults: "Smoother, radiant morning skin texture. Within 6-8 weeks, visible improvement in deep expression wrinkles and enhanced skin bounce.",
    size: "50 ml",
    stockStatus: "in-stock",
    description: "Our signature gold-standard anti-aging moisturizer combines micro-encapsulated Retinol to maximize youthful cellular renewal while minimizing standard dry peeling, paired beautifully with plant-based Bakuchiol and Firming Peptides.",
    gradientFrom: "#3D2B24",
    gradientTo: "#C9A227",
    bgDecorative: "bg-[#FFF5E6]",
    shapeType: "jar",
    faqs: [
      { question: "Wait, does Retinol burn dry sensitive skins?", answer: "We use micro-encapsulation which releases retinol deeply inside skin layers slowly, decreasing irritation. Introducing it very slowly (twice weekly) minimizes peeling." },
      { question: "Why is Bakuchiol included?", answer: "Bakuchiol is a botanical antioxidant that mirrors retinol results, reinforcing fine lines fading whilst deeply hydrating skin layers." }
    ],
    reviews: [
      { id: "rev-9", userName: "Elena V.", rating: 5, date: "2026-06-03", verified: true, title: "Staggering anti-aging outcomes!", comment: "I've tried luxury retail creams priced triple. This is infinitely superior. My skin feels incredibly firm and wrinkles around my forehead are visibly smoother.", helpfulCount: 47, avatarColor: "bg-[#F8D7DA]" }
    ]
  }
];

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Best Serums for Oily and Acne-Prone Skin: A Dermatological Guide",
    excerpt: "Struggling with mid-day shine and persistent breakouts? Learn how to select smart pore-clearing active ingredients that balance sebum chemically.",
    category: "Skincare Science",
    readTime: "5 min read",
    date: "June 08, 2026",
    author: "Dr. Anjali Mehta, MD Dermatology",
    tags: ["Oily Skin", "Serums", "Niacinamide", "BHA"],
    content: "Oily skin is caused by overactive sebaceous glands producing excess oil (sebum). While sebum keeps our skin moisturized and protected, too much of it can lead to enlarged pores, blackheads, and acne flares.\n\nTo manage oily skin effectively, you should avoid heavy oils and look for non-comedogenic serums with active ingredients like Niacinamide and Salicylic Acid.\n\nNiacinamide works by regulating sebum production and tightening pores. Salicylic Acid, which is oil-soluble, penetrates deep inside the pores to dissolve sebum build-ups and remove dead skin cells. Layering these correctly can revitalize oily, acne-prone complexion."
  },
  {
    id: "blog-2",
    title: "How to Build an Elegant morning vs. evening Skincare Routine",
    excerpt: "Skincare isn't just about products; order of application is paramount. Explore the perfect daily layering routine for optimal nutrient absorption.",
    category: "Skin Rituals",
    readTime: "7 min read",
    date: "May 29, 2026",
    author: "Elena Petrova, Aesthetic Specialist",
    tags: ["Routine", "Layering", "Beginners"],
    content: "Creating a skincare routine can feel overwhelming with so many products available. The absolute gold standard rule is: go from the thinnest consistency to the thickest.\n\nMorning Routine: Focuses on Protection\n1. Cleanse: Gentle pH-balanced cleanser.\n2. Tone/Mist: For instant lightweight hydration.\n3. Active Serum: Vitamin C for antioxidant protection and brightening.\n4. Moisturize: Lock in the moisture.\n5. Protect: Apply dynamic broad-spectrum SPF 50+.\n\nEvening Routine: Focuses on Active Repair\n1. Double Cleanse: Solid balm followed by foaming face wash.\n2. Hydrate/Plump: Multi-weight Hyaluronic Acid booster.\n3. Treatment: Retinol cream (for anti-aging) or Salicylic Acid (for acne).\n4. Deep Nourish: Multi-ceramide moisturizer to rebuild skin lipids overnight."
  },
  {
    id: "blog-3",
    title: "The Incredible Power of Vitamin C Serum for Radiant Glowing Skin",
    excerpt: "Vitamin C is renowned as a cellular brightening superhero. Discover the difference between L-Ascorbic Acid and derivatives, and how to maximize glowing results.",
    category: "Ingredients Deep Dive",
    readTime: "6 min read",
    date: "May 15, 2026",
    author: "Devendra Rawat, Cosmetic Chemist",
    tags: ["Vitamin C", "Brightening", "Antioxidants"],
    content: "Vitamin C is one of the most studied and robust ingredients in skincare. It targets the enzymatic pathway of melanin production to fade age spots and post-inflammatory dark marks left by acne.\n\nHowever, L-Ascorbic Acid is notorious for being highly unstable when exposed to light and air. To maximize your results, look for Vitamin C packed inside dark amber glass dropper bottles, combined with other stabilizing antioxidants. Our 'Vitamin C Radiance Serum' combines Ferulic Acid and Vitamin E. This powerful triplet actually quadruples the antioxidant capability, giving your skin a brilliant, stable, natural glowing health."
  },
  {
    id: "blog-4",
    title: "Niacinamide vs Hyaluronic Acid: Which Hydrator is Best for Your Skin?",
    excerpt: "Can you use both or do they conflict? We compare these moisture powerhouses to see which fits your unique cutaneous barrier needs.",
    category: "Ingredients Deep Dive",
    readTime: "4 min read",
    date: "April 28, 2026",
    author: "Dr. Anjali Mehta, MD Dermatology",
    tags: ["Niacinamide", "Hyaluronic Acid", "Dehydration"],
    content: "The beautiful truth is: Niacinamide and Hyaluronic Acid are in no way competitor substances; instead, they represent the ultimate best friend pairing.\n\nWhile Hyaluronic Acid is a humectant that pulls moisture into dry, parched skin cells instantly, Niacinamide strengthens the actual cellular wall brick-and-mortar of your skin barrier by stimulating physical synthesis of ceramides. Applying Hyaluronic Acid first to hydrate skin, immediately followed by Niacinamide to seal in that moisture and repair pores, produces smooth, supple, irritation-free, radiant skin texture."
  }
];

export interface PromoOffer {
  code: string;
  discountDescription: string;
  terms: string;
  type: "flat" | "percentage" | "free-delivery";
  value: number;
  bannerGradient: string;
}

export const PROMO_OFFERS: PromoOffer[] = [
  { code: "GLOW20", discountDescription: "Flat 20% Off on all products", terms: "Flat 20% savings. Minimum cart value ₹800. Applicable on Best Sellers and Serums.", type: "percentage", value: 20, bannerGradient: "from-[#D8A47F] to-[#C9A227]" },
  { code: "FREESHIP", discountDescription: "Free Shipping on Your Entire Order", terms: "Saves standard delivery fee of ₹99. No minimum purchase required.", type: "free-delivery", value: 99, bannerGradient: "from-[#F8D7DA] to-[#D8A47F]" },
  { code: "WELCOME15", discountDescription: "15% Off for new customers", terms: "Get 15% off your very first order with Natural Glow. Join our skin-care community!", type: "percentage", value: 15, bannerGradient: "from-[#2B2B2B] to-[#D8A47F]" }
];
