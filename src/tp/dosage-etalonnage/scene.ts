import { L, avancement, clamp, ease, el, fmt, lerp, mix, seg, set, show, uid } from '../../lib/anim';
import { appareil, becher, etiquette, gouttes, paillasse, tubeEssai } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { GAMME, absorbance, epsilon, gamme, pente, transmittance } from './model';

const C_MERE = 50e-6; // mol/L, solution mère (celle de la fiche)
const XS = [56, 112, 168, 224, 280]; // abscisses des tubes de la gamme
const X_INC = 362; // bécher de la solution inconnue
const X_CUVE = 300, Y_CUVE = 192, H_CUVE = 64, Y_FAISCEAU = 160;
const X_FAISCEAU = 140, X_CAPTEUR = 520;
const N_PHOTONS = 16;

/** Teinte du bleu patenté : q = 0 (eau) à 1 (10 µmol/L et au-delà). */
const teinte = (q: number) => mix(C.verre, C.bleu, q);
const q = (c: number) => clamp(0.04 + (0.96 * c) / 10e-6);
/** Tirage déterministe entre 0 et 1 pour le photon i lors de son passage n. */
const tirage = (i: number, n: number) => {
  const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export default definirScene({
  etapes: [
    { titre: L('Préparer la gamme étalon', 'Prepare the standard solutions'), duree: 7, texte: L('Par dilution d\'une solution mère de bleu patenté, on prépare cinq solutions filles de concentrations connues, de <strong>2,0 à 10,0 µmol/L</strong>. Plus la solution est concentrée, plus sa teinte est soutenue.', 'By diluting a stock solution of patent blue, we prepare five standard solutions of known concentration, from <strong>2.0 to 10.0 µmol/L</strong>. The more concentrated the solution, the deeper its colour.') },
    { titre: L('Régler le spectrophotomètre', 'Set up the spectrophotometer'), duree: 6, texte: L('On choisit la longueur d\'onde du maximum d\'absorption, <strong>λ = 640 nm</strong>, puis on fait le <em>blanc</em> avec une cuve d\'eau distillée : l\'absorbance est réglée sur zéro.', 'We select the wavelength of the absorption maximum, <strong>λ = 640 nm</strong>, then set the <em>blank</em> with a cuvette of distilled water: the absorbance is set to zero.') },
    { titre: L('Mesurer l\'absorbance des étalons', 'Measure the absorbance of the standards'), duree: 14, texte: L('Chaque solution passe dans la cuve. Elle absorbe une partie du faisceau : l\'intensité transmise <strong>I</strong> chute, l\'absorbance <strong>A</strong> augmente. Chaque mesure donne un point du graphique.', 'Each solution is placed in the cuvette in turn. It absorbs part of the beam: the transmitted intensity <strong>I</strong> falls and the absorbance <strong>A</strong> rises. Each measurement gives one point on the graph.') },
    { titre: L('Tracer la droite d\'étalonnage', 'Draw the calibration line'), duree: 5, texte: L('Les points s\'alignent sur une droite passant par l\'origine : c\'est la loi de Beer-Lambert, <strong>A = k·C</strong> avec <strong>k = ε·l</strong>.', 'The points lie on a straight line through the origin: this is the Beer-Lambert law, <strong>A = k·C</strong> with <strong>k = ε·l</strong>.') },
    { titre: L('Mesurer la solution inconnue', 'Measure the unknown solution'), duree: 8, texte: L('On mesure l\'absorbance de la solution X dans les mêmes conditions, puis on la <strong>reporte</strong> sur la droite : l\'abscisse du point donne sa concentration.', 'We measure the absorbance of solution X under the same conditions, then <strong>mark it</strong> on the line: the horizontal coordinate of the point gives its concentration.') },
    { titre: L('Conclure', 'Conclude'), duree: 5, texte: L('La concentration cherchée vaut <strong>C<sub>X</sub> = A<sub>X</sub> / k</strong>. Changez la longueur d\'onde ou l\'épaisseur de la cuve : la pente change, la concentration lue reste la même.', 'The unknown concentration is <strong>C<sub>X</sub> = A<sub>X</sub> / k</strong>. Change the wavelength or the path length of the cuvette: the gradient changes, but the concentration read off stays the same.') },
  ],
  parametres: [
    { id: 'cx', label: L('Concentration de la solution X', 'Concentration of solution X'), min: 3, max: 9, pas: 0.2, valeur: 6.4, unite: 'µmol/L', decimales: 1 },
    { id: 'l', label: L('Épaisseur de la cuve', 'Cuvette path length'), min: 0.5, max: 1.5, pas: 0.25, valeur: 1, unite: 'cm', decimales: 2 },
    { id: 'lambda', label: L('Longueur d\'onde', 'Wavelength'), min: 600, max: 680, pas: 5, valeur: 640, unite: 'nm' },
  ],
  graphique: {
    x: { label: 'C (µmol/L)', min: 0, max: 12, pas: 2 },
    y: { label: 'A', min: 0, max: 2, pas: 0.5, decimales: 1 },
  },
  affiche: { etape: 4, t: 0.95 },

  monter({ scene, graphique }) {
    paillasse(scene);

    // Gamme étalon : portoir, cinq tubes, bécher de la solution inconnue.
    el('rect', { x: 30, y: 386, width: 276, height: 7, rx: 3.5, fill: C.metal }, scene);
    for (const x of [36, 300]) el('rect', { x: x - 3, y: 386, width: 6, height: 54, rx: 3, fill: C.metal }, scene);
    const tubes = XS.map((x) => tubeEssai(scene, { x, y: 432 }));
    const noms = XS.map((x, i) => etiquette(scene, { x, y: 312, texte: fmt(GAMME[i] * 1e6, 1), ancre: 'middle', mono: true, taille: 13 }));
    const legende = etiquette(scene, { x: 30, y: 290, texte: L('Gamme étalon (C en µmol/L)', 'Standards (C in µmol/L)'), taille: 13, couleur: C.discret });
    const inconnue = becher(scene, { x: X_INC, y: 432, w: 56, h: 70 });
    const nomX = etiquette(scene, { x: X_INC, y: 350, texte: 'Solution X', ancre: 'middle', taille: 13 });

    // Pipette de préparation (étape 1).
    const pip = el('g', {}, scene);
    const corps = el('path', { d: 'M-5 -84V-6L0 8L5 -6V-84Z', 'fill-opacity': 0.8, stroke: C.verre, 'stroke-width': 2, 'stroke-linejoin': 'round' }, pip);
    const gtt = gouttes(scene, { x: 0, y1: 308, y2: 400 });

    // Spectrophotomètre (étape 2) : source, monochromateur, porte-cuve, capteur, afficheur.
    const spectro = el('g', {}, scene);
    el('rect', { x: 30, y: 198, width: 580, height: 8, rx: 4, fill: C.panneau, stroke: C.metal, 'stroke-width': 1.5 }, spectro);
    el('rect', { x: 256, y: 192, width: 88, height: 6, rx: 3, fill: C.metal }, spectro);
    el('rect', { x: 40, y: 130, width: 60, height: 60, rx: 10, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, spectro);
    const halo = el('circle', { cx: 70, cy: Y_FAISCEAU, r: 24, fill: C.jaune, opacity: 0 }, spectro);
    const lampe = el('circle', { cx: 70, cy: Y_FAISCEAU, r: 14, fill: C.grille, stroke: C.verre, 'stroke-width': 2 }, spectro);
    etiquette(spectro, { x: 70, y: 226, texte: 'Source', ancre: 'middle', taille: 13, couleur: C.discret });
    const blanc = el('rect', { x: 100, y: Y_FAISCEAU - 7, width: 14, height: 14, fill: C.blanc, opacity: 0 }, spectro);
    el('rect', { x: 112, y: 136, width: 28, height: 48, rx: 6, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, spectro);
    el('path', { d: 'M118 176L126 144L134 176Z', fill: 'rgba(223,230,255,.12)', stroke: C.verre, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, spectro);
    const nomLambda = etiquette(spectro, { x: 126, y: 122, texte: '', ancre: 'middle', mono: true, taille: 13 });
    el('rect', { x: X_CAPTEUR, y: 136, width: 40, height: 48, rx: 6, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, spectro);
    el('rect', { x: X_CAPTEUR + 3, y: Y_FAISCEAU - 10, width: 6, height: 20, rx: 2, fill: C.verre, opacity: 0.8 }, spectro);
    el('path', { d: 'M540 136V102', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, spectro);
    etiquette(spectro, { x: 540, y: 226, texte: L('Capteur', 'Detector'), ancre: 'middle', taille: 13, couleur: C.discret });
    const afficheur = appareil(spectro, { x: 478, y: 30, w: 138, h: 72, titre: 'ABSORBANCE' });
    const cote = el('path', { fill: 'none', stroke: C.discret, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, spectro);
    const nomL = etiquette(spectro, { x: X_CUVE, y: 108, texte: '', ancre: 'middle', mono: true, taille: 13, couleur: C.discret });

    // Cuve mobile : liquide, puis faisceau par-dessus, puis contour.
    const cuve = el('g', {}, scene);
    const liq = el('rect', { y: -54, height: 53, opacity: 0.85 }, cuve);
    const verre = el('path', { fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, cuve);

    const faisceau = el('g', {}, scene);
    const idG = uid('att');
    const grad = el('linearGradient', { id: idG, gradientUnits: 'userSpaceOnUse', y1: 0, y2: 0 }, el('defs', {}, faisceau));
    const stop0 = el('stop', { offset: 0 }, grad), stop1 = el('stop', { offset: 1 }, grad);
    const fEntree = el('rect', { x: X_FAISCEAU, y: Y_FAISCEAU - 7, height: 14, opacity: 0.85 }, faisceau);
    const fCuve = el('rect', { y: Y_FAISCEAU - 7, height: 14, fill: `url(#${idG})` }, faisceau);
    const fSortie = el('rect', { y: Y_FAISCEAU - 7, height: 14 }, faisceau);
    const photons = Array.from({ length: N_PHOTONS }, () => el('circle', { r: 2.2, fill: C.blanc }, faisceau));
    const nomI0 = etiquette(faisceau, { x: 212, y: 142, texte: 'I0', ancre: 'middle', mono: true, taille: 14 });
    const nomI = etiquette(faisceau, { x: 432, y: 142, texte: 'I', ancre: 'middle', mono: true, taille: 14 });

    // Encart de la loi et du résultat (étapes 4 à 6).
    const encart = el('g', {}, scene);
    const cadre = el('rect', { x: 410, y: 300, width: 214, height: 126, rx: 14, fill: C.panneau, stroke: C.cyan, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 426, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(324, 13, C.discret, POLICE).textContent = L('Loi de Beer-Lambert', 'Beer-Lambert law');
    ligne(348, 15, C.texte).textContent = 'A = k·C, k = ε·l';
    const lignePente = ligne(372, 13.5, C.cyan);
    const resultat = ligne(406, 17, C.jaune);

    let echelle = 2; // échelle des ordonnées en place (mémoire d'affichage, sans effet sur le rendu)

    return ({ etape, t, T, p }) => {
      const img = { etape, t };
      const l = p.l, eps = epsilon(p.lambda), cx = p.cx * 1e-6;
      const pts = gamme(l, p.lambda), k = pente(pts);
      const aX = absorbance(cx, eps, l), cLue = aX / k;
      const couleur = mix(C.orange, C.corail, (p.lambda - 600) / 60);
      const a0 = avancement(img, 0), a1 = avancement(img, 1), a2 = avancement(img, 2);
      const a3 = avancement(img, 3), a4 = avancement(img, 4), a5 = avancement(img, 5);

      // Étape 1 : la pipette passe de tube en tube, solution mère puis eau distillée.
      const f = clamp((a0 - 0.08) / 0.15, 0, 4.999), i0 = Math.floor(f), fr = f - i0;
      const px = lerp(XS[i0], XS[Math.min(4, i0 + 1)], seg(fr, 0.75, 1));
      const py = lerp(-330, 0, seg(a0, 0, 0.08, ease.out)) - 330 * seg(a0, 0.84, 0.95, ease.in);
      pip.setAttribute('transform', `translate(${px} ${300 + py})`);
      pip.style.opacity = a0 < 0.95 ? '1' : '0';
      const verse = a0 > 0.08 && a0 < 0.83 && fr < 0.7;
      const jet = fr < 0.35 ? teinte(1) : teinte(0.04);
      corps.setAttribute('fill', jet);
      gtt.g.setAttribute('transform', `translate(${px} 0)`);
      gtt.maj(T, verse ? 0.8 : 0, jet);
      tubes.forEach((tube, i) => {
        const d = 0.08 + i * 0.15, pi = clamp((a0 - d) / 0.105), fm = GAMME[i] / C_MERE;
        tube.liquide(0.75 * (fm * seg(pi, 0, 0.5, ease.lin) + (1 - fm) * seg(pi, 0.5, 1, ease.lin)), teinte(lerp(1, q(GAMME[i]), seg(pi, 0.5, 1))));
        show(noms[i], seg(a0, d + 0.15, d + 0.2));
      });
      show(legende, seg(a0, 0.92, 1));
      inconnue.liquide(0.62, teinte(q(cx)));

      // Étape 2 : le spectrophotomètre s'installe, la lampe s'allume.
      show(spectro, seg(a1, 0, 0.25), 20);
      const allume = seg(a1, 0.3, 0.4);
      lampe.setAttribute('fill', allume > 0 ? C.jaune : C.grille);
      set(halo, { opacity: 0.22 * allume + 0.04 * allume * Math.sin(T * 4) });
      set(blanc, { opacity: 0.8 * allume });
      faisceau.style.opacity = String(allume);
      nomLambda.textContent = `λ = ${fmt(p.lambda, 0)} nm`;
      nomLambda.setAttribute('fill', couleur);

      // Trajet de la cuve : blanc (étape 2), étalons (étape 3), solution X (étapes 5 et 6).
      let m = 0, xDepart = X_CUVE, c = 0, n = -1;
      if (a4 > 0) {
        m = seg(a4, 0.04, 0.3);
        xDepart = X_INC;
        c = cx;
      } else if (a2 > 0) {
        n = Math.min(4, Math.floor(a2 * 5));
        const u = a2 * 5 - n;
        m = seg(u, 0.04, 0.3) - seg(u, 0.8, 0.98);
        xDepart = XS[n];
        c = GAMME[n];
      } else {
        m = seg(a1, 0.45, 0.65) - seg(a1, 0.88, 1);
      }
      const w = 44 * l, x0 = X_CUVE - w / 2, x1 = X_CUVE + w / 2;
      const presence = clamp((m - 0.85) / 0.15);
      const aCuve = (a4 > 0 ? aX : n >= 0 ? pts[n][1] : 0) * presence;
      const tr = transmittance(aCuve);
      cuve.setAttribute('transform', `translate(${lerp(xDepart, X_CUVE, m)} ${lerp(282, Y_CUVE, m)})`);
      cuve.style.opacity = String(clamp(m * 6));
      set(liq, { x: -w / 2 + 1.5, width: w - 3, fill: teinte(q(c)) });
      verre.setAttribute('d', `M${-w / 2} ${-H_CUVE}V0H${w / 2}V${-H_CUVE}`);
      noms.forEach((nom, i) => nom.setAttribute('fill', i === n && m > 0 ? C.jaune : C.texte));
      nomX.setAttribute('fill', a4 > 0 ? C.jaune : C.texte);
      cote.setAttribute('d', `M${x0} 114V122M${x1} 114V122M${x0} 118H${x1}`);
      nomL.textContent = `l = ${fmt(l, 2)} cm`;

      // Faisceau : intensité I0 avant la cuve, atténuée dans la cuve, I après.
      set(fEntree, { width: x0 - X_FAISCEAU, fill: couleur });
      set(grad, { x1: x0, x2: x1 });
      set(stop0, { 'stop-color': couleur, 'stop-opacity': 0.85 });
      set(stop1, { 'stop-color': couleur, 'stop-opacity': 0.85 * tr });
      set(fCuve, { x: x0, width: w });
      set(fSortie, { x: x1, width: X_CAPTEUR - x1, fill: couleur, opacity: 0.85 * tr });
      photons.forEach((ph, i) => {
        const tour = T * 0.3 + i / N_PHOTONS, nTour = Math.floor(tour);
        const x = lerp(X_FAISCEAU + 2, X_CAPTEUR - 2, tour - nTour);
        // Profondeur d'absorption tirée selon la loi exponentielle : le photon survit si 10^(-A.d) > tirage.
        const fin = aCuve > 0 ? x0 + (w * -Math.log10(tirage(i, nTour) + 1e-9)) / aCuve : Infinity;
        set(ph, { cx: x, cy: Y_FAISCEAU + ((i * 7) % 5 - 2) * 2.4, opacity: fin < x1 && x > fin ? 0 : 0.9 });
      });
      nomI.style.opacity = String(0.35 + 0.65 * tr);
      nomI0.style.opacity = '1';
      afficheur.affiche(allume < 1 ? '' : presence > 0.02 ? fmt(aCuve, 3) : L('-,---', '-.---'));

      // Étapes 4 à 6 : loi, pente, résultat.
      show(encart, seg(a3, 0.5, 0.85, ease.backOut), 16);
      lignePente.textContent = `k = ${fmt(k / 1e5, 2)} ×10⁵ L/mol`;
      resultat.textContent = `CX = ${fmt(cLue * 1e6, 1)} µmol/L`;
      resultat.style.opacity = String(seg(a5, 0.1, 0.4));
      cadre.setAttribute('stroke', a5 > 0.1 ? C.jaune : C.cyan);

      if (graphique) {
        // L'échelle des ordonnées suit la pente, pour que la droite reste lisible quand k est faible.
        const haut = k * 12e-6;
        const [yMax, yPas, yDec] = haut > 0.6 ? [2, 0.5, 1] : haut > 0.2 ? [0.6, 0.1, 1] : [0.2, 0.05, 2];
        if (yMax !== echelle) {
          echelle = yMax;
          graphique.axes({ y: { label: 'A', min: 0, max: yMax, pas: yPas, decimales: yDec } });
        }
        const nuage: [number, number][] = [];
        if (a1 > 0.7) nuage.push([0, 0]);
        pts.forEach(([ce, ae], i) => { if (a2 >= (i + 0.55) / 5) nuage.push([ce * 1e6, ae]); });
        graphique.nuage('points', nuage, { couleur: C.blanc, rayon: 4.5 });
        if (a4 === 0 && n >= 0 && presence > 0) graphique.repere('mesure', GAMME[n] * 1e6, aCuve, { couleur: C.jaune, label: `A = ${fmt(aCuve, 3)}` });
        else graphique.effacer('mesure');
        const xd = 12 * seg(a3, 0.08, 0.6);
        graphique.courbe('droite', a3 > 0 ? [[0, 0], [xd, k * 1e-6 * xd]] : [], { couleur: C.cyan, epaisseur: 3 });
        // Report : le point monte sur l'axe des ordonnées, rejoint la droite, puis descend sur l'axe des abscisses.
        const h = seg(a4, 0.4, 0.62), v = seg(a4, 0.66, 0.88), xX = cLue * 1e6;
        graphique.courbe('reportH', h > 0 ? [[0, aX], [xX * h, aX]] : [], { couleur: C.jaune, epaisseur: 2, pointille: true });
        graphique.courbe('reportV', v > 0 ? [[xX, aX], [xX, aX * (1 - v)]] : [], { couleur: C.jaune, epaisseur: 2, pointille: true });
        // L'étiquette reste sur l'axe des ordonnées : portée par le point mobile, elle chevaucherait la droite.
        if (a4 > 0 && presence > 0) {
          graphique.repere('ax', 0, aCuve, { couleur: C.jaune, label: `A = ${fmt(aCuve, 3)}` });
          graphique.repere('x', xX * h, aCuve, { couleur: C.jaune });
        } else {
          graphique.effacer('ax');
          graphique.effacer('x');
        }
        if (v > 0) graphique.repere('cx', xX, aX * (1 - v), { couleur: C.menthe, label: v >= 1 ? `CX = ${fmt(xX, 1)}` : undefined });
        else graphique.effacer('cx');
      }

      const mesures = [
        { label: L('Concentration dans la cuve', 'Concentration in the cuvette'), valeur: m < 0.85 ? '...' : a4 > 0 ? (a4 > 0.88 ? `${fmt(cLue * 1e6, 1)} µmol/L` : '?') : `${fmt(c * 1e6, 1)} µmol/L` },
        { label: L('Absorbance A', 'Absorbance A'), valeur: presence > 0.02 ? fmt(aCuve, 3) : '...' },
        { label: L('Lumière transmise I/I0', 'Transmitted light I/I0'), valeur: allume < 1 ? '...' : `${fmt(100 * tr, 0)} %` },
      ];
      if (a3 > 0.6) mesures.push({ label: L('Pente k', 'Gradient k'), valeur: `${fmt(k / 1e5, 2)} ×10⁵ L/mol` });
      return mesures;
    };
  },
});
