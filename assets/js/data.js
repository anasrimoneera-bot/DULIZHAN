/* =============================================================================
   APXESS — Site Data  (edit visually in admin.html, or by hand here)
   -----------------------------------------------------------------------------
   This file holds EVERYTHING on the website:
     SITE     -> brand, Amazon links, social links, disclosure
     CONTENT  -> all text & images for every page (home, about, contact, shop)
     PRODUCTS -> your Amazon products

   EASIEST WAY TO EDIT: open  admin.html  in your browser. It gives you a
   visual form for every text and image on the site, with live preview, then
   exports a new copy of THIS file that you re-upload to Cloudflare.

   You can still hand-edit values below if you prefer.
   ============================================================================ */

const SITE = {
  brand: "APXESS",
  tagline: "American Caps. Built for Every Day.",
  amazonAssociateTag: "apxess-20",
  amazonStoreUrl: "https://www.amazon.com/",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    email: "hello@apxess.com"
  },
  affiliateDisclosure:
    "As an Amazon Associate, APXESS earns from qualifying purchases. " +
    "Prices and availability are accurate as of the date/time indicated and are " +
    "subject to change. Any price and availability information displayed on Amazon " +
    "at the time of purchase will apply to the purchase of this product."
};

/* All text & images per page. Edit visually in admin.html. */
const CONTENT = {
  nav: {
    home: "Home",
    shop: "Shop",
    about: "Our Story",
    contact: "Contact",
    amazonButton: "Amazon Store"
  },

  home: {
    announcement: "Free 2-day delivery with Amazon Prime · Ships across the USA 🇺🇸",
    hero: {
      eyebrow: "Est. USA · Premium Headwear",
      titleLine1: "American Caps.",
      titleLine2: "Built for Every Day.",
      subtitle:
        "APXESS makes clean, durable baseball caps designed for the daily grind and the weekend road trip. Shop the collection and check out securely on Amazon.",
      primaryButton: "Shop the Collection",
      primaryLink: "shop.html",
      secondaryButton: "Our Story",
      secondaryLink: "about.html",
      backgroundImage:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1600&q=80"
    },
    trust: [
      { icon: "🧢", title: "Premium Materials", sub: "Built to last" },
      { icon: "📦", title: "Ships via Amazon", sub: "Fast US delivery" },
      { icon: "🔄", title: "Easy Returns", sub: "Amazon-backed" },
      { icon: "⭐", title: "Loved by Thousands", sub: "Verified reviews" }
    ],
    featured: {
      eyebrow: "Fan Favorites",
      title: "Best-Selling Caps",
      subtitle:
        "Our most-loved styles, ready to ship from Amazon. Tap through to grab yours.",
      viewAllButton: "View All Caps"
    },
    story: {
      eyebrow: "The APXESS Standard",
      title: "Crafted for the Long Haul",
      paragraphs: [
        "Every APXESS cap starts with one question: would we wear it every single day? From brushed cotton twill to adjustable brass buckles, we obsess over the details so your cap looks better the longer you wear it.",
        "No gimmicks. No throwaway fashion. Just honest, well-made headwear with an all-American attitude."
      ],
      button: "Read Our Story",
      link: "about.html",
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=1000&q=80"
    },
    values: {
      eyebrow: "Why APXESS",
      title: "Made to a Higher Standard",
      cards: [
        { icon: "🏅", title: "Premium Build", text: "Heavyweight cotton, reinforced stitching, and hardware that won't quit on you." },
        { icon: "📏", title: "Perfect Fit", text: "Adjustable straps and true-to-size crowns designed to fit most heads comfortably." },
        { icon: "🇺🇸", title: "American Style", text: "Clean, bold, timeless designs inspired by classic American headwear." }
      ]
    },
    community: {
      title: "Join the APXESS Crew",
      text:
        "Follow us for new drops, exclusive Amazon deals, and behind-the-brand stories. Be first to know when a new cap lands.",
      button: "Follow on Facebook",
      backgroundImage:
        "https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&w=1600&q=80"
    }
  },

  shop: {
    heroTitle: "The Collection",
    heroSubtitle:
      "Every APXESS cap, ready to ship from Amazon. Pick your style and check out securely."
  },

  about: {
    heroTitle: "Our Story",
    heroSubtitle:
      "American attitude. Honest craftsmanship. Caps built to be worn every single day.",
    sections: [
      {
        heading: "",
        body:
          "APXESS started with a simple frustration: too many baseball caps look great on day one and fall apart by day thirty. Cheap stitching, flimsy brims, hardware that snaps. We wanted to build the cap we actually reach for every morning — one that ages well and earns its place in the rotation."
      },
      {
        heading: "Built for the Every Day",
        body:
          "We obsess over the parts most brands ignore: brushed cotton twill with a soft-yet-sturdy hand, reinforced eyelets, curved brims that hold their shape, and adjustable hardware that stays put. The result is a lineup of caps that feel broken-in from the first wear and only get better with time."
      },
      {
        heading: "An All-American Look",
        body:
          "Our designs draw from classic American headwear — clean silhouettes, bold colorways, and just enough attitude. Whether it's a low-profile dad cap, a mesh-back trucker, or a structured snapback, every APXESS piece is made to be effortless to wear and easy to love."
      },
      {
        heading: "Where to Buy",
        body:
          "We ship and fulfill through Amazon, so you get fast delivery, easy returns, and the buyer protection you already trust. Browse the collection here on our site, then tap through to check out securely on Amazon."
      }
    ],
    ctaButton: "Shop the Collection",
    ctaLink: "shop.html"
  },

  contact: {
    heroTitle: "Get in Touch",
    heroSubtitle:
      "Questions about a cap, an order, or a collaboration? We'd love to hear from you.",
    intro:
      "The fastest way to reach us is by email, or come say hi on social — that's where we post new drops, restocks, and exclusive Amazon deals first."
  },

  footer: {
    shopHeading: "Shop",
    companyHeading: "Company",
    crewHeading: "Join the Crew",
    crewText: "Follow along for drops, deals, and behind-the-brand.",
    crewButton: "Follow on Facebook"
  }
};

