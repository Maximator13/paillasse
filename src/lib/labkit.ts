// Kit de matériel de laboratoire en SVG. Style commun : contour clair, aplats lumineux, fond sombre.
// Convention : x = centre horizontal de l'objet, y = sa base (sauf mention contraire). Repère de la scène : 640 x 480.
import { clamp, el, lerp, rng, set, texte, uid } from './anim';
import { C, MONO, POLICE, TRAIT } from './palette';

type P = Element;
const contour = { fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };

export interface Recipient {
  g: SVGGElement;
  /** niveau : 0 (vide) à 1 (plein). */
  liquide(niveau: number, couleur?: string): void;
  /** Ordonnée de la surface pour un niveau donné. */
  ySurface(niveau: number): number;
}

/** Récipient générique : d = contour ouvert en haut, la boîte borne le liquide. */
export function recipient(parent: P, d: string, b: { x0: number; x1: number; yHaut: number; yBas: number }): Recipient {
  const g = el('g', {}, parent);
  const id = uid('rec');
  el('path', { d: d + 'Z' }, el('clipPath', { id }, g));
  const gl = el('g', { 'clip-path': `url(#${id})` }, g);
  const liq = el('rect', { x: b.x0 - 12, width: b.x1 - b.x0 + 24, y: b.yBas, height: 0, fill: C.cyan, opacity: 0.82 }, gl);
  const surf = el('rect', { x: b.x0 - 12, width: b.x1 - b.x0 + 24, y: b.yBas, height: 3, fill: C.blanc, opacity: 0 }, gl);
  el('path', { d, ...contour }, g);
  const ySurface = (n: number) => lerp(b.yBas, b.yHaut, clamp(n));
  return {
    g,
    ySurface,
    liquide(niveau, couleur) {
      const y = ySurface(niveau);
      set(liq, { y, height: Math.max(0, b.yBas - y) });
      set(surf, { y, opacity: niveau > 0.005 ? 0.4 : 0 });
      if (couleur) liq.setAttribute('fill', couleur);
    },
  };
}

