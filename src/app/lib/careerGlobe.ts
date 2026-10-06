/**
 * Canvas renderer for the home "career globe": a dotted Earth that tours the
 * career path one arc at a time, then idles in a slow spin. Drag to rotate,
 * hover (mouse) or tap (touch) a pin for its role. Framework-free — the React
 * wrapper (components/client/CareerGlobe.tsx) owns the DOM and the tooltip.
 *
 * Land comes from public/globe/land-dots.json (see scripts/generate-globe-dots.mjs).
 */
import { FINE_POINTER_QUERY } from "./useMediaQuery";

type Vec3 = [number, number, number];
type Arc = { pts: Vec3[]; midLat: number; midLon: number };
type ScreenPoint = { x: number; y: number; vis: boolean };
type DotRows = number[][];

export type GlobeStop = { lat: number; lon: number };

export type GlobeOptions = {
  stops: GlobeStop[];
  dark: boolean;
  reduced: boolean;
  dotsUrl: string;
  /** Number of arcs fully drawn so far (0 → only the first stop is reached). */
  onReached: (count: number) => void;
  /** Pin whose tooltip should show, or -1. */
  onPin: (index: number) => void;
};

export type GlobeController = {
  focus: (index: number) => void;
  setDark: (dark: boolean) => void;
  destroy: () => void;
};

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const ARC_MS = 1500;
const GAP_MS = 320;
const STEP_MS = ARC_MS + GAP_MS;
const TOUR_COLORS = [
  [163, 113, 247],
  [47, 129, 247],
  [86, 212, 221],
];

function vec(lat: number, lon: number): Vec3 {
  const a = lat * D2R;
  const b = lon * D2R;
  return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)];
}

/** Great-circle arcs between consecutive stops, lifted off the surface by length. */
function buildArcs(points: Vec3[]): Arc[] {
  const arcs: Arc[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
    const n = Math.max(10, Math.round((w * R2D) / 1.5));
    const lift = 0.03 + 0.2 * (w / Math.PI);
    const pts: Vec3[] = [];
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      let p: Vec3 = a;
      if (w >= 1e-5) {
        const s = Math.sin(w);
        const wa = Math.sin((1 - t) * w) / s;
        const wb = Math.sin(t * w) / s;
        p = [wa * a[0] + wb * b[0], wa * a[1] + wb * b[1], wa * a[2] + wb * b[2]];
      }
      const h = 1 + lift * Math.sin(Math.PI * t);
      pts.push([p[0] * h, p[1] * h, p[2] * h]);
    }
    const m = pts[Math.floor(n / 2)];
    const ml = Math.hypot(m[0], m[1], m[2]);
    arcs.push({ pts, midLat: Math.asin(m[1] / ml) * R2D, midLon: Math.atan2(m[0], m[2]) * R2D });
  }
  return arcs;
}

/** Expand run-length rows ([lat, columns, oddOffset, start, length, …]) into unit vectors. */
function decodeDots(rows: DotRows): Float32Array {
  const out: number[] = [];
  for (const [lat, n, off, ...runs] of rows) {
    for (let r = 0; r < runs.length; r += 2) {
      for (let j = runs[r]; j < runs[r] + runs[r + 1]; j++) {
        const v = vec(lat, -180 + ((j + off * 0.5) * 360) / n);
        out.push(v[0], v[1], v[2]);
      }
    }
  }
  return new Float32Array(out);
}

/** Interpolate the violet → blue → cyan tour gradient. */
function tourColor(t: number) {
  const s = Math.max(0, Math.min(1, t)) * 2;
  const i = Math.min(1, Math.floor(s));
  const f = s - i;
  return TOUR_COLORS[i].map((v, k) => Math.round(v + (TOUR_COLORS[i + 1][k] - v) * f)).join(",");
}

/**
 * On touch devices that are short on room or power (phone landscape, low core
 * count, data saver) the globe renders one still frame instead of animating.
 */
function shouldRenderStill() {
  const coarse = !window.matchMedia(FINE_POINTER_QUERY).matches;
  const landscape = window.innerWidth > window.innerHeight && window.innerHeight < 500;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const lowEnd = (!!nav.hardwareConcurrency && nav.hardwareConcurrency <= 4 && window.innerWidth < 768) || !!nav.connection?.saveData;
  return coarse && (landscape || lowEnd);
}

