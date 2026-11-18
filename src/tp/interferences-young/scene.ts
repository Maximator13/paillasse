import { L, avancement, clamp, ease, el, fmt, lerp, mix, seg, set, show, texte, uid } from '../../lib/anim';
import { etiquette } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT, themeSombre } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { couleur, courbe, differenceMarche, intensite, interfrange, longueurOnde, nature, type Young } from './model';

// Banc vu de dessus. Le schéma n'est pas à l'échelle (b vaut 0,2 mm, D vaut 2 m), mais les trois facteurs ci-dessous
// sont choisis pour que l'interfrange dessiné soit exactement proportionnel au vrai : i (px) = PX_MM x i (mm).
const Y0 = 180; // axe optique
const X_LASER = 106; // sortie du laser
const XF = 164; // plan des fentes
const HP = 100; // demi-hauteur de la plaque
const X_MAX = 20; // mm, demi-largeur d'écran représentée
const DEMI = 130; // px, la même en pixels
const PX_MM = DEMI / X_MAX;
const K_D = 140; // px par mètre
const K_B = 330; // px par millimètre d'écart entre les fentes
const K_L = (PX_MM * K_B) / (K_D * 1e3); // px par nanomètre
const V = 36; // px/s, célérité des fronts d'onde à l'écran
const N_ARCS = 54, KX = 4;
const XS = 536, WS = 54; // écran vu de face
const YB = 364; // haut du bandeau d'explication
const PROFIL = Array.from({ length: 9 }, (_, j) => Math.cos((Math.PI * j) / 16) ** 2); // cos² sur une demi-période
const rvbDe = (h: string) => [1, 3, 5].map((q) => parseInt(h.slice(q, q + 2), 16));
const rgb = (v: number[]) => `rgb(${v.map(Math.round).join(',')})`;

