import { L, avancement, clamp, ease, el, fmt, mix, seg, set, show, uid } from '../../lib/anim';
import { eprouvette, etiquette, fleche, paillasse, potence } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { G, descentePour, flotte, forceDynamometre, fractionImmergee, hauteurImmergee, monteeNiveau, poids, poussee, resultantePression, type Montage } from './model';

// Montage réel : cylindre de 40 cm³ (section 8 cm², hauteur 5 cm), éprouvette de section 20 cm², 150 mL de liquide.
const S_CYL = 8e-4, S_EPR = 20e-4, H = 0.05, VOL = S_CYL * H, RAIDEUR = 75;
const K = 1800; // px par mètre
const PX_N = 24; // allongement du ressort, px par newton (cohérent avec RAIDEUR et K)
const VEC = 40; // longueur des vecteurs force, px par newton
const CX = 270, Y0 = 30, Y_FOND = 434, Y_SURF0 = 299, V0 = 150;
const HC = H * K, LC = 57; // cylindre à l'écran
// Encart « zoom » : cylindre agrandi.
const ZX = 503, ZT = 92, ZH = 120, ZL = 84;

export default definirScene({
  etapes: [
    { titre: L('Peser le solide dans l\'air', 'Weigh the solid in air'), duree: 5, texte: L('Le cylindre est suspendu au dynamomètre : le ressort s\'allonge et indique son <strong>poids P</strong>. L\'éprouvette contient 150 mL de liquide.', 'The cylinder hangs from the newton meter: the spring stretches and shows its <strong>weight P</strong>. The measuring cylinder contains 150 mL of liquid.') },
    { titre: L('Immerger progressivement', 'Immerse gradually'), duree: 12, texte: L('On descend la noix de serrage. À mesure que le solide s\'enfonce, le <strong>niveau monte</strong> et la valeur lue au dynamomètre <strong>diminue</strong> : le liquide pousse le solide vers le haut.', 'The bosshead is lowered. As the solid goes deeper, the <strong>level rises</strong> and the reading on the newton meter <strong>decreases</strong>: the liquid pushes the solid upwards.') },
    { titre: L('Lire le volume déplacé', 'Read the displaced volume'), duree: 6, texte: L('La montée du niveau donne le <strong>volume de liquide déplacé</strong>, égal au volume immergé <strong>V</strong> du solide.', 'The rise in the level gives the <strong>volume of liquid displaced</strong>, equal to the immersed volume <strong>V</strong> of the solid.') },
    { titre: L('Comprendre : les forces pressantes', 'Understand: the pressure forces'), duree: 9, texte: L('La pression augmente avec la profondeur. Les forces latérales se compensent, mais le liquide pousse <strong>plus fort sous le solide que dessus</strong> : la résultante est verticale, vers le haut.', 'Pressure increases with depth. The sideways forces cancel out, but the liquid pushes <strong>harder underneath the solid than on top</strong>: the resultant is vertical, upwards.') },
    { titre: L('Vérifier la loi : PA = ρ·V·g', 'Check the law: PA = ρ·V·g'), duree: 6, texte: L('La poussée mesurée <strong>P − F</strong> est égale au poids du liquide déplacé <strong>ρ·V·g</strong>. Changez les masses volumiques : un solide moins dense que le liquide flotte.', 'The measured upthrust <strong>P − F</strong> is equal to the weight of the liquid displaced <strong>ρ·V·g</strong>. Change the densities: a solid less dense than the liquid floats.') },
  ],
  parametres: [
    { id: 'rhoS', label: L('Masse volumique du solide', 'Density of the solid'), min: 0.5, max: 5, pas: 0.1, valeur: 2.7, unite: 'g/cm³', decimales: 1 },
    { id: 'rhoF', label: L('Masse volumique du liquide', 'Density of the liquid'), min: 0.8, max: 1.3, pas: 0.05, valeur: 1, unite: 'g/cm³', decimales: 2 },
  ],
  graphique: {
    x: { label: L('V immergé (cm³)', 'Immersed V (cm³)'), min: 0, max: 40, pas: 10 },
    y: { label: L('Force (N)', 'Force (N)'), min: 0, max: 2.5, pas: 0.5 },
  },
  affiche: { etape: 3, t: 0.95 },

  monter({ scene, graphique }) {
    paillasse(scene);
    potence(scene, { x: 90, y: 440, h: 424 });
    const epr = eprouvette(scene, { x: CX, y: 440, w: 91, h: 210 });
    const bande = el('rect', { x: CX - 44.5, width: 89, fill: C.jaune, opacity: 0 }, scene);
    const niveau0 = el('line', { x1: CX - 44, x2: CX + 44, y1: Y_SURF0, y2: Y_SURF0, stroke: C.discret, 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, scene);

    // Équipage mobile : noix, bras, dynamomètre, fil, cylindre.
    const mobile = el('g', {}, scene);
    el('rect', { x: 90, y: Y0 - 12, width: CX - 82, height: 6, rx: 3, fill: C.metal }, mobile);
    el('rect', { x: 81, y: Y0 - 18, width: 18, height: 18, rx: 4, fill: C.discret }, mobile);
    el('circle', { cx: CX, cy: Y0 - 4, r: 5, fill: 'none', stroke: C.metal, 'stroke-width': 2.5 }, mobile);
    const ressort = el('path', { fill: 'none', stroke: C.metal, 'stroke-width': 2, 'stroke-linejoin': 'round' }, mobile);
    el('rect', { x: CX - 11, y: Y0, width: 22, height: 70, rx: 7, fill: 'rgba(223,230,255,.06)', stroke: C.verre, 'stroke-width': TRAIT }, mobile);
    for (let i = 0; i <= 4; i++) el('line', { x1: CX + 12, x2: CX + (i % 2 ? 17 : 20), y1: Y0 + 12 + i * 12, y2: Y0 + 12 + i * 12, stroke: C.verre, 'stroke-width': 1.5, opacity: 0.7 }, mobile);
    const tige = el('g', {}, mobile);
    el('line', { x1: CX, x2: CX, y1: Y0 + 12, y2: Y0 + 76, stroke: C.metal, 'stroke-width': 3, 'stroke-linecap': 'round' }, tige);
    el('rect', { x: CX - 11, y: Y0 + 10.5, width: 22, height: 3, fill: C.corail }, tige);
    el('circle', { cx: CX, cy: Y0 + 79, r: 3, fill: 'none', stroke: C.metal, 'stroke-width': 2 }, tige);
    const pendu = el('g', {}, tige);
    el('line', { x1: CX, x2: CX, y1: Y0 + 82, y2: Y0 + 126, stroke: C.verre, 'stroke-width': 1.5 }, pendu);
    const cyl = el('rect', { x: CX - LC / 2, y: Y0 + 126, width: LC, height: HC, rx: 5, stroke: C.verre, 'stroke-width': TRAIT }, pendu);
    const lectureF = etiquette(mobile, { x: CX - 24, y: Y0 + 44, texte: '', ancre: 'end', mono: true, taille: 14, couleur: C.cyan });

    // Voile de liquide sur la partie immergée, puis vecteurs force.
    const voile = el('rect', { x: CX - LC / 2 + 1, width: LC - 2, opacity: 0.4 }, scene);
    const vP = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.corail, epaisseur: 3.5 });
    const vF = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.cyan, epaisseur: 3.5 });
    const vPA = fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.menthe, epaisseur: 3.5 });
    const legP = etiquette(scene, { x: 110, y: 330, texte: '', mono: true, taille: 13, couleur: C.corail });
    const legPA = etiquette(scene, { x: 110, y: 352, texte: '', mono: true, taille: 13, couleur: C.menthe });

    // Lectures de volume à droite de l'éprouvette.
    const lecV0 = etiquette(scene, { x: 328, y: Y_SURF0 + 4, texte: `${V0} mL`, mono: true, taille: 13, couleur: C.discret });
    const lecV = etiquette(scene, { x: 328, y: 0, texte: '', mono: true, taille: 13, couleur: C.cyan });
    const accolade = el('path', { fill: 'none', stroke: C.jaune, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, scene);
    const lecDV = etiquette(scene, { x: 328, y: Y_SURF0 + 24, texte: '', mono: true, taille: 13, couleur: C.jaune });

    // Zoom : forces pressantes.
    const zoom = el('g', {}, scene);
    const idClip = uid('zoom'), idGrad = uid('eau');
    const defs = el('defs', {}, zoom);
    el('rect', { x: 382, y: 24, width: 242, height: 276, rx: 14 }, el('clipPath', { id: idClip }, defs));
    const grad = el('linearGradient', { id: idGrad, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    const stop1 = el('stop', { offset: 0, 'stop-opacity': 0.22 }, grad), stop2 = el('stop', { offset: 1, 'stop-opacity': 0.75 }, grad);
    el('rect', { x: 382, y: 24, width: 242, height: 276, rx: 14, fill: C.panneau, stroke: C.grille, 'stroke-width': 1.5 }, zoom);
    const zEau = el('rect', { x: 382, width: 242, fill: `url(#${idGrad})`, 'clip-path': `url(#${idClip})` }, zoom);
    const zSurf = el('line', { x1: 383, x2: 623, stroke: C.blanc, 'stroke-width': 2, opacity: 0.4 }, zoom);
    const zCyl = el('rect', { x: ZX - ZL / 2, y: ZT, width: ZL, height: ZH, rx: 7, stroke: C.verre, 'stroke-width': TRAIT }, zoom);
    etiquette(zoom, { x: 396, y: 47, texte: L('Forces pressantes', 'Pressure forces'), taille: 13, couleur: C.discret });
    const gCotes = el('g', {}, zoom);
    const fl = (parent: Element) => fleche(parent, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.violet, epaisseur: 2.5 });
    const cotes = [0, 1, 2, 3, 4].map(() => [fl(gCotes), fl(gCotes)]);
    const dessus = [0, 1, 2].map(() => fl(zoom)), dessous = [0, 1, 2].map(() => fl(zoom));
    const vRes = fleche(zoom, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.menthe, epaisseur: 5 });
    const zPA = etiquette(zoom, { x: ZX + 12, y: ZT + 44, texte: 'PA', taille: 15, couleur: C.menthe });
    const zDp = etiquette(zoom, { x: 396, y: 276, texte: '', mono: true, taille: 13, couleur: C.violet });
    const zRes = etiquette(zoom, { x: 396, y: 292, texte: '', mono: true, taille: 13, couleur: C.menthe });

    // Encart de résultat.
    const encart = el('g', {}, scene);
    el('rect', { x: 372, y: 338, width: 252, height: 90, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, taille: number, couleur: string, police = MONO) =>
      el('text', { x: 388, y, fill: couleur, 'font-family': police, 'font-size': taille, 'font-weight': 600 }, encart);
    const titreEncart = ligne(360, 13, C.discret, POLICE);
    const mesuree = ligne(384, 15, C.texte);
    const calculee = ligne(412, 18, C.jaune);

    return ({ etape, t, p }) => {
      const img = { etape, t };
      const rhoS = p.rhoS * 1000, rhoF = p.rhoF * 1000;
      const m: Montage = { s: S_CYL, S: S_EPR, h: H, rhoFluide: rhoF, raideur: RAIDEUR };
      const P = poids(rhoS, VOL), coule = !flotte(rhoS, rhoF);
      const xMax = H * fractionImmergee(rhoS, rhoF);
      const a0 = avancement(img, 0), a1 = avancement(img, 1), a2 = avancement(img, 2), a3 = avancement(img, 3), a4 = avancement(img, 4);

      // Descente de la noix : approche jusqu'à l'affleurement, immersion, puis un peu plus bas si le solide coule.
      const approche = Y_SURF0 - (Y0 + 126 + HC + P * PX_N);
      const D = (approche + descentePour(xMax, m) * K + (coule ? 6 : 0)) * seg(a1, 0.04, 0.94);
      const x = hauteurImmergee((D - approche) / K, m, xMax);
      const vIm = S_CYL * x, PA = poussee(rhoF, vIm);
      const F = forceDynamometre(rhoS, rhoF, VOL, vIm) * seg(a0, 0.4, 0.85, ease.elasticOut);
      const e = F * PX_N;
      const ySurf = Y_SURF0 - monteeNiveau(x, m) * K;
      const yHaut = Y0 + D + 126 + e, yBas = yHaut + HC, yc = yHaut + HC / 2;
      const liquide = mix(C.cyan, C.bleu, ((p.rhoF - 0.8) / 0.5) * 0.8);
      const solide = mix(C.orange, C.metal, (p.rhoS - 0.5) / 2.5);

      // Paillasse.
      epr.liquide((Y_FOND - ySurf) / (Y_FOND - 240), liquide);
      mobile.style.transform = `translateY(${D - 330 * (1 - seg(a0, 0, 0.3, ease.out))}px)`;
      tige.style.transform = `translateY(${e}px)`;
      pendu.style.opacity = String(seg(a0, 0.3, 0.42));
      cyl.setAttribute('fill', solide);
      let d = `M${CX} ${Y0 + 2}`;
      for (let i = 0; i < 8; i++) d += `L${CX + (i % 2 ? 6 : -6)} ${Y0 + 3 + ((i + 0.5) * (8 + e)) / 8}`;
      ressort.setAttribute('d', `${d}L${CX} ${Y0 + 12 + e}`);
      lectureF.textContent = a0 > 0.4 ? `F = ${fmt(F)} N` : '';
      const yVoile = Math.max(ySurf, yHaut);
      set(voile, { y: yVoile, height: clamp(yBas - yVoile, 0, HC), fill: liquide });

      // Vecteurs : poids, tension du dynamomètre, poussée.
      const k = seg(a0, 0.75, 0.95, ease.out);
      vP.maj(CX - 10, yc, CX - 10, yc + P * VEC * k);
      vF.maj(CX, yHaut, CX, yHaut - F * VEC * k);
      const ycIm = yBas - (x * K) / 2; // centre de poussée : centre du volume immergé
      vPA.maj(CX + 10, ycIm, CX + 10, ycIm - PA * VEC);
      legP.textContent = `P = ${fmt(P)} N`;
      legPA.textContent = `PA = ${fmt(PA)} N`;
      show(legP, k);
      show(legPA, seg(a1, 0.3, 0.4));

      // Niveaux et volume déplacé.
      const dV = vIm * 1e6, montee = Y_SURF0 - ySurf;
      niveau0.style.opacity = String(clamp(montee / 4));
      lecV0.style.opacity = String(clamp((montee - 14) / 6));
      set(lecV, { y: ySurf + 4 });
      lecV.textContent = `${fmt(V0 + dV, 0)} mL`;
      const k2 = seg(a2, 0.1, 0.4, ease.out);
      set(bande, { y: ySurf, height: montee, opacity: 0.32 * k2 * (1 - 0.6 * seg(a2, 0.7, 1)) });
      accolade.setAttribute('d', `M323 ${ySurf}H319V${Y_SURF0}H323`);
      accolade.style.opacity = String(k2);
      lecDV.textContent = L(`déplacé : ${fmt(dV, 0)} mL = V`, `displaced: ${fmt(dV, 0)} mL = V`);
      show(lecDV, seg(a2, 0.3, 0.55));

      // Zoom sur les forces pressantes : flèches proportionnelles à la profondeur.
      show(zoom, seg(a3, 0, 0.14), 16);
      const frac = xMax / H;
      const zS = coule ? 58 : ZT + (1 - frac) * ZH;
      set(zEau, { y: zS, height: 261 - zS });
      set(zSurf, { y1: zS, y2: zS });
      stop1.setAttribute('stop-color', liquide);
      stop2.setAttribute('stop-color', liquide);
      zCyl.setAttribute('fill', solide);
      const long = (y: number) => (y > zS + 4 ? 8 + 0.2 * (y - zS) : 0);
      cotes.forEach(([g, dr], i) => {
        const y = ZT + 12 + i * 24, l = long(y) * seg(a3, 0.14 + i * 0.05, 0.36 + i * 0.05, ease.out);
        g.maj(ZX - ZL / 2 - 5 - l, y, ZX - ZL / 2 - 5, y);
        dr.maj(ZX + ZL / 2 + 5 + l, y, ZX + ZL / 2 + 5, y);
      });
      gCotes.style.opacity = String(1 - 0.65 * seg(a3, 0.74, 0.86));
      [-24, 0, 24].forEach((dx, i) => {
        const lh = (coule ? long(ZT) : 0) * seg(a3, 0.48, 0.6, ease.out), lb = long(ZT + ZH) * seg(a3, 0.56, 0.72, ease.out);
        dessus[i].maj(ZX + dx, ZT - 5 - lh, ZX + dx, ZT - 5);
        dessous[i].maj(ZX + dx, ZT + ZH + 5 + lb, ZX + dx, ZT + ZH + 5);
      });
      const kr = seg(a3, 0.78, 0.96, ease.backOut);
      vRes.maj(ZX, ZT + 88, ZX, ZT + 88 - 62 * kr);
      zPA.style.opacity = String(seg(a3, 0.86, 0.96));
      const zHautR = coule ? 0.01 : 0, dp = rhoF * G * xMax;
      zDp.textContent = `Δp = ρ·g·h = ${fmt(dp, 0)} Pa`;
      zRes.textContent = `PA = Δp·S = ${fmt(resultantePression(rhoF, S_CYL, zHautR, zHautR + xMax))} N`;
      zDp.style.opacity = String(seg(a3, 0.62, 0.74));
      zRes.style.opacity = String(seg(a3, 0.86, 0.96));

      // Encart final.
      show(encart, seg(a4, 0.05, 0.35, ease.backOut), 16);
      titreEncart.textContent = coule ? L('Poussée d\'Archimède', 'Archimedes\' upthrust') : L('Le solide flotte : PA = P', 'The solid floats: PA = P');
      mesuree.textContent = `P - F = ${fmt(P - F)} N`;
      calculee.textContent = `ρ·V·g = ${fmt(PA)} N`;

      if (graphique) {
        const vCm = vIm * 1e6, n = 30;
        const pts = (f: (v: number) => number): [number, number][] =>
          a1 > 0 ? Array.from({ length: n + 1 }, (_, i) => [(vCm * i) / n, f((vCm * i) / n)] as [number, number]) : [];
        // Solide flottant en fin d'expérience : PA = P, une seule étiquette pour éviter la superposition.
        const egal = !coule && a4 > 0.3;
        if (a0 > 0.85) graphique.horizontale('poids', P, { couleur: C.corail, label: egal ? undefined : `P = ${fmt(P)} N` });
        else graphique.effacer('poids');
        graphique.courbe('f', pts((v) => forceDynamometre(rhoS, rhoF, VOL, v * 1e-6)), { couleur: C.cyan, epaisseur: 3 });
        graphique.courbe('pa', pts((v) => poussee(rhoF, v * 1e-6)), { couleur: C.menthe, epaisseur: 3 });
        if (a1 > 0) {
          const fin = a4 > 0.3;
          graphique.repere('rf', vCm, F, { couleur: C.cyan, label: Math.abs(F - PA) < 0.15 ? undefined : 'F', rayon: 4 });
          graphique.repere('rpa', vCm, PA, { couleur: fin ? C.jaune : C.menthe, label: egal ? `PA = P = ${fmt(PA)} N` : fin ? `ρ·V·g = ${fmt(PA)} N` : 'PA', rayon: fin ? 6 : 4 });
          if (a2 > 0.3) {
            graphique.verticale('v', vCm, { couleur: C.jaune, label: `V = ${fmt(vCm, 0)} cm³` });
            graphique.opacite('v', seg(a2, 0.3, 0.55));
          } else graphique.effacer('v');
        } else ['rf', 'rpa', 'v'].forEach((id) => graphique.effacer(id));
      }

      const mesures = [
        { label: L('Dynamomètre F', 'Newton meter F'), valeur: a0 > 0.4 ? `${fmt(F)} N` : '...' },
        { label: L('Volume immergé', 'Immersed volume'), valeur: `${fmt(dV, 1)} cm³` },
        { label: L('Poussée P - F', 'Upthrust P - F'), valeur: a0 > 0.85 ? `${fmt(P - F)} N` : '...' },
      ];
      if (a3 > 0.62) mesures.push({ label: L('Écart de pression', 'Pressure difference'), valeur: `${fmt(dp, 0)} Pa` });
      return mesures;
    };
  },
});
