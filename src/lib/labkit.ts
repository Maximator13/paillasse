// Kit de matériel de laboratoire en SVG, façon illustration scientifique : verre vu en légère plongée
// (ouvertures, fonds et surfaces en ellipse), épaisseur de paroi, reflets en dégradés, ombres portées douces.
// Aucun filtre SVG : uniquement des aplats et des dégradés statiques, pour tenir 60 images par seconde.
// Convention : x = centre horizontal de l'objet, y = sa base (sauf mention contraire). Repère de la scène : 640 x 480.
// Les couleurs sont lues dans C à l'appel de chaque fonction (jamais au chargement du module) : le thème suit.
import { clamp, el, lerp, mix, rng, set, texte, uid } from './anim';
import { C, MONO, POLICE, TRAIT, themeSombre } from './palette';

type P = Element;
type Arret = [offset: number, couleur: string, opacite: number];

/** Petit axe d'une ellipse horizontale de demi-largeur rx, vue en légère plongée. */
const ryDe = (rx: number) => clamp(rx * 0.12, 1.5, 7);
/** Valeur selon le thème courant (opacités : le même voile ne se voit pas pareil sur fond nuit et sur fond blanc). */
const selon = (sombre: number, clair: number) => (themeSombre() ? sombre : clair);

/** Dégradé à identifiant unique, renvoie la valeur de fill correspondante. */
function degrade(g: P, type: 'linearGradient' | 'radialGradient', attrs: Record<string, string | number>, arrets: Arret[]) {
  const id = uid('kit');
  const gr = el(type, { id, ...attrs }, el('defs', {}, g));
  for (const [offset, c, o] of arrets) el('stop', { offset, 'stop-color': c, 'stop-opacity': o }, gr);
  return `url(#${id})`;
}
const vertical = { x1: 0, y1: 0, x2: 0, y2: 1 };

/** Volume d'un cylindre vertical entre xa et xb : bord gauche ombré, liseré de lumière, bord droit plus sombre. */
const reflet = (g: P, xa: number, xb: number) =>
  degrade(g, 'linearGradient', { gradientUnits: 'userSpaceOnUse', x1: xa, x2: xb, y1: 0, y2: 0 }, [
    [0, C.ombre, selon(0.32, 0.1)], [0.1, C.ombre, 0], [0.15, C.blanc, 0], [0.22, C.blanc, selon(0.2, 0.55)],
    [0.3, C.blanc, 0], [0.78, C.ombre, 0], [1, C.ombre, selon(0.38, 0.14)],
  ]);

/** Métal : tige éclairée à gauche (horizontal) ou barre éclairée par le dessus (vertical). */
const metal = (g: P, sens: 'h' | 'v') =>
  degrade(g, 'linearGradient', sens === 'h' ? {} : vertical, [
    [0, mix(C.metal, C.ombre, 0.1), 1], [0.3, mix(C.metal, C.blanc, 0.4), 1], [1, mix(C.metal, C.ombre, 0.35), 1],
  ]);

const aplatVerre = () => ({ fill: C.verre, 'fill-opacity': selon(0.08, 0.3) });
const traitVerre = (ep = TRAIT) => ({ fill: 'none', stroke: C.trait, 'stroke-width': ep, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });

