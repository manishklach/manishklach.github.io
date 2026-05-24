import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const writingsDir = path.join(root, "writings");
const patentsDir = path.join(root, "patents");
const siteUrl = "https://manishklach.github.io";

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const xmlEscape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const gitDate = (filePath) => {
  try {
    return execSync(`git log -1 --format=%cs -- "${filePath}"`, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "2026-04-19";
  }
};

const toRfc822 = (dateText) => new Date(`${dateText}T00:00:00Z`).toUTCString();
const safeDate = (dateText) => (/^\d{4}-\d{2}-\d{2}$/.test(dateText) ? dateText : "2026-04-19");
const pickDate = (html, filePath) => {
  const jsonLd = html.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"/i);
  if (jsonLd) return jsonLd[1];
  const articleMeta = html.match(/property="article:published_time"\s+content="(\d{4}-\d{2}-\d{2})/i);
  if (articleMeta) return articleMeta[1];
  const timeMatch = html.match(/<time[^>]*datetime="(\d{4}-\d{2}-\d{2})"/i);
  if (timeMatch) return timeMatch[1];
  return gitDate(filePath);
};

const buildCollection = (dirPath, urlPrefix) => {
  const files = fs.readdirSync(dirPath).filter((name) => name.endsWith(".html") && name !== "index.html");
  return files.map((name) => {
    const fullPath = path.join(dirPath, name);
    const html = fs.readFileSync(fullPath, "utf8");
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = stripTags(titleMatch ? titleMatch[1].replace(/\s*\|\s*Manish.*$/i, "") : name.replace(/\.html$/, ""));
    const paraMatches = [...html.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi)];
    const picked = paraMatches
      .map((match) => ({ attrs: match[1] || "", text: stripTags(match[2] || "") }))
      .find((para) => !/reading-meta|card-label|post-footer/i.test(para.attrs) && para.text.length > 40 && para.text !== "Contents");
    const description = (picked ? picked.text : title).slice(0, 500);
    const published = safeDate(pickDate(html, fullPath));
    const link = `${siteUrl}/${urlPrefix}/${name}`;
    return { title, description, published, link, fullPath };
  }).sort((a, b) => (a.published < b.published ? 1 : -1));
};

const items = buildCollection(writingsDir, "writings");
const patentItems = buildCollection(patentsDir, "patents");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MANISH AI RSS</title>
    <link>${siteUrl}/writings.html</link>
    <description>Technical essays on AI infrastructure, memory systems, runtimes, and accelerator architecture.</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822(items[0]?.published || "2026-04-19")}</lastBuildDate>
${items.map((item) => `    <item>
      <title>${xmlEscape(item.title)}</title>
      <link>${item.link}</link>
      <description>${xmlEscape(item.description)}</description>
      <pubDate>${toRfc822(item.published)}</pubDate>
      <guid>${item.link}</guid>
    </item>`).join("\n")}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(root, "feed.xml"), feed, "utf8");

const jsonFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "MANISH AI RSS",
  home_page_url: `${siteUrl}/writings.html`,
  feed_url: `${siteUrl}/feed.json`,
  description: "Technical essays on AI infrastructure, memory systems, runtimes, and accelerator architecture.",
  language: "en-us",
  authors: [{ name: "MANISH AI", url: siteUrl }],
  items: items.map((item) => ({
    id: item.link,
    url: item.link,
    title: item.title,
    content_text: item.description,
    summary: item.description,
    date_published: `${item.published}T00:00:00Z`
  }))
};

fs.writeFileSync(path.join(root, "feed.json"), `${JSON.stringify(jsonFeed, null, 2)}\n`, "utf8");

const sitemapEntries = [
  { url: `${siteUrl}/`, lastmod: safeDate(gitDate("index.html")), changefreq: "weekly", priority: "1.0" },
  { url: `${siteUrl}/writings.html`, lastmod: safeDate(gitDate("writings.html")), changefreq: "weekly", priority: "0.95" },
  { url: `${siteUrl}/patents.html`, lastmod: safeDate(gitDate("patents.html")), changefreq: "weekly", priority: "0.9" },
  ...items.map((item) => ({
    url: item.link,
    lastmod: item.published,
    changefreq: "weekly",
    priority: "0.8"
  })),
  ...patentItems.map((item) => ({
    url: item.link,
    lastmod: item.published,
    changefreq: "monthly",
    priority: "0.75"
  }))
];

const sitemap = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url><loc>${xmlEscape(entry.url)}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
