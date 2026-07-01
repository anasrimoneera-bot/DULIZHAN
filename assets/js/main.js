/* =============================================================================
   APXESS — Site rendering. All pages are built from SITE + CONTENT + PRODUCTS
   (defined in data.js). You normally edit content in admin.html, not here.
   ============================================================================ */

/* ---------- Draft preview support (used by admin.html live preview) ----------
   Normal visitors always see the published data.js. When a page is opened with
   ?draft=1 (only the editor does this), it renders the in-progress draft saved
   in localStorage so you can preview edits before exporting. */
function loadData() {
  const base = { SITE: SITE, CONTENT: CONTENT, PRODUCTS: PRODUCTS };
  try {
    if (new URLSearchParams(location.search).has("draft")) {
      const d = JSON.parse(localStorage.getItem("apxess_draft") || "null");
      if (d && d.SITE && d.CONTENT && d.PRODUCTS) return d;
    }
  } catch (e) { /* fall back to published data */ }
  return base;
}
const DATA = loadData();
const S = DATA.SITE;
const C = DATA.CONTENT;
const P = DATA.PRODUCTS;

/* ---------- Helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function attr(s) { return String(s == null ? "" : s).replace(/"/g, "&quot;"); }

function amazonAttrs(url) {
  return `href="${attr(url)}" target="_blank" rel="sponsored nofollow noopener"`;
}
function extAttrs(url) {
  return `href="${attr(url)}" target="_blank" rel="noopener"`;
}
function starsHTML(rating) {
  if (!rating) return "";
  const full = Math.floor(rating), half = rating - full >= 0.5;
  let s = "";
  for (let i = 0; i < 5; i++) s += i < full ? "★" : (i === full && half ? "⯪" : "☆");
  return s;
}
function getProduct(id) { return P.find((p) => p.id === id); }

/* ---------- Header ---------- */
function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const ann = C.home && C.home.announcement ? C.home.announcement : "";
  mount.innerHTML = `
    ${ann ? `<div class="announcement-bar">${esc(ann)}</div>` : ""}
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="${attr(S.brand)} home">
          <span class="brand-mark">▲</span>
          <span class="brand-name">${esc(S.brand)}</span>
        </a>
        <nav class="main-nav" id="main-nav">
          <a href="index.html">${esc(C.nav.home)}</a>
          <a href="shop.html">${esc(C.nav.shop)}</a>
          <a href="about.html">${esc(C.nav.about)}</a>
          <a href="contact.html">${esc(C.nav.contact)}</a>
        </nav>
        <div class="header-actions">
          <a class="btn btn-amazon btn-sm" ${amazonAttrs(S.amazonStoreUrl)}>${esc(C.nav.amazonButton)}</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>`;
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

