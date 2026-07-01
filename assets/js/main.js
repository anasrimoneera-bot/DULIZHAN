/* =============================================================================
   APXESS — Site logic (header, footer, product rendering)
   You normally do NOT need to edit this file. Manage content in data.js.
   ============================================================================ */

/* ---------- Small helpers ---------- */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function amazonLinkAttrs(url) {
  // rel="sponsored nofollow" is best practice for affiliate links.
  return `href="${url}" target="_blank" rel="sponsored nofollow noopener"`;
}

function starsHTML(rating) {
  if (!rating) return "";
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = "";
  for (let i = 0; i < 5; i++) {
    if (i < full) s += "★";
    else if (i === full && half) s += "⯪";
    else s += "☆";
  }
  return s;
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ---------- Header ---------- */
function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  mount.innerHTML = `
    <div class="announcement-bar">
      Free 2-day delivery with Amazon Prime · Ships across the USA 🇺🇸
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="${SITE.brand} home">
          <span class="brand-mark">▲</span>
          <span class="brand-name">${SITE.brand}</span>
        </a>
        <nav class="main-nav" id="main-nav">
          <a href="index.html">Home</a>
          <a href="shop.html">Shop</a>
          <a href="about.html">Our Story</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="header-actions">
          <a class="btn btn-amazon btn-sm" ${amazonLinkAttrs(SITE.amazonStoreUrl)}>
            Amazon Store
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>`;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

/* ---------- Footer ---------- */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const year = new Date().getFullYear();
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col">
          <div class="brand footer-brand">
            <span class="brand-mark">▲</span>
            <span class="brand-name">${SITE.brand}</span>
          </div>
          <p class="footer-tagline">${SITE.tagline}</p>
          <div class="social-row">
            <a ${amazonLinkAttrs(SITE.social.facebook)} aria-label="Facebook">Facebook</a>
            <a ${amazonLinkAttrs(SITE.social.instagram)} aria-label="Instagram">Instagram</a>
            <a href="mailto:${SITE.social.email}" aria-label="Email">Email</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="shop.html">All Caps</a>
          <a href="shop.html?category=Dad%20Caps">Dad Caps</a>
          <a href="shop.html?category=Snapback">Snapbacks</a>
          <a href="shop.html?category=Trucker">Truckers</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">Our Story</a>
          <a href="contact.html">Contact</a>
          <a ${amazonLinkAttrs(SITE.amazonStoreUrl)}>Amazon Store</a>
        </div>
        <div class="footer-col">
          <h4>Join the Crew</h4>
          <p class="footer-tagline">
            Follow along for drops, deals, and behind-the-brand.
          </p>
          <a class="btn btn-outline btn-sm" ${amazonLinkAttrs(SITE.social.facebook)}>
            Follow on Facebook
          </a>
        </div>
      </div>
      <div class="disclosure">
        <div class="container">
          <p>${SITE.affiliateDisclosure}</p>
        </div>
      </div>
      <div class="copyright">
        <div class="container">
          © ${year} ${SITE.brand}. All rights reserved. ·
          Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </div>
      </div>
    </footer>`;
}

/* ---------- Product card ---------- */
function productCardHTML(p) {
  const badge = p.badge ? `<span class="card-badge">${p.badge}</span>` : "";
  const rating = p.rating
    ? `<div class="card-rating"><span class="stars">${starsHTML(p.rating)}</span>
         <span class="rating-num">${p.rating}</span>
         ${p.reviews ? `<span class="rating-count">(${p.reviews})</span>` : ""}</div>`
    : "";
  return `
    <article class="product-card">
      <a class="card-media" href="product.html?id=${p.id}">
        ${badge}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="card-body">
        <span class="card-cat">${p.category || ""}</span>
        <h3 class="card-title">
          <a href="product.html?id=${p.id}">${p.name}</a>
        </h3>
        ${rating}
        <div class="card-price">${p.price}</div>
        <div class="card-actions">
          <a class="btn btn-outline btn-block" href="product.html?id=${p.id}">Details</a>
          <a class="btn btn-amazon btn-block" ${amazonLinkAttrs(p.amazonUrl)}>View on Amazon</a>
        </div>
      </div>
    </article>`;
}

/* ---------- Featured grid (home) ---------- */
function renderFeatured(limit) {
  const mount = document.getElementById("featured-grid");
  if (!mount) return;
  const list = PRODUCTS.slice(0, limit || 3);
  mount.innerHTML = list.map(productCardHTML).join("");
}

/* ---------- Full shop grid + filters ---------- */
function renderShop() {
  const mount = document.getElementById("shop-grid");
  if (!mount) return;

  const filterMount = document.getElementById("shop-filters");
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category).filter(Boolean))];

  const params = new URLSearchParams(location.search);
  let active = params.get("category") || "All";
  if (!categories.includes(active)) active = "All";

  function draw() {
    if (filterMount) {
      filterMount.innerHTML = categories
        .map(
          (c) =>
            `<button class="filter-chip ${c === active ? "active" : ""}" data-cat="${c}">${c}</button>`
        )
        .join("");
      filterMount.querySelectorAll(".filter-chip").forEach((b) =>
        b.addEventListener("click", () => {
          active = b.dataset.cat;
          draw();
        })
      );
    }
    const list = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
    mount.innerHTML = list.length
      ? list.map(productCardHTML).join("")
      : `<p class="empty">No products in this collection yet.</p>`;
  }
  draw();
}

/* ---------- Product detail page ---------- */
function renderProductDetail() {
  const mount = document.getElementById("product-detail");
  if (!mount) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id);

  if (!p) {
    mount.innerHTML = `
      <div class="container section">
        <h1>Product not found</h1>
        <p>We couldn't find that cap. <a href="shop.html">Browse the shop →</a></p>
      </div>`;
    return;
  }

  document.title = `${p.name} · ${SITE.brand}`;

  const gallery = (p.gallery && p.gallery.length ? p.gallery : [p.image]);
  const thumbs = gallery
    .map(
      (src, i) =>
        `<button class="thumb ${i === 0 ? "active" : ""}" data-src="${src}">
           <img src="${src}" alt="${p.name} view ${i + 1}" loading="lazy"></button>`
    )
    .join("");

  const rating = p.rating
    ? `<div class="detail-rating"><span class="stars">${starsHTML(p.rating)}</span>
        <span class="rating-num">${p.rating}</span>
        ${p.reviews ? `<span class="rating-count">${p.reviews} reviews</span>` : ""}</div>`
    : "";

  const features = (p.features || [])
    .map((f) => `<li>${f}</li>`)
    .join("");

  mount.innerHTML = `
    <div class="container">
      <nav class="breadcrumb">
        <a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${p.name}</span>
      </nav>
      <div class="product-layout">
        <div class="gallery">
          <div class="gallery-main">
            <img id="gallery-main-img" src="${gallery[0]}" alt="${p.name}">
          </div>
          <div class="gallery-thumbs">${thumbs}</div>
        </div>
        <div class="product-info">
          ${p.badge ? `<span class="card-badge inline">${p.badge}</span>` : ""}
          <span class="card-cat">${p.category || ""}</span>
          <h1 class="product-name">${p.name}</h1>
          ${rating}
          <div class="product-price">${p.price}</div>
          <p class="product-desc">${p.shortDescription || ""}</p>
          <ul class="product-features">${features}</ul>
          <a class="btn btn-amazon btn-lg btn-block" ${amazonLinkAttrs(p.amazonUrl)}>
            View on Amazon →
          </a>
          <p class="buy-note">
            You'll be securely redirected to Amazon to complete your purchase.
            No account needed here.
          </p>
        </div>
      </div>
    </div>`;

  // Gallery thumbnail switching
  mount.querySelectorAll(".thumb").forEach((t) =>
    t.addEventListener("click", () => {
      mount.querySelector("#gallery-main-img").src = t.dataset.src;
      mount.querySelectorAll(".thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
    })
  );

  // Related products
  const relMount = document.getElementById("related-grid");
  if (relMount) {
    const related = PRODUCTS.filter((x) => x.id !== p.id).slice(0, 3);
    relMount.innerHTML = related.map(productCardHTML).join("");
  }
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderFeatured(3);
  renderShop();
  renderProductDetail();
});
