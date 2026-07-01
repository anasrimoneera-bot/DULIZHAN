# APXESS — Amazon Affiliate Brand Storefront

An American-style, WordPress-inspired flagship storefront for the **APXESS**
baseball cap brand. Built as a lightweight static website: no database, no
server, no build step. It exists to **showcase your Amazon products** and send
visitors to Amazon via your **affiliate (Associate) links** — there is no
checkout or payment on this site by design.

Perfect for a Facebook → private community → storefront funnel: you drive
traffic here, people browse the caps, and tap **"View on Amazon"** to buy.

---

## ✨ Features

- **English by default**, American brand styling (navy / red / cream).
- Fully responsive (desktop, tablet, mobile).
- Home, Shop (with category filters), Product detail, About, and Contact pages.
- **Every product has an affiliate button** that opens its Amazon page in a new
  tab with `rel="sponsored nofollow"` (best practice for Amazon Associates).
- Add / edit / remove products by editing **one file** — no coding required.
- Amazon Associates **affiliate disclosure** included in the footer (required
  for program approval).

---

## 🚀 View the site locally

Because it's plain HTML/CSS/JS, just open `index.html` in a browser. For links
between pages to work perfectly, run a tiny local server:

```bash
# From the project folder:
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🧢 How to add or edit products (the only file you touch)

Open **`assets/js/data.js`**. Inside the `PRODUCTS` array, copy one product
block, paste it, and change the values:

```js
{
  id: "my-new-cap",                 // unique, lowercase, no spaces
  name: "My New Cap",
  price: "$25.99",
  badge: "New",                     // optional: "Best Seller", "New", etc.
  category: "Snapback",             // used by the shop filter
  rating: 4.8,                      // optional
  reviews: 120,                     // optional
  image: "https://.../photo.jpg",   // main photo (URL or assets/img/file.jpg)
  gallery: ["https://.../a.jpg"],   // optional extra photos
  shortDescription: "One-line pitch for the cap.",
  features: ["Feature 1", "Feature 2"],
  amazonUrl: "https://www.amazon.com/dp/XXXX/?tag=apxess-20"  // YOUR AFFILIATE LINK
}
```

The **`amazonUrl`** is the most important field — that's where the "View on
Amazon" button sends the customer. Paste the affiliate link you generate from
your Amazon Associates dashboard (it usually ends with `?tag=yourtag-20`).

### Using your own product photos
Drop image files into `assets/img/` and reference them like
`image: "assets/img/my-cap.jpg"`.

---

## ⚙️ Site settings

Also in `assets/js/data.js`, the `SITE` object controls global settings:

| Field | What it does |
|-------|--------------|
| `brand`, `tagline` | Brand name and slogan shown in header/footer |
| `amazonAssociateTag` | Your Associate tag (e.g. `apxess-20`) |
| `amazonStoreUrl` | Link to your full Amazon storefront |
| `social.facebook` / `instagram` / `email` | Your community + contact links |
| `affiliateDisclosure` | The Amazon-required disclosure text in the footer |

**Set your Facebook link** in `social.facebook` so the "Follow on Facebook"
buttons point to your page/group for the private-community funnel.

---

## 📄 Pages

| File | Page |
|------|------|
| `index.html` | Homepage — hero, best sellers, brand story, community CTA |
| `shop.html` | Full catalog with category filters |
| `product.html` | Product detail (reads `?id=` from the URL) |
| `about.html` | Brand story |
| `contact.html` | Contact + social links |

You don't edit these for products — they render automatically from `data.js`.

---

## 🌐 Publishing (free options)

This is a static site, so you can host it anywhere:

- **GitHub Pages** — push this repo, enable Pages on your branch.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect
  the repo. No build settings needed.

---

## ✅ Amazon Associates checklist

- [x] Real, working affiliate links on every product (`amazonUrl`).
- [x] Affiliate disclosure visible in the footer (already included).
- [x] Original brand content (About page, product copy).
- [x] Clear navigation and a real domain when you go live.

> **Note:** The demo uses placeholder Amazon links (`https://www.amazon.com/`)
> and stock photos. Replace them with your real APXESS product links and photos
> before applying to the Associates program.