/* ---------- Footer ---------- */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const f = C.footer, year = new Date().getFullYear();
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col">
          <div class="brand footer-brand">
            <span class="brand-mark">▲</span><span class="brand-name">${esc(S.brand)}</span>
          </div>
          <p class="footer-tagline">${esc(S.tagline)}</p>
          <div class="social-row">
            <a ${extAttrs(S.social.facebook)}>Facebook</a>
            <a ${extAttrs(S.social.instagram)}>Instagram</a>
            <a href="mailto:${attr(S.social.email)}">Email</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${esc(f.shopHeading)}</h4>
          <a href="shop.html">All Caps</a>
          <a href="shop.html?category=Dad%20Caps">Dad Caps</a>
          <a href="shop.html?category=Snapback">Snapbacks</a>
          <a href="shop.html?category=Trucker">Truckers</a>
        </div>
        <div class="footer-col">
          <h4>${esc(f.companyHeading)}</h4>
          <a href="about.html">${esc(C.nav.about)}</a>
          <a href="contact.html">${esc(C.nav.contact)}</a>
          <a ${amazonAttrs(S.amazonStoreUrl)}>${esc(C.nav.amazonButton)}</a>
        </div>
        <div class="footer-col">
          <h4>${esc(f.crewHeading)}</h4>
          <p class="footer-tagline">${esc(f.crewText)}</p>
          <a class="btn btn-outline btn-sm" ${extAttrs(S.social.facebook)}>${esc(f.crewButton)}</a>
        </div>
      </div>
      <div class="disclosure"><div class="container"><p>${esc(S.affiliateDisclosure)}</p></div></div>
      <div class="copyright"><div class="container">
        © ${year} ${esc(S.brand)}. All rights reserved. ·
        Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
      </div></div>
    </footer>`;
}

/* ---------- Product card ---------- */
function productCardHTML(p) {
  const badge = p.badge ? `<span class="card-badge">${esc(p.badge)}</span>` : "";
  const rating = p.rating
    ? `<div class="card-rating"><span class="stars">${starsHTML(p.rating)}</span>
         <span class="rating-num">${esc(p.rating)}</span>
         ${p.reviews ? `<span class="rating-count">(${esc(p.reviews)})</span>` : ""}</div>` : "";
  return `
    <article class="product-card">
      <a class="card-media" href="product.html?id=${encodeURIComponent(p.id)}">
        ${badge}<img src="${attr(p.image)}" alt="${attr(p.name)}" loading="lazy">
      </a>
      <div class="card-body">
        <span class="card-cat">${esc(p.category || "")}</span>
        <h3 class="card-title"><a href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
        ${rating}
        <div class="card-price">${esc(p.price)}</div>
        <div class="card-actions">
          <a class="btn btn-outline btn-block" href="product.html?id=${encodeURIComponent(p.id)}">Details</a>
          <a class="btn btn-amazon btn-block" ${amazonAttrs(p.amazonUrl)}>View on Amazon</a>
        </div>
      </div>
    </article>`;
}

/* ---------- Home page ---------- */
function renderHome() {
  const mount = document.getElementById("home");
  if (!mount) return;
  const h = C.home;

  const trust = h.trust.map((t) => `
    <div class="trust-item"><span class="ico">${esc(t.icon)}</span>
      <div><strong>${esc(t.title)}</strong><small>${esc(t.sub)}</small></div></div>`).join("");

  const values = h.values.cards.map((v) => `
    <div class="value-card"><div class="ico">${esc(v.icon)}</div>
      <h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div>`).join("");

  const storyParas = (h.story.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("");

  mount.innerHTML = `
    <section class="hero" id="home-hero">
      <div class="container"><div class="hero-inner">
        <span class="eyebrow">${esc(h.hero.eyebrow)}</span>
        <h1>${esc(h.hero.titleLine1)}<br><span>${esc(h.hero.titleLine2)}</span></h1>
        <p>${esc(h.hero.subtitle)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="${attr(h.hero.primaryLink)}">${esc(h.hero.primaryButton)}</a>
          <a class="btn btn-outline btn-lg" href="${attr(h.hero.secondaryLink)}" style="color:#fff;border-color:#fff;">${esc(h.hero.secondaryButton)}</a>
        </div>
      </div></div>
    </section>

    <section class="trust-strip"><div class="container"><div class="trust-grid">${trust}</div></div></section>

    <section class="section"><div class="container">
      <div class="section-head">
        <span class="eyebrow">${esc(h.featured.eyebrow)}</span>
        <h2>${esc(h.featured.title)}</h2>
        <p>${esc(h.featured.subtitle)}</p>
      </div>
      <div class="product-grid" id="featured-grid"></div>
      <div style="text-align:center; margin-top:44px;">
        <a class="btn btn-navy btn-lg" href="shop.html">${esc(h.featured.viewAllButton)}</a>
      </div>
    </div></section>

    <section><div class="container-fluid split reverse">
      <div class="split-media" id="home-story-media"></div>
      <div class="split-body bg-cream">
        <span class="eyebrow">${esc(h.story.eyebrow)}</span>
        <h2>${esc(h.story.title)}</h2>
        ${storyParas}
        <div><a class="btn btn-primary" href="${attr(h.story.link)}">${esc(h.story.button)}</a></div>
      </div>
    </div></section>

    <section class="section" style="background:var(--sand);"><div class="container">
      <div class="section-head">
        <span class="eyebrow">${esc(h.values.eyebrow)}</span>
        <h2>${esc(h.values.title)}</h2>
      </div>
      <div class="values-grid">${values}</div>
    </div></section>

    <section class="section community" id="home-community"><div class="container">
      <h2>${esc(h.community.title)}</h2>
      <p>${esc(h.community.text)}</p>
      <a class="btn btn-amazon btn-lg" ${extAttrs(S.social.facebook)}>${esc(h.community.button)}</a>
    </div></section>`;

  // Background images (set as inline style so they're editable via CONTENT)
  const hero = document.getElementById("home-hero");
  if (hero) hero.style.backgroundImage =
    `linear-gradient(90deg, rgba(15,37,69,0.92) 0%, rgba(15,37,69,0.55) 60%, rgba(15,37,69,0.25) 100%), url("${h.hero.backgroundImage}")`;
  const storyMedia = document.getElementById("home-story-media");
  if (storyMedia) storyMedia.style.backgroundImage = `url("${h.story.image}")`;
  const community = document.getElementById("home-community");
  if (community) community.style.backgroundImage =
    `linear-gradient(rgba(15,37,69,0.9), rgba(15,37,69,0.9)), url("${h.community.backgroundImage}")`;

  // Featured products (first 3)
  const fg = document.getElementById("featured-grid");
  if (fg) fg.innerHTML = P.slice(0, 3).map(productCardHTML).join("");
}

/* ---------- Shop page ---------- */
function renderShopPage() {
  const mount = document.getElementById("shop-page");
  if (!mount) return;
  mount.innerHTML = `
    <section class="shop-hero"><div class="container">
      <h1>${esc(C.shop.heroTitle)}</h1>
      <p>${esc(C.shop.heroSubtitle)}</p>
    </div></section>
    <section class="section"><div class="container">
      <div class="shop-filters" id="shop-filters"></div>
      <div class="product-grid" id="shop-grid"></div>
    </div></section>`;

  const grid = document.getElementById("shop-grid");
  const filterMount = document.getElementById("shop-filters");
  const categories = ["All", ...new Set(P.map((p) => p.category).filter(Boolean))];
  let active = new URLSearchParams(location.search).get("category") || "All";
  if (!categories.includes(active)) active = "All";

  function draw() {
    filterMount.innerHTML = categories.map((c) =>
      `<button class="filter-chip ${c === active ? "active" : ""}" data-cat="${attr(c)}">${esc(c)}</button>`).join("");
    filterMount.querySelectorAll(".filter-chip").forEach((b) =>
      b.addEventListener("click", () => { active = b.dataset.cat; draw(); }));
    const list = active === "All" ? P : P.filter((p) => p.category === active);
    grid.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<p class="empty">No products in this collection yet.</p>`;
  }
  draw();
}

