// Regenerates public/globe/land-dots.json — the land mask the hero globe draws.
//
// The globe used to rasterise world-atlas with d3 in the browser on every visit.
// This precomputes the same sampling once, so the page ships ~3 KB (gzipped) of
// run-length-encoded rows and no d3 at runtime.
//
// Run (the deps are only needed for this script, so they are not in package.json):
//   npm i --no-save d3-geo@3 topojson-client@3 world-atlas@2
//   node scripts/generate-globe-dots.mjs
//
// Output: { fine: Row[], coarse: Row[] }, Row = [lat, columns, oddRowOffset, ...runs]
// where runs are [startColumn, length] pairs of land cells. `fine` is the 1.3°
// grid used on wide canvases, `coarse` the 1.9° grid used below 480px.
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve("world-atlas/countries-110m.json"), "utf8"));
const land = feature(topo, topo.objects.countries);

function sample(step) {
  const rows = [];
  let dots = 0;
  for (let la = -57; la <= 83; la += step) {
    const c = Math.cos((la * Math.PI) / 180);
    const n = Math.max(1, Math.round((360 * c) / step));
    const off = Math.round(la / step) % 2 ? 1 : 0;
    const runs = [];
    let start = -1;
    for (let j = 0; j <= n; j++) {
      const lo = -180 + ((j + off * 0.5) * 360) / n;
      const on = j < n && land.features.some((f) => geoContains(f, [lo, la]));
      if (on && start < 0) start = j;
      if (!on && start >= 0) {
        runs.push(start, j - start);
        dots += j - start;
        start = -1;
      }
    }
    if (runs.length) rows.push([Math.round(la * 1000) / 1000, n, off, ...runs]);
  }
  return { rows, dots };
}

const fine = sample(1.3);
const coarse = sample(1.9);
writeFileSync(new URL("../public/globe/land-dots.json", import.meta.url), JSON.stringify({ fine: fine.rows, coarse: coarse.rows }));
console.log(`fine: ${fine.dots} dots, coarse: ${coarse.dots} dots`);
