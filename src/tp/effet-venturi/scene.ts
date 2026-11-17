import { avancement, clamp, ease, el, fmt, L, lerp, rng, seg, set, show, uid } from '../../lib/anim';
import { etiquette, fleche, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { G, TUBE, debitSI, debitVenturi, diametre, ecartPression, hauteur, positionAuTemps, pressionRelative, section, tempsParcours, vitesse, volumes } from './model';

const H0 = 0.36; // m, niveau de l'eau au repos au-dessus de l'axe (réservoir à niveau constant)
const RALENTI = 6; // l'écoulement est montré six fois plus lentement qu'en réalité
const PRISES = [0.06, 0.19, 0.35]; // m, abscisses des prises de pression : amont, col, aval
// Repère du dessin (schéma sans échelle commune) : abscisses, rayons et hauteurs d'eau ont chacun leur échelle.
const X0 = 40, AX = 340, ECH_X = 1400, ECH_R = 1500, ECH_H = 550;
const HAUT = 124, DEMI = 6, Y_REPOS = AX - ECH_H * H0;
const ECH_V = 34; // px par m/s pour les vecteurs vitesse
const DUREE_2 = 9, A0 = 0.28, A1 = 0.62; // étape 2 : la vanne s'ouvre entre A0 et A1

const X = (x: number) => X0 + ECH_X * x;
const rayon = (px: number, d: number) => ECH_R * diametre((px - X0) / ECH_X, d);
const frac = (v: number) => ((v % 1) + 1) % 1;
/** Intégrale de l'ouverture de la vanne (ease.inOut entre A0 et A1) de 0 à a : sert à faire démarrer les traceurs sans à-coup. */
const ouvertureCumulee = (a: number) => {
  const p = clamp((a - A0) / (A1 - A0));
  return (A1 - A0) * (p < 0.5 ? p ** 4 : p - 0.5 + (2 - 2 * p) ** 4 / 16) + Math.max(0, a - A1);
};

export default definirScene({
  etapes: [
    { titre: L('Découvrir le tube de Venturi', 'Meet the Venturi tube'), duree: 7, texte: L('Un tube horizontal de diamètre <strong>20 mm</strong> se resserre en un <strong>col</strong>, puis s\'évase. Trois tubes manométriques verticaux repèrent la pression. Eau au repos : le niveau est <strong>le même partout</strong>.', 'A horizontal tube of diameter <strong>20 mm</strong> narrows to a <strong>throat</strong>, then widens again. Three vertical manometer tubes indicate the pressure. Water at rest: the level is <strong>the same everywhere</strong>.') },
    { titre: L('Mettre l\'eau en écoulement', 'Start the water flowing'), duree: DUREE_2, texte: L('On ouvre la vanne de sortie : le régime devient permanent. Le débit volumique <strong>D<sub>v</sub> = v·S</strong> se conserve, donc les particules <strong>accélèrent</strong> là où la section diminue.', 'The outlet valve is opened: the flow becomes steady. The volume flow rate <strong>D<sub>v</sub> = v·S</strong> is conserved, so the particles <strong>speed up</strong> where the cross-section decreases.') },
    { titre: L('Lire les hauteurs manométriques', 'Read the manometer heights'), duree: 7, texte: L('Chaque hauteur d\'eau mesure la pression sous la prise : <strong>P = P<sub>atm</sub> + ρ·g·h</strong>. Le niveau est nettement plus bas au col : la pression y est <strong>plus faible</strong>, c\'est l\'effet Venturi.', 'Each height of water measures the pressure beneath the tapping: <strong>P = P<sub>atm</sub> + ρ·g·h</strong>. The level is clearly lower at the throat: the pressure there is <strong>lower</strong>, this is the Venturi effect.') },
    { titre: L('Appliquer la relation de Bernoulli', "Apply Bernoulli's equation"), duree: 9, texte: L('Le long d\'une ligne de courant horizontale, <strong>P + ½·ρ·v²</strong> reste constant : ce que le fluide gagne en vitesse (en vert), il le perd en pression. Le calcul redonne l\'écart mesuré.', 'Along a horizontal streamline, <strong>P + ½·ρ·v²</strong> stays constant: what the fluid gains in speed (in green), it loses in pressure. The calculation gives back the measured difference.') },
    { titre: L('Mesurer un débit', 'Measure a flow rate'), duree: 6, texte: L('La dénivellation <strong>Δh</strong> suffit pour remonter au débit : le tube de Venturi sert de débitmètre. Changez le débit ou le diamètre du col et observez les niveaux et les courbes.', 'The height difference <strong>Δh</strong> is enough to work back to the flow rate: the Venturi tube acts as a flow meter. Change the flow rate or the throat diameter and watch the levels and the curves.') },
  ],
  parametres: [
    { id: 'dv', label: L('Débit volumique', 'Volume flow rate'), min: 4, max: 11, pas: 0.5, valeur: 10, unite: 'L/min', decimales: 1 },
    { id: 'col', label: L('Diamètre du col', 'Throat diameter'), min: 10, max: 16, pas: 0.5, valeur: 12, unite: 'mm', decimales: 1 },
  ],
  graphique: {
    x: { label: 'x (cm)', min: 0, max: 40, pas: 10 },
    y: { label: 'P − Patm (kPa) · v (m/s)', min: 0, max: 4, pas: 1 },
  },
  affiche: { etape: 3, t: 0.9 },

  monter({ scene, graphique }) {
    paillasse(scene);
    const verre = { fill: 'none', stroke: C.verre, 'stroke-width': TRAIT, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    const voile = 'rgba(223,230,255,.06)';

    // Supports posés sur la paillasse.
    const gSupports = el('g', {}, scene);
    for (const x of [215, 467]) {
      el('rect', { x: x - 26, y: 432, width: 52, height: 8, rx: 3, fill: C.metal }, gSupports);
      el('rect', { x: x - 3, y: 377, width: 6, height: 57, fill: C.metal }, gSupports);
      el('path', { d: `M${x - 16} 365V375H${x + 16}V365`, fill: 'none', stroke: C.metal, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, gSupports);
    }

    // Tube de Venturi : verre, eau, traceurs, tubes manométriques, raccords.
    const gTube = el('g', {}, scene);
    const corps = el('path', { fill: voile }, gTube);
    const fondsManos = PRISES.map((x) => el('rect', { x: X(x) - DEMI, width: 2 * DEMI, fill: voile }, gTube));
    const idClip = uid('venturi');
    const clip = el('path', {}, el('clipPath', { id: idClip }, gTube));
    const gEau = el('g', { 'clip-path': `url(#${idClip})`, opacity: 0.5 }, gTube);
    const eauCorps = el('rect', { x: X0, width: ECH_X * TUBE.L, fill: C.bleu }, gEau);
    const eauManos = PRISES.map((x) => el('rect', { x: X(x) - DEMI, width: 2 * DEMI, fill: C.bleu }, gEau));
    const gLignes = el('g', {}, gTube);
    const lignes = [-0.66, -0.33, 0, 0.33, 0.66].map((k) => ({ k, n: el('path', { fill: 'none', stroke: C.blanc, 'stroke-width': 1.2 }, gLignes) }));
    const alea = rng(11);
    const traceurs = Array.from({ length: 56 }, (_, i) => {
      const ray = 1.5 + alea() * 1.3;
      return { ph: (i + alea()) / 56, k: (frac(i * 0.618034) * 2 - 1) * 0.84, ray, n: el('ellipse', { ry: ray, fill: i % 3 ? C.blanc : C.cyan }, gTube) };
    });
    const suivi = el('g', {}, gTube);
    el('circle', { r: 10, fill: C.rose, opacity: 0.3 }, suivi);
    el('circle', { r: 4.5, fill: C.rose, stroke: C.fond, 'stroke-width': 1.5 }, suivi);
    const barres = PRISES.map((x) => el('rect', { x: X(x) - DEMI + 1.5, width: 2 * DEMI - 3, rx: 2, fill: C.menthe, opacity: 0.75 }, gTube));
    const surfaces = PRISES.map((x) => el('rect', { x: X(x) - DEMI, width: 2 * DEMI, height: 2.5, fill: C.blanc }, gTube));
    const gGrad = PRISES.map((x) => {
      const g = el('g', {}, gTube);
      for (let h = 5; h <= 35; h += 5) el('line', { x1: X(x) + DEMI - (h % 10 ? 4 : 7), x2: X(x) + DEMI, y1: AX - ECH_H * h / 100, y2: AX - ECH_H * h / 100, stroke: C.verre, 'stroke-width': 1, opacity: 0.55 }, g);
      return g;
    });
    const paroiHaut = el('path', verre, gTube), paroiBas = el('path', verre, gTube);
    const manos = PRISES.map(() => el('path', verre, gTube));
    const bouchons = PRISES.map(() => el('line', verre, gTube));
    for (const x of [16, 594]) el('rect', { x, y: AX - 36, width: 30, height: 72, rx: 6, fill: C.panneau, stroke: C.metal, 'stroke-width': 2 }, gTube);
    el('rect', { x: 606, y: AX - 50, width: 6, height: 14, fill: C.metal }, gTube);
    const poignee = el('rect', { x: 596, y: AX - 56, width: 26, height: 6, rx: 3, fill: C.orange }, gTube);

    // Repères et annotations.
    const gRepos = el('g', {}, scene);
    el('line', { x1: X(PRISES[0]) + DEMI + 2, x2: X(PRISES[2]) - DEMI - 2, y1: Y_REPOS, y2: Y_REPOS, stroke: C.discret, 'stroke-width': 1.5, 'stroke-dasharray': '5 5' }, gRepos);
    etiquette(gRepos, { x: 215, y: Y_REPOS - 7, texte: L('niveau au repos', 'level at rest'), ancre: 'middle', taille: 13, couleur: C.discret });
    const noms = [L('Amont', 'Upstream'), L('Col', 'Throat'), L('Aval', 'Downstream')].map((nom, i) => etiquette(scene, { x: X(PRISES[i]), y: 112, texte: nom, ancre: 'middle', taille: 14 }));
    const vecteurs = PRISES.map((x) => fleche(scene, { x1: X(x), y1: 392, x2: X(x), y2: 392, couleur: C.menthe, epaisseur: 3.5 }));
    const etiqV = PRISES.map((x) => etiquette(scene, { x: X(x), y: 415, texte: '', ancre: 'middle', mono: true, taille: 13, couleur: C.menthe }));
    const ligneH1 = el('line', { stroke: C.jaune, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, scene);
    const etiqH = [
      etiquette(scene, { x: X(PRISES[0]) - 14, y: 0, texte: '', ancre: 'end', mono: true, taille: 13 }),
      etiquette(scene, { x: X(PRISES[1]) + 14, y: 0, texte: '', mono: true, taille: 13 }),
      etiquette(scene, { x: X(PRISES[2]) + 14, y: 0, texte: 'h3 = h1', mono: true, taille: 13 }),
    ];
    const denivele = fleche(scene, { x1: 292, y1: 0, x2: 292, y2: 0, couleur: C.jaune, epaisseur: 2.5 });
    const etiqDh = etiquette(scene, { x: 282, y: 0, texte: '', ancre: 'end', mono: true, taille: 13, couleur: C.jaune });
    const etiqEc = etiquette(scene, { x: X(PRISES[1]) + 14, y: 0, texte: '½·ρ·v²', mono: true, taille: 13, couleur: C.menthe });
    const sondeP = el('g', {}, scene);
    el('circle', { r: 13, fill: C.blanc, opacity: 0.18 }, sondeP);
    el('circle', { r: 7.5, fill: 'none', stroke: C.blanc, 'stroke-width': 2.5 }, sondeP);

    // Encarts de résultat (étapes 4 et 5).
    const encart = (x: number, titre: string, formule: string) => {
      const g = el('g', {}, scene);
      el('rect', { x, y: 16, width: 300, height: 80, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, g);
      const ligne = (y: number, taille: number, couleur: string, police: string, contenu: string) => {
        const n = el('text', { x: x + 16, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, g);
        n.textContent = contenu;
        return n;
      };
      ligne(38, 13, C.discret, POLICE, titre);
      ligne(60, 14, C.texte, MONO, formule);
      return { g, resultat: ligne(85, 17, C.jaune, MONO, '') };
    };
    const encartP = encart(16, L('Relation de Bernoulli, tube horizontal', "Bernoulli's equation, horizontal tube"), 'P1 + ½·ρ·v1² = P2 + ½·ρ·v2²');
    const encartD = encart(324, L('Débitmètre de Venturi : on lit Δh', 'Venturi flow meter: read Δh'), 'v2 = √(2·g·Δh / (1 − S2²/S1²))');

    let cle = -1, vol: number[] = [], bases: number[] = [];

    return ({ etape, t, T, p }) => {
      const img = { etape, t }, d = p.col / 1000, dv = debitSI(p.dv);

      // Géométrie : recalculée seulement quand le diamètre du col change.
      if (cle !== p.col) {
        cle = p.col;
        vol = volumes(d);
        const yh = (px: number) => AX - rayon(px, d), pt = (px: number, y: number) => `${px.toFixed(1)} ${y.toFixed(1)}`;
        const xs = Array.from({ length: 113 }, (_, i) => X0 + 5 * i);
        const dessus = xs.map((px) => pt(px, yh(px))), dessous = xs.map((px) => pt(px, 2 * AX - yh(px))).reverse().join('L');
        let paroi = `M${dessus[0]}`, contour = paroi, k = 0;
        for (let i = 1; i < xs.length; i++) {
          const g = k < 3 ? X(PRISES[k]) - DEMI : Infinity, dr = g + 2 * DEMI;
          if (xs[i] >= g && xs[i] <= dr) continue;
          if (xs[i] > dr) {
            paroi += `L${pt(g, yh(g))}M${pt(dr, yh(dr))}`;
            contour += `L${pt(g, yh(g))}V${HAUT}H${dr}V${yh(dr).toFixed(1)}`;
            k++;
          }
          paroi += `L${dessus[i]}`;
          contour += `L${dessus[i]}`;
        }
        corps.setAttribute('d', `M${dessus.join('L')}L${dessous}Z`);
        clip.setAttribute('d', `${contour}L${dessous}Z`);
        paroiHaut.setAttribute('d', paroi);
        paroiBas.setAttribute('d', `M${dessous}`);
        for (const l of lignes) l.n.setAttribute('d', 'M' + xs.map((px) => pt(px, AX + l.k * rayon(px, d))).join('L'));
        bases = PRISES.map((x) => yh(X(x)));
      }

      const a1 = avancement(img, 0), a2 = avancement(img, 1), a3 = avancement(img, 2), a4 = avancement(img, 3), a5 = avancement(img, 4);

      // Étape 1 : les supports puis le tube se posent, les tubes manométriques poussent, l'eau monte jusqu'au niveau du réservoir.
      show(gSupports, seg(a1, 0, 0.14, ease.out), 20);
      show(gTube, seg(a1, 0.06, 0.26, ease.out), -26);
      PRISES.forEach((x, i) => {
        const e = seg(a1, 0.28 + 0.07 * i, 0.46 + 0.07 * i, ease.out), sommet = lerp(bases[i], HAUT, e);
        manos[i].setAttribute('d', `M${X(x) - DEMI} ${bases[i]}V${sommet}M${X(x) + DEMI} ${bases[i]}V${sommet}`);
        set(fondsManos[i], { y: sommet, height: bases[i] - sommet });
        set(bouchons[i], { x1: X(x) - DEMI, x2: X(x) + DEMI, y1: bases[i], y2: bases[i], opacity: e > 0.02 ? 0 : 1 });
        gGrad[i].childNodes.forEach((n) => ((n as SVGElement).style.opacity = Number((n as SVGElement).getAttribute('y1')) > sommet + 4 && Number((n as SVGElement).getAttribute('y1')) < bases[i] - 3 ? '' : '0'));
        show(noms[i], seg(a1, 0.4 + 0.07 * i, 0.52 + 0.07 * i));
      });
      const yRepos = lerp(AX + 36, Y_REPOS, seg(a1, 0.56, 0.92));
      show(gRepos, seg(a1, 0.9, 1), 6);

      // Étape 2 : la vanne s'ouvre, le débit s'établit, les niveaux baissent (h = h0 - v²/2g).
      const q = seg(a2, A0, A1);
      const v1 = q * vitesse(dv, section(TUBE.D)), v2 = q * vitesse(dv, section(d));
      const chutes = [v1, v2, v1].map((v) => (ECH_H * v * v) / (2 * G));
      const niveaux = chutes.map((c) => yRepos + c);
      poignee.setAttribute('transform', `rotate(${90 * (1 - seg(a2, 0.18, 0.28, ease.backOut))} 609 ${AX - 53})`);
      set(eauCorps, { y: clamp(yRepos, AX - 34, AX + 36), height: AX + 36 - clamp(yRepos, AX - 34, AX + 36) });
      PRISES.forEach((_, i) => {
        const y = niveaux[i] + 0.7 * q * Math.sin(T * 4.3 + 2 * i); // léger frémissement de la surface
        set(eauManos[i], { y, height: Math.max(0, AX - y) });
        set(surfaces[i], { y, opacity: y < bases[i] - 2 ? 0.55 : 0 });
      });
      gLignes.style.opacity = String(0.16 * q);

      // Traceurs : position = réciproque du temps de parcours, donc vitesse locale Dv/S. Mouvement périodique, fonction de T.
      const tTot = tempsParcours(TUBE.L, dv, vol);
      const phi = (T - DUREE_2 * (a2 - ouvertureCumulee(a2))) / (RALENTI * tTot);
      const fenetre = (x: number) => clamp(x / 0.012) * clamp((TUBE.L - x) / 0.012);
      for (const tr of traceurs) {
        const x = positionAuTemps(frac(tr.ph + phi) * tTot, dv, vol), u = x / TUBE.L;
        const etire = 1 + 0.45 * q * (section(TUBE.D) / section(diametre(x, d)) - 1);
        set(tr.n, { cx: X(x), cy: AX + tr.k * rayon(X(x), d), rx: tr.ray * etire, opacity: 0.9 * seg(a2, 0.03 + 0.14 * u, 0.11 + 0.14 * u) * fenetre(x) });
      }
      const xS = positionAuTemps(frac(0.35 + phi) * tTot, dv, vol), opS = seg(a2, 0.68, 0.8) * fenetre(xS);
      set(suivi, { transform: `translate(${X(xS)} ${AX})`, opacity: opS });
      [v1, v2, v1].forEach((v, i) => {
        const cx = X(PRISES[i]), l = ECH_V * v;
        vecteurs[i].maj(cx - l / 2, 392, cx + l / 2, 392);
        etiqV[i].textContent = i === 2 ? 'v3 = v1' : `v${i + 1} = ${fmt(v, 2)} m/s`;
        show(etiqV[i], seg(a2, 0.62 + 0.06 * i, 0.74 + 0.06 * i), 8);
      });

      // Étape 3 : lecture des hauteurs, puis de la dénivellation entre l'amont et le col.
      const h1 = hauteur(v1, H0), h2 = hauteur(v2, H0), dh = h1 - h2;
      set(ligneH1, { x1: X(PRISES[0]) + DEMI + 2, x2: lerp(X(PRISES[0]) + DEMI + 2, 300, seg(a3, 0, 0.16)), y1: niveaux[0], y2: niveaux[0], opacity: a3 > 0 ? 1 : 0 });
      etiqH[0].textContent = `h1 = ${fmt(h1 * 100, 1)} cm`;
      etiqH[1].textContent = `h2 = ${fmt(h2 * 100, 1)} cm`;
      const debuts = [0.1, 0.4, 0.25]; // ordre de lecture : amont, aval, col
      etiqH.forEach((n, i) => {
        n.setAttribute('y', String(niveaux[i] + (i === 1 ? 17 : 4)));
        show(n, seg(a3, debuts[i], debuts[i] + 0.12), 8);
      });
      denivele.maj(292, niveaux[0], 292, lerp(niveaux[0], niveaux[1], seg(a3, 0.55, 0.78, ease.out)));
      etiqDh.textContent = `Δh = ${fmt(dh * 100, 1)} cm`;
      etiqDh.setAttribute('y', String(Math.max((niveaux[0] + niveaux[1]) / 2 + 4, niveaux[0] + 18)));
      show(etiqDh, seg(a3, 0.74, 0.88), 8);

      // Étape 4 : Bernoulli. La part cinétique (verte) complète chaque colonne jusqu'au niveau au repos ; une sonde relève P le long de l'axe.
      PRISES.forEach((_, i) => {
        const haut = lerp(niveaux[i], yRepos, seg(a4, 0.04 + 0.07 * i, 0.26 + 0.07 * i, ease.out));
        set(barres[i], { y: haut, height: Math.max(0, niveaux[i] - haut - 1.5) });
      });
      etiqEc.setAttribute('y', String(Math.min((yRepos + niveaux[1]) / 2 + 4, niveaux[1] - 6)));
      show(etiqEc, seg(a4, 0.26, 0.38) * clamp((niveaux[1] - yRepos - 12) / 8), 8); // masquée si la barre verte est trop courte pour la porter
      const xP = positionAuTemps(seg(a4, 0.36, 0.76, ease.lin) * tTot, dv, vol);
      const opP = seg(a4, 0.3, 0.36) * (1 - seg(a4, 0.76, 0.84));
      set(sondeP, { transform: `translate(${X(xP)} ${AX})`, opacity: opP });
      const dP = ecartPression(dv, d);
      encartP.resultat.textContent = `P1 − P2 = ${fmt(dP / 1000, 2)} kPa`;
      show(encartP.g, seg(a4, 0.8, 0.96, ease.backOut), 16);

      // Étape 5 : le tube sert de débitmètre.
      encartD.resultat.textContent = `Dv = v2·S2 = ${fmt(debitVenturi(dh, d) * 60000, 1)} L/min`;
      show(encartD.g, seg(a5, 0.1, 0.4, ease.backOut), 16);

      if (graphique) {
        const vEn = (x: number) => q * vitesse(dv, section(diametre(x, d)));
        const pEn = (x: number) => pressionRelative(vEn(x), H0) / 1000;
        const xs = Array.from({ length: 161 }, (_, i) => (TUBE.L * i) / 160);
        if (q > 0) {
          graphique.courbe('v', xs.map((x) => [x * 100, vEn(x)]), { couleur: C.menthe, epaisseur: 2.5 });
          graphique.repere('lv', 40, v1, { couleur: C.menthe, rayon: 3, label: L('vitesse', 'speed') });
          graphique.opacite('lv', seg(a2, 0.5, 0.64));
        } else {
          graphique.effacer('v');
          graphique.effacer('lv');
        }
        if (opS > 0.01) {
          graphique.repere('suivi', xS * 100, vEn(xS), { couleur: C.rose, rayon: 4.5 });
          graphique.opacite('suivi', opS);
        } else graphique.effacer('suivi');
        PRISES.forEach((x, i) => {
          if (a3 > debuts[i]) {
            graphique.repere(`h${i}`, x * 100, pEn(x), { couleur: C.jaune, rayon: 4.5 });
            graphique.opacite(`h${i}`, seg(a3, debuts[i], debuts[i] + 0.12));
          } else graphique.effacer(`h${i}`);
        });
        if (a4 > 0.36) graphique.courbe('p', [...xs.filter((x) => x < xP).map((x) => [x * 100, pEn(x)] as [number, number]), [xP * 100, pEn(xP)]], { couleur: C.cyan, epaisseur: 3 });
        else graphique.effacer('p');
        if (opP > 0.01) {
          graphique.repere('sonde', xP * 100, pEn(xP), { couleur: C.blanc, rayon: 4 });
          graphique.opacite('sonde', opP);
        } else graphique.effacer('sonde');
        if (a4 > 0.76) {
          graphique.repere('lp', 40, pEn(TUBE.L), { couleur: C.cyan, rayon: 3, label: L('pression', 'pressure') });
          graphique.opacite('lp', seg(a4, 0.76, 0.86));
        } else graphique.effacer('lp');
        if (a5 > 0.15) {
          graphique.verticale('col', PRISES[1] * 100, { couleur: C.jaune, label: `P1 − P2 = ${fmt(dP / 1000, 2)} kPa` });
          graphique.opacite('col', seg(a5, 0.15, 0.45));
        } else graphique.effacer('col');
      }

      const mesures = [
        { label: L('Débit', 'Flow rate'), valeur: `${fmt(q * p.dv, 1)} L/min` },
        { label: L('Vitesse en amont', 'Upstream speed'), valeur: `${fmt(v1, 2)} m/s` },
        { label: L('Vitesse au col', 'Throat speed'), valeur: `${fmt(v2, 2)} m/s` },
      ];
      if (a4 > 0.8) mesures.push({ label: L('Écart de pression', 'Pressure difference'), valeur: `${fmt(dP / 1000, 2)} kPa` });
      else if (a3 > 0.74) mesures.push({ label: L('Dénivellation', 'Height difference'), valeur: `${fmt(dh * 100, 1)} cm` });
      return mesures;
    };
  },
});