/* ---------- About page ---------- */
function renderAbout() {
  const mount = document.getElementById("about-page");
  if (!mount) return;
  const a = C.about;
  const sections = (a.sections || []).map((s) =>
    `${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}<p>${esc(s.body)}</p>`).join("");
  mount.innerHTML = `
    <section class="page-hero"><div class="container">
      <h1>${esc(a.heroTitle)}</h1><p>${esc(a.heroSubtitle)}</p>
    </div></section>
    <section class="section"><div class="container prose">
      ${sections}
      <div style="text-align:center; margin-top:36px;">
        <a class="btn btn-primary btn-lg" href="${attr(a.ctaLink)}">${esc(a.ctaButton)}</a>
      </div>
    </div></section>`;
}

/* ---------- Contact page ---------- */
function renderContact() {
  const mount = document.getElementById("contact-page");
  if (!mount) return;
  const c = C.contact;
  mount.innerHTML = `
    <section class="page-hero"><div class="container">
      <h1>${esc(c.heroTitle)}</h1><p>${esc(c.heroSubtitle)}</p>
    </div></section>
    <section class="section"><div class="container prose" style="text-align:center;">
      <p>${esc(c.intro)}</p>
      <div class="contact-cards">
        <div class="contact-card"><div class="ico">✉️</div><h3>Email Us</h3>
          <p><a href="mailto:${attr(S.social.email)}">${esc(S.social.email)}</a></p></div>
        <div class="contact-card"><div class="ico">👍</div><h3>Facebook</h3>
          <p><a ${extAttrs(S.social.facebook)}>Follow the crew</a></p></div>
        <div class="contact-card"><div class="ico">🛒</div><h3>Amazon Store</h3>
          <p><a ${amazonAttrs(S.amazonStoreUrl)}>Shop on Amazon</a></p></div>
      </div>
    </div></section>`;
}

