import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("./src/assets/images");
const destDir = path.resolve("./dist/assets/static-images");

fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file} → public/static-images/`);
});
