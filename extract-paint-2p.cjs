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
  const SRC  = 'C:\\Users\\Mr.FX\\OYAKATA-com\\src\\assets\\images\\hero\\hero-paint-2p.png';
  const BASE = 'C:\\Users\\Mr.FX\\OYAKATA-com';
  const CH   = 4;

  const meta = await sharp(SRC).metadata();
  const W = meta.width, H = meta.height;
  const midH = Math.floor(H / 2);
  console.log(`Source: ${W}x${H}`);

  const { data: raw } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // x1からW、y1からy2 を切り出す
  function extractRegion(x1, y1, x2, y2) {
    const rw = x2 - x1, rh = y2 - y1;
    const buf = Buffer.alloc(rw * rh * CH);
    for (let y = 0; y < rh; y++) {
      for (let x = 0; x < rw; x++) {
        const si = ((y + y1) * W + (x + x1)) * CH;
        const di = (y * rw + x) * CH;
        buf[di] = raw[si]; buf[di+1] = raw[si+1]; buf[di+2] = raw[si+2]; buf[di+3] = 255;
      }
    }
    return { data: buf, width: rw, height: rh };
  }

  async function applyColorAlpha(region, colorFn, feather) {
    const { data, width: rw, height: rh } = region;
    const aRaw = Buffer.alloc(rw * rh);
    for (let i = 0; i < rw * rh; i++) {
      const si = i * CH;
      aRaw[i] = Math.round(clamp(colorFn(data[si], data[si+1], data[si+2]) * 255, 0, 255));
    }
    let blurred = aRaw;
    if (feather > 0) {
      blurred = await sharp(aRaw, { raw: { width: rw, height: rh, channels: 1 } })
        .blur(feather).raw().toBuffer();
    }
    const out = Buffer.alloc(rw * rh * CH);
    for (let i = 0; i < rw * rh; i++) {
      const si = i * CH;
      out[si] = data[si]; out[si+1] = data[si+1]; out[si+2] = data[si+2]; out[si+3] = blurred[i];
    }
    return { data: out, width: rw, height: rh };
  }

  async function cropToContent(region, pad = 14) {
    const { data, width: rw, height: rh } = region;
    let x0 = rw, x1 = 0, y0 = rh, y1 = 0;
    for (let y = 0; y < rh; y++) {
      for (let x = 0; x < rw; x++) {
        if (data[(y * rw + x) * CH + 3] > 6) {
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    if (x0 > x1) return region;
    x0 = Math.max(0, x0-pad); y0 = Math.max(0, y0-pad);
    x1 = Math.min(rw-1, x1+pad); y1 = Math.min(rh-1, y1+pad);
    const cw = x1-x0+1, ch = y1-y0+1;
    const out = Buffer.alloc(cw * ch * CH);
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const si = ((y+y0)*rw+(x+x0))*CH, di = (y*cw+x)*CH;
        out[di]=data[si]; out[di+1]=data[si+1]; out[di+2]=data[si+2]; out[di+3]=data[si+3];
      }
    }
    return { data: out, width: cw, height: ch };
  }

  async function save(region, relPath) {
    const full = path.join(BASE, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    await sharp(region.data, { raw: { width: region.width, height: region.height, channels: 4 } })
      .png({ compressionLevel: 9 }).toFile(full);
    console.log(`  saved: ${relPath}  (${region.width}x${region.height})`);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① ダークペイント
  //   テキストラベル列(x=0〜310)をハードクロップで除外
  //   → 左の極細ストロークは犠牲になるがペイント本体はクリーン
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n① hero-paint-dark.png');
  {
    // テキスト列をまるごと除外してから抽出
    const DARK_X = 310;
    const r = extractRegion(DARK_X, 65, W, midH);

    const m = await applyColorAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      if (s < 0.04) return 0;                     // 無彩色（白/灰/黒）→ 除外
      if (s < 0.08 && v > 0.36) return 0;         // 薄グレー → 除外
      if (h >= 183 && h <= 280 && s > 0.07) {     // 濃紺ペイント
        return clamp((s-0.05)/0.44,0,1) * clamp((v-0.02)/0.40,0,1);
      }
      if (v < 0.14 && s >= 0.04) {                // 極暗部（黒に近いペイント）
        return clamp((0.16-v)/0.13,0,1) * clamp((s-0.03)/0.12,0,1);
      }
      if (h >= 17 && h <= 80 && s > 0.50) {       // 黄色アクセント
        return clamp((s-0.46)/0.38,0,1);
      }
      return 0;
    }, 2);

    // 左端に透明パディングを付けて元の横幅比率を維持
    const c = await cropToContent(m, 14);
    const padLeft = DARK_X;
    const totalW  = padLeft + c.width;
    const padded  = Buffer.alloc(totalW * c.height * CH, 0); // 透明
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const si = (y * c.width + x) * CH;
        const di = (y * totalW + (x + padLeft)) * CH;
        padded[di] = c.data[si]; padded[di+1] = c.data[si+1];
        padded[di+2] = c.data[si+2]; padded[di+3] = c.data[si+3];
      }
    }
    await save({ data: padded, width: totalW, height: c.height },
               'src/assets/images/hero/hero-paint-dark.png');
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② イエローペイント
  //   同様にテキスト列除外
  //   黄色の飛沫が左に広がるので除外開始をやや控えめ(x=260)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n② hero-paint-yellow.png');
  {
    const YELLOW_X = 260;
    const r = extractRegion(YELLOW_X, midH + 65, W, H);

    const m = await applyColorAlpha(r, (r, g, b) => {
      const { h, s, v } = rgbToHsv(r, g, b);
      if (s < 0.04) return 0;
      if (s < 0.08 && v > 0.36) return 0;
      if (h >= 14 && h <= 92 && s > 0.17) {
        const core   = clamp((s-0.13)/0.52,0,1) * clamp((v-0.04)/0.40,0,1);
        const shadow = clamp((s-0.11)/0.20,0,0.65) * clamp((v-0.02)/0.15,0,1);
        return Math.max(core, shadow);
      }
      return 0;
    }, 3);

    const c = await cropToContent(m, 14);
    const padLeft = YELLOW_X;
    const totalW  = padLeft + c.width;
    const padded  = Buffer.alloc(totalW * c.height * CH, 0);
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const si = (y * c.width + x) * CH;
        const di = (y * totalW + (x + padLeft)) * CH;
        padded[di] = c.data[si]; padded[di+1] = c.data[si+1];
        padded[di+2] = c.data[si+2]; padded[di+3] = c.data[si+3];
      }
    }
    await save({ data: padded, width: totalW, height: c.height },
               'src/assets/images/hero/hero-paint-yellow.png');
  }

  console.log('\n完了');
}

main().catch(e => { console.error(e); process.exit(1); });