const angleDelta = (target: number, current: number) => ((target - current + 540) % 360) - 180;

export function createCareerGlobe(
  els: { canvas: HTMLCanvasElement; wrap: HTMLElement; tip: HTMLElement; fallback: HTMLElement | null },
  opts: GlobeOptions,
): GlobeController {
  const { canvas, wrap, tip, fallback } = els;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { focus() {}, setDark() {}, destroy() {} };

  const places = opts.stops.map((s) => ({ ...s, v: vec(s.lat, s.lon) }));
  const arcs = buildArcs(places.map((p) => p.v));
  const arcsTotal = arcs.length * STEP_MS;
  const reduced = opts.reduced;

  const g = {
    lon: -98,
    lat: 30,
    vx: 0,
    vy: 0,
    drag: null as { x: number; y: number } | null,
    down: null as { x: number; y: number } | null,
    idle: 0,
    tourOn: true,
    tourT: reduced ? 1e9 : 0,
    dots: null as Float32Array | null,
    W: 0,
    dpr: Math.min(2, window.devicePixelRatio || 1),
    hover: -1,
    sticky: false,
    focus: null as { lon: number; lat: number } | null,
    visible: true,
    last: 0,
    start: performance.now(),
    reached: -1,
    screen: [] as ScreenPoint[],
    still: shouldRenderStill(),
    drawn: false,
    dark: opts.dark,
    raf: 0,
    destroyed: false,
  };
  if (g.still) g.tourT = 1e9;

  const setPin = (i: number) => opts.onPin(i);

  const frame = (now: number) => {
    // rAF timestamps can trail a performance.now() taken earlier in the same frame; never step backwards.
    const dt = Math.max(0, Math.min(50, now - (g.last || now)));
    g.last = Math.max(g.last, now);
    if (!g.W) return;
    const still = reduced || g.still;
    const dark = g.dark;
    if (!still && (g.dots || now - g.start > 1500)) g.tourT += dt;
    const prog = arcs.map((_, i) => Math.max(0, Math.min(1, (g.tourT - i * STEP_MS) / ARC_MS)));
    const reached = prog.filter((p) => p >= 1).length;
    if (reached !== g.reached) {
      g.reached = reached;
      opts.onReached(reached);
    }

    // Camera: follow a focused pin, the tour, a drag's momentum, or drift slowly.
    const k = 1 - Math.exp(-dt / 420);
    if (g.still) {
      if (g.focus) {
        g.lon = g.focus.lon;
        g.lat = g.focus.lat;
        g.focus = null;
      }
    } else if (g.drag) {
      // Pointer handlers move the camera directly.
    } else if (g.focus) {
      g.lon += angleDelta(g.focus.lon, g.lon) * k;
      g.lat += (g.focus.lat - g.lat) * k;
      if (now > g.idle) {
        g.focus = null;
        if (g.sticky) {
          g.sticky = false;
          g.hover = -1;
          setPin(-1);
        }
      }
    } else if (g.tourOn && g.tourT < arcsTotal + 300) {
      const arc = arcs[Math.max(0, Math.min(arcs.length - 1, Math.floor(g.tourT / STEP_MS)))];
      g.lon += angleDelta(arc.midLon, g.lon) * k;
      g.lat += (Math.max(8, Math.min(42, arc.midLat)) - g.lat) * k;
    } else {
      g.tourOn = false;
      if (Math.abs(g.vx) > 0.002 || Math.abs(g.vy) > 0.002) {
        g.lon += g.vx;
        g.lat = Math.max(-40, Math.min(65, g.lat + g.vy));
        g.vx *= 0.93;
        g.vy *= 0.9;
      } else if (!reduced && now > g.idle) {
        g.lon -= dt * 0.003;
      }
    }
    if (g.sticky && !g.focus && now > g.idle + 4000) {
      g.sticky = false;
      g.hover = -1;
      setPin(-1);
    }

    const W = g.W;
    const cx = W / 2;
    const cy = W / 2;
    const R = W * 0.38;
    ctx.setTransform(g.dpr, 0, 0, g.dpr, 0, 0);
    ctx.clearRect(0, 0, W, W);
    const cl = Math.cos(g.lon * D2R);
    const sl = Math.sin(g.lon * D2R);
    const ct = Math.cos(g.lat * D2R);
    const st = Math.sin(g.lat * D2R);
    const project = (x: number, y: number, z: number): Vec3 => {
      const x1 = x * cl - z * sl;
      const z1 = z * cl + x * sl;
      return [cx + R * x1, cy - R * (y * ct - z1 * st), y * st + z1 * ct];
    };

    // Halo, sphere body, rim.
    let gr = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.32);
    gr.addColorStop(0, dark ? "rgba(163,113,247,0.34)" : "rgba(130,80,223,0.16)");
    gr.addColorStop(0.35, dark ? "rgba(47,129,247,0.14)" : "rgba(9,105,218,0.07)");
    gr.addColorStop(1, "rgba(47,129,247,0)");
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.32, 0, Math.PI * 2);
    ctx.fill();
    gr = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.45, R * 0.05, cx, cy, R * 1.02);
    gr.addColorStop(0, dark ? "#1c2333" : "#ffffff");
    gr.addColorStop(1, dark ? "#090c12" : "#e6eaef");
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    const rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    rim.addColorStop(0, dark ? "rgba(163,113,247,0.75)" : "rgba(130,80,223,0.45)");
    rim.addColorStop(1, dark ? "rgba(86,212,221,0.3)" : "rgba(9,105,218,0.25)");
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = rim;
    ctx.stroke();

    // Land dots, bucketed by depth so the far side fades.
    if (g.dots) {
      const D = g.dots;
      const n = D.length / 3;
      const size = W > 480 ? 1.7 : 1.35;
      const half = size / 2;
      const buckets: number[][] = [[], [], [], []];
      for (let i = 0; i < n; i++) {
        const x = D[i * 3];
        const y = D[i * 3 + 1];
        const z = D[i * 3 + 2];
        const x1 = x * cl - z * sl;
        const z1 = z * cl + x * sl;
        const z2 = y * st + z1 * ct;
        if (z2 <= 0.02) continue;
        buckets[Math.min(3, Math.floor(z2 * 4))].push(cx + R * x1, cy - R * (y * ct - z1 * st));
      }
      const alpha = dark ? [0.2, 0.38, 0.6, 0.85] : [0.18, 0.3, 0.45, 0.62];
      const rgb = dark ? "166,180,210" : "87,96,106";
      for (let b = 0; b < 4; b++) {
        ctx.fillStyle = `rgba(${rgb},${alpha[b]})`;
        const pts = buckets[b];
        for (let i = 0; i < pts.length; i += 2) ctx.fillRect(pts[i] - half, pts[i + 1] - half, size, size);
      }
    }

    // Arcs drawn so far; the one in progress gets a glowing head.
    const visible = (p: Vec3) => p[2] > 0 || (p[0] - cx) * (p[0] - cx) + (p[1] - cy) * (p[1] - cy) > R * R;
    arcs.forEach((arc, i) => {
      const p = prog[i];
      if (p <= 0) return;
      const n = arc.pts.length - 1;
      const upTo = p * n;
      const sp = project(...arc.pts[0]);
      const ep = project(...arc.pts[n]);
      const lg = ctx.createLinearGradient(sp[0], sp[1], ep[0], ep[1]);
      lg.addColorStop(0, "rgba(163,113,247,0.95)");
      lg.addColorStop(0.5, "rgba(47,129,247,0.95)");
      lg.addColorStop(1, "rgba(86,212,221,0.95)");
      let run: Vec3[] = [];
      const flush = () => {
        if (run.length > 1) {
          ctx.beginPath();
          ctx.moveTo(run[0][0], run[0][1]);
          for (let q = 1; q < run.length; q++) ctx.lineTo(run[q][0], run[q][1]);
          ctx.lineCap = "round";
          ctx.strokeStyle = dark ? "rgba(120,140,255,0.16)" : "rgba(9,105,218,0.12)";
          ctx.lineWidth = 6;
          ctx.stroke();
          ctx.strokeStyle = lg;
          ctx.lineWidth = 1.7;
          ctx.stroke();
        }
        run = [];
      };
      let head: Vec3 | null = null;
      for (let q = 0; q <= Math.ceil(upTo); q++) {
        let pt = arc.pts[Math.min(q, n)];
        if (q > upTo) {
          const f = upTo - (q - 1);
          const a = arc.pts[q - 1];
          pt = [a[0] + (pt[0] - a[0]) * f, a[1] + (pt[1] - a[1]) * f, a[2] + (pt[2] - a[2]) * f];
        }
        const s = project(pt[0], pt[1], pt[2]);
        if (visible(s)) {
          run.push(s);
          head = s;
        } else {
          flush();
          head = null;
        }
      }
      flush();
      if (p < 1 && head) {
        const tg = ctx.createRadialGradient(head[0], head[1], 0, head[0], head[1], 10);
        tg.addColorStop(0, "rgba(255,255,255,0.95)");
        tg.addColorStop(1, "rgba(86,212,221,0)");
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(head[0], head[1], 10, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // After the tour, a comet loops along the whole path.
    if (!still && reached === arcs.length) {
      const u = (((now / 1000) % 9) / 9) * arcs.length;
      const ai = Math.floor(u);
      const f = u - ai;
      const arc = arcs[ai];
      const q = arc.pts[Math.min(arc.pts.length - 1, Math.round(f * (arc.pts.length - 1)))];
      const s = project(q[0], q[1], q[2]);
      if (visible(s)) {
        const color = tourColor(f);
        const cg = ctx.createRadialGradient(s[0], s[1], 0, s[0], s[1], 7);
        cg.addColorStop(0, `rgba(${color},0.9)`);
        cg.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(s[0], s[1], 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Pins. The last stop (today) is green with a pulsing ring.
    places.forEach((place, i) => {
      const shown = still || i === 0 || prog[i - 1] >= 1;
      const s = project(place.v[0], place.v[1], place.v[2]);
      const vis = s[2] > 0.02 && shown;
      g.screen[i] = { x: s[0], y: s[1], vis };
      if (!vis) return;
      const last = i === places.length - 1;
      if (last) {
        const phase = still ? 0.5 : (now % 2200) / 2200;
        ctx.beginPath();
        ctx.arc(s[0], s[1], 5 + phase * 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(63,185,80,${0.85 * (1 - phase)})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      if (g.hover === i) {
        ctx.beginPath();
        ctx.arc(s[0], s[1], 9, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? "rgba(47,129,247,0.9)" : "rgba(9,105,218,0.9)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(s[0], s[1], last ? 4.6 : 3.4, 0, Math.PI * 2);
      ctx.fillStyle = last ? "#3fb950" : dark ? "#e6edf3" : "#1f2328";
      ctx.fill();
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = dark ? "rgba(13,17,23,0.9)" : "rgba(255,255,255,0.95)";
      ctx.stroke();
    });

    // Keep the tooltip above its pin, clamped inside the canvas.
    const pin = g.hover >= 0 ? g.screen[g.hover] : null;
    if (pin && pin.vis) {
      const x = Math.max(116, Math.min(W - 116, pin.x));
      tip.style.opacity = "1";
      tip.style.transform = `translate(${x}px,${pin.y}px) translate(-50%,calc(-100% - 16px))`;
    } else {
      tip.style.opacity = "0";
    }
  };

  const loop = (now: number) => {
    g.raf = requestAnimationFrame(loop);
    if (!g.visible) return;
    if (g.still && g.drawn) return;
    frame(now);
    if (g.still && g.dots) g.drawn = true;
  };
  const redraw = () => {
    g.drawn = false;
    frame(performance.now());
  };

  const resize = () => {
    const r = wrap.getBoundingClientRect();
    g.W = r.width;
    canvas.width = Math.round(r.width * g.dpr);
    canvas.height = Math.round(r.width * g.dpr);
    g.drawn = false;
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(wrap);
  resize();
  const visibilityObserver = new IntersectionObserver((entries) => entries.forEach((e) => (g.visible = e.isIntersecting)), { threshold: 0 });
  visibilityObserver.observe(wrap);

  const onWindowResize = () => {
    const still = shouldRenderStill();
    if (still !== g.still) {
      g.still = still;
      if (still) g.tourT = 1e9;
    }
    g.drawn = false;
  };
  window.addEventListener("resize", onWindowResize);

  fetch(opts.dotsUrl)
    .then((res) => res.json() as Promise<{ fine: DotRows; coarse: DotRows }>)
    .then((data) => {
      if (g.destroyed) return;
      g.dots = decodeDots(g.W < 480 ? data.coarse : data.fine);
      if (fallback) fallback.style.opacity = "0";
      redraw();
    })
    .catch(() => {
      // Keep the fallback sphere; arcs and pins still draw.
    });

  // ─── Pointer: drag to spin, hover/tap pins ──────────────────────────────
  const pointerPos = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const hitPin = (e: PointerEvent, radius: number) => {
    const [x, y] = pointerPos(e);
    let best = -1;
    let bestD = radius * radius;
    g.screen.forEach((s, i) => {
      if (!s || !s.vis) return;
      const d = (s.x - x) * (s.x - x) + (s.y - y) * (s.y - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };
  const idleCursor = () => (g.still ? "default" : "grab");

  const onDown = (e: PointerEvent) => {
    g.down = { x: e.clientX, y: e.clientY };
    if (g.still) return;
    g.drag = { x: e.clientX, y: e.clientY };
    g.vx = g.vy = 0;
    g.focus = null;
    g.tourOn = false;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // Capture is best-effort.
    }
    canvas.style.cursor = "grabbing";
  };
  const onMove = (e: PointerEvent) => {
    if (g.drag) {
      const dx = e.clientX - g.drag.x;
      const dy = e.clientY - g.drag.y;
      g.drag = { x: e.clientX, y: e.clientY };
      const k = R2D / (g.W * 0.38);
      g.lon -= dx * k;
      g.lat = Math.max(-40, Math.min(65, g.lat + dy * k));
      g.vx = -dx * k;
      g.vy = dy * k * 0.5;
      g.idle = performance.now() + 2500;
      return;
    }
    if (e.pointerType !== "mouse" || g.sticky) return;
    const best = hitPin(e, 14);
    if (best !== g.hover) {
      g.hover = best;
      g.drawn = false;
      setPin(best);
    }
    canvas.style.cursor = best >= 0 ? "pointer" : idleCursor();
  };
  const onUp = (e: PointerEvent) => {
    const start = g.down;
    g.down = null;
    g.drag = null;
    canvas.style.cursor = idleCursor();
    // A tap (barely moved) toggles the nearest pin; touch gets a bigger target.
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 6) {
      const i = hitPin(e, e.pointerType === "mouse" ? 14 : 24);
      if (i >= 0) {
        g.hover = i;
        g.sticky = true;
        g.idle = performance.now() + 2000;
        setPin(i);
      } else if (g.sticky) {
        g.sticky = false;
        g.hover = -1;
        setPin(-1);
      }
      g.drawn = false;
    }
  };
  const onCancel = () => {
    g.drag = null;
    g.down = null;
  };
  const onLeave = () => {
    if (!g.drag && !g.sticky && g.hover >= 0) {
      g.hover = -1;
      g.drawn = false;
      setPin(-1);
    }
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onCancel);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.style.cursor = idleCursor();

  g.raf = requestAnimationFrame(loop);

  return {
    /** Spin to a stop and pin its tooltip (from the stop buttons under the globe). */
    focus(i) {
      const place = places[i];
      if (!place) return;
      g.tourT = Math.max(g.tourT, arcsTotal);
      g.tourOn = false;
      g.focus = { lon: place.lon, lat: Math.max(-20, Math.min(50, place.lat)) };
      g.idle = performance.now() + 5000;
      g.hover = i;
      g.sticky = true;
      g.drawn = false;
      setPin(i);
    },
    setDark(dark) {
      if (g.dark === dark) return;
      g.dark = dark;
      redraw();
    },
    destroy() {
      g.destroyed = true;
      cancelAnimationFrame(g.raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("pointerleave", onLeave);
    },
  };
}
