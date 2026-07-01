/* =============================================================================
   APXESS — Site Data
   -----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO MANAGE YOUR STORE.

   1) SITE CONFIG  -> brand name, Amazon Associate tag, social links, disclosure
   2) PRODUCTS     -> add / remove / edit your Amazon products here

   HOW TO ADD A PRODUCT:
   Copy one { ... } block inside the PRODUCTS array, paste it, and change the
   values. The most important field is "amazonUrl" — paste your Amazon Associate
   (affiliate) product link there. That is where the "View on Amazon" button
   will send your customer.

   TIP: Keep "id" unique (lowercase, no spaces). It is used in the product page
   URL, e.g. product.html?id=classic-navy-dad-cap
   ============================================================================ */

const SITE = {
  brand: "APXESS",
  tagline: "American Caps. Built for Every Day.",
  // Your Amazon Associates storefront / tag. Optional — used for the
  // "Shop our full Amazon store" links. Example: "apxess-20"
  amazonAssociateTag: "apxess-20",
  // Link to your full Amazon Associates storefront (optional).
  amazonStoreUrl: "https://www.amazon.com/",
  // Social / community links (your Facebook matrix + private community).
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    email: "hello@apxess.com"
  },
  // Amazon Associates requires this disclosure to be visible on your site.
  affiliateDisclosure:
    "As an Amazon Associate, APXESS earns from qualifying purchases. " +
    "Prices and availability are accurate as of the date/time indicated and are " +
    "subject to change. Any price and availability information displayed on Amazon " +
    "at the time of purchase will apply to the purchase of this product."
};

/* -----------------------------------------------------------------------------
   PRODUCTS
   image      : main product photo (use a full URL or a file in assets/img/)
   gallery    : (optional) extra photos shown on the product page
   badge      : (optional) small label e.g. "Best Seller", "New"
   rating     : (optional) 0–5, e.g. 4.7
   reviews    : (optional) number of reviews
   category   : used by the shop filter (e.g. "Dad Caps", "Snapback", "Trucker")
   features   : bullet points shown on the product page
   amazonUrl  : YOUR AFFILIATE LINK — the "View on Amazon" button target
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
