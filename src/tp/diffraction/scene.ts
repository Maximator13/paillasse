import { avancement, clamp, ease, el, fmt, lerp, seg, set, show, texte, uid } from '../../lib/anim';
import { etiquette } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { angle, couleurLaser, intensite, largeurTache, longueurOnde, pente, serie } from './model';

// Vue de dessus du banc d'optique.
const YC = 142; // axe optique
const X_LASER = 109; // sortie du laser
const X_FENTE = 196;
const PX_M = 162; // échelle le long du banc (px par mètre)
const K_HAUT = 1.6; // échelle transversale, très dilatée (px par mm sur l'écran)
const H_ECRAN = 90; // demi-largeur de l'écran (px)
const FAISCEAU = 18; // largeur dessinée du faisceau (px)
const N_TRANCHES = 72, DY = (2 * H_ECRAN) / N_TRANCHES;
// Écran vu de face.
const XF = 320, YF = 325, K_FACE = 4.5; // centre de la figure, px par mm
const N_STOPS = 293; // un arrêt de dégradé tous les 2 px
// Fente.
const A_OUVERTE = 1000; // µm : fente grande ouverte, le faisceau passe sans être diaphragmé
const SERIE = [200, 120, 100, 70, 50, 40]; // µm : largeurs de la série de mesures
const debut = (i: number) => 0.01 + 0.15 * i; // instant où la fente i est réglée, dans l'étape 5
/** Écartement dessiné des mâchoires de la fente (px) pour une largeur a (µm). */
const ouverture = (a: number) => 4 + 26 * clamp(Math.log(a / 40) / Math.log(A_OUVERTE / 40)) ** 1.5;

const AXES_PROFIL = {
  x: { label: 'Position x sur l\'écran (mm)', min: -60, max: 60, pas: 20 },
  y: { label: 'I / I0', min: 0, max: 1.15, pas: 0.2 }, // marge au-dessus du maximum pour l'étiquette de L
  titre: 'Profil d\'intensité',
};
const AXES_DROITE = {
  x: { label: '1/a (mm⁻¹)', min: 0, max: 30, pas: 5 },
  y: { label: 'L (mm)', min: 0, max: 100, pas: 20 },
  titre: 'L en fonction de 1/a',
};

/** Cote : trait horizontal borné par deux butées, avec sa valeur. */
function cote(parent: Element, couleur: string, taille = 13) {
  const g = el('g', {}, parent);
  const trait = el('path', { fill: 'none', stroke: couleur, 'stroke-width': 2, 'stroke-linecap': 'round' }, g);
  const label = etiquette(g, { x: 0, y: 0, texte: '', ancre: 'middle', mono: true, taille, couleur });
  return {
    g,
    maj(x1: number, x2: number, y: number, valeur: string, yTexte = y + 4.5) {
      set(trait, { d: `M${x1} ${y - 5}v10M${x1} ${y}H${x2}M${x2} ${y - 5}v10` });
      set(label, { x: (x1 + x2) / 2, y: yTexte });
      label.textContent = valeur;
    },
  };
}