/** Ouverture vue en plongée : arc arrière discret, arc avant net. */
function ouverture(g: P, cx: number, y: number, rx: number, couleur = C.trait) {
  const ry = ryDe(rx);
  el('path', { d: `M${cx - rx} ${y}A${rx} ${ry} 0 0 1 ${cx + rx} ${y}`, fill: 'none', stroke: couleur, 'stroke-width': 1.2, opacity: 0.45 }, g);
  el('path', { d: `M${cx - rx} ${y}A${rx} ${ry} 0 0 0 ${cx + rx} ${y}`, fill: 'none', stroke: couleur, 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
}

/**
 * Ombre portée douce sous un objet posé (base y, demi-largeur rx), placée sous tout le reste de g.
 * ponytail: un objet dont la base est au-dessus de y = 380 est supposé tenu en l'air (verseuse, pipette) et n'a pas d'ombre.
 */
function ombre(g: P, cx: number, y: number, rx: number) {
  if (y < 380) return;
  const ry = ryDe(rx) + 3;
  const fill = degrade(g, 'radialGradient', {}, [[0, C.ombre, selon(0.6, 0.22)], [0.6, C.ombre, selon(0.32, 0.1)], [1, C.ombre, 0]]);
  g.insertBefore(el('ellipse', { cx: cx + rx * 0.06, cy: y - ry + 5, rx: rx * 1.14, ry, fill }), g.firstChild);
}

/** Demi-largeur du contour à chaque ordonnée, par échantillonnage du tracé (une seule fois, au montage). */
function profil(p: SVGPathElement, cx: number, defaut: number) {
  const t = new Map<number, number>();
  try {
    const L = p.getTotalLength();
    for (let s = 0; s <= L; s += 0.75) {
      const q = p.getPointAtLength(s), k = Math.round(q.y);
      t.set(k, Math.max(t.get(k) ?? 0, Math.abs(q.x - cx)));
    }
  } catch { /* hors rendu : largeur constante */ }
  return (y: number) => {
    const k = Math.round(y);
    return t.get(k) ?? t.get(k - 1) ?? t.get(k + 1) ?? defaut;
  };
}

export interface Recipient {
  g: SVGGElement;
  /** niveau : 0 (vide) à 1 (plein). */
  liquide(niveau: number, couleur?: string): void;
  /** Ordonnée de la surface pour un niveau donné. */
  ySurface(niveau: number): number;
}

/** Récipient générique : d = contour ouvert en haut, la boîte borne le liquide. La surface du liquide est une ellipse centrée sur ySurface. */
export function recipient(parent: P, d: string, b: { x0: number; x1: number; yHaut: number; yBas: number }): Recipient {
  const g = el('g', {}, parent);
  const id = uid('rec'), ferme = d + 'Z', cx = (b.x0 + b.x1) / 2, ryN = ryDe((b.x1 - b.x0) / 2);
  el('path', { d: ferme }, el('clipPath', { id }, g));
  el('path', { d: ferme, ...aplatVerre() }, g);
  const gl = el('g', { 'clip-path': `url(#${id})` }, g);
  const liq = el('path', { d: '', fill: C.cyan, 'fill-opacity': 0.82 }, gl);
  const surf = el('ellipse', { cx, fill: C.blanc, 'fill-opacity': selon(0.2, 0.28), stroke: C.blanc, 'stroke-opacity': 0.55, 'stroke-width': 1, opacity: 0 }, gl);
  // Volume du verre par-dessus le liquide, puis épaisseur de la paroi (bande claire le long de l'intérieur du contour).
  el('path', { d: ferme, fill: reflet(g, b.x0, b.x1) }, g);
  el('path', { d, fill: 'none', stroke: C.verre, 'stroke-width': 6, opacity: selon(0.2, 0.75), 'clip-path': `url(#${id})` }, g);
  const tour = el('path', { d, ...traitVerre() }, g);
  const demi = profil(tour, cx, (b.x1 - b.x0) / 2);
  const ySurface = (n: number) => lerp(b.yBas, b.yHaut, clamp(n));
  return {
    g,
    ySurface,
    liquide(niveau, couleur) {
      const y = ySurface(niveau), vide = niveau <= 0.005;
      // Largeur de la surface : celle du contour à cette hauteur, ou un peu plus haut si le fond s'arrondit.
      const rx = Math.max(1, Math.max(demi(y), demi(y - ryN)) - 1), ry = ryDe(rx);
      set(liq, { d: vide ? '' : `M${b.x0 - 12} ${b.yBas + 4}V${y}H${cx - rx}A${rx} ${ry} 0 0 1 ${cx + rx} ${y}H${b.x1 + 12}V${b.yBas + 4}Z` });
      set(surf, { cy: y, rx, ry, opacity: vide ? 0 : 1 });
      if (couleur) liq.setAttribute('fill', couleur);
    },
  };
}

export function becher(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 120, h = 130 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h, ry = ryDe(w / 2);
  const d = `M${x0 - 7} ${yt}Q${x0} ${yt} ${x0} ${yt + 9}V${y - ry}A${w / 2} ${ry} 0 0 0 ${x1} ${y - ry}V${yt + 9}Q${x1} ${yt} ${x1 + 7} ${yt}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 14, yBas: y });
  ombre(r.g, x, y, w / 2);
  // Bord arrière du fond, vu par transparence.
  el('path', { d: `M${x0} ${y - ry}A${w / 2} ${ry} 0 0 1 ${x1} ${y - ry}`, fill: 'none', stroke: C.trait, 'stroke-width': 1.2, opacity: 0.3 }, r.g);
  for (let i = 1; i <= 4; i++) el('line', { x1: x1 - 16, x2: x1 - 5, y1: y - (h * i) / 5.5, y2: y - (h * i) / 5.5, stroke: C.trait, 'stroke-width': 1.2, opacity: 0.5 }, r.g);
  ouverture(r.g, x, yt, w / 2 + 7);
  return r;
}

export function erlenmeyer(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 130, h = 150 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h, c = w * 0.17, yc = yt + h * 0.32;
  // Fond en arc d'ellipse : point le plus bas en y, raccords des coins à y - e.
  const a = w / 2, ry = ryDe(a), e = ry * (1 - Math.sqrt(1 - ((a - 12) / a) ** 2));
  const d = `M${x - c - 5} ${yt}H${x - c}V${yc}L${x0 + 3} ${y - 14}Q${x0 - 2} ${y - e} ${x0 + 12} ${y - e}A${a} ${ry} 0 0 0 ${x1 - 12} ${y - e}Q${x1 + 2} ${y - e} ${x1 - 3} ${y - 14}L${x + c} ${yc}V${yt}H${x + c + 5}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 6, yBas: y });
  ombre(r.g, x, y, a);
  el('path', { d: `M${x0 + 4} ${y - ry}A${a - 4} ${ry} 0 0 1 ${x1 - 4} ${y - ry}`, fill: 'none', stroke: C.trait, 'stroke-width': 1.2, opacity: 0.3 }, r.g);
  ouverture(r.g, x, yt, c + 5);
  return r;
}

