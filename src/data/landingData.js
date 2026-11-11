/**
 * Landing Page Central Configuration & Data Store
 * All text, navigation links, brand identity, and section configs are managed here.
 * No hardcoded strings in component templates.
 */

export const brandConfig = {
  name: "MAAYA",
  teluguName: "మాయ",
  subTagline: "STREETWEAR CULT",
  tagline: "Raw Telugu Streetwear Cultured in Black, Red & White",
  logo: {
    text: "MAAYA",
    teluguSubtext: "మాయ",
  }
};

export const navbarData = {
  navLinks: [
    { id: "men", label: "Men", teluguLabel: "పురుషులు", href: "#men", badge: "NEW" },
    { id: "women", label: "Women", teluguLabel: "మహిళలు", href: "#women" },
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
      href: "#shop-now"
    }
  }
};

export const productStoryData = {
  eyebrow: "THE DETAILS",
  title: "Made to be seen.",
  description: "A closer look at the MAAYA statement tee.",
  frontImage: "/images/tshirt_artwork_front_cutout.png",
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

export const landingData = {
  brand: brandConfig,
  navbar: navbarData,
  hero: data,
  productStory: productStoryData,
};
