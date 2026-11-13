/**
 * Landing Page Central Configuration & Data Store
 * All text, navigation links, brand identity, and section configs are managed here.
 * No hardcoded strings in component templates.
 */

export const brandConfig = {
  name: "MAయ",
  teluguName: "originals",
  subTagline: "STREETWEAR CULT",
  tagline: "Raw Telugu Streetwear Cultured in Black, Red & White",
  logo: {
    text: "MAYA",
    teluguSubtext: "మాయ",
  }
};

export const navbarData = {
  navLinks: [
    { id: "Men", label: "Hero", teluguLabel: "పురుషులు", href: "#men", badge: "NEW" },
    { id: "Women", label: "Heroine", teluguLabel: "మహిళలు", href: "#women" },
    { id: "kids", label: "Kids", teluguLabel: "పిల్లలు", href: "#kids" },
  ],
  search: {
    placeholder: "Search T-shirts, latest drops...",
    ariaLabel: "Search store"
  },
  actions: {
    wishlist: {
      ariaLabel: "Wishlist"
    },
    cart: {
      ariaLabel: "Shopping Cart"
    },
    auth: {
      loginLabel: "Login",
      profileLabel: "Account",
      profileName: "Vikram R.",
      isLoggedInDefault: false // Focused on Login button as requested
    }
  }
};

export const data = {
  caption: {
    line1: "Not another Trend",
    line2: "Not another Copy",
    prefix: "JUST",
    brand: brandConfig.name
  },
  actions: {
    primary: {
      label: "EXPLORE COLLECTION",
      href: "#collections-section"
    }
  }
};

export const productStoryData = {
  eyebrow: "THE DETAILS",
  title: "Made to be seen.",
  description: "A closer look at the MAAYA statement tee.",
  frontImage: "/images/tshirt_artwork_front.png",
  backImage: "/images/tshirt_artwork_back.png",
  features: [
    {
      id: "color",
      label: "COLOR",
      title: "Crimson, with contrast",
      description: "A vivid red base set off by black and white artwork.",
      side: "left",
    },
    {
      id: "print",
      label: "PRINT STYLE",
      title: "Telugu-led graphic",
      description: "Expressive lettering and brushstroke graphics bring the design to life.",
      side: "right",
    },
    {
      id: "fabric",
      label: "FABRIC & FEEL",
      title: "Made for everyday wear",
      description: "A comfortable-feel tee with an easy, relaxed drape.",
      side: "left",
    },
    {
      id: "neckline",
      label: "NECKLINE",
      title: "Ribbed crew neck",
      description: "A classic crew shape finished with a neat ribbed collar.",
      side: "right",
    },
  ],
};

export const collectionsData = {
  id: "collections-section",
  title: "Explore Categories",
  women: {
    id: "women",
    image: "/images/Women_Collection.png",
    imageAlt: "MAAYA Women and Kids Streetwear Collection",
    action: {
      label: "EXPLORE WOMEN & KIDS COLLECTION",
      href: "#women",
    },
  },
  men: {
    id: "men",
    image: "/images/Men_Collection.png",
    imageAlt: "MAAYA Men Streetwear Collection",
    action: {
      label: "EXPLORE MEN COLLECTION",
      href: "#men",
    },
  },
};

