import { avancement, clamp, ease, el, fmt, L, lerp, mix, rng, seg, set, show, texte, uid } from '../../lib/anim';
import { agitateur, appareil, barreau, becher, burette, etiquette, gouttes, paillasse, potence } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { conductivite, contributions, deuxDroites, IONS, M_NACL, releve, volumeEquivalent, type Droite, type Ion, type Titrage } from './model';

const V0 = 10; // mL, prise d'essai de sérum physiologique
const C1 = 0.1; // mol/L, nitrate d'argent
const V_MAX = 25; // mL, capacité de la burette
const BECHER = 400; // mL, contenance du bécher
const N = 6; // ions chlorure représentés dans la loupe
const COULEUR: Record<Ion, string> = { Na: C.bleu, Cl: C.menthe, Ag: C.orange, NO3: C.rose };
const NOM: Record<Ion, string> = { Na: 'Na+', Cl: 'Cl-', Ag: 'Ag+', NO3: 'NO3-' };
const SIGNE: Record<Ion, string> = { Na: '+', Cl: '−', Ag: '+', NO3: '−' };
// Loupe : centre et rayon ; point du bécher qu'elle agrandit.
const LX = 512, LY = 160, LR = 100, ZX = 218, ZY = 390;
// Barre de Kohlrausch.
const BX = 408, BW = 212, BY = 296;

