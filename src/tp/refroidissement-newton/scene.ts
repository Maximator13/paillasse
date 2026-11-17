import { avancement, clamp, ease, el, fmt, lerp, mix, remap, seg, set, show, texte, uid } from '../../lib/anim';
import { becher, etiquette, fleche, paillasse, thermometre } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { C_EAU, courbe, flux, temperature, tempsCaracteristique, type Systeme } from './model';

const M = 0.1; // kg, masse d'eau
const S = 1.2e-2; // m², paroi mouillée, fond et surface libre de 100 mL dans un bécher de 150 mL
const DUREE = 90; // min, durée du suivi
const ACCELERATION = 400; // 90 min montrées en 13,5 s
const NIVEAU = 0.66;
const X0 = 170, X1 = 330, Y_FOND = 432; // parois et fond du bécher
const XA = 68, XE = 296, XC = XE - 16; // thermomètre d'ambiance, thermomètre plongé dans l'eau, cotes de l'écart
const verre = { fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
/** Ordonnée d'une température, commune aux deux thermomètres : 2,2 px par degré. */
const yT = (temp: number) => 307 - 2.2 * temp;
/** Remplissage d'un thermomètre du kit (base y, hauteur h) pour que sa colonne affleure yT(temp). */
const remplissage = (y: number, h: number, temp: number) => (y - 18 - yT(temp)) / (h - 26);
/** Couleur de l'eau : bleu à la température de la salle, corail quand elle est très chaude. */
const teinte = (temp: number) => mix(C.bleu, C.corail, (temp - 15) / 65);

export default definirScene({
  etapes: [
    { titre: 'Verser l\'eau chaude', duree: 6, texte: 'On verse <strong>100 g d\'eau chaude</strong> dans un bécher posé sur du liège. L\'air de la salle, à la température <strong>T<sub>ext</sub></strong>, joue le rôle de thermostat : l\'eau lui cède aussitôt de l\'énergie.' },
    { titre: 'Plonger le thermomètre', duree: 5, texte: 'Le thermomètre, d\'abord à la température de la salle, plonge dans l\'eau : sa colonne grimpe jusqu\'à <strong>T<sub>0</sub></strong>. On déclenche le chronomètre, c\'est l\'instant <strong>t = 0</strong>.' },
    { titre: 'Laisser refroidir', duree: (DUREE * 60) / ACCELERATION, texte: 'Le temps est <strong>accéléré 400 fois</strong>. La température chute vite, puis de plus en plus lentement : le flux thermique <strong>Φ = h·S·(T<sub>ext</sub> − T)</strong> faiblit à mesure que l\'écart avec l\'air se réduit.' },
    { titre: 'Mesurer le temps caractéristique', duree: 8, texte: 'La tangente à l\'origine coupe l\'asymptote <strong>T = T<sub>ext</sub></strong> à la date <strong>τ</strong>. On remonte le temps jusqu\'à cet instant : l\'écart de température a déjà diminué de <strong>63 %</strong>.' },
    { titre: 'Modéliser par une exponentielle', duree: 6, texte: 'Le premier principe donne <strong>m·c·dT/dt = h·S·(T<sub>ext</sub> − T)</strong>, de solution exponentielle avec <strong>τ = m·c/(h·S)</strong>. Modifiez la température de l\'air, celle de l\'eau ou le coefficient d\'échange.' },
  ],
  parametres: [
    { id: 'tExt', label: 'Température de l\'air', min: 10, max: 30, pas: 1, valeur: 20, unite: '°C' },
    { id: 't0', label: 'Température initiale de l\'eau', min: 50, max: 90, pas: 1, valeur: 80, unite: '°C' },
    { id: 'h', label: 'Coefficient d\'échange h', min: 10, max: 40, pas: 1, valeur: 20, unite: 'W/(m²·K)' },
  ],
  graphique: {
    x: { label: 't (min)', min: 0, max: DUREE, pas: 15 },
    y: { label: 'T (°C)', min: 0, max: 100, pas: 20 },
  },
  affiche: { etape: 2, t: 0.38 },

  monter({ scene, graphique }) {
    const defs = el('defs', {}, scene);
    const idHalo = uid('halo'), idSol = uid('sol'), idVolute = uid('volute'), idReserve = uid('reserve');

    // Halo de chaleur derrière le bécher, coupé au ras de la paillasse.
    const degHalo = el('radialGradient', { id: idHalo }, defs);
    for (const [offset, opacite] of [[0, 0.5], [0.55, 0.18], [1, 0]]) el('stop', { offset, 'stop-color': C.orange, 'stop-opacity': opacite }, degHalo);
    el('rect', { width: 640, height: 440 }, el('clipPath', { id: idSol }, defs));
    const halo = el('ellipse', { cx: 250, cy: 392, fill: `url(#${idHalo})` }, el('g', { 'clip-path': `url(#${idSol})` }, scene));

    paillasse(scene);
    el('rect', { x: X0 - 14, y: Y_FOND, width: X1 - X0 + 28, height: 8, rx: 3, fill: mix(C.orange, C.panneau, 0.55) }, scene);

    // Thermomètre d'ambiance : le thermostat. Sa graduation sert d'échelle aux deux thermomètres.
    el('rect', { x: 20, y: 60, width: 64, height: 290, rx: 10, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, scene);
    for (let d = 0; d <= 100; d += 10) {
      el('line', { x1: d % 20 ? 56 : 53, x2: 60, y1: yT(d), y2: yT(d), stroke: C.discret, 'stroke-width': 1.4, 'stroke-linecap': 'round' }, scene);
      if (d % 20 === 0) texte(scene, 49, yT(d) + 4.5, String(d), { fill: C.discret, 'font-family': MONO, 'font-size': 13, 'text-anchor': 'end' });
    }
    const thAir = thermometre(scene, { x: XA, y: 337, h: 263, couleur: C.cyan });
    etiquette(scene, { x: 20, y: 48, texte: 'Air ambiant', taille: 13, couleur: C.discret });
    // Niveau de l'air, prolongé jusqu'au thermomètre plongé dans l'eau : l'asymptote de la courbe.
    const niveauAir = el('line', { x1: 76, stroke: C.cyan, 'stroke-width': 1.5, 'stroke-dasharray': '5 5' }, scene);
    const etiqAir = etiquette(scene, { x: 92, y: 0, texte: '', taille: 13, mono: true, couleur: C.cyan });

    // Courant d'air (h élevé) et manchon de liège (h faible).
    const vent = [0, 1, 2].map((i) => el('line', { y1: 314 + 14 * i, y2: 314 + 14 * i, stroke: C.verre, 'stroke-width': 2, 'stroke-linecap': 'round' }, scene));
    const manchons = [-1, 1].map((cote) => ({ cote, n: el('rect', { y: 308, height: 122, rx: 4, fill: mix(C.orange, C.panneau, 0.4) }, scene) }));

    const bec = becher(scene, { x: 250, y: Y_FOND, w: X1 - X0, h: 132 });

    // Volutes d'air chaud au-dessus de la surface libre.
    const degVolute = el('linearGradient', { id: idVolute, gradientUnits: 'userSpaceOnUse', x1: 0, x2: 0, y1: 354, y2: 240 }, defs);
    el('stop', { offset: 0, 'stop-color': C.orange, 'stop-opacity': 0.95 }, degVolute);
    el('stop', { offset: 1, 'stop-color': C.orange, 'stop-opacity': 0 }, degVolute);
    const volutes = [200, 226, 252].map((x) => ({ x, n: el('path', { fill: 'none', stroke: `url(#${idVolute})`, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, scene) }));

    // Thermomètre plongé dans l'eau (étape 2), gradué comme celui de la salle.
    const gEau = el('g', {}, scene);
    const thEau = thermometre(gEau, { x: XE, y: 426, h: 352 });
    for (let d = 0; d <= 100; d += 10) el('line', { x1: XE + 6, x2: XE + (d % 50 ? 10 : 13), y1: yT(d), y2: yT(d), stroke: C.verre, 'stroke-width': 1.2, opacity: 0.55 }, gEau);
    const etiqEau = etiquette(scene, { x: XE + 19, y: 0, texte: '', taille: 14, mono: true });
    // Repère de T0 et cotes : écart restant avec l'air, écart déjà parcouru.
    const gT0 = el('g', {}, scene);
    const traitT0 = el('line', { x1: XE - 11, x2: XE - 6, stroke: C.discret, 'stroke-width': 2, 'stroke-linecap': 'round' }, gT0);
    const etiqT0 = etiquette(gT0, { x: XC - 9, y: 0, texte: 'T0', ancre: 'end', taille: 13, mono: true, couleur: C.discret });
    const cote = (couleur: string) => {
      const n = el('path', { fill: 'none', stroke: couleur, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, scene);
      const nom = etiquette(scene, { x: XC - 9, y: 0, texte: '', ancre: 'end', taille: 13, mono: true, couleur });
      return { n, nom, maj(ya: number, yb: number, opacite: number, contenu: string, c = couleur) {
        set(n, { d: `M${XC - 5} ${ya}H${XC + 5}M${XC} ${ya}V${yb}M${XC - 5} ${yb}H${XC + 5}`, stroke: c, opacity: Math.abs(ya - yb) > 2 ? opacite : 0 });
        set(nom, { y: (ya + yb) / 2 + 4.5, fill: c, opacity: opacite * clamp((Math.abs(ya - yb) - 15) / 8) });
        nom.textContent = contenu;
      } };
    };
    const coteEcart = cote(C.orange), coteParcouru = cote(C.jaune);

    // Bouilloire (étape 1), dessinée bec verseur à l'origine pour basculer autour de lui. L'eau y reste horizontale.
    const filet = el('line', { x1: 260, x2: 260, stroke: C.corail, 'stroke-width': 5, 'stroke-linecap': 'round' }, scene);
    const bouilloire = el('g', {}, scene);
    el('rect', { x: 36, y: 0, width: 84, height: 72, rx: 13 }, el('clipPath', { id: idReserve }, defs));
    const reserve = el('rect', { x: -80, width: 320, height: 200, opacity: 0.82 }, el('g', { 'clip-path': `url(#${idReserve})` }, bouilloire));
    el('path', { d: 'M34 36L5 3Q1 -2 8 -3L34 10', ...verre }, bouilloire);
    el('rect', { x: 32, y: -4, width: 92, height: 80, rx: 16, ...verre }, bouilloire);
    el('rect', { x: 54, y: -12, width: 48, height: 8, rx: 4, fill: C.metal }, bouilloire);
    el('circle', { cx: 78, cy: -16, r: 5, fill: C.metal }, bouilloire);
    el('path', { d: 'M124 10C160 10 160 62 124 62', fill: 'none', stroke: C.metal, 'stroke-width': 6, 'stroke-linecap': 'round' }, bouilloire);
    el('rect', { x: 38, y: 76, width: 80, height: 5, rx: 2.5, fill: C.metal }, bouilloire);

    // Chronomètre et indication du temps accéléré.
    const chrono = el('g', {}, scene);
    el('rect', { x: -4, y: -38, width: 8, height: 11, rx: 2, fill: C.metal }, chrono);
    el('rect', { x: -3, y: -36, width: 6, height: 9, rx: 2, fill: C.metal, transform: 'rotate(40)' }, chrono);
    el('circle', { r: 28, fill: C.panneau, stroke: C.verre, 'stroke-width': TRAIT }, chrono);
    for (let i = 0; i < 12; i++) el('line', { x1: 0, x2: 0, y1: i % 3 ? -22 : -19, y2: -24, stroke: C.discret, 'stroke-width': 1.5, 'stroke-linecap': 'round', transform: `rotate(${30 * i})` }, chrono);
    const aiguille = el('line', { x1: 0, x2: 0, y1: 5, y2: -19, stroke: C.orange, 'stroke-width': 3, 'stroke-linecap': 'round' }, chrono);
    el('circle', { r: 3.5, fill: C.verre }, chrono);
    const lecture = etiquette(chrono, { x: 0, y: 50, texte: '', ancre: 'middle', taille: 14, mono: true });
    const accel = el('g', {}, scene);
    const pastille = el('rect', { x: 514, y: 258, width: 96, height: 28, rx: 14, fill: C.panneau, 'stroke-width': 1.5 }, accel);
    const sens = el('g', {}, accel);
    const avance = [0, 11].map((dx) => el('polygon', { points: `${529 + dx},265.5 ${540 + dx},272 ${529 + dx},278.5` }, sens));
    const etiqAccel = texte(accel, 558, 277, '', { 'font-family': MONO, 'font-size': 14, 'font-weight': 600 });

    // Flux thermique à travers la paroi : trois flèches par côté.
    const fleches = [-1, 1].flatMap((cote) => [378, 398, 418].map((y) => {
      const g = el('g', {}, scene);
      return { cote, y, g, f: fleche(g, { x1: 0, y1: y, x2: 0, y2: y }) };
    }));
    const etiqFlux = etiquette(scene, { x: X1 + 12, y: 359, texte: '', taille: 13, mono: true, couleur: C.corail });
    const etiqSysteme = etiquette(scene, { x: 250, y: 463, texte: '', ancre: 'middle', taille: 13, couleur: C.discret });

    // Encart de résultat (étapes 4 et 5).
    const encart = el('g', {}, scene);
    const cadre = el('rect', { x: 346, y: 24, width: 278, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (parent: Element, y: number, taille: number, couleur: string, contenu = '', police = MONO) =>
      texte(parent, 362, y, contenu, { fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 });
    ligne(encart, 48, 13, C.discret, 'Temps caractéristique', POLICE);
    const lTau = ligne(encart, 75, 19, C.jaune);
    const l63 = ligne(encart, 98, 13, C.texte, 'à t = τ, l\'écart a diminué de 63 %', POLICE);
    const modele = el('g', {}, encart);
    ligne(modele, 126, 13, C.texte, 'T = Text + (T0 − Text)·exp(−t/τ)');
    const lFormule = ligne(modele, 148, 13, C.cyan);

    let cle = '', pts: [number, number][] = [];

    return ({ etape, t, T, p }) => {
      const sys: Systeme = { m: M, c: C_EAU, h: p.h, s: S, tExt: p.tExt, t0: p.t0 };
      const tau = tempsCaracteristique(sys), tauMin = tau / 60;
      if (cle !== `${p.tExt}|${p.t0}|${p.h}`) {
        cle = `${p.tExt}|${p.t0}|${p.h}`;
        pts = courbe(sys, DUREE * 60, 180).map(([x, y]) => [x / 60, y]); // un point toutes les 30 s, en minutes
      }
      const img = { etape, t };
      const [a1, a2, a3, a4, a5] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));

      // Date simulée (s) : le suivi défile à l'étape 3, puis on remonte jusqu'à t = tau à l'étape 4.
      const retour = seg(a4, 0.5, 0.82);
      const date = lerp(DUREE * 60 * a3, tau, retour);
      const temp = temperature(date, sys);
      const cede = -flux(temp, sys); // W, puissance cédée à l'air
      const remonte = retour > 0 && retour < 1, defile = (a3 > 0 && a3 < 1) || remonte;

      // Thermostat, courant d'air et isolation.
      const yAir = yT(p.tExt);
      thAir.temperature(remplissage(337, 263, p.tExt));
      set(niveauAir, { y1: yAir, y2: yAir, x2: lerp(188, XE + 16, seg(a2, 0.05, 0.35)) });
      etiqAir.setAttribute('y', String(yAir - 7));
      etiqAir.textContent = `Text = ${fmt(p.tExt, 0)} °C`;
      const isolant = remap(p.h, 20, 10, 0, 12), souffle = remap(p.h, 22, 40, 0, 1);
      for (const { cote, n } of manchons) set(n, { x: cote < 0 ? X0 - 3 - isolant : X1 + 3, width: isolant });
      vent.forEach((n, i) => {
        const ph = (T * 0.8 + i / 3) % 1, x = 90 + 48 * ph;
        set(n, { x1: x, x2: x + 22, opacity: 0.75 * souffle * Math.sin(Math.PI * ph) });
      });

      // Étape 1 : la bouilloire entre, bascule, remplit le bécher, se redresse et repart.
      const entree = seg(a1, 0.02, 0.2, ease.out), sortie = seg(a1, 0.8, 0.96, ease.in);
      const bascule = seg(a1, 0.18, 0.3) - seg(a1, 0.68, 0.8);
      const verse = seg(a1, 0.3, 0.7);
      const niveau = NIVEAU * verse, ySurf = bec.ySurface(niveau);
      bouilloire.style.transform = `translate(262px,${212 - 340 * (1 - entree) - 340 * sortie}px) rotate(${-28 * bascule}deg)`;
      set(reserve, { y: 36 + lerp(-16, 12, verse), fill: teinte(p.t0), transform: `rotate(${28 * bascule} 78 36)` });
      const tete = seg(a1, 0.27, 0.31, ease.in), queue = seg(a1, 0.68, 0.72, ease.in);
      set(filet, { y1: lerp(214, ySurf, queue), y2: lerp(214, ySurf, tete), stroke: teinte(p.t0), opacity: tete > 0 && queue < 1 ? 0.9 : 0 });
      bec.liquide(niveau, teinte(temp));
      show(etiqSysteme, seg(a1, 0.84, 1));
      etiqSysteme.textContent = `m = 100 g · S = 120 cm² · h = ${fmt(p.h, 0)} W/(m²·K)${p.h < 18 ? ' (isolé)' : p.h > 24 ? ' (ventilé)' : ''}`;

      // Le phénomène : halo, flux à travers la paroi et volutes d'air chaud, proportionnés à la puissance cédée.
      const chaud = seg(a1, 0.5, 0.86), force = Math.sqrt(cede);
      const couleurFlux = mix(C.jaune, C.corail, cede / 14);
      const souffleHalo = 1 + 0.03 * Math.sin(T * 2.2);
      set(halo, { rx: (100 + 16 * force) * souffleHalo, ry: (78 + 12 * force) * souffleHalo, opacity: chaud * clamp(0.2 * force) });
      fleches.forEach(({ cote, y, g, f }, i) => {
        const ph = (T * 0.5 + i * 0.37) % 1;
        const x = (cote < 0 ? X0 : X1) + cote * (9 + isolant + 14 * ph);
        f.maj(x, y, x + cote * 12 * force * chaud, y, couleurFlux, 2.5 + 0.45 * force);
        g.style.opacity = String(chaud * Math.min(1, 2.5 * Math.sin(Math.PI * ph)));
      });
      etiqFlux.textContent = `|Φ| = ${fmt(cede, 1)} W`;
      etiqFlux.setAttribute('x', String(X1 + 12 + isolant)); // à droite du manchon de liège quand il est présent
      etiqFlux.style.opacity = String(chaud);
      const ecart = clamp((temp - p.tExt) / 70), haut = 22 + 92 * ecart;
      set(degVolute, { y1: ySurf, y2: ySurf - haut });
      volutes.forEach(({ x, n }, i) => {
        let d = '';
        for (let j = 0; j <= 18; j++) {
          const u = j / 18;
          const dx = 7 * Math.sin(u * 6 - T * 2.4 + i * 2.1) * (0.25 + 0.75 * u) + 14 * souffle * u * u;
          d += `${j ? 'L' : 'M'}${(x + dx).toFixed(1)} ${(ySurf - 3 - haut * u).toFixed(1)}`;
        }
        set(n, { d, opacity: chaud * (0.25 + 0.75 * ecart) });
      });

      // Étape 2 : le thermomètre plonge, sa colonne grimpe de Text à T0, l'écart s'ouvre, le chronomètre apparaît.
      gEau.style.transform = `translateY(${-440 * (1 - seg(a2, 0, 0.35, ease.out))}px)`;
      const lue = a2 < 1 ? lerp(p.tExt, p.t0, seg(a2, 0.38, 0.75, ease.out)) : temp;
      const yEau = yT(lue), lu = a2 > 0.38;
      thEau.temperature(remplissage(426, 352, lue));
      etiqEau.setAttribute('y', String(yEau + 5));
      etiqEau.textContent = `${fmt(lue, 1)} °C`;
      etiqEau.style.opacity = String(seg(a2, 0.35, 0.42));
      const y0 = yT(p.t0);
      set(traitT0, { y1: y0, y2: y0 });
      etiqT0.setAttribute('y', String(y0 + 4.5));
      gT0.style.opacity = String(seg(a2, 0.75, 0.9));
      const pop = seg(a2, 0.72, 0.92, ease.backOut);
      chrono.style.transform = `translate(562px,342px) scale(${1.2 * pop})`;
      chrono.style.opacity = String(clamp(pop * 3));
      aiguille.setAttribute('transform', `rotate(${(date / 60 / 15) * 360})`);
      lecture.textContent = `t = ${fmt(date / 60, 1)} min`;

      // Étape 3 : le temps défile, accéléré. À l'étape 4, on le remonte.
      show(accel, seg(a3, 0, 0.04), 6);
      const actif = defile ? C.jaune : C.discret;
      pastille.setAttribute('stroke', defile ? C.jaune : C.grille);
      sens.setAttribute('transform', remonte ? 'translate(1080 0) scale(-1 1)' : '');
      avance.forEach((n, i) => set(n, { fill: actif, opacity: defile ? 0.55 + 0.45 * Math.sin(T * 7 - i * 1.2) : 1 }));
      etiqAccel.setAttribute('fill', actif);
      etiqAccel.textContent = remonte ? 't = τ' : `×${ACCELERATION}`;

      // Étapes 4 et 5 : temps caractéristique, part de l'écart déjà parcourue, puis modèle.
      const part = seg(a4, 0.84, 0.96);
      coteEcart.maj(yAir, yEau, lu ? 1 : 0, part > 0.5 ? '37 %' : 'écart', couleurFlux);
      coteParcouru.maj(yEau, y0, part, '63 %');
      show(encart, seg(a4, 0.36, 0.5, ease.backOut), 16);
      cadre.setAttribute('height', String(lerp(88, 140, seg(a5, 0.04, 0.24))));
      lTau.textContent = `τ = ${fmt(tauMin, 1)} min`;
      l63.style.opacity = String(part);
      show(modele, seg(a5, 0.14, 0.34));
      lFormule.textContent = `τ = m·c/(h·S) = ${fmt(tau, 0)} s`;

      if (graphique) {
        const releve = a2 > 0.85;
        const tTrace = DUREE * a3;
        graphique.courbe('modele', a5 > 0 ? pts.filter(([x]) => x <= DUREE * seg(a5, 0.14, 0.7)) : [], { couleur: C.jaune, epaisseur: 2.5 });
        // Un relevé toutes les 2 min 30, de la couleur de l'eau à cet instant.
        for (let i = 0; i * 5 < pts.length; i++) {
          const pt = pts[i * 5];
          graphique.nuage(`releve${i}`, releve && pt[0] <= tTrace + 1e-9 ? [pt] : [], { couleur: teinte(pt[1]), rayon: 3 });
        }
        // L'écart avec l'air, de la couleur des flèches de flux.
        graphique.courbe('ecart', releve ? [[date / 60, p.tExt], [date / 60, temp]] : [], { couleur: couleurFlux, epaisseur: 3 });
        if (a2 > 0.6) {
          graphique.horizontale('ext', p.tExt, { couleur: C.cyan });
          // Étiquette de l'asymptote placée sous la droite (ligne invisible décalée) pour ne pas masquer les derniers points.
          graphique.horizontale('extNom', p.tExt - 8, { couleur: C.cyan, epaisseur: 0, label: `Text = ${fmt(p.tExt, 0)} °C` });
          graphique.opacite('ext', seg(a2, 0.6, 0.8));
          graphique.opacite('extNom', seg(a2, 0.6, 0.8));
        } else {
          graphique.effacer('ext');
          graphique.effacer('extNom');
        }
        const k = seg(a4, 0.05, 0.36);
        graphique.courbe('tangente', a4 > 0 ? [[0, p.t0], [tauMin * k, lerp(p.t0, p.tExt, k)]] : [], { couleur: C.rose, epaisseur: 2, pointille: true });
        graphique.courbe('lecture', part > 0 ? [[0, temp], [tauMin * part, temp]] : [], { couleur: C.jaune, epaisseur: 1.5, pointille: true });
        if (a4 > 0.34) {
          graphique.verticale('tau', tauMin, { couleur: C.jaune, label: `τ = ${fmt(tauMin, 1)} min` });
          graphique.opacite('tau', seg(a4, 0.34, 0.48));
        } else graphique.effacer('tau');
        if (releve) graphique.repere('point', date / 60, temp, part > 0 ? { couleur: C.jaune, label: `${fmt(temp, 1)} °C` } : { couleur: C.blanc, rayon: 4 });
        else graphique.effacer('point');
      }

      const mesures = [
        { label: 'Temps écoulé', valeur: `${fmt(date / 60, 1)} min` },
        { label: 'Température de l\'eau', valeur: lu ? `${fmt(lue, 1)} °C` : '...' },
        { label: 'Flux cédé à l\'air', valeur: `${fmt(cede * chaud, 1)} W` },
      ];
      if (a4 > 0.34) mesures.push({ label: 'Temps caractéristique', valeur: `${fmt(tauMin, 1)} min` });
      return mesures;
    };
  },
});
