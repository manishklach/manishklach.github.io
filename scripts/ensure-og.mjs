import fs from "fs";
import path from "path";

const root = process.cwd();
const writingsDir = path.join(root, "writings");
const ogDir = path.join(root, "og");
const defaultOg = path.join(ogDir, "og-default.png");
const fallbackOg = path.join(root, "assets", "og-image.png");

fs.mkdirSync(ogDir, { recursive: true });
if (!fs.existsSync(defaultOg) && fs.existsSync(fallbackOg)) {
  fs.copyFileSync(fallbackOg, defaultOg);
}

for (const name of fs.readdirSync(writingsDir)) {
  if (!name.endsWith(".html")) continue;
  const slug = name.replace(/\.html$/i, "");
  const target = path.join(ogDir, `${slug}.png`);
  if (!fs.existsSync(target) && fs.existsSync(defaultOg)) {
    fs.copyFileSync(defaultOg, target);
  }
}
