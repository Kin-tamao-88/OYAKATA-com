const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pngs = [
  'src/assets/images/ui/hero-paint-dark.png',
  'src/assets/images/OC07/results-case01-30.png',
  'src/assets/images/OC07/results-case02-50.png',
  'src/assets/images/OC08/better08-genba.png',
  'src/assets/images/OC08/better08-wakate.png',
  'src/assets/images/OC09/oc09-consal.png',
];

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const rel of pngs) {
    const src = path.resolve(__dirname, rel);
    if (!fs.existsSync(src)) {
      console.log(`SKIP (not found): ${rel}`);
      continue;
    }
    const dest = src.replace(/\.png$/, '.webp');
    const sizeBefore = fs.statSync(src).size;

    await sharp(src).webp({ quality: 90, lossless: false }).toFile(dest);

    const sizeAfter = fs.statSync(dest).size;
    const saved = sizeBefore - sizeAfter;
    const pct = ((saved / sizeBefore) * 100).toFixed(1);

    fs.unlinkSync(src);

    totalBefore += sizeBefore;
    totalAfter += sizeAfter;
    results.push({ file: rel, before: sizeBefore, after: sizeAfter, saved, pct });
  }

  console.log('\n── 変換結果 ──────────────────────────────────');
  for (const r of results) {
    const b = (r.before / 1024).toFixed(0).padStart(6);
    const a = (r.after  / 1024).toFixed(0).padStart(6);
    const s = (r.saved  / 1024).toFixed(0).padStart(6);
    console.log(`${b}KB → ${a}KB  (▼${s}KB / ${r.pct}%)  ${path.basename(r.file)}`);
  }
  const totalSavedKB = ((totalBefore - totalAfter) / 1024).toFixed(0);
  const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  const beforeMB = (totalBefore / 1024 / 1024).toFixed(2);
  const afterMB  = (totalAfter  / 1024 / 1024).toFixed(2);
  console.log('──────────────────────────────────────────────');
  console.log(`合計: ${beforeMB}MB → ${afterMB}MB  (▼${totalSavedKB}KB / ${totalPct}%削減)`);
}

main().catch(console.error);
