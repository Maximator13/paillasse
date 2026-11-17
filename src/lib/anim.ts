// Outils d'animation : tout est fonction pure de la progression, rien ne dépend du temps réel.

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
/** Projette v de [a,b] vers [c,d], borné. */
export const remap = (v: number, a: number, b: number, c: number, d: number) =>
  lerp(c, d, clamp((v - a) / (b - a)));

export type Ease = (p: number) => number;
export const ease = {
  lin: (p: number) => p,
  in: (p: number) => p * p * p,
  out: (p: number) => 1 - (1 - p) ** 3,
  inOut: (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2),
  backOut: (p: number) => 1 + 2.70158 * (p - 1) ** 3 + 1.70158 * (p - 1) ** 2,
  elasticOut: (p: number) =>
    p === 0 || p === 1 ? p : 2 ** (-10 * p) * Math.sin((p * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
  bounceOut: (p: number) => {
    const n = 7.5625, d = 2.75;
    if (p < 1 / d) return n * p * p;
    if (p < 2 / d) return n * (p -= 1.5 / d) * p + 0.75;
    if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + 0.9375;
    return n * (p -= 2.625 / d) * p + 0.984375;
  },
} satisfies Record<string, Ease>;

/** Progression locale (0..1, avec easing) du sous-intervalle [a,b] de t. Sert à séquencer une étape. */
export const seg = (t: number, a: number, b: number, e: Ease = ease.inOut) =>
  e(clamp((t - a) / (b - a)));

/** Progression d'une étape donnée vue depuis l'image courante : 0 avant, t pendant, 1 après. */
export const avancement = (img: { etape: number; t: number }, etape: number) =>
  img.etape < etape ? 0 : img.etape > etape ? 1 : img.t;

const hex = (c: string) => {
  const s = c.replace('#', '');
  const f = s.length === 3 ? s.split('').map((x) => x + x).join('') : s;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};
/** Mélange deux couleurs hexadécimales (#rgb ou #rrggbb). */
export function mix(c1: string, c2: string, p: number): string {
  const a = hex(c1), b = hex(c2), q = clamp(p);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], q))).join(',')})`;
}

/** Nombre au format français : fmt(3.14159, 2) -> "3,14". */
export const fmt = (v: number, decimales = 2) =>
  // Une valeur qui s'arrondit à zéro est ramenée à 0 : sinon un résidu négatif s'affiche « -0,0 ».
  (Math.abs(v) < 0.5 * 10 ** -decimales ? 0 : v).toLocaleString('fr-FR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });

/** Générateur pseudo-aléatoire déterministe (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let compteur = 0;
/** Identifiant unique : obligatoire pour tout id SVG (clipPath, gradient), une scène pouvant être montée plusieurs fois par page. */
export const uid = (prefixe = 'id') => `${prefixe}-${++compteur}`;

const NS = 'http://www.w3.org/2000/svg';
type Attrs = Record<string, string | number>;

/** Crée un élément SVG, l'ajoute à parent si fourni. */
export function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs = {}, parent?: Element): SVGElementTagNameMap[K] {
  const n = document.createElementNS(NS, tag);
  set(n, attrs);
  parent?.appendChild(n);
  return n;
}
export function set(n: Element, attrs: Attrs) {
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
}
/** Texte SVG. */
export function texte(parent: Element, x: number, y: number, contenu: string, attrs: Attrs = {}) {
  const t = el('text', { x, y, ...attrs }, parent);
  t.textContent = contenu;
  return t;
}
/** Apparition : opacité + léger glissement vertical. p de 0 à 1. */
export function show(n: SVGElement | HTMLElement, p: number, dy = 10) {
  n.style.opacity = String(clamp(p));
  n.style.transform = p >= 1 ? '' : `translateY(${(1 - clamp(p)) * dy}px)`;
}
/** Tracé progressif d'un chemin (effet "dessin"). p de 0 à 1. */
export function trace(n: SVGGeometryElement, p: number) {
  const L = n.getTotalLength();
  n.style.strokeDasharray = String(L);
  n.style.strokeDashoffset = String(L * (1 - clamp(p)));
}
