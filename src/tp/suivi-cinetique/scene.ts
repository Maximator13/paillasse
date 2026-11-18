import { L, avancement, clamp, ease, el, fmt, lerp, mix, remap, rng, seg, set, show, texte, uid } from '../../lib/anim';
import { appareil, etiquette, paillasse, thermometre, tubeEssai } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT, themeSombre } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { absorbance, concentration, constanteVitesse, demiReaction, regression, releves } from './model';

const T_MAX = 360; // s, durée du suivi
const DT = 12; // s, entre deux relevés
const SEUIL = 0.01; // absorbance en dessous de laquelle la mesure n'est plus exploitable
const THETA_REF = 25, CAT_REF = 0.05; // réglages de départ
const XC = 340, Y_F = 392; // axe de la cuve, hauteur du faisceau
const X_ENTREE = 214, Y_HAUT = 296, Y_PLONGE = 398, Y_VERSE = 362; // trajet de la pipette (pointe)
const CX = 76, CY = 92, L_ARC = 2 * Math.PI * 25; // chronomètre
const ZONE = { x: 414, y: 54, w: 200, h: 150 }; // vue microscopique
const AXE_A = { label: 'Absorbance A', min: 0, max: 1.6, pas: 0.4 };
const AXE_LN = { label: 'ln A', min: -5, max: 1, pas: 1 };

/** Intensité perçue de la teinte bleue pour une absorbance donnée (0 : incolore, 1 : saturée). */
const intensite = (a: number) => 1 - Math.exp(-1.6 * a);
const couleur = (a: number) => mix(C.verre, C.bleu, intensite(a));
/** Valeur selon le thème courant (un même voile ne se voit pas pareil sur fond nuit et sur fond blanc). */
const selon = (sombre: number, clair: number) => (themeSombre() ? sombre : clair);
/** Dégradé à identifiant unique, renvoie la valeur de fill correspondante. */
function remplissage(g: Element, type: 'linearGradient' | 'radialGradient', attrs: Record<string, string | number>, arrets: [number, string, number][]) {
  const id = uid('degrade');
  const gr = el(type, { id, ...attrs }, el('defs', {}, g));
  for (const [offset, c, o] of arrets) el('stop', { offset, 'stop-color': c, 'stop-opacity': o }, gr);
  return `url(#${id})`;
}
/** Ombre douce sur la paillasse sous un objet posé, centré en cx, de demi-largeur rx. */
const ombreSol = (g: Element, cx: number, rx: number) =>
  el('ellipse', { cx, cy: 436, rx: rx * 1.08, ry: 9, fill: remplissage(g, 'radialGradient', {}, [[0, C.ombre, selon(0.6, 0.22)], [0.6, C.ombre, selon(0.32, 0.1)], [1, C.ombre, 0]]) }, g);
const opacite = (a: number) => lerp(0.3, 0.92, intensite(a));
/** Onde triangulaire : va-et-vient entre 0 et L (rebonds sur les parois). */
const tri = (v: number, L: number) => {
  const m = ((v % (2 * L)) + 2 * L) % (2 * L);
  return m < L ? m : 2 * L - m;
};

/** Prélèvement : la pipette entre, plonge dans le tube d'abscisse xs, aspire, rejoint la cuve, verse et repart. */
function trajet(a: number, xs: number) {
  const vers = seg(a, 0.46, 0.64), aspire = seg(a, 0.24, 0.36), verse = seg(a, 0.72, 0.9);
  return {
    x: lerp(lerp(X_ENTREE, xs, seg(a, 0.04, 0.14)), XC, vers),
    y: lerp(-20, Y_HAUT, seg(a, 0, 0.1, ease.out)) + (Y_PLONGE - Y_HAUT) * (seg(a, 0.14, 0.24) - seg(a, 0.36, 0.46))
      - 24 * Math.sin(Math.PI * vers) + (Y_VERSE - Y_HAUT) * seg(a, 0.64, 0.72) - (Y_VERSE + 20) * seg(a, 0.9, 1, ease.in),
    aspire,
    verse,
    plein: aspire - verse,
    presse: seg(a, 0.14, 0.24) - aspire + verse - seg(a, 0.9, 1),
  };
}