export function becher(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 120, h = 130 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h;
  const d = `M${x0 - 7} ${yt}Q${x0} ${yt} ${x0} ${yt + 9}V${y - 12}Q${x0} ${y} ${x0 + 12} ${y}H${x1 - 12}Q${x1} ${y} ${x1} ${y - 12}V${yt + 9}Q${x1} ${yt} ${x1 + 7} ${yt}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 14, yBas: y });
  for (let i = 1; i <= 4; i++) el('line', { x1: x1 - 16, x2: x1 - 5, y1: y - (h * i) / 5.5, y2: y - (h * i) / 5.5, stroke: C.verre, 'stroke-width': 1.2, opacity: 0.5 }, r.g);
  return r;
}

export function erlenmeyer(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 130, h = 150 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h, c = w * 0.17, yc = yt + h * 0.32;
  const d = `M${x - c - 5} ${yt}H${x - c}V${yc}L${x0 + 3} ${y - 14}Q${x0 - 3} ${y} ${x0 + 12} ${y}H${x1 - 12}Q${x1 + 3} ${y} ${x1 - 3} ${y - 14}L${x + c} ${yc}V${yt}H${x + c + 5}`;
  return recipient(parent, d, { x0, x1, yHaut: yt + 6, yBas: y });
}

/** Fiole jaugée : ventre rond, long col, trait de jauge. */
export function fiole(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient & { yJauge: number } {
  const { x, y, w = 110, h = 190 } = o;
  const r0 = w / 2, yt = y - h, c = 9, yv = y - r0 * 1.55;
  const d = `M${x - c - 4} ${yt}H${x - c}V${yv}C${x - r0 * 1.25} ${yv + 14} ${x - r0 * 1.25} ${y} ${x - r0 * 0.55} ${y}H${x + r0 * 0.55}C${x + r0 * 1.25} ${y} ${x + r0 * 1.25} ${yv + 14} ${x + c} ${yv}V${yt}H${x + c + 4}`;
  const r = recipient(parent, d, { x0: x - r0, x1: x + r0, yHaut: yt + 4, yBas: y });
  const yJauge = yt + (yv - yt) * 0.45;
  el('line', { x1: x - c, x2: x + c, y1: yJauge, y2: yJauge, stroke: C.jaune, 'stroke-width': 2 }, r.g);
  return { ...r, yJauge };
}

export function eprouvette(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 34, h = 170 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h;
  const d = `M${x0 - 5} ${yt}Q${x0} ${yt} ${x0} ${yt + 6}V${y - 6}H${x1}V${yt + 6}Q${x1} ${yt} ${x1 + 5} ${yt}`;
  const r = recipient(parent, d, { x0, x1, yHaut: yt + 10, yBas: y - 6 });
  el('path', { d: `M${x0 - 14} ${y}H${x1 + 14}`, stroke: C.verre, 'stroke-width': TRAIT + 1.5, 'stroke-linecap': 'round' }, r.g);
  for (let i = 1; i <= 9; i++) el('line', { x1: x1 - (i % 5 ? 8 : 14), x2: x1 - 2, y1: y - 6 - ((h - 22) * i) / 10, y2: y - 6 - ((h - 22) * i) / 10, stroke: C.verre, 'stroke-width': 1, opacity: 0.55 }, r.g);
  return r;
}

export function tubeEssai(parent: P, o: { x: number; y: number; w?: number; h?: number }): Recipient {
  const { x, y, w = 26, h = 110 } = o;
  const x0 = x - w / 2, x1 = x + w / 2, yt = y - h;
  const d = `M${x0 - 3} ${yt}H${x0}V${y - w / 2}A${w / 2} ${w / 2} 0 0 0 ${x1} ${y - w / 2}V${yt}H${x1 + 3}`;
  return recipient(parent, d, { x0, x1, yHaut: yt + 6, yBas: y });
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
  const x0 = x - w / 2, yb = yHaut + h, id = uid('bur');
  el('rect', { x: x0, y: yHaut, width: w, height: h + 26 }, el('clipPath', { id }, g));
  const liq = el('rect', { x: x0, width: w, y: yb, height: 26, fill: C.cyan, opacity: 0.82, 'clip-path': `url(#${id})` }, g);
  el('path', { d: `M${x0} ${yHaut - 8}V${yb + 12}L${x - 3} ${yb + 26}M${x0 + w} ${yHaut - 8}V${yb + 12}L${x + 3} ${yb + 26}`, ...contour, fill: 'none' }, g);
  for (let i = 0; i <= 25; i++) {
    const yy = yHaut + 6 + ((h - 12) * i) / 25, long = i % 5 === 0;
    el('line', { x1: x0 + (long ? 0 : w / 2), x2: x0 + w, y1: yy, y2: yy, stroke: C.verre, 'stroke-width': long ? 1.4 : 0.8, opacity: 0.6 }, g);
    if (long) texte(g, x0 + w + 6, yy + 4, String(i), { fill: C.discret, 'font-family': MONO, 'font-size': 10 });
  }
  // Robinet puis pointe.
  el('rect', { x: x - 3, y: yb + 26, width: 6, height: 16, fill: C.verre, opacity: 0.85 }, g);
  const poignee = el('rect', { x: x - 13, y: yb + 31, width: 26, height: 6, rx: 3, fill: C.orange }, g);
  el('path', { d: `M${x - 3} ${yb + 42}L${x - 1.5} ${yb + 62}H${x + 1.5}L${x + 3} ${yb + 42}Z`, fill: C.verre, opacity: 0.85 }, g);
  return {
    g,
    bec: { x, y: yb + 62 },
    liquide(niveau, couleur) {
      const y = lerp(yb, yHaut + 6, clamp(niveau));
      set(liq, { y, height: yb + 26 - y });
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
  el('rect', { x: x - 60, y: y - 10, width: 150, height: 10, rx: 3, fill: C.metal }, g);
  el('rect', { x: x - 3, y: y - h, width: 6, height: h - 8, rx: 3, fill: C.metal }, g);
  for (const p of pinces) {
    el('rect', { x: Math.min(x, p.vers), y: p.y - 2.5, width: Math.abs(p.vers - x), height: 5, rx: 2.5, fill: C.metal }, g);
    el('rect', { x: x - 7, y: p.y - 8, width: 14, height: 16, rx: 3, fill: C.discret }, g);
    el('rect', { x: p.vers - 12, y: p.y - 6, width: 24, height: 12, rx: 3, fill: 'none', stroke: C.metal, 'stroke-width': 3 }, g);
  }
  return g;
}

/** Agitateur magnétique. y = base de l'appareil. Le dessus du plateau est à yPlateau. */
export function agitateur(parent: P, o: { x: number; y: number; w?: number }) {
  const { x, y, w = 170 } = o;
  const g = el('g', {}, parent);
  el('rect', { x: x - w / 2, y: y - 34, width: w, height: 34, rx: 6, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, g);
  el('rect', { x: x - w / 2 + 6, y: y - 40, width: w - 12, height: 6, rx: 2, fill: C.metal }, g);
  el('circle', { cx: x + w / 2 - 24, cy: y - 17, r: 8, fill: C.fond, stroke: C.metal, 'stroke-width': 2 }, g);
  const led = el('circle', { cx: x - w / 2 + 20, cy: y - 17, r: 4, fill: C.grille }, g);
  return { g, yPlateau: y - 40, marche: (on: boolean) => led.setAttribute('fill', on ? C.menthe : C.grille) };
}

/** Barreau aimanté. tourne(T, vitesse) simule la rotation vue de côté. */
export function barreau(parent: P, o: { x: number; y: number; l?: number }) {
  const { x, y, l = 34 } = o;
  const b = el('rect', { x: x - l / 2, y: y - 9, width: l, height: 7, rx: 3.5, fill: C.blanc }, parent);
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
  el('rect', { x, y, width: w, height: h, rx: 10, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, g);
  texte(g, x + 12, y + 20, titre, { fill: C.discret, 'font-family': POLICE, 'font-size': 12, 'font-weight': 600, 'letter-spacing': '.04em' });
  el('rect', { x: x + 10, y: y + 28, width: w - 20, height: h - 38, rx: 6, fill: C.fond }, g);
  const t = texte(g, x + w - 18, y + h - 19, '', { fill: couleur, 'font-family': MONO, 'font-size': 20, 'font-weight': 600, 'text-anchor': 'end' });
  return { g, affiche: (v: string) => { t.textContent = v; }, sortie: { x: x + w / 2, y: y + h } };
}

/** Sonde plongeante reliée par un câble. de = sortie de l'appareil, vers = extrémité immergée. */
export function sonde(parent: P, o: { de: { x: number; y: number }; vers: { x: number; y: number }; longueur?: number; couleur?: string }) {
  const { de, vers, longueur = 90, couleur = C.verre } = o;
  const g = el('g', {}, parent);
  const yh = vers.y - longueur;
  el('path', { d: `M${de.x} ${de.y}C${de.x} ${de.y - 90} ${vers.x} ${yh - 120} ${vers.x} ${yh}`, fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
  el('rect', { x: vers.x - 5, y: yh, width: 10, height: 18, rx: 3, fill: C.metal }, g);
  el('rect', { x: vers.x - 3.5, y: yh + 16, width: 7, height: longueur - 16, rx: 3.5, fill: 'rgba(223,230,255,.18)', stroke: couleur, 'stroke-width': 1.6 }, g);
  el('circle', { cx: vers.x, cy: vers.y - 5, r: 3, fill: couleur, opacity: 0.8 }, g);
  return g;
}

/** Gouttes qui tombent de (x, y1) à (x, y2). maj(T, debit) : debit 0 = rien, 1 = soutenu. */
export function gouttes(parent: P, o: { x: number; y1: number; y2: number; couleur?: string; n?: number }) {
  const { x, y1, y2, couleur = C.cyan, n = 3 } = o;
  const g = el('g', {}, parent);
  const ds = Array.from({ length: n }, () => el('ellipse', { cx: x, rx: 2.6, ry: 4, fill: couleur }, g));
  return {
    g,
    maj(T: number, debit: number, c?: string) {
      g.style.opacity = debit > 0.01 ? '1' : '0';
      ds.forEach((d, i) => {
        const p = (T * (1.2 + debit) + i / n) % 1;
        set(d, { cy: lerp(y1 + 4, y2, p * p), opacity: p > 0.95 ? 0 : 1 });
        if (c) d.setAttribute('fill', c);
      });
    },
  };
}

/** Bulles montantes dans la zone (x centre, y bas, w, h). maj(T, intensite 0..1). */
export function bulles(parent: P, o: { x: number; y: number; w: number; h: number; n?: number; graine?: number; couleur?: string }) {
  const { x, y, w, h, n = 12, graine = 1, couleur = C.blanc } = o;
  const g = el('g', {}, parent), r = rng(graine);
  const bs = Array.from({ length: n }, () => ({ dx: (r() - 0.5) * w, v: 0.25 + r() * 0.5, ph: r(), ray: 1.5 + r() * 3, n: el('circle', { fill: 'none', stroke: couleur, 'stroke-width': 1.2 }, g) }));
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
  el('rect', { x: x - 4, y: y - h, width: 8, height: h - 6, rx: 4, ...contour }, g);
  el('circle', { cx: x, cy: y - 7, r: 8, fill: couleur, stroke: C.verre, 'stroke-width': 1.6 }, g);
  const col = el('rect', { x: x - 2, width: 4, y: y - 12, height: 0, fill: couleur }, g);
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

/** Plan de travail : simple ligne d'horizon sous le montage. */
export function paillasse(parent: P, y = 440) {
  const g = el('g', {}, parent);
  el('rect', { x: 0, y, width: 640, height: 480 - y, fill: C.panneau, opacity: 0.55 }, g);
  el('line', { x1: 0, x2: 640, y1: y, y2: y, stroke: C.grille, 'stroke-width': 2 }, g);
  return g;
}
