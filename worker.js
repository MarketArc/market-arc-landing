import { ARTICLES } from "./articles.js";

const ROBOTS = `User-agent: *
Allow: /
Sitemap: https://market-arc.net/sitemap.xml
`;

function buildSitemap() {
  const urls = [
    "https://market-arc.net/",
    "https://market-arc.net/blog",
    ...ARTICLES.map((a) => `https://market-arc.net/blog/${a.slug}`),
  ];
  const entries = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

const SHARED_CSS = `
:root{--navy:#132540;--navy2:#0F1E30;--beige:#F5F0E8;--beige2:#EDE7DC;--gold:#B8960C;--gold2:#D4A820;--gold-light:rgba(184,150,12,0.12);--gold-dim:rgba(184,150,12,0.4);--white:#F2F0EB;--white2:rgba(242,240,235,0.7);--white3:rgba(242,240,235,0.4);--line:rgba(184,150,12,0.1);--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--beige);color:var(--navy);line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:var(--gold);text-decoration:none}
a:hover{text-decoration:underline}
nav{position:sticky;top:0;z-index:100;padding:18px 40px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);background:var(--navy)}
nav .logo{display:flex;align-items:center}
nav .logo a{display:block;line-height:0}
nav .logo img{display:block;height:40px;width:auto}
nav .nav-links{display:flex;align-items:center;gap:24px}
nav .nav-links a{font-size:14px;color:var(--white2)}
nav .nav-links a:hover{color:var(--gold);text-decoration:none}
nav .nav-cta{background:var(--gold);color:var(--navy);padding:9px 22px;border-radius:6px;font-size:14px;font-weight:600}
nav .nav-cta:hover{opacity:.85;text-decoration:none}
.wrap{max-width:760px;margin:0 auto;padding:60px 24px 80px}
.eyebrow{font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
h1{font-family:var(--serif);font-size:clamp(34px,5.5vw,56px);line-height:1.08;letter-spacing:-.02em;color:var(--navy);margin-bottom:18px;font-weight:700}
.meta{font-size:13px;color:rgba(19,37,64,0.55);margin-bottom:40px;letter-spacing:.04em}
article h2{font-family:var(--serif);font-size:clamp(24px,3.2vw,32px);line-height:1.2;letter-spacing:-.01em;color:var(--navy);margin:40px 0 14px;font-weight:700}
article p{font-size:17px;color:rgba(19,37,64,0.82);margin-bottom:18px}
article ol,article ul{margin:0 0 22px 22px}
article li{font-size:17px;color:rgba(19,37,64,0.82);margin-bottom:10px}
article strong{color:var(--navy);font-weight:600}
article em{color:var(--navy);font-style:italic}
table.cmp{width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;background:#fff;border:1px solid rgba(19,37,64,.08)}
table.cmp th,table.cmp td{padding:10px 12px;text-align:left;border-bottom:1px solid rgba(19,37,64,.06)}
table.cmp th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);font-weight:600;background:var(--beige2)}
table.cmp tr:last-child td{border-bottom:none}
table.cmp td.y{color:var(--gold);font-weight:600}
table.cmp td.n{color:rgba(19,37,64,.3)}
.cta-box{margin:48px 0 0;padding:32px;background:var(--navy);border-radius:10px;text-align:center;border:1px solid var(--gold-dim)}
.cta-box h3{font-family:var(--serif);font-size:26px;color:var(--white);margin-bottom:8px;font-weight:600}
.cta-box p{color:var(--white2);margin-bottom:20px;font-size:15px}
.cta-box a.btn{display:inline-block;background:var(--gold);color:var(--navy);padding:12px 28px;border-radius:6px;font-weight:600;font-size:15px}
.cta-box a.btn:hover{opacity:.9;text-decoration:none}
.list .post{padding:28px 0;border-bottom:1px solid rgba(19,37,64,.08)}
.list .post:last-child{border-bottom:none}
.list .post h2{font-family:var(--serif);font-size:28px;line-height:1.2;color:var(--navy);margin-bottom:8px;font-weight:700}
.list .post h2 a{color:var(--navy)}
.list .post h2 a:hover{color:var(--gold);text-decoration:none}
.list .post .pmeta{font-size:13px;color:rgba(19,37,64,.5);margin-bottom:10px}
.list .post .excerpt{font-size:16px;color:rgba(19,37,64,.7)}
footer{padding:32px 24px;border-top:1px solid rgba(19,37,64,.08);text-align:center;font-size:13px;color:rgba(19,37,64,.5)}
footer a{color:rgba(19,37,64,.7)}
@media(max-width:640px){nav{padding:14px 18px}nav .nav-links{gap:16px}.wrap{padding:40px 18px 60px}}
`;

function layout({ title, description, canonical, ogTitle, ogDescription, content }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const c = escapeAttr(canonical);
  const ogt = escapeAttr(ogTitle || title);
  const ogd = escapeAttr(ogDescription || description);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t}</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${c}">
<meta property="og:title" content="${ogt}">
<meta property="og:description" content="${ogd}">
<meta property="og:type" content="article">
<meta property="og:url" content="${c}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogt}">
<meta name="twitter:description" content="${ogd}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>${SHARED_CSS}</style>
</head>
<body>
<nav>
  <div class="logo"><a href="/"><img src="/market-arc-logo-dark.svg" width="180" height="53" alt="Market Arc"></a></div>
  <div class="nav-links">
    <a href="/#how-it-works">How It Works</a>
    <a href="https://app.market-arc.net/stores">Stores</a>
    <a href="/#pricing">Pricing</a>
    <a href="https://app.market-arc.net/login">Sign in</a>
    <a href="https://app.market-arc.net/register" class="nav-cta">Start Free</a>
  </div>
</nav>
${content}
<footer>&copy; 2026 Market Arc &middot; <a href="/">Home</a> &middot; <a href="/blog">Blog</a></footer>
</body>
</html>`;
}

function ctaBox() {
  return `<div class="cta-box">
  <h3>Start tracking prices free</h3>
  <p>Install Market Arc and watch prices on 120+ UK stores. Free tier tracks 3 products.</p>
  <a class="btn" href="https://market-arc.net/#pricing">Install Market Arc &rarr;</a>
</div>`;
}

function renderBlogIndex() {
  const items = [...ARTICLES]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (a) => `<div class="post">
  <h2><a href="/blog/${a.slug}">${a.title}</a></h2>
  <div class="pmeta">${formatDate(a.date)}</div>
  <p class="excerpt">${a.excerpt}</p>
</div>`,
    )
    .join("\n");
  const content = `<main class="wrap">
  <div class="eyebrow">Blog</div>
  <h1>Notes on price tracking, deal hunting, and UK retail.</h1>
  <div class="meta">Written by the Market Arc team.</div>
  <div class="list">${items}</div>
</main>`;
  return layout({
    title: "Blog — Market Arc",
    description: "Notes on price tracking, deal hunting, and UK retail from the Market Arc team.",
    canonical: "https://market-arc.net/blog",
    content,
  });
}

function renderArticle(a) {
  const content = `<main class="wrap">
  <div class="eyebrow">Article</div>
  <h1>${a.title}</h1>
  <div class="meta">${formatDate(a.date)} &middot; Market Arc team</div>
  <article>${a.body}${ctaBox()}</article>
</main>`;
  return layout({
    title: `${a.title} — Market Arc`,
    description: a.description,
    canonical: `https://market-arc.net/blog/${a.slug}`,
    ogTitle: a.title,
    ogDescription: a.description,
    content,
  });
}

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/sitemap.xml") {
      return new Response(buildSitemap(), {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      });
    }
    if (path === "/robots.txt") {
      return new Response(ROBOTS, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    if (path === "/blog") {
      return html(renderBlogIndex());
    }
    if (path.startsWith("/blog/")) {
      const slug = path.slice("/blog/".length);
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) return html(renderArticle(article));
      return html(
        layout({
          title: "Not found — Market Arc",
          description: "Article not found.",
          canonical: `https://market-arc.net${path}`,
          content: `<main class="wrap"><h1>Not found</h1><p>That article doesn't exist. <a href="/blog">Back to blog</a>.</p></main>`,
        }),
        404,
      );
    }

    return env.ASSETS.fetch(request);
  },
};
