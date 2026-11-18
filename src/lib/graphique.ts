import { el, set, texte, uid, fmt } from './anim';
import { C, MONO, POLICE } from './palette';

export interface Axe {
  label: string;
  min: number;
  max: number;
  /** Écart entre graduations. Calculé automatiquement si absent. */
  pas?: number;
  decimales?: number;
}
export interface ConfigGraphique {
  x: Axe;
  y: Axe;
  titre?: string;
}
export interface OptionsTrace {
  couleur?: string;
  epaisseur?: number;
  pointille?: boolean;
  label?: string;
  rayon?: number;
}
type Pt = [number, number];

export interface Graphique {
  /** Courbe continue (ligne brisée). Rappeler avec le même id met à jour le tracé. */
  courbe(id: string, pts: Pt[], o?: OptionsTrace): void;
  /** Points de mesure. */
  nuage(id: string, pts: Pt[], o?: OptionsTrace): void;
  /** Point mis en évidence, avec étiquette facultative. */
  repere(id: string, x: number, y: number, o?: OptionsTrace): void;
  verticale(id: string, x: number, o?: OptionsTrace): void;
  horizontale(id: string, y: number, o?: OptionsTrace): void;
  /** Opacité d'un élément (0..1), pour les apparitions. */
  opacite(id: string, p: number): void;
  /** Retire un élément, ou tout si id absent. */
  effacer(id?: string): void;
  /** Change les axes (échelle, labels). */
  axes(cfg: Partial<ConfigGraphique>): void;
}

const W = 480, H = 360, M = { g: 58, d: 18, h: 34, b: 50 };

const pasAuto = (min: number, max: number) => {
  const brut = (max - min) / 5;
  const p10 = 10 ** Math.floor(Math.log10(brut));
  const r = brut / p10;
  return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * p10;
};
const decAuto = (pas: number) => Math.max(0, -Math.floor(Math.log10(pas) + 1e-9));