export default definirScene({
  etapes: [
    { titre: L('Préparer la solution à titrer', 'Preparing the solution to be titrated'), duree: 6, texte: L('On prélève <strong>V<sub>0</sub> = 10,0 mL</strong> de sérum physiologique, puis on ajoute un grand volume d\'eau distillée : la dilution due à la burette deviendra négligeable.', 'A sample of <strong>V<sub>0</sub> = 10.0 mL</strong> of saline solution is taken, then a large volume of distilled water is added: the dilution caused by the burette becomes negligible.') },
    { titre: L('Installer le montage', 'Setting up the apparatus'), duree: 7, texte: L('La burette contient du nitrate d\'argent à <strong>C<sub>1</sub> = 0,100 mol/L</strong>. La cellule du conductimètre plonge dans la solution, qui ne contient pour l\'instant que des ions <strong>Na<sup>+</sup></strong> et <strong>Cl<sup>−</sup></strong>.', 'The burette contains silver nitrate at <strong>C<sub>1</sub> = 0.100 mol/L</strong>. The conductivity cell dips into the solution, which for now contains only <strong>Na<sup>+</sup></strong> and <strong>Cl<sup>−</sup></strong> ions.') },
    { titre: L('Avant l\'équivalence', 'Before the equivalence point'), duree: 10, texte: L('Chaque ion Ag<sup>+</sup> versé précipite avec un ion Cl<sup>−</sup>. Un ion NO<sub>3</sub><sup>−</sup>, un peu moins conducteur, prend sa place : la conductivité <strong>baisse doucement</strong>.', 'Each Ag<sup>+</sup> ion added precipitates with a Cl<sup>−</sup> ion. An NO<sub>3</sub><sup>−</sup> ion, which conducts slightly less well, takes its place: the conductivity <strong>falls gently</strong>.') },
    { titre: L('Après l\'équivalence', 'After the equivalence point'), duree: 8, texte: L('Il n\'y a plus d\'ions chlorure. Les ions Ag<sup>+</sup> et NO<sub>3</sub><sup>−</sup> versés s\'accumulent : la conductivité <strong>augmente nettement</strong>.', 'There are no chloride ions left. The Ag<sup>+</sup> and NO<sub>3</sub><sup>−</sup> ions added build up: the conductivity <strong>rises markedly</strong>.') },
    { titre: L('Tracer les deux droites', 'Drawing the two straight lines'), duree: 7, texte: L('On modélise chaque série de points par une droite. Leur intersection marque la <strong>rupture de pente</strong> : son abscisse est le volume équivalent <strong>V<sub>E</sub></strong>.', 'Each set of points is modelled by a straight line. Their intersection marks the <strong>change in slope</strong>: its abscissa is the equivalence volume <strong>V<sub>E</sub></strong>.') },
    { titre: L('Calculer la concentration', 'Calculating the concentration'), duree: 5, texte: L('À l\'équivalence, <strong>C<sub>0</sub>·V<sub>0</sub> = C<sub>1</sub>·V<sub>E</sub></strong>. Changez la concentration du sérum, puis réduisez le volume d\'eau : les portions de droite se courbent.', 'At the equivalence point, <strong>C<sub>0</sub>·V<sub>0</sub> = C<sub>1</sub>·V<sub>E</sub></strong>. Change the concentration of the saline solution, then reduce the volume of water: the straight-line portions bend.') },
  ],
  parametres: [
    { id: 'c0', label: L('Concentration en ions chlorure', 'Chloride ion concentration'), min: 0.1, max: 0.2, pas: 0.002, valeur: 0.154, unite: 'mol/L', decimales: 3 },
    { id: 'eau', label: L('Eau distillée ajoutée', 'Distilled water added'), min: 50, max: 250, pas: 10, valeur: 200, unite: 'mL', decimales: 0 },
  ],
  graphique: {
    x: { label: L('V versé (mL)', 'V added (mL)'), min: 0, max: V_MAX, pas: 5 },
    y: { label: 'σ (mS/m)', min: 0, max: 160 },
  },
  affiche: { etape: 3, t: 0.6 },

  monter({ scene, graphique }) {
    paillasse(scene);
    const agit = agitateur(scene, { x: 262, y: 440, w: 160 });
    const bec = becher(scene, { x: 262, y: agit.yPlateau, w: 140, h: 130 });
    const bar = barreau(scene, { x: 262, y: agit.yPlateau - 2 });
    const etiqSerum = etiquette(scene, { x: 256, y: 465, texte: L('Sérum : V0 = 10,0 mL', 'Saline: V0 = 10.0 mL'), ancre: 'end', mono: true, taille: 13, couleur: C.cyan });
    const etiqEau = etiquette(scene, { x: 268, y: 465, texte: '', mono: true, taille: 13, couleur: C.discret });

    // Pipette jaugée (étape 1).
    const pip = el('g', {}, scene);
    el('path', { d: 'M259 20V110M265 20V110M259 170V252L262 262L265 252V170', fill: 'none', stroke: C.verre, 'stroke-width': 2, 'stroke-linecap': 'round' }, pip);
    const ventre = el('ellipse', { cx: 262, cy: 140, rx: 13, ry: 32, fill: C.cyan, 'fill-opacity': 0.8, stroke: C.verre, 'stroke-width': 2 }, pip);
    const filet = el('line', { x1: 262, x2: 262, y1: 262, y2: 398, stroke: C.cyan, 'stroke-width': 3, 'stroke-linecap': 'round' }, scene);

    // Pissette d'eau distillée (étape 1).
    const pis = el('g', {}, scene);
    el('rect', { x: 352, y: 200, width: 46, height: 30, fill: C.bleu, opacity: 0.45 }, pis);
    el('rect', { x: 352, y: 176, width: 46, height: 84, rx: 10, fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT }, pis);
    el('rect', { x: 363, y: 165, width: 24, height: 12, rx: 3, fill: C.bleu }, pis);
    el('path', { d: 'M375 165V150Q375 140 365 142L318 160', fill: 'none', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, pis);
    const jet = el('path', { fill: 'none', stroke: C.bleu, 'stroke-width': 3, 'stroke-linecap': 'round' }, scene);

    // Montage de titrage (étape 2).
    const montage = el('g', {}, scene);
    potence(montage, { x: 78, y: 440, h: 420, pinces: [{ y: 62, vers: 262 }, { y: 150, vers: 262 }] });
    const bur = burette(montage, { x: 262, yHaut: 30, h: 150 });
    etiquette(montage, { x: 294, y: 40, texte: L('Nitrate d\'argent', 'Silver nitrate'), taille: 14 });
    etiquette(montage, { x: 294, y: 59, texte: L('C1 = 0,100 mol/L', 'C1 = 0.100 mol/L'), mono: true, taille: 13, couleur: C.discret });
    const gtt = gouttes(scene, { x: 262, y1: bur.bec.y, y2: 340, couleur: C.verre });

    // Cellule conductimétrique : deux plaques en regard, reliées au conductimètre. Plaques placées bas pour rester immergées avec 50 mL d'eau.
    const cond = appareil(scene, { x: 440, y: 364, w: 160, h: 76, titre: L('CONDUCTIMÈTRE', 'CONDUCTIMETER'), couleur: C.jaune });
    const gCell = el('g', {}, scene);
    const cable = el('path', { fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, gCell);
    const cellule = el('g', {}, gCell);
    el('rect', { x: 301, y: 250, width: 10, height: 16, rx: 3, fill: C.metal }, cellule);
    el('rect', { x: 300, y: 264, width: 12, height: 132, rx: 4, fill: 'rgba(223,230,255,.16)', stroke: C.verre, 'stroke-width': 1.6 }, cellule);
    el('rect', { x: 302.5, y: 385, width: 2.5, height: 9, fill: C.jaune }, cellule);
    el('rect', { x: 307, y: 385, width: 2.5, height: 9, fill: C.jaune }, cellule);

    // Zone agrandie dans le bécher.
    const anneau = el('circle', { cx: ZX, cy: ZY, r: 8, fill: 'none', stroke: C.jaune, 'stroke-width': 2 }, scene);

    // Barre de Kohlrausch : la conductivité est la somme des contributions de chaque ion.
    const gBarre = el('g', {}, scene);
    etiquette(gBarre, { x: BX, y: BY - 9, texte: L('σ = somme des λ·[ion]', 'σ = sum of λ·[ion]'), taille: 13, couleur: C.texte });
    el('rect', { x: BX, y: BY, width: BW, height: 14, rx: 4, fill: C.grille }, gBarre);
    const ordre: Ion[] = ['Na', 'Cl', 'NO3', 'Ag'];
    const parts = ordre.map((i) => el('rect', { y: BY, height: 14, fill: COULEUR[i] }, gBarre));
    IONS.forEach((i, k) => {
      el('circle', { cx: BX + 7 + k * 54, cy: BY + 35, r: 6, fill: COULEUR[i] }, gBarre);
      etiquette(gBarre, { x: BX + 17 + k * 54, y: BY + 40, texte: NOM[i], taille: 13, mono: true });
    });

    // Loupe : les ions présents dans la solution.
    const loupe = el('g', {}, scene);
    const clip = uid('loupe');
    el('circle', { r: LR }, el('clipPath', { id: clip }, loupe));
    el('circle', { r: LR, fill: C.panneau }, loupe);
    const gIons = el('g', { 'clip-path': `url(#${clip})` }, loupe);
    const solide = etiquette(gIons, { x: 0, y: 92, texte: 'AgCl (s)', ancre: 'middle', taille: 13, couleur: C.verre });
    el('circle', { r: LR, fill: 'none', stroke: C.jaune, 'stroke-width': TRAIT }, loupe);
    etiquette(loupe, { x: 0, y: -LR - 12, texte: L('Les ions, vus à la loupe', 'The ions, magnified'), ancre: 'middle', taille: 14, couleur: C.jaune });

    const ion = (i: Ion) => {
      const g = el('g', {}, gIons);
      const c = el('circle', { r: 8, fill: COULEUR[i] }, g);
      const s = texte(g, 0, 4.5, SIGNE[i], { fill: C.fond, 'font-family': MONO, 'font-size': 13, 'font-weight': 700, 'text-anchor': 'middle' });
      return (x: number, y: number, op = 1, blanc = 0) => {
        g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        g.style.opacity = String(op);
        c.setAttribute('fill', mix(COULEUR[i], C.verre, blanc));
        s.style.opacity = String(1 - blanc);
      };
    };
    // Places réparties dans le disque (tirage déterministe, on garde le candidat le plus isolé).
    const r = rng(11), places: [number, number][] = [];
    for (let k = 0; k < 30; k++) {
      let best: [number, number] = [0, 0], dBest = -1;
      for (let j = 0; j < 40; j++) {
        const a = r() * 2 * Math.PI, q = 80 * Math.sqrt(r());
        const c: [number, number] = [q * Math.cos(a), q * Math.sin(a) - 14];
        if (c[1] > 40) continue;
        const d = Math.min(200, ...places.map(([x, y]) => Math.hypot(x - c[0], y - c[1])));
        if (d > dBest) { dBest = d; best = c; }
      }
      places.push(best);
    }
    const lieu = (k: number, T: number): [number, number] => [places[k][0] + 5 * Math.sin(T * 0.9 + k * 1.7), places[k][1] + 5 * Math.cos(T * 0.7 + k * 2.3)];
    const na = Array.from({ length: N }, () => ion('Na'));
    const no3 = Array.from({ length: 15 }, () => ion('NO3'));
    const agX = Array.from({ length: 9 }, () => ion('Ag'));
    const cl = Array.from({ length: N }, () => ion('Cl'));
    const agR = Array.from({ length: N }, () => ion('Ag'));

    // Encart de résultat (étape 6).
    const encart = el('g', {}, scene);
    el('rect', { x: 404, y: 84, width: 220, height: 150, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 420, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(112, 13, C.discret, POLICE).textContent = L('À l\'équivalence', 'At the equivalence point');
    ligne(140, 15, C.texte).textContent = 'C0·V0 = C1·VE';
    const resC = ligne(176, 17, C.jaune), resT = ligne(208, 14, C.menthe);

    let cle = '', pts: [number, number][] = [], yMax = 160;
    let fit: { avant: Droite; apres: Droite; vE: number } = { avant: { pente: 0, ordonnee: 0 }, apres: { pente: 0, ordonnee: 0 }, vE: 0 };
    const sur = (d: Droite, x: number): [number, number] => [x, d.pente * x + d.ordonnee];

    return ({ etape, t, T, p }) => {
      const tit: Titrage = { c0: p.c0, v0: V0, eau: p.eau, c1: C1 };
      const vE = volumeEquivalent(tit);
      if (cle !== `${p.c0}|${p.eau}`) {
        cle = `${p.c0}|${p.eau}`;
        pts = releve(tit, V_MAX, 1).map(([x, s]) => [x, s * 1000]);
        fit = deuxDroites(pts);
        yMax = Math.ceil((Math.max(...pts.map((q) => q[1])) * 1.15) / 20) * 20;
        graphique?.axes({ y: { label: 'σ (mS/m)', min: 0, max: yMax } });
      }
      const im = { etape, t };
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((i) => avancement(im, i));
      const v = vE * a3 + (V_MAX - vE) * a4;
      const sigma = conductivite(v, tit) * 1000; // mS/m

      // Étape 1 : la pipette délivre le sérum, la pissette ajoute l'eau distillée.
      const vide = seg(a1, 0.14, 0.36, ease.lin), eau = seg(a1, 0.6, 0.88);
      pip.style.transform = `translateY(${lerp(-300, 0, seg(a1, 0, 0.12, ease.out)) - 300 * seg(a1, 0.38, 0.5, ease.in)}px)`;
      ventre.setAttribute('fill-opacity', String(0.8 * (1 - vide)));
      filet.style.opacity = vide > 0 && vide < 1 ? '1' : '0';
      pis.style.transform = `translateX(${lerp(330, 0, seg(a1, 0.45, 0.58, ease.out)) + 330 * seg(a1, 0.9, 1, ease.in)}px)`;
      const niveau = (V0 * vide + p.eau * eau + v) / BECHER, ys = bec.ySurface(niveau);
      set(jet, { d: `M318 160Q300 166 296 ${ys.toFixed(1)}` });
      jet.style.opacity = eau > 0 && eau < 1 ? '1' : '0';
      show(etiqSerum, seg(a1, 0.3, 0.42), 6);
      etiqEau.textContent = L(`+ eau distillée : ${fmt(p.eau, 0)} mL`, `+ distilled water: ${fmt(p.eau, 0)} mL`);
      show(etiqEau, seg(a1, 0.84, 0.96), 6);

      // Étape 2 : montage, remplissage de la burette, cellule, agitation, ouverture de la loupe.
      show(montage, seg(a2, 0, 0.2), 24);
      const remplie = seg(a2, 0.2, 0.44);
      const dy = lerp(-70, 0, seg(a2, 0.44, 0.64, ease.out));
      gCell.style.opacity = String(seg(a2, 0.42, 0.5));
      cellule.setAttribute('transform', `translate(0 ${dy.toFixed(1)})`);
      set(cable, { d: `M440 404C388 404 384 ${228 + dy} 348 ${222 + dy}S306 ${232 + dy} 306 ${250 + dy}` });
      const agite = a2 > 0.68;
      agit.marche(agite);
      bar.tourne(T, agite ? 1 : 0);
      const allume = a2 > 0.72;
      cond.affiche(allume ? `${fmt(sigma, 1)} mS/m` : '');
      const pop = seg(a2, 0.72, 0.94, ease.out), fin = seg(a6, 0, 0.25);
      loupe.setAttribute('transform', `translate(${lerp(ZX, LX, pop).toFixed(1)} ${lerp(ZY, LY, pop).toFixed(1)}) scale(${lerp(0.08, 1, seg(a2, 0.72, 0.97, ease.backOut)) * (1 - 0.08 * fin)})`);
      loupe.style.opacity = String(clamp(pop * 4) * (1 - fin));
      anneau.style.opacity = String(clamp(pop * 4) * (1 - fin));
      show(gBarre, seg(a2, 0.86, 1), 8);

      // Étapes 3 et 4 : on verse le nitrate d'argent.
      const coule = (a3 > 0 && a3 < 1) || (a4 > 0 && a4 < 1);
      bur.liquide(remplie * (1 - v / V_MAX), C.verre);
      bur.robinet(coule ? 1 : 0);
      gtt.maj(T, coule ? 0.6 : 0);
      // Le précipité de chlorure d'argent trouble la solution.
      bec.liquide(niveau, mix(C.bleu, C.verre, 0.25 + 0.5 * clamp(v / vE)));

      // Loupe : chaque Ag+ versé capture un Cl- (précipité), un NO3- le remplace ; après l'équivalence, Ag+ reste libre.
      const u = (N * v) / vE;
      na.forEach((place, k) => place(...lieu(k, T)));
      cl.forEach((place, k) => {
        const f = clamp(u - k), e1 = seg(f, 0, 0.55), e2 = seg(f, 0.55, 1);
        const [x, y] = lieu(N + k, T), xs = (k - 2.5) * 22, ysol = 60 + (k % 2) * 7;
        place(lerp(x, xs + 5, e2), lerp(y, ysol, e2), 1, e2);
        agR[k](lerp(lerp(places[N + k][0] * 0.3 - 20, x - 15, e1), xs - 5, e2), lerp(lerp(-125, y, e1), ysol, e2), f > 0 ? 1 : 0, e2);
      });
      no3.forEach((place, k) => {
        const f = clamp(u - k), e = seg(f, 0, 0.7, ease.out), [x, y] = lieu(15 + k, T);
        place(lerp(x * 0.3 + 12, x, e), lerp(-125, y, e), f > 0 ? 1 : 0);
      });
      agX.forEach((place, k) => {
        const f = clamp(u - N - k), e = seg(f, 0, 0.7, ease.out), [x, y] = lieu(N + k, T);
        place(lerp(x * 0.3 - 12, x, e), lerp(-125, y, e), f > 0 ? 1 : 0);
      });
      solide.style.opacity = String(clamp(u - 0.6));

      // Barre de Kohlrausch.
      const part = contributions(v, tit);
      let x0 = BX;
      ordre.forEach((i, k) => {
        const w = (part[i] * 1000 * BW) / yMax;
        set(parts[k], { x: x0.toFixed(1), width: w.toFixed(1) });
        x0 += w;
      });

      // Étape 6 : résultat.
      const c0 = (C1 * fit.vE) / V0;
      show(encart, seg(a6, 0.25, 0.55, ease.backOut), 16);
      resC.textContent = `C0 = ${fmt(c0, 3)} mol/L`;
      resT.textContent = L(`soit ${fmt(c0 * M_NACL, 1)} g/L de NaCl`, `i.e. ${fmt(c0 * M_NACL, 1)} g/L of NaCl`);

      const trouve = a5 > 0.68;
      if (graphique) {
        graphique.nuage('pts', a3 > 0 ? pts.filter(([x]) => x <= v + 1e-9) : [], { couleur: C.jaune, rayon: 3.5 });
        if (a3 > 0 && a4 < 1) graphique.repere('mesure', v, sigma, { couleur: C.blanc, rayon: 4 });
        else graphique.effacer('mesure');
        const d1 = seg(a5, 0.05, 0.35), d2 = seg(a5, 0.33, 0.63);
        graphique.courbe('avant', d1 > 0 ? [sur(fit.avant, 0), sur(fit.avant, (fit.vE + 3) * d1)] : [], { couleur: C.cyan, epaisseur: 2 });
        graphique.courbe('apres', d2 > 0 ? [sur(fit.apres, V_MAX), sur(fit.apres, lerp(V_MAX, fit.vE - 3, d2))] : [], { couleur: C.corail, epaisseur: 2 });
        if (trouve) {
          graphique.verticale('ve', fit.vE, { couleur: C.jaune, label: `VE = ${fmt(fit.vE, 1)} mL` });
          graphique.repere('eq', ...sur(fit.avant, fit.vE), { couleur: C.blanc });
          graphique.opacite('ve', seg(a5, 0.68, 0.85));
          graphique.opacite('eq', seg(a5, 0.68, 0.85));
        } else {
          graphique.effacer('ve');
          graphique.effacer('eq');
        }
      }

      const mesures = [
        { label: L('Volume versé', 'Volume added'), valeur: `${fmt(v, 1)} mL` },
        { label: L('Conductivité', 'Conductivity'), valeur: allume ? `${fmt(sigma, 1)} mS/m` : '...' },
      ];
      if (trouve) mesures.push({ label: L('Volume équivalent', 'Equivalence volume'), valeur: `${fmt(fit.vE, 1)} mL` });
      if (a6 > 0.3) mesures.push({ label: 'Concentration C0', valeur: `${fmt(c0, 3)} mol/L` });
      return mesures;
    };
  },
});
