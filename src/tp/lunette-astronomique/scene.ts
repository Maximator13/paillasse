import { avancement, clamp, ease, el, fmt, lerp, rng, seg, set, show } from '../../lib/anim';
import { etiquette, fleche, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { angleEmergent, caracteristique, cercleOculaire, grossissement, imageIntermediaire, marche, propager, type Lunette } from './model';

const DEG = Math.PI / 180;
const THETA = 1; // degrés : inclinaison du faisceau incident sur l'axe
const H = 0.8; // cm : demi-largeur du faisceau sur l'objectif
const R1 = 1.9, R2 = 1.6; // cm : demi-diamètres de l'objectif et de l'oculaire
const TIRAGE0 = 1.45; // l'oculaire arrive à 1,45 f'2 de F'1, donc trop loin

// Repère de la scène. Le schéma est dilaté dix fois verticalement, comme dans les manuels :
// une affinité conserve les droites, le parallélisme et les points de concours, la construction reste exacte.
const SX = 5.4, SY = 54; // px par cm
const X0 = 16, X1 = 136, YA = 268, RAIL = 412, YCOTE = 391;
const X = (cm: number) => X1 + cm * SX;
const Y = (cm: number) => YA - cm * SY;

type Pt = [number, number];
/** Ligne brisée tronquée à l'abscisse xf : le front de lumière avance de gauche à droite. */
function jusqua(pts: Pt[], xf: number) {
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [xa, ya] = pts[i - 1], [xb, yb] = pts[i];
    if (xb <= xf) out.push(pts[i]);
    else {
      if (xf > xa) out.push([xf, lerp(ya, yb, (xf - xa) / (xb - xa))]);
      break;
    }
  }
  return out.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}
const arc = (cx: number, cy: number, r: number, a: number, b: number) =>
  `M${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${b > a ? 1 : 0} ${(cx + r * Math.cos(b)).toFixed(1)} ${(cy + r * Math.sin(b)).toFixed(1)}`;
const place = (n: SVGElement, x: number, y: number, opacite = 1) => {
  n.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  n.style.opacity = String(clamp(opacite));
};
const voir = (n: SVGElement, o: number) => { n.style.opacity = String(clamp(o)); };

