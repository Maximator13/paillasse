import { avancement, clamp, ease, el, fmt, lerp, seg, set, show, trace, uid } from '../../lib/anim';
import { appareil, etiquette, fleche } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { C_SON, courbePassage, frequencePercue, frontsOnde, longueurOnde, vitesseSource, type Passage } from './model';

const K = 3; // pixels par mètre (vue de dessus)
const T0 = 2; // s, l'enregistrement va de -T0 à +T0, passage au plus près à t = 0
const D1 = 1.5; // s, durée d'émission à l'arrêt avant le départ
const RALENTI = 3; // sur le schéma, le son est ralenti pour que le resserrement des fronts se voie
const CV = (C_SON / RALENTI) * K; // célérité du son sur le schéma (px/s)
const ROUTE = 150, XM = 320, RMAX = 600, NF = 36;

export default definirScene({
  etapes: [
    { titre: 'Installer le micro', duree: 5, texte: 'Vue de dessus : une source sonore de fréquence <strong>f<sub>E</sub></strong> est posée sur une voie rectiligne. Un micro relié à un système d\'acquisition est placé à la distance <strong>d</strong> de la voie.' },
    { titre: 'Source immobile', duree: 6, texte: 'À l\'arrêt, les fronts d\'onde sont des cercles <strong>concentriques</strong>, espacés d\'une longueur d\'onde λ = c/f<sub>E</sub>. Le micro mesure exactement la fréquence émise.' },
    { titre: 'La source passe devant le micro', duree: 12, texte: 'Chaque front reste centré sur le point où il a été émis : les fronts se <strong>resserrent à l\'avant</strong> et s\'écartent à l\'arrière. Le son perçu est plus aigu à l\'approche, puis <strong>bascule</strong> vers le grave au passage.' },
    { titre: 'Lire les deux paliers', duree: 6, texte: 'Sur l\'enregistrement, on relève la fréquence <strong>f<sub>A</sub></strong> à l\'approche et <strong>f<sub>B</sub></strong> à l\'éloignement. Elles correspondent aux longueurs d\'onde raccourcie et allongée.' },
    { titre: 'Mesurer la vitesse', duree: 6, texte: 'Avec c = 340 m/s : <strong>v = c·(f<sub>A</sub> − f<sub>B</sub>)/(f<sub>A</sub> + f<sub>B</sub>)</strong>. Changez la vitesse, la fréquence émise ou la distance du micro et observez les fronts et la courbe.' },
  ],
  parametres: [
    { id: 'v', label: 'Vitesse de la source', min: 10, max: 40, pas: 1, valeur: 25, unite: 'm/s', decimales: 0 },
    { id: 'fe', label: 'Fréquence émise', min: 400, max: 1000, pas: 20, valeur: 680, unite: 'Hz', decimales: 0 },
    { id: 'd', label: 'Distance du micro', min: 8, max: 30, pas: 1, valeur: 10, unite: 'm', decimales: 0 },
  ],
  graphique: {
    x: { label: 't (s)', min: -T0, max: T0, pas: 1 },
    y: { label: 'f perçue (Hz)', min: 555, max: 805, pas: 50 },
  },
  affiche: { etape: 2, t: 0.62 },

  monter({ scene, graphique }) {
    const clip = uid('doppler');
    el('rect', { x: 0, y: 0, width: 640, height: 480 }, el('clipPath', { id: clip }, el('defs', {}, scene)));

    // Voie rectiligne, vue de dessus.
    const voie = el('g', {}, scene);
    el('rect', { x: 0, y: ROUTE - 13, width: 640, height: 26, fill: C.panneau, opacity: 0.7 }, voie);
    for (const y of [ROUTE - 13, ROUTE + 13]) el('line', { x1: 0, x2: 640, y1: y, y2: y, stroke: C.grille, 'stroke-width': 2 }, voie);
    el('line', { x1: 0, x2: 640, y1: ROUTE, y2: ROUTE, stroke: C.metal, 'stroke-width': 1.5, 'stroke-dasharray': '14 12', opacity: 0.45 }, voie);
    etiquette(voie, { x: 20, y: 34, texte: 'Vue de dessus', taille: 13, couleur: C.discret });
    const note = etiquette(scene, { x: 20, y: 54, texte: `Schéma : son ralenti ${RALENTI} fois`, taille: 13, couleur: C.discret });

    // Fronts d'onde et points d'émission.
    const gFronts = el('g', { 'clip-path': `url(#${clip})` }, scene);
    const cercles = Array.from({ length: NF }, () => el('circle', { cy: ROUTE, fill: 'none', stroke: C.cyan, 'stroke-width': 2 }, gFronts));
    const centres = Array.from({ length: NF }, () => el('circle', { cy: ROUTE, r: 2.2, fill: C.cyan }, gFronts));

    // Micro, câble et fréquencemètre.
    const cable = el('path', { fill: 'none', stroke: C.metal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, scene);
    const gMicro = el('g', {}, scene);
    const ligneD = el('line', { x1: XM, x2: XM, y1: ROUTE, stroke: C.discret, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, gMicro);
    const halo = el('circle', { cx: XM, r: 16, fill: C.menthe, opacity: 0 }, gMicro);
    const micro = el('circle', { cx: XM, r: 7, fill: C.menthe, stroke: C.verre, 'stroke-width': TRAIT }, gMicro);
    const etiqMicro = etiquette(gMicro, { x: XM + 20, y: 0, texte: 'Micro', taille: 13, couleur: C.menthe });
    const etiqD = etiquette(scene, { x: XM - 20, y: 0, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.discret });
    const gApp = el('g', {}, scene);
    const freq = appareil(gApp, { x: 24, y: 372, w: 156, h: 76, titre: 'FRÉQUENCE (Hz)' });

    // Source : chariot portant un haut-parleur.
    const source = el('g', {}, scene);
    el('rect', { x: -19, y: -10, width: 38, height: 20, rx: 6, fill: C.panneau, stroke: C.verre, 'stroke-width': TRAIT }, source);
    const hp = el('circle', { cx: 0, cy: 0, r: 5, fill: C.orange }, source);
    const etiqSource = etiquette(source, { x: 0, y: -20, texte: 'Source', ancre: 'middle', taille: 13, couleur: C.orange });
    const gVitesse = el('g', {}, scene);
    const vecteur = fleche(gVitesse, { x1: 0, y1: ROUTE, x2: 1, y2: ROUTE, couleur: C.jaune });
    const etiqV = etiquette(gVitesse, { x: 0, y: ROUTE - 12, texte: 'v', ancre: 'middle', taille: 15, couleur: C.jaune });

    // Cotes des longueurs d'onde (étape 4).
    const cote = (couleur: string) => {
      const g = el('g', {}, scene);
      const guides = el('path', { fill: 'none', stroke: couleur, 'stroke-width': 1.2, 'stroke-dasharray': '3 4', opacity: 0.7 }, g);
      const l = el('path', { fill: 'none', stroke: couleur, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
      const t = etiquette(g, { x: 0, y: 0, texte: '', ancre: 'end', mono: true, taille: 13, couleur });
      return {
        g,
        maj(xa: number, xb: number, y: number, xt: number, contenu: string) {
          guides.setAttribute('d', `M${xa} ${y}V${ROUTE}M${xb} ${y}V${ROUTE}`);
          l.setAttribute('d', `M${xa} ${y - 5}V${y + 5}M${xa} ${y}H${xb}M${xb} ${y - 5}V${y + 5}`);
          set(t, { x: xt, y: y - 10 });
          t.textContent = contenu;
        },
      };
    };
    const coteAvant = cote(C.jaune), coteArriere = cote(C.violet);

    // Encart de résultat (étape 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 396, y: 348, width: 228, height: 112, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 412, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(372, 13, C.discret, POLICE).textContent = 'Vitesse mesurée';
    ligne(396, 13, C.texte).textContent = 'v = c·(fA − fB)/(fA + fB)';
    const resultat = ligne(424, 19, C.jaune);
    const conversion = ligne(446, 13, C.discret);

    let cle = '', cleAxe = 0, pts: [number, number][] = [];

    return ({ etape, t, p }) => {
      const img = { etape, t };
      const fE = p.fe, v = p.v, d = p.d;
      const passage: Passage = { fE, v, d };
      if (cle !== `${fE}|${v}|${d}`) {
        cle = `${fE}|${v}|${d}`;
        pts = courbePassage(passage, -T0, T0, 240);
      }
      if (graphique && cleAxe !== fE) {
        cleAxe = fE;
        // Demi-étendue proportionnelle à fE : couvre le décalage maximal (v = 40 m/s) sans écraser la courbe aux basses fréquences.
        const demi = Math.ceil((fE * 0.153) / 25) * 25;
        graphique.axes({ y: { label: 'f perçue (Hz)', min: fE - demi, max: fE + demi, pas: demi > 100 ? 50 : 25 } });
      }
      const a0 = avancement(img, 0), a1 = avancement(img, 1), a2 = avancement(img, 2), a3 = avancement(img, 3), a4 = avancement(img, 4);

      // Horloge de l'expérience : émission à l'arrêt, puis passage à vitesse constante de -T0 à +T0.
      const tau = a1 < 1 ? -T0 - D1 + D1 * a1 : lerp(-T0, T0, a2);
      const vpx = v * K, periode = (36 / CV) * (680 / fE);
      const xDepart = XM - vpx * T0;
      const xs = a1 <= 0 ? lerp(-40, xDepart, seg(a0, 0.12, 0.5, ease.out)) : XM + vpx * clamp(tau, -T0, T0);
      const my = ROUTE + d * K;

      // Étape 1 : la voie, la source, le micro et son câble entrent en scène.
      show(voie, seg(a0, 0, 0.15));
      source.setAttribute('transform', `translate(${xs.toFixed(1)} ${ROUTE})`);
      etiqSource.style.opacity = String(seg(a0, 0.45, 0.6) * (1 - seg(a2, 0, 0.08)));
      set(ligneD, { y2: my });
      set(halo, { cy: my });
      set(micro, { cy: my });
      set(etiqMicro, { y: my + 5 });
      show(gMicro, seg(a0, 0.45, 0.65, ease.backOut), -18);
      cable.setAttribute('d', `M${XM} ${my}C${XM} ${my + 80} 102 ${my + 60} 102 372`);
      trace(cable, seg(a0, 0.6, 0.85));
      show(gApp, seg(a0, 0.55, 0.8, ease.backOut), 16);
      set(etiqD, { y: my + 5 });
      etiqD.textContent = `d = ${fmt(d, 0)} m`;
      show(etiqD, seg(a0, 0.82, 1));

      // Étapes 2 et 3 : fronts d'onde, chacun centré sur son point d'émission.
      const emet = a1 > 0, fige = a2 >= 1;
      const fronts = emet ? frontsOnde(tau, { v: vpx, c: CV, periode, depuis: -T0 - D1, rayonMax: RMAX }) : [];
      const cx = (i: number) => XM + Math.max(fronts[i].x, -vpx * T0);
      const attenuation = lerp(1, 0.6, seg(a3, 0, 0.3));
      let recu = a1 >= 1, eclat = 0;
      cercles.forEach((c, i) => {
        const f = fronts[i];
        if (!f) {
          c.setAttribute('opacity', '0');
          centres[i].setAttribute('opacity', '0');
          return;
        }
        const op = 0.85 * (1 - f.rayon / RMAX) ** 0.8 * attenuation;
        set(c, { cx: cx(i).toFixed(1), r: f.rayon.toFixed(1), opacity: op.toFixed(3) });
        set(centres[i], { cx: cx(i).toFixed(1), opacity: (op * 0.9).toFixed(3) });
        const ecart = f.rayon - Math.hypot(XM - cx(i), my - ROUTE);
        if (ecart >= 0) recu = true;
        eclat = Math.max(eclat, Math.exp(-((ecart / 7) ** 2)));
      });
      note.style.opacity = String(seg(a1, 0, 0.15));
      const actif = emet && !fige;
      set(halo, { opacity: actif ? (0.55 * eclat).toFixed(3) : 0 });
      set(hp, { r: actif && fronts[0] ? 5 + 2.5 * (1 - clamp(fronts[0].age / periode)) : 5 });

      // Vecteur vitesse pendant le passage.
      const xv = xs + 26, lv = 10 + v * 0.9;
      vecteur.maj(xv, ROUTE, xv + lv, ROUTE);
      set(etiqV, { x: xv + lv / 2 });
      gVitesse.style.opacity = String(seg(a2, 0, 0.06) * (1 - seg(a2, 0.86, 1)));

      const enRoute = etape >= 2;
      const f = !enRoute ? fE : frequencePercue(tau, passage);
      const fA = frequencePercue(-T0, passage), fB = frequencePercue(T0, passage);
      const vMesuree = vitesseSource(fA, fB);
      freq.affiche(recu ? fmt(f, 0) : '---');

      // Étape 4 : longueurs d'onde devant et derrière la source, sur l'image figée.
      const pAvant = seg(a3, 0.08, 0.3), pArriere = seg(a3, 0.3, 0.52);
      show(coteAvant.g, pAvant);
      show(coteArriere.g, pArriere);
      if (a3 > 0 && fronts.length > 2) {
        const xa1 = cx(1) + fronts[1].rayon, xa2 = cx(2) + fronts[2].rayon;
        const xb1 = cx(1) - fronts[1].rayon, xb2 = cx(2) - fronts[2].rayon;
        coteAvant.maj(xa1, xa2, ROUTE - 62, Math.min(xa2 + 76, 622), `λ avant = ${fmt(longueurOnde(fE, v, 1), 2)} m`);
        coteArriere.maj(xb2, xb1, ROUTE - 28, xb1 + 24, `λ arrière = ${fmt(longueurOnde(fE, v, -1), 2)} m`);
      }

      // Étape 5 : vitesse déduite des deux fréquences.
      show(encart, seg(a4, 0.05, 0.35, ease.backOut), 16);
      resultat.textContent = `v = ${fmt(vMesuree, 1)} m/s`;
      conversion.textContent = `soit ${fmt(vMesuree * 3.6, 0)} km/h`;

      if (graphique) {
        if (recu && emet) {
          graphique.horizontale('fe', fE, { couleur: C.discret, label: a3 > 0.45 ? undefined : `fE = ${fmt(fE, 0)} Hz` });
          graphique.opacite('fe', enRoute ? 0.7 : 1);
        } else graphique.effacer('fe');
        graphique.courbe('f', enRoute ? pts.filter(([x]) => x <= tau) : [], { couleur: C.cyan, epaisseur: 3 });
        if (enRoute && !fige) graphique.repere('mesure', tau, f, { couleur: C.blanc, rayon: 4 });
        else graphique.effacer('mesure');
        if (a3 > 0.45) {
          graphique.horizontale('fa', fA, { couleur: C.jaune, label: `fA = ${fmt(fA, 0)} Hz` });
          graphique.opacite('fa', seg(a3, 0.45, 0.6));
        } else graphique.effacer('fa');
        if (a3 > 0.62) {
          graphique.horizontale('fb', fB, { couleur: C.violet, label: `fB = ${fmt(fB, 0)} Hz` });
          graphique.opacite('fb', seg(a3, 0.62, 0.77));
          graphique.verticale('passage', 0, { couleur: C.discret, label: 'au plus près' });
          graphique.opacite('passage', seg(a3, 0.78, 0.95));
        } else {
          graphique.effacer('fb');
          graphique.effacer('passage');
        }
      }

      const mesures = [
        { label: 'Fréquence émise', valeur: `${fmt(fE, 0)} Hz` },
        { label: 'Fréquence perçue', valeur: recu ? `${fmt(f, 0)} Hz` : '...' },
        { label: 'Date', valeur: enRoute ? `${fmt(tau, 2)} s` : '...' },
      ];
      if (a4 > 0.3) mesures.push({ label: 'Vitesse mesurée', valeur: `${fmt(vMesuree, 1)} m/s` });
      return mesures;
    };
  },
});