/* -----------------------------------------------------------------------------
   PRODUCTS  (add/edit visually in admin.html)
   amazonUrl = YOUR AFFILIATE LINK — the "View on Amazon" button target.
   ----------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "classic-navy-dad-cap",
    name: "Classic Navy Dad Cap",
    price: "$24.99",
    badge: "Best Seller",
    category: "Dad Caps",
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "A timeless low-profile dad cap in rich navy. Unstructured crown, curved brim, all-day comfort.",
    features: [
      "100% brushed cotton twill",
      "Adjustable antique-brass buckle strap",
      "Unstructured 6-panel low-profile crown",
      "Pre-curved brim, one size fits most",
      "Embroidered APXESS wordmark"
    ],
    amazonUrl: "https://www.amazon.com/"
  },
  {
    id: "stars-stripes-trucker",
    name: "Stars & Stripes Trucker",
    price: "$27.99",
    badge: "New",
    category: "Trucker",
    rating: 4.7,
    reviews: 154,
    image: "https://images.unsplash.com/photo-1620231150904-a86b9802656a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620231150904-a86b9802656a?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "Cool, breathable mesh-back trucker with a bold American-flag patch. Made for summer road trips.",
    features: [
      "Breathable mesh back panels",
      "Foam-front structured crown",
      "Snapback closure for a custom fit",
      "Woven stars & stripes patch",
      "Flat brim you can curve to taste"
    ],
    amazonUrl: "https://www.amazon.com/"
  },
  {
    id: "heritage-red-snapback",
    name: "Heritage Red Snapback",
    price: "$26.99",
    category: "Snapback",
    rating: 4.9,
    reviews: 208,
    image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "Bold structured snapback in heritage red. Flat brim, clean lines, streetwear-ready.",
    features: [
      "Structured 6-panel high-profile crown",
      "Flat brim with green undervisor",
      "Classic snapback closure",
      "Raised 3D embroidered logo",
      "Moisture-wicking sweatband"
    ],
    amazonUrl: "https://www.amazon.com/"
  },
  {
    id: "everyday-olive-cap",
    name: "Everyday Olive Cap",
    price: "$22.99",
    category: "Dad Caps",
    rating: 4.6,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "A go-anywhere olive cap that pairs with everything. Soft, washed, and lightweight.",
    features: [
      "Garment-washed soft cotton",
      "Adjustable metal slide buckle",
      "Low-profile curved brim",
      "Ventilation eyelets",
      "Tonal embroidered logo"
    ],
    amazonUrl: "https://www.amazon.com/"
  },
  {
    id: "performance-black-fitted",
    name: "Performance Black Fitted",
    price: "$29.99",
    badge: "Premium",
    category: "Fitted",
    rating: 4.8,
    reviews: 176,
    image: "https://images.unsplash.com/photo-1517941823-815bea90d291?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517941823-815bea90d291?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "Sleek all-black performance fitted cap. Lightweight, sweat-wicking, and built to move.",
    features: [
      "Lightweight performance poly-knit",
      "Sweat-wicking interior band",
      "Structured mid-profile crown",
      "Pre-curved brim",
      "Subtle tonal logo"
    ],
    amazonUrl: "https://www.amazon.com/"
  },
  {
    id: "vintage-wash-khaki",
    name: "Vintage Wash Khaki Cap",
    price: "$23.99",
    category: "Dad Caps",
    rating: 4.7,
    reviews: 121,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80"
    ],
    shortDescription:
      "Sun-faded vintage khaki with a lived-in feel. The cap that only gets better with age.",
    features: [
      "Enzyme-washed vintage finish",
      "Unstructured low crown",
      "Adjustable brass buckle",
      "Frayed-edge distressed brim",
      "Embroidered script logo"
    ],
    amazonUrl: "https://www.amazon.com/"
  }
];

/* Expose for the visual editor (admin.html). Harmless for the live site. */
if (typeof window !== "undefined") {
  window.SITE = SITE;
  window.CONTENT = CONTENT;
  window.PRODUCTS = PRODUCTS;
}