export default definirScene({
  etapes: [
    { titre: 'Aligner le banc d\'optique', duree: 5, texte: 'Vu de dessus, le banc porte un <strong>laser</strong>, une <strong>fente réglable</strong> (grande ouverte pour l\'instant) et un <strong>écran</strong>. En bas, le même écran est représenté vu de face.' },
    { titre: 'Allumer le laser', duree: 5, texte: 'Le faisceau traverse la fente ouverte sans être gêné : il se propage <strong>en ligne droite</strong> et dessine un simple point lumineux sur l\'écran.' },
    { titre: 'Resserrer la fente', duree: 9, texte: 'On referme la fente. Au lieu de s\'affiner, le faisceau <strong>s\'étale</strong> : c\'est la <strong>diffraction</strong>. Sur l\'écran, une tache centrale brillante apparaît, bordée de taches secondaires.' },
    { titre: 'Mesurer la tache centrale', duree: 7, texte: 'La tache centrale est limitée par deux extinctions : on mesure sa largeur <strong>L</strong> à la règle. Comme l\'angle est petit, tan θ = L/(2D) ≈ θ : avec <strong>θ = λ/a</strong>, on obtient <strong>L = 2λD/a</strong>.' },
    { titre: 'Changer la largeur de la fente', duree: 14, texte: 'On recommence pour six largeurs <strong>a</strong> connues, de 200 µm à 40 µm. Plus la fente est fine, plus la tache s\'élargit : chaque mesure donne un point du graphique <strong>L = f(1/a)</strong>.' },
    { titre: 'Déterminer la longueur d\'onde', duree: 6, texte: 'Les points s\'alignent sur une droite passant par l\'origine, de pente <strong>2λD</strong> : on en déduit <strong>λ</strong>. Changez la fente, la couleur du laser ou la distance de l\'écran et observez la figure.' },
  ],
  parametres: [
    { id: 'a', label: 'Largeur de la fente a', min: 40, max: 200, pas: 5, valeur: 100, unite: 'µm' },
    { id: 'lambda', label: 'Longueur d\'onde λ du laser', min: 400, max: 700, pas: 10, valeur: 650, unite: 'nm' },
    { id: 'D', label: 'Distance fente-écran D', min: 1, max: 2.5, pas: 0.1, valeur: 2, unite: 'm' },
  ],
  graphique: AXES_PROFIL,
  affiche: { etape: 3, t: 1 },

  monter({ scene, graphique }) {
    const defs = el('defs', {}, scene);
    const url = (id: string) => `url(#${id})`;

    // Banc gradué tous les 10 cm.
    const banc = el('g', {}, scene);
    el('rect', { x: 20, y: YC - 8, width: 600, height: 16, rx: 4, fill: C.panneau, stroke: C.grille, 'stroke-width': 2 }, banc);
    for (let i = -10; i <= 26; i++) {
      const x = X_FENTE + (i * PX_M) / 10;
      el('line', { x1: x, x2: x, y1: YC + (i % 5 ? 3 : -2), y2: YC + 7, stroke: C.discret, 'stroke-width': 1, opacity: 0.7 }, banc);
    }

    // Lumière : faisceau incident, éventail diffracté, fronts d'onde. Le masque de coupe sert à faire avancer la tête du faisceau.
    const idTete = uid('tete'), idEventail = uid('eventail'), idLobes = uid('lobes');
    const tete = el('rect', { x: 0, y: 0, width: 0, height: 480 }, el('clipPath', { id: idTete }, defs));
    const lumiere = el('g', { 'clip-path': url(idTete) }, scene);
    const faisceau = el('rect', { x: X_LASER, y: YC - FAISCEAU / 2, width: X_FENTE - X_LASER, height: FAISCEAU, opacity: 0.45 }, lumiere);
    const eventail = el('g', { id: idEventail }, lumiere);
    const tranches = Array.from({ length: N_TRANCHES }, () => el('polygon', {}, eventail));
    const style = { fill: 'none', 'stroke-width': 1.6, 'stroke-linecap': 'round' };
    const plans = el('path', style, lumiere);
    const plansApres = el('path', style, lumiere);
    // Les fronts circulaires ne sont visibles que là où l'éventail est éclairé.
    el('use', { href: `#${idEventail}` }, el('mask', { id: idLobes, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 640, height: 480, style: 'mask-type:alpha' }, defs));
    const anneaux = el('path', { ...style, mask: url(idLobes) }, lumiere);

    // Laser.
    const laser = el('g', {}, scene);
    el('rect', { x: 100, y: YC - 9, width: 9, height: 18, rx: 2, fill: C.metal }, laser);
    el('rect', { x: 28, y: YC - 22, width: 74, height: 44, rx: 8, fill: C.panneau, stroke: C.verre, 'stroke-width': TRAIT }, laser);
    texte(laser, 75, YC + 5, 'LASER', { fill: C.discret, 'font-family': POLICE, 'font-size': 13, 'font-weight': 600, 'letter-spacing': '.06em', 'text-anchor': 'middle' });
    const led = el('circle', { cx: 42, cy: YC, r: 4.5 }, laser);
    const etiqLambda = etiquette(laser, { x: 28, y: YC - 32, texte: '', mono: true, taille: 13 });

    // Fente réglable : deux mâchoires dans une monture.
    const fente = el('g', {}, scene);
    for (const y of [YC - 57, YC + 51]) el('rect', { x: X_FENTE - 9, y, width: 18, height: 6, rx: 3, fill: C.metal }, fente);
    const machoires = [0, 1].map(() => el('rect', { x: X_FENTE - 3, width: 6, rx: 1.5, fill: C.verre }, fente));
    const etiqA = etiquette(fente, { x: X_FENTE, y: YC - 68, texte: '', ancre: 'middle', mono: true, taille: 13 });

    // Écran (vu de dessus), repéré par rapport à sa face éclairée.
    const ecran = el('g', {}, scene);
    el('rect', { x: 0, y: YC - H_ECRAN - 4, width: 6, height: 2 * H_ECRAN + 8, rx: 3, fill: C.verre }, ecran);
    etiquette(ecran, { x: 8, y: YC - H_ECRAN - 14, texte: 'Écran', ancre: 'end' });
    const coteD = cote(scene, C.discret);

    // Angle de diffraction.
    const theta = el('g', {}, scene);
    const pointille = { stroke: C.jaune, 'stroke-width': 1.5, 'stroke-dasharray': '5 4', 'stroke-linecap': 'round' };
    const axe = el('line', { x1: X_FENTE, y1: YC, y2: YC, ...pointille, opacity: 0.7 }, theta);
    const rayon = el('line', { x1: X_FENTE, y1: YC, ...pointille }, theta);
    const arc = el('path', { fill: 'none', stroke: C.jaune, 'stroke-width': 2 }, theta);
    const etiqTheta = etiquette(theta, { x: 0, y: 0, texte: 'θ = λ/a', mono: true, taille: 14, couleur: C.jaune });

    // Écran vu de face : la figure est un dégradé horizontal recalculé depuis le profil d'intensité, adouci verticalement.
    const idFigure = uid('figure'), idFondu = uid('fondu'), idHalo = uid('halo');
    const degrade = el('linearGradient', { id: idFigure, gradientUnits: 'userSpaceOnUse', x1: 28, x2: 612, y1: 0, y2: 0 }, defs);
    const stops = Array.from({ length: N_STOPS }, (_, i) => el('stop', { offset: i / (N_STOPS - 1) }, degrade));
    const fondu = el('linearGradient', { id: idFondu, x1: 0, x2: 0, y1: 0, y2: 1 }, defs);
    for (const [o, op] of [[0, 0], [0.2, 0.1], [0.36, 0.45], [0.45, 1], [0.55, 1], [0.64, 0.45], [0.8, 0.1], [1, 0]]) {
      el('stop', { offset: o, 'stop-color': C.blanc, 'stop-opacity': op }, fondu);
    }
    el('rect', { x: 28, y: YF - 32, width: 584, height: 64, fill: url(idFondu) }, el('mask', { id: idHalo, maskUnits: 'userSpaceOnUse', x: 28, y: YF - 32, width: 584, height: 64 }, defs));
    const face = el('g', {}, scene);
    etiquette(face, { x: 24, y: YF - 43, texte: 'Écran vu de face', taille: 13, couleur: C.discret });
    el('rect', { x: 24, y: YF - 35, width: 592, height: 70, rx: 10, fill: C.panneau, stroke: C.verre, 'stroke-width': TRAIT }, face);
    const figure = el('rect', { x: 28, y: YF - 32, width: 584, height: 64, fill: url(idFigure), mask: url(idHalo) }, face);

    // Règle graduée en millimètres, puis mesure de L.
    const regle = el('g', {}, scene);
    el('rect', { x: 28, y: YF + 41, width: 584, height: 28, rx: 5, fill: C.panneau, stroke: C.metal, 'stroke-width': 1.5 }, regle);
    for (let mm = -64; mm <= 64; mm++) {
      const x = XF + K_FACE * mm;
      el('line', { x1: x, x2: x, y1: YF + 41, y2: YF + 41 + (mm % 10 === 0 ? 11 : mm % 5 === 0 ? 8 : 5), stroke: C.verre, 'stroke-width': 1, opacity: 0.7 }, regle);
      if (mm % 20 === 0) texte(regle, x, YF + 65, String(mm), { fill: C.texte, 'font-family': MONO, 'font-size': 13, 'text-anchor': 'middle' });
    }
    const mesure = el('g', {}, scene);
    const extinctions = [0, 1].map(() => el('line', { y1: YF - 29, y2: YF + 91, ...pointille }, mesure));
    const coteL = cote(scene, C.jaune, 15);

    // Encart de résultat (étape 6).
    const encart = el('g', {}, scene);
    el('rect', { x: 24, y: 186, width: 156, height: 76, rx: 12, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 36, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(208, 13, C.discret, POLICE).textContent = 'Pente de la droite';
    const lignePente = ligne(228, 13, C.texte);
    const resultat = ligne(252, 18, C.jaune);

    let cle = '', mode = 'profil';

    return ({ etape, t, T, p }) => {
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((i) => avancement({ etape, t }, i));
      const lambda = p.lambda * 1e-9, D = p.D;

      // Largeur de la fente à l'instant affiché (µm) : elle se referme à l'étape 3, parcourt la série à l'étape 5, puis revient au curseur.
      let la = lerp(Math.log(A_OUVERTE), Math.log(p.a), seg(a3, 0.1, 0.82));
      SERIE.forEach((s, i) => { la = lerp(la, Math.log(s), seg(a5, debut(i), debut(i) + 0.05)); });
      const a = Math.exp(lerp(la, Math.log(p.a), seg(a5, 0.93, 1)));
      const L = largeurTache(lambda, a * 1e-6, D) * 1e3; // mm
      // 0 : faisceau libre (simple point), 1 : figure de diffraction établie.
      const diff = clamp(Math.log(A_OUVERTE / a) / Math.log(A_OUVERTE / 250));
      const profil = (x: number) => intensite(x * 1e-3, lambda, a * 1e-6, D) * (Math.abs(x) < L / 2 ? 1 : diff);

      const rvb = couleurLaser(p.lambda);
      const teinte = (blanc: number) => `rgb(${rvb.map((c) => Math.round(lerp(c, 255, blanc))).join(',')})`;
      const xe = X_FENTE + PX_M * D, jeu = ouverture(a), w0 = Math.min(jeu, FAISCEAU) / 2;
      const bord = w0 + (K_HAUT * L) / 2; // bord de la tache centrale sur l'écran vu de dessus (px depuis l'axe)

      // Figure : éventail vu de dessus et dégradé vu de face, recalculés seulement si la physique a changé.
      if (cle !== `${a}|${p.lambda}|${D}`) {
        cle = `${a}|${p.lambda}|${D}`;
        const versMm = (y: number) => (Math.abs(y) <= bord ? (Math.abs(y) * L) / (2 * bord) : (Math.abs(y) - w0) / K_HAUT);
        const depart = (y: number) => Math.sign(y) * w0 * Math.min(1, (2 * versMm(y)) / L);
        const eclat = (y: number) => (Math.abs(y) <= bord ? lerp(1, profil(versMm(y)), diff) : profil(versMm(y)));
        const couleur = teinte(0.12);
        tranches.forEach((tr, i) => {
          const y0 = -H_ECRAN + i * DY, y1 = y0 + DY;
          const e = (eclat(y0 + DY * 0.17) + eclat(y0 + DY * 0.5) + eclat(y0 + DY * 0.83)) / 3;
          set(tr, {
            points: `${X_FENTE},${(YC + depart(y0)).toFixed(2)} ${X_FENTE},${(YC + depart(y1)).toFixed(2)} ${xe},${YC + y1 + 0.35} ${xe},${YC + y0}`,
            fill: couleur, opacity: (0.8 * e ** 0.45).toFixed(3),
          });
        });
        stops.forEach((s, i) => {
          const v = profil((28 + 2 * i - XF) / K_FACE);
          set(s, { 'stop-color': teinte(0.1 + 0.8 * v ** 2), 'stop-opacity': (v ** 0.45).toFixed(3) });
        });
      }

      // Étape 1 : le matériel prend place sur le banc.
      show(banc, seg(a1, 0, 0.2));
      laser.style.opacity = String(seg(a1, 0.1, 0.25));
      laser.style.transform = `translateX(${lerp(-130, 0, seg(a1, 0.1, 0.4, ease.out))}px)`;
      fente.style.opacity = String(seg(a1, 0.3, 0.45));
      fente.style.transform = `translateY(${lerp(-150, 0, seg(a1, 0.3, 0.6, ease.out))}px)`;
      ecran.style.opacity = String(seg(a1, 0.5, 0.65));
      ecran.style.transform = `translateX(${xe + lerp(130, 0, seg(a1, 0.5, 0.8, ease.out))}px)`;
      show(face, seg(a1, 0.68, 0.92), 18);
      coteD.g.style.opacity = String(seg(a1, 0.8, 0.9));
      coteD.maj(X_FENTE, lerp(X_FENTE + 90, xe, seg(a1, 0.8, 1)), YC + H_ECRAN + 16, `D = ${fmt(D, 2)} m`, YC + H_ECRAN + 33);
      etiqLambda.textContent = `λ = ${fmt(p.lambda, 0)} nm`;
      etiqLambda.setAttribute('fill', teinte(0.35));
      etiqA.textContent = a3 > 0.1 ? `a = ${fmt(a, 0)} µm` : 'Fente ouverte';
      set(machoires[0], { y: YC - 52, height: 52 - jeu / 2 });
      set(machoires[1], { y: YC + jeu / 2, height: 52 - jeu / 2 });

      // Étape 2 : le laser s'allume, la tête du faisceau file jusqu'à l'écran.
      const allume = a2 > 0.12;
      led.setAttribute('fill', allume ? teinte(0.35) : C.grille);
      lumiere.style.opacity = allume ? '1' : '0';
      tete.setAttribute('width', String(lerp(X_LASER, xe + 4, seg(a2, 0.15, 0.6))));
      const surEcran = seg(a2, 0.58, 0.74, ease.out);
      figure.style.opacity = String(surEcran);
      faisceau.setAttribute('fill', teinte(0.12));

      // Fronts d'onde : plans avant la fente, circulaires après. Leur espacement suit la longueur d'onde.
      const pasOnde = (11 * p.lambda) / 650, d0 = X_FENTE - X_LASER, portee = xe - X_FENTE;
      let dPlans = '', dApres = '', dAnneaux = '';
      for (let d = (T * 34) % pasOnde; d < d0 + Math.hypot(portee, H_ECRAN); d += pasOnde) {
        const r = d - d0;
        if (r < 0) dPlans += `M${(X_LASER + d).toFixed(1)} ${YC - FAISCEAU / 2 + 1}v${FAISCEAU - 2}`;
        else {
          const h = lerp(w0, bord, r / portee) - 1;
          if (diff < 1 && r < portee) dApres += `M${(X_FENTE + r).toFixed(1)} ${(YC - h).toFixed(1)}v${(2 * h).toFixed(1)}`;
          if (diff > 0 && r > 1) dAnneaux += `M${X_FENTE} ${(YC - r).toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${X_FENTE} ${(YC + r).toFixed(1)}`;
        }
      }
      set(plans, { d: dPlans, stroke: teinte(0.6), opacity: 0.75 });
      set(plansApres, { d: dApres, stroke: teinte(0.6), opacity: 0.75 * (1 - diff) });
      set(anneaux, { d: dAnneaux, stroke: teinte(0.6), opacity: diff });

      // Étape 4 : la règle entre, les repères glissent jusqu'aux extinctions, l'angle se dessine.
      regle.style.opacity = String(seg(a4, 0, 0.12));
      regle.style.transform = `translateY(${lerp(60, 0, seg(a4, 0, 0.22, ease.out))}px)`;
      const ecart = (L / 2) * seg(a4, 0.25, 0.55); // mm
      mesure.style.opacity = String(seg(a4, 0.22, 0.3));
      extinctions.forEach((n, i) => set(n, { x1: XF + (2 * i - 1) * K_FACE * ecart, x2: XF + (2 * i - 1) * K_FACE * ecart }));
      coteL.g.style.opacity = String(seg(a4, 0.5, 0.62));
      coteL.maj(XF - K_FACE * ecart, XF + K_FACE * ecart, YF + 85, `L = ${fmt(L, 1)} mm`, YF + 110);
      const ang = Math.atan2(bord, portee), R = 72;
      set(axe, { x2: xe });
      set(rayon, { x2: xe, y2: YC - bord });
      set(arc, { d: `M${X_FENTE + R} ${YC}A${R} ${R} 0 0 0 ${X_FENTE + R * Math.cos(ang)} ${YC - R * Math.sin(ang)}` });
      set(etiqTheta, { x: X_FENTE + R + 12, y: YC - (R + 12) * Math.tan(ang) - 12 });
      show(theta, seg(a4, 0.68, 0.88));

      // Étapes 5 et 6 : série de mesures, puis exploitation.
      const points = serie(lambda, D, SERIE.map((s) => s * 1e-6)).map(([x, y]) => [x * 1e-3, y * 1e3] as [number, number]); // (mm⁻¹, mm)
      const k = pente(points); // mm²
      const lambdaMesuree = longueurOnde(k * 1e-6, D) * 1e9; // nm
      show(encart, seg(a6, 0.45, 0.75, ease.backOut), 16);
      lignePente.textContent = `2·λ·D = ${fmt(k, 2)} mm²`;
      resultat.textContent = `λ = ${fmt(lambdaMesuree, 0)} nm`;

      if (graphique) {
        const voulu = etape >= 4 ? 'droite' : 'profil';
        if (voulu !== mode) {
          mode = voulu;
          graphique.effacer();
          graphique.axes(mode === 'droite' ? AXES_DROITE : AXES_PROFIL);
        }
        if (mode === 'profil') {
          const pts: [number, number][] = [];
          if (surEcran > 0) for (let x = -60; x <= 60; x += 0.25) pts.push([x, profil(x)]);
          graphique.courbe('profil', pts, { couleur: teinte(0.3), epaisseur: 3 });
          graphique.opacite('profil', surEcran);
          if (ecart > 0) {
            graphique.verticale('gauche', -ecart, { couleur: C.jaune });
            graphique.verticale('droite', ecart, { couleur: C.jaune, label: a4 > 0.55 ? `L = ${fmt(L, 1)} mm` : undefined });
          } else {
            graphique.effacer('gauche');
            graphique.effacer('droite');
          }
        } else {
          const n = SERIE.filter((_, i) => a5 >= debut(i) + 0.1).length;
          const xFin = 30 * seg(a6, 0.05, 0.45);
          graphique.courbe('ajustement', a6 > 0.05 ? [[0, 0], [xFin, k * xFin]] : [], { couleur: C.cyan, epaisseur: 2.5 });
          graphique.nuage('mesures', points.slice(0, n), { couleur: C.jaune, rayon: 4.5 });
          if (etape === 4 && n > 0 && a5 < 0.93) {
            graphique.repere('dernier', ...points[n - 1], { couleur: C.jaune, label: `a = ${SERIE[n - 1]} µm : L = ${fmt(points[n - 1][1], 0)} mm` });
          } else graphique.effacer('dernier');
          if (a6 > 0.5) {
            graphique.repere('curseur', 1000 / p.a, L, { couleur: C.blanc, label: `a = ${fmt(p.a, 0)} µm` });
            graphique.opacite('curseur', seg(a6, 0.5, 0.7));
          } else graphique.effacer('curseur');
        }
      }

      const mesures = [
        { label: 'Largeur de la fente a', valeur: a3 > 0.1 ? `${fmt(a, 0)} µm` : 'ouverte' },
        { label: 'Angle θ = λ/a', valeur: diff >= 1 ? `${fmt(angle(lambda, a * 1e-6) * 1e3, 1)} mrad` : '...' },
        { label: 'Tache centrale L', valeur: a4 > 0.55 ? `${fmt(L, 1)} mm` : '...' },
      ];
      if (a6 > 0.45) mesures.push({ label: 'λ mesurée', valeur: `${fmt(lambdaMesuree, 0)} nm` });
      return mesures;
    };
  },
});
