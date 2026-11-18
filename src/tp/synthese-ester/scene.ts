import { L, avancement, clamp, ease, el, fmt, lerp, mix, remap, rng, seg, set, show, uid } from '../../lib/anim';
import { bulles, eprouvette, etiquette, fleche, gouttes, paillasse, potence, recipient } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT, themeSombre } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { ACIDE, ALCOOL, K_ESTER, avancementA, avancementEquilibre, cinetique, constanteVitesse, quotient, volume, type Melange } from './model';

const N_ALCOOL = 0.2; // mol, réactif limitant
const T_MAX = 60; // min, durée du chauffage
const X0 = 230; // axe du montage
const PAIRES = 9, EXTRA = 18; // particules dans le ballon

export default definirScene({
  etapes: [
    { titre: L('Introduire les réactifs', 'Add the reactants'), duree: 7, texte: L('Dans le ballon, on verse <strong>0,20 mol</strong> de 3-méthylbutan-1-ol, puis l\'acide éthanoïque et quelques gouttes d\'acide sulfurique concentré : le <strong>catalyseur</strong>.', '<strong>0.20 mol</strong> of 3-methylbutan-1-ol is poured into the flask, followed by the ethanoic acid and a few drops of concentrated sulfuric acid: the <strong>catalyst</strong>.') },
    { titre: L('Monter le réfrigérant', 'Fit the condenser'), duree: 6, texte: L('Le réfrigérant à boules est fixé verticalement sur le ballon. L\'eau froide entre <strong>par le bas</strong> et ressort par le haut.', 'The bulb condenser is fitted vertically on the flask. Cold water enters <strong>at the bottom</strong> and leaves at the top.') },
    { titre: L('Chauffer à reflux', 'Heat under reflux'), duree: 14, texte: L('Le mélange bout : les vapeurs montent, se <strong>condensent</strong> sur les parois froides et retombent dans le ballon. On chauffe longtemps sans perdre de matière, et l\'ester se forme peu à peu.', 'The mixture boils: the vapours rise, <strong>condense</strong> on the cold walls and fall back into the flask. The mixture is heated for a long time without losing any material, and the ester forms little by little.') },
    { titre: L('Atteindre l\'équilibre', 'Reach equilibrium'), duree: 6, texte: L('L\'avancement plafonne à <strong>x<sub>f</sub></strong>, en dessous de x<sub>max</sub> : la transformation est <strong>limitée</strong>. Estérification et hydrolyse se compensent, Q<sub>r</sub> = K.', 'The extent of reaction levels off at <strong>x<sub>f</sub></strong>, below x<sub>max</sub>: the reaction is <strong>limited</strong>. Esterification and hydrolysis balance each other, Q<sub>r</sub> = K.') },
    { titre: L('Calculer le rendement', 'Calculate the yield'), duree: 6, texte: L('On coupe le chauffage. Le rendement vaut <strong>η = x<sub>f</sub> / x<sub>max</sub></strong>, soit 67 % en mélange équimolaire. Ajoutez un excès d\'acide, baissez la température ou retirez le catalyseur : que devient la courbe ?', 'The heating is switched off. The yield is <strong>η = x<sub>f</sub> / x<sub>max</sub></strong>, that is 67% for an equimolar mixture. Add an excess of acid, lower the temperature or remove the catalyst: what happens to the curve?') },
  ],
  parametres: [
    { id: 'acide', label: L('Acide éthanoïque introduit', 'Ethanoic acid added'), min: 0.2, max: 0.6, pas: 0.05, valeur: 0.2, unite: 'mol', decimales: 2 },
    { id: 'theta', label: L('Température du mélange', 'Temperature of the mixture'), min: 60, max: 120, pas: 5, valeur: 120, unite: '°C' },
    { id: 'gouttes', label: L('Acide sulfurique (catalyseur)', 'Sulfuric acid (catalyst)'), min: 0, max: 10, pas: 1, valeur: 5, unite: L('gouttes', 'drops') },
  ],
  graphique: {
    x: { label: 't (min)', min: 0, max: T_MAX, pas: 10 },
    y: { label: 'x (mol)', min: 0, max: 0.22, pas: 0.05, decimales: 2 },
    titre: L('avancement', 'extent of reaction'),
  },
  affiche: { etape: 2, t: 0.6 },

  monter({ scene, graphique }) {
    const COUL = { acide: C.corail, alcool: C.cyan, ester: C.jaune, eau: C.bleu };
    const sombre = themeSombre();
    // Dégradé linéaire à identifiant unique (volume des objets dessinés ici, accordé au kit).
    const degrade = (attrs: Record<string, number | string>, arrets: [number, string, number][]) => {
      const id = uid('ester');
      const gr = el('linearGradient', { id, ...attrs }, el('defs', {}, scene));
      for (const [offset, c, o] of arrets) el('stop', { offset, 'stop-color': c, 'stop-opacity': o }, gr);
      return `url(#${id})`;
    };
    paillasse(scene);

    // Chauffe-ballon (derrière le ballon pour laisser voir le liquide).
    const chauffe = el('g', {}, scene);
    el('ellipse', { cx: X0 + 4, cy: 438, rx: 84, ry: 6, fill: C.ombre, opacity: sombre ? 0.4 : 0.12 }, chauffe);
    el('rect', { x: X0 - 72, y: 400, width: 144, height: 40, rx: 9, fill: degrade({ x1: 0, y1: 0, x2: 0, y2: 1 }, [[0, mix(C.panneau, C.metal, sombre ? 0.22 : 0.14), 1], [1, mix(C.panneau, C.ombre, sombre ? 0.3 : 0.06), 1]]), stroke: C.metal, 'stroke-width': 2 }, chauffe);
    el('rect', { x: X0 - 58, y: 394, width: 116, height: 8, rx: 4, fill: degrade({ x1: 0, y1: 0, x2: 0, y2: 1 }, [[0, mix(C.metal, C.blanc, 0.35), 1], [1, mix(C.metal, C.ombre, 0.3), 1]]) }, chauffe);
    const lueur = el('ellipse', { cx: X0, cy: 402, rx: 54, ry: 13, fill: C.orange }, chauffe);
    const led = el('circle', { cx: X0 - 56, cy: 422, r: 4 }, chauffe);
    el('circle', { cx: X0 + 54, cy: 422, r: 7, fill: C.fond, stroke: C.metal, 'stroke-width': 2 }, chauffe);
    const tAff = el('text', { x: X0, y: 432, fill: C.orange, 'font-family': MONO, 'font-size': 13, 'font-weight': 600, 'text-anchor': 'middle' }, chauffe);

    // Ballon à fond rond.
    const bal = recipient(scene, `M${X0 - 17} 292H${X0 - 12}V328A46 46 0 1 0 ${X0 + 12} 328V292H${X0 + 17}`, { x0: X0 - 46, x1: X0 + 46, yHaut: 326, yBas: 418 });
    const r = rng(7);
    const gPart = el('g', {}, scene);
    const parts = Array.from({ length: 2 * PAIRES + EXTRA }, () => ({ u: r() * 2 - 1, w: r(), ph: r() * 6.28, n: el('circle', { r: 3.4, stroke: C.fond, 'stroke-width': 1 }, gPart) }));
    const ebul = bulles(scene, { x: X0, y: 414, w: 56, h: 30, n: 8, graine: 3 });

    potence(scene, { x: 80, y: 440, h: 384, pinces: [{ y: 86, vers: X0 }, { y: 308, vers: X0 }] });

    // Réfrigérant à boules.
    const refr = el('g', {}, scene);
    const idEau = uid('eau');
    el('rect', { x: X0 - 24, y: 100, width: 48, height: 168, rx: 12 }, el('clipPath', { id: idEau }, refr));
    const eau = el('rect', { x: X0 - 24, width: 48, y: 268, height: 0, fill: C.bleu, opacity: 0.42, 'clip-path': `url(#${idEau})` }, refr);
    // Manchon : aplat de verre, volume (bord gauche ombré, liseré de lumière, bord droit plus sombre), contour net.
    el('rect', { x: X0 - 24, y: 100, width: 48, height: 168, rx: 12, fill: C.verre, 'fill-opacity': sombre ? 0.06 : 0.25 }, refr);
    el('rect', { x: X0 - 24, y: 100, width: 48, height: 168, rx: 12, fill: degrade({ gradientUnits: 'userSpaceOnUse', x1: X0 - 24, x2: X0 + 24, y1: 0, y2: 0 }, [
      [0, C.ombre, sombre ? 0.32 : 0.1], [0.1, C.ombre, 0], [0.15, C.blanc, 0], [0.22, C.blanc, sombre ? 0.2 : 0.55], [0.3, C.blanc, 0], [0.78, C.ombre, 0], [1, C.ombre, sombre ? 0.38 : 0.14],
    ]), stroke: C.trait, 'stroke-width': TRAIT }, refr);
    el('path', { d: `M${X0 - 8} 72V284M${X0 + 8} 72V284`, stroke: C.trait, 'stroke-width': 2, 'stroke-linecap': 'round' }, refr);
    const BOULES = [124, 156, 188, 220, 252];
    for (const cy of BOULES) el('circle', { cx: X0, cy, r: 14.5, fill: C.fond, stroke: C.trait, 'stroke-width': 2 }, refr);
    el('rect', { x: X0 - 7, y: 73, width: 14, height: 211, fill: C.fond }, refr);
    // Reflet vertical dans le tube intérieur et les boules.
    el('path', { d: `M${X0 - 4} 76V280`, stroke: C.verre, 'stroke-width': 2, opacity: sombre ? 0.25 : 0.8, 'stroke-linecap': 'round' }, refr);
    el('rect', { x: X0 - 13, y: 282, width: 26, height: 12, rx: 3, fill: degrade({ x1: 0, y1: 0, x2: 1, y2: 0 }, [[0, C.verre, 0.4], [0.3, C.verre, 0.85], [1, C.verre, 0.45]]), stroke: C.trait, 'stroke-width': 1.2 }, refr);
    const tuyaux = el('g', {}, refr);
    el('path', { d: `M${X0 + 24} 246H${X0 + 46}M${X0 + 24} 122H${X0 + 46}`, stroke: C.bleu, 'stroke-width': 6, 'stroke-linecap': 'round' }, tuyaux);
    const flux = el('path', { d: `M${X0 + 46} 246H${X0 + 24}M${X0 + 24} 122H${X0 + 46}`, stroke: C.blanc, 'stroke-width': 2, 'stroke-dasharray': '4 7', opacity: 0.8 }, tuyaux);
    fleche(tuyaux, { x1: X0 + 72, y1: 246, x2: X0 + 52, y2: 246, couleur: C.bleu });
    fleche(tuyaux, { x1: X0 + 52, y1: 122, x2: X0 + 72, y2: 122, couleur: C.bleu });
    etiquette(tuyaux, { x: X0 + 78, y: 251, texte: L('eau froide', 'cold water'), taille: 13, couleur: C.bleu });
    etiquette(tuyaux, { x: X0 + 78, y: 127, texte: L('sortie d\'eau', 'water out'), taille: 13, couleur: C.bleu });
    etiquette(tuyaux, { x: X0 - 36, y: 180, texte: L('Réfrigérant', 'Bulb'), taille: 13, ancre: 'end', couleur: C.discret });
    etiquette(tuyaux, { x: X0 - 36, y: 197, texte: L('à boules', 'condenser'), taille: 13, ancre: 'end', couleur: C.discret });

    // Vapeurs qui montent puis gouttes de condensat qui retombent.
    const gVap = el('g', {}, scene);
    // Vapeur : blanche sur fond nuit, gris bleuté sur fond blanc.
    const coulVap = sombre ? C.blanc : C.metal, opVap = sombre ? 1 : 0.75;
    const vap = Array.from({ length: 16 }, () => ({ v: 0.1 + r() * 0.07, ph: r(), h: r(), cote: r() < 0.5 ? -1 : 1, n: el('ellipse', {}, gVap) }));

    // Éprouvettes verseuses et compte-gouttes (étape 1).
    const filet = el('line', { x1: X0 + 8, x2: X0 + 2, y1: 290, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, scene);
    const verseuse = (couleur: string, nom: string) => {
      const g = el('g', {}, scene);
      const liq = el('rect', { x: -10, width: 20, rx: 2, fill: couleur, opacity: 0.85 }, g);
      eprouvette(g, { x: 0, y: 0, w: 26, h: 92 });
      const lab = etiquette(scene, { x: X0 + 26, y: 120, texte: nom, mono: true, taille: 13, couleur });
      return (q: number, vol: number) => {
        const entree = seg(q, 0, 0.22, ease.out), sortie = seg(q, 0.82, 1, ease.in);
        const incl = seg(q, 0.18, 0.42) - seg(q, 0.72, 0.88), verse = seg(q, 0.4, 0.72, ease.lin);
        const px = lerp(X0 + 70, X0 + 10, incl), py = lerp(150, 286, incl) - 280 * (1 - entree) - 280 * sortie;
        g.setAttribute('transform', `translate(${px + 13} ${py + 92}) rotate(${-105 * incl} -13 -92)`);
        g.style.opacity = q > 0 && q < 1 ? '1' : '0';
        set(liq, { y: lerp(-68, -90, incl), height: 64 * (1 - verse) });
        lab.textContent = L(`${nom} : ${fmt(vol, 1)} mL`, `${nom}: ${fmt(vol, 1)} mL`);
        show(lab, seg(q, 0.05, 0.2) - seg(q, 0.85, 1));
        return verse;
      };
    };
    const vAlcool = verseuse(COUL.alcool, L('Alcool', 'Alcohol')), vAcide = verseuse(COUL.acide, L('Acide', 'Acid'));
    const pip = el('g', {}, scene);
    el('ellipse', { cx: X0, cy: 226, rx: 8, ry: 13, fill: C.corail, stroke: C.trait, 'stroke-width': 1.5 }, pip);
    el('path', { d: `M${X0 - 4} 238V268L${X0 - 1.5} 284H${X0 + 1.5}L${X0 + 4} 268V238Z`, fill: C.jaune, 'fill-opacity': 0.45, stroke: C.trait, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, pip);
    const gtt = gouttes(scene, { x: X0, y1: 284, y2: 372, couleur: C.jaune });
    const labCata = etiquette(scene, { x: X0 + 26, y: 250, texte: '', mono: true, taille: 13, couleur: C.jaune });

    // Équation (sert de légende) et bilan de matière en barres.
    const eq = etiquette(scene, { x: 508, y: 62, texte: '', ancre: 'middle', taille: 15 });
    ([[L('acide', 'acid'), COUL.acide], [' + ', C.discret], [L('alcool', 'alcohol'), COUL.alcool], [' ⇄ ', C.texte], ['ester', COUL.ester], [' + ', C.discret], [L('eau', 'water'), COUL.eau]] as const)
      .forEach(([s, fill]) => { el('tspan', { fill }, eq).textContent = s; });
    const bilan = el('g', {}, scene);
    el('rect', { x: 392, y: 84, width: 232, height: 244, rx: 14, fill: C.panneau, stroke: C.grille, 'stroke-width': 1.5 }, bilan);
    el('text', { x: 408, y: 108, fill: C.discret, 'font-family': POLICE, 'font-size': 13, 'font-weight': 600 }, bilan).textContent = L('Quantités de matière (mol)', 'Amounts of substance (mol)');
    el('line', { x1: 404, x2: 612, y1: 296, y2: 296, stroke: C.metal, 'stroke-width': 1.5 }, bilan);
    const barres = (['acide', 'alcool', 'ester', 'eau'] as const).map((nom, i) => {
      const x = 430 + i * 52;
      el('text', { x, y: 316, fill: COUL[nom], 'font-family': POLICE, 'font-size': 13, 'font-weight': 600, 'text-anchor': 'middle' }, bilan).textContent = L(nom, { acide: 'acid', alcool: 'alcohol', ester: 'ester', eau: 'water' }[nom]);
      const b = el('rect', { x: x - 17, width: 34, rx: 4, fill: COUL[nom] }, bilan);
      const v = el('text', { x, fill: C.texte, 'font-family': MONO, 'font-size': 13, 'font-weight': 600, 'text-anchor': 'middle' }, bilan);
      return (n: number) => {
        const h = Math.max(0, n) * 250;
        set(b, { y: 296 - h, height: h });
        set(v, { y: 289 - h });
        v.textContent = fmt(Math.max(0, n), 2);
      };
    });

    // Encart de résultat (étape 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 392, y: 338, width: 232, height: 92, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 408, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(360, 13, C.discret, POLICE).textContent = L('Rendement après 60 min', 'Yield after 60 min');
    const resultat = ligne(388, 21, C.jaune);
    const limite = ligne(414, 13, C.texte);

    let cle = '', pts: [number, number][] = [];

    return (img) => {
      const { T, p } = img;
      const m: Melange = { nAcide: p.acide, nAlcool: N_ALCOOL, K: K_ESTER };
      const k = constanteVitesse(p.theta, p.gouttes);
      const xEq = avancementEquilibre(m);
      if (cle !== `${p.acide}|${k}`) {
        cle = `${p.acide}|${k}`;
        pts = cinetique(m, k, T_MAX, 240);
      }
      const [a0, a1, a2, a3, a4] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));

      // Étape 1 : alcool, acide, puis catalyseur.
      const vA = volume(N_ALCOOL, ALCOOL), vB = volume(p.acide, ACIDE);
      const q1 = seg(a0, 0, 0.4, ease.lin), q2 = seg(a0, 0.42, 0.82, ease.lin), d = seg(a0, 0.84, 1, ease.lin);
      const verse1 = vAlcool(q1, vA), verse2 = vAcide(q2, vB);
      const niveau = clamp((vA * verse1 + vB * verse2) / 70);
      const yS = bal.ySurface(niveau);
      const coule = verse1 > 0 && verse1 < 1 ? COUL.alcool : verse2 > 0 && verse2 < 1 ? COUL.acide : '';
      set(filet, { y2: yS, stroke: coule || C.fond, opacity: coule ? 0.9 : 0 });
      const cata = p.gouttes > 0;
      pip.style.opacity = cata && d > 0 && d < 1 ? '1' : '0';
      pip.style.transform = `translateY(${-300 * (1 - seg(d, 0, 0.25, ease.out)) - 300 * seg(d, 0.82, 1, ease.in)}px)`;
      gtt.maj(T, cata && d > 0.28 && d < 0.8 ? 0.5 : 0);
      const nG = Math.round(p.gouttes * seg(d, 0.28, 0.8, ease.lin));
      labCata.textContent = cata ? L(`H2SO4 : ${nG} goutte${nG > 1 ? 's' : ''}`, `H2SO4: ${nG} drop${nG === 1 ? '' : 's'}`) : L('sans catalyseur', 'no catalyst');
      show(labCata, seg(d, 0.15, 0.3) - seg(a1, 0, 0.12));

      // Étape 2 : le réfrigérant descend, l'eau circule.
      refr.style.transform = `translateY(${lerp(-340, 0, seg(a1, 0, 0.4, ease.out))}px)`;
      refr.style.opacity = a1 > 0 ? '1' : '0';
      show(tuyaux, seg(a1, 0.42, 0.58));
      const plein = seg(a1, 0.55, 0.88);
      set(eau, { y: lerp(268, 100, plein), height: 168 * plein });
      flux.style.strokeDashoffset = String(-T * 26);
      flux.style.opacity = plein > 0 ? '0.8' : '0';

      // Étapes 3 et 4 : chauffage, reflux, avancement. Étape 5 : arrêt.
      const chauffage = seg(a2, 0, 0.06) * (1 - seg(a4, 0, 0.3));
      const ebullition = chauffage * remap(p.theta, 60, 120, 0.25, 1);
      const tMin = T_MAX * a2;
      const x = avancementA(tMin, m, k), x60 = avancementA(T_MAX, m, k);
      const taux = x / N_ALCOOL;
      set(lueur, { opacity: chauffage * (0.55 + 0.12 * Math.sin(T * 5)) });
      led.setAttribute('fill', chauffage > 0.05 ? C.orange : C.metal);
      tAff.textContent = `${fmt(lerp(20, p.theta, seg(a2, 0, 0.06) * (1 - 0.5 * seg(a4, 0, 1))), 0)} °C`;
      bal.liquide(niveau, mix(C.metal, C.jaune, 0.35 * taux));
      ebul.maj(T, chauffage * remap(p.theta, 95, 120, 0, 1)); // pas d'ébullition franche loin de la température d'ébullition

      // Particules : chaque paire acide + alcool devient ester + eau, dans les deux sens.
      const extra = Math.round(PAIRES * (p.acide / N_ALCOOL - 1));
      parts.forEach((pt, i) => {
        const paire = Math.floor(i / 2), estAcide = i >= 2 * PAIRES || i % 2 === 0;
        const reagi = i < 2 * PAIRES && taux > 0 && paire + 0.5 + 0.7 * chauffage * Math.sin(T * 1.6 + paire * 2.1) < taux * PAIRES;
        const y = lerp(yS + 7, 411, pt.w) + Math.cos(T * (0.6 + 2.4 * ebullition) + pt.ph * 2) * 2;
        const lw = Math.max(0, Math.sqrt(Math.max(0, 43 * 43 - (y - 372) ** 2)) - 5);
        set(pt.n, {
          cx: X0 + pt.u * lw + Math.sin(T * (0.7 + 2.6 * ebullition) + pt.ph) * 3, cy: y,
          fill: reagi ? (estAcide ? COUL.ester : COUL.eau) : estAcide ? COUL.acide : COUL.alcool,
          opacity: i >= 2 * PAIRES + extra ? 0 : estAcide ? verse2 : verse1,
        });
      });

      // Reflux : montée des vapeurs (blanc), condensation, retombée en gouttes.
      const sommet = lerp(256, 208, ebullition); // les vapeurs restent dans le premier tiers du réfrigérant
      vap.forEach((o, i) => {
        const c = (T * o.v * (0.6 + ebullition) + o.ph) % 1, actif = i / vap.length < ebullition;
        const yHaut = sommet + o.h * 34;
        if (c < 0.6) {
          const q = c / 0.6;
          set(o.n, { cx: X0 + Math.sin(T * 3 + i * 1.7) * 4.5, cy: lerp(yS - 4, yHaut, ease.out(q)), rx: 2.5 + 3 * q, ry: 2.5 + 3 * q, fill: coulVap, opacity: actif ? opVap * (0.6 * Math.sin(Math.PI * Math.min(1, q * 1.15)) + 0.12) : 0 });
        } else {
          const q = (c - 0.6) / 0.4;
          set(o.n, { cx: X0 + o.cote * 5, cy: lerp(yHaut, yS, q * q), rx: 2.4, ry: 4, fill: C.cyan, opacity: actif ? Math.min(1, q * 6) * (q > 0.96 ? 0 : 1) : 0 });
        }
      });

      // Bilan de matière.
      show(bilan, seg(a0, 0, 0.08));
      show(eq, seg(a0, 0, 0.08));
      barres[0](p.acide * verse2 - x);
      barres[1](N_ALCOOL * verse1 - x);
      barres[2](x);
      barres[3](x);

      // Résultat.
      show(encart, seg(a4, 0.25, 0.55, ease.backOut), 16);
      resultat.textContent = L(`η = ${fmt(100 * x60 / N_ALCOOL, 0)} %`, `η = ${fmt(100 * x60 / N_ALCOOL, 0)}%`);
      limite.textContent = L(`à l'équilibre : ${fmt(100 * xEq / N_ALCOOL, 0)} %`, `at equilibrium: ${fmt(100 * xEq / N_ALCOOL, 0)}%`);

      if (graphique) {
        graphique.courbe('x', a2 > 0 ? pts.filter(([t]) => t <= tMin) : [], { couleur: C.jaune, epaisseur: 3 });
        if (a2 > 0 && a2 < 1) graphique.repere('mesure', tMin, x, { couleur: C.texte, rayon: 4 });
        else graphique.effacer('mesure');
        if (a3 > 0.08) {
          const pc = (v: number) => (a4 > 0.3 ? L(` (${fmt(100 * v / N_ALCOOL, 0)} %)`, ` (${fmt(100 * v / N_ALCOOL, 0)}%)`) : '');
          graphique.horizontale('xmax', N_ALCOOL, { couleur: C.discret, label: `x max = ${fmt(N_ALCOOL, 2)} mol${pc(N_ALCOOL)}` });
          graphique.horizontale('xf', xEq, { couleur: C.menthe, label: `x f = ${fmt(xEq, 3)} mol${pc(xEq)}` });
          graphique.opacite('xmax', seg(a3, 0.08, 0.35));
          graphique.opacite('xf', seg(a3, 0.4, 0.7));
        } else {
          graphique.effacer('xmax');
          graphique.effacer('xf');
        }
        if (a4 > 0.3) graphique.repere('fin', T_MAX, x60, { couleur: C.jaune });
        else graphique.effacer('fin');
      }

      return [
        { label: L('Durée de chauffage', 'Heating time'), valeur: `${fmt(tMin, 0)} min` },
        { label: L('Avancement x', 'Extent of reaction x'), valeur: `${fmt(x, 3)} mol` },
        { label: 'Quotient Qr (K = 4)', valeur: fmt(quotient(x, m), 2) },
        { label: L('Rendement', 'Yield'), valeur: L(`${fmt(100 * taux, 0)} %`, `${fmt(100 * taux, 0)}%`) },
      ];
    };
  },
});
