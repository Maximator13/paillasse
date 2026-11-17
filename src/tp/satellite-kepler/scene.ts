import { L, avancement, clamp, ease, el, fmt, lerp, rng, seg, set, show, uid } from '../../lib/anim';
import { etiquette, fleche } from '../../lib/labkit';
import { C, MONO, POLICE } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { JOUR_SIDERAL, M_TERRE, R_TERRE, anomalieExcentrique, champ, masseDepuisPente, pente, periode, pointEllipse, vitesseEllipse } from './model';

// Repère : la Terre au foyer (CX, CY), échelle K en pixels par mètre.
const CX = 232, CY = 240;
const R_MAX = R_TERRE + 36000e3; // plus grande orbite affichée (m)
const K = 190 / R_MAX;
const RT = R_TERRE * K;
const S = JOUR_SIDERAL / 24; // secondes réelles par seconde d'animation (étapes 4 et 5)
const COL = 444; // bord gauche de la colonne de légende
const PI = Math.PI;

const SATS = [
  { nom: 'ISS', r: 6.78e6, couleur: C.rose, phase: 0.6 },
  { nom: 'GPS', r: 26.56e6, couleur: C.orange, phase: 2.4 },
  { nom: 'Galileo', r: 29.6e6, couleur: C.violet, phase: 4.1 },
  { nom: L('Météosat', 'Meteosat'), r: 42.164e6, couleur: C.jaune, phase: 5.3 },
];

const EXP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** Écriture scientifique : 5,97 × 10²⁴. */
const sci = (v: number, d = 2) => {
  const e = Math.floor(Math.log10(v));
  return `${fmt(v / 10 ** e, d)} × 10${String(e).replace('-', '⁻').replace(/\d/g, (c) => EXP[+c])}`;
};

