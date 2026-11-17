import { L, avancement, clamp, ease, el, fmt, lerp, mix, rng, seg, set, show, texte } from '../../lib/anim';
import { appareil, becher, etiquette, fleche, paillasse, type Recipient } from '../../lib/labkit';
import { C, MONO, POLICE } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { E_VIDE, capacite, charge, concentrationCuivre, dureeVie, intensite, masseCuivre, masseZinc, quantiteElectrons, tension, type Pile } from './model';

const V_SOL = 0.05; // L, volume de chaque solution
const C0 = 0.1; // mol/L, concentration initiale des deux solutions
const R_INT = 10; // ohm, résistance interne (pont salin)
const M_REF = 400; // mg, échelle commune du graphique et de l'usure des lames
const NIVEAU = 0.72;
const ZINC = mix(C.metal, C.verre, 0.62), DEPOT = mix(C.orange, C.corail, 0.5);
const XZ = 98, XC = 352, Y_LAME = 236, Y_FOND = 426; // lames de zinc et de cuivre
const X0 = 436, W0 = 188; // colonne de droite : appareils et encarts
const N = 8; // points de relief par flanc de lame

type Pt = [number, number];
/** Ligne brisée paramétrée par sa longueur : évite getPointAtLength, indisponible tant que le SVG n'est pas affiché. */
function chemin(pts: Pt[]) {
  const cumul = [0];
  for (let i = 1; i < pts.length; i++) cumul.push(cumul[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const L = cumul[cumul.length - 1];
  return {
    d: 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L'),
    /** Position et direction unitaire à la fraction f (0..1) du chemin. */
    en(f: number) {
      const s = clamp(f) * L;
      let i = 1;
      while (i < pts.length - 1 && cumul[i] < s) i++;
      const l = cumul[i] - cumul[i - 1], k = (s - cumul[i - 1]) / l, [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      return { x: lerp(x0, x1, k), y: lerp(y0, y1, k), tx: (x1 - x0) / l, ty: (y1 - y0) / l };
    },
  };
}
/** Coin arrondi (Bézier quadratique échantillonnée) entre a et b, de sommet s. */
const coin = (a: Pt, s: Pt, b: Pt, n = 6): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const k = i / n;
    return [(1 - k) ** 2 * a[0] + 2 * k * (1 - k) * s[0] + k * k * b[0], (1 - k) ** 2 * a[1] + 2 * k * (1 - k) * s[1] + k * k * b[1]] as Pt;
  });
/** Tracé progressif d'un chemin dont l'attribut pathLength vaut 1. */
const tracer = (n: SVGElement, p: number) => {
  n.style.strokeDasharray = '1';
  n.style.strokeDashoffset = String(1 - clamp(p));
  n.style.opacity = p > 0 ? '1' : '0';
};
/**
 * Lame métallique : 22 px de large hors de la solution. Sous la surface, le point i (0 en haut) du flanc c (+1 à droite, -1 à gauche)
 * est décalé de dx(i, c) px : négatif pour un métal rongé, positif pour un dépôt. bas : surépaisseur sous la lame.
 */
const lame = (x: number, ys: number, dx: (i: number, c: number) => number = () => 0, bas = 0) => {
  const flanc = (c: number) => Array.from({ length: N + 1 }, (_, i) => [x + c * (11 + dx(i, c)), lerp(ys + 8, Y_FOND - 3, i / N)]);
  const D = flanc(1), G = flanc(-1).reverse(), yb = Y_FOND + bas, xd = D[N][0], xg = G[0][0];
  const L = (pts: number[][]) => pts.map(([px, py]) => `L${px.toFixed(1)} ${py.toFixed(1)}`).join('');
  return `M${x - 11} ${Y_LAME}H${x + 11}V${ys - 2}${L(D)}Q${xd.toFixed(1)} ${yb} ${(xd - 3).toFixed(1)} ${yb}H${(xg + 3).toFixed(1)}Q${xg.toFixed(1)} ${yb} ${xg.toFixed(1)} ${Y_FOND - 3}${L(G)}L${x - 11} ${ys - 2}Z`;
};

export default definirScene({
  etapes: [
    { titre: L('Constituer les deux demi-piles', 'Set up the two half-cells'), duree: 6, texte: L('Une lame de <strong>zinc</strong> plonge dans une solution de sulfate de zinc, une lame de <strong>cuivre</strong> dans une solution bleue de sulfate de cuivre. Chaque couple métal/ion forme une demi-pile.', 'A <strong>zinc</strong> strip dips into a zinc sulfate solution, a <strong>copper</strong> strip into a blue copper sulfate solution. Each metal/ion couple forms a half-cell.') },
    { titre: L('Relier par un pont salin, mesurer la tension à vide', 'Add a salt bridge, measure the open-circuit voltage'), duree: 7, texte: L('Sans pont salin, le voltmètre affiche 0 V. Dès que le pont relie les deux solutions, il indique <strong>U = 1,10 V</strong> : le cuivre est la borne <strong>+</strong>, le zinc la borne <strong>−</strong>.', 'Without a salt bridge, the voltmeter reads 0 V. As soon as the bridge connects the two solutions, it reads <strong>U = 1.10 V</strong>: the copper is the <strong>+</strong> terminal, the zinc the <strong>−</strong> terminal.') },
    { titre: L('Brancher un conducteur ohmique', 'Connect a resistor'), duree: 8, texte: L('Le circuit est fermé : les <strong>électrons</strong> quittent le zinc et rejoignent le cuivre par les fils, le courant <em>I</em> circule en sens inverse. Dans le pont salin, ce sont les <strong>ions</strong> qui portent le courant.', 'The circuit is closed: the <strong>electrons</strong> leave the zinc and reach the copper through the wires, the current <em>I</em> flows the opposite way. In the salt bridge, it is the <strong>ions</strong> that carry the current.') },
    { titre: L('Observer les réactions aux électrodes', 'Observe the electrode reactions'), duree: 8, texte: L('À l\'<strong>anode</strong>, le zinc s\'oxyde : Zn → Zn<sup>2+</sup> + 2 e<sup>−</sup>. À la <strong>cathode</strong>, les ions cuivre sont réduits : Cu<sup>2+</sup> + 2 e<sup>−</sup> → Cu.', 'At the <strong>anode</strong>, zinc is oxidised: Zn → Zn<sup>2+</sup> + 2 e<sup>−</sup>. At the <strong>cathode</strong>, copper ions are reduced: Cu<sup>2+</sup> + 2 e<sup>−</sup> → Cu.') },
    { titre: L('Laisser la pile débiter', 'Let the cell deliver current'), duree: 12, texte: L('Les heures défilent en accéléré : la lame de zinc <strong>s\'amincit</strong>, celle de cuivre <strong>s\'épaissit</strong>, la solution bleue pâlit. La charge débitée vaut <strong>Q = I·Δt</strong>.', 'The hours go by speeded up: the zinc strip <strong>gets thinner</strong>, the copper strip <strong>gets thicker</strong>, the blue solution fades. The charge delivered is <strong>Q = I·Δt</strong>.') },
    { titre: L('Faire le bilan de matière', 'Work out the amounts of substance'), duree: 7, texte: L('La pile a fait circuler une quantité d\'électrons <strong>n(e<sup>−</sup>) = Q/F</strong>, deux électrons par atome de zinc consommé et par atome de cuivre déposé. Changez la résistance ou la durée : la pile est <strong>usée</strong> quand les ions Cu<sup>2+</sup> sont épuisés.', 'The cell has driven an amount of electrons <strong>n(e<sup>−</sup>) = Q/F</strong> round the circuit, two electrons per zinc atom consumed and per copper atom deposited. Change the resistance or the duration: the cell is <strong>exhausted</strong> when the Cu<sup>2+</sup> ions are used up.') },
  ],
  parametres: [
    { id: 'r', label: L('Résistance du circuit', 'Circuit resistance'), min: 10, max: 100, pas: 5, valeur: 30, unite: 'Ω' },
    { id: 'duree', label: L('Durée de fonctionnement', 'Running time'), min: 2, max: 12, pas: 0.5, valeur: 6, unite: 'h', decimales: 1 },
  ],
  graphique: {
    x: { label: 't (h)', min: 0, max: 12, pas: 2 },
    y: { label: 'Δm (mg)', min: -M_REF, max: M_REF, pas: 200 },
    titre: L('Variation de masse des lames', 'Change in mass of the strips'),
  },
  affiche: { etape: 4, t: 0.7 },

  monter({ scene, graphique }) {
    paillasse(scene);
    const bZn = becher(scene, { x: 132, y: 440, w: 136, h: 150 });
    const bCu = becher(scene, { x: 318, y: 440, w: 136, h: 150 });
    const YS = bZn.ySurface(NIVEAU);
    const filet = (x: number) => el('line', { x1: x, x2: x, 'stroke-width': 5, 'stroke-linecap': 'round' }, scene);
    const filetZn = filet(132), filetCu = filet(318);
    const etqSolZn = etiquette(scene, { x: 132, y: 462, texte: 'Zn²⁺ + SO₄²⁻', ancre: 'middle', taille: 13, couleur: C.discret });
    const etqSolCu = etiquette(scene, { x: 318, y: 462, texte: 'Cu²⁺ + SO₄²⁻', ancre: 'middle', taille: 13, couleur: C.bleu });

    // Lames et ce qui s'y passe (étapes 1, 4 et 5).
    const alea = rng(11);
    const relief = Array.from({ length: 4 * (N + 1) }, () => 0.55 + 0.45 * alea());
    const halo = (x: number) => el('rect', { x: x - 19, y: YS + 2, width: 38, height: Y_FOND - YS + 4, rx: 9, fill: C.jaune, 'fill-opacity': 0.12, stroke: C.jaune, 'stroke-width': 2 }, scene);
    const haloZn = halo(XZ), haloCu = halo(XC);
    const gZn = el('g', {}, scene);
    const fantome = el('rect', { x: XZ - 11, y: YS - 2, width: 22, height: Y_FOND - YS + 2, rx: 3, fill: 'none', stroke: C.verre, 'stroke-width': 1.2, 'stroke-dasharray': '3 4' }, gZn);
    const lameZn = el('path', { fill: ZINC, stroke: C.blanc, 'stroke-width': 2, 'stroke-linejoin': 'round' }, gZn);
    const gCu = el('g', {}, scene);
    const depot = el('path', { fill: DEPOT, stroke: DEPOT, 'stroke-linejoin': 'round' }, gCu);
    el('path', { d: lame(XC, YS), fill: C.orange, stroke: mix(C.orange, C.blanc, 0.55), 'stroke-width': 2, 'stroke-linejoin': 'round' }, gCu);
    const gIonsZn = el('g', {}, scene), gIonsCu = el('g', {}, scene);
    const ions = (g: SVGGElement, couleur: string, bord: string) =>
      Array.from({ length: 7 }, (_, i) => ({ y: lerp(YS + 18, 410, (i + alea()) / 7), dx: alea(), ph: alea(), v: 0.2 + alea() * 0.12, n: el('circle', { r: 4.5, fill: couleur, stroke: bord, 'stroke-width': 1.2 }, g) }));
    const ionsZn = ions(gIonsZn, C.verre, C.fond), ionsCu = ions(gIonsCu, C.cyan, C.blanc);
    const etqIonZn = etiquette(scene, { x: 140, y: 433, texte: 'Zn²⁺', ancre: 'middle', taille: 13 });
    const etqIonCu = etiquette(scene, { x: 308, y: 433, texte: 'Cu²⁺', ancre: 'middle', taille: 13, couleur: C.cyan });

    // Pont salin (étape 2) et ions qui y migrent (étape 3).
    const cPont = chemin([[172, 398], [172, 282], ...coin([172, 282], [172, 258], [196, 258]), [254, 258], ...coin([254, 258], [278, 258], [278, 282]), [278, 398]]);
    const gPont = el('g', {}, scene);
    const tube = { d: cPont.d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    el('path', { ...tube, stroke: C.verre, 'stroke-width': 19 }, gPont);
    el('path', { ...tube, stroke: mix(C.panneau, C.jaune, 0.3), 'stroke-width': 14 }, gPont);
    const gIonsPont = el('g', {}, gPont);
    const ionsPont = Array.from({ length: 10 }, (_, i) => el('circle', { r: 2.8, fill: i % 2 ? C.menthe : C.violet }, gIonsPont));
    const etqPont = etiquette(scene, { x: 225, y: 222, texte: L('pont salin', 'salt bridge'), ancre: 'middle', taille: 13, couleur: C.discret });
    const etqNO3 = etiquette(scene, { x: 185, y: 242, texte: '← NO₃⁻', ancre: 'middle', taille: 13, couleur: C.menthe });
    const etqK = etiquette(scene, { x: 265, y: 242, texte: 'K⁺ →', ancre: 'middle', taille: 13, couleur: C.violet });

    // Fils, électrons, pinces et conducteur ohmique.
    const fil = (d: string, couleur: string, ep: number) => el('path', { d, pathLength: 1, fill: 'none', stroke: couleur, 'stroke-width': ep, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, scene);
    const pince = (x: number, couleur: string) => el('rect', { x: x - 4.5, y: Y_LAME - 10, width: 9, height: 17, rx: 2.5, fill: couleur, stroke: C.fond, 'stroke-width': 1 }, scene);
    const filCom = fil(`M${X0} 44H102Q92 44 92 54V230`, C.bleu, 2.2), filV = fil(`M${X0} 72H${XC + 16}Q${XC + 6} 72 ${XC + 6} 82V230`, C.corail, 2.2);
    const xa = XZ + 6, xb = XC - 6; // montants de la boucle
    const ptsBoucle: Pt[] = [[xa, 230], [xa, 142], ...coin([xa, 142], [xa, 132], [xa + 10, 132]), [xb - 10, 132], ...coin([xb - 10, 132], [xb, 132], [xb, 142]), [xb, 230]];
    const boucle = fil(chemin(ptsBoucle).d, C.metal, 3);
    // Les électrons naissent dans le zinc immergé, traversent le circuit et sont consommés dans le cuivre immergé.
    const cElec = chemin([[XZ, 412], [XZ, 252], ...ptsBoucle, [XC, 252], [XC, 412]]);
    const gElec = el('g', {}, scene);
    const electrons = Array.from({ length: 22 }, () => {
      const g = el('g', {}, gElec);
      el('circle', { r: 6.5, fill: C.jaune, opacity: 0.22 }, g);
      el('circle', { r: 3.2, fill: C.jaune, stroke: C.fond, 'stroke-width': 1 }, g);
      return g;
    });
    const pCom = pince(92, C.bleu), pV = pince(XC + 6, C.corail), pB1 = pince(xa, C.metal), pB2 = pince(xb, C.metal);
    const xr = (XZ + XC) / 2;
    const gRes = el('g', {}, scene);
    el('rect', { x: xr - 42, y: 120, width: 84, height: 24, rx: 6, fill: C.panneau, stroke: C.verre, 'stroke-width': 2.5 }, gRes);
    [[-26, C.jaune], [-14, C.violet], [16, C.orange]].forEach(([dx, c]) => el('rect', { x: xr + (dx as number), y: 121.5, width: 6, height: 21, fill: c, opacity: 0.9 }, gRes));
    const etqR = etiquette(gRes, { x: xr, y: 108, texte: '', ancre: 'middle', taille: 13, mono: true });
    const gE = el('g', {}, scene), gI = el('g', {}, scene);
    fleche(gE, { x1: 116, y1: 157, x2: 158, y2: 157, couleur: C.jaune });
    etiquette(gE, { x: 165, y: 162, texte: 'e⁻', taille: 14, couleur: C.jaune });
    fleche(gI, { x1: 334, y1: 157, x2: 292, y2: 157, couleur: C.corail });
    const etqI = etiquette(gI, { x: 284, y: 162, texte: '', ancre: 'end', taille: 13, mono: true, couleur: C.corail });
    const etqUsee = etiquette(scene, { x: xr, y: 196, texte: L('Pile usée : plus d\'ions Cu²⁺', 'Cell exhausted: no Cu²⁺ left'), ancre: 'middle', taille: 14, couleur: C.corail });

    // Bornes (étape 2), noms des lames et variations de masse (étape 5).
    const borne = (x: number, signe: string, couleur: string) => {
      const g = el('g', {}, scene);
      g.style.transformOrigin = `${x}px 222px`;
      el('circle', { cx: x, cy: 222, r: 11, fill: C.fond, stroke: couleur, 'stroke-width': 2.5 }, g);
      texte(g, x, 228, signe, { fill: couleur, 'font-family': MONO, 'font-size': 18, 'font-weight': 700, 'text-anchor': 'middle' });
      return g;
    };
    const pop = (g: SVGGElement, p: number) => { g.style.opacity = String(clamp(p * 3)); g.style.transform = `scale(${p})`; };
    const moins = borne(50, '−', C.bleu), plus = borne(400, '+', C.corail);
    const etqZn = etiquette(scene, { x: 50, y: 258, texte: 'Zn', ancre: 'middle' });
    const etqCu = etiquette(scene, { x: 400, y: 258, texte: 'Cu', ancre: 'middle', couleur: C.orange });
    const etqDmZn = etiquette(scene, { x: 50, y: 277, texte: '', ancre: 'middle', taille: 13, mono: true, couleur: ZINC });
    const etqDmCu = etiquette(scene, { x: 400, y: 277, texte: '', ancre: 'middle', taille: 13, mono: true, couleur: C.orange });

    // Colonne de droite : voltmètre, demi-équations, bilan, chronomètre.
    const volt = appareil(scene, { x: X0, y: 24, w: W0, h: 66, titre: L('VOLTMÈTRE', 'VOLTMETER') });
    const chrono = appareil(scene, { x: X0, y: 372, w: W0, h: 68, titre: L('CHRONO (ACCÉLÉRÉ)', 'TIMER (SPEEDED UP)'), couleur: C.jaune });
    const carte = (y: number, h: number, bord: string) => {
      const g = el('g', {}, scene);
      el('rect', { x: X0, y, width: W0, height: h, rx: 12, fill: C.panneau, stroke: bord, 'stroke-width': 1.5 }, g);
      return g;
    };
    const ligne = (g: SVGGElement, y: number, contenu: string, couleur: string, taille = 13, police = MONO) =>
      texte(g, X0 + 14, y, contenu, { fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 });
    const cAnode = carte(98, 48, C.bleu), cCathode = carte(152, 48, C.corail), cBilan = carte(208, 156, C.jaune);
    ligne(cAnode, 117, L('Anode (−) : oxydation', 'Anode (−): oxidation'), C.bleu, 13, POLICE);
    ligne(cAnode, 137, 'Zn → Zn²⁺ + 2 e⁻', C.texte, 14);
    ligne(cCathode, 171, L('Cathode (+) : réduction', 'Cathode (+): reduction'), C.corail, 13, POLICE);
    ligne(cCathode, 191, 'Cu²⁺ + 2 e⁻ → Cu', C.texte, 14);
    const bilan = [ligne(cBilan, 229, '', C.discret, 13, POLICE), ligne(cBilan, 251, '', C.texte), ligne(cBilan, 271, '', C.texte), ligne(cBilan, 295, '', ZINC, 15), ligne(cBilan, 316, '', C.orange, 15), ligne(cBilan, 338, '', C.discret, 13, POLICE)];
    el('rect', { x: X0 + 14, y: 345, width: W0 - 28, height: 9, rx: 4.5, fill: C.fond, stroke: C.metal, 'stroke-width': 1.2 }, cBilan);
    const jauge = el('rect', { x: X0 + 14, y: 345, height: 9, rx: 4.5 }, cBilan);

    return ({ etape, t, T, p }) => {
      const img = { etape, t };
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((i) => avancement(img, i));
      const pile: Pile = { e: E_VIDE, r: R_INT, R: p.r, c: C0, v: V_SOL };

      // Étape 5 : le temps s'écoule en accéléré. Tout l'état chimique se déduit de la charge débitée.
      const duree = p.duree * 3600, vie = dureeVie(pile), qMax = capacite(pile);
      const ts = duree * seg(a5, 0.08, 0.96, ease.lin);
      const q = charge(ts, pile);
      const usee = ts >= vie;
      const vigueur = clamp(1 - (ts - vie) / (0.03 * duree)); // 1 tant que la pile débite, 0 une fois usée
      const mZn = masseZinc(q) * 1000, mCu = masseCuivre(q) * 1000; // mg
      const teinte = mix(C.discret, C.bleu, concentrationCuivre(q, pile) / C0);

      // Étape 1 : on verse les solutions, puis les lames descendent.
      const verser = (debut: number, rec: Recipient, f: SVGLineElement, couleur: string) => {
        const r = clamp((a1 - debut) / 0.34), y = rec.ySurface(NIVEAU * seg(r, 0.1, 0.95));
        rec.liquide(NIVEAU * seg(r, 0.1, 0.95), couleur);
        set(f, { y1: lerp(-10, y, seg(r, 0.86, 1, ease.in)), y2: lerp(-10, y, seg(r, 0, 0.14, ease.in)), stroke: couleur });
        f.style.opacity = r > 0 && r < 1 ? '0.85' : '0';
      };
      verser(0.04, bZn, filetZn, C.discret);
      verser(0.18, bCu, filetCu, teinte);
      show(etqSolZn, seg(a1, 0.36, 0.46));
      show(etqSolCu, seg(a1, 0.5, 0.6));
      gZn.style.transform = `translateY(${lerp(-440, 0, seg(a1, 0.54, 0.76, ease.out))}px)`;
      gCu.style.transform = `translateY(${lerp(-440, 0, seg(a1, 0.66, 0.88, ease.out))}px)`;
      show(etqZn, seg(a1, 0.76, 0.86));
      show(etqCu, seg(a1, 0.88, 0.98));

      // Usure des lames : le zinc est rongé, le cuivre se couvre d'un dépôt.
      const ronge = 8.5 * clamp(mZn / M_REF), ep = 10 * clamp(mCu / M_REF);
      lameZn.setAttribute('d', lame(XZ, YS, (i, c) => -ronge * relief[i + (c > 0 ? 0 : N + 1)]));
      fantome.style.opacity = String(0.7 * clamp(ronge / 1.5));
      set(depot, { d: lame(XC, YS, (i, c) => ep * relief[2 * (N + 1) + i + (c > 0 ? 0 : N + 1)], ep * 0.5), 'stroke-width': Math.min(2.5, ep) });

      // Étape 2 : voltmètre branché (0 V), puis le pont salin ferme la pile : 1,10 V et polarité.
      show(volt.g, seg(a2, 0, 0.14), 14);
      tracer(filCom, seg(a2, 0.14, 0.4));
      tracer(filV, seg(a2, 0.22, 0.44));
      pCom.style.opacity = String(seg(a2, 0.38, 0.42));
      pV.style.opacity = String(seg(a2, 0.42, 0.46));
      gPont.style.opacity = String(seg(a2, 0.5, 0.55));
      gPont.style.transform = `translateY(${lerp(-420, 0, seg(a2, 0.5, 0.74, ease.out))}px)`;
      show(etqPont, seg(a2, 0.74, 0.84));
      const vide = E_VIDE * seg(a2, 0.74, 0.88, ease.out);
      pop(moins, seg(a2, 0.86, 0.95, ease.backOut));
      pop(plus, seg(a2, 0.91, 1, ease.backOut));

      // Étape 3 : le conducteur ohmique ferme le circuit, électrons dans les fils, ions dans le pont.
      tracer(boucle, seg(a3, 0, 0.26));
      pB1.style.opacity = String(seg(a3, 0, 0.04));
      pB2.style.opacity = String(seg(a3, 0.24, 0.28));
      gRes.style.opacity = String(seg(a3, 0.08, 0.18));
      gRes.style.transform = `translateY(${lerp(-70, 0, seg(a3, 0.08, 0.3, ease.backOut))}px)`;
      etqR.textContent = `R = ${fmt(p.r, 0)} Ω`;
      const ferme = seg(a3, 0.3, 0.42);
      const i = ferme > 0 ? intensite(pile) * vigueur : 0;
      const u = lerp(vide, tension(pile), seg(a3, 0.3, 0.5)) * vigueur;
      const debit = 0.4 + 22 * intensite(pile); // cadence des particules, 1 pour le réglage par défaut
      volt.affiche(a2 > 0.1 ? `${fmt(u, 2)} V` : '');
      gElec.style.opacity = String(ferme * vigueur);
      electrons.forEach((n, k) => {
        const f = (T * 0.072 * debit + k / electrons.length) % 1, pt = cElec.en(f);
        set(n, { transform: `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`, opacity: seg(f, 0, 0.07) * (1 - seg(f, 0.93, 1)) });
      });
      show(gE, seg(a3, 0.44, 0.56));
      show(gI, seg(a3, 0.56, 0.68));
      etqI.textContent = `I = ${fmt(i * 1000, 1)} mA`;
      gIonsPont.style.opacity = String(seg(a3, 0.7, 0.82) * vigueur);
      ionsPont.forEach((n, k) => {
        const f = (T * 0.053 * debit + (k >> 1) / 5 + (k % 2) * 0.1) % 1, sens = k % 2 ? -1 : 1; // K+ vers le cuivre, NO3- vers le zinc
        const pt = cPont.en(sens > 0 ? f : 1 - f);
        set(n, { cx: pt.x - pt.ty * 3.3 * sens, cy: pt.y + pt.tx * 3.3 * sens, opacity: Math.sin(Math.PI * f) ** 0.5 });
      });
      show(etqNO3, seg(a3, 0.76, 0.88));
      show(etqK, seg(a3, 0.84, 0.96));
      show(etqUsee, usee ? 1 - vigueur : 0);

      // Étape 4 : à l'anode le zinc passe en solution, à la cathode les ions cuivre se déposent.
      const pulse = 0.6 + 0.4 * Math.sin(T * 6);
      haloZn.style.opacity = String(seg(a4, 0.03, 0.1) * (1 - seg(a4, 0.36, 0.46)) * pulse);
      haloCu.style.opacity = String(seg(a4, 0.46, 0.53) * (1 - seg(a4, 0.8, 0.9)) * pulse);
      gIonsZn.style.opacity = String(seg(a4, 0.06, 0.2) * vigueur);
      ionsZn.forEach((o, k) => {
        const f = (T * o.v * debit + o.ph) % 1;
        set(o.n, { cx: XZ + 16 - ronge * 0.8 + (20 + 22 * o.dx) * ease.out(f), cy: o.y + Math.sin(T * 2 + k) * 2.5 - f * 5, opacity: Math.sin(Math.PI * f) ** 0.6 });
      });
      show(etqIonZn, seg(a4, 0.1, 0.22));
      show(cAnode, seg(a4, 0.14, 0.3, ease.out));
      gIonsCu.style.opacity = String(seg(a4, 0.48, 0.62) * vigueur);
      ionsCu.forEach((o, k) => {
        const f = (T * o.v * debit + o.ph) % 1;
        set(o.n, { cx: lerp(293 + 14 * o.dx, XC - 15 - ep * 0.8, ease.in(f) * 0.5 + f * 0.5), cy: o.y + Math.sin(T * 2 + k) * 2.5 * (1 - f), opacity: seg(f, 0, 0.2) * (1 - seg(f, 0.92, 1)), fill: mix(C.cyan, C.orange, seg(f, 0.72, 0.95)) });
      });
      show(etqIonCu, seg(a4, 0.52, 0.64) * vigueur); // plus d'ions Cu2+ à étiqueter quand la pile est usée
      show(cCathode, seg(a4, 0.56, 0.72, ease.out));

      // Étape 5 : chronomètre et variations de masse affichées près des lames.
      show(chrono.g, seg(a5, 0, 0.07), 14);
      chrono.affiche(`${Math.floor(ts / 3600)} h ${String(Math.floor((ts % 3600) / 60)).padStart(2, '0')}`);
      show(etqDmZn, seg(a5, 0.04, 0.12));
      show(etqDmCu, seg(a5, 0.04, 0.12));
      etqDmZn.textContent = `${mZn < 0.5 ? '' : '−'}${fmt(mZn, 0)} mg`;
      etqDmCu.textContent = `${mCu < 0.5 ? '' : '+'}${fmt(mCu, 0)} mg`;

      // Étape 6 : bilan de matière, ligne après ligne, puis jauge de capacité.
      const reste = 1 - q / qMax, niveau = lerp(1, reste, seg(a6, 0.74, 0.96));
      show(cBilan, seg(a6, 0.05, 0.3, ease.out), 16);
      bilan.forEach((n, k) => { n.style.opacity = String(seg(a6, 0.2 + 0.09 * k, 0.32 + 0.09 * k)); });
      [
        L(`Bilan après ${fmt(ts / 3600, 1)} h`, `Summary after ${fmt(ts / 3600, 1)} h`),
        `Q = ${usee ? 'Qmax' : 'I·Δt'} = ${fmt(q, 0)} C`,
        `n(e⁻) = ${fmt(quantiteElectrons(q) * 1000, 2)} mmol`,
        L(`Zn : −${fmt(mZn, 0)} mg`, `Zn: −${fmt(mZn, 0)} mg`),
        L(`Cu : +${fmt(mCu, 0)} mg`, `Cu: +${fmt(mCu, 0)} mg`),
        usee ? L(`Pile usée en ${fmt(vie / 3600, 1)} h`, `Cell exhausted in ${fmt(vie / 3600, 1)} h`) : L(`Capacité restante : ${fmt(100 * reste, 0)} %`, `Remaining capacity: ${fmt(100 * reste, 0)}%`),
      ].forEach((s, k) => { bilan[k].textContent = s; });
      set(jauge, { width: (W0 - 28) * niveau, fill: mix(C.corail, C.menthe, niveau) });

      if (graphique) {
        if (a5 > 0) {
          const h = ts / 3600, coude = Math.min(h, vie / 3600), cap = masseCuivre(qMax) * 1000;
          const fin = a6 > 0.1, lisible = mZn + mCu > 48; // au-dessous, les deux étiquettes se chevaucheraient
          graphique.courbe('zn', [[0, 0], [coude, -mZn], [h, -mZn]], { couleur: ZINC, epaisseur: 3 });
          graphique.courbe('cu', [[0, 0], [coude, mCu], [h, mCu]], { couleur: C.orange, epaisseur: 3 });
          graphique.horizontale('cap', cap, { couleur: C.discret });
          graphique.horizontale('capTexte', cap, { couleur: C.discret, epaisseur: 0, label: L('Cu²⁺ épuisé', 'Cu²⁺ used up') });
          graphique.opacite('cap', seg(a5, 0, 0.08));
          graphique.opacite('capTexte', seg(a5, 0, 0.08) * clamp((cap - mCu - 60) / 40)); // s'efface quand la courbe du cuivre l'atteint
          graphique.repere('pz', h, -mZn, { couleur: ZINC, rayon: 4, label: !lisible ? undefined : fin ? L(`Zn : −${fmt(mZn, 0)} mg`, `Zn: −${fmt(mZn, 0)} mg`) : 'Zn' });
          graphique.repere('pc', h, mCu, { couleur: C.orange, rayon: 4, label: !lisible ? undefined : fin ? L(`Cu : +${fmt(mCu, 0)} mg`, `Cu: +${fmt(mCu, 0)} mg`) : 'Cu' });
          if (usee) {
            graphique.verticale('vie', vie / 3600, { couleur: C.corail });
            graphique.repere('usee', vie / 3600, 0, { couleur: C.corail, rayon: 4, label: L(`pile usée à ${fmt(vie / 3600, 1)} h`, `exhausted at ${fmt(vie / 3600, 1)} h`) });
          } else {
            graphique.effacer('vie');
            graphique.effacer('usee');
          }
        } else graphique.effacer();
      }

      const mesures = [
        { label: L('Tension U', 'Voltage U'), valeur: a2 > 0.1 ? `${fmt(u, 2)} V` : '...' },
        { label: L('Intensité I', 'Current I'), valeur: `${fmt(i * 1000, 1)} mA` },
      ];
      if (a5 > 0) mesures.push({ label: L('Charge débitée Q', 'Charge delivered Q'), valeur: `${fmt(q, 0)} C` });
      if (a6 > 0) mesures.push({ label: L('Capacité de la pile', 'Cell capacity'), valeur: `${fmt(qMax, 0)} C` });
      return mesures;
    };
  },
});
