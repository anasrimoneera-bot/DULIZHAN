/* =============================================================================
   APXESS — Visual editor (admin.html)
   Edits all text & images, saves a draft to localStorage, previews live, and
   exports a new data.js you re-upload to Cloudflare.
   ============================================================================ */
(function () {
  "use strict";

  const DRAFT_KEY = "apxess_draft";
  const clone = (x) => JSON.parse(JSON.stringify(x));

  const PUBLISHED = { SITE: clone(window.SITE), CONTENT: clone(window.CONTENT), PRODUCTS: clone(window.PRODUCTS) };

  function loadDraft() {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (d && d.SITE && d.CONTENT && d.PRODUCTS) return d;
    } catch (e) {}
    return null;
  }
  let WORK = loadDraft() || clone(PUBLISHED);

  const $ = (id) => document.getElementById(id);
  const editor = $("editor");
  const preview = $("preview");
  const pageSelect = $("pageSelect");

  /* ---- persistence + live preview ---- */
  let previewTimer, saveTimer;
  function touch() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(WORK));
      $("saveState").innerHTML = '<span class="save-dot">● 已暂存</span>';
    }, 250);
    clearTimeout(previewTimer);
    previewTimer = setTimeout(refreshPreview, 500);
  }
  function refreshPreview() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(WORK));
    preview.src = pageSelect.value + "?draft=1&t=" + Date.now();
  }

  /* ---- toast ---- */
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1900);
  }

  /* ========================= form building helpers ========================= */
  function elem(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  // Text / textarea field bound to obj[key]
  function textField(label, obj, key, opts) {
    opts = opts || {};
    const wrap = elem("label", "fld");
    wrap.appendChild(elem("span", "fld-label", label));
    const input = document.createElement(opts.textarea ? "textarea" : "input");
    if (!opts.textarea) input.type = "text";
    if (opts.placeholder) input.placeholder = opts.placeholder;
    input.value = obj[key] == null ? "" : obj[key];
    input.addEventListener("input", () => { obj[key] = input.value; touch(); });
    wrap.appendChild(input);
    return wrap;
  }

  // Image field: URL text + upload (base64) + thumbnail
  function imageField(label, obj, key) {
    const wrap = elem("div", "fld");
    wrap.appendChild(elem("span", "fld-label", label));
    const row = elem("div", "img-row");
    const thumb = document.createElement("img");
    thumb.className = "img-thumb"; thumb.alt = "";
    thumb.src = obj[key] || "";
    const input = document.createElement("input");
    input.type = "text"; input.placeholder = "粘贴图片网址 https://…";
    input.value = obj[key] || "";
    const btn = elem("button", "mini-btn", "上传");
    btn.type = "button";
    const file = document.createElement("input");
    file.type = "file"; file.accept = "image/*"; file.style.display = "none";

    input.addEventListener("input", () => { obj[key] = input.value; thumb.src = input.value; touch(); });
    btn.addEventListener("click", () => file.click());
    file.addEventListener("change", () => {
      const f = file.files[0]; if (!f) return;
      if (f.size > 1600000) toast("图片较大，建议用网址链接以免网站变慢");
      const rd = new FileReader();
      rd.onload = () => { obj[key] = rd.result; input.value = rd.result; thumb.src = rd.result; touch(); };
      rd.readAsDataURL(f);
    });
    row.appendChild(thumb); row.appendChild(input); row.appendChild(btn); row.appendChild(file);
    wrap.appendChild(row);
    return wrap;
  }

  // Generic array editor. arr = array; makeItem(item,i)->element(form); makeNew()->object
  function listEditor(arr, makeItemForm, makeNew, addLabel, titleOf) {
    const box = elem("div");
    function redraw() {
      box.innerHTML = "";
      arr.forEach((item, i) => {
        const card = elem("div", "item");
        const head = elem("div", "item-head");
        head.appendChild(elem("span", "t", titleOf ? titleOf(item, i) : "#" + (i + 1)));
        const up = elem("button", "icon-btn", "↑"); up.type = "button";
        const down = elem("button", "icon-btn", "↓"); down.type = "button";
        const del = elem("button", "icon-btn del", "✕"); del.type = "button";
        up.onclick = () => { if (i > 0) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; touch(); redraw(); } };
        down.onclick = () => { if (i < arr.length - 1) { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; touch(); redraw(); } };
        del.onclick = () => { if (confirm("确定删除这一项？")) { arr.splice(i, 1); touch(); redraw(); } };
        head.appendChild(up); head.appendChild(down); head.appendChild(del);
        card.appendChild(head);
        card.appendChild(makeItemForm(item, i, redraw));
        box.appendChild(card);
      });
      const add = elem("button", "add-btn", "+ " + addLabel); add.type = "button";
      add.onclick = () => { arr.push(makeNew()); touch(); redraw(); };
      box.appendChild(add);
    }
    redraw();
    return box;
  }

  // Simple string-array editor (features, paragraphs)
  function stringListEditor(arr, addLabel, opts) {
    return listEditor(
      arr,
      (item, i, redraw) => {
        const wrap = elem("label", "fld");
        const input = document.createElement(opts && opts.textarea ? "textarea" : "input");
        if (!opts || !opts.textarea) input.type = "text";
        input.value = item;
        input.addEventListener("input", () => { arr[i] = input.value; touch(); });
        wrap.appendChild(input);
        return wrap;
      },
      () => "",
      addLabel,
      (item) => (item || "").slice(0, 28) || "（空）"
    );
  }

  function section(title, desc, buildBody, open) {
    const det = elem("details", "sec");
    if (open) det.open = true;
    const sum = elem("summary", null, title);
    det.appendChild(sum);
    const body = elem("div", "sec-body");
    if (desc) body.appendChild(elem("p", "sec-desc", desc));
    buildBody(body);
    det.appendChild(body);
    return det;
  }
  function add2col(parent, a, b) {
    const row = elem("div", "row2"); row.appendChild(a); row.appendChild(b); parent.appendChild(row);
  }

  /* ============================= build the form ============================= */
  function build() {
    editor.innerHTML = "";
    const S = WORK.SITE, C = WORK.CONTENT, P = WORK.PRODUCTS;

    /* Brand & global */
    editor.appendChild(section("🏷️ 品牌与全局", "网站名称、亚马逊链接、社交与联盟声明", (b) => {
      add2col(b, textField("品牌名称", S, "brand"), textField("标语 Tagline", S, "tagline"));
      b.appendChild(textField("亚马逊店铺链接", S, "amazonStoreUrl"));
      add2col(b, textField("Facebook 链接", S.social, "facebook"), textField("Instagram 链接", S.social, "instagram"));
      b.appendChild(textField("联系邮箱", S.social, "email"));
      b.appendChild(textField("亚马逊联盟声明（页脚显示，必需）", S, "affiliateDisclosure", { textarea: true }));
    }, true));

    /* Nav */
    editor.appendChild(section("🧭 导航菜单文字", "顶部菜单的按钮文字", (b) => {
      add2col(b, textField("首页", C.nav, "home"), textField("商店", C.nav, "shop"));
      add2col(b, textField("品牌故事", C.nav, "about"), textField("联系", C.nav, "contact"));
      b.appendChild(textField("亚马逊按钮", C.nav, "amazonButton"));
    }));

    /* Home hero */
    editor.appendChild(section("🏠 首页 · 顶部大图区", "最显眼的首屏：标题、副标题、背景大图、按钮", (b) => {
      b.appendChild(textField("顶部横幅公告", C.home, "announcement"));
      const H = C.home.hero;
      b.appendChild(textField("小标题 Eyebrow", H, "eyebrow"));
      add2col(b, textField("大标题第一行", H, "titleLine1"), textField("大标题第二行（高亮色）", H, "titleLine2"));
      b.appendChild(textField("副标题描述", H, "subtitle", { textarea: true }));
      add2col(b, textField("主按钮文字", H, "primaryButton"), textField("主按钮链接", H, "primaryLink"));
      add2col(b, textField("次按钮文字", H, "secondaryButton"), textField("次按钮链接", H, "secondaryLink"));
      b.appendChild(imageField("背景大图", H, "backgroundImage"));
    }));

    /* Home trust */
    editor.appendChild(section("✅ 首页 · 信任徽章条", "大图下方的 4 个小图标", (b) => {
      b.appendChild(listEditor(C.home.trust,
        (it) => { const w = elem("div");
          add2col(w, textField("图标(emoji)", it, "icon"), textField("标题", it, "title"));
          w.appendChild(textField("小字", it, "sub")); return w; },
        () => ({ icon: "⭐", title: "New badge", sub: "" }),
        "添加徽章", (it) => it.title || "徽章"));
    }));

    /* Home featured heading */
    editor.appendChild(section("🧢 首页 · 热销标题区", "热销产品区上方的标题（产品在下面『产品管理』里编辑）", (b) => {
      const F = C.home.featured;
      b.appendChild(textField("小标题", F, "eyebrow"));
      b.appendChild(textField("大标题", F, "title"));
      b.appendChild(textField("描述", F, "subtitle", { textarea: true }));
      b.appendChild(textField("『查看全部』按钮", F, "viewAllButton"));
    }));

    /* Home story */
    editor.appendChild(section("📖 首页 · 品牌故事区", "左图右文的介绍区", (b) => {
      const ST = C.home.story;
      b.appendChild(textField("小标题", ST, "eyebrow"));
      b.appendChild(textField("大标题", ST, "title"));
      b.appendChild(elem("span", "fld-label", "段落（可多段）"));
      b.appendChild(stringListEditor(ST.paragraphs, "添加段落", { textarea: true }));
      add2col(b, textField("按钮文字", ST, "button"), textField("按钮链接", ST, "link"));
      b.appendChild(imageField("配图", ST, "image"));
    }));

    /* Home values */
    editor.appendChild(section("🏅 首页 · 三大卖点", "三张卖点卡片", (b) => {
      const V = C.home.values;
      b.appendChild(textField("小标题", V, "eyebrow"));
      b.appendChild(textField("大标题", V, "title"));
      b.appendChild(listEditor(V.cards,
        (it) => { const w = elem("div");
          add2col(w, textField("图标(emoji)", it, "icon"), textField("标题", it, "title"));
          w.appendChild(textField("描述", it, "text", { textarea: true })); return w; },
        () => ({ icon: "⭐", title: "New", text: "" }),
        "添加卖点", (it) => it.title || "卖点"));
    }));

    /* Home community */
    editor.appendChild(section("📣 首页 · 社群号召区", "引导关注 Facebook 的横幅", (b) => {
      const CO = C.home.community;
      b.appendChild(textField("大标题", CO, "title"));
      b.appendChild(textField("描述", CO, "text", { textarea: true }));
      b.appendChild(textField("按钮文字（链接=上面的 Facebook）", CO, "button"));
      b.appendChild(imageField("背景大图", CO, "backgroundImage"));
    }));

    /* Shop page */
    editor.appendChild(section("🛒 商店页 · 标题", null, (b) => {
      b.appendChild(textField("大标题", C.shop, "heroTitle"));
      b.appendChild(textField("副标题", C.shop, "heroSubtitle", { textarea: true }));
    }));

    /* About page */
    editor.appendChild(section("📄 品牌故事页", "About 页的标题与段落", (b) => {
      b.appendChild(textField("页面大标题", C.about, "heroTitle"));
      b.appendChild(textField("页面副标题", C.about, "heroSubtitle", { textarea: true }));
      b.appendChild(elem("span", "fld-label", "正文段落（小标题可留空）"));
      b.appendChild(listEditor(C.about.sections,
        (it) => { const w = elem("div");
          w.appendChild(textField("小标题（可留空）", it, "heading"));
          w.appendChild(textField("正文", it, "body", { textarea: true })); return w; },
        () => ({ heading: "", body: "" }),
        "添加段落", (it) => it.heading || (it.body || "").slice(0, 20) || "段落"));
      add2col(b, textField("底部按钮文字", C.about, "ctaButton"), textField("底部按钮链接", C.about, "ctaLink"));
    }));

    /* Contact page */
    editor.appendChild(section("✉️ 联系页", "邮箱/Facebook/亚马逊卡片使用上面『品牌与全局』里的链接", (b) => {
      b.appendChild(textField("页面大标题", C.contact, "heroTitle"));
      b.appendChild(textField("页面副标题", C.contact, "heroSubtitle", { textarea: true }));
      b.appendChild(textField("介绍文字", C.contact, "intro", { textarea: true }));
    }));

    /* Footer */
    editor.appendChild(section("🔻 页脚", null, (b) => {
      const F = C.footer;
      add2col(b, textField("Shop 标题", F, "shopHeading"), textField("Company 标题", F, "companyHeading"));
      b.appendChild(textField("Join the Crew 标题", F, "crewHeading"));
      b.appendChild(textField("Join the Crew 文字", F, "crewText"));
      b.appendChild(textField("Join the Crew 按钮", F, "crewButton"));
    }));

    /* Products */
    editor.appendChild(section("🧢 产品管理（重点）", "添加/编辑亚马逊产品。amazonUrl 填你的联盟推广链接。", (b) => {
      b.appendChild(listEditor(P,
        (it) => {
          const w = elem("div");
          w.appendChild(imageField("主图", it, "image"));
          w.appendChild(textField("产品名称", it, "name"));
          add2col(w, textField("价格 (如 $24.99)", it, "price"), textField("分类 (如 Dad Caps)", it, "category"));
          add2col(w, textField("角标 (如 Best Seller，可空)", it, "badge"), textField("ID (网址用，英文小写唯一)", it, "id"));
          add2col(w, textField("评分 0-5 (可空)", it, "rating"), textField("评价数 (可空)", it, "reviews"));
          w.appendChild(textField("★ 亚马逊联盟推广链接 (amazonUrl)", it, "amazonUrl"));
          w.appendChild(textField("简短描述", it, "shortDescription", { textarea: true }));
          w.appendChild(elem("span", "fld-label", "卖点清单（详情页显示）"));
          if (!Array.isArray(it.features)) it.features = [];
          w.appendChild(stringListEditor(it.features, "添加卖点"));
          w.appendChild(elem("span", "fld-label", "更多图片（详情页画廊，可选）"));
          if (!Array.isArray(it.gallery)) it.gallery = [];
          w.appendChild(listEditor(it.gallery,
            (g, gi) => imageField("图片 " + (gi + 1), it.gallery, gi),
            () => "", "添加图片", (g) => "图片"));
          return w;
        },
        () => ({
          id: "product-" + Date.now(), name: "新产品 New Product", price: "$0.00",
          category: "Dad Caps", badge: "", rating: "", reviews: "",
          image: "", shortDescription: "", features: [], gallery: [],
          amazonUrl: "https://www.amazon.com/"
        }),
        "添加产品", (it) => it.name || "产品"));
    }));

    // Normalize numeric fields on export handled in buildDataJs.
  }

  /* ============================= export data.js ============================ */
  function normalizeProducts(list) {
    return list.map((p) => {
      const q = clone(p);
      // rating/reviews as numbers if provided
      if (q.rating === "" || q.rating == null) delete q.rating; else q.rating = Number(q.rating) || q.rating;
      if (q.reviews === "" || q.reviews == null) delete q.reviews; else q.reviews = Number(q.reviews) || q.reviews;
      if (!q.badge) delete q.badge;
      if (!q.gallery || !q.gallery.length) delete q.gallery;
      return q;
    });
  }
  function buildDataJs() {
    const out = { SITE: WORK.SITE, CONTENT: WORK.CONTENT, PRODUCTS: normalizeProducts(WORK.PRODUCTS) };
    return (
      "/* =============================================================================\n" +
      "   APXESS — Site Data (generated by admin.html visual editor)\n" +
      "   Re-upload this file to Cloudflare to publish your changes.\n" +
      "   ============================================================================ */\n\n" +
      "const SITE = " + JSON.stringify(out.SITE, null, 2) + ";\n\n" +
      "const CONTENT = " + JSON.stringify(out.CONTENT, null, 2) + ";\n\n" +
      "const PRODUCTS = " + JSON.stringify(out.PRODUCTS, null, 2) + ";\n\n" +
      'if (typeof window !== "undefined") {\n' +
      "  window.SITE = SITE; window.CONTENT = CONTENT; window.PRODUCTS = PRODUCTS;\n}\n"
    );
  }
  function download(filename, text) {
    const blob = new Blob([text], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  /* ============================= toolbar wiring ============================ */
  $("btnExport").addEventListener("click", () => {
    download("data.js", buildDataJs());
    toast("已导出 data.js —— 把它放进 assets/js/ 覆盖旧文件，再整包上传 Cloudflare");
  });
  $("btnReset").addEventListener("click", () => {
    if (!confirm("放弃所有未导出的改动，恢复到当前已发布内容？")) return;
    localStorage.removeItem(DRAFT_KEY);
    WORK = clone(PUBLISHED);
    build(); refreshPreview(); toast("已恢复到已发布内容");
  });
  $("btnOpen").addEventListener("click", () => window.open(pageSelect.value + "?draft=1&t=" + Date.now(), "_blank"));
  $("btnRefresh").addEventListener("click", refreshPreview);
  pageSelect.addEventListener("change", refreshPreview);

  /* ================================= init ================================= */
  build();
  refreshPreview();
})();