export const productRailData = {
  id: "product-rail-section",
  eyebrow: "T-Shirt Categories",
  title: "Explore T-shirt Categories",
  subtitle: "Browse the rail. Hover for a front view, then select a piece to update its details.",
  categories: [
    {
      id: "oversized",
      label: "OVERSIZED",
      title: "Oversized T-Shirts",
      description: "Relaxed, boxy silhouettes with room to move and bold MAAYA graphics made to stand out.",
      href: "#collections-section",
      count: 4,
      badge: "MOST POPULAR",
    },
    {
      id: "sweatshirts",
      label: "SWEATSHIRTS",
      title: "Sweatshirts",
      description: "Weighty fleece layers with a relaxed streetwear fit, designed for comfort and cooler days.",
      href: "#collections-section",
      count: 4,
      badge: "NEW HEAVYWEAR",
    },
    {
      id: "sleeveless",
      label: "SLEEVELESS",
      title: "Sleeveless Tops",
      description: "Easy, breathable cuts for warm days, movement, and effortless streetwear layering.",
      href: "#collections-section",
      count: 4,
      badge: "SUMMER DROP",
    }
  ],
  products: {
    oversized: [
      {
        id: "ov-1",
        category: "oversized",
        name: "MAAYA Cult Signature Boxy Tee",
        teluguName: "మాయ సిగ్నేచర్ టీ",
        tag: "HOT DROP",
        price: "₹2,499",
        originalPrice: "₹3,499",
        discount: "28% OFF",
        description: "Engineered with exaggerated drop shoulders and a structured boxy silhouette. Features custom Telugu typographic chest embroidery and our iconic oversized back graphic.",
        fabric: "280 GSM 100% Combed Ring-Spun Cotton",
        fit: "Ultra-Relaxed Boxy Fit (Size down for regular fit)",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "oversized",
        colors: [
          { name: "Crimson Red", hex: "#ab1f26", active: true },
          { name: "Obsidian Black", hex: "#0f1013" },
          { name: "Ghost White", hex: "#f1f3f5" },
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        hangAngle: -2.5,
      },
      {
        id: "ov-2",
        category: "oversized",
        name: "Obsidian Shadow Telugu Calligraphy Tee",
        teluguName: "కాల్లిగ్రఫీ బ్లాక్ టీ",
        tag: "LIMITED EDITION",
        price: "₹2,699",
        originalPrice: "₹3,599",
        discount: "25% OFF",
        description: "Dense obsidian black garment dyed with soft mineral wash. High-density crimson and white Telugu calligraphy on back with minimal front micro-branding.",
        fabric: "290 GSM Heavy Single Jersey Cotton",
        fit: "Signature Oversized Dropped Silhouette",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "oversized",
        colors: [
          { name: "Obsidian Black", hex: "#0f1013", active: true },
          { name: "Charcoal Slate", hex: "#27272a" },
          { name: "Crimson Red", hex: "#ab1f26" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 1.8,
      },
      {
        id: "ov-3",
        category: "oversized",
        name: "Ghost White Raw Script Heavy Tee",
        teluguName: "గోస్ట్ వైట్ స్క్రిప్ట్ టీ",
        tag: "STREET CULTURE",
        price: "₹2,399",
        originalPrice: "₹3,199",
        discount: "25% OFF",
        description: "Clean optical white canvas contrasted with raw brushstroke typography in deep crimson and charcoal. Pre-shrunk with seamless side construction.",
        fabric: "260 GSM Heavyweight Organic Cotton",
        fit: "Wide-Chested Streetwear Cut",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "oversized",
        colors: [
          { name: "Ghost White", hex: "#f8fafc", active: true },
          { name: "Vintage Bone", hex: "#e2e8f0" },
          { name: "Obsidian Black", hex: "#0f1013" },
        ],
        sizes: ["S", "M", "L", "XL"],
        hangAngle: -1.2,
      },
      {
        id: "ov-4",
        category: "oversized",
        name: "Acid Wash Rebel Statement Tee",
        teluguName: "యాసిడ్ వాష్ రెబెల్ టీ",
        tag: "RESTOCKED",
        price: "₹2,799",
        originalPrice: "₹3,699",
        discount: "24% OFF",
        description: "Individually hand-treated acid wash finish giving each piece a unique smoky patina. Finished with distressed ribbed collar and twin-needle hems.",
        fabric: "300 GSM Heavyweight French Knit",
        fit: "Oversized Street Cut with Extended Sleeves",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "oversized",
        colors: [
          { name: "Acid Smoke", hex: "#222328", active: true },
          { name: "Crimson Wash", hex: "#8b1319" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 2.4,
      },
    ],
    sweatshirts: [
      {
        id: "sw-1",
        category: "sweatshirts",
        name: "Garuda Heavy Fleece Street Hoodie",
        teluguName: "గరుడ హెవీ హూడీ",
        tag: "WINTER DROP",
        price: "₹4,299",
        originalPrice: "₹5,499",
        discount: "22% OFF",
        description: "450 GSM ultra-dense loopback fleece with double-lined hood and dropped shoulders. Massive back artwork featuring traditional Telugu heritage reinterpreted for cyberpunk streets.",
        fabric: "450 GSM Heavy Loopback French Terry",
        fit: "Boxy Heavyweight Drop-Shoulder Fit",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sweatshirt",
        colors: [
          { name: "Pitch Black", hex: "#0a0a0c", active: true },
          { name: "Crimson Blaze", hex: "#ab1f26" },
          { name: "Heather Slate", hex: "#3f3f46" },
        ],
        sizes: ["S", "M", "L", "XL", "2XL"],
        hangAngle: -3.0,
      },
      {
        id: "sw-2",
        category: "sweatshirts",
        name: "Blood Red Heritage Crewneck",
        teluguName: "బ్లడ్ రెడ్ క్రూనెక్",
        tag: "ICONIC",
        price: "₹3,799",
        originalPrice: "₹4,899",
        discount: "22% OFF",
        description: "Vibrant crimson heavy crewneck sweater with thick ribbed cuffs and neck. Features tonal embroidery on chest with high-density Telugu screenprint across the back.",
        fabric: "400 GSM 100% Cotton Terry",
        fit: "Relaxed Boxy Streetwear Silhouette",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sweatshirt",
        colors: [
          { name: "Blood Crimson", hex: "#ab1f26", active: true },
          { name: "Night Black", hex: "#0c0d10" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 1.5,
      },
      {
        id: "sw-3",
        category: "sweatshirts",
        name: "Deconstructed Vintage Zip Fleece",
        teluguName: "జిప్ ఫ్లీస్ స్వెట్‌షర్ట్",
        tag: "RAW FINISH",
        price: "₹4,599",
        originalPrice: "₹5,899",
        discount: "22% OFF",
        description: "Quarter-zip pullover with industrial custom matte hardware, raw edge seam accents, and vintage wash treatment. Premium internal brushed fleece for extreme comfort.",
        fabric: "420 GSM Brushed Cotton Fleece",
        fit: "Vintage Oversized Cut",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sweatshirt",
        colors: [
          { name: "Charcoal Dust", hex: "#1e1e24", active: true },
          { name: "Bone White", hex: "#e2e8f0" },
        ],
        sizes: ["S", "M", "L", "XL"],
        hangAngle: -1.7,
      },
      {
        id: "sw-4",
        category: "sweatshirts",
        name: "Telugu Kult Monogram Oversized Pullover",
        teluguName: "కల్ట్ మోనోగ్రామ్ పుల్లోవర్",
        tag: "NEW RELEASE",
        price: "₹3,999",
        originalPrice: "₹5,199",
        discount: "23% OFF",
        description: "Signature drop-tail pullover sweater with embroidered Telugu monogram crest and bold back typographic typography. Ribbed gussets along sides for full movement.",
        fabric: "410 GSM Organic Cotton Fleece",
        fit: "Engineered Street Slouch Fit",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sweatshirt",
        colors: [
          { name: "Onyx Black", hex: "#09090b", active: true },
          { name: "Deep Ruby", hex: "#8b1319" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 2.6,
      },
    ],
    sleeveless: [
      {
        id: "sl-1",
        category: "sleeveless",
        name: "Raw Edge Drop-Armhole Muscle Tee",
        teluguName: "రా ఎడ్జ్ మజిల్ టీ",
        tag: "STREET ESSENTIAL",
        price: "₹1,899",
        originalPrice: "₹2,499",
        discount: "24% OFF",
        description: "Deep-cut armholes with intentional raw-rolled edges. Built for gym or summer street layering. Features vertical Telugu typography running down spine.",
        fabric: "240 GSM Combed Jersey Cotton",
        fit: "Athletic Street Cut / Deep Drop Armhole",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sleeveless",
        colors: [
          { name: "Crimson Red", hex: "#ab1f26", active: true },
          { name: "Pitch Black", hex: "#0c0d10" },
          { name: "Chalk White", hex: "#f8fafc" },
        ],
        sizes: ["S", "M", "L", "XL"],
        hangAngle: -2.0,
      },
      {
        id: "sl-2",
        category: "sleeveless",
        name: "Shadow Kult Heavyweight Cutoff Tank",
        teluguName: "షాడో కల్ట్ కటాఫ్ ట్యాంక్",
        tag: "LIMITED DROP",
        price: "₹1,999",
        originalPrice: "₹2,699",
        discount: "26% OFF",
        description: "Heavy cotton sleeveless streetwear top with wide shoulder straps and relaxed drape. High-contrast white and red calligraphy print across chest.",
        fabric: "260 GSM Heavy Single Jersey",
        fit: "Boxy Square Shoulder Cut",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sleeveless",
        colors: [
          { name: "Pitch Black", hex: "#0c0d10", active: true },
          { name: "Blood Crimson", hex: "#ab1f26" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 1.9,
      },
      {
        id: "sl-3",
        category: "sleeveless",
        name: "Ghost White Rebel Layering Vest",
        teluguName: "రెబెల్ లేయరింగ్ వెస్ట్",
        tag: "TRENDING",
        price: "₹1,899",
        originalPrice: "₹2,399",
        discount: "21% OFF",
        description: "Optical white heavy jersey sleeveless tee with distressed hemline and subtle split side vents. Engineered to layer cleanly under unbuttoned overshirts.",
        fabric: "240 GSM Ring-Spun Cotton",
        fit: "Relaxed Straight Cut",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sleeveless",
        colors: [
          { name: "Ghost White", hex: "#f8fafc", active: true },
          { name: "Pitch Black", hex: "#0c0d10" },
        ],
        sizes: ["S", "M", "L", "XL"],
        hangAngle: -1.4,
      },
      {
        id: "sl-4",
        category: "sleeveless",
        name: "Cyber Telugu Heavy Cutoff Hoodie",
        teluguName: "కటాఫ్ హూడీ వెస్ట్",
        tag: "CULT FAVORITE",
        price: "₹2,799",
        originalPrice: "₹3,599",
        discount: "22% OFF",
        description: "Hybrid sleeveless fleece hoodie with raw-cut oversized armholes and spacious hood with metal-tipped drawstrings. Authentic Telugu statement back print.",
        fabric: "360 GSM French Terry Fleece",
        fit: "Oversized Sleeveless Hoodie Cut",
        frontImage: "/images/tshirt_artwork_front_cutout.png",
        backImage: "/images/tshirt_artwork_back.png",
        type: "sleeveless",
        colors: [
          { name: "Obsidian Black", hex: "#09090b", active: true },
          { name: "Crimson Red", hex: "#ab1f26" },
          { name: "Smoke Slate", hex: "#27272a" },
        ],
        sizes: ["M", "L", "XL", "2XL"],
        hangAngle: 2.1,
      },
    ],
  },
};

export const landingData = {
  brand: brandConfig,
  navbar: navbarData,
  hero: data,
  productStory: productStoryData,
  collections: collectionsData,
  productRail: productRailData,
};
