import { L, avancement, clamp, ease, el, fmt, lerp, mix, rng, seg, set, show, texte, uid } from '../../lib/anim';
import { appareil, becher, etiquette, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, themeSombre } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { fractionBase, ka, pH, rapport, regression } from './model';

// Cinq mélanges de 20 mL : volumes (mL) de solution d'acide AH et de solution de base conjuguée A-.
const MELANGES = [{ va: 18, vb: 2 }, { va: 15, vb: 5 }, { va: 10, vb: 10 }, { va: 5, vb: 15 }, { va: 2, vb: 18 }];
const XB = [74, 190, 306, 422, 538]; // centres des béchers
const PLEIN = 0.62; // niveau d'un bécher rempli
const N = 12; // entités dessinées par bécher
const X_LOG = 1.2; // demi-largeur de l'axe log([A-]/[AH])
// Diagramme de prédominance : axe de pH de 2 à 8.
const D = { x0: 40, x1: 440, y: 40, h: 22, min: 2, max: 8 };
const xD = (ph: number) => lerp(D.x0, D.x1, clamp((ph - D.min) / (D.max - D.min)));
const SONDE_DX = 27, Y_IMMERGE = 428, LEVEE = 112, L_SONDE = 100;
/** Valeur selon le thème courant (un même voile ne se voit pas pareil sur fond nuit et sur fond blanc). */
const selon = (sombre: number, clair: number) => (themeSombre() ? sombre : clair);
/** Dégradé horizontal en coordonnées de l'objet, renvoie la valeur de fill. */
function degrade(g: Element, arrets: [number, string, number][], vertical = false) {
  const id = uid('ka');
  const gr = el('linearGradient', { id, x1: 0, y1: 0, x2: vertical ? 0 : 1, y2: vertical ? 1 : 0 }, el('defs', {}, g));
  for (const [offset, c, o] of arrets) el('stop', { offset, 'stop-color': c, 'stop-opacity': o }, gr);
  return `url(#${id})`;
}
/** Volume d'un tube de verre : bord gauche ombré, liseré de lumière, bord droit plus sombre (comme le kit). */
const relief = (g: Element) => degrade(g, [
  [0, C.ombre, selon(0.32, 0.1)], [0.1, C.ombre, 0], [0.18, C.blanc, 0], [0.3, C.blanc, selon(0.25, 0.6)],
  [0.42, C.blanc, 0], [0.75, C.ombre, 0], [1, C.ombre, selon(0.38, 0.14)],
]);