/* ---------- Product detail page ---------- */
function renderProductDetail() {
  const mount = document.getElementById("product-detail");
  if (!mount) return;
  const p = getProduct(new URLSearchParams(location.search).get("id"));
  if (!p) {
    mount.innerHTML = `<div class="container section"><h1>Product not found</h1>
      <p>We couldn't find that cap. <a href="shop.html">Browse the shop →</a></p></div>`;
    return;
  }
  document.title = `${p.name} · ${S.brand}`;
  const gallery = (p.gallery && p.gallery.length ? p.gallery : [p.image]);
  const thumbs = gallery.map((src, i) =>
    `<button class="thumb ${i === 0 ? "active" : ""}" data-src="${attr(src)}">
       <img src="${attr(src)}" alt="${attr(p.name)} view ${i + 1}" loading="lazy"></button>`).join("");
  const rating = p.rating
    ? `<div class="detail-rating"><span class="stars">${starsHTML(p.rating)}</span>
        <span class="rating-num">${esc(p.rating)}</span>
        ${p.reviews ? `<span class="rating-count">${esc(p.reviews)} reviews</span>` : ""}</div>` : "";
  const features = (p.features || []).map((f) => `<li>${esc(f)}</li>`).join("");

  mount.innerHTML = `
    <div class="container">
      <nav class="breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${esc(p.name)}</span></nav>
      <div class="product-layout">
        <div class="gallery">
          <div class="gallery-main"><img id="gallery-main-img" src="${attr(gallery[0])}" alt="${attr(p.name)}"></div>
          <div class="gallery-thumbs">${thumbs}</div>
        </div>
        <div class="product-info">
          ${p.badge ? `<span class="card-badge inline">${esc(p.badge)}</span>` : ""}
          <span class="card-cat">${esc(p.category || "")}</span>
          <h1 class="product-name">${esc(p.name)}</h1>
          ${rating}
          <div class="product-price">${esc(p.price)}</div>
          <p class="product-desc">${esc(p.shortDescription || "")}</p>
          <ul class="product-features">${features}</ul>
          <a class="btn btn-amazon btn-lg btn-block" ${amazonAttrs(p.amazonUrl)}>View on Amazon →</a>
          <p class="buy-note">You'll be securely redirected to Amazon to complete your purchase. No account needed here.</p>
        </div>
      </div>
    </div>`;

  mount.querySelectorAll(".thumb").forEach((t) =>
    t.addEventListener("click", () => {
      mount.querySelector("#gallery-main-img").src = t.dataset.src;
      mount.querySelectorAll(".thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
    }));

  const relMount = document.getElementById("related-grid");
  if (relMount) relMount.innerHTML = P.filter((x) => x.id !== p.id).slice(0, 3).map(productCardHTML).join("");
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderHome();
  renderShopPage();
  renderAbout();
  renderContact();
  renderProductDetail();
});