export function creerGraphique(svg: SVGSVGElement, config: ConfigGraphique): Graphique {
  let cfg = { ...config };
  svg.replaceChildren();
  set(svg, { viewBox: `0 0 ${W} ${H}` });
  const clip = uid('clip');
  const defs = el('defs', {}, svg);
  el('rect', { x: M.g, y: M.h, width: W - M.g - M.d, height: H - M.h - M.b }, el('clipPath', { id: clip }, defs));
  const gAxes = el('g', {}, svg);
  const gTraces = el('g', { 'clip-path': `url(#${clip})` }, svg);
  const gReperes = el('g', {}, svg);
  const items = new Map<string, SVGElement>();

  const X = (x: number) => M.g + ((x - cfg.x.min) / (cfg.x.max - cfg.x.min)) * (W - M.g - M.d);
  const Y = (y: number) => H - M.b - ((y - cfg.y.min) / (cfg.y.max - cfg.y.min)) * (H - M.h - M.b);

  function dessinerAxes() {
    gAxes.replaceChildren();
    const px = cfg.x.pas ?? pasAuto(cfg.x.min, cfg.x.max);
    const py = cfg.y.pas ?? pasAuto(cfg.y.min, cfg.y.max);
    const dx = cfg.x.decimales ?? decAuto(px), dy = cfg.y.decimales ?? decAuto(py);
    const style = { fill: C.discret, 'font-family': MONO, 'font-size': 12 };
    for (let v = Math.ceil(cfg.x.min / px - 1e-9) * px; v <= cfg.x.max + 1e-9; v += px) {
      el('line', { x1: X(v), x2: X(v), y1: M.h, y2: H - M.b, stroke: C.grille, 'stroke-width': 1 }, gAxes);
      texte(gAxes, X(v), H - M.b + 18, fmt(v + 0, dx), { ...style, 'text-anchor': 'middle' });
    }
    for (let v = Math.ceil(cfg.y.min / py - 1e-9) * py; v <= cfg.y.max + 1e-9; v += py) {
      el('line', { x1: M.g, x2: W - M.d, y1: Y(v), y2: Y(v), stroke: C.grille, 'stroke-width': 1 }, gAxes);
      texte(gAxes, M.g - 8, Y(v) + 4, fmt(v + 0, dy), { ...style, 'text-anchor': 'end' });
    }
    el('path', { d: `M${M.g} ${M.h}V${H - M.b}H${W - M.d}`, fill: 'none', stroke: C.discret, 'stroke-width': 1.5 }, gAxes);
    const lab = { fill: C.texte, 'font-family': POLICE, 'font-size': 14, 'font-weight': 600 };
    texte(gAxes, W - M.d, H - 10, cfg.x.label, { ...lab, 'text-anchor': 'end' });
    texte(gAxes, M.g - 44, M.h - 14, cfg.y.label, lab);
    if (cfg.titre) texte(gAxes, W - M.d, M.h - 14, cfg.titre, { ...lab, fill: C.discret, 'font-weight': 500, 'text-anchor': 'end' });
  }
  dessinerAxes();

  function obtenir<K extends keyof SVGElementTagNameMap>(id: string, tag: K, parent: Element): SVGElementTagNameMap[K] {
    let n = items.get(id);
    if (!n || n.tagName !== tag) {
      n?.remove();
      n = el(tag, {}, parent);
      items.set(id, n);
    }
    return n as SVGElementTagNameMap[K];
  }

  return {
    courbe(id, pts, o = {}) {
      set(obtenir(id, 'polyline', gTraces), {
        points: pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' '),
        fill: 'none', stroke: o.couleur ?? C.cyan, 'stroke-width': o.epaisseur ?? 2.5,
        'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'stroke-dasharray': o.pointille ? '6 5' : 'none',
      });
    },
    nuage(id, pts, o = {}) {
      const g = obtenir(id, 'g', gTraces);
      g.replaceChildren();
      for (const [x, y] of pts) el('circle', { cx: X(x), cy: Y(y), r: o.rayon ?? 3.5, fill: o.couleur ?? C.jaune }, g);
    },
    repere(id, x, y, o = {}) {
      const g = obtenir(id, 'g', gReperes);
      g.replaceChildren();
      const c = o.couleur ?? C.jaune;
      el('circle', { cx: X(x), cy: Y(y), r: (o.rayon ?? 5) + 5, fill: c, opacity: 0.25 }, g);
      el('circle', { cx: X(x), cy: Y(y), r: o.rayon ?? 5, fill: c, stroke: C.fond, 'stroke-width': 1.5 }, g);
      if (o.label) {
        const aGauche = X(x) > W - 130;
        texte(g, X(x) + (aGauche ? -12 : 12), Y(y) - 10, o.label, {
          fill: c, 'font-family': MONO, 'font-size': 12.5, 'font-weight': 600, 'text-anchor': aGauche ? 'end' : 'start',
          stroke: C.fond, 'stroke-width': 4, 'paint-order': 'stroke',
        });
      }
    },
    verticale(id, x, o = {}) {
      const g = obtenir(id, 'g', gReperes);
      g.replaceChildren();
      const c = o.couleur ?? C.discret;
      el('line', { x1: X(x), x2: X(x), y1: M.h + (o.label ? 20 : 0), y2: H - M.b, stroke: c, 'stroke-width': o.epaisseur ?? 1.5, 'stroke-dasharray': o.pointille === false ? 'none' : '5 5' }, g);
      if (o.label) texte(g, X(x), M.h + 14, o.label, {
        fill: c, 'font-family': MONO, 'font-size': 12.5, 'font-weight': 600, 'text-anchor': X(x) > W - 90 ? 'end' : 'middle',
        stroke: C.fond, 'stroke-width': 4, 'paint-order': 'stroke',
      });
    },
    horizontale(id, y, o = {}) {
      const g = obtenir(id, 'g', gReperes);
      g.replaceChildren();
      const c = o.couleur ?? C.discret;
      el('line', { x1: M.g, x2: W - M.d, y1: Y(y), y2: Y(y), stroke: c, 'stroke-width': o.epaisseur ?? 1.5, 'stroke-dasharray': o.pointille === false ? 'none' : '5 5' }, g);
      if (o.label) texte(g, W - M.d - 6, Y(y) - 6, o.label, {
        fill: c, 'font-family': MONO, 'font-size': 12.5, 'font-weight': 600, 'text-anchor': 'end',
        stroke: C.fond, 'stroke-width': 4, 'paint-order': 'stroke',
      });
    },
    opacite(id, p) {
      const n = items.get(id);
      if (n) n.style.opacity = String(Math.min(1, Math.max(0, p)));
    },
    effacer(id) {
      if (id === undefined) {
        items.forEach((n) => n.remove());
        items.clear();
      } else {
        items.get(id)?.remove();
        items.delete(id);
      }
    },
    axes(c) {
      cfg = { ...cfg, ...c };
      dessinerAxes();
    },
  };
}
