import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { L, avancement, clamp, ease, fmt, lerp, mix, seg } from '../../lib/anim';
import { cercle, definirScene3d } from '../../lib/kit3d';
import { C, themeSombre } from '../../lib/palette';
import { couleurLaser, largeurTache, longueurOnde, pente, serie } from './model';

// Repère : banc le long de x (fente en x = 0, laser du côté négatif), y vertical, z transversal.
// La fente est verticale : la lumière s'étale dans le plan horizontal y = H, comme sur la vue de dessus de scene.ts.
const KX = 4; // unités de scène par mètre, le long du banc
const KZ = 0.06; // unités de scène par millimètre sur l'écran (échelle transversale très dilatée, comme en 2D)
const H = 1.6; // hauteur du faisceau au-dessus du banc
const RB = 0.12; // rayon dessiné du faisceau incident
const X_LASER = -1.98; // sortie du laser (0,5 m avant la fente)
const ZS = 3.9; // demi-largeur utile de l'écran (65 mm)
const PI = Math.PI;

// Séquence de la fente : mêmes valeurs que scene.ts (non exportées par ce fichier).
const A_OUVERTE = 1000; // µm
const SERIE = [200, 120, 100, 70, 50, 40]; // µm
const debut = (i: number) => 0.01 + 0.15 * i;
/** Écartement dessiné des mâchoires (unités de scène), même loi que l'ouverture de scene.ts (px), faisceau de 18 px = 2 RB. */
const ouverture = (a: number) => ((4 + 26 * clamp(Math.log(a / 40) / Math.log(A_OUVERTE / 40)) ** 1.5) * 2 * RB) / 18;

/** Segment droit en trait d'épaisseur constante à l'écran : géométrie unité, placée par position, rotation et échelle. */
function trait(couleur: string, epaisseur = 2, tirets = 0) {
  const geo = new LineGeometry();
  geo.setPositions([0, 0, 0, 1, 0, 0]);
  const mat = new LineMaterial({ color: new THREE.Color(couleur), linewidth: epaisseur, transparent: true, dashed: tirets > 0, dashSize: tirets, gapSize: tirets * 0.8 });
  const ligne = new Line2(geo, mat);
  ligne.computeLineDistances();
  ligne.renderOrder = 3;
  const X = new THREE.Vector3(1, 0, 0), d = new THREE.Vector3();
  return {
    ligne,
    maj(a: THREE.Vector3, b: THREE.Vector3, o = 1) {
      d.subVectors(b, a);
      const l = d.length();
      ligne.visible = l > 1e-4 && o > 0.01;
      if (!ligne.visible) return;
      ligne.position.copy(a);
      ligne.quaternion.setFromUnitVectors(X, d.divideScalar(l));
      ligne.scale.set(l, 1, 1);
      mat.dashScale = l; // tirets de longueur fixe quelle que soit l'échelle
      mat.opacity = o;
    },
  };
}

