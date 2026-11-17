import { avancement, clamp, ease, el, fmt, lerp, mix, rng, seg, set, show } from '../../lib/anim';
import { appareil, etiquette, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { activite, constanteRadioactive, instantDesintegration, noyauxRestants } from './model';

const T_MAX = 300; // s, durée du comptage
const COLS = 16, N_MAX = 208, PAS = 18; // grille de noyaux
const X0 = 43, YC = 302; // centre de la première colonne, centre vertical de la grille
const FENETRE = { x: 378, y: 300 }; // fenêtre d'entrée du compteur
const VOL = 0.04, ECLAIR = 0.03; // durées (en fraction d'étape) du vol d'une particule et de l'éclair

export default definirScene({
  etapes: [
    { titre: 'Préparer l\'échantillon', duree: 5, texte: 'Une enceinte contient <strong>N<sub>0</sub></strong> noyaux de <strong>radon 220</strong>, tous identiques et tous instables. Un compteur est placé face à l\'échantillon.' },
    { titre: 'Une désintégration, vue de près', duree: 7, texte: 'Le noyau de radon expulse une <strong>particule α</strong> (un noyau d\'hélium 4) et devient un noyau de polonium 216. Pour un noyau donné, l\'instant de la désintégration est <em>imprévisible</em>.' },
    { titre: 'Lancer le comptage', duree: 14, texte: 'Chaque désintégration envoie une particule vers le compteur. Les noyaux s\'éteignent au hasard, mais leur nombre <strong>N(t)</strong> décroît de façon très régulière.' },
    { titre: 'Comparer à la loi de décroissance', duree: 7, texte: 'Les mesures fluctuent autour de <strong>N(t) = N<sub>0</sub>·e<sup>−λt</sup></strong>. La <strong>demi-vie t<sub>1/2</sub></strong> est la durée au bout de laquelle il reste la moitié des noyaux.' },
    { titre: 'Demi-vie et activité', duree: 6, texte: 'On en déduit <strong>λ = ln 2 / t<sub>1/2</sub></strong> et l\'activité <strong>A = λ·N</strong>, en becquerels. Changez le nombre de noyaux, la demi-vie ou le tirage : le hasard change, la loi reste.' },
  ],
  parametres: [
    { id: 'n0', label: 'Nombre de noyaux N0', min: 64, max: N_MAX, pas: 16, valeur: 160 },
    { id: 't12', label: 'Demi-vie', min: 30, max: 120, pas: 1, valeur: 56, unite: 's' },
    { id: 'tirage', label: 'Tirage au sort n°', min: 1, max: 8, pas: 1, valeur: 1 },
  ],
  graphique: {
    x: { label: 't (s)', min: 0, max: T_MAX, pas: 50 },
    y: { label: 'N restants', min: 0, max: 220, pas: 40 },
  },
  affiche: { etape: 2, t: 0.42 },

  monter({ scene, graphique }) {
    paillasse(scene);
    const mono = (parent: Element, x: number, y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, parent);

    // Enceinte et grille de noyaux.
    const enceinte = el('g', {}, scene);
    el('rect', { x: 46, y: 428, width: 16, height: 12, fill: C.metal }, enceinte);
    el('rect', { x: 294, y: 428, width: 16, height: 12, fill: C.metal }, enceinte);
    el('rect', { x: 24, y: 176, width: 308, height: 252, rx: 14, fill: 'rgba(223,230,255,.05)', stroke: C.verre, 'stroke-width': TRAIT }, enceinte);
    etiquette(enceinte, { x: 28, y: 166, texte: 'Radon 220' });
    const etiqN = etiquette(scene, { x: 332, y: 166, texte: '', ancre: 'end', mono: true, taille: 14, couleur: C.cyan });
    const gNoyaux = el('g', {}, scene);
    const noyaux = Array.from({ length: N_MAX }, () => el('circle', { r: 0 }, gNoyaux));
    const gEclairs = el('g', {}, scene);
    const eclairs = noyaux.map(() => el('circle', { r: 0, fill: 'none', stroke: C.jaune, 'stroke-width': 2, opacity: 0 }, gEclairs));

    // Compteur : tube, câble, boîtier, chronomètre.
    const compteur = el('g', {}, scene);
    el('path', { d: 'M470 300C505 300 546 322 546 364', fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, compteur);
    el('rect', { x: 380, y: 284, width: 90, height: 32, rx: 8, fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT }, compteur);
    el('line', { x1: 392, x2: 462, y1: 300, y2: 300, stroke: C.metal, 'stroke-width': 2 }, compteur);
    const lueur = el('circle', { cx: FENETRE.x, cy: FENETRE.y, r: 18, fill: C.jaune, opacity: 0 }, compteur);
    el('rect', { x: 374, y: 282, width: 7, height: 36, rx: 3, fill: C.violet }, compteur);
    etiquette(compteur, { x: 425, y: 272, texte: 'Compteur', ancre: 'middle', taille: 14 });
    const boitier = appareil(compteur, { x: 476, y: 364, w: 140, h: 76, titre: 'DÉSINTÉGRATIONS', couleur: C.jaune });
    el('circle', { cx: 584, cy: 300, r: 24, fill: C.panneau, stroke: C.verre, 'stroke-width': 2 }, compteur);
    for (let k = 0; k < 12; k++) {
      const a = (k * Math.PI) / 6;
      el('line', { x1: 584 + Math.sin(a) * 19, y1: 300 - Math.cos(a) * 19, x2: 584 + Math.sin(a) * 22, y2: 300 - Math.cos(a) * 22, stroke: C.discret, 'stroke-width': 1.5 }, compteur);
    }
    const aiguille = el('line', { x1: 584, y1: 300, x2: 584, y2: 282, stroke: C.corail, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, compteur);
    el('circle', { cx: 584, cy: 300, r: 3, fill: C.corail }, compteur);
    const etiqT = etiquette(compteur, { x: 584, y: 346, texte: '', ancre: 'middle', mono: true, taille: 13, couleur: C.corail });

    // Légende.
    const legende = el('g', {}, scene);
    el('circle', { cx: 386, cy: 191, r: 6, fill: C.cyan }, legende);
    el('circle', { cx: 386, cy: 213, r: 4, fill: C.grille, stroke: C.metal, 'stroke-width': 1.2 }, legende);
    el('line', { x1: 381, x2: 389, y1: 235, y2: 235, stroke: C.jaune, 'stroke-width': 4, 'stroke-linecap': 'round' }, legende);
    ['noyau radioactif', 'noyau désintégré', 'particule α'].forEach((s, k) => etiquette(legende, { x: 402, y: 196 + 22 * k, texte: s, taille: 13, couleur: C.discret }));

    // Particules en vol (au-dessus de tout le reste).
    const gPart = el('g', {}, scene);
    const particules = noyaux.map(() => el('line', { stroke: C.jaune, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }, gPart));

    // Gros plan sur une désintégration (étape 2).
    const zoom = el('g', {}, scene);
    el('rect', { x: 24, y: 20, width: 308, height: 128, rx: 14, fill: C.panneau, stroke: C.grille, 'stroke-width': 1.5 }, zoom);
    mono(zoom, 40, 42, 13, C.discret, POLICE).textContent = 'Désintégration α';
    const trainee = el('line', { x1: 124, y1: 86, x2: 124, y2: 86, stroke: C.jaune, 'stroke-width': 2, 'stroke-dasharray': '2 6', 'stroke-linecap': 'round', opacity: 0.7 }, zoom);
    const pere = el('g', {}, zoom);
    const halo = el('circle', { cx: 92, cy: 86, r: 30, fill: 'none', stroke: C.cyan, 'stroke-width': 2 }, pere);
    const rz = rng(11);
    for (let k = 0; k < 26; k++) {
      const ray = 21 * Math.sqrt((k + 0.5) / 26), a = k * 2.39996;
      el('circle', { cx: 92 + ray * Math.cos(a), cy: 86 + ray * Math.sin(a), r: 5, fill: rz() < 0.4 ? C.corail : C.bleu, stroke: C.fond, 'stroke-width': 1 }, pere);
    }
    const alpha = el('g', {}, zoom);
    const haloA = el('circle', { cx: 104, cy: 86, r: 14, fill: C.jaune, opacity: 0 }, alpha);
    [[-4.5, -4.5, C.corail], [4.5, -4.5, C.bleu], [-4.5, 4.5, C.bleu], [4.5, 4.5, C.corail]].forEach(([dx, dy, c]) =>
      el('circle', { cx: 104 + (dx as number), cy: 86 + (dy as number), r: 5, fill: c, stroke: C.fond, 'stroke-width': 1 }, alpha));
    const etiqRn = etiquette(zoom, { x: 92, y: 138, texte: 'Rn 220', ancre: 'middle', mono: true, taille: 13, couleur: C.cyan });
    const etiqPo = etiquette(zoom, { x: 86, y: 138, texte: 'Po 216', ancre: 'middle', mono: true, taille: 13, couleur: C.discret });
    const etiqHe = etiquette(zoom, { x: 236, y: 138, texte: 'He 4 (particule α)', ancre: 'middle', mono: true, taille: 13, couleur: C.jaune });

    // Encart de résultat (étape 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 372, y: 24, width: 252, height: 132, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    mono(encart, 388, 48, 13, C.discret, POLICE).textContent = 'Exploitation';
    const lDemi = mono(encart, 388, 74, 17, C.jaune);
    const lMes = mono(encart, 388, 98, 13, C.cyan);
    const lLambda = mono(encart, 388, 120, 13, C.texte);
    const lA0 = mono(encart, 388, 142, 13, C.texte);

    // Tirages : un nombre uniforme par noyau, puis instants de désintégration et escalier N(t), recalculés si un curseur change.
    let cle = '', td: number[] = [], tries: number[] = [], escalier: [number, number][] = [];

    return ({ etape, t, T, p }) => {
      const n0 = Math.round(p.n0), lambda = constanteRadioactive(p.t12), rangs = n0 / COLS;
      if (cle !== `${n0}|${p.t12}|${p.tirage}`) {
        cle = `${n0}|${p.t12}|${p.tirage}`;
        const r = rng(p.tirage * 977 + 13);
        td = Array.from({ length: n0 }, () => instantDesintegration(r(), lambda));
        tries = [...td].sort((a, b) => a - b);
        escalier = [[0, n0]];
        tries.forEach((x, k) => escalier.push([x, n0 - k], [x, n0 - k - 1]));
      }
      const img = { etape, t };
      const a1 = avancement(img, 0), a2 = avancement(img, 1), a3 = avancement(img, 2), a4 = avancement(img, 3), a5 = avancement(img, 4);
      const ts = T_MAX * a3, enCours = a3 > 0 && a3 < 1;
      let restants = 0;
      while (restants < n0 && tries[n0 - 1 - restants] > ts) restants++;
      const comptes = n0 - restants;

      // Étape 1 : l'enceinte apparaît, les noyaux se posent en vague, le compteur glisse en place.
      show(enceinte, seg(a1, 0, 0.2), 16);
      compteur.style.opacity = String(seg(a1, 0.5, 0.7));
      compteur.style.transform = `translateX(${lerp(120, 0, seg(a1, 0.5, 0.9, ease.out))}px)`;
      show(legende, seg(a1, 0.8, 0.98));
      show(etiqN, seg(a1, 0.72, 0.9));
      etiqN.textContent = a3 > 0 ? `N = ${restants} / ${n0}` : `N0 = ${n0} noyaux`;

      // Étape 3 : chaque noyau s'éteint à son instant, avec un éclair, et lance une particule vers le compteur.
      let pulse = 0;
      for (let i = 0; i < N_MAX; i++) {
        const noyau = noyaux[i], eclair = eclairs[i], part = particules[i];
        if (i >= n0) {
          noyau.setAttribute('r', '0');
          eclair.setAttribute('opacity', '0');
          part.setAttribute('opacity', '0');
          continue;
        }
        const c = i % COLS, rg = Math.floor(i / COLS);
        const x = X0 + PAS * c, y = YC + (rg - (rangs - 1) / 2) * PAS;
        const pose = seg(a1, 0.15 + 0.45 * ((c + rg) / (COLS + rangs)), 0.3 + 0.45 * ((c + rg) / (COLS + rangs)), ease.backOut);
        const ad = td[i] / T_MAX, q = enCours ? clamp((a3 - ad) / ECLAIR) : 1, fait = a3 > 0 && a3 >= ad;
        set(noyau, {
          cx: x, cy: y,
          r: Math.max(0, pose * (fait ? lerp(7.5, 4, q) : 6 + 0.5 * Math.sin(T * 2 + i))),
          fill: fait ? mix(C.blanc, C.grille, q) : C.cyan,
          stroke: fait ? C.metal : 'none', 'stroke-width': 1.2,
        });
        const vif = fait && enCours && q < 1;
        set(eclair, { cx: x, cy: y, r: lerp(6, 22, ease.out(q)), opacity: vif ? 1 - q : 0 });
        const v = (a3 - ad) / VOL;
        if (fait && enCours && v < 1) {
          const yc = FENETRE.y + ((i * 37) % 21) - 10, d = Math.hypot(FENETRE.x - x, yc - y);
          const px = lerp(x, FENETRE.x, v), py = lerp(y, yc, v);
          set(part, { x1: px - ((FENETRE.x - x) / d) * 9, y1: py - ((yc - y) / d) * 9, x2: px, y2: py, opacity: 1 });
        } else part.setAttribute('opacity', '0');
        if (enCours && v >= 1) pulse = Math.max(pulse, 1 - (v - 1) / 0.5);
      }
      set(lueur, { opacity: 0.55 * clamp(pulse), r: 12 + 8 * clamp(pulse) });
      boitier.affiche(a1 > 0.9 ? String(comptes) : '');
      aiguille.setAttribute('transform', `rotate(${ts * 6} 584 300)`);
      etiqT.textContent = `t = ${fmt(ts, 0)} s`;

      // Étape 2 : gros plan, le noyau tremble, éjecte la particule α et recule.
      show(zoom, seg(a2, 0, 0.15), 14);
      const ejecte = seg(a2, 0.5, 0.8, ease.out);
      const tremble = 2.5 * seg(a2, 0.18, 0.5, ease.in) * (1 - seg(a2, 0.5, 0.56));
      pere.style.transform = `translate(${Math.sin(T * 41) * tremble - 6 * ejecte}px, ${Math.cos(T * 53) * tremble}px)`;
      alpha.style.transform = `translate(${Math.sin(T * 41) * tremble + 132 * ejecte}px, ${Math.cos(T * 53) * tremble}px)`;
      halo.setAttribute('stroke', mix(C.cyan, C.metal, ejecte));
      haloA.setAttribute('opacity', String(0.3 * ejecte));
      set(trainee, { x2: 124 + 96 * ejecte, opacity: 0.7 * ejecte });
      etiqRn.style.opacity = String(1 - seg(a2, 0.5, 0.62));
      etiqPo.style.opacity = String(seg(a2, 0.62, 0.8));
      show(etiqHe, seg(a2, 0.78, 0.95));

      // Étapes 4 et 5 : loi de décroissance, demi-vie, activité.
      const tMesuree = tries[n0 / 2 - 1];
      show(encart, seg(a5, 0.05, 0.35, ease.backOut), 16);
      lDemi.textContent = `t1/2 = ${fmt(p.t12, 0)} s`;
      lMes.textContent = `lue sur ce tirage : ${fmt(tMesuree, 0)} s`;
      lLambda.textContent = `λ = ln 2 / t1/2 = ${fmt(lambda, 4)} s⁻¹`;
      lA0.textContent = `A0 = λ·N0 = ${fmt(activite(n0, lambda), 2)} Bq`;

      if (graphique) {
        graphique.courbe('mesures', a3 > 0 ? [...escalier.slice(0, 1 + 2 * comptes), [ts, restants]] : [], { couleur: C.cyan, epaisseur: 2.5 });
        if (enCours) graphique.repere('mesure', ts, restants, { couleur: C.blanc, rayon: 4, label: `N = ${restants}` });
        else graphique.effacer('mesure');
        const xd = T_MAX * seg(a4, 0.05, 0.5, ease.inOut);
        graphique.courbe('loi', a4 > 0 ? Array.from({ length: 101 }, (_, k): [number, number] => [(xd * k) / 100, noyauxRestants(n0, lambda, (xd * k) / 100)]) : [], { couleur: C.jaune, epaisseur: 2.5, pointille: true });
        if (a4 > 0.55) {
          graphique.horizontale('moitie', n0 / 2, { couleur: C.discret, label: 'N0 / 2' });
          graphique.verticale('demi', p.t12, { couleur: C.jaune, label: `t1/2 = ${fmt(p.t12, 0)} s` });
          graphique.repere('p1', p.t12, n0 / 2, { couleur: C.jaune });
          graphique.repere('p2', 2 * p.t12, n0 / 4, { couleur: C.orange, label: 'N0 / 4' });
          graphique.opacite('moitie', seg(a4, 0.55, 0.68));
          graphique.opacite('demi', seg(a4, 0.62, 0.78));
          graphique.opacite('p1', seg(a4, 0.7, 0.82));
          graphique.opacite('p2', seg(a4, 0.84, 0.98));
        } else ['moitie', 'demi', 'p1', 'p2'].forEach((id) => graphique.effacer(id));
      }

      const mesures = [
        { label: 'Temps', valeur: `${fmt(ts, 0)} s` },
        { label: 'Noyaux restants', valeur: `${restants}` },
        { label: 'Activité A = λ·N', valeur: `${fmt(activite(restants, lambda), 2)} Bq` },
      ];
      if (a4 > 0.62) mesures.push({ label: 'Demi-vie', valeur: `${fmt(p.t12, 0)} s` });
      return mesures;
    };
  },
});