export default definirScene({
  etapes: [
    { titre: L('Le banc d\'optique', 'The optical bench'), duree: 6, texte: L('Vu de dessus : un <strong>laser</strong> éclaire deux fentes fines et parallèles, distantes de <strong>b</strong>. Un écran est placé à la distance <strong>D</strong>, très grande devant b.', 'Seen from above: a <strong>laser</strong> illuminates two narrow parallel slits, a distance <strong>b</strong> apart. A screen is placed at a distance <strong>D</strong>, very large compared with b.') },
    { titre: L('Deux sources cohérentes', 'Two coherent sources'), duree: 10, texte: L('Chaque fente diffracte la lumière : S<sub>1</sub> et S<sub>2</sub> émettent deux ondes <strong>cohérentes</strong> qui se superposent. Le long de certaines lignes elles se renforcent, le long d\'autres elles s\'annulent.', 'Each slit diffracts the light: S<sub>1</sub> and S<sub>2</sub> emit two <strong>coherent</strong> waves that superpose. Along some lines they reinforce each other, along others they cancel out.') },
    { titre: L('Les franges d\'interférences', 'Interference fringes'), duree: 9, texte: L('Sur l\'écran, chaque ligne de renfort donne une <strong>frange brillante</strong>, chaque ligne d\'extinction une <strong>frange sombre</strong>. L\'intensité lumineuse varie périodiquement avec la position x.', 'On the screen, each line of reinforcement gives a <strong>bright fringe</strong>, each line of cancellation a <strong>dark fringe</strong>. The light intensity varies periodically with position x.') },
    { titre: L('La différence de marche', 'The path difference'), duree: 14, texte: L('En un point M, les deux ondes n\'ont pas parcouru le même chemin : <strong>δ = S<sub>2</sub>M − S<sub>1</sub>M = b·x / D</strong>. Si δ = k·λ, elles arrivent en phase (constructif). Si δ = (k + 1/2)·λ, en opposition (destructif).', 'At a point M, the two waves have not travelled the same distance: <strong>δ = S<sub>2</sub>M − S<sub>1</sub>M = b·x / D</strong>. If δ = k·λ, they arrive in phase (constructive). If δ = (k + 1/2)·λ, in antiphase (destructive).') },
    { titre: L('Mesurer l\'interfrange', 'Measuring the fringe spacing'), duree: 8, texte: L('L\'<strong>interfrange i</strong> est la distance entre deux franges brillantes consécutives. Pour gagner en précision, on mesure plusieurs interfranges d\'un coup, puis on divise.', 'The <strong>fringe spacing i</strong> is the distance between two consecutive bright fringes. For better precision, measure several fringe spacings at once, then divide.') },
    { titre: L('Déterminer la longueur d\'onde', 'Finding the wavelength'), duree: 6, texte: L('Comme <strong>i = λ·D / b</strong>, on en déduit <strong>λ = i·b / D</strong>. Changez l\'écart des fentes, la couleur du laser ou la distance de l\'écran et observez les franges.', 'Since <strong>i = λ·D / b</strong>, it follows that <strong>λ = i·b / D</strong>. Change the slit separation, the colour of the laser or the screen distance and watch the fringes.') },
  ],
  parametres: [
    { id: 'b', label: L('Écart b entre les fentes', 'Slit separation b'), min: 0.1, max: 0.3, pas: 0.01, valeur: 0.2, unite: 'mm', decimales: 2 },
    { id: 'lambda', label: L('Longueur d\'onde λ du laser', 'Laser wavelength λ'), min: 450, max: 700, pas: 10, valeur: 650, unite: 'nm' },
    { id: 'D', label: L('Distance D fentes-écran', 'Slit-to-screen distance D'), min: 1.2, max: 2.2, pas: 0.1, valeur: 2, unite: 'm', decimales: 1 },
  ],
  graphique: {
    x: { label: L('x sur l\'écran (mm)', 'x on the screen (mm)'), min: -X_MAX, max: X_MAX, pas: 5 },
    y: { label: 'I / Imax', min: 0, max: 1.25, pas: 0.25, decimales: 2 },
  },
  affiche: { etape: 2, t: 1 },

  monter({ scene, graphique }) {
    const sombre = themeSombre();
    const selon = (s: number, c: number) => (sombre ? s : c);
    // L'écran est dans le noir hors des franges brillantes : fond de nuit dans les deux thèmes.
    const NUIT = sombre ? rvbDe(C.fond) : rvbDe(C.ombre).map((v, q) => lerp(v, rvbDe(C.fond)[q], 0.06));
    const defs = el('defs', {}, scene);
    const idFr = uid('franges'), idVig = uid('vignette'), idClip = uid('ondes'), idMetal = uid('metal'), idBoitier = uid('boitier'), idRail = uid('rail');
    // Franges : un seul dégradé périodique, partagé par l'écran vu de dessus et l'écran vu de face.
    const gradFr = el('linearGradient', { id: idFr, gradientUnits: 'userSpaceOnUse', spreadMethod: 'reflect', x1: 0, x2: 0, y1: Y0, y2: Y0 + 20 }, defs);
    const stops = PROFIL.map((_, j) => el('stop', { offset: j / (PROFIL.length - 1) }, gradFr));
    const gradVig = el('linearGradient', { id: idVig }, defs);
    [[0, 0.8], [0.32, 0], [0.68, 0], [1, 0.8]].forEach(([o, a]) => el('stop', { offset: o, 'stop-color': rgb(NUIT), 'stop-opacity': a }, gradVig));
    const clipOndes = el('polygon', {}, el('clipPath', { id: idClip }, defs));
    // Relief accordé au kit : métal éclairé à gauche, boîtier et rail éclairés par le dessus.
    const arrets = (g: Element, a: [number, string][]) => a.forEach(([offset, c]) => el('stop', { offset, 'stop-color': c }, g));
    arrets(el('linearGradient', { id: idMetal }, defs), [[0, mix(C.metal, C.ombre, 0.1)], [0.3, mix(C.metal, C.blanc, 0.4)], [1, mix(C.metal, C.ombre, 0.35)]]);
    arrets(el('linearGradient', { id: idBoitier, x1: 0, y1: 0, x2: 0, y2: 1 }, defs), [[0, mix(C.panneau, C.metal, selon(0.22, 0.14))], [1, C.panneau]]);
    arrets(el('linearGradient', { id: idRail, x1: 0, y1: 0, x2: 0, y2: 1 }, defs), [[0, C.panneau], [1, mix(C.panneau, C.ombre, selon(0.3, 0.08))]]);

    const rail = el('rect', { x: 16, y: Y0 - 6, height: 12, rx: 3, fill: `url(#${idRail})`, stroke: sombre ? C.grille : mix(C.grille, C.metal, 0.4), 'stroke-width': 1.5 }, scene);

    // Faisceau incident et ses plans d'onde.
    const faisceau = el('polygon', { 'fill-opacity': 0.2 }, scene);
    const cretes = Array.from({ length: 11 }, () => el('line', { 'stroke-width': 1.5, 'stroke-linecap': 'round' }, scene));

    // Ondes circulaires issues des deux fentes, lignes de renfort et d'extinction.
    const gOndes = el('g', { 'clip-path': `url(#${idClip})` }, scene);
    const arcs = [0, 1].map(() => Array.from({ length: N_ARCS }, () => el('circle', { cx: XF, fill: 'none', 'stroke-width': 1.4, opacity: 0 }, gOndes)));
    const gLignes = el('g', {}, scene);
    const extinctions = Array.from({ length: 2 * KX }, () => el('line', { x1: XF, y1: Y0, stroke: C.discret, 'stroke-width': 1.4, 'stroke-dasharray': '1 6', 'stroke-linecap': 'round' }, gLignes));
    const renforts = Array.from({ length: 2 * KX + 1 }, () => el('line', { x1: XF, y1: Y0, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, gLignes));

    const gLaser = el('g', {}, scene);
    el('rect', { x: 24, y: Y0 - 18, width: 76, height: 44, rx: 8, fill: C.ombre, opacity: selon(0.35, 0.1) }, gLaser);
    el('rect', { x: 22, y: Y0 - 22, width: 76, height: 44, rx: 8, fill: `url(#${idBoitier})`, stroke: C.trait, 'stroke-width': TRAIT }, gLaser);
    el('rect', { x: 98, y: Y0 - 7, width: 8, height: 14, rx: 2, fill: `url(#${idMetal})` }, gLaser);
    for (let k = 0; k < 3; k++) el('line', { x1: 58 + 10 * k, x2: 58 + 10 * k, y1: Y0 - 10, y2: Y0 + 10, stroke: C.metal, 'stroke-width': 2, 'stroke-linecap': 'round' }, gLaser);
    const led = el('circle', { cx: 38, cy: Y0, r: 5, fill: C.grille }, gLaser);
    etiquette(gLaser, { x: 60, y: Y0 + 44, texte: 'Laser', ancre: 'middle' });
    const etiqLambda = etiquette(gLaser, { x: 60, y: Y0 + 62, texte: '', ancre: 'middle', mono: true, taille: 13 });

    const gPlaque = el('g', {}, scene);
    const morceaux = [0, 1, 2].map(() => el('rect', { x: XF - 3, width: 6, rx: 1.5, fill: `url(#${idMetal})`, stroke: mix(C.metal, C.ombre, 0.3), 'stroke-width': 1 }, gPlaque));
    etiquette(gPlaque, { x: XF - 4, y: Y0 + HP + 22, texte: L('Bifente', 'Double slit'), ancre: 'end' });
    const etiqB = etiquette(gPlaque, { x: XF - 4, y: Y0 + HP + 40, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.discret });

    const gEcran = el('g', {}, scene);
    const lueur = el('rect', { width: 7, fill: `url(#${idFr})` }, gEcran);
    const barre = el('rect', { y: Y0 - DEMI - 4, width: 5, height: 2 * DEMI + 8, rx: 2, fill: C.verre, stroke: C.trait, 'stroke-width': selon(0, 1) }, gEcran);
    const etiqEcran = etiquette(gEcran, { x: 0, y: Y0 - DEMI - 12, texte: L('Écran', 'Screen'), ancre: 'middle' });

    const gCote = el('g', {}, scene);
    const coteD = el('path', { fill: 'none', stroke: C.discret, 'stroke-width': 1.5, 'stroke-linecap': 'round' }, gCote);
    const etiqD = etiquette(gCote, { x: 0, y: 352, texte: '', ancre: 'middle', mono: true, taille: 13, couleur: C.discret });

    // Écran vu de face : il se déplie à droite, à la même hauteur que l'écran vu de dessus.
    const proj = Array.from({ length: 7 }, () => el('line', { 'stroke-width': 1, 'stroke-dasharray': '3 4' }, scene));
    const gFace = el('g', {}, scene);
    const cadre = { x: XS, y: Y0 - DEMI, width: WS, height: 2 * DEMI };
    el('rect', { ...cadre, x: XS + 2, y: cadre.y + 4, rx: 3, fill: C.ombre, opacity: selon(0.35, 0.1) }, gFace);
    el('rect', { ...cadre, fill: rgb(NUIT) }, gFace);
    const franges = el('rect', { x: XS, width: WS, fill: `url(#${idFr})` }, gFace);
    el('rect', { ...cadre, fill: `url(#${idVig})` }, gFace);
    el('rect', { ...cadre, rx: 3, fill: 'none', stroke: sombre ? C.verre : C.trait, 'stroke-width': 2 }, gFace);
    for (let mm = -X_MAX; mm <= X_MAX; mm += 5) {
      const yy = Y0 - mm * PX_MM, long = mm % 10 === 0;
      el('line', { x1: XS + WS + 1, x2: XS + WS + (long ? 7 : 4), y1: yy, y2: yy, stroke: C.discret, 'stroke-width': 1.5 }, gFace);
      if (long) texte(gFace, XS + WS + 10, yy + 4.5, String(mm), { fill: C.discret, 'font-family': MONO, 'font-size': 13 });
    }
    etiquette(gFace, { x: XS + WS, y: Y0 - DEMI - 12, texte: L('Vu de face', 'Front view'), ancre: 'end', taille: 14 });
    etiquette(gFace, { x: XS + WS + 8, y: Y0 - DEMI - 12, texte: 'mm', mono: true, taille: 13, couleur: C.discret });

    // Différence de marche (étape 4).
    const gMarche = el('g', {}, scene);
    const rayon1 = el('line', { x1: XF, stroke: C.cyan, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, gMarche);
    const rayon2 = el('line', { x1: XF, stroke: C.rose, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, gMarche);
    const perp = el('line', { x1: XF, stroke: C.texte, 'stroke-width': 1.2, 'stroke-dasharray': '3 3' }, gMarche);
    const surlong = el('line', { x1: XF, stroke: C.jaune, 'stroke-width': 5, 'stroke-linecap': 'round' }, gMarche);
    const etiqS1 = etiquette(gMarche, { x: XF - 7, y: 0, texte: 'S1', ancre: 'end', mono: true, taille: 13, couleur: C.cyan });
    const etiqS2 = etiquette(gMarche, { x: XF - 7, y: 0, texte: 'S2', ancre: 'end', mono: true, taille: 13, couleur: C.rose });
    const etiqDelta = etiquette(gMarche, { x: XF + 14, y: 0, texte: 'δ', taille: 17, couleur: C.jaune });
    const gM = el('g', {}, gMarche);
    const haloM = el('circle', { r: 10, fill: C.texte, opacity: selon(0.25, 0.15) }, gM);
    const ptM = el('circle', { r: 5, fill: C.texte, stroke: C.fond, 'stroke-width': 1.5 }, gM);
    const etiqM = etiquette(gM, { x: 0, y: 0, texte: 'M' });
    const pointeur = el('polygon', { fill: C.texte }, gM);

    // Mesure de plusieurs interfranges (étape 5).
    const gPied = el('g', {}, scene);
    const machoires = [0, 1].map(() => el('line', { x1: XS - 14, x2: XS + WS, stroke: C.jaune, 'stroke-width': 2, 'stroke-linecap': 'round' }, gPied));
    const cote = el('line', { x1: XS - 9, x2: XS - 9, stroke: C.jaune, 'stroke-width': 1.5 }, gPied);
    const pions = Array.from({ length: 11 }, () => el('circle', { cx: XS - 9, r: 2.6, fill: C.jaune }, gPied));
    const etiqN = etiquette(gPied, { x: XS - 19, y: Y0 + 5, texte: '', ancre: 'end', mono: true, taille: 14, couleur: C.jaune });

    // Bandeau du bas : légende, puis ondes reçues en M, puis mesure et résultat.
    const ecrit = (parent: Element, x: number, y: number, taille: number, couleur: string, police = MONO, contenu = '') =>
      texte(parent, x, y, contenu, { fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 });
    const panneau = (parent: Element, x: number, w: number, bord: string = C.grille) =>
      el('rect', { x, y: YB, width: w, height: 100, rx: 12, fill: C.panneau, stroke: bord, 'stroke-width': 1.5 }, parent);

    const gLegende = el('g', {}, scene);
    const echRenfort = el('line', { x1: 24, x2: 66, y1: YB + 26, y2: YB + 26, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, gLegende);
    etiquette(gLegende, { x: 78, y: YB + 31, texte: L('Renfort : δ = k·λ, les ondes arrivent en phase', 'Reinforcement: δ = k·λ, the waves arrive in phase'), taille: 14 });
    const gLegExt = el('g', {}, gLegende);
    el('line', { x1: 24, x2: 66, y1: YB + 58, y2: YB + 58, stroke: C.discret, 'stroke-width': 1.6, 'stroke-dasharray': '1 6', 'stroke-linecap': 'round' }, gLegExt);
    etiquette(gLegExt, { x: 78, y: YB + 63, texte: L('Extinction : δ = (k + 1/2)·λ, elles arrivent en opposition', 'Cancellation: δ = (k + 1/2)·λ, they arrive in antiphase'), taille: 14, couleur: C.discret });

    const gSinus = el('g', {}, scene);
    panneau(gSinus, 16, 608);
    ecrit(gSinus, 28, YB + 21, 13, C.discret, POLICE, L('Ondes reçues en M', 'Waves received at M'));
    ecrit(gSinus, 270, YB + 21, 13, C.discret, POLICE, L('Leur somme', 'Their sum'));
    const YC = YB + 61, AMP = 13, PERIODE = 72;
    for (const [x0, L] of [[28, 220], [270, 196]]) el('line', { x1: x0, x2: x0 + L, y1: YC, y2: YC, stroke: C.grille, 'stroke-width': 1 }, gSinus);
    const courbeOnde = (couleurTrait: string, ep: number) => el('polyline', { fill: 'none', stroke: couleurTrait, 'stroke-width': ep, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, gSinus);
    const onde1 = courbeOnde(C.cyan, 2.2), onde2 = courbeOnde(C.rose, 2.2), somme = courbeOnde(C.texte, 2.6);
    const tDelta = ecrit(gSinus, 486, YB + 34, 15, C.jaune);
    const tEtat = ecrit(gSinus, 486, YB + 59, 13, C.texte, POLICE);
    const tFrange = ecrit(gSinus, 486, YB + 80, 13, C.texte, POLICE);

    const gMesure = el('g', {}, scene);
    panneau(gMesure, 16, 296);
    ecrit(gMesure, 32, YB + 24, 13, C.discret, POLICE, L('Mesure sur plusieurs interfranges', 'Measuring several fringe spacings'));
    const tNi = ecrit(gMesure, 32, YB + 52, 15, C.texte);
    const tI = ecrit(gMesure, 32, YB + 82, 18, C.jaune);
    const gResultat = el('g', {}, scene);
    panneau(gResultat, 328, 296, C.jaune);
    ecrit(gResultat, 344, YB + 24, 13, C.discret, POLICE, L('Longueur d\'onde du laser', 'Wavelength of the laser'));
    ecrit(gResultat, 344, YB + 52, 15, C.texte, MONO, 'λ = i·b / D');
    const tLambda = ecrit(gResultat, 344, YB + 82, 19, C.jaune);

    let cle = '', pts: [number, number][] = [];

    return ({ etape, t, T, p }) => {
      const y: Young = { lambda: p.lambda, b: p.b, D: p.D };
      const i = interfrange(y), iPx = i * PX_MM, lam = K_L * p.lambda, sep = K_B * p.b, xE = XF + K_D * p.D;
      const yS1 = Y0 - sep / 2, yS2 = Y0 + sep / 2;
      const n = clamp(Math.floor(18 / i), 1, 5); // interfranges mesurés de part et d'autre du centre
      // Couleur du laser : éclaircie sur l'écran dans le noir (et sur fond nuit), assombrie pour les traits et le texte sur fond blanc.
      const vrai = couleur(p.lambda), rvb = vrai.map((c) => c + (255 - c) * 0.22);
      const teinte = sombre ? rgb(rvb) : rgb(vrai.map((c) => c * 0.75));
      const teinteTexte = sombre ? teinte : rgb(vrai.map((c) => c * 0.55));
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((k) => avancement({ etape, t }, k));

      // Géométrie et textes qui ne dépendent que des curseurs.
      if (cle !== `${p.lambda}|${p.b}|${p.D}`) {
        cle = `${p.lambda}|${p.b}|${p.D}`;
        pts = courbe(y, X_MAX, 400);
        stops.forEach((s, j) => s.setAttribute('stop-color', rgb(rvb.map((c, q) => lerp(NUIT[q], c, PROFIL[j])))));
        set(gradFr, { y2: Y0 + iPx / 2 });
        clipOndes.setAttribute('points', `${XF + 3},${Y0 - HP} ${xE},${Y0 - DEMI} ${xE},${Y0 + DEMI} ${XF + 3},${Y0 + HP}`);
        faisceau.setAttribute('fill', teinte);
        etiqLambda.setAttribute('fill', teinteTexte);
        for (const n of [...cretes, ...arcs.flat(), ...renforts, ...proj, echRenfort]) n.setAttribute('stroke', teinte);
        set(morceaux[0], { y: Y0 - HP, height: HP - sep / 2 - 3 });
        set(morceaux[1], { y: yS1 + 3, height: sep - 6 });
        set(morceaux[2], { y: yS2 + 3, height: HP - sep / 2 - 3 });
        arcs.forEach((serie, s) => serie.forEach((c) => c.setAttribute('cy', String(s ? yS2 : yS1))));
        set(lueur, { x: xE - 7 });
        set(barre, { x: xE });
        set(etiqEcran, { x: xE + 2 });
        coteD.setAttribute('d', `M${XF} 329V339M${XF} 334H${xE}M${xE} 329V339`);
        set(etiqD, { x: (XF + xE) / 2 });
        set(etiqS1, { y: yS1 - 14 });
        set(etiqS2, { y: yS2 + 25 });
        set(etiqDelta, { y: yS2 + 26 });
        etiqLambda.textContent = `λ = ${fmt(p.lambda, 0)} nm`;
        etiqB.textContent = `b = ${fmt(p.b, 2)} mm`;
        etiqD.textContent = `D = ${fmt(p.D, 2)} m`;
        etiqN.textContent = `${2 * n} i`;
        tNi.textContent = `${2 * n} i = ${fmt(2 * n * i, 1)} mm`;
        tI.textContent = `i = ${fmt(2 * n * i, 1)} / ${2 * n} = ${fmt(i, 2)} mm`;
        tLambda.textContent = `λ = ${fmt(longueurOnde(i, p.b, p.D), 0)} nm`;
      }

      // Étape 1 : le banc se met en place, puis le laser s'allume.
      // Le rail s'arrête sous l'écran le plus lointain (D = 2,2 m) pour laisser place à la cote « n i » de l'étape 5.
      set(rail, { width: 460 * seg(a1, 0, 0.22, ease.out) });
      gLaser.style.opacity = String(seg(a1, 0.08, 0.2));
      gLaser.style.transform = `translateX(${-90 * (1 - seg(a1, 0.08, 0.34, ease.out))}px)`;
      gPlaque.style.opacity = String(seg(a1, 0.26, 0.36));
      gPlaque.style.transform = `translateY(${-60 * (1 - seg(a1, 0.26, 0.52, ease.backOut))}px)`;
      gEcran.style.opacity = String(seg(a1, 0.42, 0.54));
      gEcran.style.transform = `translateX(${70 * (1 - seg(a1, 0.42, 0.68, ease.out))}px)`;
      show(gCote, seg(a1, 0.62, 0.76));
      led.setAttribute('fill', a1 > 0.76 ? teinte : C.grille);
      const xFront = lerp(X_LASER, XF - 3, seg(a1, 0.78, 0.97));
      const demiFaisceau = (x: number) => lerp(5, sep / 2 + 9, (x - X_LASER) / (XF - 3 - X_LASER));
      faisceau.setAttribute('points', `${X_LASER},${Y0 - 5} ${xFront},${Y0 - demiFaisceau(xFront)} ${xFront},${Y0 + demiFaisceau(xFront)} ${X_LASER},${Y0 + 5}`);
      // Les crêtes avancent à la célérité V : plans d'onde avant les fentes, cercles après.
      const parcours = T * V;
      cretes.forEach((c, k) => {
        const x = X_LASER + (parcours % lam) + k * lam, h = demiFaisceau(x);
        set(c, { x1: x, x2: x, y1: Y0 - h, y2: Y0 + h, opacity: x < xFront - 1 ? 0.8 : 0 });
      });

      // Étape 2 : les deux fentes émettent, les fronts gagnent l'écran, les lignes se dessinent.
      const rMax = Math.hypot(xE - XF, DEMI + sep / 2);
      const rFront = rMax * seg(a2, 0.02, 0.5, ease.lin);
      const opOndes = 0.85 - 0.3 * seg(a2, 0.5, 0.8) - 0.37 * seg(a4, 0, 0.15) + 0.27 * seg(a6, 0, 0.3);
      const opLignes = 1 - 0.72 * seg(a4, 0, 0.15) + 0.6 * seg(a6, 0, 0.3);
      const phase = (((parcours + X_LASER - XF) % lam) + lam) % lam;
      arcs.forEach((serie) => serie.forEach((c, k) => {
        const r = phase + k * lam;
        if (r > rFront || r > rMax) c.setAttribute('opacity', '0');
        else set(c, { r, opacity: opOndes * clamp(r / 10) * clamp((rFront - r) / 24 + (a2 >= 0.5 ? 1 : 0)) * lerp(1, 0.5, r / 360) });
      }));
      renforts.forEach((l, j) => {
        const k = j - KX, d = Math.abs(k), pr = seg(a2, 0.5 + 0.035 * d, 0.7 + 0.035 * d, ease.out);
        set(l, {
          x2: lerp(XF, xE - 7, pr), y2: lerp(Y0, Y0 - k * iPx, pr), opacity: d * iPx <= DEMI && pr > 0 ? opLignes : 0,
          'stroke-dasharray': `${lam * 0.55} ${lam * 0.45}`, 'stroke-dashoffset': 0.275 * lam - phase,
        });
      });
      extinctions.forEach((l, j) => {
        const pos = (j - KX + 0.5) * iPx;
        set(l, { x2: xE - 7, y2: Y0 - pos, opacity: Math.abs(pos) <= DEMI ? 0.85 * opLignes * seg(a2, 0.74, 0.9) : 0 });
      });
      set(echRenfort, { 'stroke-dasharray': `${lam * 0.55} ${lam * 0.45}`, 'stroke-dashoffset': 0.275 * lam - phase });
      show(gLegende, seg(a2, 0.56, 0.7) * (1 - seg(a4, 0, 0.08)));
      gLegExt.style.opacity = String(seg(a2, 0.74, 0.9));

      // Étape 3 : la lumière marque l'écran, qui se déplie de face ; les franges se révèlent du centre vers les bords.
      const eclaire = seg(a3, 0.02, 0.3, ease.out), deplie = seg(a3, 0.2, 0.44, ease.out), revele = seg(a3, 0.42, 0.92);
      set(lueur, { y: Y0 - DEMI * eclaire, height: 2 * DEMI * eclaire });
      set(gFace, { transform: `translate(${XS * (1 - deplie)} 0) scale(${Math.max(deplie, 0.001)} 1)`, opacity: seg(a3, 0.2, 0.3) });
      set(franges, { y: Y0 - DEMI * revele, height: 2 * DEMI * revele });
      proj.forEach((l, j) => {
        const k = j - 3, d = Math.abs(k * iPx);
        set(l, { x1: xE + 8, x2: XS - 2, y1: Y0 - k * iPx, y2: Y0 - k * iPx, opacity: revele > 0 && d <= DEMI * revele ? 0.6 * (1 - seg(a4, 0, 0.1)) : 0 });
      });

      // Étape 4 : M part du centre (δ = 0), s'arrête sur la première frange sombre (δ = λ/2), puis sur la frange brillante suivante (δ = λ).
      const xM = ((seg(a4, 0.3, 0.48) + seg(a4, 0.66, 0.84)) * i) / 2;
      const delta = differenceMarche(xM, y), ordreM = delta / p.lambda, iM = intensite(xM, y), yM = Y0 - xM * PX_MM;
      const vis4 = seg(a4, 0.02, 0.1) * (1 - seg(a5, 0, 0.14));
      gMarche.style.opacity = String(vis4);
      const tir = seg(a4, 0.04, 0.22, ease.out);
      set(rayon1, { y1: yS1, x2: lerp(XF, xE, tir), y2: lerp(yS1, yM, tir) });
      set(rayon2, { y1: yS2, x2: lerp(XF, xE, tir), y2: lerp(yS2, yM, tir) });
      // Surlongueur : portée sur S2M à partir de S2, à l'échelle des fronts d'onde (δ = λ vaut un écart entre deux fronts).
      const l2 = Math.hypot(xE - XF, yM - yS2), dPx = ordreM * lam;
      const hx = XF + ((xE - XF) / l2) * dPx, hy = yS2 + ((yM - yS2) / l2) * dPx;
      set(surlong, { y1: yS2, x2: hx, y2: hy, opacity: dPx > 0.4 ? 1 : 0 });
      set(perp, { y1: yS1, x2: hx, y2: hy, opacity: dPx > 0.4 ? 0.85 : 0 });
      etiqDelta.style.opacity = String(seg(a4, 0.32, 0.42));
      gM.style.opacity = String(seg(a4, 0.18, 0.26));
      set(haloM, { cx: xE + 2, cy: yM, r: 10 + 2 * Math.sin(T * 4) });
      set(ptM, { cx: xE + 2, cy: yM });
      set(etiqM, { x: xE + 16, y: yM + 5 });
      pointeur.setAttribute('points', `${XS - 12},${yM - 5} ${XS - 2},${yM} ${XS - 12},${yM + 5}`);

      // Les deux ondes reçues en M, décalées de 2π·δ/λ, et leur somme.
      show(gSinus, seg(a4, 0.1, 0.26, ease.out) * (1 - seg(a5, 0, 0.14)), 16);
      const dephasage = 2 * Math.PI * ordreM;
      const sinus = (x0: number, L: number, c1: number, c2: number) => {
        let s = '';
        for (let u = 0; u <= L; u += 4) {
          const ph = (2 * Math.PI * u) / PERIODE - T * 5;
          s += `${x0 + u},${(YC - AMP * (c1 * Math.sin(ph) + c2 * Math.sin(ph - dephasage))).toFixed(1)} `;
        }
        return s;
      };
      onde1.setAttribute('points', sinus(28, 220, 1, 0));
      onde2.setAttribute('points', sinus(28, 220, 0, 1));
      somme.setAttribute('points', sinus(270, 196, 1, 1));
      const nat = nature(delta, p.lambda);
      const ton = nat === 'constructive' ? C.menthe : nat === 'destructive' ? C.corail : C.discret;
      tDelta.textContent = `δ = ${fmt(ordreM, 2)} λ`;
      tEtat.textContent = nat === 'constructive' ? L('Ondes en phase', 'Waves in phase') : nat === 'destructive' ? L('Opposition de phase', 'In antiphase') : L('Déphasage partiel', 'Partial phase shift');
      tFrange.textContent = nat === 'constructive' ? L('Frange brillante', 'Bright fringe') : nat === 'destructive' ? L('Frange sombre', 'Dark fringe') : L('Éclairement moyen', 'Medium brightness');
      for (const n of [tEtat, tFrange]) n.setAttribute('fill', ton);

      // Étape 5 : deux mâchoires s'écartent du centre jusqu'aux franges brillantes d'ordre -n et +n.
      const ouvre = seg(a5, 0.22, 0.6), demiPx = n * iPx * ouvre;
      gPied.style.opacity = String(seg(a5, 0.12, 0.22));
      machoires.forEach((m, s) => set(m, { y1: Y0 + (s ? 1 : -1) * demiPx, y2: Y0 + (s ? 1 : -1) * demiPx }));
      set(cote, { y1: Y0 - demiPx, y2: Y0 + demiPx });
      pions.forEach((c, j) => {
        const k = j - 5;
        set(c, { cy: Y0 - k * iPx, opacity: Math.abs(k) <= n && Math.abs(k) * iPx <= demiPx + 0.5 ? 1 : 0 });
      });
      etiqN.style.opacity = String(seg(a5, 0.58, 0.7));
      show(gMesure, seg(a5, 0.12, 0.3, ease.out), 16);
      tNi.style.opacity = String(seg(a5, 0.6, 0.72));
      tI.style.opacity = String(seg(a5, 0.78, 0.92));

      // Étape 6 : résultat.
      show(gResultat, seg(a6, 0.05, 0.35, ease.backOut), 16);

      if (graphique) {
        const xr = X_MAX * revele;
        graphique.courbe('I', revele > 0 ? pts.filter(([x]) => Math.abs(x) <= xr + 1e-6) : [], { couleur: teinte, epaisseur: 2.5 });
        if (revele > 0 && revele < 1) graphique.repere('trace', xr, intensite(xr, y), { couleur: C.texte, rayon: 4 });
        else graphique.effacer('trace');
        if (vis4 > 0 && tir > 0.9) {
          graphique.repere('M', xM, iM, { couleur: C.texte, label: `δ = ${fmt(ordreM, 2)} λ` });
          graphique.opacite('M', vis4);
        } else graphique.effacer('M');
        if (a5 > 0.12) {
          graphique.verticale('gauche', -n * i * ouvre, { couleur: C.jaune });
          graphique.verticale('droite', n * i * ouvre, { couleur: C.jaune, label: ouvre >= 1 ? `${2 * n} i = ${fmt(2 * n * i, 1)} mm` : undefined });
          graphique.opacite('gauche', seg(a5, 0.12, 0.22));
          graphique.opacite('droite', seg(a5, 0.12, 0.22));
        } else {
          graphique.effacer('gauche');
          graphique.effacer('droite');
        }
        if (a6 > 0.3) {
          graphique.courbe('pont', [[0, 1.1], [0, 1.16], [i, 1.16], [i, 1.1]], { couleur: C.jaune, epaisseur: 2 });
          graphique.repere('i', i, 1, { couleur: C.jaune, label: `i = ${fmt(i, 2)} mm` });
          graphique.opacite('pont', seg(a6, 0.3, 0.5));
          graphique.opacite('i', seg(a6, 0.4, 0.6));
        } else {
          graphique.effacer('pont');
          graphique.effacer('i');
        }
      }

      const enM = a4 > 0.04;
      const mesures = [
        { label: L('Différence de marche en M', 'Path difference at M'), valeur: enM ? `${fmt(delta, 0)} nm` : '...' },
        { label: L('Intensité en M', 'Intensity at M'), valeur: enM ? `${fmt(iM * 100, 0)} %` : '...' },
        { label: L('Interfrange', 'Fringe spacing'), valeur: a5 > 0.78 ? `${fmt(i, 2)} mm` : '...' },
      ];
      if (a6 > 0.3) mesures.push({ label: L('Longueur d\'onde', 'Wavelength'), valeur: `${fmt(longueurOnde(i, p.b, p.D), 0)} nm` });
      return mesures;
    };
  },
});