// Lumière : intensité de diffraction (sinus cardinal au carré, même loi que intensite() de model.ts) et fronts d'onde.
const GLSL_COMMUN = `
  uniform vec3 couleur; uniform float k, demiL, diff, xe, g, kz, tete, pas, phase, d0, oLum, oFig, blancA, blancB, rv;
  varying vec3 vP;
  float profil(float mm) {
    float u = k * mm;
    float i = abs(u) < 1e-4 ? 1.0 : pow(sin(u) / u, 2.0);
    return abs(mm) < demiL ? i : i * diff;
  }
  float onde(float s) { return 0.74 + 0.26 * cos(6.2831853 * (s - phase) / pas); }
`;
const VERTEX = `varying vec3 vP;
  void main() { vec4 w = modelMatrix * vec4(position, 1.0); vP = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const FRAG = {
  // Faisceau incident, du laser à la fente.
  faisceau: `
    void main() {
      if (vP.x > tete) discard;
      gl_FragColor = vec4(mix(couleur, vec3(1.0), 0.12), oLum * 0.55 * onde(vP.x - ${X_LASER.toFixed(2)}));
      #include <colorspace_fragment>
    }`,
  // Éventail après la fente : chaque rayon porte l'intensité du point de l'écran qu'il atteint.
  eventail: `
    void main() {
      float f = vP.x / xe;
      if (f <= 0.0 || f > 1.0 || vP.x > tete) discard;
      float mm = max(abs(vP.z) - g * (1.0 - f), 0.0) / (kz * f);
      float e = profil(mm);
      if (abs(mm) < demiL) e = mix(1.0, e, diff);
      float a = oLum * 0.8 * pow(e, 0.45) * onde(length(vP.xz) + d0);
      if (a < 0.004) discard;
      gl_FragColor = vec4(mix(couleur, vec3(1.0), 0.12), a);
      #include <colorspace_fragment>
    }`,
  // Figure sur l'écran : profil horizontal, hauteur du faisceau à la verticale. Fente ouverte : simple point rond.
  figure: `
    void main() {
      float e = max(profil(vP.z / kz), (1.0 - diff) * exp(-pow(vP.z / ${RB.toFixed(2)}, 2.0)));
      float v = exp(-pow((vP.y - ${H.toFixed(2)}) / mix(${RB.toFixed(2)}, rv, diff), 2.0));
      gl_FragColor = vec4(mix(couleur, vec3(1.0), blancA + blancB * e * e), oFig * pow(e, 0.45) * v);
      #include <colorspace_fragment>
    }`,
};

export default definirScene3d({
  camera: { position: [-9.7, 8, 11.4], cible: [2.8, 1, 0.4], min: 4, max: 45 },

  monter({ scene, calque, etiquette }) {
    const sombre = themeSombre();

    const soleil = new THREE.DirectionalLight(C.blanc, 2.2);
    soleil.position.set(-6, 12, 9);
    scene.add(soleil, new THREE.HemisphereLight(C.blanc, C.metal, sombre ? 0.55 : 1.1));

    // Matériaux « réels » (un jeu par objet : chaque objet a son propre fondu d'entrée), contours au trait de la palette.
    const matiere = (couleur: string, metal = 0.3, rugosite = 0.55) =>
      new THREE.MeshStandardMaterial({ color: couleur, metalness: metal, roughness: rugosite, transparent: true });
    const boite = (parent: THREE.Object3D, mat: THREE.Material, l: number, h: number, p: number, x = 0, y = 0, z = 0, contour?: THREE.Material) => {
      const geo = new THREE.BoxGeometry(l, h, p);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (contour) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), contour));
      parent.add(m);
      return m;
    };
    const tige = (parent: THREE.Object3D, mat: THREE.Material, x: number, y0: number, y1: number, r = 0.06) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, y1 - y0, 16), mat);
      m.position.set(x, (y0 + y1) / 2, 0);
      parent.add(m);
    };
    /** Fondu d'un objet : toutes ses matières suivent la même opacité. */
    const fondu = (g: THREE.Object3D) => {
      const mats: THREE.Material[] = [];
      g.traverse((o) => { const m = (o as THREE.Mesh).material; if (m) mats.push(...[m].flat()); });
      return (o: number) => {
        g.visible = o > 0.01;
        for (const m of mats) m.opacity = o;
      };
    };
    const corps = sombre ? mix(C.panneau, C.metal, 0.35) : mix(C.panneau, C.metal, 0.12);

    // Banc d'optique gradué tous les 10 cm.
    const banc = new THREE.Group();
    const contourBanc = new THREE.LineBasicMaterial({ color: C.metal, transparent: true });
    boite(banc, matiere(corps, 0.4, 0.5), 15.6, 0.3, 1.4, 3.2, -0.15, 0, contourBanc);
    const grad: number[] = [];
    for (let i = -10; i <= 27; i++) {
      const x = (i * KX) / 10;
      grad.push(x, 0.002, 0.7, x, 0.002, i % 5 ? 0.55 : 0.4);
    }
    banc.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(grad, 3)), new THREE.LineBasicMaterial({ color: C.discret, transparent: true })));
    scene.add(banc);
    const fBanc = fondu(banc);

    // Laser : boîtier, buse, voyant, tige et cavalier.
    const laser = new THREE.Group();
    const contourLaser = new THREE.LineBasicMaterial({ color: C.trait, transparent: true });
    const acierLaser = matiere(C.metal, 0.7, 0.35);
    boite(laser, matiere(corps), 2.0, 0.55, 0.55, -3.08, H, 0, contourLaser);
    const buse = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 24), acierLaser);
    buse.rotation.z = PI / 2;
    buse.position.set(-2.03, H, 0);
    laser.add(buse);
    tige(laser, acierLaser, -3.08, 0, H - 0.27);
    boite(laser, acierLaser, 0.5, 0.12, 1.0, -3.08, 0.06, 0);
    const matLed = new THREE.MeshBasicMaterial({ color: C.grille, transparent: true });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), matLed);
    led.position.set(-3.75, H + 0.28, 0);
    laser.add(led);
    scene.add(laser);
    const fLaser = fondu(laser);

    // Fente réglable : monture, deux mâchoires mobiles le long de z.
    const fente = new THREE.Group();
    const contourFente = new THREE.LineBasicMaterial({ color: C.trait, transparent: true });
    const acierFente = matiere(C.metal, 0.75, 0.3);
    boite(fente, acierFente, 0.1, 0.08, 1.9, 0, H + 0.62, 0, contourFente);
    boite(fente, acierFente, 0.1, 0.08, 1.9, 0, H - 0.62, 0, contourFente);
    for (const z of [-0.95, 0.95]) boite(fente, acierFente, 0.1, 1.32, 0.08, 0, H, z, contourFente);
    tige(fente, acierFente, 0, 0, H - 0.66);
    boite(fente, acierFente, 0.5, 0.12, 1.0, 0, 0.06, 0);
    const machoires = [-1, 1].map(() => boite(fente, matiere(mix(C.metal, C.trait, 0.25), 0.8, 0.28), 0.06, 1.16, 0.88, 0, H, 0, contourFente));
    scene.add(fente);
    const fFente = fondu(fente);

    // Écran (face éclairée vers la fente) et règle graduée en millimètres.
    const ecran = new THREE.Group();
    const contourEcran = new THREE.LineBasicMaterial({ color: C.trait, transparent: true });
    boite(ecran, matiere(C.panneau, 0, 0.9), 0.08, 3.1, 2 * ZS + 0.4, 0, H + 0.35, 0, contourEcran);
    tige(ecran, matiere(C.metal, 0.7, 0.35), 0.1, 0, H - 1.2);
    boite(ecran, matiere(C.metal, 0.7, 0.35), 0.5, 0.12, 1.0, 0.1, 0.06, 0);
    scene.add(ecran);
    const fEcran = fondu(ecran);

    const regle = new THREE.Group();
    const YR = H + 0.5; // centre de la règle, au-dessus de la figure (hors de l'éventail vu de la caméra)
    boite(regle, matiere(corps, 0.2, 0.6), 0.03, 0.34, 128 * KZ + 0.24, -0.065, 0, 0, new THREE.LineBasicMaterial({ color: C.metal, transparent: true }));
    const ticks: number[] = [];
    for (let mm = -64; mm <= 64; mm++) {
      const z = mm * KZ, l = mm % 10 === 0 ? 0.15 : mm % 5 === 0 ? 0.1 : 0.06;
      ticks.push(-0.085, -0.17, z, -0.085, -0.17 + l, z);
    }
    regle.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(ticks, 3)), new THREE.LineBasicMaterial({ color: C.trait, transparent: true })));
    ecran.add(regle);
    const fRegle = fondu(regle);
    const nombres = [-60, -40, -20, 0, 20, 40, 60].map((mm) => ({ mm, e: etiquette(String(mm), { couleur: C.texte, taille: 13 }) }));

    // Lumière : uniformes partagés par le faisceau, l'éventail et la figure.
    const u = Object.fromEntries(['k', 'demiL', 'diff', 'xe', 'g', 'tete', 'pas', 'phase', 'd0', 'oLum', 'oFig', 'blancA', 'blancB', 'rv'].map((n) => [n, { value: 0 }])) as Record<string, { value: number }>;
    const uCouleur = { value: new THREE.Color() };
    const uniforms = { ...u, couleur: uCouleur, kz: { value: KZ } };
    u.blancA.value = sombre ? 0.1 : 0;
    u.blancB.value = sombre ? 0.8 : 0.15;
    u.rv.value = 0.2;
    u.d0.value = -X_LASER;
    const lumiere = (frag: string) =>
      new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: GLSL_COMMUN + frag, transparent: true, depthWrite: false, side: THREE.DoubleSide });

    const faisceau = new THREE.Mesh(new THREE.CylinderGeometry(RB, RB, -X_LASER, 24, 1, true), lumiere(FRAG.faisceau));
    faisceau.rotation.z = PI / 2;
    faisceau.position.set(X_LASER / 2, H, 0);
    const eventail = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 2 * ZS + 0.4), lumiere(FRAG.eventail));
    eventail.rotation.x = -PI / 2;
    eventail.position.set(5.2, H, 0);
    const figure = new THREE.Mesh(new THREE.PlaneGeometry(2 * ZS + 0.4, 1.2), lumiere(FRAG.figure));
    figure.rotation.y = -PI / 2;
    figure.position.set(-0.045, H, 0);
    ecran.add(figure);
    faisceau.renderOrder = eventail.renderOrder = figure.renderOrder = 2;
    scene.add(faisceau, eventail);

    // Repères de mesure : cote D, angle θ, extinctions et cote L sur l'écran.
    const coteD = [trait(C.discret, 2), trait(C.discret, 2), trait(C.discret, 2)];
    const axe = trait(C.jaune, 1.5, 0.12), rayon = trait(C.jaune, 1.5, 0.12);
    const arc = cercle(C.jaune, { epaisseur: 2.5, segments: 1440 });
    arc.ligne.rotation.x = PI; // l'arc s'ouvre vers +z, du côté de la caméra
    arc.ligne.position.set(0, H, 0);
    arc.ligne.renderOrder = 3;
    const extinctions = [trait(C.jaune, 2, 0.08), trait(C.jaune, 2, 0.08)];
    const coteL = [trait(C.jaune, 2.5), trait(C.jaune, 2.5), trait(C.jaune, 2.5)];
    scene.add(...[...coteD, axe, rayon, ...extinctions, ...coteL].map((s) => s.ligne), arc.ligne);

    const nomLaser = etiquette('Laser', { couleur: C.discret, taille: 13 });
    const nomLambda = etiquette('', { taille: 14 });
    const nomA = etiquette('', { taille: 14 });
    const nomEcran = etiquette(L('Écran', 'Screen'), { couleur: C.discret, taille: 13 });
    const nomD = etiquette('', { couleur: C.discret, taille: 14 });
    const nomTheta = etiquette('θ = λ/a', { couleur: C.jaune, taille: 15 });
    const nomL = etiquette('', { couleur: C.jaune, taille: 15 });

    // Calque : rappel de l'échelle dilatée, encart du résultat (étape 6).
    const html = (parent: HTMLElement, contenu: string, style = '') => {
      const d = document.createElement('div');
      d.innerHTML = contenu;
      d.style.cssText = style;
      parent.appendChild(d);
      return d;
    };
    // Colonne en haut à gauche, zone vide de la vue initiale (le laser occupe le bas à gauche).
    // Sur petit écran, l'écran monte dans le coin : la colonne passe en bas à droite (l'aide y est masquée).
    const colonne = html(calque, '', 'position:absolute;display:flex;flex-direction:column;gap:.4rem');
    let coin = '';
    const placer = (etroit: boolean) => {
      const voulu = etroit ? 'bas' : 'haut';
      if (voulu === coin) return;
      coin = voulu;
      Object.assign(colonne.style, etroit
        ? { top: '', left: '', bottom: '.6rem', right: '.6rem', alignItems: 'flex-end' }
        : { top: '.6rem', left: '.6rem', bottom: '', right: '', alignItems: 'flex-start' });
    };
    const note = html(colonne, L('Largeurs transversales dilatées', 'Transverse widths exaggerated'), `position:relative;color:${C.discret};font-weight:500`);
    note.className = 'l3d-panneau l3d-large';
    const encart = html(colonne, '', `position:relative;border-color:${C.jaune};min-width:10rem`);
    encart.className = 'l3d-panneau';
    html(encart, L('Pente de la droite', 'Line gradient'), `color:${C.discret}`);
    const txtPente = html(encart, '', 'font-family:var(--mono);font-size:14px');
    const txtLambda = html(encart, '', `font-family:var(--mono);font-size:17px;color:${C.jaune}`);
    const montrer = (d: HTMLElement, o: number) => {
      d.style.display = o > 0.01 ? '' : 'none';
      d.style.opacity = String(clamp(o));
    };

    const A = new THREE.Vector3(), B = new THREE.Vector3();
    const v = (x: number, y: number, z: number, w = A) => w.set(x, y, z);

    return ({ etape, t, T, p }) => {
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((i) => avancement({ etape, t }, i));
      const lambda = p.lambda * 1e-9, D = p.D;

      // Largeur de la fente à l'instant affiché (µm), même séquence que scene.ts.
      let la = lerp(Math.log(A_OUVERTE), Math.log(p.a), seg(a3, 0.1, 0.82));
      SERIE.forEach((s, i) => { la = lerp(la, Math.log(s), seg(a5, debut(i), debut(i) + 0.05)); });
      const a = Math.exp(lerp(la, Math.log(p.a), seg(a5, 0.93, 1)));
      const Lmm = largeurTache(lambda, a * 1e-6, D) * 1e3;
      const diff = clamp(Math.log(A_OUVERTE / a) / Math.log(A_OUVERTE / 250));
      const xe = KX * D, jeu = ouverture(a), g = Math.min(jeu, 2 * RB) / 2;

      // Couleur du laser (model.ts) ; texte assombri en thème clair comme en 2D.
      const rvb = couleurLaser(p.lambda);
      uCouleur.value.setRGB(rvb[0] / 255, rvb[1] / 255, rvb[2] / 255, THREE.SRGBColorSpace);
      const lum = rvb.reduce((s, c, i) => s + [0.2126, 0.7152, 0.0722][i] * (c / 255) ** 2.2, 0);
      const hexLaser = `#${rvb.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
      const lisible = sombre ? mix(hexLaser, C.blanc, 0.35) : mix(hexLaser, C.texte, 0.25 + 0.4 * lum);

      // Étape 1 : le matériel entre sur le banc.
      fBanc(seg(a1, 0, 0.2));
      fLaser(seg(a1, 0.1, 0.25));
      laser.position.x = lerp(-3, 0, seg(a1, 0.1, 0.4, ease.out));
      fFente(seg(a1, 0.3, 0.45));
      fente.position.y = lerp(3, 0, seg(a1, 0.3, 0.6, ease.out));
      fEcran(seg(a1, 0.5, 0.65));
      ecran.position.x = xe + lerp(3, 0, seg(a1, 0.5, 0.8, ease.out));
      machoires[0].position.z = -(jeu / 2 + 0.44);
      machoires[1].position.z = jeu / 2 + 0.44;

      const oD = seg(a1, 0.8, 0.9), xD = lerp(2, xe, seg(a1, 0.8, 1)), zD = 1.05;
      coteD[0].maj(v(0, 0.02, zD), v(xD, 0.02, zD, B), oD);
      coteD[1].maj(v(0, 0.02, zD - 0.15), v(0, 0.02, zD + 0.15, B), oD);
      coteD[2].maj(v(xD, 0.02, zD - 0.15), v(xD, 0.02, zD + 0.15, B), oD);
      nomD.el.textContent = `D = ${fmt(D, 2)} m`;
      nomD.pos.set(xD / 2, 0, zD + 0.75);
      nomD.opacite = oD;

      nomLaser.pos.set(laser.position.x - 3.08, H - 0.5, 1.5);
      nomLaser.opacite = seg(a1, 0.2, 0.35);
      nomLambda.el.textContent = `λ = ${fmt(p.lambda, 0)} nm`;
      nomLambda.el.style.color = lisible;
      nomLambda.pos.set(laser.position.x - 3.08, H + 0.75, 0);
      nomLambda.opacite = seg(a1, 0.2, 0.35);
      nomA.el.textContent = a3 > 0.1 ? `a = ${fmt(a, 0)} µm` : L('Fente ouverte', 'Slit open');
      nomA.pos.set(0, H + 1.2 + fente.position.y, 0);
      nomA.opacite = seg(a1, 0.4, 0.55);
      nomEcran.pos.set(ecran.position.x, H - 1.5, ZS - 0.5); // sous le coin bas de l'écran, côté caméra
      nomEcran.opacite = seg(a1, 0.6, 0.75);

      // Étape 2 : le laser s'allume, la tête du faisceau file jusqu'à l'écran.
      const allume = a2 > 0.12;
      if (allume) matLed.color.copy(uCouleur.value);
      else matLed.color.set(C.grille);
      u.oLum.value = allume ? 1 : 0;
      faisceau.visible = eventail.visible = allume;
      u.tete.value = lerp(X_LASER, xe + 0.1, seg(a2, 0.15, 0.6));
      u.oFig.value = seg(a2, 0.58, 0.74, ease.out);
      figure.visible = u.oFig.value > 0.01;
      u.pas.value = (0.27 * p.lambda) / 650;
      u.phase.value = (T * 0.84) % u.pas.value;

      // Physique de la figure (model.ts) : sinus cardinal au carré, tache centrale de largeur L.
      u.k.value = (PI * a * 1e-6 * 1e-3) / (lambda * D);
      u.demiL.value = Lmm / 2;
      u.diff.value = diff;
      u.xe.value = xe;
      u.g.value = g;

      // Étape 4 : la règle monte, les repères glissent jusqu'aux extinctions, l'angle se dessine.
      fRegle(seg(a4, 0, 0.12));
      regle.position.y = YR + lerp(0.8, 0, seg(a4, 0, 0.22, ease.out));
      // Petit écran : étiquettes relativement plus grosses, les nombres de la règle chevaucheraient la cote L.
      const etroit = calque.clientWidth < 600;
      placer(etroit);
      for (const n of nombres) {
        n.e.pos.set(ecran.position.x - 0.1, regle.position.y + 0.3, n.mm * KZ);
        n.e.opacite = etroit ? 0 : seg(a4, 0.08, 0.2);
      }
      const ecart = (Lmm / 2) * seg(a4, 0.25, 0.55) * KZ;
      const oExt = seg(a4, 0.22, 0.3), xf = ecran.position.x - 0.1;
      extinctions.forEach((s, i) => s.maj(v(xf, H - 0.3, (2 * i - 1) * ecart), v(xf, H + 1.3, (2 * i - 1) * ecart, B), oExt));
      const oL = seg(a4, 0.5, 0.62), yL = H + 1.3;
      coteL[0].maj(v(xf, yL, -ecart), v(xf, yL, ecart, B), oL);
      coteL[1].maj(v(xf, yL - 0.12, -ecart), v(xf, yL + 0.12, -ecart, B), oL);
      coteL[2].maj(v(xf, yL - 0.12, ecart), v(xf, yL + 0.12, ecart, B), oL);
      nomL.el.textContent = `L = ${fmt(Lmm, 1)} mm`;
      nomL.pos.set(xf, yL + 0.55, 0);
      nomL.opacite = oL;

      const bord = (Lmm / 2) * KZ, ang = Math.atan2(bord, xe), R = 0.38 * xe;
      const oTh = seg(a4, 0.68, 0.88);
      axe.maj(v(0, H, 0), v(xe, H, 0, B), 0.7 * oTh);
      rayon.maj(v(0, H, 0), v(xe, H, bord, B), oTh);
      arc.ligne.scale.setScalar(R);
      arc.ligne.geometry.instanceCount = Math.max(1, Math.round((arc.segments * ang) / (2 * PI)));
      arc.mat.opacity = oTh;
      arc.ligne.visible = oTh > 0.01;
      nomTheta.pos.set(R * Math.cos(ang) + 0.2, H, R * Math.sin(ang) + 0.85);
      nomTheta.opacite = oTh;

      // Étapes 5 et 6 : la série de mesures donne la pente de L = f(1/a), puis λ.
      const points = serie(lambda, D, SERIE.map((s) => s * 1e-6)).map(([x, y]) => [x * 1e-3, y * 1e3] as [number, number]);
      const k = pente(points);
      txtPente.textContent = `2·λ·D = ${fmt(k, 2)} mm²`;
      txtLambda.textContent = `λ = ${fmt(longueurOnde(k * 1e-6, D) * 1e9, 0)} nm`;
      montrer(encart, seg(a6, 0.45, 0.75, ease.backOut));
    };
  },
});