/** Support de banc d'optique : tige et cavalier, dessinés autour de l'origine (centre optique). */
function support(g: SVGGElement, yHaut: number) {
  el('rect', { x: -2, y: yHaut, width: 4, height: RAIL - YA - yHaut - 6, fill: C.metal }, g);
  el('rect', { x: -15, y: RAIL - YA - 8, width: 30, height: 14, rx: 4, fill: C.discret }, g);
}
/** Lentille mince convergente : double flèche des manuels, sur son support. r = demi-diamètre en px. */
function lentille(parent: Element, r: number, couleur: string, nom: string) {
  const g = el('g', {}, parent);
  support(g, r + 6);
  el('path', { d: `M0 ${-r}Q11 0 0 ${r}Q-11 0 0 ${-r}Z`, fill: couleur, opacity: 0.16 }, g);
  el('path', { d: `M0 ${-r}V${r}M-8 ${-r + 10}L0 ${-r}L8 ${-r + 10}M-8 ${r - 10}L0 ${r}L8 ${r - 10}`, fill: 'none', stroke: couleur, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  el('circle', { r: 3, fill: couleur, stroke: C.fond, 'stroke-width': 1.5 }, g);
  etiquette(g, { x: 0, y: -r - 14, texte: nom, ancre: 'middle', taille: 13, couleur });
  return g;
}
/** Cote horizontale avec taquets. maj(x1, x2, p) : la cote se déploie de x1 vers x2. */
function cote(parent: Element, couleur: string) {
  const g = el('g', {}, parent);
  const l = el('path', { fill: 'none', stroke: couleur, 'stroke-width': 2, 'stroke-linecap': 'round' }, g);
  const t = etiquette(g, { x: 0, y: 0, texte: '', taille: 13, couleur, mono: true });
  return {
    t,
    maj(x1: number, x2: number, p: number) {
      const xb = lerp(x1, x2, p);
      l.setAttribute('d', `M${x1} ${YCOTE - 5}V${YCOTE + 5}M${x1} ${YCOTE}H${xb.toFixed(1)}M${xb.toFixed(1)} ${YCOTE - 5}V${YCOTE + 5}`);
      voir(g, p * 3);
    },
  };
}
/** Lune gibbeuse de rayon 10, dissymétrique pour que le renversement se voie. */
function lune(parent: Element) {
  const g = el('g', {}, parent);
  el('circle', { r: 10, fill: C.grille }, g);
  el('path', { d: 'M0 -10A10 10 0 0 1 0 10A3 10 0 0 1 0 -10Z', fill: C.verre }, g);
  el('circle', { cx: 4.2, cy: -4.4, r: 1.7, fill: C.metal }, g);
  el('circle', { cx: 5.8, cy: 3.4, r: 1.1, fill: C.metal }, g);
  el('circle', { cx: 0.4, cy: 1.6, r: 1.3, fill: C.metal }, g);
  return g;
}
/** Médaillon : champ de vision circulaire sur fond de ciel. */
function medaillon(parent: Element, cx: number, cy: number, couleur: string, graine: number) {
  const g = el('g', {}, parent), r = rng(graine);
  el('circle', { cx, cy, r: 46, fill: C.fond, stroke: couleur, 'stroke-width': TRAIT }, g);
  for (let i = 0; i < 7; i++) {
    const a = r() * 6.283, d = 14 + r() * 26;
    el('circle', { cx: cx + d * Math.cos(a), cy: cy + d * Math.sin(a), r: 0.7 + r() * 0.7, fill: C.verre, opacity: 0.55 }, g);
  }
  const astre = lune(el('g', { transform: `translate(${cx} ${cy})` }, g));
  const legende = etiquette(g, { x: cx, y: cy - 56, texte: '', ancre: 'middle', taille: 13, couleur });
  return { g, astre, legende };
}

export default definirScene({
  etapes: [
    { titre: 'L\'objectif forme l\'image intermédiaire', duree: 9, texte: 'La lumière d\'un astre très éloigné arrive en <strong>faisceau parallèle</strong>, incliné d\'un angle θ sur l\'axe. Le rayon passant par O<sub>1</sub> n\'est pas dévié : tous les rayons se croisent en B<sub>1</sub>, dans le plan focal image de l\'objectif.' },
    { titre: 'Régler l\'oculaire : la lunette afocale', duree: 10, texte: 'On retire l\'écran, puis on approche l\'oculaire jusqu\'à ce que son foyer objet F<sub>2</sub> coïncide avec F\'<sub>1</sub>. Le faisceau émergent devient parallèle : la lunette est <strong>afocale</strong>, l\'œil observe sans accommoder.' },
    { titre: 'Repérer les angles θ et θ\'', duree: 10, texte: 'Le rayon qui irait de B<sub>1</sub> vers O<sub>2</sub> ne serait pas dévié : il donne la direction du faisceau émergent. Dans les deux triangles, <strong>tan θ = A<sub>1</sub>B<sub>1</sub>/f\'<sub>1</sub></strong> et <strong>tan θ\' = A<sub>1</sub>B<sub>1</sub>/f\'<sub>2</sub></strong>.' },
    { titre: 'Mesurer le grossissement', duree: 12, texte: 'On change la direction de l\'astre et on relève θ\' pour chaque θ. Les points s\'alignent sur une droite passant par l\'origine : sa pente est le <strong>grossissement G = θ\'/θ = f\'<sub>1</sub>/f\'<sub>2</sub></strong>.' },
    { titre: 'Ce que voit l\'œil', duree: 9, texte: 'À travers la lunette, l\'astre paraît <strong>G fois plus grand</strong> et <strong>renversé</strong>. Changez les distances focales : pour grossir davantage, il faut un objectif de grande focale et un oculaire de courte focale.' },
  ],
  parametres: [
    { id: 'f1', label: 'Distance focale de l\'objectif f\'1', min: 20, max: 50, pas: 5, valeur: 40, unite: 'cm' },
    { id: 'f2', label: 'Distance focale de l\'oculaire f\'2', min: 5, max: 12, pas: 0.5, valeur: 8, unite: 'cm', decimales: 1 },
  ],
  graphique: {
    x: { label: 'θ (°)', min: 0, max: THETA, pas: 0.2, decimales: 1 },
    y: { label: 'θ\' (°)', min: 0, max: 10, pas: 2 },
  },
  affiche: { etape: 4, t: 0.9 },

  monter({ scene, graphique }) {
    paillasse(scene);
    // Banc d'optique gradué tous les 5 cm.
    const banc = el('g', {}, scene);
    for (const x of [64, 576]) el('rect', { x: x - 18, y: RAIL + 8, width: 36, height: 440 - RAIL - 8, rx: 3, fill: C.metal, opacity: 0.7 }, banc);
    el('rect', { x: 28, y: RAIL, width: 584, height: 10, rx: 3, fill: C.metal }, banc);
    for (let cm = -15; cm <= 85; cm += 5) el('line', { x1: X(cm), x2: X(cm), y1: RAIL + (cm % 10 ? 5 : 2), y2: RAIL + 10, stroke: C.fond, 'stroke-width': 1.2 }, banc);
    el('line', { x1: X0, x2: 624, y1: YA, y2: YA, stroke: C.discret, 'stroke-width': 1.2, 'stroke-dasharray': '10 5 2 5', opacity: 0.7 }, scene);
    etiquette(scene, { x: X0, y: 464, texte: 'Schéma dilaté 10 fois dans le sens vertical', taille: 13, couleur: C.discret });

    // Triangles O1A1B1 et O2A1B1 (sous les rayons).
    const tri1 = el('polygon', { fill: C.cyan, 'fill-opacity': 0 }, scene);
    const tri2 = el('polygon', { fill: C.rose, 'fill-opacity': 0 }, scene);

    // Écran, objectif, oculaire.
    const ecran = el('g', {}, scene);
    support(ecran, 82);
    el('rect', { x: -2.5, y: -76, width: 5, height: 158, rx: 2, fill: C.verre, opacity: 0.55 }, ecran);
    etiquette(ecran, { x: 0, y: -86, texte: 'Écran', ancre: 'middle', taille: 13, couleur: C.discret });
    const objectif = lentille(scene, R1 * SY, C.cyan, 'Objectif L1');
    const oculaire = lentille(scene, R2 * SY, C.rose, 'Oculaire L2');
    etiquette(objectif, { x: -9, y: 18, texte: 'O1', ancre: 'end', taille: 13, couleur: C.cyan, mono: true });
    etiquette(oculaire, { x: -8, y: -27, texte: 'O2', ancre: 'end', taille: 13, couleur: C.rose, mono: true });
    const astre = etiquette(scene, { x: X0, y: 190, texte: 'Astre à l\'infini', taille: 13, couleur: C.jaune });

    // Rayons : halo, trait, grains de lumière qui filent dans le sens de propagation.
    const rayons = [H, 0, -H].map((h) => {
      const g = el('g', { fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, scene);
      return {
        h,
        traits: [
          el('polyline', { stroke: C.jaune, 'stroke-width': 8, opacity: 0.13 }, g),
          el('polyline', { stroke: C.jaune, 'stroke-width': h ? 1.9 : 3, opacity: h ? 0.9 : 1 }, g),
        ],
        flux: el('polyline', { stroke: C.blanc, 'stroke-width': 2.4, 'stroke-dasharray': '1 47', opacity: 0.95 }, g),
      };
    });
    const fictif = el('line', { stroke: C.verre, 'stroke-width': 2, 'stroke-dasharray': '7 6', 'stroke-linecap': 'round' }, scene);

    // Angles.
    const trait = { fill: 'none', 'stroke-width': TRAIT, 'stroke-linecap': 'round' };
    const arcTheta = el('path', { ...trait, stroke: C.cyan }, scene);
    const arcO2 = el('path', { ...trait, stroke: C.rose }, scene);
    const arcOeil = el('path', { ...trait, stroke: C.rose }, scene);
    const etiqTheta = etiquette(scene, { x: X1 - 100, y: YA - 26, texte: 'θ', taille: 16, couleur: C.cyan });
    const etiqThetaP = etiquette(scene, { x: 0, y: YA + 48, texte: 'θ\'', taille: 16, couleur: C.rose });

    // Foyers, image intermédiaire, cotes.
    const foyer = (couleur: string, nom: string, ancre: 'start' | 'end') => {
      const g = el('g', {}, scene);
      el('line', { y1: -6, y2: 6, stroke: couleur, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      etiquette(g, { x: ancre === 'end' ? -6 : 6, y: -10, texte: nom, ancre, taille: 13, couleur, mono: true });
      return g;
    };
    const f1img = foyer(C.cyan, 'F\'1', 'end'), f2obj = foyer(C.rose, 'F2', 'start');
    const anneau = el('circle', { cy: YA, fill: 'none', stroke: C.blanc, 'stroke-width': 2 }, scene);
    const impact = el('circle', { fill: 'none', stroke: C.jaune, 'stroke-width': 2 }, scene);
    const image = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.menthe });
    const etiqB1 = etiquette(scene, { x: 0, y: 0, texte: 'B1', ancre: 'end', taille: 13, couleur: C.menthe, mono: true });
    const cote1 = cote(scene, C.cyan), cote2 = cote(scene, C.rose);
    cote1.t.setAttribute('text-anchor', 'middle');

    // Œil, placé au cercle oculaire.
    const oeil = el('g', {}, scene);
    el('circle', { cx: 27, r: 22, fill: 'rgba(223,230,255,.07)', stroke: C.verre, 'stroke-width': TRAIT }, oeil);
    el('path', { d: 'M9 -12Q-3 0 9 12', fill: C.fond, stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round' }, oeil);
    el('ellipse', { cx: 11, rx: 3.2, ry: 8.5, fill: C.bleu }, oeil);
    el('ellipse', { cx: 9.6, rx: 1.6, ry: 4.4, fill: C.fond }, oeil);
    etiquette(oeil, { x: 31, y: 43, texte: 'Œil', ancre: 'middle', taille: 13, couleur: C.discret });

    // Encart des relations (étapes 3 et 4).
    const encart = el('g', {}, scene);
    const cadre = el('rect', { x: 16, y: 22, width: 262, height: 62, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, contenu = '') => {
      const n = el('text', { x: 31, y, fill: couleur, 'font-family': MONO, 'font-size': taille, 'font-weight': 600 }, encart);
      n.textContent = contenu;
      return n;
    };
    const rel1 = ligne(47, 14, C.cyan, 'tan θ  = A1B1 / f\'1');
    const rel2 = ligne(70, 14, C.rose, 'tan θ\' = A1B1 / f\'2');
    const relG = ligne(102, 15, C.jaune);

    // Médaillons (étape 5).
    const nu = medaillon(scene, 474, 100, C.metal, 7), vu = medaillon(scene, 574, 100, C.jaune, 11);
    nu.legende.textContent = 'À l\'œil nu';
    nu.astre.setAttribute('transform', 'rotate(-20) scale(0.44)');

    return ({ etape, t, T, p }) => {
      const img = { etape, t };
      const [a0, a1, a2, a3, a4] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));
      const l: Lunette = { f1: p.f1, f2: p.f2 };
      const G = grossissement(l);

      // Étape 4 : l'astre s'écarte de l'axe, de 0 à 1°.
      const thDeg = THETA * (1 - seg(a3, 0, 0.16) + seg(a3, 0.2, 0.86));
      const th = thDeg * DEG;
      const thP = angleEmergent(th, l) / DEG;
      // Étape 2 : tirage de l'oculaire, avec un léger dépassement comme lors d'une vraie mise au point.
      const e = l.f1 + l.f2 * lerp(TIRAGE0, 1, seg(a1, 0.5, 0.84, ease.backOut));
      const xF = X(l.f1), xL2 = X(e), xOeilCm = l.f1 + l.f2 + cercleOculaire(l), xOeil = X(xOeilCm);
      const yB1 = Y(imageIntermediaire(th, l));

      // Matériel : chaque élément entre, puis l'écran se retire.
      place(objectif, X1, YA + lerp(-34, 0, seg(a0, 0, 0.14, ease.backOut)), seg(a0, 0, 0.09));
      place(ecran, xF, YA + lerp(-34, 0, seg(a0, 0.05, 0.19, ease.backOut)) + 40 * seg(a1, 0, 0.13, ease.in), seg(a0, 0.05, 0.14) * (1 - seg(a1, 0.02, 0.13)));
      place(oculaire, xL2, YA + lerp(-34, 0, seg(a1, 0.06, 0.2, ease.backOut)), seg(a1, 0.06, 0.15));
      place(oeil, xOeil + lerp(44, 0, seg(a1, 0.86, 1, ease.out)), YA, seg(a1, 0.86, 0.96));
      show(astre, seg(a0, 0.08, 0.2), 6);

      // Rayons : le rayon passant par O1 part en tête, le front de lumière s'arrête à l'écran puis file jusqu'à l'œil.
      const suite = lerp(xF, xOeil, seg(a1, 0.16, 0.42));
      for (const r of rayons) {
        const m = marche(r.h, th, l, e);
        const pts: Pt[] = [
          [X0, Y(propager({ y: r.h, pente: -Math.tan(th) }, (X0 - X1) / SX).y)],
          [X1, Y(r.h)],
          [xF, Y(propager(m.apresObjectif, l.f1).y)],
          [xL2, Y(m.apresOculaire.y)],
          [xOeil, Y(propager(m.apresOculaire, xOeilCm - e).y)],
        ];
        const front = a1 > 0 ? suite : lerp(X0, xF, r.h ? seg(a0, 0.24, 0.62) : seg(a0, 0.12, 0.5));
        const points = jusqua(pts, front);
        for (const n of r.traits) n.setAttribute('points', points);
        set(r.flux, { points, 'stroke-dashoffset': (-T * 70).toFixed(1) });
      }

      // Image intermédiaire A1B1 sur l'écran, foyer F'1, cote f'1.
      const eclat = seg(a0, 0.6, 0.78, ease.out);
      set(impact, { cx: xF, cy: yB1, r: lerp(3, 18, eclat), opacity: eclat > 0 && eclat < 1 ? 1 - eclat : 0 });
      image.maj(xF, YA, xF, lerp(YA, yB1, seg(a0, 0.66, 0.8, ease.out)), C.menthe, 3.5);
      set(etiqB1, { x: xF - 7, y: yB1 + 21 });
      voir(etiqB1, seg(a0, 0.76, 0.86) * clamp(thDeg * 4));
      place(f1img, xF, YA, seg(a0, 0.8, 0.9));
      cote1.maj(X1, xF, seg(a0, 0.84, 0.97));
      set(cote1.t, { x: Math.max((X1 + xF) / 2, X1 + 64), y: YCOTE - 8 }); // l'étiquette ne recouvre jamais la tige de l'objectif
      cote1.t.textContent = `f'1 = ${fmt(l.f1, 1)} cm`;

      // Foyer objet F2 de l'oculaire, cote f'2, éclat quand F2 rejoint F'1.
      place(f2obj, X(e - l.f2), YA, seg(a1, 0.34, 0.44));
      cote2.maj(xL2, X(e - l.f2), seg(a1, 0.36, 0.5));
      set(cote2.t, { x: xL2 + 12, y: YCOTE + 5 });
      cote2.t.textContent = `f'2 = ${fmt(l.f2, 1)} cm`;
      const accord = seg(a1, 0.8, 0.97, ease.out);
      set(anneau, { cx: xF, r: lerp(5, 30, accord), opacity: accord > 0 && accord < 1 ? 1 - accord : 0 });

      // Étape 3 : triangles, rayon fictif B1O2, angles.
      const phi = Math.atan((Math.tan(th) * SY) / SX), phiP = Math.atan((Math.tan(thP * DEG) * SY) / SX);
      tri1.setAttribute('points', `${X1},${YA} ${xF},${YA} ${xF},${yB1}`);
      tri1.setAttribute('fill-opacity', String(0.2 * seg(a2, 0.02, 0.18)));
      arcTheta.setAttribute('d', arc(X1, YA, 86, Math.PI, Math.PI + phi * seg(a2, 0.06, 0.24)));
      voir(arcTheta, seg(a2, 0.06, 0.1));
      voir(etiqTheta, seg(a2, 0.16, 0.26));
      const xFin = lerp(xF, xOeil - 8, seg(a2, 0.3, 0.56));
      set(fictif, { x1: xF, y1: yB1, x2: xFin, y2: lerp(yB1, YA, (xFin - xF) / (xL2 - xF)) });
      voir(fictif, seg(a2, 0.3, 0.34));
      tri2.setAttribute('points', `${xL2},${YA} ${xF},${YA} ${xF},${yB1}`);
      tri2.setAttribute('fill-opacity', String(0.26 * seg(a2, 0.56, 0.7)));
      const ouverture = seg(a2, 0.6, 0.78);
      arcO2.setAttribute('d', arc(xL2, YA, 0.58 * l.f2 * SX, Math.PI, Math.PI - phiP * ouverture));
      arcOeil.setAttribute('d', arc(xOeil, YA, Math.min(46, 0.8 * (xOeil - xL2)), Math.PI, Math.PI - phiP * ouverture));
      voir(arcO2, seg(a2, 0.6, 0.64));
      voir(arcOeil, seg(a2, 0.6, 0.64));
      etiqThetaP.setAttribute('x', String(xOeil - 6));
      voir(etiqThetaP, seg(a2, 0.7, 0.8));

      // Encart : les deux relations, puis le grossissement.
      show(encart, seg(a2, 0.04, 0.2, ease.backOut), 14);
      voir(rel1, seg(a2, 0.12, 0.26));
      voir(rel2, seg(a2, 0.66, 0.8));
      cadre.setAttribute('height', String(lerp(62, 96, seg(a3, 0.84, 0.94))));
      relG.textContent = `G = θ'/θ = f'1/f'2 = ${fmt(G, 1)}`;
      show(relG, seg(a3, 0.88, 0.99, ease.out), 8);

      // Étape 5 : ce que voit l'œil, sans puis avec la lunette.
      show(nu.g, seg(a4, 0.02, 0.2, ease.backOut), 14);
      show(vu.g, seg(a4, 0.1, 0.28, ease.backOut), 14);
      const zoom = seg(a4, 0.34, 0.8);
      vu.astre.setAttribute('transform', `rotate(${(-20 + 180 * zoom).toFixed(1)}) scale(${(0.44 * G ** zoom).toFixed(3)})`);
      vu.legende.textContent = `Lunette : ×${fmt(G ** zoom, 1)}`;

      if (graphique) {
        const trace = THETA * seg(a3, 0.2, 0.86), fin = a3 >= 0.86;
        graphique.courbe('nu', a3 > 0.2 ? [[0, 0], [trace, trace]] : [], { couleur: C.discret, epaisseur: 2, pointille: true });
        graphique.courbe('lunette', a3 > 0.2 ? caracteristique(l, trace, 24) : [], { couleur: C.jaune, epaisseur: 3 });
        if (a2 > 0.8) {
          graphique.repere('pt', thDeg, thP, { couleur: fin ? C.jaune : C.blanc, rayon: fin ? 5 : 4, label: fin ? `pente G = ${fmt(G, 1)}` : a3 > 0 ? undefined : `θ' = ${fmt(thP, 2)}°` });
          graphique.opacite('pt', seg(a2, 0.8, 0.92));
        } else graphique.effacer('pt');
        if (fin) {
          // Aux faibles grossissements, les deux droites sont trop proches pour loger l'étiquette sans chevauchement.
          graphique.repere('oeil', THETA, THETA, { couleur: C.discret, rayon: 3, label: G >= 2.4 ? 'œil nu' : undefined });
          graphique.opacite('oeil', seg(a3, 0.86, 0.96));
        } else graphique.effacer('oeil');
      }

      const mesures = [{ label: 'Angle θ', valeur: `${fmt(thDeg, 2)}°` }];
      if (a2 > 0.6) mesures.push({ label: 'Angle θ\'', valeur: `${fmt(thP, 2)}°` });
      else mesures.push({ label: 'Image A1B1', valeur: a0 > 0.66 ? `${fmt((YA - yB1) / SY * -10, 1)} mm` : '...' });
      if (a1 > 0.06) mesures.push({ label: 'Distance O1O2', valeur: `${fmt(e, 1)} cm` });
      if (a3 >= 0.86) mesures.push({ label: 'Grossissement G', valeur: fmt(G, 1) });
      return mesures;
    };
  },
});