export default definirScene({
  etapes: [
    { titre: L('Mettre le satellite en orbite', 'Put the satellite into orbit'), duree: 7, texte: L('Le satellite est lancé jusqu\'à son orbite circulaire de rayon <strong>r</strong>. Il n\'est soumis qu\'à la <strong>force de gravitation</strong>, dirigée vers le centre de la Terre, alors que sa vitesse est <strong>tangente</strong> à la trajectoire.', 'The satellite is launched up to its circular orbit of radius <strong>r</strong>. It is subject only to the <strong>gravitational force</strong>, directed towards the centre of the Earth, while its velocity is <strong>tangent</strong> to the path.') },
    { titre: L('Chronométrer un tour', 'Time one revolution'), duree: 10, texte: L('Le mouvement est <strong>circulaire uniforme</strong> : la force, centripète, change la direction de la vitesse sans changer sa valeur. On mesure la <strong>période T</strong> et on place le point (r³ ; T²) sur le graphique.', 'The motion is <strong>uniform circular motion</strong>: the centripetal force changes the direction of the velocity without changing its value. We measure the <strong>period T</strong> and plot the point (r³, T²) on the graph.') },
    { titre: L('Loi des aires sur une ellipse', 'Law of equal areas on an ellipse'), duree: 12, texte: L('L\'orbite devient elliptique, la Terre en occupe un <strong>foyer</strong>. Le satellite est le plus rapide au périgée et le plus lent à l\'apogée : le rayon Terre-satellite balaie des <strong>aires égales en des durées égales</strong>.', 'The orbit becomes elliptical, with the Earth at one <strong>focus</strong>. The satellite is fastest at perigee and slowest at apogee: the Earth-satellite radius sweeps out <strong>equal areas in equal times</strong>.') },
    { titre: L('Comparer plusieurs satellites', 'Compare several satellites'), duree: 12, texte: L('Quatre satellites réels rejoignent la scène. Plus l\'orbite est haute, plus la vitesse est faible et la période longue. Chaque satellite donne un point <strong>(r³ ; T²)</strong>.', 'Four real satellites join the scene. The higher the orbit, the lower the speed and the longer the period. Each satellite gives one point <strong>(r³, T²)</strong>.') },
    { titre: L('Peser la Terre', 'Weigh the Earth'), duree: 8, texte: L('Les points sont alignés : <strong>T² = k·r³</strong> avec k = 4π²/(G·M). La pente donne la <strong>masse de l\'astre</strong>. Changez l\'altitude, l\'excentricité ou la masse et observez la droite.', 'The points lie on a straight line: <strong>T² = k·r³</strong> with k = 4π²/(G·M). The gradient gives the <strong>mass of the central body</strong>. Change the altitude, the eccentricity or the mass and watch the line.') },
  ],
  parametres: [
    { id: 'h', label: L('Altitude du satellite', 'Satellite altitude'), min: 3000, max: 36000, pas: 500, valeur: 30000, unite: 'km', decimales: 0 },
    { id: 'e', label: L('Excentricité de l\'ellipse', 'Eccentricity of the ellipse'), min: 0.1, max: 0.6, pas: 0.05, valeur: 0.5, decimales: 2 },
    { id: 'm', label: L('Masse de l\'astre', 'Mass of the body'), min: 0.5, max: 2, pas: 0.1, valeur: 1, unite: L('× Terre', '× Earth'), decimales: 1 },
  ],
  graphique: {
    x: { label: 'r³ (10²² m³)', min: 0, max: 8, pas: 2 },
    y: { label: 'T² (10⁹ s²)', min: 0, max: 16, pas: 4 },
  },
  affiche: { etape: 4, t: 0.9 },

  monter({ scene, graphique }) {
    // Ciel étoilé.
    const alea = rng(11);
    const etoiles = Array.from({ length: 70 }, () =>
      el('circle', { cx: alea() * 640, cy: alea() * 480, r: 0.5 + alea() * 1.1, fill: C.verre, opacity: 0.25 + alea() * 0.45 }, scene));

    // Secteurs balayés (sous la Terre, qui en masque la pointe).
    const secteur = (couleur: string) =>
      el('path', { fill: couleur, 'fill-opacity': 0.45, stroke: couleur, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, scene);
    const secA = secteur(C.rose), secP = secteur(C.jaune);

    // Orbites.
    const refs = SATS.map((s) => ({
      ...s,
      orbite: el('circle', { cx: CX, cy: CY, r: s.r * K, fill: 'none', stroke: s.couleur, 'stroke-width': 1.5, 'stroke-dasharray': '2 6', 'stroke-linecap': 'round' }, scene),
    }));
    const orbite = el('ellipse', { cy: CY, fill: 'none', stroke: C.cyan, 'stroke-width': 1.5, 'stroke-dasharray': '6 6', opacity: 0 }, scene);
    const sillage = el('polyline', { fill: 'none', stroke: C.cyan, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, scene);

    // Terre : dégradé, continents qui défilent, halo d'atmosphère.
    const idG = uid('terre'), idC = uid('disque');
    const defs = el('defs', {}, scene);
    const grad = el('radialGradient', { id: idG, cx: '35%', cy: '32%', r: '75%' }, defs);
    el('stop', { offset: 0, 'stop-color': C.cyan }, grad);
    el('stop', { offset: 0.55, 'stop-color': C.bleu }, grad);
    el('stop', { offset: 1, 'stop-color': C.panneau }, grad);
    el('circle', { cx: CX, cy: CY, r: RT }, el('clipPath', { id: idC }, defs));
    el('circle', { cx: CX, cy: CY, r: RT + 6, fill: C.cyan, opacity: 0.14 }, scene);
    el('circle', { cx: CX, cy: CY, r: RT, fill: `url(#${idG})` }, scene);
    const terres = el('g', { 'clip-path': `url(#${idC})` }, scene);
    const continents = [[0, -10, 11, 7], [38, 6, 9, 11], [74, -4, 13, 6], [20, 16, 7, 5]].map(([x, y, rx, ry]) =>
      ({ x, n: el('ellipse', { cy: CY + y, rx, ry, fill: C.menthe, opacity: 0.85 }, terres) }));
    el('circle', { cx: CX, cy: CY, r: RT, fill: 'none', stroke: C.verre, 'stroke-width': 1.5 }, scene);

    const points = refs.map((s) => el('circle', { r: 4.5, fill: s.couleur, stroke: C.fond, 'stroke-width': 1.5 }, scene));

    // Vecteurs et satellite de l'élève.
    const vF = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.corail });
    const vV = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.menthe });
    const nomF = etiquette(scene, { x: 0, y: 0, texte: 'F', ancre: 'middle', taille: 15, couleur: C.corail });
    const nomV = etiquette(scene, { x: 0, y: 0, texte: 'v', ancre: 'middle', taille: 15, couleur: C.menthe });
    const sat = el('g', {}, scene);
    el('circle', { r: 10, fill: C.cyan, opacity: 0.22 }, sat);
    el('path', { d: 'M-14 -3.5H-6V3.5H-14ZM6 -3.5H14V3.5H6Z', fill: C.bleu, stroke: C.verre, 'stroke-width': 1 }, sat);
    el('rect', { x: -5.5, y: -5.5, width: 11, height: 11, rx: 2.5, fill: C.cyan, stroke: C.verre, 'stroke-width': 1.5 }, sat);

    // Colonne de légende, à droite.
    const legF = el('g', {}, scene), legV = el('g', {}, scene);
    fleche(legF, { x1: COL, y1: 30, x2: COL + 24, y2: 30, couleur: C.corail });
    etiquette(legF, { x: COL + 34, y: 35, texte: L('Force de gravitation', 'Gravitational force'), taille: 13 });
    fleche(legV, { x1: COL, y1: 54, x2: COL + 24, y2: 54, couleur: C.menthe });
    etiquette(legV, { x: COL + 34, y: 59, texte: L('Vitesse (tangente)', 'Velocity (tangent)'), taille: 13 });

    const chrono = el('g', {}, scene);
    el('circle', { cx: COL + 6, cy: 91, r: 5, fill: C.cyan }, chrono);
    const txtChrono = etiquette(chrono, { x: COL + 20, y: 96, texte: '', mono: true, taille: 15, couleur: C.cyan });

    const legAires = el('g', {}, scene);
    el('rect', { x: COL, y: 121, width: 12, height: 12, rx: 3, fill: C.rose }, legAires);
    el('rect', { x: COL + 16, y: 121, width: 12, height: 12, rx: 3, fill: C.jaune }, legAires);
    etiquette(legAires, { x: COL + 36, y: 132, texte: L('Aires égales', 'Equal areas'), taille: 14 });
    etiquette(legAires, { x: COL, y: 154, texte: L('balayées en Δt = T/10', 'swept in Δt = T/10'), taille: 13, couleur: C.discret });

    const lignes = refs.map((s, i) => {
      const g = el('g', {}, scene), y = 128 + 22 * i;
      el('circle', { cx: COL + 6, cy: y - 5, r: 5, fill: s.couleur }, g);
      etiquette(g, { x: COL + 20, y, texte: s.nom, taille: 14 });
      return { g, T: etiquette(g, { x: 616, y, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.discret }) };
    });

    const encart = el('g', {}, scene);
    el('rect', { x: COL - 4, y: 232, width: 184, height: 122, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: COL + 10, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(256, 13, C.discret, POLICE).textContent = L('Pente k (s²/m³)', 'Gradient k (s²/m³)');
    const txtK = ligne(278, 15, C.texte);
    ligne(308, 13, C.discret, POLICE).textContent = L('Masse de l\'astre', 'Mass of the body');
    const txtM = ligne(334, 17, C.jaune);

    const X = (x: number) => CX + x * K, Y = (y: number) => CY - y * K;

    return ({ etape, t, T, p }) => {
      const img = { etape, t };
      const [a1, a2, a3, a4, a5] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));
      const M = p.m * M_TERRE;
      const r = R_TERRE + p.h * 1e3;

      // Orbite courante : cercle de rayon r, déformé en ellipse à l'étape 3 puis rendu circulaire.
      const f = seg(a3, 0, 0.12) * (1 - seg(a4, 0, 0.25));
      const a = lerp(r, clamp(r, 9.4e6 / (1 - p.e), R_MAX / (1 + p.e)), f), e = p.e * f;
      const b = a * Math.sqrt(1 - e * e);
      const Tp = periode(a, M);
      set(orbite, { cx: X(-a * e), rx: a * K, ry: b * K, opacity: seg(a1, 0.5, 0.7) });

      // Position : anomalie moyenne pilotée par les étapes, puis par l'horloge d'ambiance.
      const Mm = etape >= 3 ? 1 + (2 * PI * T * S) / Tp : 1.6 * PI * a1 + 2 * PI * a2 + 4 * PI * a3;
      const E = anomalieExcentrique(Mm, e);
      const pt = pointEllipse(E, a, e);
      const lance = seg(a1, 0.1, 0.6);
      const k = lerp(R_TERRE / pt.r, 1, lance);
      const sx = X(pt.x * k), sy = Y(pt.y * k), d = pt.r * k;
      const ux = pt.x / pt.r, uy = pt.y / pt.r; // radial
      let tx = -a * Math.sin(E), ty = b * Math.cos(E); // tangente
      const nt = Math.hypot(tx, ty);
      tx /= nt; ty /= nt;
      // Au début de l'étape 4, le satellite et ses vecteurs s'effacent puis reviennent ensemble (fondu).
      const retour = etape >= 3 ? seg(a4, 0, 0.08) : 1;
      sat.style.opacity = String(seg(a1, 0.03, 0.1) * retour);
      set(sat, { transform: `translate(${sx.toFixed(2)} ${sy.toFixed(2)}) rotate(${(-Math.atan2(ty, tx) * 180 / PI).toFixed(1)})` });

      // Vecteurs force (vers la Terre) et vitesse (tangente).
      const v = vitesseEllipse(pt.r, a, M);
      const oF = seg(a1, 0.62, 0.78, ease.backOut) * retour, oV = seg(a1, 0.78, 0.94, ease.backOut) * retour;
      const LF = Math.min(d * K - 8, 18 + 14 * Math.sqrt(champ(pt.r, M))) * oF;
      const LV = Math.min(80, 7 * v / 1000) * oV;
      vF.maj(sx, sy, sx - ux * LF, sy + uy * LF);
      vV.maj(sx, sy, sx + tx * LV, sy - ty * LV);
      // Noms des vecteurs, au bout de chaque flèche.
      set(nomF, { x: sx - ux * (LF + 11), y: sy + uy * (LF + 11) + 5, opacity: clamp(oF) });
      set(nomV, { x: sx + tx * (LV + 11), y: sy - ty * (LV + 11) + 5, opacity: clamp(oV) });
      show(legF, seg(a1, 0.62, 0.78));
      show(legV, seg(a1, 0.78, 0.94));

      // Étape 2 : sillage d'un tour complet et chronomètre.
      const n = Math.ceil(90 * a2);
      sillage.setAttribute('points', Array.from({ length: n + 1 }, (_, i) => {
        const th = 1.6 * PI + (2 * PI * a2 * i) / Math.max(n, 1);
        return `${X(r * Math.cos(th)).toFixed(1)},${Y(r * Math.sin(th)).toFixed(1)}`;
      }).join(' '));
      sillage.style.opacity = String(a2 > 0 ? 1 - seg(a3, 0, 0.1) : 0);
      show(chrono, seg(a2, 0, 0.06));
      const tour = etape > 1 || a2 >= 1;
      txtChrono.textContent = tour ? `T = ${fmt(Tp / 3600, 2)} h` : `t = ${fmt((a2 * Tp) / 3600, 2)} h`;

      // Étape 3 : deux secteurs balayés pendant la même durée T/10, à l'apogée puis au périgée.
      const u = -0.4 * PI + 4 * PI * a3;
      const chemin = (m0: number, part: number) => {
        if (part <= 0) return 'M0 0';
        let dd = `M${CX} ${CY}`;
        for (let i = 0; i <= 16; i++) {
          const q = pointEllipse(anomalieExcentrique(m0 + (part * 0.2 * PI * i) / 16, e), a, e);
          dd += `L${X(q.x).toFixed(1)} ${Y(q.y).toFixed(1)}`;
        }
        return dd + 'Z';
      };
      secA.setAttribute('d', chemin(0.9 * PI, clamp((u - 0.9 * PI) / (0.2 * PI))));
      secP.setAttribute('d', chemin(1.9 * PI, clamp((u - 1.9 * PI) / (0.2 * PI))));
      const oAires = 1 - seg(a4, 0, 0.15);
      secA.style.opacity = secP.style.opacity = String(oAires);
      show(legAires, seg(a3, 0.64, 0.76) * oAires);

      // Étape 4 : les satellites de référence entrent un à un.
      const entree = refs.map((_, i) => seg(a4, 0.12 + 0.18 * i, 0.3 + 0.18 * i));
      refs.forEach((s, i) => {
        const Ts = periode(s.r, M), th = s.phase + (2 * PI * T * S) / Ts;
        s.orbite.style.opacity = String(0.7 * entree[i]);
        set(points[i], { cx: X(s.r * Math.cos(th)), cy: Y(s.r * Math.sin(th)), opacity: entree[i] });
        show(lignes[i].g, entree[i]);
        lignes[i].T.textContent = `${fmt(Ts / 3600, 2)} h`;
      });

      // Étape 5 : pente et masse.
      const donnees: [number, number][] = [...refs.map((s) => s.r), a].map((x) => [x ** 3, periode(x, M) ** 2]);
      const kS = pente(donnees);
      const masse = masseDepuisPente(kS);
      txtK.textContent = sci(kS);
      txtM.textContent = `${sci(masse)} kg`;
      show(encart, seg(a5, 0.5, 0.75, ease.backOut), 16);

      // Décor vivant.
      etoiles.forEach((s, i) => { if (i % 3 === 0) s.setAttribute('r', String(1 + 0.5 * Math.sin(T * 1.4 + i))); });
      continents.forEach((c) => c.n.setAttribute('cx', String(CX + ((c.x + T * 3) % 100) - 50)));

      if (graphique) {
        const xd = 8 * seg(a5, 0.05, 0.5);
        graphique.courbe('droite', a5 > 0 ? [[0, 0], [xd, kS * 1e13 * xd]] : [], { couleur: C.verre, epaisseur: 2 });
        refs.forEach((s, i) => {
          graphique.nuage(`sat${i}`, entree[i] > 0 ? [[donnees[i][0] / 1e22, donnees[i][1] / 1e9]] : [], { couleur: s.couleur, rayon: 5 });
          graphique.opacite(`sat${i}`, entree[i]);
        });
        if (a2 > 0) graphique.repere('moi', a ** 3 / 1e22, (tour ? Tp : a2 * Tp) ** 2 / 1e9, { couleur: C.cyan, label: tour ? L('votre satellite', 'your satellite') : undefined });
        else graphique.effacer('moi');
      }

      const mesures = [
        { label: L('Distance au centre r', 'Distance from centre r'), valeur: `${fmt(d / 1e3, 0)} km` },
        { label: L('Vitesse v', 'Speed v'), valeur: a1 > 0.6 ? `${fmt(v / 1000, 2)} km/s` : '...' },
        { label: L('Période T', 'Period T'), valeur: tour ? `${fmt(Tp / 3600, 2)} h` : '...' },
      ];
      if (a5 > 0.5) mesures.push({ label: L('Masse de l\'astre', 'Mass of the body'), valeur: `${sci(masse)} kg` });
      return mesures;
    };
  },
});