/** Fiole jaugée : ventre rond, long col, trait de jauge. */
export function fiole(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient & { yJauge: number } {
  const { x, y, w = 110, h = 190 } = o;
  const r0 = w / 2, yt = y - h, c = 9, yv = y - r0 * 1.55, ry = ryDe(r0), e = ry * (1 - Math.sqrt(1 - 0.55 ** 2));
  const d = `M${x - c - 4} ${yt}H${x - c}V${yv}C${x - r0 * 1.25} ${yv + 14} ${x - r0 * 1.25} ${y - e} ${x - r0 * 0.55} ${y - e}A${r0} ${ry} 0 0 0 ${x + r0 * 0.55} ${y - e}C${x + r0 * 1.25} ${y - e} ${x + r0 * 1.25} ${yv + 14} ${x + c} ${yv}V${yt}H${x + c + 4}`;
  const r = recipient(parent, d, { x0: x - r0, x1: x + r0, yHaut: yt + 4, yBas: y });
  ombre(r.g, x, y, r0 * 0.9);
  const yJauge = yt + (yv - yt) * 0.45;
  // Trait de jauge : anneau gravé autour du col.
  el('path', { d: `M${x - c} ${yJauge}A${c} 2.5 0 0 1 ${x + c} ${yJauge}`, fill: 'none', stroke: C.jaune, 'stroke-width': 1.2, opacity: 0.5 }, r.g);
  el('path', { d: `M${x - c} ${yJauge}A${c} 2.5 0 0 0 ${x + c} ${yJauge}`, fill: 'none', stroke: C.jaune, 'stroke-width': 2 }, r.g);
  ouverture(r.g, x, yt, c + 4);
  return { ...r, yJauge };
}

export function eprouvette(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 34, h = 170 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h, yb = y - 6, ry = ryDe(w / 2);
  const d = `M${x0 - 5} ${yt}Q${x0} ${yt} ${x0} ${yt + 6}V${yb - ry}A${w / 2} ${ry} 0 0 0 ${x1} ${yb - ry}V${yt + 6}Q${x1} ${yt} ${x1 + 5} ${yt}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 10, yBas: yb });
  // Pied : galette vue en plongée, sous le fût. Dessus centré sur le fond du fût, avant posé en y.
  const R = w / 2 + 14, ryp = ryDe(R), yp = yb - ry, ep = y - yp - ryp;
  const pied = el('g', {}, r.g);
  r.g.insertBefore(pied, r.g.firstChild);
  const galette = `M${x - R} ${yp}V${yp + ep}A${R} ${ryp} 0 0 0 ${x + R} ${yp + ep}V${yp}A${R} ${ryp} 0 0 0 ${x - R} ${yp}Z`;
  el('path', { d: galette, fill: C.verre, 'fill-opacity': selon(0.16, 0.45) }, pied);
  el('path', { d: galette, fill: reflet(pied, x - R, x + R), stroke: C.trait, 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, pied);
  el('path', { d: `M${x - R} ${yp}A${R} ${ryp} 0 0 0 ${x + R} ${yp}`, fill: 'none', stroke: C.trait, 'stroke-width': 1.1, opacity: 0.6 }, pied);
  ombre(r.g, x, y, R);
  for (let i = 1; i <= 9; i++) el('line', { x1: x1 - (i % 5 ? 8 : 14), x2: x1 - 2, y1: yb - ((h - 22) * i) / 10, y2: yb - ((h - 22) * i) / 10, stroke: C.trait, 'stroke-width': 1, opacity: 0.55 }, r.g);
  ouverture(r.g, x, yt, w / 2 + 5);
  return r;
}

export function tubeEssai(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 26, h = 110 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h;
  const d = `M${x0 - 3} ${yt}H${x0}V${y - w / 2}A${w / 2} ${w / 2} 0 0 0 ${x1} ${y - w / 2}V${yt}H${x1 + 3}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 6, yBas: y });
  ouverture(r.g, x, yt, w / 2 + 3);
  return r;
}