export default definirScene({
  etapes: [
    { titre: L('Préparer la cuve', 'Prepare the cuvette'), duree: 6, texte: L('À la pipette, on introduit dans la cuve du spectrophotomètre une solution de <strong>bleu de méthylène</strong>, maintenue à la température choisie. L\'appareil est réglé sur <strong>665 nm</strong>, longueur d\'onde que ce colorant absorbe le plus.', 'Using a pipette, a solution of <strong>methylene blue</strong>, kept at the chosen temperature, is put into the cuvette of the spectrophotometer. The instrument is set to <strong>665 nm</strong>, the wavelength this dye absorbs most strongly.') },
    { titre: L('Déclencher la réaction', 'Start the reaction'), duree: 6, texte: L('On ajoute l\'<strong>acide ascorbique</strong> (vitamine C), en large excès et acidifié, puis on déclenche le chronomètre. Il transforme peu à peu l\'ion bleu BM<sup>+</sup> en une espèce incolore : la transformation est <strong>lente</strong>.', 'The <strong>ascorbic acid</strong> (vitamin C), acidified and in large excess, is added and the stopwatch is started. It gradually converts the blue BM<sup>+</sup> ion into a colourless species: the transformation is <strong>slow</strong>.') },
    { titre: L('Suivre l\'absorbance', 'Follow the absorbance'), duree: 14, texte: L('La solution se décolore et laisse passer de plus en plus de lumière. D\'après la loi de Beer-Lambert, l\'absorbance <strong>A</strong> est proportionnelle à [BM<sup>+</sup>] : la courbe suit en direct la disparition du colorant.', 'The solution loses its colour and lets more and more light through. According to the Beer-Lambert law, the absorbance <strong>A</strong> is proportional to [BM<sup>+</sup>]: the curve follows the disappearance of the dye in real time.') },
    { titre: L('Lire le temps de demi-réaction', 'Read off the half-life'), duree: 8, texte: L('Le temps de demi-réaction <strong>t<sub>1/2</sub></strong> est la durée au bout de laquelle l\'avancement atteint la moitié de sa valeur finale : ici, A est divisée par 2. Elle l\'est encore à chaque nouveau t<sub>1/2</sub>.', 'The half-life <strong>t<sub>1/2</sub></strong> is the time taken for the extent of reaction to reach half its final value: here, A is halved. It is halved again after every further t<sub>1/2</sub>.') },
    { titre: L('Vérifier l\'ordre 1', 'Check for first order'), duree: 7, texte: L('Pour une loi de vitesse d\'ordre 1, [BM<sup>+</sup>] = [BM<sup>+</sup>]<sub>0</sub>·e<sup>−kt</sup> : les points <strong>ln A = f(t)</strong> sont alignés. La pente de la droite vaut <strong>−k</strong>, et t<sub>1/2</sub> = ln 2 / k.', 'For a first-order rate law, [BM<sup>+</sup>] = [BM<sup>+</sup>]<sub>0</sub>·e<sup>−kt</sup>: the points <strong>ln A = f(t)</strong> lie on a straight line. The gradient of the line is <strong>−k</strong>, and t<sub>1/2</sub> = ln 2 / k.') },
    { titre: L('Agir sur les facteurs cinétiques', 'Change the kinetic factors'), duree: 6, texte: L('Chauffez ou ajoutez du <strong>catalyseur</strong> (ions H<sub>3</sub>O<sup>+</sup>, non consommés) : k augmente et t<sub>1/2</sub> chute (en pointillés, la courbe de départ). Changez la concentration du colorant : la courbe part de plus haut, mais <strong>t<sub>1/2</sub> ne bouge pas</strong>, signature de l\'ordre 1.', 'Heat the mixture or add some <strong>catalyst</strong> (H<sub>3</sub>O<sup>+</sup> ions, not used up): k increases and t<sub>1/2</sub> drops (dotted line: the initial curve). Change the concentration of the dye: the curve starts higher, but <strong>t<sub>1/2</sub> does not change</strong>, the signature of first order.') },
  ],
  parametres: [
    { id: 'theta', label: L('Température', 'Temperature'), min: 15, max: 40, pas: 1, valeur: THETA_REF, unite: '°C' },
    { id: 'c0', label: L('Concentration initiale du colorant', 'Initial concentration of the dye'), min: 5, max: 20, pas: 1, valeur: 10, unite: 'µmol/L' },
    { id: 'cat', label: L('Catalyseur : ions H3O+ ajoutés', 'Catalyst: H3O+ ions added'), min: 0, max: 0.1, pas: 0.01, valeur: CAT_REF, unite: 'mol/L', decimales: 2 },
  ],
  graphique: { x: { label: 't (s)', min: 0, max: T_MAX, pas: 60 }, y: AXE_A },
  affiche: { etape: 2, t: 0.3 },

  monter({ scene, graphique }) {
    paillasse(scene);

    // Bain thermostaté : les deux solutions y prennent la température choisie.
    ombreSol(scene, 118, 92);
    const eau = el('path', { d: 'M27 370H209V428Q209 439 198 439H38Q27 439 27 428Z', 'fill-opacity': 0.26 }, scene);
    el('line', { x1: 28, x2: 208, y1: 370, y2: 370, stroke: C.blanc, 'stroke-width': 2, opacity: selon(0.3, 0.8) }, scene);
    el('path', { d: 'M26 354V428Q26 440 38 440H198Q210 440 210 428V354', fill: 'none', stroke: C.trait, 'stroke-width': TRAIT, 'stroke-linecap': 'round' }, scene);
    const tubeBM = tubeEssai(scene, { x: 64, y: 432, h: 116 });
    const tubeVitC = tubeEssai(scene, { x: 132, y: 432, h: 116 });
    const thermo = thermometre(scene, { x: 184, y: 432, h: 124 });
    etiquette(scene, { x: 64, y: 462, texte: L('Colorant', 'Dye'), ancre: 'middle', taille: 13, couleur: C.bleu });
    etiquette(scene, { x: 132, y: 462, texte: 'Vit. C', ancre: 'middle', taille: 13, couleur: C.cyan });
    const etiqTheta = etiquette(scene, { x: 184, y: 462, texte: '', ancre: 'middle', taille: 13, mono: true, couleur: C.corail });

    // Spectrophotomètre en coupe : lampe, faisceau, cuve, détecteur, afficheur.
    const spec = el('g', {}, scene);
    ombreSol(spec, 430, 194);
    el('rect', { x: 236, y: 326, width: 388, height: 114, rx: 12, fill: remplissage(spec, 'linearGradient', { x1: 0, y1: 0, x2: 0, y2: 1 }, [[0, mix(C.panneau, C.metal, selon(0.22, 0.14)), 1], [1, C.panneau, 1]]), stroke: C.metal, 'stroke-width': 2 }, spec);
    el('path', { d: 'M248 328.5H612', stroke: C.blanc, 'stroke-width': 1.5, opacity: selon(0.18, 0.9), 'stroke-linecap': 'round' }, spec);
    el('rect', { x: 250, y: 340, width: 196, height: 86, rx: 8, fill: C.fond, stroke: C.grille, 'stroke-width': 1.5 }, spec);
    el('path', { d: 'M256 342H319M361 342H440', stroke: C.ombre, 'stroke-width': 2, opacity: selon(0.5, 0.12), 'stroke-linecap': 'round' }, spec);
    el('rect', { x: XC - 19, y: 324, width: 38, height: 18, fill: C.fond }, spec);
    const halo = el('circle', { cx: 270, cy: Y_F, r: 16, fill: C.orange, opacity: 0 }, spec);
    const lampe = el('circle', { cx: 270, cy: Y_F, r: 8, stroke: C.metal, 'stroke-width': 2 }, spec);
    const lambda = etiquette(spec, { x: 258, y: 362, texte: '665 nm', taille: 13, mono: true });
    const fInc = el('rect', { x: 278, y: Y_F - 2.5, height: 5, rx: 2.5, fill: C.orange }, spec);
    const fTr = el('rect', { x: XC + 15, y: Y_F - 2.5, height: 5, rx: 2.5, fill: C.orange }, spec);
    el('rect', { x: 408, y: 376, width: 12, height: 32, rx: 3, fill: C.metal }, spec);
    el('path', { d: 'M420 392H462', stroke: C.metal, 'stroke-width': 2 }, spec);
    const aff = appareil(spec, { x: 462, y: 338, w: 150, h: 76, titre: 'ABSORBANCE' });
    etiquette(scene, { x: 430, y: 462, texte: L('Spectrophotomètre', 'Spectrophotometer'), ancre: 'middle', taille: 13, couleur: C.discret });
    const liqCuve = el('rect', { x: XC - 14, width: 28, rx: 3 }, spec);
    const idF = uid('faisceau');
    const degrade = el('linearGradient', { id: idF, gradientUnits: 'userSpaceOnUse', x1: XC - 15, x2: XC + 15, y1: 0, y2: 0 }, el('defs', {}, spec));
    el('stop', { offset: 0, 'stop-color': C.orange }, degrade);
    const stopFin = el('stop', { offset: 1, 'stop-color': C.orange }, degrade);
    const fCuve = el('rect', { x: XC - 15, y: Y_F - 2.5, height: 5, fill: `url(#${idF})` }, spec);
    el('path', { d: `M${XC - 15} 350V408Q${XC - 15} 413 ${XC - 10} 413H${XC + 10}Q${XC + 15} 413 ${XC + 15} 408V350`, fill: C.verre, 'fill-opacity': selon(0.08, 0.3), stroke: C.trait, 'stroke-width': TRAIT, 'stroke-linecap': 'round' }, spec);
    el('line', { x1: XC - 9, x2: XC - 9, y1: 356, y2: 404, stroke: C.blanc, 'stroke-width': 2, opacity: selon(0.2, 0.55), 'stroke-linecap': 'round' }, spec);
    el('rect', { x: XC - 21, y: 414.5, width: 42, height: 6, rx: 2, fill: C.metal }, spec);
    const capot = el('rect', { x: XC - 25, y: 320, width: 50, height: 9, rx: 3, fill: C.metal }, spec);

    // Chronomètre : l'aiguille fait un tour par minute, l'arc vert suit la durée totale du suivi.
    const chrono = el('g', {}, scene);
    const bouton = el('g', {}, chrono);
    el('rect', { x: CX - 4, y: CY - 53, width: 8, height: 10, fill: C.metal }, bouton);
    el('rect', { x: CX - 10, y: CY - 61, width: 20, height: 9, rx: 3, fill: C.orange }, bouton);
    el('circle', { cx: CX + 2, cy: CY + 4, r: 45, fill: C.ombre, opacity: selon(0.35, 0.1) }, chrono);
    el('circle', { cx: CX, cy: CY, r: 44, fill: remplissage(chrono, 'radialGradient', { cx: 0.4, cy: 0.35, r: 0.7 }, [[0, C.panneau, 1], [1, mix(C.panneau, C.metal, selon(0.22, 0.14)), 1]]), stroke: C.trait, 'stroke-width': TRAIT }, chrono);
    for (let i = 0; i < 12; i++) {
      el('line', { x1: CX, x2: CX, y1: CY - 40, y2: CY - (i % 3 ? 36 : 33), stroke: i % 3 ? C.discret : C.trait, 'stroke-width': i % 3 ? 1.5 : 2.2, 'stroke-linecap': 'round', transform: `rotate(${i * 30} ${CX} ${CY})` }, chrono);
    }
    el('circle', { cx: CX, cy: CY, r: 25, fill: 'none', stroke: C.grille, 'stroke-width': 4 }, chrono);
    const arc = el('circle', { cx: CX, cy: CY, r: 25, fill: 'none', stroke: C.menthe, 'stroke-width': 4, 'stroke-linecap': 'round', transform: `rotate(-90 ${CX} ${CY})` }, chrono);
    const aiguille = el('line', { x1: CX, x2: CX, y1: CY + 9, y2: CY - 34, stroke: C.corail, 'stroke-width': 3, 'stroke-linecap': 'round' }, chrono);
    el('circle', { cx: CX, cy: CY, r: 4.5, fill: C.trait }, chrono);
    const etiqT = etiquette(scene, { x: CX, y: 162, texte: '', ancre: 'middle', mono: true });

    // Vue microscopique de la cuve.
    const loupe = el('g', {}, scene);
    el('line', { x1: XC + 4.5, y1: 364, x2: 418, y2: 236, stroke: C.discret, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, loupe);
    el('circle', { cx: XC, cy: 372, r: 9, fill: 'none', stroke: C.discret, 'stroke-width': 1.5 }, loupe);
    el('rect', { x: 404, y: 24, width: 220, height: 212, rx: 14, fill: C.panneau, stroke: C.metal, 'stroke-width': 1.5 }, loupe);
    el('rect', { x: ZONE.x, y: ZONE.y, width: ZONE.w, height: ZONE.h, rx: 8, fill: C.fond }, loupe);
    const legende = { 'font-family': POLICE, 'font-size': 13, 'font-weight': 600 };
    el('circle', { cx: 422, cy: 39.5, r: 5.5, fill: C.bleu }, loupe);
    const compteur = texte(loupe, 434, 44, '', { ...legende, fill: C.texte });
    el('circle', { cx: 422, cy: 221.5, r: 5, fill: 'none', stroke: C.discret, 'stroke-width': 1.3 }, loupe);
    texte(loupe, 434, 226, L('incolore', 'colourless'), { ...legende, fill: C.discret });
    // « colourless » est plus long que « incolore » : la seconde légende se décale en anglais.
    const xCat = Number(L('506', '516'));
    el('circle', { cx: xCat, cy: 221.5, r: 2.6, fill: C.cyan }, loupe);
    texte(loupe, xCat + 8, 226, L('H3O+ catalyseur', 'H3O+ catalyst'), { ...legende, fill: C.discret });
    const idZ = uid('zone');
    el('rect', { x: ZONE.x, y: ZONE.y, width: ZONE.w, height: ZONE.h, rx: 8 }, el('clipPath', { id: idZ }, loupe));
    const gP = el('g', { 'clip-path': `url(#${idZ})` }, loupe);
    const alea = rng(11);
    const signe = () => (alea() < 0.5 ? -1 : 1);
    const mobile = (v: number) => ({ x0: alea() * 900, y0: alea() * 900, vx: signe() * v * (1 + alea()), vy: signe() * v * (1 + alea()), ph: alea() * 6.28 });
    type Mobile = ReturnType<typeof mobile>;
    const hos = Array.from({ length: 32 }, () => ({ ...mobile(26), n: el('circle', { r: 2.3, fill: C.cyan }, gP) }));
    // u : fraction restante de colorant à laquelle l'ion réagit (suite du nombre d'or, bien répartie quel que soit l'effectif).
    const cvs = Array.from({ length: 48 }, (_, i) => ({
      ...mobile(13), u: ((i + 0.5) * 0.618034) % 1,
      halo: el('circle', { fill: 'none', stroke: C.texte, 'stroke-width': 1.6 }, gP),
      n: el('circle', { r: 5.5, fill: C.bleu, 'stroke-width': 1.3 }, gP),
    }));
    const position = (m: Mobile, T: number, s: number, marge: number) => ({
      cx: ZONE.x + marge + tri(m.x0 + m.vx * s * T, ZONE.w - 2 * marge) + 2 * Math.sin(T * 5 * s + m.ph),
      cy: ZONE.y + marge + tri(m.y0 + m.vy * s * T, ZONE.h - 2 * marge) + 2 * Math.cos(T * 4.3 * s + m.ph),
    });

    // Bilan (étapes 4 à 6) : cuves témoins à 0, t1/2, 2 t1/2, 3 t1/2, puis loi d'ordre 1.
    const bilan = el('g', {}, scene);
    const cadre = el('rect', { x: 150, y: 24, width: 242, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, bilan);
    texte(bilan, 166, 47, L('A divisée par 2 à chaque t1/2', 'A halves at every t1/2'), { ...legende, fill: C.discret });
    const mono = { 'font-family': MONO, 'font-size': 13, 'font-weight': 600 };
    const minis = [0, 1, 2, 3].map((n) => {
      const x = 184 + 58 * n, g = el('g', {}, bilan);
      const corps = el('rect', { x: -12, y: -19, width: 24, height: 38, rx: 4, stroke: C.trait, 'stroke-width': 2 }, g);
      const date = texte(bilan, x, 119, '', { ...mono, fill: C.texte, 'text-anchor': 'middle' });
      const div = n ? texte(bilan, x - 29, 84, '÷2', { ...mono, fill: C.jaune, 'text-anchor': 'middle' }) : null;
      return { x, g, corps, date, div };
    });
    const ligne = (y: number, taille: number, c: string) => el('text', { ...mono, x: 166, y, fill: c, 'font-size': taille }, bilan);
    const lLoi = ligne(156, 14, C.texte), lK = ligne(180, 15, C.jaune), lT = ligne(204, 15, C.jaune), lRef = ligne(228, 13, C.corail);
    lLoi.textContent = 'ln A = ln A0 − k·t';

    // Pipette (origine du groupe : la pointe).
    const pip = el('g', {}, scene);
    const idP = uid('pipette'), forme = 'M-4 -92V-14L-1.5 0H1.5L4 -14V-92';
    el('path', { d: forme + 'Z' }, el('clipPath', { id: idP }, pip));
    const liqPip = el('rect', { x: -5, width: 10, opacity: 0.9, 'clip-path': `url(#${idP})` }, pip);
    el('path', { d: forme, fill: C.verre, 'fill-opacity': selon(0.08, 0.3), stroke: C.trait, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, pip);
    const poire = el('ellipse', { cx: 0, cy: -104, fill: C.corail, stroke: C.trait, 'stroke-width': 2 }, pip);

    const kRef = constanteVitesse(THETA_REF, CAT_REF);
    let cle = '', fins: [number, number][] = [], points: [number, number][] = [], depart: [number, number][] = [], lnPts: [number, number][] = [];
    let droite = { pente: 0, ordonnee: 0 }, axeLn = false;

    return ({ etape, t, T, p }) => {
      const k = constanteVitesse(p.theta, p.cat), c0 = p.c0 * 1e-6, a0 = absorbance(c0), t12 = demiReaction(k);
      if (cle !== `${p.theta}|${p.c0}|${p.cat}`) {
        cle = `${p.theta}|${p.c0}|${p.cat}`;
        fins = releves(c0, k, T_MAX, 2);
        points = releves(c0, k, T_MAX, DT);
        depart = releves(c0, kRef, T_MAX, 2);
        lnPts = points.filter(([, a]) => a >= SEUIL).map(([x, a]) => [x, Math.log(a)]);
        droite = regression(lnPts);
      }
      const kMes = -droite.pente; // constante tirée des relevés, comme le fait l'élève
      const img = { etape, t };
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((i) => avancement(img, i));

      // Température du bain.
      eau.setAttribute('fill', mix(C.bleu, C.corail, remap(p.theta, 15, 40, 0, 1)));
      thermo.temperature(remap(p.theta, 0, 50, 0, 1));
      etiqTheta.textContent = `${fmt(p.theta, 0)} °C`;

      // Étapes 1 et 2 : la pipette apporte le colorant, puis l'acide ascorbique.
      const p1 = trajet(a1, 64), p2 = trajet(clamp(a2 / 0.66), 132), pp = etape === 0 ? p1 : p2;
      pip.setAttribute('transform', `translate(${pp.x} ${pp.y})`);
      set(liqPip, { y: -90 * pp.plein, height: 90 * pp.plein + 1, fill: etape === 0 ? C.bleu : C.verre });
      set(poire, { rx: 9 + 2.5 * pp.presse, ry: 13 - 4 * pp.presse });
      tubeBM.liquide(0.62 - 0.12 * p1.aspire, C.bleu);
      tubeVitC.liquide(0.62 - 0.08 * p2.aspire, C.verre);
      const niveau = 0.5 * p1.verse + 0.3 * p2.verse;

      // Étape 3 : la réaction avance, le chronomètre tourne.
      const tExp = T_MAX * a3;
      const A = absorbance(concentration(tExp, c0, k));
      const aCuve = p2.verse < 1 ? (a0 * 0.8) / (0.5 + 0.3 * p2.verse) : A; // avant l'ajout : colorant non dilué
      set(liqCuve, { y: 412 - 58 * niveau, height: 58 * niveau, fill: couleur(aCuve), 'fill-opacity': opacite(aCuve) });
      capot.setAttribute('transform', `translate(${54 * (1 - seg(a2, 0.66, 0.76))} 0)`);

      // Faisceau : la lumière transmise augmente quand la solution se décolore (T = 10^-A).
      const allume = seg(a2, 0.74, 0.86, ease.out), xFin = 278 + 130 * allume, transmis = lerp(0.08, 1, 10 ** -aCuve);
      lampe.setAttribute('fill', allume > 0 ? C.orange : C.grille);
      halo.setAttribute('opacity', String(allume * (0.24 + 0.06 * Math.sin(T * 6))));
      lambda.setAttribute('fill', allume > 0 ? C.orange : C.discret);
      fInc.setAttribute('width', String(clamp(xFin - 278, 0, XC - 15 - 278)));
      fCuve.setAttribute('width', String(clamp(xFin - XC + 15, 0, 30)));
      stopFin.setAttribute('stop-opacity', String(transmis));
      set(fTr, { width: clamp(xFin - XC - 15, 0, 408 - XC - 15), opacity: transmis });
      const lance = a2 >= 0.86;
      aff.affiche(lance ? fmt(A, 3) : '');

      const appui = seg(a2, 0.9, 0.95) - seg(a2, 0.95, 1) + seg(a3, 0.96, 0.98) - seg(a3, 0.98, 1);
      bouton.setAttribute('transform', `translate(0 ${4 * appui})`);
      aiguille.setAttribute('transform', `rotate(${6 * tExp} ${CX} ${CY})`);
      set(arc, { 'stroke-dasharray': `${L_ARC * a3} ${L_ARC}`, opacity: a3 > 0 ? 1 : 0 });
      etiqT.textContent = `t = ${fmt(tExp, 0)} s`;

      // Vue microscopique : chaque ion BM+ réagit quand la fraction restante passe sous son seuil u.
      show(loupe, seg(a2, 0.76, 0.92, ease.out), 14);
      const agitation = remap(p.theta, 15, 40, 0.55, 1.9);
      const nCV = Math.round(p.c0 * 2.4), nHO = Math.round(p.cat * 320);
      let colores = 0;
      cvs.forEach((m, i) => {
        const q = clamp((tExp + Math.log(m.u) / k) / 9); // 0 : coloré, 1 : transformé
        if (i < nCV && q < 0.5) colores++;
        const pos = position(m, T, agitation, 7);
        set(m.n, { ...pos, opacity: i < nCV ? 1 : 0, 'fill-opacity': 1 - q, stroke: mix(C.bleu, C.discret, q) });
        set(m.halo, { ...pos, r: 6 + 13 * q, opacity: i < nCV && q > 0 && q < 1 ? 1 - q : 0 });
      });
      hos.forEach((m, i) => set(m.n, { ...position(m, T, agitation, 3), opacity: i < nHO ? 0.8 : 0 }));
      compteur.textContent = L(`Ions BM+ : ${colores} / ${nCV}`, `BM+ ions: ${colores} / ${nCV}`);

      // Étapes 4 à 6 : bilan.
      show(bilan, seg(a4, 0, 0.12), 12);
      cadre.setAttribute('height', String(108 + 82 * seg(a5, 0, 0.2) + 26 * seg(a6, 0.05, 0.25)));
      minis.forEach((m, n) => {
        const e = seg(a4, 0.08 + 0.17 * n, 0.2 + 0.17 * n, ease.backOut), an = a0 / 2 ** n;
        m.g.setAttribute('transform', `translate(${m.x} 79) scale(${Math.max(0, e)})`);
        set(m.corps, { fill: couleur(an), 'fill-opacity': opacite(an) });
        m.date.textContent = `${fmt(n * t12, 0)} s`;
        m.date.style.opacity = String(clamp(e));
        if (m.div) m.div.style.opacity = String(clamp(e));
      });
      lLoi.style.opacity = String(seg(a5, 0.12, 0.3));
      lK.textContent = `k = ${fmt(kMes, 4)} s⁻¹`;
      lK.style.opacity = String(seg(a5, 0.78, 0.9));
      lT.textContent = `t1/2 = ln 2 / k = ${fmt(Math.LN2 / kMes, 0)} s`;
      lT.style.opacity = String(seg(a5, 0.86, 1));
      lRef.textContent = L(`k = ${fmt(k / kRef, 2)} × k de départ`, `k = ${fmt(k / kRef, 2)} × initial k`);
      lRef.style.opacity = String(seg(a6, 0.15, 0.4));

      if (graphique) {
        const ln = etape === 4;
        if (ln !== axeLn) {
          axeLn = ln;
          graphique.axes({ y: ln ? AXE_LN : AXE_A });
        }
        (ln ? ['depart', 'modele', 'points', 'curseur', 'demi', 't12', 'r1', 'r2', 'r3'] : ['lnpts', 'droite', 'pente']).forEach((id) => graphique.effacer(id));
        if (ln) {
          // ln A = f(t) : les points s'alignent, la droite donne k.
          graphique.nuage('lnpts', lnPts.slice(0, Math.round(lnPts.length * seg(a5, 0.08, 0.5, ease.lin))), { couleur: C.trait, rayon: 3.5 });
          const xf = T_MAX * seg(a5, 0.5, 0.78);
          graphique.courbe('droite', xf > 0 ? [[0, droite.ordonnee], [xf, droite.ordonnee + droite.pente * xf]] : [], { couleur: C.jaune, epaisseur: 2.5 });
          if (a5 > 0.78) {
            const xm = lnPts[lnPts.length >> 1][0];
            graphique.repere('pente', xm, droite.ordonnee + droite.pente * xm, { couleur: C.jaune, rayon: 4, label: L(`pente = −${fmt(kMes, 4)} s⁻¹`, `gradient = −${fmt(kMes, 4)} s⁻¹`) });
            graphique.opacite('pente', seg(a5, 0.78, 0.9));
          } else graphique.effacer('pente');
        } else {
          graphique.courbe('depart', a6 > 0 ? depart : [], { couleur: C.discret, epaisseur: 2, pointille: true });
          graphique.opacite('depart', seg(a6, 0.1, 0.5));
          graphique.courbe('modele', a3 > 0 ? fins.filter(([x]) => x <= tExp) : [], { couleur: C.bleu, epaisseur: 3 });
          graphique.nuage('points', a3 > 0 ? points.filter(([x]) => x <= tExp) : [], { couleur: C.trait, rayon: 3 });
          if (a3 > 0 && a3 < 1) graphique.repere('curseur', tExp, A, { couleur: C.texte, rayon: 4 });
          else graphique.effacer('curseur');
          // Lecture graphique : A0/2 à t1/2, A0/4 à 2 t1/2, A0/8 à 3 t1/2.
          // Étiquettes regroupées aux réglages extrêmes : en haut si t1/2 est grand, près du point s'il est petit.
          const lent = t12 > 240, court = t12 < 45;
          const texteA = `A0/2 = ${fmt(a0 / 2, 2)}`, texteT = `t1/2 = ${fmt(t12, 0)} s`;
          if (a4 > 0.25) {
            graphique.horizontale('demi', a0 / 2, { couleur: C.jaune, label: lent ? undefined : texteA });
            graphique.verticale('t12', t12, { couleur: C.jaune, label: court ? undefined : lent ? L(`A = A0/2 à ${texteT}`, `A = A0/2 at ${texteT}`) : texteT });
            graphique.opacite('demi', seg(a4, 0.25, 0.33));
            graphique.opacite('t12', seg(a4, 0.29, 0.37));
          } else {
            graphique.effacer('demi');
            graphique.effacer('t12');
          }
          [1, 2, 3].forEach((n) => {
            const debut = 0.08 + 0.17 * n;
            if (a4 > debut && n * t12 <= T_MAX) {
              graphique.repere(`r${n}`, n * t12, a0 / 2 ** n, { couleur: n === 1 ? C.jaune : C.orange, rayon: n === 1 ? 5 : 4, label: n === 1 ? (court ? texteT : undefined) : (court && a0 < 0.75) || (n === 3 && t12 < 30) ? undefined : `A0/${2 ** n}` });
              graphique.opacite(`r${n}`, seg(a4, debut, debut + 0.12));
            } else graphique.effacer(`r${n}`);
          });
        }
      }

      const mesures = [
        { label: L('Temps écoulé', 'Elapsed time'), valeur: `${fmt(tExp, 0)} s` },
        { label: 'Absorbance A', valeur: lance ? fmt(A, 3) : '...' },
      ];
      if (a4 > 0.37) mesures.push({ label: L('Demi-réaction t1/2', 'Half-life t1/2'), valeur: `${fmt(t12, 0)} s` });
      if (a5 > 0.78) mesures.push({ label: L('Constante k', 'Rate constant k'), valeur: `${fmt(kMes * 1000, 1)} × 10⁻³ s⁻¹` });
      return mesures;
    };
  },
});
