import { avancement, clamp, ease, el, fmt, lerp, mix, rng, seg, set, show, trace } from '../../lib/anim';
import { appareil, etiquette, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { courant, droite, ecMax, energiePhoton, frequenceSeuil, longueurOnde, metal, vitesseMax } from './model';

const U = 1e14; // les fréquences sont manipulées en 10^14 Hz
const NU_ROUGE = 4.3, NU_MAX = 12;
const DEBIT = 5e15; // photons par seconde à pleine intensité
const N = 16; // photons dessinés
const CYCLE = 2.4, VOL = 0.4; // durée d'un cycle (s), fraction du cycle passée en vol par le photon
const SRC = { x: 498, y: 71 }; // sortie de la lampe
const X_ANODE = 500;
const EXPOSANTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** Exposant d'une puissance de dix en caractères supérieurs : "-34" devient "⁻³⁴". */
const exposant = (e: string) => [...e].map((ch) => (ch === '-' ? '⁻' : ch === '+' ? '' : EXPOSANTS[Number(ch)])).join('');

// Teinte de la lumière selon la fréquence (10^14 Hz), du rouge à l'ultraviolet.
const SPECTRE: [number, string][] = [[4, C.corail], [4.9, C.orange], [5.2, C.jaune], [5.7, C.menthe], [6.3, C.cyan], [6.9, C.bleu], [7.7, C.violet], [13, C.verre]];
function teinte(nu: number) {
  let i = 0;
  while (i < SPECTRE.length - 2 && nu > SPECTRE[i + 1][0]) i++;
  const [a, ca] = SPECTRE[i], [b, cb] = SPECTRE[i + 1];
  return mix(ca, cb, (nu - a) / (b - a));
}
const domaine = (nu: number) =>
  nu < 4.8 ? 'rouge' : nu < 5.1 ? 'orange' : nu < 5.3 ? 'jaune' : nu < 6.1 ? 'vert' : nu < 6.7 ? 'bleu' : nu < 7.9 ? 'violet' : 'ultraviolet';

/** Abscisse de la face éclairée de la cathode (plaque incurvée) à l'ordonnée y. */
const xCathode = (y: number) => {
  const s = clamp((y - 178) / 124);
  return 219 - 48 * s * (1 - s);
};

export default definirScene({
  etapes: [
    { titre: 'Monter la cellule photoélectrique', duree: 6, texte: 'Dans une ampoule vidée de son air, une <strong>cathode</strong> métallique fait face à une <strong>anode</strong>. Un microampèremètre ferme le circuit : il mesure le courant dû aux électrons arrachés au métal.' },
    { titre: 'Éclairer en lumière rouge', duree: 8, texte: 'Les photons rouges frappent la cathode, mais <strong>aucun électron</strong> ne sort. On pousse l\'intensité au maximum : toujours rien. La fréquence est sous le <strong>seuil</strong>.' },
    { titre: 'Augmenter la fréquence', duree: 12, texte: 'On balaie le spectre vers le violet puis l\'ultraviolet. Dès que <strong>ν &gt; ν<sub>0</sub></strong>, les électrons jaillissent, et ils sont de plus en plus <strong>rapides</strong> : chaque fréquence donne un point E<sub>c max</sub>.' },
    { titre: 'Faire varier l\'intensité', duree: 8, texte: 'À fréquence fixée, plus de lumière signifie plus de photons, donc <strong>plus d\'électrons</strong> et un courant plus fort. Leur énergie cinétique, elle, <strong>ne change pas</strong>.' },
    { titre: 'Tracer la droite, mesurer h', duree: 7, texte: 'Les points s\'alignent : <strong>E<sub>c max</sub> = h·ν - W</strong>. La pente donne la constante de Planck, l\'ordonnée à l\'origine le travail d\'extraction. Changez de métal, de fréquence, d\'intensité.' },
  ],
  parametres: [
    { id: 'w', label: 'Travail d\'extraction W', min: 2.1, max: 4.3, pas: 0.1, valeur: 2.3, unite: 'eV', decimales: 1 },
    { id: 'nu', label: 'Fréquence de la lampe', min: 4, max: 12, pas: 0.1, valeur: 7.5, unite: '×10¹⁴ Hz', decimales: 1 },
    { id: 'i', label: 'Intensité lumineuse', min: 10, max: 100, pas: 10, valeur: 60, unite: '%' },
  ],
  graphique: {
    x: { label: 'ν (10¹⁴ Hz)', min: 0, max: 13, pas: 2 },
    y: { label: 'Ec max (eV)', min: -5, max: 3, pas: 1 },
  },
  affiche: { etape: 2, t: 0.8 },

  monter({ scene, graphique }) {
    paillasse(scene);

    // Circuit : anode, microampèremètre, cathode.
    const fil = el('path', { d: `M${X_ANODE} 290V403H212V304`, fill: 'none', stroke: C.metal, 'stroke-width': TRAIT, 'stroke-linejoin': 'round' }, scene);
    const L = fil.getTotalLength();
    const porteurs = Array.from({ length: 8 }, () => el('circle', { r: 3, fill: C.cyan }, scene));
    const amp = appareil(scene, { x: 281, y: 366, w: 150, h: 72, titre: 'AMPÈREMÈTRE', couleur: C.cyan });

    // Ampoule à vide, cathode incurvée, anode en tige.
    const ampoule = el('g', {}, scene);
    el('rect', { x: 150, y: 150, width: 400, height: 180, rx: 78, fill: 'rgba(223,230,255,.05)', stroke: C.verre, 'stroke-width': TRAIT }, ampoule);
    el('path', { d: 'M196 172Q260 158 330 158', fill: 'none', stroke: C.blanc, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.35 }, ampoule);
    const cathode = el('g', {}, scene);
    el('path', { d: 'M214 178Q190 240 214 302', fill: 'none', stroke: C.metal, 'stroke-width': 8, 'stroke-linecap': 'round' }, cathode);
    etiquette(cathode, { x: 140, y: 236, texte: 'Cathode', ancre: 'end' });
    const etiqMetal = etiquette(cathode, { x: 140, y: 255, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.discret });
    const anode = el('g', {}, scene);
    el('line', { x1: X_ANODE, x2: X_ANODE, y1: 188, y2: 292, stroke: C.verre, 'stroke-width': 5, 'stroke-linecap': 'round' }, anode);
    etiquette(anode, { x: 562, y: 245, texte: 'Anode' });

    // Faisceau, photons, impacts, électrons.
    const faisceau = el('polygon', { points: `${SRC.x - 3},${SRC.y - 5} ${SRC.x + 3},${SRC.y + 5} ${xCathode(290)},290 ${xCathode(190)},190` }, scene);
    const r = rng(7);
    const grains = Array.from({ length: N }, (_, i) => {
      const y = 196 + r() * 88;
      const cible = { x: xCathode(y), y };
      return {
        ph: (i * 0.618 + r() * 0.03) % 1,
        dy: (r() - 0.5) * 6,
        cible,
        angle: (Math.atan2(cible.y - SRC.y, cible.x - SRC.x) * 180) / Math.PI,
        photon: el('path', { fill: 'none', 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, scene),
        impact: el('circle', { cx: cible.x, cy: cible.y, fill: 'none', 'stroke-width': 2 }, scene),
        sillage: el('line', { stroke: C.blanc, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.35 }, scene),
        electron: el('circle', { r: 4.5, fill: C.blanc, stroke: C.cyan, 'stroke-width': 2 }, scene),
      };
    });
    const etat = etiquette(scene, { x: 355, y: 319, texte: '', ancre: 'middle', taille: 13 });

    // Lampe orientée vers la cathode.
    const lampe = el('g', {}, scene);
    const corps = el('g', { transform: `translate(${SRC.x + 2} ${SRC.y - 1}) rotate(150)` }, lampe);
    el('rect', { x: -56, y: -18, width: 50, height: 36, rx: 8, fill: C.panneau, stroke: C.metal, 'stroke-width': TRAIT }, corps);
    el('rect', { x: -66, y: -8, width: 10, height: 16, rx: 3, fill: C.metal }, corps);
    const lentille = el('rect', { x: -8, y: -14, width: 9, height: 28, rx: 4, fill: C.grille, stroke: C.verre, 'stroke-width': 1.5 }, corps);
    const etiqLampe = etiquette(scene, { x: 624, y: 112, texte: 'Lampe', ancre: 'end' });
    const etiqLambda = etiquette(scene, { x: 624, y: 131, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.discret });

    // Encart de résultat (dernière étape).
    const encart = el('g', {}, scene);
    el('rect', { x: 16, y: 22, width: 238, height: 116, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 32, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(46, 13, C.discret, POLICE).textContent = 'Relation d\'Einstein';
    ligne(70, 15, C.texte).textContent = 'Ec max = h·ν - W';
    const resH = ligne(98, 15, C.jaune), resW = ligne(122, 14, C.jaune);

    const NUS = Array.from({ length: 16 }, (_, k) => 4.5 + 0.5 * k); // fréquences relevées pendant le balayage

    return (img) => {
      const { T, p } = img;
      const w = p.w, nu0 = frequenceSeuil(w) / U;
      const a0 = avancement(img, 0), a1 = avancement(img, 1), a2 = avancement(img, 2), a3 = avancement(img, 3), a4 = avancement(img, 4);

      // Étape 1 : le montage se construit, la lampe arrive en dernier.
      show(ampoule, seg(a0, 0, 0.25), 20);
      show(cathode, seg(a0, 0.18, 0.4, ease.out), 14);
      show(anode, seg(a0, 0.3, 0.52, ease.out), 14);
      trace(fil, seg(a0, 0.45, 0.72));
      show(amp.g, seg(a0, 0.58, 0.8, ease.backOut), 18);
      lampe.style.transform = `translate(${lerp(90, 0, seg(a0, 0.72, 1, ease.out))}px, ${lerp(-130, 0, seg(a0, 0.72, 1, ease.out))}px)`;
      show(etiqLampe, seg(a0, 0.9, 1));
      show(etiqLambda, seg(a0, 0.9, 1));
      etiqMetal.textContent = metal(w) ?? `W = ${fmt(w, 1)} eV`;

      // État de la lampe : fréquence et intensité, fonctions de l'image seule.
      const on = seg(a1, 0, 0.1);
      const nu = lerp(lerp(NU_ROUGE, NU_MAX, seg(a2, 0.08, 0.95, ease.lin)), p.nu, seg(a3, 0, 0.2));
      let int = lerp(0.3, 1, seg(a1, 0.4, 0.7));
      int = lerp(int, 0.5, seg(a2, 0, 0.08));
      int = lerp(lerp(int, 0.12, seg(a3, 0.2, 0.4)), p.i / 100, seg(a3, 0.45, 0.9));
      const ec = ecMax(nu * U, w), emet = ec > 0 && on > 0;
      const vPx = 195 + 400 * (vitesseMax(nu * U, w) / 1e6);
      const coul = teinte(nu);
      const iMicro = on > 0 ? courant(int * DEBIT, nu * U, w) * 1e6 : 0;

      lentille.setAttribute('fill', on > 0 ? coul : C.grille);
      set(faisceau, { fill: coul, opacity: on * (0.05 + 0.15 * int) });
      etiqLambda.textContent = `${fmt(longueurOnde(nu * U) * 1e9, 0)} nm, ${domaine(nu)}`;

      // Photons en vol, puis électrons arrachés (seulement au-dessus du seuil).
      const k = 0.22 + 0.065 * (nu - 4);
      let d = '';
      for (let x = -12; x <= 12; x += 1.5) d += `${x === -12 ? 'M' : 'L'}${x} ${(3.6 * Math.sin(x * k)).toFixed(1)}`;
      grains.forEach((g, i) => {
        const actif = on > 0 && (i + 0.5) / N <= int;
        const c = (T / CYCLE + g.ph) % 1;
        const vol = c / VOL;
        if (actif && vol < 1) {
          set(g.photon, { d, stroke: coul, opacity: on * Math.min(1, vol * 8), transform: `translate(${lerp(SRC.x, g.cible.x, vol).toFixed(1)} ${lerp(SRC.y + g.dy, g.cible.y, vol).toFixed(1)}) rotate(${g.angle.toFixed(1)})` });
        } else g.photon.setAttribute('opacity', '0');
        const f = (c - VOL) / 0.09;
        set(g.impact, { r: 3 + 11 * clamp(f), stroke: emet ? C.blanc : coul, opacity: actif && f >= 0 && f < 1 ? 0.8 * (1 - f) : 0 });
        const tau = (c - VOL) * CYCLE, x = g.cible.x + 6 + vPx * tau;
        const visible = actif && emet && tau >= 0 && x < X_ANODE - 5;
        set(g.electron, { cx: x, cy: g.cible.y, opacity: visible ? 1 - seg(c, 0.94, 1) : 0 });
        set(g.sillage, { x1: Math.max(g.cible.x + 4, x - vPx * 0.07), x2: x, y1: g.cible.y, y2: g.cible.y, opacity: visible ? 0.35 : 0 });
      });

      // Le courant circule dans le fil et s'affiche.
      porteurs.forEach((n, j) => {
        const pt = fil.getPointAtLength(((T * 0.22 + j / 8) % 1) * L);
        set(n, { cx: pt.x, cy: pt.y, opacity: emet && (j + 0.5) / 8 <= int + 0.1 && pt.y > 334 ? 0.9 : 0 });
      });
      amp.affiche(a0 > 0.8 ? `${fmt(iMicro, 2)} µA` : '');
      etat.textContent = emet ? 'Électrons émis : h·ν > W' : 'Aucun électron : h·ν < W';
      etat.setAttribute('fill', emet ? C.menthe : C.corail);
      etat.style.opacity = String(seg(a1, 0.2, 0.32));

      // Encart final.
      const mesures = NUS.map((x): [number, number] => [x, ecMax(x * U, w)]);
      const fit = droite(mesures.filter(([, y]) => y > 0).map(([x, y]): [number, number] => [x * U, y]));
      show(encart, seg(a4, 0.55, 0.8, ease.backOut), 16);
      const [mant, exp] = fit.h.toExponential(2).split('e');
      resH.textContent = `h = ${mant.replace('.', ',')} × 10${exposant(exp)} J·s`;
      resW.textContent = `W = ${fmt(fit.w, 1)} eV${metal(fit.w) ? ` (${metal(fit.w)})` : ''}`;

      if (graphique) {
        const pts: [number, number][] = [];
        if (a2 > 0) for (let x = NU_ROUGE; x <= lerp(NU_ROUGE, NU_MAX, seg(a2, 0.08, 0.95, ease.lin)) + 1e-9; x += 0.05) pts.push([x, ecMax(x * U, w)]);
        graphique.courbe('ec', pts, { couleur: C.cyan, epaisseur: 3 });
        graphique.nuage('points', a2 > 0 ? mesures.filter(([x]) => x <= (a2 >= 1 ? NU_MAX : nu) + 1e-9) : [], { couleur: C.jaune, rayon: 4 });
        if (on > 0) graphique.repere('mesure', nu, ec, { couleur: C.blanc, rayon: 4, label: img.etape === 1 ? `Ec max = ${fmt(ec, 2)} eV` : undefined });
        else graphique.effacer('mesure');
        if (img.etape === 3 && emet && a3 > 0.4) {
          graphique.horizontale('palier', ec, { couleur: C.menthe });
          graphique.repere('palierY', 0, ec, { couleur: C.menthe, rayon: 4, label: `Ec max = ${fmt(ec, 2)} eV, inchangée` });
          graphique.opacite('palier', seg(a3, 0.4, 0.55));
          graphique.opacite('palierY', seg(a3, 0.4, 0.55));
        } else {
          graphique.effacer('palier');
          graphique.effacer('palierY');
        }
        if (a4 > 0) {
          const xd = 13 * (1 - seg(a4, 0.05, 0.5));
          graphique.courbe('droite', [[xd, energiePhoton(xd * U) - w], [13, energiePhoton(13 * U) - w]], { couleur: C.rose, epaisseur: 2, pointille: true });
          graphique.verticale('nu0', nu0, { couleur: C.jaune, label: `ν0 = ${fmt(nu0, 2)} × 10¹⁴ Hz` });
          graphique.opacite('nu0', seg(a4, 0.3, 0.45));
          graphique.repere('w', 0, -w, { couleur: C.rose, label: `-W = -${fmt(w, 1)} eV` });
          graphique.opacite('w', seg(a4, 0.5, 0.62));
        } else {
          graphique.effacer('droite');
          graphique.effacer('nu0');
          graphique.effacer('w');
        }
      }

      return [
        { label: 'Fréquence', valeur: on > 0 ? `${fmt(nu, 2)} × 10¹⁴ Hz` : '...' },
        { label: 'Énergie du photon', valeur: on > 0 ? `${fmt(energiePhoton(nu * U), 2)} eV` : '...' },
        { label: 'Ec max des électrons', valeur: on > 0 ? `${fmt(ec, 2)} eV` : '...' },
        { label: 'Courant', valeur: `${fmt(iMicro, 2)} µA` },
      ];
    };
  },
});