export interface Burette {
  g: SVGGElement;
  /** niveau : fraction de liquide restant (1 = pleine jusqu'au zéro). */
  liquide(niveau: number, couleur?: string): void;
  /** ouverture du robinet : 0 fermé, 1 ouvert. */
  robinet(ouverture: number): void;
  /** Pointe de la burette, d'où tombent les gouttes. */
  bec: { x: number; y: number };
}

/** Burette graduée. yHaut = haut du tube, h = hauteur du tube gradué. */
export function burette(parent: P, o: { x: number; yHaut: number; h?: number; w?: number }): Burette {
  const { x, yHaut, h = 240, w = 16 } = o;
  const g = el('g', {}, parent);
  const x0 = x - w / 2, x1 = x0 + w, yb = yHaut + h, id = uid('bur');
  const tube = `M${x0} ${yHaut - 8}V${yb + 12}L${x - 3} ${yb + 26}H${x + 3}L${x1} ${yb + 12}V${yHaut - 8}Z`;
  el('path', { d: tube }, el('clipPath', { id }, g));
  el('path', { d: tube, ...aplatVerre() }, g);
  const gl = el('g', { 'clip-path': `url(#${id})` }, g);
  const liq = el('rect', { x: x0, width: w, y: yb, height: 26, fill: C.cyan, opacity: 0.82 }, gl);
  const menisque = el('ellipse', { cx: x, cy: yb, rx: w / 2 - 1, ry: 2, fill: C.blanc, 'fill-opacity': 0.35 }, gl);
  el('path', { d: tube, fill: reflet(g, x0, x1) }, g);
  el('path', { d: `M${x0} ${yHaut - 8}V${yb + 12}L${x - 3} ${yb + 26}M${x1} ${yHaut - 8}V${yb + 12}L${x + 3} ${yb + 26}`, ...traitVerre() }, g);
  ouverture(g, x, yHaut - 8, w / 2);
  for (let i = 0; i <= 25; i++) {
    const yy = yHaut + 6 + ((h - 12) * i) / 25, long = i % 5 === 0;
    el('line', { x1: x0 + (long ? 0 : w / 2), x2: x0 + w, y1: yy, y2: yy, stroke: C.trait, 'stroke-width': long ? 1.4 : 0.8, opacity: 0.6 }, g);
    if (long) texte(g, x0 + w + 6, yy + 4, String(i), { fill: C.discret, 'font-family': MONO, 'font-size': 10 });
  }
  // Robinet : boisseau de verre, clé qui pivote autour de son axe, puis pointe effilée.
  el('rect', { x: x - 3, y: yb + 26, width: 6, height: 16, fill: C.verre, 'fill-opacity': selon(0.6, 0.7), stroke: C.trait, 'stroke-width': 1 }, g);
  el('rect', { x: x - 6, y: yb + 29, width: 12, height: 10, rx: 3, fill: C.verre, 'fill-opacity': selon(0.35, 0.6), stroke: C.trait, 'stroke-width': 1 }, g);
  const poignee = el('g', {}, g);
  el('rect', { x: x - 13, y: yb + 31, width: 26, height: 6, rx: 3, fill: degrade(g, 'linearGradient', vertical, [[0, mix(C.orange, C.blanc, 0.35), 1], [0.5, C.orange, 1], [1, mix(C.orange, C.ombre, 0.3), 1]]) }, poignee);
  el('circle', { cx: x, cy: yb + 34, r: 2.6, fill: mix(C.orange, C.ombre, 0.35) }, g);
  el('path', { d: `M${x - 3} ${yb + 42}L${x - 1.5} ${yb + 62}H${x + 1.5}L${x + 3} ${yb + 42}Z`, fill: C.verre, 'fill-opacity': selon(0.6, 0.7), stroke: C.trait, 'stroke-width': 1, 'stroke-linejoin': 'round' }, g);
  return {
    g,
    bec: { x, y: yb + 62 },
    liquide(niveau, couleur) {
      const y = lerp(yb, yHaut + 6, clamp(niveau));
      set(liq, { y, height: yb + 26 - y });
      menisque.setAttribute('cy', String(y));
      if (couleur) liq.setAttribute('fill', couleur);
    },
    robinet(ouverture) {
      poignee.setAttribute('transform', `rotate(${90 * clamp(ouverture)} ${x} ${yb + 34})`);
    },
  };
}

