import { avancement, clamp, ease, el, fmt, L, lerp, seg, show } from '../../lib/anim';
import { etiquette, fleche, paillasse } from '../../lib/labkit';
import { C, MONO, POLICE, TRAIT } from '../../lib/palette';
import { definirScene } from '../../lib/scene';
import { dureeVol, intervalle, pointage, portee, position, sommet, trajectoire, vitesse, vitesseInitiale, vitessePointee, type Tir } from './model';

const G = 9.81; // m/s²
const X0 = 84, SOL = 440; // origine du repère, en pixels
const ECH = 110; // pixels par mètre : échelle fixe, la trajectoire tient dans le cadre sur toute la plage des curseurs
const VPX = 11; // pixels par m/s pour les vecteurs vitesse
const APX = 34; // longueur du vecteur accélération (g), en pixels
const N_MAX = 26; // nombre maximal de positions pointées
const X = (x: number) => X0 + x * ECH;
const Y = (y: number) => SOL - y * ECH;

export default definirScene({
  etapes: [
    { titre: L('Filmer le lancer', 'Film the launch'), duree: 5, texte: L('La caméra, fixe et bien de face, filme à <strong>25 images par seconde</strong>. Un étalon de <strong>1,00 m</strong> placé dans le plan du mouvement donne l\'échelle, le lanceur fixe l\'angle de tir <strong>α</strong>.', 'The camera, fixed and facing the motion squarely, films at <strong>25 frames per second</strong>. A <strong>1.00 m</strong> reference rule placed in the plane of the motion gives the scale, and the launcher sets the launch angle <strong>α</strong>.') },
    { titre: L('Pointer image par image', 'Track frame by frame'), duree: 10, texte: L('On repère le centre de la balle sur chaque image retenue : c\'est la <strong>chronophotographie</strong>. Les composantes <strong>v<sub>x</sub></strong> et <strong>v<sub>y</sub></strong> de la vitesse se reportent en direct sur le graphique.', 'The centre of the ball is marked on each selected frame: this is the <strong>chronophotograph</strong>. The components <strong>v<sub>x</sub></strong> and <strong>v<sub>y</sub></strong> of the velocity are plotted live on the graph.') },
    { titre: L('Tracer vitesse et accélération', 'Draw velocity and acceleration'), duree: 8, texte: L('Le vecteur vitesse est <strong>tangent</strong> à la trajectoire. Le vecteur accélération, lui, est partout le même : vertical, vers le bas, de valeur <strong>g</strong>. Sur le graphique, v<sub>x</sub> est constante et v<sub>y</sub> décroît avec une pente égale à -g.', 'The velocity vector is <strong>tangent</strong> to the trajectory. The acceleration vector is the same everywhere: vertical, directed downwards, of magnitude <strong>g</strong>. On the graph, v<sub>x</sub> is constant and v<sub>y</sub> decreases with a gradient equal to -g.') },
    { titre: L('Superposer la parabole modèle', 'Superimpose the model parabola'), duree: 7, texte: L('La deuxième loi de Newton conduit à une trajectoire <strong>parabolique</strong>. Elle passe par tous les points du pointage. Au sommet <strong>S</strong>, v<sub>y</sub> s\'annule.', 'Newton\'s second law leads to a <strong>parabolic</strong> trajectory. It passes through all the tracked points. At the highest point <strong>S</strong>, v<sub>y</sub> is zero.') },
    { titre: L('Mesurer la flèche et la portée', 'Measure maximum height and range'), duree: 6, texte: L('La <strong>flèche</strong> est l\'altitude du sommet, la <strong>portée</strong> l\'abscisse du point de chute. Changez la vitesse initiale, l\'angle ou la hauteur de lancement et observez la trajectoire.', 'The <strong>maximum height</strong> is the height of the highest point, the <strong>range</strong> is the x-coordinate of the landing point. Change the initial speed, the angle or the launch height and observe the trajectory.') },
  ],
  parametres: [
    { id: 'v0', label: L('Vitesse initiale', 'Initial speed'), min: 3.5, max: 6, pas: 0.1, valeur: 5, unite: 'm/s', decimales: 1 },
    { id: 'alpha', label: L('Angle de tir', 'Launch angle'), min: 20, max: 70, pas: 1, valeur: 50, unite: '°', decimales: 0 },
    { id: 'h', label: L('Hauteur de lancement', 'Launch height'), min: 0.4, max: 1.2, pas: 0.05, valeur: 0.8, unite: 'm', decimales: 2 },
  ],
  graphique: {
    x: { label: 't (s)', min: 0, max: 1.4, pas: 0.2 },
    y: { label: 'v (m/s)', min: -8, max: 6, pas: 2 },
    titre: L('vx et vy', 'vx and vy'),
  },
  affiche: { etape: 3, t: 1 },

  monter({ scene, graphique }) {
    paillasse(scene, SOL);

    // Repère : axe (Ox) confondu avec le sol, axe (Oy) à la verticale du lanceur.
    const gAxes = el('g', {}, scene);
    el('line', { x1: X0, x2: X0, y1: SOL, y2: 122, stroke: C.discret, 'stroke-width': 1.5 }, gAxes);
    for (let m = 0.5; m <= 2.5; m += 0.5) el('line', { x1: X0, x2: X0 + (m % 1 ? 5 : 9), y1: Y(m), y2: Y(m), stroke: C.discret, 'stroke-width': 1.5 }, gAxes);
    for (let m = 1; m <= 4; m++) {
      el('line', { x1: X(m), x2: X(m), y1: SOL, y2: SOL + 6, stroke: C.discret, 'stroke-width': 1.5 }, gAxes);
      etiquette(gAxes, { x: X(m), y: SOL + 20, texte: String(m), ancre: 'middle', taille: 13, mono: true, couleur: C.discret });
    }
    etiquette(gAxes, { x: 624, y: SOL + 20, texte: 'x (m)', ancre: 'end', taille: 13, couleur: C.discret });
    etiquette(gAxes, { x: X0, y: 112, texte: 'y (m)', ancre: 'middle', taille: 13, couleur: C.discret });
    etiquette(gAxes, { x: X0 - 10, y: Y(2) + 5, texte: '2', ancre: 'end', taille: 13, mono: true, couleur: C.discret });

    // Étalon de longueur : 1,00 m, bandes de 10 cm.
    const gEtalon = el('g', {}, scene);
    for (let i = 0; i < 10; i++) el('rect', { x: 24, y: SOL - (i + 1) * (ECH / 10), width: 8, height: ECH / 10, fill: i % 2 ? C.corail : C.blanc }, gEtalon);
    el('rect', { x: 24, y: SOL - ECH, width: 8, height: ECH, fill: 'none', stroke: C.verre, 'stroke-width': 1.2 }, gEtalon);
    etiquette(gEtalon, { x: 28, y: SOL - ECH - 8, texte: '1 m', ancre: 'middle', taille: 13, mono: true });

    // Parabole modèle, flèche et portée (sous les points).
    const parabole = el('path', { fill: 'none', stroke: C.violet, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, scene);
    const ligneFleche = el('line', { stroke: C.orange, 'stroke-width': 2, 'stroke-dasharray': '6 5', 'stroke-linecap': 'round' }, scene);
    const flPortee = fleche(scene, { x1: X0, y1: SOL, x2: X0, y2: SOL, couleur: C.orange, epaisseur: 3.5 });

    // Positions pointées.
    const gPoints = el('g', {}, scene);
    const points = Array.from({ length: N_MAX }, () => el('circle', { fill: C.jaune, stroke: C.fond, 'stroke-width': 1.2 }, gPoints));

    // Vecteurs tracés à l'étape 3.
    const vecV = Array.from({ length: 5 }, () => fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.cyan, epaisseur: 2.5 }));
    const vecA = Array.from({ length: 5 }, () => fleche(scene, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.corail, epaisseur: 2.5 }));

    // Lanceur : pied, tube orientable, repère d'angle.
    const gAngle = el('g', {}, scene);
    const refAngle = el('line', { stroke: C.discret, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, gAngle);
    const arc = el('path', { fill: 'none', stroke: C.texte, 'stroke-width': 1.5 }, gAngle);
    const etiqAngle = etiquette(gAngle, { x: 0, y: 0, texte: '', taille: 13, mono: true });
    const gLanceur = el('g', {}, scene);
    const pied = el('rect', { x: X0 - 3, width: 6, rx: 2, fill: C.metal }, gLanceur);
    el('rect', { x: X0 - 24, y: SOL - 7, width: 48, height: 7, rx: 3, fill: C.metal }, gLanceur);
    const tube = el('g', {}, gLanceur);
    el('rect', { x: -54, y: -6, width: 8, height: 12, rx: 2, fill: C.orange }, tube);
    el('rect', { x: -48, y: -10, width: 44, height: 20, rx: 5, fill: C.panneau, stroke: C.verre, 'stroke-width': TRAIT }, tube);

    // Balle en vol, vecteur vitesse et ses composantes.
    const gVol = el('g', {}, scene);
    const compX = el('line', { stroke: C.menthe, 'stroke-width': 2, 'stroke-dasharray': '4 4' }, gVol);
    const compY = el('line', { stroke: C.rose, 'stroke-width': 2, 'stroke-dasharray': '4 4' }, gVol);
    const flVol = fleche(gVol, { x1: 0, y1: 0, x2: 0, y2: 0, couleur: C.cyan });
    const balle = el('circle', { fill: C.jaune, stroke: C.blanc, 'stroke-width': 2 }, scene);

    // Sommet, annotations de mesure.
    const gSommet = el('g', {}, scene);
    const pointS = el('circle', { r: 6, fill: C.fond, stroke: C.jaune, 'stroke-width': 3 }, gSommet);
    const etiqS = etiquette(gSommet, { x: 0, y: 0, texte: 'S', ancre: 'middle', couleur: C.jaune });
    const etiqFleche = etiquette(scene, { x: 0, y: 0, texte: '', taille: 13, mono: true, couleur: C.orange });
    const etiqPortee = etiquette(scene, { x: 0, y: SOL - 10, texte: '', taille: 13, mono: true, couleur: C.orange });

    // Bandeau haut : caméra, légende, équation du modèle.
    const gRec = el('g', {}, scene);
    const voyant = el('circle', { cx: 24, cy: 31, r: 6, fill: C.corail }, gRec);
    etiquette(gRec, { x: 38, y: 36, texte: L('25 img/s', '25 fps'), taille: 13, mono: true });
    const etiqDt = etiquette(scene, { x: 18, y: 60, texte: '', taille: 13, mono: true, couleur: C.jaune });
    const legV = el('g', {}, scene), legA = el('g', {}, scene);
    fleche(legV, { x1: 136, y1: 31, x2: 166, y2: 31, couleur: C.cyan, epaisseur: 2.5 });
    etiquette(legV, { x: 174, y: 36, texte: L('vitesse v, tangente', 'velocity v, tangent'), taille: 14, couleur: C.cyan });
    fleche(legA, { x1: 136, y1: 54, x2: 166, y2: 54, couleur: C.corail, epaisseur: 2.5 });
    etiquette(legA, { x: 174, y: 59, texte: L('accélération a = g', 'acceleration a = g'), taille: 14, couleur: C.corail });
    const etiqEq = etiquette(scene, { x: 136, y: 84, texte: 'y = -g·x²/(2·v0²·cos²α) + x·tan α + h', taille: 13, mono: true, couleur: C.violet });

    // Encart de résultat (dernière étape).
    const encart = el('g', {}, scene);
    el('rect', { x: 436, y: 100, width: 188, height: 92, rx: 14, fill: C.panneau, stroke: C.jaune, 'stroke-width': 1.5 }, encart);
    const ligne = (y: number, couleur: string) => el('text', { x: 450, y, fill: couleur, 'font-family': MONO, 'font-size': 14, 'font-weight': 600 }, encart);
    const resFleche = ligne(126, C.orange), resPortee = ligne(150, C.orange), resDuree = ligne(176, C.texte);
    el('text', { x: 0, y: 0, 'font-family': POLICE }, encart);

    return (img) => {
      const { T, p } = img;
      const tir: Tir = { v0: p.v0, alpha: p.alpha, g: G, h: p.h };
      const Tv = dureeVol(tir), dt = intervalle(tir), pts = pointage(tir, dt), n = pts.length - 1;
      const S = sommet(tir), xP = portee(tir), v0 = vitesseInitiale(tir), yL = Y(tir.h);
      const [a0, a1, a2, a3, a4] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));

      // Étape 1 : le repère, l'étalon et le lanceur s'installent, le tube s'oriente, la balle est chargée.
      show(gAxes, seg(a0, 0, 0.25));
      show(gEtalon, seg(a0, 0.15, 0.4), 20);
      show(gLanceur, seg(a0, 0.3, 0.55), 30);
      pied.setAttribute('y', String(yL));
      pied.setAttribute('height', String(SOL - yL));
      const ang = tir.alpha * seg(a0, 0.55, 0.82, ease.backOut), rad = (ang * Math.PI) / 180;
      const recul = 7 * Math.sin(Math.PI * seg(a1, 0.05, 0.22, ease.out));
      tube.setAttribute('transform', `translate(${X0} ${yL}) rotate(${-ang}) translate(${-recul} 0)`);
      // Tir tendu : le repère d'angle s'efface quand les vecteurs accélération arrivent, pour ne pas les chevaucher.
      gAngle.style.opacity = String(seg(a0, 0.58, 0.8) * (1 - (1 - clamp((tir.alpha - 38) / 10)) * seg(a2, 0.45, 0.55)));
      refAngle.setAttribute('x1', String(X0)); refAngle.setAttribute('x2', String(X0 + 56));
      refAngle.setAttribute('y1', String(yL)); refAngle.setAttribute('y2', String(yL));
      arc.setAttribute('d', `M${X0 + 36} ${yL}A36 36 0 0 0 ${X0 + 36 * Math.cos(rad)} ${yL - 36 * Math.sin(rad)}`);
      etiqAngle.textContent = `α = ${fmt(ang, 0)}°`;
      etiqAngle.setAttribute('x', String(X0 + 12)); etiqAngle.setAttribute('y', String(yL + 19));
      show(gRec, seg(a0, 0.86, 1));
      voyant.style.opacity = a1 > 0 && a1 < 1 && Math.sin(T * 6) < 0 ? '0.25' : '1';

      // Étape 2 : la balle vole, chaque image retenue laisse un point.
      const vol = seg(a1, 0.08, 0.94, ease.lin), tv = vol * Tv;
      const pos = position(tv, tir), v = vitesse(tv, tir), bx = X(pos.x), by = Y(pos.y);
      balle.setAttribute('cx', String(bx));
      balle.setAttribute('cy', String(Math.min(by, SOL - 7)));
      balle.setAttribute('r', String(Math.max(0, 7 * seg(a0, 0.82, 0.96, ease.backOut))));
      points.forEach((c, i) => {
        const vu = i <= n && vol > 0 && tv >= pts[i].t - 1e-9;
        c.style.opacity = vu ? '1' : '0';
        if (!vu) return;
        c.setAttribute('cx', String(X(pts[i].x)));
        c.setAttribute('cy', String(Y(pts[i].y)));
        c.setAttribute('r', String(4 + 5 * (1 - clamp((tv - pts[i].t) / dt)) * (1 - seg(a1, 0.94, 1))));
      });
      gVol.style.opacity = String(vol > 0 && vol < 1 ? seg(vol, 0, 0.05) * (1 - seg(vol, 0.88, 1)) : 0);
      flVol.maj(bx, by, bx + v.vx * VPX, by - v.vy * VPX);
      compX.setAttribute('x1', String(bx)); compX.setAttribute('x2', String(bx + v.vx * VPX));
      compX.setAttribute('y1', String(by)); compX.setAttribute('y2', String(by));
      compY.setAttribute('x1', String(bx)); compY.setAttribute('x2', String(bx));
      compY.setAttribute('y1', String(by)); compY.setAttribute('y2', String(by - v.vy * VPX));
      etiqDt.textContent = `Δt = ${fmt(dt * 1000, 0)} ms`;
      show(etiqDt, seg(a1, 0.04, 0.14));

      // Étape 3 : vecteurs vitesse (différence centrée, comme en TP), puis vecteurs accélération, tous identiques.
      show(legV, seg(a2, 0.02, 0.14));
      show(legA, seg(a2, 0.48, 0.6));
      vecV.forEach((f, k) => {
        const i = clamp(Math.round((n * (k + 1)) / 6), 1, n - 1), pt = pts[i], vp = vitessePointee(pts, i);
        const px = X(pt.x), py = Y(pt.y);
        const pv = py - vp.vy * VPX > 432 ? 0 : seg(a2, 0.04 + k * 0.08, 0.2 + k * 0.08, ease.out);
        f.maj(px, py, px + vp.vx * VPX * pv, py - vp.vy * VPX * pv);
        const pa = py + APX > 430 ? 0 : seg(a2, 0.5 + k * 0.07, 0.68 + k * 0.07, ease.backOut);
        vecA[k].maj(px, py, px, py + APX * pa);
      });

      // Étape 4 : la parabole modèle se trace sur les points, le sommet est repéré.
      const xFin = xP * seg(a3, 0.05, 0.65);
      parabole.style.opacity = a3 > 0 ? '1' : '0';
      parabole.setAttribute('d', 'M' + Array.from({ length: 49 }, (_, i) => `${X((xFin * i) / 48).toFixed(1)} ${Y(trajectoire((xFin * i) / 48, tir)).toFixed(1)}`).join('L'));
      show(etiqEq, seg(a3, 0.08, 0.3));
      const pS = seg(a3, 0.7, 0.9, ease.backOut);
      gSommet.style.opacity = String(clamp(pS));
      pointS.setAttribute('cx', String(X(S.x))); pointS.setAttribute('cy', String(Y(S.y)));
      pointS.setAttribute('r', String(Math.max(0, 6 * pS)));
      etiqS.setAttribute('x', String(X(S.x))); etiqS.setAttribute('y', String(Y(S.y) - 14));

      // Étape 5 : flèche, portée, encart.
      const pF = seg(a4, 0.05, 0.35);
      ligneFleche.style.opacity = a4 > 0 ? '1' : '0';
      ligneFleche.setAttribute('x1', String(X(S.x))); ligneFleche.setAttribute('x2', String(X(S.x)));
      ligneFleche.setAttribute('y1', String(Y(S.y) + 8)); ligneFleche.setAttribute('y2', String(lerp(Y(S.y) + 8, SOL, pF)));
      etiqFleche.textContent = `yS = ${fmt(S.y, 2)} m`;
      // Trajectoire basse : l'étiquette passe à droite de S, au-dessus de la courbe.
      const bas = SOL - Y(S.y) < 110;
      etiqFleche.setAttribute('x', String(X(S.x) + (bas ? 16 : 9))); etiqFleche.setAttribute('y', String(bas ? Y(S.y) - 14 : (Y(S.y) + SOL) / 2 + 12));
      show(etiqFleche, seg(a4, 0.3, 0.45));
      flPortee.maj(X0, SOL, lerp(X0, X(xP), seg(a4, 0.35, 0.7)), SOL);
      const aGauche = X(xP) > 330;
      etiqPortee.textContent = `xP = ${fmt(xP, 2)} m`;
      etiqPortee.setAttribute('x', String(X(xP) + (aGauche ? -34 : 16)));
      etiqPortee.setAttribute('text-anchor', aGauche ? 'end' : 'start');
      show(etiqPortee, seg(a4, 0.66, 0.8));
      show(encart, seg(a4, 0.6, 0.9, ease.backOut), 16);
      resFleche.textContent = L(`Flèche yS = ${fmt(S.y, 2)} m`, `Height yS = ${fmt(S.y, 2)} m`);
      resPortee.textContent = L(`Portée xP = ${fmt(xP, 2)} m`, `Range xP = ${fmt(xP, 2)} m`);
      resDuree.textContent = L(`Durée tP = ${fmt(Tv, 2)} s`, `Time tP = ${fmt(Tv, 2)} s`);

      if (graphique) {
        const vus = pts.slice(1, n).filter((_, k) => vol > 0 && tv >= pts[k + 2].t - 1e-9);
        graphique.nuage('vx', vus.map((pt, k) => [pt.t, vitessePointee(pts, k + 1).vx]), { couleur: C.menthe, rayon: 3 });
        graphique.nuage('vy', vus.map((pt, k) => [pt.t, vitessePointee(pts, k + 1).vy]), { couleur: C.rose, rayon: 3 });
        if (vol > 0 && vol < 1) graphique.verticale('t', tv, { couleur: C.discret });
        else graphique.effacer('t');
        const tm = Tv * seg(a2, 0.5, 0.95, ease.lin);
        graphique.courbe('mvx', a2 > 0.5 ? [[0, v0.vx], [tm, v0.vx]] : [], { couleur: C.menthe, epaisseur: 2 });
        graphique.courbe('mvy', a2 > 0.5 ? [[0, v0.vy], [tm, v0.vy - G * tm]] : [], { couleur: C.rose, epaisseur: 2 });
        if (a2 > 0.8) {
          graphique.repere('lvx', tm, v0.vx, { couleur: C.menthe, rayon: 3, label: L('vx constante', 'vx constant') });
          const tl = Math.min(tm, 0.95); // l'étiquette reste à droite du point, hors de la droite
          graphique.repere('lvy', tl, v0.vy - G * tl, { couleur: C.rose, rayon: 3, label: L('vy : pente -g', 'vy: gradient -g') });
        } else {
          graphique.effacer('lvx');
          graphique.effacer('lvy');
        }
        if (a3 > 0.7) {
          graphique.verticale('ts', S.t, { couleur: C.jaune });
          graphique.repere('s', S.t, 0, { couleur: C.jaune, label: L(`vy = 0 à tS = ${fmt(S.t, 2)} s`, `vy = 0 at tS = ${fmt(S.t, 2)} s`) });
          graphique.opacite('ts', seg(a3, 0.7, 0.85));
          graphique.opacite('s', seg(a3, 0.8, 0.95));
        } else {
          graphique.effacer('ts');
          graphique.effacer('s');
        }
      }

      const mesures = [
        { label: L('Date t', 'Time t'), valeur: `${fmt(tv, 2)} s` },
        { label: L('Vitesse v', 'Speed v'), valeur: `${fmt(Math.hypot(v.vx, v.vy), 2)} m/s` },
        { label: L('Composante vy', 'Component vy'), valeur: `${fmt(v.vy, 2)} m/s` },
      ];
      if (a4 > 0.6) mesures.push({ label: L('Portée', 'Range'), valeur: `${fmt(xP, 2)} m` });
      return mesures;
    };
  },
});
