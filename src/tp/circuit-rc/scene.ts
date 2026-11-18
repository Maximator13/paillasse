import { L, avancement, clamp, ease, el, fmt, lerp, mix, seg, set, show, texte, trace } from '../../lib/anim';
import { etiquette, fleche } from '../../lib/labkit';
import { C, MONO, TRAIT, themeSombre } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { courbe, etat, tau, type CircuitRC } from './model';

const T_BASCULE = 5; // s, durée de la charge avant de basculer K
const T_MAX = 10; // s, durée totale de l'acquisition
const U_MAX = 7; // V, haut du graphique
const PAS_PORTEURS = 40; // px entre deux porteurs
const PX_PAR_MC = 120; // déplacement des porteurs par millicoulomb transféré
const N_SIGNES = 8;
const ANGLE_K = 21.8; // degrés, inclinaison du levier sur un plot

// Trajets des électrons, de l'armature du haut vers celle du bas.
const TRAJET_1 = 'M500 222V110H250L205 92H90V370H500V258'; // K en 1 : par le générateur
const TRAJET_2 = 'M500 222V110H250L205 128V370H500V258'; // K en 2 : boucle de décharge

export default definirScene({
  etapes: [
    { titre: L('Réaliser le montage', 'Build the circuit'), duree: 6, texte: L('Un générateur de tension <strong>E</strong>, un conducteur ohmique <strong>R</strong> et un condensateur <strong>C</strong> sont montés en série. L\'inverseur <strong>K</strong> choisit entre la charge (position 1) et la décharge (position 2).', 'A voltage supply <strong>E</strong>, a resistor <strong>R</strong> and a capacitor <strong>C</strong> are connected in series. The two-way switch <strong>K</strong> selects charging (position 1) or discharging (position 2).') },
    { titre: L('Charger le condensateur', 'Charge the capacitor'), duree: 10, texte: L('K bascule en position 1. Les électrons quittent l\'armature du haut et s\'accumulent sur celle du bas : <strong>u<sub>C</sub></strong> monte vers E pendant que l\'intensité <strong>i</strong> s\'éteint.', 'K moves to position 1. Electrons leave the top plate and build up on the bottom one: <strong>u<sub>C</sub></strong> rises towards E while the current <strong>i</strong> dies away.') },
    { titre: L('Décharger dans la résistance', 'Discharge through the resistor'), duree: 10, texte: L('K bascule en position 2 : le générateur est hors circuit. Les électrons repartent en sens inverse, <strong>i change de signe</strong> et u<sub>C</sub> décroît vers zéro.', 'K moves to position 2: the supply is out of the circuit. The electrons flow back the other way, <strong>i changes sign</strong> and u<sub>C</sub> decays towards zero.') },
    { titre: L('Mesurer le temps caractéristique', 'Measure the time constant'), duree: 7, texte: L('La tangente à l\'origine coupe l\'asymptote u<sub>C</sub> = E à la date <strong>τ</strong>. À cet instant, le condensateur est chargé à <strong>63 %</strong>.', 'The tangent at the origin meets the asymptote u<sub>C</sub> = E at time <strong>τ</strong>. At that instant, the capacitor is <strong>63%</strong> charged.') },
    { titre: L('Vérifier τ = R·C', 'Check τ = R·C'), duree: 5, texte: L('La valeur lue est égale au produit <strong>R·C</strong>. Modifiez R, C ou E : lesquels changent la durée de la charge ?', 'The value read is equal to the product <strong>R·C</strong>. Change R, C or E: which ones alter how long charging takes?') },
  ],
  parametres: [
    { id: 'r', label: L('Résistance R', 'Resistance R'), min: 1, max: 4, pas: 0.5, valeur: 2, unite: 'kΩ', decimales: 1 },
    { id: 'c', label: L('Capacité C', 'Capacitance C'), min: 200, max: 1000, pas: 100, valeur: 500, unite: 'µF', decimales: 0 },
    { id: 'e', label: L('Tension E', 'Voltage E'), min: 2, max: 6, pas: 0.5, valeur: 5, unite: 'V', decimales: 1 },
  ],
  graphique: {
    x: { label: 't (s)', min: 0, max: T_MAX, pas: 1 },
    y: { label: 'uC (V)', min: 0, max: U_MAX, pas: 1 },
  },
  affiche: { etape: 2, t: 0.3 },

  monter({ scene, graphique }) {
    const fil = { fill: 'none', stroke: C.trait, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as const;

    // Fils du circuit (tracés à l'étape 1).
    const fils = el('path', { d: 'M205 92H90V370H500V258M500 222V110H390M310 110H250M205 128V370', ...fil }, scene);

    // Générateur idéal de tension.
    const gGen = el('g', {}, scene);
    el('circle', { cx: 92, cy: 234, r: 23, fill: C.ombre, opacity: 0.12 }, gGen); // ombre portée, comme la verrerie
    el('circle', { cx: 90, cy: 231, r: 22, fill: C.panneau, stroke: C.trait, 'stroke-width': TRAIT }, gGen);
    el('line', { x1: 90, x2: 90, y1: 209, y2: 253, stroke: C.trait, 'stroke-width': TRAIT }, gGen);
    etiquette(gGen, { x: 104, y: 200, texte: '+', couleur: C.corail, taille: 17 });
    fleche(gGen, { x1: 46, y1: 262, x2: 46, y2: 200, couleur: C.menthe });
    const etiqE = etiquette(gGen, { x: 120, y: 236, texte: '', mono: true, taille: 13, couleur: C.menthe });

    // Inverseur K.
    const gK = el('g', {}, scene);
    const levier = el('line', { x1: 250, y1: 110, x2: 201.5, y2: 110, stroke: C.orange, 'stroke-width': 4, 'stroke-linecap': 'round' }, gK);
    for (const [x, y] of [[205, 92], [205, 128], [250, 110]]) el('circle', { cx: x, cy: y, r: 4.5, fill: C.fond, stroke: C.trait, 'stroke-width': 2 }, gK);
    etiquette(gK, { x: 252, y: 92, texte: 'K', couleur: C.orange });
    etiquette(gK, { x: 192, y: 80, texte: '1', taille: 14, couleur: C.discret });
    etiquette(gK, { x: 220, y: 150, texte: '2', taille: 14, couleur: C.discret });

    // Conducteur ohmique.
    const gR = el('g', {}, scene);
    el('rect', { x: 312, y: 101, width: 80, height: 24, rx: 3, fill: C.ombre, opacity: 0.12 }, gR);
    el('rect', { x: 310, y: 98, width: 80, height: 24, rx: 3, fill: C.panneau, stroke: C.trait, 'stroke-width': TRAIT }, gR);
    const etiqR = etiquette(gR, { x: 350, y: 84, texte: '', ancre: 'middle', mono: true, taille: 14 });

    // Condensateur : armatures, champ, charges.
    const gC = el('g', {}, scene);
    const champ = el('rect', { x: 457, y: 225, width: 86, height: 30, fill: C.jaune, opacity: 0 }, gC);
    const armHaut = el('line', { x1: 455, x2: 545, y1: 222, y2: 222, 'stroke-width': 5, 'stroke-linecap': 'round' }, gC);
    const armBas = el('line', { x1: 455, x2: 545, y1: 258, y2: 258, 'stroke-width': 5, 'stroke-linecap': 'round' }, gC);
    const etiqC = etiquette(gC, { x: 516, y: 322, texte: '', mono: true, taille: 14 });
    const ordre = [3, 4, 2, 5, 1, 6, 0, 7]; // les charges se déposent du centre vers les bords
    const signe = (j: number, y: number, s: string, couleur: string) =>
      texte(gC, 461.5 + ordre[j] * 11, y, s, { fill: couleur, 'font-family': MONO, 'font-size': 16, 'font-weight': 700, 'text-anchor': 'middle' });
    const plus = ordre.map((_, j) => signe(j, 213, '+', C.corail));
    const moins = ordre.map((_, j) => signe(j, 279, '−', C.bleu));

    // Grandeurs fléchées.
    const gMes = el('g', {}, scene);
    const flecheI = fleche(gMes, { x1: 436, y1: 134, x2: 436, y2: 134, couleur: C.jaune });
    const etiqI = etiquette(gMes, { x: 436, y: 160, texte: '', ancre: 'middle', mono: true, taille: 13, couleur: C.jaune });
    const flecheU = fleche(gMes, { x1: 585, y1: 240, x2: 585, y2: 240, couleur: C.cyan });
    const etiqU = etiquette(gMes, { x: 624, y: 182, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.cyan });
    const etiqQ = etiquette(gMes, { x: 440, y: 245, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.corail });

    // Porteurs de charge : un jeu de points par trajet.
    const gPorteurs = el('g', {}, scene);
    const jeu = (d: string) => {
      const chemin = el('path', { d, fill: 'none', stroke: 'none' }, gPorteurs);
      const L = chemin.getTotalLength(), n = Math.ceil(L / PAS_PORTEURS);
      const g = el('g', {}, gPorteurs);
      const pts = Array.from({ length: n }, () => el('circle', { r: 3.6, fill: C.bleu, stroke: C.fond, 'stroke-width': 1 }, g));
      return {
        maj(decalage: number, opacite: number) {
          g.style.opacity = String(opacite);
          if (opacite <= 0) return;
          pts.forEach((c, j) => {
            const s = (j * PAS_PORTEURS + decalage) % (n * PAS_PORTEURS);
            const pt = chemin.getPointAtLength(Math.min(s, L));
            set(c, { cx: pt.x, cy: pt.y, opacity: s > L ? 0 : clamp(Math.min(s, L - s) / 12) });
          });
        },
      };
    };
    const porteurs1 = jeu(TRAJET_1), porteurs2 = jeu(TRAJET_2);
    const legende = el('g', {}, scene);
    el('circle', { cx: 240, cy: 340, r: 3.6, fill: C.bleu }, legende);
    etiquette(legende, { x: 252, y: 345, texte: L('électrons', 'electrons'), taille: 13, couleur: C.bleu });

    const titre = etiquette(scene, { x: 320, y: 46, texte: '', ancre: 'middle', taille: 17 });

    // Encart de résultat (étapes 4 et 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 150, y: 392, width: 340, height: 72, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, couleur: string) =>
      el('text', { x: 320, y, fill: couleur, 'font-family': MONO, 'font-size': 14, 'font-weight': 600, 'text-anchor': 'middle' }, encart);
    const ligne63 = ligne(420, C.texte), ligneTau = ligne(447, C.jaune);

    let cle = '', pts: [number, number][] = [];

    return (img) => {
      const { p } = img;
      const k: CircuitRC = { e: p.e, r: p.r * 1e3, c: p.c * 1e-6 };
      const tc = tau(k);
      if (cle !== `${p.e}|${p.r}|${p.c}`) {
        cle = `${p.e}|${p.r}|${p.c}`;
        pts = courbe(k, T_BASCULE, T_MAX);
      }
      const a0 = avancement(img, 0), a1 = avancement(img, 1), a2 = avancement(img, 2), a3 = avancement(img, 3), a4 = avancement(img, 4);

      // Étape 1 : le schéma se trace, les dipôles se posent l'un après l'autre.
      trace(fils, seg(a0, 0, 0.55));
      show(gGen, seg(a0, 0.12, 0.32, ease.backOut));
      show(gK, seg(a0, 0.3, 0.5, ease.backOut));
      show(gR, seg(a0, 0.45, 0.65, ease.backOut));
      show(gC, seg(a0, 0.6, 0.8, ease.backOut));
      show(gMes, seg(a0, 0.8, 1));
      etiqE.textContent = `E = ${fmt(p.e, 1)} V`;
      etiqR.textContent = `R = ${fmt(p.r, 1)} kΩ`;
      etiqC.textContent = `C = ${fmt(p.c, 0)} µF`;

      // Étapes 2 et 3 : K bascule, puis le temps s'écoule.
      const k1 = seg(a1, 0, 0.06, ease.backOut), k2 = seg(a2, 0, 0.06);
      levier.setAttribute('transform', `rotate(${ANGLE_K * (k1 - 2 * k2)} 250 110)`);
      const t = T_BASCULE * (seg(a1, 0.06, 1, ease.lin) + seg(a2, 0.06, 1, ease.lin));
      const e = etat(t, k, T_BASCULE);
      const enTransit = a1 < 0.06 || (a2 > 0 && a2 < 0.06); // levier entre deux plots : circuit ouvert, aucun courant
      const { uC, q } = e, i = enTransit ? 0 : e.i;
      const iTexte = fmt(Math.abs(i) < 5e-6 ? 0 : i * 1e3, 2); // pas de « -0,00 »
      titre.textContent = a1 <= 0 ? L('Circuit RC série', 'Series RC circuit') : a2 <= 0 ? L('Charge : K en position 1', 'Charging: K in position 1') : L('Décharge : K en position 2', 'Discharging: K in position 2');
      titre.setAttribute('fill', a1 <= 0 ? C.texte : a2 <= 0 ? C.corail : C.bleu);

      // Porteurs : leur déplacement est proportionnel à la charge transférée, donc leur débit suit i(t).
      const decalage = PX_PAR_MC * q * 1e3;
      const visibles = clamp(a1 / 0.06);
      porteurs1.maj(decalage, visibles * (1 - k2));
      porteurs2.maj(decalage, k2);
      legende.style.opacity = String(visibles);

      // Condensateur : charges sur les armatures, champ entre elles.
      const plein = Math.sqrt(q / 6e-3) * N_SIGNES; // 6 mC : charge maximale sur la plage des curseurs
      plus.forEach((s, j) => { s.style.opacity = String(clamp(plein - j)); });
      moins.forEach((s, j) => { s.style.opacity = String(clamp(plein - j)); });
      champ.setAttribute('opacity', String((themeSombre() ? 0.4 : 0.2) * (uC / 6))); // le jaune clair est foncé : aplat plus léger sur blanc
      armHaut.setAttribute('stroke', mix(C.trait, C.corail, uC / 6));
      armBas.setAttribute('stroke', mix(C.trait, C.bleu, uC / 6));

      // Flèches i (sens conventionnel, vers l'armature du haut quand i > 0) et uC.
      const li0 = 70 * Math.sqrt(Math.abs(i) / 6e-3) * Math.sign(i);
      const li = Math.abs(li0) < 6 ? 0 : li0; // trop courte, la flèche ne serait qu'un point parasite
      flecheI.maj(436 - li / 2, 134, 436 + li / 2, 134);
      etiqI.textContent = `i = ${iTexte} mA`;
      const lu = 90 * (uC / U_MAX);
      flecheU.maj(585, 240 + lu / 2, 585, 240 - lu / 2);
      etiqU.textContent = `uC = ${fmt(uC, 2)} V`;
      etiqQ.textContent = `q = ${fmt(q * 1e3, 2)} mC`;

      // Étapes 4 et 5 : exploitation.
      const u63 = k.e * (1 - Math.exp(-1));
      show(encart, seg(a3, 0.55, 0.8, ease.backOut), 16);
      ligne63.textContent = L(`À t = τ : uC = 0,63·E = ${fmt(u63, 2)} V`, `At t = τ: uC = 0.63·E = ${fmt(u63, 2)} V`);
      ligneTau.textContent = `τ = R·C = ${fmt(p.r, 1)} kΩ × ${fmt(p.c, 0)} µF = ${fmt(tc, 2)} s`;
      ligneTau.style.opacity = String(seg(a4, 0.05, 0.4));

      if (graphique) {
        graphique.horizontale('E', k.e, { label: `E = ${fmt(k.e, 1)} V`, couleur: C.menthe });
        graphique.opacite('E', seg(a0, 0.8, 1));
        graphique.courbe('uc', a1 > 0 ? [...pts.filter(([x]) => x < t), [t, uC]] : [], { couleur: C.cyan, epaisseur: 3 });
        if (a2 > 0) graphique.verticale('bascule', T_BASCULE, { couleur: C.orange });
        else graphique.effacer('bascule');
        if (a1 > 0 && a2 < 1) graphique.repere('mesure', t, uC, { couleur: C.texte, rayon: 4 });
        else graphique.effacer('mesure');

        // Tangente à l'origine, prolongée jusqu'à l'asymptote, puis lecture de tau.
        const pt = seg(a3, 0.05, 0.4);
        graphique.courbe('tangente', a3 > 0 ? [[0, 0], [tc * pt, k.e * pt]] : [], { couleur: C.rose, epaisseur: 2, pointille: true });
        if (a3 > 0.4) {
          graphique.verticale('tau', tc, { couleur: C.jaune, label: tc < 1 || tc > 3.6 ? 'τ' : `τ = ${fmt(tc, 2)} s` }); // étiquette courte près de l'axe vertical ou du repère de bascule
          graphique.opacite('tau', seg(a3, 0.4, 0.6));
          graphique.repere('p63', tc, u63, { couleur: C.jaune, label: tc < 3.4 ? L('0,63·E', '0.63·E') : undefined }); // sinon l'étiquette chevauche le repère de bascule
          graphique.opacite('p63', seg(a3, 0.6, 0.8));
        } else {
          graphique.effacer('tau');
          graphique.effacer('p63');
        }
      }

      return [
        { label: L('Date t', 'Time t'), valeur: `${fmt(t, 2)} s` },
        { label: L('Tension uC', 'Voltage uC'), valeur: `${fmt(uC, 2)} V` },
        { label: L('Intensité i', 'Current i'), valeur: `${iTexte} mA` },
        a3 > 0.4 ? { label: L('Temps caractéristique τ', 'Time constant τ'), valeur: `${fmt(tc, 2)} s` } : { label: 'Charge q', valeur: `${fmt(q * 1e3, 2)} mC` },
      ];
    };
  },
});