export default definirScene({
  etapes: [
    { titre: L('Préparer cinq mélanges', 'Prepare five mixtures'), duree: 10, texte: L('Dans cinq béchers, on mélange des volumes différents de solution d\'acide <strong>AH</strong> et de sa base conjuguée <strong>A<sup>-</sup></strong>, de même concentration. Le rapport [A<sup>-</sup>]/[AH] vaut alors V<sub>B</sub>/V<sub>A</sub>.', 'In five beakers, different volumes of a solution of the acid <strong>AH</strong> and of its conjugate base <strong>A<sup>-</sup></strong>, of the same concentration, are mixed. The ratio [A<sup>-</sup>]/[AH] is then equal to V<sub>B</sub>/V<sub>A</sub>.') },
    { titre: L('Brancher le pH-mètre', 'Connect the pH meter'), duree: 5, texte: L('Le pH-mètre, étalonné avec deux solutions tampons, est mis en service. La sonde rincée est amenée au-dessus du premier bécher.', 'The pH meter, calibrated with two buffer solutions, is switched on. The rinsed probe is brought above the first beaker.') },
    { titre: L('Mesurer de bécher en bécher', 'Measure beaker by beaker'), duree: 14, texte: L('La sonde plonge dans chaque mélange. Plus la base A<sup>-</sup> est abondante, plus le pH est élevé : chaque mesure donne <strong>un point</strong> du graphique.', 'The probe is dipped into each mixture. The more base A<sup>-</sup> there is, the higher the pH: each measurement gives <strong>one point</strong> on the graph.') },
    { titre: L('Tracer la droite', 'Draw the straight line'), duree: 7, texte: L('Les points s\'alignent sur une droite de pente 1 : <strong>pH = pK<sub>A</sub> + log([A<sup>-</sup>]/[AH])</strong>. L\'ordonnée à l\'origine donne le pK<sub>A</sub> du couple.', 'The points lie on a straight line of gradient 1: <strong>pH = pK<sub>A</sub> + log([A<sup>-</sup>]/[AH])</strong>. The y-intercept gives the pK<sub>A</sub> of the pair.') },
    { titre: L('Lire le diagramme de prédominance', 'Read the predominance diagram'), duree: 7, texte: L('Si pH &lt; pK<sub>A</sub>, l\'acide AH prédomine ; si pH &gt; pK<sub>A</sub>, c\'est la base A<sup>-</sup>. Changez le <strong>pK<sub>A</sub></strong> ou diluez les solutions et observez la droite.', 'If pH &lt; pK<sub>A</sub>, the acid AH predominates; if pH &gt; pK<sub>A</sub>, the base A<sup>-</sup> does. Change the <strong>pK<sub>A</sub></strong> or dilute the solutions and watch the line.') },
  ],
  parametres: [
    { id: 'pKa', label: L('pKa du couple', 'pKa of the pair'), min: 3.5, max: 6, pas: 0.1, valeur: 4.8, decimales: 1 },
    { id: 'c', label: L('Concentration des solutions', 'Concentration of the solutions'), min: 0.002, max: 0.1, pas: 0.002, valeur: 0.1, unite: 'mol/L', decimales: 3 },
  ],
  graphique: {
    x: { label: 'log([A-]/[AH])', min: -X_LOG, max: X_LOG, pas: 0.6, decimales: 1 },
    y: { label: 'pH', min: 2, max: 8, pas: 1 },
  },
  affiche: { etape: 2, t: 0.56 },

  monter({ scene, graphique }) {
    const ACIDE = C.corail, BASE = C.bleu;
    paillasse(scene);

    // Diagramme de prédominance (haut de la scène).
    const diag = el('g', {}, scene);
    el('rect', { x: D.x0 + 1, y: D.y + 3, width: D.x1 - D.x0, height: D.h, rx: 5, fill: C.ombre, opacity: selon(0.35, 0.1) }, diag);
    el('rect', { x: D.x0, y: D.y, width: D.x1 - D.x0, height: D.h, rx: 5, fill: C.panneau }, diag);
    const NB = 50, lw = (D.x1 - D.x0) / NB;
    const bandes = Array.from({ length: NB }, (_, j) => el('rect', { x: D.x0 + j * lw, y: D.y, width: lw + 0.6, height: D.h }, diag));
    el('rect', { x: D.x0, y: D.y, width: D.x1 - D.x0, height: D.h, rx: 5, fill: 'none', stroke: C.metal, 'stroke-width': 1.5 }, diag);
    for (let v = D.min; v <= D.max; v++) {
      el('line', { x1: xD(v), x2: xD(v), y1: D.y + D.h, y2: D.y + D.h + 6, stroke: C.metal, 'stroke-width': 1.5 }, diag);
      texte(diag, xD(v), D.y + D.h + 22, String(v), { fill: C.discret, 'font-family': MONO, 'font-size': 13, 'text-anchor': 'middle' });
    }
    etiquette(diag, { x: D.x1 + 10, y: D.y + 16, texte: 'pH', taille: 14, couleur: C.discret });
    const zone = (t: string) => texte(diag, 0, D.y + 16, t, { fill: C.fond, 'font-family': POLICE, 'font-size': 14, 'font-weight': 700, 'text-anchor': 'middle' });
    const zAH = zone('AH'), zA = zone('A-'); // aux extrémités : jamais sous les jalons de mesure
    zAH.setAttribute('x', String(D.x0 + 18));
    zA.setAttribute('x', String(D.x1 - 16));
    const gPka = el('g', {}, diag);
    const traitPka = el('line', { y1: D.y - 6, y2: D.y + D.h, stroke: C.jaune, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, gPka);
    const etiqPka = etiquette(gPka, { x: 0, y: D.y - 12, texte: '', ancre: 'middle', mono: true, taille: 14, couleur: C.jaune });
    const jalons = MELANGES.map(() => el('circle', { cy: D.y + D.h / 2, r: 4.5, fill: C.fond, stroke: C.blanc, 'stroke-width': 2 }, diag));
    const curseur = el('g', {}, diag);
    el('line', { x1: 0, x2: 0, y1: D.y - 3, y2: D.y + D.h + 3, stroke: C.texte, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, curseur);
    el('polygon', { points: `0,${D.y + D.h + 3} -6,${D.y + D.h + 13} 6,${D.y + D.h + 13}`, fill: C.texte }, curseur);

    // Légende des entités.
    const legende = el('g', {}, scene);
    el('circle', { cx: 46, cy: 117, r: 5, fill: ACIDE }, legende);
    etiquette(legende, { x: 58, y: 122, texte: L('acide AH', 'acid AH'), taille: 13 });
    el('circle', { cx: 146, cy: 117, r: 5, fill: BASE }, legende);
    etiquette(legende, { x: 158, y: 122, texte: L('base conjuguée A-', 'conjugate base A-'), taille: 13 });

    // Béchers, entités en solution, étiquettes.
    const bechers = XB.map((x, i) => {
      const b = becher(scene, { x, y: 440, w: 90, h: 104 });
      const r = rng(11 + i * 7), nBase = Math.round((N * MELANGES[i].vb) / 20);
      const ordre = Array.from({ length: N }, (_, j) => j).sort(() => r() - 0.5); // répartit les deux espèces au hasard
      const pts = Array.from({ length: N }, (_, j) => ({
        x: x + (r() - 0.5) * 66, y: lerp(394, 431, (ordre[j] + 0.5) / N), ph: r() * 6.28,
        n: el('circle', { r: 3.6, fill: j < nBase ? BASE : ACIDE, stroke: C.fond, 'stroke-width': 1 }, b.g),
      }));
      const compo = etiquette(scene, { x, y: 461, texte: `${MELANGES[i].va} + ${MELANGES[i].vb} mL`, ancre: 'middle', mono: true, taille: 13, couleur: C.discret });
      const lecture = etiquette(scene, { x: x + 12, y: 322, texte: '', ancre: 'end', mono: true, taille: 13 });
      return { b, pts, compo, lecture };
    });

    // Pipette de préparation (étape 1).
    const pip = el('g', {}, scene);
    const corpsPip = 'M-6 196V300L-2 318H2L6 300V196';
    el('path', { d: corpsPip, fill: C.verre, 'fill-opacity': selon(0.08, 0.3) }, pip);
    const contenu = el('rect', { x: -5, y: 214, width: 10, height: 84, fill: ACIDE, opacity: 0.85 }, pip);
    el('path', { d: corpsPip, fill: relief(pip) }, pip);
    el('path', { d: corpsPip, fill: 'none', stroke: C.trait, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, pip);
    const nomPip = etiquette(pip, { x: 14, y: 262, texte: '', taille: 13 });
    const filet = el('line', { 'stroke-width': 3, 'stroke-linecap': 'round' }, scene);

    // pH-mètre et sonde mobile (étapes 2 et 3).
    const gPhm = el('g', {}, scene);
    const phm = appareil(gPhm, { x: 484, y: 18, w: 140, h: 74, titre: L('pH-MÈTRE', 'pH METER') });
    const cable = el('g', {}, scene);
    const cables = [
      el('path', { fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, cable),
      el('path', { fill: 'none', stroke: C.blanc, 'stroke-width': 0.8, opacity: selon(0.25, 0.5), 'stroke-linecap': 'round' }, cable),
    ];
    const gSonde = el('g', {}, scene);
    el('rect', { x: -5, y: -L_SONDE, width: 10, height: 18, rx: 3, fill: degrade(gSonde, [[0, mix(C.metal, C.ombre, 0.1), 1], [0.3, mix(C.metal, C.blanc, 0.4), 1], [1, mix(C.metal, C.ombre, 0.35), 1]]) }, gSonde);
    const tige = { x: -3.5, y: -L_SONDE + 16, width: 7, height: L_SONDE - 16, rx: 3.5 };
    el('rect', { ...tige, fill: C.verre, 'fill-opacity': selon(0.18, 0.35) }, gSonde);
    el('rect', { ...tige, fill: relief(gSonde), stroke: C.trait, 'stroke-width': 1.6 }, gSonde);
    el('circle', { cx: 0, cy: -5, r: 3, fill: C.trait, opacity: 0.8 }, gSonde);
    el('circle', { cx: -1, cy: -6, r: 1, fill: C.blanc, opacity: 0.7 }, gSonde);

    // Encart de résultat (étapes 4 et 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 42, y: 144, width: 300, height: 108, rx: 14, fill: C.ombre, opacity: selon(0.35, 0.1) }, encart);
    el('rect', { x: 40, y: 140, width: 300, height: 108, rx: 14, fill: degrade(encart, [[0, mix(C.panneau, C.metal, selon(0.12, 0.08)), 1], [1, C.panneau, 1]], true), stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 56, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(166, 13, C.discret, POLICE).textContent = L('Relation attendue (droite de pente 1)', 'Expected relation (line of gradient 1)');
    ligne(192, 15, C.texte).textContent = 'pH = pKa + log([A-]/[AH])';
    const resultat = ligne(226, 15, C.jaune);

    let cle = '', phs: number[] = [], pts: [number, number][] = [], reg = { pente: 1, ordonnee: 0 };

    return ({ etape, t, T, p }) => {
      if (cle !== `${p.pKa}|${p.c}`) {
        cle = `${p.pKa}|${p.c}`;
        phs = MELANGES.map((m) => pH({ ...m, c: p.c, pKa: p.pKa }));
        pts = MELANGES.map((m, i) => [Math.log10(rapport(m)), phs[i]]);
        reg = regression(pts);
        bandes.forEach((b, j) => b.setAttribute('fill', mix(ACIDE, BASE, fractionBase(lerp(D.min, D.max, (j + 0.5) / NB), p.pKa))));
      }
      const img = { etape, t };
      const a1 = avancement(img, 0), a2 = avancement(img, 1), a3 = avancement(img, 2), a4 = avancement(img, 3), a5 = avancement(img, 4);

      // Étape 1 : la pipette passe de bécher en bécher, verse l'acide puis la base conjuguée.
      let xPip = XB[0], verse = '', ySurfVerse = 0;
      bechers.forEach(({ b, pts: ent, compo }, i) => {
        const { va, vb } = MELANGES[i];
        const s = clamp((a1 - i * 0.19) / 0.2);
        const sA = seg(s, 0.25, 0.6, ease.lin), sB = seg(s, 0.6, 0.95, ease.lin);
        const niveau = (PLEIN * (va * sA + vb * sB)) / 20, ySurf = b.ySurface(niveau);
        b.liquide(niveau, mix(ACIDE, BASE, (vb * sB) / (va * sA + vb * sB || 1)));
        ent.forEach((e) => {
          set(e.n, { cx: e.x + Math.sin(T * 0.9 + e.ph) * 3, cy: e.y + Math.cos(T * 0.7 + e.ph * 2) * 2 });
          e.n.style.opacity = String(clamp((e.y - ySurf - 5) / 6));
        });
        show(compo, seg(s, 0.9, 1), 6);
        if (i > 0) xPip += (XB[i] - XB[i - 1]) * seg(s, 0, 0.22);
        if (s > 0.25 && s < 0.95) { verse = s < 0.6 ? ACIDE : BASE; ySurfVerse = ySurf; }
        if (s > 0 && s < 1) {
          contenu.setAttribute('fill', s < 0.6 ? ACIDE : BASE);
          nomPip.textContent = s < 0.6 ? L('acide AH', 'acid AH') : 'base A-';
        }
      });
      const yPip = -340 * (1 - seg(a1, 0, 0.05, ease.out)) - 340 * seg(a1, 0.96, 1, ease.in);
      pip.setAttribute('transform', `translate(${xPip} ${yPip})`);
      pip.style.opacity = a1 > 0 && a1 < 1 ? '1' : '0';
      set(filet, { x1: xPip, x2: xPip, y1: 318, y2: ySurfVerse, stroke: verse || ACIDE, opacity: verse ? 0.9 : 0 });
      show(legende, seg(a1, 0, 0.08), 6);

      // Étape 2 : le pH-mètre entre, la sonde se présente au-dessus du premier bécher.
      show(gPhm, seg(a2, 0, 0.35, ease.out), -20);
      const entree = seg(a2, 0.4, 0.9, ease.out);

      // Étape 3 : la sonde se lève, se déplace, plonge ; la lecture se stabilise ; le point apparaît.
      const k = Math.min(4, Math.floor(a3 * 5)), u = a3 * 5 - k;
      const levee = (k === 0 ? 1 : seg(u, 0, 0.12)) * (1 - seg(u, 0.28, 0.45));
      const xS = SONDE_DX + (k === 0 ? XB[0] : lerp(XB[k - 1], XB[k], seg(u, 0.08, 0.3)));
      const yS = Y_IMMERGE - LEVEE * levee - 70 * (1 - entree);
      gSonde.setAttribute('transform', `translate(${xS} ${yS})`);
      gSonde.style.opacity = cable.style.opacity = String(seg(a2, 0.4, 0.55));
      const yTete = yS - L_SONDE;
      const dCable = `M554 92C554 ${Math.max(200, yTete - 60)} ${xS} ${yTete - 40} ${xS} ${yTete}`;
      cables.forEach((c) => c.setAttribute('d', dCable));

      const lu = seg(u, 0.45, 0.7, ease.out); // stabilisation de la lecture
      const mesure = a3 > 0 && (k > 0 || u >= 0.45);
      const affichage = lerp(k === 0 ? 7 : phs[k - 1], phs[k], lu);
      phm.affiche(a2 < 0.35 ? '' : mesure ? fmt(affichage, 2) : L('-,--', '-.--'));
      const nMes = a3 <= 0 ? 0 : k + (u >= 0.7 ? 1 : 0);
      bechers.forEach(({ lecture }, i) => {
        lecture.textContent = `pH ${fmt(phs[i], 2)}`;
        const dom = Math.abs(phs[i] - p.pKa) < 0.05 ? C.jaune : phs[i] < p.pKa ? ACIDE : BASE;
        lecture.setAttribute('fill', mix(C.texte, dom, seg(a5, 0.55 + i * 0.07, 0.75 + i * 0.07)));
        show(lecture, i < nMes ? (i === k && a3 < 1 ? seg(u, 0.7, 0.85, ease.backOut) : 1) : 0, 8);
      });
      curseur.setAttribute('transform', `translate(${xD(affichage)} 0)`);
      curseur.style.opacity = mesure ? String(1 - seg(a5, 0.45, 0.55)) : '0'; // cède la place aux jalons

      // Étape 4 : droite ; étape 5 : diagramme de prédominance.
      show(encart, seg(a4, 0.6, 0.85, ease.backOut), 16);
      const [mant, ex] = ka(reg.ordonnee).toExponential(1).split('e').map(Number); // mantisse arrondie dans [1 ; 10[
      resultat.textContent = a5 > 0.5
        ? `pKa = ${fmt(reg.ordonnee, 2)} · Ka = ${fmt(mant, 1)} × 10⁻${'⁰¹²³⁴⁵⁶⁷⁸⁹'[-ex]}`
        : L(`pKa = ${fmt(reg.ordonnee, 2)} · pente = ${fmt(reg.pente, 2)}`, `pKa = ${fmt(reg.ordonnee, 2)} · gradient = ${fmt(reg.pente, 2)}`);
      const balayage = seg(a5, 0.05, 0.5, ease.inOut) * NB;
      bandes.forEach((b, j) => { b.style.opacity = String(clamp(balayage - j)); });
      const xp = xD(p.pKa), pk = seg(a5, 0.45, 0.65, ease.backOut);
      set(traitPka, { x1: xp, x2: xp });
      etiqPka.setAttribute('x', String(xp));
      etiqPka.textContent = `pKa = ${fmt(p.pKa, 1)}`;
      show(gPka, pk, -10);
      zAH.style.opacity = zA.style.opacity = String(seg(a5, 0.4, 0.55));
      jalons.forEach((j, i) => {
        j.setAttribute('cx', String(xD(phs[i])));
        j.style.opacity = String(seg(a5, 0.55 + i * 0.07, 0.65 + i * 0.07));
      });

      if (graphique) {
        graphique.nuage('points', pts.slice(0, nMes), { couleur: C.cyan, rayon: 5 });
        if (a3 > 0 && a3 < 1 && u >= 0.7) graphique.repere('mesure', pts[k][0], pts[k][1], { couleur: C.texte, rayon: 5, label: `pH = ${fmt(phs[k], 2)}` });
        else graphique.effacer('mesure');
        const xd = lerp(-X_LOG, X_LOG, seg(a4, 0.05, 0.55));
        graphique.courbe('droite', a4 > 0 ? [[-X_LOG, reg.ordonnee - reg.pente * X_LOG], [xd, reg.ordonnee + reg.pente * xd]] : [], { couleur: C.jaune, epaisseur: 2.5 });
        if (a4 > 0.6) {
          graphique.verticale('egal', 0, { couleur: C.discret, label: '[A-] = [AH]' });
          graphique.horizontale('lecture', reg.ordonnee, { couleur: C.jaune, label: `pKa = ${fmt(reg.ordonnee, 2)}` });
          graphique.repere('pka', 0, reg.ordonnee, { couleur: C.jaune });
          graphique.opacite('egal', seg(a4, 0.6, 0.75));
          graphique.opacite('lecture', seg(a4, 0.7, 0.9));
          graphique.opacite('pka', seg(a4, 0.7, 0.9));
        } else {
          graphique.effacer('egal');
          graphique.effacer('lecture');
          graphique.effacer('pka');
        }
      }

      const mesures = [
        { label: L('Rapport [A-]/[AH]', 'Ratio [A-]/[AH]'), valeur: mesure ? fmt(rapport(MELANGES[u >= 0.45 ? k : k - 1]), 2) : '...' },
        { label: 'pH', valeur: mesure ? fmt(affichage, 2) : '...' },
      ];
      if (a4 > 0.6) mesures.push({ label: L('pKa mesuré', 'Measured pKa'), valeur: fmt(reg.ordonnee, 2) }, { label: L('Pente', 'Gradient'), valeur: fmt(reg.pente, 2) });
      return mesures;
    };
  },
});