/** Potence : socle, tige et pinces horizontales. pinces : hauteur y et abscisse visée. */
export function potence(parent: P, o: { x: number; y: number; h?: number; pinces?: { y: number; vers: number }[] }) {
  const { x, y, h = 380, pinces = [] } = o;
  const g = el('g', {}, parent);
  ombre(g, x + 15, y, 75);
  const tigeH = metal(g, 'h'), barreV = metal(g, 'v');
  // Socle : dessus éclairé, tige plantée, puis face avant qui masque le pied de la tige.
  el('rect', { x: x - 58, y: y - 14, width: 146, height: 8, rx: 3, fill: mix(C.metal, C.blanc, selon(0.25, 0.45)) }, g);
  el('rect', { x: x - 3, y: y - h, width: 6, height: h - 8, rx: 3, fill: tigeH }, g);
  el('rect', { x: x - 60, y: y - 10, width: 150, height: 10, rx: 3, fill: degrade(g, 'linearGradient', vertical, [[0, C.metal, 1], [1, mix(C.metal, C.ombre, 0.35), 1]]) }, g);
  el('path', { d: `M${x - 57} ${y - 9.5}H${x + 87}`, stroke: C.blanc, 'stroke-width': 1, opacity: selon(0.25, 0.5), 'stroke-linecap': 'round' }, g);
  for (const p of pinces) {
    const s = p.vers >= x ? 1 : -1;
    el('rect', { x: Math.min(x, p.vers), y: p.y - 2.5, width: Math.abs(p.vers - x), height: 5, rx: 2.5, fill: barreV }, g);
    // Noix : bloc à deux faces et vis de serrage du côté opposé au bras.
    el('rect', { x: s > 0 ? x - 12 : x + 7, y: p.y - 3, width: 5, height: 6, rx: 1.5, fill: C.metal }, g);
    el('rect', { x: x - 7, y: p.y - 8, width: 14, height: 16, rx: 3, fill: mix(C.discret, C.ombre, 0.15) }, g);
    el('rect', { x: x - 7, y: p.y - 8, width: 14, height: 5, rx: 2.5, fill: mix(C.discret, C.blanc, selon(0.25, 0.3)) }, g);
    el('rect', { x: p.vers - 12, y: p.y - 6, width: 24, height: 12, rx: 3, fill: 'none', stroke: C.metal, 'stroke-width': 3 }, g);
    el('path', { d: `M${p.vers - 9} ${p.y - 6}H${p.vers + 9}`, stroke: mix(C.metal, C.blanc, 0.4), 'stroke-width': 1, 'stroke-linecap': 'round' }, g);
  }
  return g;
}

