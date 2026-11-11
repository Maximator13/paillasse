import { avancement, clamp, ease, el, fmt, lerp, mix, seg, show } from '../../lib/anim';
import { agitateur, appareil, barreau, becher, burette, etiquette, gouttes, paillasse, potence, sonde } from '../../lib/labkit';
import { C, MONO, POLICE } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { courbe, derivee, pH, volumeEquivalent, type Titrage } from './model';

const VA = 20; // mL, prise d'essai
const CB = 0.1; // mol/L, soude
const V_MAX = 25; // mL, capacité de la burette
const INCOLORE = '#8fc4ff', ROSE = '#ff5fb8';

export default definirScene({
  etapes: [
    { titre: 'Prélever la prise d\'essai', duree: 5, texte: 'À la pipette jaugée, on prélève <strong>V<sub>A</sub> = 20,0 mL</strong> de solution d\'acide éthanoïque de concentration inconnue, que l\'on verse dans un bécher avec un barreau aimanté.' },
    { titre: 'Installer le montage', duree: 6, texte: 'La burette est remplie de soude de concentration connue <strong>C<sub>B</sub> = 0,10 mol/L</strong>, ajustée au zéro. La sonde du pH-mètre plonge dans la solution, l\'agitation démarre.' },
    { titre: 'Verser la soude, relever le pH', duree: 14, texte: 'On verse la soude millilitre par millilitre. Le pH monte lentement, puis <strong>bondit</strong> : c\'est le saut de pH. La phénolphtaléine vire au rose.' },
    { titre: 'Repérer l\'équivalence', duree: 7, texte: 'L\'équivalence correspond au maximum de la dérivée <strong>dpH/dV</strong>. On y lit le volume équivalent <strong>V<sub>E</sub></strong>.' },
    { titre: 'Calculer la concentration', duree: 5, texte: 'À l\'équivalence, les réactifs sont en proportions stœchiométriques : <strong>C<sub>A</sub>·V<sub>A</sub> = C<sub>B</sub>·V<sub>E</sub></strong>. Changez la concentration ou la force de l\'acide et observez la courbe.' },
  ],
  parametres: [
    { id: 'ca', label: 'Concentration de l\'acide', min: 0.04, max: 0.11, pas: 0.005, valeur: 0.1, unite: 'mol/L', decimales: 3 },
    { id: 'pKa', label: 'pKa de l\'acide', min: 3, max: 6.5, pas: 0.1, valeur: 4.8 },
  ],
  graphique: {
    x: { label: 'V versé (mL)', min: 0, max: V_MAX, pas: 5 },
    y: { label: 'pH', min: 0, max: 14, pas: 2 },
  },
  affiche: { etape: 2, t: 0.86 },

  monter({ scene, graphique }) {
    paillasse(scene);
    const agit = agitateur(scene, { x: 290, y: 440, w: 160 });
    const bec = becher(scene, { x: 290, y: agit.yPlateau, w: 130, h: 118 });
    const bar = barreau(scene, { x: 290, y: agit.yPlateau - 2 });
    const phm = appareil(scene, { x: 470, y: 364, w: 140, h: 76, titre: 'pH-MÈTRE' });

    // Pipette jaugée (étape 1).
    const pip = el('g', {}, scene);
    el('path', { d: 'M287 60V150M293 60V150M287 210V292L290 302L293 292V210', fill: 'none', stroke: C.verre, 'stroke-width': 2, 'stroke-linecap': 'round' }, pip);
    const ventre = el('ellipse', { cx: 290, cy: 180, rx: 13, ry: 32, fill: INCOLORE, 'fill-opacity': 0.8, stroke: C.verre, 'stroke-width': 2 }, pip);
    const filet = el('line', { x1: 290, x2: 290, y1: 302, y2: 380, stroke: INCOLORE, 'stroke-width': 3, 'stroke-linecap': 'round' }, scene);
    const etiqPrise = etiquette(scene, { x: 216, y: 320, texte: 'VA = 20,0 mL', ancre: 'end', mono: true, taille: 13, couleur: C.cyan });

    // Montage de titrage (étape 2).
    const montage = el('g', {}, scene);
    potence(montage, { x: 110, y: 440, h: 410, pinces: [{ y: 95, vers: 290 }, { y: 215, vers: 290 }] });
    const bur = burette(montage, { x: 290, yHaut: 42, h: 212 });
    etiquette(montage, { x: 322, y: 62, texte: 'Soude' });
    etiquette(montage, { x: 322, y: 82, texte: 'CB = 0,10 mol/L', mono: true, taille: 13, couleur: C.discret });
    const gtt = gouttes(scene, { x: 290, y1: bur.bec.y, y2: 360 });
    const gSonde = el('g', {}, scene);
    sonde(gSonde, { de: { x: 540, y: 364 }, vers: { x: 328, y: agit.yPlateau - 12 }, longueur: 92 });

    // Encart de résultat (étape 5).
    const encart = el('g', {}, scene);
    el('rect', { x: 408, y: 118, width: 216, height: 104, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 424, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    ligne(144, 13, C.discret, POLICE).textContent = 'À l\'équivalence';
    ligne(170, 15, C.texte).textContent = 'CA·VA = CB·VE';
    const resultat = ligne(202, 19, C.jaune);

    let cle = '', pts: [number, number][] = [], dMax = 1;

    return ({ etape, t, T, p }) => {
      const tit: Titrage = { ca: p.ca, va: VA, cb: CB, pKa: p.pKa };
      const vE = volumeEquivalent(tit);
      if (cle !== `${p.ca}|${p.pKa}`) {
        cle = `${p.ca}|${p.pKa}`;
        pts = courbe(tit, V_MAX, 250);
        dMax = Math.max(...pts.map(([v]) => derivee(v, tit)));
      }

      // Étape 1 : la pipette descend, se vide, repart ; le barreau tombe.
      const a1 = avancement({ etape, t }, 0);
      const vide = seg(a1, 0.2, 0.72, ease.lin);
      pip.style.transform = `translateY(${lerp(-330, 0, seg(a1, 0, 0.18, ease.out)) - 330 * seg(a1, 0.78, 0.95, ease.in)}px)`;
      ventre.setAttribute('fill-opacity', String(0.8 * (1 - vide)));
      filet.style.opacity = vide > 0 && vide < 1 ? '1' : '0';
      show(etiqPrise, seg(a1, 0.7, 0.85));
      const chute = seg(a1, 0.86, 1, ease.bounceOut);
      bar.el.style.opacity = a1 > 0.86 ? '1' : '0';
      bar.el.style.transform = `translateY(${lerp(-110, 0, chute)}px)`;

      // Étape 2 : le montage apparaît, la burette se remplit, la sonde plonge, l'agitation démarre.
      const a2 = avancement({ etape, t }, 1);
      show(montage, seg(a2, 0, 0.25), 24);
      const remplissage = seg(a2, 0.28, 0.6);
      gSonde.style.opacity = String(seg(a2, 0.6, 0.7));
      gSonde.style.transform = `translateY(${lerp(-60, 0, seg(a2, 0.6, 0.85, ease.out))}px)`;
      const agite = a2 > 0.88;
      agit.marche(agite);
      bar.tourne(T, agite ? 1 : 0);

      // Étape 3 : on verse.
      const a3 = avancement({ etape, t }, 2);
      const v = V_MAX * a3;
      const ph = pH(v, tit);
      bur.liquide(remplissage * (1 - v / V_MAX), C.cyan);
      bur.robinet(a3 > 0 && a3 < 1 ? 1 : 0);
      gtt.maj(T, a3 > 0 && a3 < 1 ? 0.6 : 0);
      const teinte = mix(INCOLORE, ROSE, clamp((ph - 8.2) / 1.5));
      bec.liquide(0.34 * vide + 0.34 * (v / V_MAX), teinte);
      phm.affiche(a2 > 0.85 ? fmt(ph, 2) : '');

      // Étapes 4 et 5 : exploitation.
      const a4 = avancement({ etape, t }, 3);
      const a5 = avancement({ etape, t }, 4);
      show(encart, seg(a5, 0.05, 0.35, ease.backOut), 16);
      resultat.textContent = `CA = ${fmt((CB * vE) / VA, 3)} mol/L`;

      if (graphique) {
        graphique.courbe('ph', a3 > 0 ? pts.filter(([x]) => x <= v) : [], { couleur: C.cyan, epaisseur: 3 });
        if (a3 > 0 && a3 < 1) graphique.repere('mesure', v, ph, { couleur: C.blanc, rayon: 4 });
        else graphique.effacer('mesure');
        const xd = V_MAX * seg(a4, 0.05, 0.6, ease.lin);
        graphique.courbe('derivee', a4 > 0 ? pts.filter(([x]) => x <= xd).map(([x]) => [x, (derivee(x, tit) / dMax) * 12]) : [], { couleur: C.rose, epaisseur: 2, pointille: true });
        if (a4 > 0.62) {
          graphique.verticale('ve', vE, { couleur: C.jaune, label: `VE = ${fmt(vE, 1)} mL` });
          graphique.repere('eq', vE, pH(vE, tit), { couleur: C.jaune, label: `pH = ${fmt(pH(vE, tit), 1)}` });
          graphique.opacite('ve', seg(a4, 0.62, 0.8));
          graphique.opacite('eq', seg(a4, 0.75, 0.95));
        } else {
          graphique.effacer('ve');
          graphique.effacer('eq');
        }
      }

      const mesures = [
        { label: 'Volume versé', valeur: `${fmt(v, 1)} mL` },
        { label: 'pH', valeur: a2 > 0.85 ? fmt(ph, 2) : '...' },
      ];
      if (a4 > 0.62) mesures.push({ label: 'Volume équivalent', valeur: `${fmt(vE, 1)} mL` });
      return mesures;
    };
  },
});
