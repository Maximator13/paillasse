import { avancement, ease, el, fmt, L, lerp, mix, rng, seg, set, show, trace, uid } from '../../lib/anim';
import { appareil, becher, etiquette, fleche, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { charge, quantiteElectrons, tension, volumeH2, volumeO2 } from './model';

const SOLUTION = mix(C.bleu, C.verre, 0.35);
const X_CATHODE = 165, X_ANODE = 275; // axes des deux tubes
const Y_HAUT = 118, Y_BAS = 404, R = 17; // tube retourné : sommet fermé, ouverture en bas
const Y_ZERO = 120, PX_PAR_ML = 4.2; // graduation : le gaz s'accumule depuis le sommet
const yGaz = (v: number) => Y_ZERO + PX_PAR_ML * v;

/** Tube à essai gradué retourné sur une électrode : plein de solution, le gaz chasse le liquide par le haut. */
function tubeRetourne(parent: Element, cx: number, couleur: string) {
  const g = el('g', {}, parent);
  const id = uid('tube');
  const d = `M${cx - R} ${Y_BAS}V${Y_HAUT + R}A${R} ${R} 0 0 1 ${cx + R} ${Y_HAUT + R}V${Y_BAS}`;
  el('path', { d: d + 'Z' }, el('clipPath', { id }, g));
  const dedans = el('g', { 'clip-path': `url(#${id})` }, g);
  const liquide = el('rect', { x: cx - R, width: 2 * R, y: Y_HAUT, height: Y_BAS - Y_HAUT, fill: SOLUTION, opacity: 0.82 }, dedans);
  const gaz = el('rect', { x: cx - R, width: 2 * R, y: Y_HAUT, height: 0, fill: couleur, opacity: 0.22 }, dedans);
  const menisque = el('rect', { x: cx - R, width: 2 * R, height: 3, fill: couleur, opacity: 0 }, dedans);
  el('path', { d, fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  for (let v = 5; v <= 50; v += 5) {
    el('line', { x1: cx + R - (v % 10 ? 8 : 13), x2: cx + R - 2, y1: yGaz(v), y2: yGaz(v), stroke: C.verre, 'stroke-width': 1, opacity: 0.6 }, g);
  }
  return {
    g,
    maj(v: number) {
      const y = yGaz(v);
      set(liquide, { y, height: Y_BAS - y });
      set(gaz, { height: v > 0 ? y - Y_HAUT : 0 });
      set(menisque, { y: y - 1.5, opacity: v > 0.05 ? 0.9 : 0 });
    },
  };
}

/** Bulles qui naissent le long de l'électrode et montent jusqu'à la poche de gaz. */
function bullesElectrode(parent: Element, cx: number, n: number, graine: number, couleur: string) {
  const r = rng(graine);
  const bs = Array.from({ length: n }, () => ({ dx: (r() - 0.5) * 18, y0: 378 + r() * 34, v: 0.3 + r() * 0.35, ph: r(), ray: 1.6 + r() * 2.2, n: el('circle', { fill: 'none', stroke: couleur, 'stroke-width': 1.3 }, parent) }));
  return (T: number, intensite: number, ySommet: number) => {
    bs.forEach((b, i) => {
      const p = (T * b.v + b.ph) % 1, actif = intensite > 0.02 && i / n < 0.25 + intensite;
      set(b.n, { cx: cx + b.dx * (1 - 0.4 * p) + Math.sin(T * 3 + i) * 1.5, cy: lerp(b.y0, ySommet + 4, p), r: b.ray * (0.6 + 0.5 * p), opacity: actif ? 0.9 * Math.min(1, 4 * (1 - p)) * intensite ** 0.3 : 0 });
    });
  };
}

/** Électrons qui défilent le long d'un fil (chemin écrit dans le sens de leur déplacement). */
function electrons(parent: Element, fil: SVGPathElement, n: number) {
  const pts = Array.from({ length: n }, () => el('circle', { r: 3.4, fill: C.jaune, stroke: C.fond, 'stroke-width': 1 }, parent));
  return (T: number, vitesse: number, opacite: number) => {
    const L = fil.getTotalLength();
    pts.forEach((c, k) => {
      const pt = fil.getPointAtLength((T * vitesse + (k * L) / n) % L);
      set(c, { cx: pt.x, cy: pt.y, opacity: opacite });
    });
  };
}

export default definirScene({
  etapes: [
    { titre: L('Préparer l\'électrolyseur', 'Set up the electrolysis cell'), duree: 6, texte: L('La cuve est remplie d\'<strong>eau acidifiée</strong> (les ions rendent la solution conductrice). Deux tubes gradués, pleins de solution, sont retournés sur les électrodes.', 'The tank is filled with <strong>acidified water</strong> (the ions make the solution conduct). Two graduated tubes, full of solution, are inverted over the electrodes.') },
    { titre: L('Brancher le circuit', 'Connect the circuit'), duree: 6, texte: L('Le générateur de tension continue est relié en série à un <strong>ampèremètre</strong> et à l\'électrolyseur. L\'électrode reliée à la borne (−) est la <strong>cathode</strong>, l\'autre est l\'<strong>anode</strong>.', 'The DC power supply is connected in series with an <strong>ammeter</strong> and the electrolysis cell. The electrode connected to the (−) terminal is the <strong>cathode</strong>, the other is the <strong>anode</strong>.') },
    { titre: L('Imposer le courant', 'Drive the current'), duree: 6, texte: L('Le générateur <strong>force</strong> les électrons à circuler : ils arrivent à la cathode, où H<sup>+</sup> est réduit en H<sub>2</sub>, et quittent l\'anode, où l\'eau est oxydée en O<sub>2</sub>. Des bulles apparaissent.', 'The power supply <strong>forces</strong> the electrons to flow: they arrive at the cathode, where H<sup>+</sup> is reduced to H<sub>2</sub>, and leave the anode, where water is oxidised to O<sub>2</sub>. Bubbles appear.') },
    { titre: L('Recueillir les gaz', 'Collect the gases'), duree: 12, texte: L('On déclenche le chronomètre. Les gaz chassent la solution des tubes : le volume de <strong>dihydrogène</strong> est toujours le <strong>double</strong> de celui de dioxygène.', 'The stopwatch is started. The gases push the solution out of the tubes: the volume of <strong>hydrogen</strong> is always <strong>twice</strong> that of oxygen.') },
    { titre: L('Exploiter les mesures', 'Analyse the measurements'), duree: 7, texte: L('On ouvre le circuit. La charge <strong>Q = I·Δt</strong> donne la quantité d\'électrons <strong>n(e<sup>−</sup>) = Q/F</strong>, donc les volumes de gaz. Changez l\'intensité ou la durée et observez les tubes et les droites.', 'The circuit is opened. The charge <strong>Q = I·Δt</strong> gives the amount of electrons <strong>n(e<sup>−</sup>) = Q/F</strong>, and hence the volumes of gas. Change the current or the duration and watch the tubes and the lines.') },
  ],
  parametres: [
    { id: 'i', label: L('Intensité du courant', 'Current'), min: 0.3, max: 0.8, pas: 0.05, valeur: 0.5, unite: 'A', decimales: 2 },
    { id: 'dt', label: L('Durée de l\'électrolyse', 'Duration of the electrolysis'), min: 180, max: 480, pas: 30, valeur: 300, unite: 's', decimales: 0 },
  ],
  graphique: {
    x: { label: 't (s)', min: 0, max: 480, pas: 120 },
    y: { label: 'V (mL)', min: 0, max: 50, pas: 10 },
    titre: L('Volume de gaz recueilli', 'Volume of gas collected'),
  },
  affiche: { etape: 3, t: 0.8 },

  monter({ scene, graphique }) {
    paillasse(scene);

    // Fils (écrits dans le sens de déplacement des électrons).
    const fils = el('g', {}, scene);
    const fil = (d: string, couleur: string) => el('path', { d, fill: 'none', stroke: couleur, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, fils);
    const filCathode = fil('M470 410H440V456H70V430H95', C.bleu);
    const filAnode = fil('M345 430H392V287H470', C.corail);
    const filRetour = fil('M590 324V364', C.corail);
    const gElectrons = el('g', {}, scene);
    const eCathode = electrons(gElectrons, filCathode, 12);
    const eAnode = electrons(gElectrons, filAnode, 7);

    // Cuve sur son socle à bornes.
    const cuve = el('g', {}, scene);
    el('rect', { x: 85, y: 420, width: 270, height: 20, rx: 5, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, cuve);
    el('circle', { cx: 95, cy: 430, r: 5, fill: C.bleu }, cuve);
    el('circle', { cx: 345, cy: 430, r: 5, fill: C.corail }, cuve);
    const bac = becher(cuve, { x: 220, y: 420, w: 250, h: 140 });

    const tubeH2 = tubeRetourne(scene, X_CATHODE, C.cyan);
    const tubeO2 = tubeRetourne(scene, X_ANODE, C.corail);
    const gElectrodes = el('g', {}, scene);
    for (const x of [X_CATHODE, X_ANODE]) el('rect', { x: x - 3, y: 374, width: 6, height: 46, rx: 2, fill: C.metal, stroke: C.verre, 'stroke-width': 1.2 }, gElectrodes);
    const gBulles = el('g', {}, scene);
    const bullesH2 = bullesElectrode(gBulles, X_CATHODE, 16, 3, C.blanc);
    const bullesO2 = bullesElectrode(gBulles, X_ANODE, 8, 8, C.blanc);

    // Appareils.
    const gAppareils = el('g', {}, scene);
    const amp = appareil(gAppareils, { x: 470, y: 250, w: 140, h: 74, titre: L('AMPÈREMÈTRE', 'AMMETER'), couleur: C.jaune });
    const gen = appareil(gAppareils, { x: 470, y: 364, w: 140, h: 76, titre: L('GÉNÉRATEUR', 'POWER SUPPLY') });

    // Annotations.
    const gPoles = el('g', {}, scene);
    etiquette(gPoles, { x: 138, y: 250, texte: 'Cathode (−)', ancre: 'end', taille: 14, couleur: C.bleu });
    etiquette(gPoles, { x: 302, y: 250, texte: 'Anode (+)', taille: 14, couleur: C.corail });
    const gCourant = el('g', {}, scene);
    fleche(gCourant, { x1: 404, y1: 318, x2: 404, y2: 352, couleur: C.corail });
    etiquette(gCourant, { x: 412, y: 341, texte: 'I', couleur: C.corail });
    etiquette(gCourant, { x: 60, y: 424, texte: 'e−', ancre: 'end', couleur: C.jaune, mono: true });
    const gVolumes = el('g', {}, scene);
    etiquette(gVolumes, { x: X_CATHODE, y: 84, texte: 'H2', ancre: 'middle', couleur: C.cyan });
    etiquette(gVolumes, { x: X_ANODE, y: 84, texte: 'O2', ancre: 'middle', couleur: C.corail });
    const lectureH2 = etiquette(gVolumes, { x: X_CATHODE, y: 104, texte: '', ancre: 'middle', mono: true, taille: 13 });
    const lectureO2 = etiquette(gVolumes, { x: X_ANODE, y: 104, texte: '', ancre: 'middle', mono: true, taille: 13 });

    // Encart de résultat (dernière étape).
    const encart = el('g', {}, scene);
    el('rect', { x: 400, y: 88, width: 224, height: 126, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 414, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(112, 13, C.discret, POLICE).textContent = L('Bilan de l\'électrolyse', 'Electrolysis summary');
    const ligneQ = ligne(138, 13, C.texte), ligneN = ligne(162, 13, C.texte);
    ligne(194, 15, C.jaune).textContent = 'V(H2) = 2 × V(O2)';

    return ({ etape, t, T, p }) => {
      const img = { etape, t };
      const a1 = avancement(img, 0), a2 = avancement(img, 1), a3 = avancement(img, 2), a4 = avancement(img, 3), a5 = avancement(img, 4);

      // Grandeurs : le courant s'établit à l'étape 3, le chronomètre tourne à l'étape 4, on coupe à l'étape 5.
      const marche = seg(a3, 0.1, 0.45, ease.out) * (1 - seg(a5, 0.02, 0.14));
      const iCourant = p.i * marche;
      const duree = p.dt * a4;
      const vH2 = volumeH2(p.i, duree), vO2 = volumeO2(p.i, duree);
      const q = charge(p.i, duree);

      // Étape 1 : la cuve entre, se remplit, les tubes descendent sur les électrodes.
      show(cuve, seg(a1, 0, 0.18), 20);
      gElectrodes.style.opacity = String(seg(a1, 0, 0.18));
      bac.liquide(0.6 * seg(a1, 0.16, 0.5) + 0.0012 * (vH2 + vO2), SOLUTION);
      const descente = (n: SVGGElement, d: number, f: number) => {
        n.style.opacity = String(seg(a1, d, d + 0.08));
        n.style.transform = `translateY(${lerp(-330, 0, seg(a1, d, f, ease.out))}px)`;
      };
      descente(tubeH2.g, 0.5, 0.8);
      descente(tubeO2.g, 0.64, 0.94);

      // Étape 2 : appareils, fils tracés un à un, nom des électrodes.
      show(gAppareils, seg(a2, 0, 0.25, ease.out), 20);
      trace(filRetour, seg(a2, 0.25, 0.4));
      trace(filAnode, seg(a2, 0.35, 0.65));
      trace(filCathode, seg(a2, 0.5, 0.9));
      fils.style.opacity = a2 > 0 ? '1' : '0';
      show(gPoles, seg(a2, 0.75, 0.95));

      // Étape 3 : le courant circule, les électrons défilent, les bulles naissent.
      amp.affiche(`${fmt(iCourant, 2)} A`);
      gen.affiche(`${fmt(marche > 0.01 ? tension(iCourant) : 0, 1)} V`);
      const vitesse = 110 * p.i;
      eCathode(T, vitesse, marche);
      eAnode(T, vitesse, marche);
      gCourant.style.opacity = String(marche);
      const debit = marche * (p.i / 0.8);
      bullesH2(T, debit, yGaz(vH2));
      bullesO2(T, debit, yGaz(vO2));
      show(gVolumes, seg(a3, 0.55, 0.8));

      // Étape 4 : les gaz s'accumulent.
      tubeH2.maj(vH2);
      tubeO2.maj(vO2);
      lectureH2.textContent = `${fmt(vH2, 1)} mL`;
      lectureO2.textContent = `${fmt(vO2, 1)} mL`;

      // Étape 5 : bilan.
      show(encart, seg(a5, 0.2, 0.45, ease.backOut), 16);
      ligneQ.textContent = `Q = I·Δt = ${fmt(q, 0)} C`;
      ligneN.textContent = `n(e−) = Q/F = ${fmt(quantiteElectrons(q) * 1000, 2)} mmol`;

      if (graphique) {
        const fin = a5 > 0.2;
        graphique.courbe('h2', a4 > 0 ? [[0, 0], [duree, vH2]] : [], { couleur: C.cyan, epaisseur: 3 });
        graphique.courbe('o2', a4 > 0 ? [[0, 0], [duree, vO2]] : [], { couleur: C.corail, epaisseur: 3 });
        if (a4 > 0) {
          graphique.repere('ph2', duree, vH2, { couleur: C.cyan, label: fin ? L(`H2 : ${fmt(vH2, 1)} mL`, `H2: ${fmt(vH2, 1)} mL`) : 'H2' });
          graphique.repere('po2', duree, vO2, { couleur: C.corail, label: fin ? L(`O2 : ${fmt(vO2, 1)} mL`, `O2: ${fmt(vO2, 1)} mL`) : 'O2' });
        } else {
          graphique.effacer('ph2');
          graphique.effacer('po2');
        }
        if (fin) {
          graphique.verticale('dt', p.dt, { couleur: C.jaune });
          graphique.opacite('dt', seg(a5, 0.2, 0.4));
        } else graphique.effacer('dt');
      }

      return a5 > 0.2
        ? [
            { label: 'Charge Q', valeur: `${fmt(q, 0)} C` },
            { label: 'n(e−)', valeur: `${fmt(quantiteElectrons(q) * 1000, 2)} mmol` },
            { label: 'V(H2)', valeur: `${fmt(vH2, 1)} mL` },
            { label: 'V(O2)', valeur: `${fmt(vO2, 1)} mL` },
          ]
        : [
            { label: L('Intensité', 'Current'), valeur: `${fmt(iCourant, 2)} A` },
            { label: L('Durée', 'Duration'), valeur: `${fmt(duree, 0)} s` },
            { label: 'V(H2)', valeur: `${fmt(vH2, 1)} mL` },
            { label: 'V(O2)', valeur: `${fmt(vO2, 1)} mL` },
          ];
    };
  },
});