/** Agitateur magnétique. y = base de l'appareil. Le dessus du plateau est à yPlateau. */
export function agitateur(parent: P, o: { x: number; y: number; w?: number }) {
  const { x, y, w = 170 } = o;
  const g = el('g', {}, parent), xa = x - w / 2;
  ombre(g, x, y, w / 2);
  // Boîtier : dessus en légère plongée, puis face avant assombrie vers le bas.
  el('rect', { x: xa + 3, y: y - 38, width: w - 6, height: 12, rx: 5, fill: mix(C.panneau, C.metal, selon(0.35, 0.25)), stroke: C.metal, 'stroke-width': 1.5 }, g);
  el('rect', { x: xa, y: y - 32, width: w, height: 32, rx: 6, fill: degrade(g, 'linearGradient', vertical, [[0, C.panneau, 1], [1, mix(C.panneau, C.ombre, selon(0.3, 0.06)), 1]]), stroke: C.metal, 'stroke-width': 2 }, g);
  // Plateau chauffant : dessus éclairé, tranche métallique dont le bord avant est en yPlateau.
  el('rect', { x: xa + 8, y: y - 45, width: w - 16, height: 8, rx: 4, fill: mix(C.metal, C.blanc, selon(0.22, 0.45)) }, g);
  el('rect', { x: xa + 8, y: y - 40, width: w - 16, height: 4, rx: 2, fill: C.metal }, g);
  // Bouton de vitesse et voyant.
  el('circle', { cx: x + w / 2 - 24, cy: y - 16, r: 9, fill: C.fond, stroke: C.metal, 'stroke-width': 2 }, g);
  el('circle', { cx: x + w / 2 - 24, cy: y - 16, r: 5.5, fill: metal(g, 'h') }, g);
  el('path', { d: `M${x + w / 2 - 24} ${y - 21}V${y - 17}`, stroke: C.fond, 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
  el('circle', { cx: xa + 20, cy: y - 16, r: 6, fill: C.fond, stroke: C.metal, 'stroke-width': 1 }, g);
  const led = el('circle', { cx: xa + 20, cy: y - 16, r: 4, fill: C.grille }, g);
  return { g, yPlateau: y - 40, marche: (on: boolean) => led.setAttribute('fill', on ? C.menthe : C.grille) };
}

/** Barreau aimanté. tourne(T, vitesse) simule la rotation vue de côté. */
export function barreau(parent: P, o: { x: number; y: number; l?: number }) {
  const { x, y, l = 34 } = o;
  const fill = degrade(parent, 'linearGradient', vertical, [[0, C.blanc, 1], [1, mix(C.blanc, C.metal, 0.45), 1]]);
  const b = el('rect', { x: x - l / 2, y: y - 9, width: l, height: 7, rx: 3.5, fill, stroke: C.metal, 'stroke-width': 0.8 }, parent);
  return {
    el: b,
    tourne(T: number, vitesse = 1) {
      const k = vitesse <= 0 ? 1 : Math.max(0.18, Math.abs(Math.cos(T * 9 * vitesse)));
      set(b, { x: x - (l * k) / 2, width: l * k });
    },
  };
}

/** Appareil de mesure à affichage numérique (pH-mètre, conductimètre, voltmètre...). x, y = coin haut gauche. */
export function appareil(parent: P, o: { x: number; y: number; w?: number; h?: number; titre: string; couleur?: string }) {
  const { x, y, w = 132, h = 74, titre, couleur = C.menthe } = o;
  const g = el('g', {}, parent);
  // Ombre décalée sans flou, boîtier éclairé par le haut avec arête supérieure claire.
  el('rect', { x: x + 2, y: y + 4, width: w, height: h, rx: 10, fill: C.ombre, opacity: selon(0.35, 0.1) }, g);
  el('rect', { x, y, width: w, height: h, rx: 10, fill: degrade(g, 'linearGradient', vertical, [[0, mix(C.panneau, C.metal, selon(0.22, 0.14)), 1], [1, C.panneau, 1]]), stroke: C.metal, 'stroke-width': 2 }, g);
  el('path', { d: `M${x + 10} ${y + 2.5}H${x + w - 10}`, stroke: C.blanc, 'stroke-width': 1.5, opacity: selon(0.18, 0.9), 'stroke-linecap': 'round' }, g);
  texte(g, x + 12, y + 20, titre, { fill: C.discret, 'font-family': POLICE, 'font-size': 12, 'font-weight': 600, 'letter-spacing': '.04em' });
  // Écran encastré : ombre intérieure en haut.
  el('rect', { x: x + 10, y: y + 28, width: w - 20, height: h - 38, rx: 6, fill: C.fond, stroke: C.grille, 'stroke-width': 1.5 }, g);
  el('path', { d: `M${x + 15} ${y + 30}H${x + w - 15}`, stroke: C.ombre, 'stroke-width': 2, opacity: selon(0.5, 0.12), 'stroke-linecap': 'round' }, g);
  const t = texte(g, x + w - 18, y + h - 19, '', { fill: couleur, 'font-family': MONO, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'end' });
  return { g, affiche: (v: string) => { t.textContent = v; }, sortie: { x: x + w / 2, y: y + h } };
}

/** Sonde plongeante reliée par un câble. de = sortie de l'appareil, vers = extrémité immergée. */
export function sonde(parent: P, o: { de: { x: number; y: number }; vers: { x: number; y: number }; longueur?: number; couleur?: string }) {
  const { de, vers, longueur = 90, couleur = C.trait } = o;
  const g = el('g', {}, parent);
  const yh = vers.y - longueur;
  const cable = `M${de.x} ${de.y}C${de.x} ${de.y - 90} ${vers.x} ${yh - 120} ${vers.x} ${yh}`;
  el('path', { d: cable, fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
  el('path', { d: cable, fill: 'none', stroke: C.blanc, 'stroke-width': 0.8, opacity: selon(0.25, 0.5), 'stroke-linecap': 'round' }, g);
  el('rect', { x: vers.x - 5, y: yh, width: 10, height: 18, rx: 3, fill: metal(g, 'h') }, g);
  const tige = { x: vers.x - 3.5, y: yh + 16, width: 7, height: longueur - 16, rx: 3.5 };
  el('rect', { ...tige, fill: C.verre, 'fill-opacity': selon(0.18, 0.35) }, g);
  el('rect', { ...tige, fill: reflet(g, vers.x - 3.5, vers.x + 3.5), stroke: couleur, 'stroke-width': 1.6 }, g);
  el('circle', { cx: vers.x, cy: vers.y - 5, r: 3, fill: couleur, opacity: 0.8 }, g);
  el('circle', { cx: vers.x - 1, cy: vers.y - 6, r: 1, fill: C.blanc, opacity: 0.7 }, g);
  return g;
}

/** Gouttes qui tombent de (x, y1) à (x, y2). maj(T, debit) : debit 0 = rien, 1 = soutenu. */
export function gouttes(parent: P, o: { x: number; y1: number; y2: number; couleur?: string; n?: number }) {
  const { x, y1, y2, couleur = C.cyan, n = 3 } = o;
  const g = el('g', {}, parent);
  const ds = Array.from({ length: n }, () => ({
    d: el('ellipse', { cx: x, rx: 2.6, ry: 4, fill: couleur }, g),
    eclat: el('ellipse', { cx: x - 0.9, rx: 0.8, ry: 1.3, fill: C.blanc }, g),
  }));
  return {
    g,
    maj(T: number, debit: number, c?: string) {
      g.style.opacity = debit > 0.01 ? '1' : '0';
      ds.forEach(({ d, eclat }, i) => {
        const p = (T * (1.2 + debit) + i / n) % 1, cy = lerp(y1 + 4, y2, p * p), vis = p > 0.95 ? 0 : 1;
        set(d, { cy, opacity: vis });
        set(eclat, { cy: cy - 1, opacity: vis * 0.7 });
        if (c) d.setAttribute('fill', c);
      });
    },
  };
}

/** Bulles montantes dans la zone (x centre, y bas, w, h). maj(T, intensite 0..1). */
export function bulles(parent: P, o: { x: number; y: number; w: number; h: number; n?: number; graine?: number; couleur?: string }) {
  const { x, y, w, h, n = 12, graine = 1, couleur = C.blanc } = o;
  const g = el('g', {}, parent), r = rng(graine);
  const bs = Array.from({ length: n }, () => ({ dx: (r() - 0.5) * w, v: 0.25 + r() * 0.5, ph: r(), ray: 1.5 + r() * 3, n: el('circle', { fill: C.blanc, 'fill-opacity': 0.14, stroke: couleur, 'stroke-width': 1.2 }, g) }));
  return {
    g,
    maj(T: number, intensite: number) {
      bs.forEach((b, i) => {
        const p = (T * b.v + b.ph) % 1, actif = i / n < intensite;
        set(b.n, { cx: x + b.dx + Math.sin(T * 3 + i) * 2, cy: y - p * h, r: b.ray * (0.6 + p * 0.6), opacity: actif ? 0.85 * (1 - p) : 0 });
      });
    },
  };
}

/** Thermomètre. temperature(f) : remplissage de la colonne, 0..1. */
export function thermometre(parent: P, o: { x: number; y: number; h?: number; couleur?: string }) {
  const { x, y, h = 130, couleur = C.corail } = o;
  const g = el('g', {}, parent);
  const tube = { x: x - 4, y: y - h, width: 8, height: h - 6, rx: 4 };
  el('rect', { ...tube, ...aplatVerre() }, g);
  el('rect', { ...tube, fill: reflet(g, x - 4, x + 4) }, g);
  el('rect', { ...tube, ...traitVerre() }, g);
  el('circle', { cx: x, cy: y - 7, r: 8, fill: couleur, stroke: C.trait, 'stroke-width': 1.6 }, g);
  const col = el('rect', { x: x - 2, width: 4, y: y - 12, height: 0, fill: couleur }, g);
  el('ellipse', { cx: x - 2.8, cy: y - 9.5, rx: 2.2, ry: 1.6, fill: C.blanc, opacity: 0.55 }, g);
  return {
    g,
    temperature(f: number) {
      const hh = 6 + (h - 26) * clamp(f);
      set(col, { y: y - 12 - hh, height: hh });
    },
  };
}

/** Étiquette lisible sur fond sombre. ancre : start | middle | end. */
export function etiquette(parent: P, o: { x: number; y: number; texte: string; ancre?: 'start' | 'middle' | 'end'; taille?: number; couleur?: string; mono?: boolean }) {
  return texte(parent, o.x, o.y, o.texte, {
    fill: o.couleur ?? C.texte, 'font-family': o.mono ? MONO : POLICE, 'font-size': o.taille ?? 15, 'font-weight': 600,
    'text-anchor': o.ancre ?? 'start', stroke: C.fond, 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round',
  });
}

/** Flèche (vecteur, annotation). */
export function fleche(parent: P, o: { x1: number; y1: number; x2: number; y2: number; couleur?: string; epaisseur?: number }) {
  const g = el('g', {}, parent);
  const ligne = el('line', { 'stroke-linecap': 'round' }, g), tete = el('polygon', {}, g);
  const maj = (x1: number, y1: number, x2: number, y2: number, couleur = o.couleur ?? C.jaune, ep = o.epaisseur ?? 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), t = Math.min(11, L * 0.6);
    const bx = x2 - Math.cos(a) * t, by = y2 - Math.sin(a) * t, nx = -Math.sin(a) * t * 0.5, ny = Math.cos(a) * t * 0.5;
    set(ligne, { x1, y1, x2: bx, y2: by, stroke: couleur, 'stroke-width': ep });
    set(tete, { points: `${x2},${y2} ${bx + nx},${by + ny} ${bx - nx},${by - ny}`, fill: couleur });
    g.style.opacity = L < 1 ? '0' : '1';
  };
  maj(o.x1, o.y1, o.x2, o.y2);
  return { g, maj };
}

/** Plan de travail vu en légère plongée : dessus qui s'estompe vers le fond, arête avant, face avant ombrée. */
export function paillasse(parent: P, y = 440) {
  const g = el('g', {}, parent);
  el('rect', { x: 0, y: y - 28, width: 640, height: 28, fill: degrade(g, 'linearGradient', vertical, [[0, C.grille, 0], [1, C.grille, selon(0.55, 0.7)]]) }, g);
  el('rect', { x: 0, y, width: 640, height: 480 - y, fill: degrade(g, 'linearGradient', vertical, [[0, C.panneau, selon(0.75, 0.6)], [1, mix(C.panneau, C.ombre, selon(0.35, 0.05)), selon(0.75, 0.6)]]) }, g);
  el('line', { x1: 0, x2: 640, y1: y, y2: y, stroke: mix(C.grille, C.metal, selon(0.25, 0.35)), 'stroke-width': 2 }, g);
  el('line', { x1: 0, x2: 640, y1: y + 2, y2: y + 2, stroke: C.blanc, 'stroke-width': 1, opacity: selon(0.06, 0.9) }, g);
  return g;
}
