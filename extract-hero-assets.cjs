const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function rgbToHsv(r, g, b) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const delta = max - min;
  let h = 0;
  if (delta > 0) {
    if (max === r1) h = 60 * (((g1 - b1) / delta) % 6);
    else if (max === g1) h = 60 * ((b1 - r1) / delta + 2);
    else h = 60 * ((r1 - g1) / delta + 4);
    if (h < 0) h += 360;
  }
  return { h, s: max > 0 ? delta / max : 0, v: max };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

async function main() {
  const SRC = 'C:\\Users\\Mr.FX\\OYAKATA-com\\src\\assets\\images\\hero\\hero-assets-sheet.png';
  const BASE = 'C:\\Users\\Mr.FX\\OYAKATA-com';
  const CH = 4;

  const meta = await sharp(SRC).metadata();
  const W = meta.width, H = meta.height;
  const midW = Math.floor(W / 2), midH = Math.floor(H / 2);
  console.log(`Source: ${W}x${H}, mid: ${midW}x${midH}`);

  const { data: raw } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  function extractRegion(x1, y1, x2, y2) {
    const rw = x2 - x1, rh = y2 - y1;
    const buf = Buffer.alloc(rw * rh * CH);
    for (let y = 0; y < rh; y++) {
      for (let x = 0; x < rw; x++) {
        const si = ((y + y1) * W + (x + x1)) * CH;
        const di = (y * rw + x) * CH;
        buf[di] = raw[si]; buf[di+1] = raw[si+1]; buf[di+2] = raw[si+2]; buf[di+3] = raw[si+3];
      }
    }
    return { data: buf, width: rw, height: rh };
  }

  async function applyAlpha(region, maskFn, feather = 2) {
    const { data, width: rw, height: rh } = region;
    const aRaw = Buffer.alloc(rw * rh);
    for (let i = 0; i < rw * rh; i++) {
      const si = i * CH;
      aRaw[i] = Math.round(clamp(maskFn(data[si], data[si+1], data[si+2]) * 255, 0, 255));
    }
    let blurred = aRaw;
    if (feather > 0) {
      blurred = await sharp(aRaw, { raw: { width: rw, height: rh, channels: 1 } })
        .blur(feather).raw().toBuffer();
    }
    const out = Buffer.alloc(rw * rh * CH);
    for (let i = 0; i < rw * rh; i++) {
      const si = i * CH, di = i * CH;
      out[di] = data[si]; out[di+1] = data[si+1]; out[di+2] = data[si+2]; out[di+3] = blurred[i];
    }
    return { data: out, width: rw, height: rh };
  }

  async function cropToContent(region, pad = 14) {
    const { data, width: rw, height: rh } = region;
    let minX = rw, maxX = 0, minY = rh, maxY = 0;
    for (let y = 0; y < rh; y++) {
      for (let x = 0; x < rw; x++) {
        if (data[(y * rw + x) * CH + 3] > 6) {
          if (x < minX) minX = x; if (x > maxX) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        }
      }
    }
    if (minX > maxX) return region;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
    maxX = Math.min(rw-1, maxX + pad); maxY = Math.min(rh-1, maxY + pad);
    const cw = maxX - minX + 1, ch = maxY - minY + 1;
    const out = Buffer.alloc(cw * ch * CH);
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const si = ((y + minY) * rw + (x + minX)) * CH;
        const di = (y * cw + x) * CH;
        out[di] = data[si]; out[di+1] = data[si+1]; out[di+2] = data[si+2]; out[di+3] = data[si+3];
      }
    }
    return { data: out, width: cw, height: ch };
  }

  async function save(region, relPath) {
    const full = path.join(BASE, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    await sharp(region.data, { raw: { width: region.width, height: region.height, channels: 4 } })
      .png({ compressionLevel: 9 }).toFile(full);
    console.log(`  saved: ${relPath} (${region.width}x${region.height})`);
  }

  // ① Dark paint (top-left quadrant)
  console.log('\n① hero-paint-dark.png');
  {
    const r = extractRegion(0, 0, midW, midH);
    const m = await applyAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      // navy: H 185-275, S>0.12
      if (h >= 185 && h <= 275 && s > 0.10) {
        return clamp((s - 0.08) / 0.45, 0, 1) * clamp((v - 0.02) / 0.35, 0, 1);
      }
      // yellow accents within dark paint: H 20-78, S>0.30
      if (h >= 20 && h <= 80 && s > 0.28 && v > 0.10) {
        return clamp((s - 0.24) / 0.5, 0, 1);
      }
      return 0;
    }, 2);
    const c = await cropToContent(m, 14);
    await save(c, 'src/assets/images/hero/hero-paint-dark.png');
  }

  // ② Yellow paint (top-right quadrant)
  console.log('\n② hero-paint-yellow.png');
  {
    const r = extractRegion(midW, 0, W, midH);
    const m = await applyAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      if (h < 18 || h > 84) return 0;
      // core paint
      const core = clamp((s - 0.22) / 0.42, 0, 1) * clamp((v - 0.06) / 0.32, 0, 1);
      // outer glow (lower sat)
      const glow = s > 0.07 && v > 0.04
        ? clamp((s - 0.05) / 0.25, 0, 0.7) * clamp((v - 0.03) / 0.18, 0, 1)
        : 0;
      return Math.max(core, glow);
    }, 3);
    const c = await cropToContent(m, 14);
    await save(c, 'src/assets/images/hero/hero-paint-yellow.png');
  }

  // ③ Brush only (bottom-left, yellow strokes, no text)
  console.log('\n③ brush-hero-yellow.png');
  {
    const r = extractRegion(0, midH, midW, H);
    const m = await applyAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      // exclude white (もっと text)
      if (v > 0.86 && s < 0.14) return 0;
      // yellow brush H 18-80, S>0.22
      if (h >= 18 && h <= 82 && s > 0.20 && v > 0.10) {
        return clamp((s - 0.16) / 0.48, 0, 1) * clamp((v - 0.07) / 0.42, 0, 1);
      }
      return 0;
    }, 2);
    const c = await cropToContent(m, 14);
    await save(c, 'src/assets/images/ui/brush-hero-yellow.png');
  }

  // ④ Badges (bottom-right) — 3 individual same-height
  console.log('\n④ Badges');
  {
    const r = extractRegion(midW, midH, W, H);
    const m = await applyAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      // gold/wheat/amber: H 15-100, S>0.10, V>0.05
      if (h >= 14 && h <= 105 && s > 0.09 && v > 0.04) {
        return clamp((s - 0.07) / 0.42, 0, 1) * clamp((v - 0.03) / 0.32, 0, 1);
      }
      return 0;
    }, 1);

    const bw3 = Math.floor(m.width / 3);
    const badgeNames = [
      'src/assets/images/logos/badge-1-unit-price.png',
      'src/assets/images/logos/badge-2-inquiry.png',
      'src/assets/images/logos/badge-3-speed.png',
    ];

    for (let i = 0; i < 3; i++) {
      const x1 = i * bw3;
      const x2 = i < 2 ? (i + 1) * bw3 : m.width;
      const cw = x2 - x1;
      const buf = Buffer.alloc(cw * m.height * CH);
      for (let y = 0; y < m.height; y++) {
        for (let x = 0; x < cw; x++) {
          const si = (y * m.width + (x + x1)) * CH;
          const di = (y * cw + x) * CH;
          buf[di] = m.data[si]; buf[di+1] = m.data[si+1];
          buf[di+2] = m.data[si+2]; buf[di+3] = m.data[si+3];
        }
      }
      await save({ data: buf, width: cw, height: m.height }, badgeNames[i]);
    }
  }

  console.log('\n完了');
}

main().catch(e => { console.error(e); process.exit(1); });
