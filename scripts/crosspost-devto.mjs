import fs from "fs";
import path from "path";

const apiKey = process.env.DEVTO_API_KEY;
const siteUrl = "https://manishklach.github.io";
const files = process.argv.slice(2).filter((file) => /^writings\/.+\.html$/i.test(file));

if (!apiKey) {
  console.log("DEVTO_API_KEY not set; skipping cross-post.");
  process.exit(0);
}

if (!files.length) {
  console.log("No changed writings to cross-post.");
  process.exit(0);
}

const decode = (text) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const strip = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );

const convert = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<form[\s\S]*?<\/form>/gi, "")
      .replace(/<div[^>]*id="webmentions"[\s\S]*?<\/div>/gi, "")
      .replace(/<div[^>]*class="site-tools"[\s\S]*?<\/div>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<hr\s*\/?>/gi, "")
      .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => `\n\`\`\`\n${strip(code)}\n\`\`\`\n`)
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, text) => `\n## ${strip(text)}\n`)
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n### ${strip(text)}\n`)
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => `\n- ${strip(text)}`)
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${strip(text)}](${href})`)
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => `\n${strip(text)}\n`)
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }
  return response.json();
};

const existing = await request("https://dev.to/api/articles/me/all?per_page=1000");

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  const html = fs.readFileSync(fullPath, "utf8");
  const title = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [null, path.basename(file, ".html")])[1]);
  const description = strip((html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) || [null, title])[1]);
  const article = (html.match(/<(article|main)[^>]*data-pagefind-body[^>]*>([\s\S]*?)<\/\1>/i) || html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i) || [null, null, html])[2];
  const markdown = `> Originally published at [manishklach.github.io](${siteUrl}/${file.replace(/\\/g, "/")})\n\n${convert(article)}`;
  const canonical = `${siteUrl}/${file.replace(/\\/g, "/")}`;
  const payload = {
    article: {
      title,
      body_markdown: markdown,
      published: true,
      canonical_url: canonical,
      tags: ["machinelearning", "systems", "llm", "kernel"]
    }
  };
  const match = existing.find((item) => item.canonical_url === canonical);
  if (match) {
    await request(`https://dev.to/api/articles/${match.id}`, { method: "PUT", body: JSON.stringify(payload) });
    console.log(`Updated ${canonical}`);
  } else {
    const created = await request("https://dev.to/api/articles", { method: "POST", body: JSON.stringify(payload) });
    console.log(`Created ${created.url || canonical}`);
  }
}
