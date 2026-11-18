import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { L, avancement, clamp, ease, fmt, lerp, mix, rng, seg } from '../../lib/anim';
import { cercle, definirScene3d, fleche } from '../../lib/kit3d';
import { C, themeSombre } from '../../lib/palette';
import { angleEmergent, cercleOculaire, grossissement, imageIntermediaire, marche, propager, type Lunette } from './model';

const DEG = Math.PI / 180;
const PI = Math.PI;
// Mêmes valeurs que scene.ts (constantes non exportées par ce fichier) : à garder identiques.
const THETA = 1; // degrés : inclinaison maximale du faisceau incident
const H = 0.8; // cm : rayon du faisceau sur l'objectif
const R1 = 1.9, R2 = 1.6; // cm : rayons de l'objectif et de l'oculaire
const TIRAGE0 = 1.45; // l'oculaire arrive à 1,45 f'2 de F'1

// Repère : axe optique selon x (lumière vers +x), objectif O1 en x = XO, plan méridien vertical z = 0.
// Comme en 2D, le schéma est dilaté 10 fois perpendiculairement à l'axe (affinité : droites, parallélisme
// et points de concours conservés) : 1 cm vaut U = 0,1 unité le long de l'axe et 1 unité en travers.
const U = 0.1, XO = -3;
const D0 = 30; // cm : longueur du faisceau incident dessinée avant l'objectif
const RAIL = -2.62; // dessus du rail du banc
const SOL = -3.3;
const NB = 32; // points du contour du faisceau
const NR = 8; // rayons dessinés sur le contour (un point sur quatre)
const NG = 14, PAS_G = 0.9; // grains de lumière par rayon et leur espacement
const X = (cm: number) => XO + cm * U;

/** Segments épais (pixels constants à l'écran), réécrits à chaque image sans réallocation. */
function traits(couleur: string, n: number, epaisseur: number) {
  const geo = new LineSegmentsGeometry();
  geo.setPositions(new Float32Array(n * 6));
  const mat = new LineMaterial({ color: new THREE.Color(couleur), linewidth: epaisseur, transparent: true });
  const ligne = new LineSegments2(geo, mat);
  ligne.frustumCulled = false;
  const tampon = (geo.getAttribute('instanceStart') as THREE.InterleavedBufferAttribute).data;
  const a = tampon.array as Float32Array;
  return {
    ligne,
    /** Segment i de (x1, y1, z1) à (x2, y2, z2). */
    seg(i: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
      a.set([x1, y1, z1, x2, y2, z2], i * 6);
    },
    /** Polyligne de np points (x, y, z à la suite) écrite à partir du segment i0 ; renvoie le segment suivant. */
    poly(pts: ArrayLike<number>, np: number, i0 = 0) {
      for (let k = 0; k < np - 1; k++) for (let c = 0; c < 6; c++) a[(i0 + k) * 6 + c] = pts[k * 3 + c];
      return i0 + np - 1;
    },
    /** Trace les nb premiers segments avec l'opacité o. */
    fin(nb: number, o: number) {
      geo.instanceCount = nb;
      mat.opacity = clamp(o);
      ligne.visible = nb > 0 && o > 0.01;
      tampon.needsUpdate = true;
    },
  };
}

/** Matériau dont l'opacité suit fondu() (opacité de base mémorisée). */
const fondable = <T extends THREE.Material>(m: T) => {
  m.transparent = true;
  m.userData.base = m.opacity;
  return m;
};
function fondu(o3: THREE.Object3D, o: number) {
  o3.visible = o > 0.01;
  if (!o3.visible) return;
  o3.traverse((x) => {
    const m = (x as THREE.Mesh).material as THREE.Material | undefined;
    if (m && 'base' in m.userData) m.opacity = m.userData.base * clamp(o);
  });
}

/** Ligne brisée de 5 stations tronquée à l'abscisse front : les stations au-delà se replient sur le front de lumière. */
function tronquer(src: Float32Array, front: number, dst: Float32Array) {
  dst[0] = src[0]; dst[1] = src[1]; dst[2] = src[2];
  let fini = false;
  for (let k = 1; k < 5; k++) {
    const i = 3 * k;
    if (fini) { dst[i] = dst[i - 3]; dst[i + 1] = dst[i - 2]; dst[i + 2] = dst[i - 1]; continue; }
    if (src[i] <= front) { dst[i] = src[i]; dst[i + 1] = src[i + 1]; dst[i + 2] = src[i + 2]; continue; }
    const xa = src[i - 3], u = src[i] > xa ? clamp((front - xa) / (src[i] - xa)) : 0;
    for (let c = 0; c < 3; c++) dst[i + c] = lerp(src[i - 3 + c], src[i + c], u);
    fini = true;
  }
}

/** Lune gibbeuse en SVG (même dessin que la vue 2D), dans un médaillon de ciel nocturne. */
function medaillonSvg(couleur: string, graine: number) {
  const r = rng(graine);
  let etoiles = '';
  for (let i = 0; i < 7; i++) {
    const a = r() * 6.283, d = 14 + r() * 26;
    etoiles += `<circle cx="${(d * Math.cos(a)).toFixed(1)}" cy="${(d * Math.sin(a)).toFixed(1)}" r="${(0.7 + r() * 0.7).toFixed(2)}" fill="${C.blanc}" opacity="0.55"/>`;
  }
  const sol = mix(C.blanc, C.metal, 0.12), cratere = mix(C.blanc, C.metal, 0.6);
  return `<svg viewBox="-50 -50 100 100" style="width:clamp(44px, 12vw, 72px);height:auto" aria-hidden="true"><circle r="46" fill="${mix(C.ombre, C.bleu, 0.15)}" stroke="${couleur}" stroke-width="2.5"/>${etoiles}`
    + `<g class="astre"><circle r="10" fill="${mix(C.metal, C.ombre, 0.55)}"/><path d="M0 -10A10 10 0 0 1 0 10A3 10 0 0 1 0 -10Z" fill="${sol}"/>`
    + `<circle cx="4.2" cy="-4.4" r="1.7" fill="${cratere}"/><circle cx="5.8" cy="3.4" r="1.1" fill="${cratere}"/><circle cx="0.4" cy="1.6" r="1.3" fill="${cratere}"/></g></svg>`;
}

export default definirScene3d({
  camera: { position: [0.3, 3.2, 15.2], cible: [-0.5, -0.45, 0], min: 4, max: 32 },

  monter({ scene, calque, etiquette }) {
    const sombre = themeSombre();

    const soleil = new THREE.DirectionalLight(C.blanc, 2.2);
    soleil.position.set(-4, 8, 10);
    scene.add(soleil, new THREE.HemisphereLight(C.blanc, C.bleu, sombre ? 0.6 : 1));

    // Sol : quadrillage discret sous le banc.
    const quad: number[] = [];
    for (let x = -7; x <= 7; x++) quad.push(x, SOL, -3, x, SOL, 3);
    for (let z = -3; z <= 3; z++) quad.push(-7, SOL, z, 7, SOL, z);
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(quad, 3)), new THREE.LineBasicMaterial({ color: C.grille })));

    // Banc d'optique : rail gradué tous les 5 cm, deux pieds.
    const metal = () => new THREE.MeshStandardMaterial({ color: C.metal, metalness: 0.3, roughness: 0.45 });
    const rail = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.16, 0.5), metal());
    rail.position.set(0.9, RAIL - 0.08, 0);
    scene.add(rail);
    for (const x of [-3.4, 5.2]) {
      const pied = new THREE.Mesh(new THREE.BoxGeometry(0.4, SOL - RAIL + 0.16, 0.7), metal());
      pied.position.set(x, (SOL + RAIL - 0.16) / 2, 0);
      scene.add(pied);
    }
    const grad: number[] = [];
    for (let cm = -5; cm <= 80; cm += 5) grad.push(X(cm), RAIL - (cm % 10 ? 0.06 : 0.02), 0.252, X(cm), RAIL - 0.15, 0.252);
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(grad, 3)), new THREE.LineBasicMaterial({ color: C.fond })));

    // Axe optique en tirets.
    const axe = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(X(-D0) - 0.2, 0, 0), new THREE.Vector3(6, 0, 0)]), new THREE.LineDashedMaterial({ color: C.discret, dashSize: 0.2, gapSize: 0.1, transparent: true, opacity: 0.8 }));
    axe.computeLineDistances();
    scene.add(axe);

    /** Tige et cavalier sous un élément dont le bas est à yBas. */
    const support = (g: THREE.Group, yBas: number) => {
      const m = fondable(metal());
      const tige = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, yBas - RAIL - 0.1, 12), m);
      tige.position.y = (yBas + RAIL + 0.1) / 2;
      const cavalier = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.62), fondable(new THREE.MeshStandardMaterial({ color: C.discret, metalness: 0.3, roughness: 0.45 })));
      cavalier.position.y = RAIL + 0.07;
      g.add(tige, cavalier);
    };

    // Lentille biconvexe (profil de révolution, axe local y), épaisseur réglée par scale.y.
    const profil: THREE.Vector2[] = [];
    for (let i = 0; i <= 16; i++) profil.push(new THREE.Vector2(i / 16, -0.5 * (1 - 0.92 * (i / 16) ** 2)));
    for (let i = 16; i >= 0; i--) profil.push(new THREE.Vector2(i / 16, 0.5 * (1 - 0.92 * (i / 16) ** 2)));
    const lentille = (r: number, couleur: string) => {
      const g = new THREE.Group();
      const verre = new THREE.Mesh(new THREE.LatheGeometry(profil, 64), fondable(new THREE.MeshStandardMaterial({ color: couleur, opacity: sombre ? 0.22 : 0.16, roughness: 0.12, depthWrite: false, side: THREE.DoubleSide })));
      verre.rotation.z = -PI / 2;
      verre.scale.set(r, 0.3, r);
      const bague = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 12, 96), fondable(new THREE.MeshStandardMaterial({ color: couleur, metalness: 0.2, roughness: 0.4 })));
      bague.rotation.y = PI / 2;
      g.add(verre, bague);
      support(g, -r);
      scene.add(g);
      return { g, verre };
    };
    const objectif = lentille(R1, C.cyan), oculaire = lentille(R2, C.rose);

    // Écran de l'étape 1 : plaque dépolie dans le plan focal image de l'objectif.
    const ecran = new THREE.Group();
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 3.4), fondable(new THREE.MeshStandardMaterial({ color: C.verre, opacity: sombre ? 0.4 : 0.75, roughness: 0.9, depthWrite: false })));
    const bordEcran = new THREE.LineSegments(new THREE.EdgesGeometry(plaque.geometry), fondable(new THREE.LineBasicMaterial({ color: C.trait, opacity: 0.7 })));
    ecran.add(plaque, bordEcran);
    support(ecran, -1.7);
    scene.add(ecran);

    // Plan focal commun (étape 2) : F2 rejoint F'1.
    const plan = new THREE.Group();
    plan.add(
      new THREE.Mesh(new THREE.PlaneGeometry(2.8, 2.8), fondable(new THREE.MeshBasicMaterial({ color: C.menthe, opacity: sombre ? 0.08 : 0.07, side: THREE.DoubleSide, depthWrite: false }))),
      new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.8, 2.8)), fondable(new THREE.LineBasicMaterial({ color: C.menthe, opacity: 0.55 }))),
    );
    plan.rotation.y = PI / 2;
    scene.add(plan);

    // Œil, pupille placée sur le cercle oculaire.
    const oeil = new THREE.Group();
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 24), fondable(new THREE.MeshStandardMaterial({ color: C.verre, roughness: 0.3 })));
    globe.position.x = 0.32;
    const iris = new THREE.Mesh(new THREE.CircleGeometry(0.14, 32), fondable(new THREE.MeshStandardMaterial({ color: C.bleu, roughness: 0.4 })));
    const pupille = new THREE.Mesh(new THREE.CircleGeometry(0.065, 24), fondable(new THREE.MeshBasicMaterial({ color: C.ombre })));
    iris.rotation.y = pupille.rotation.y = -PI / 2;
    iris.position.x = 0.012;
    pupille.position.x = 0.004;
    oeil.add(globe, iris, pupille);
    scene.add(oeil);

    // Faisceau : enveloppe translucide (anneaux de NB points aux 5 stations), rayons, grains de lumière.
    const posTube = new THREE.BufferAttribute(new Float32Array(NB * 5 * 3), 3);
    const geoTube = new THREE.BufferGeometry().setAttribute('position', posTube);
    const idx: number[] = [];
    for (let k = 0; k < 4; k++) for (let i = 0; i < NB; i++) {
      const a = k * NB + i, b = k * NB + ((i + 1) % NB);
      idx.push(a, b, a + NB, b, b + NB, a + NB);
    }
    geoTube.setIndex(idx);
    const tube = new THREE.Mesh(geoTube, new THREE.MeshBasicMaterial({ color: C.jaune, transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: sombre ? THREE.AdditiveBlending : THREE.NormalBlending }));
    tube.frustumCulled = false;
    const rayonAxe = traits(C.jaune, 4, 3.4), rayonsBord = traits(C.jaune, NR * 4, 1.7);
    const posGrains = new THREE.BufferAttribute(new Float32Array((NR + 1) * NG * 3), 3);
    const toile = Object.assign(document.createElement('canvas'), { width: 32, height: 32 });
    const c2 = toile.getContext('2d')!;
    // Disque au bord adouci : disques concentriques semi-transparents empilés.
    c2.fillStyle = C.blanc;
    c2.globalAlpha = 0.3;
    for (let r = 16; r > 4; r -= 3) {
      c2.beginPath();
      c2.arc(16, 16, r, 0, 2 * PI);
      c2.fill();
    }
    const grains = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', posGrains), new THREE.PointsMaterial({ color: C.blanc, size: 6, sizeAttenuation: false, map: new THREE.CanvasTexture(toile), transparent: true, depthWrite: false }));
    grains.frustumCulled = false;
    scene.add(tube, rayonAxe.ligne, rayonsBord.ligne, grains);

    // Construction : triangles O1A1B1 et O2A1B1, rayon fictif B1O2, angles θ et θ'.
    const triangle = (couleur: string) => {
      const attr = new THREE.BufferAttribute(new Float32Array(9), 3);
      const m = new THREE.Mesh(new THREE.BufferGeometry().setAttribute('position', attr), new THREE.MeshBasicMaterial({ color: couleur, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
      m.frustumCulled = false;
      scene.add(m);
      return { m, attr };
    };
    const tri1 = triangle(C.cyan), tri2 = triangle(C.rose);
    const arcTheta = traits(C.cyan, 24, 2.5), arcsThetaP = traits(C.rose, 48, 2.5), fictif = traits(C.trait, 40, 2);
    const cote1 = traits(C.cyan, 3, 2), cote2 = traits(C.rose, 3, 2);
    scene.add(arcTheta.ligne, arcsThetaP.ligne, fictif.ligne, cote1.ligne, cote2.ligne);

    // Repères : foyers, image intermédiaire, éclats.
    const point = (couleur: string) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), fondable(new THREE.MeshBasicMaterial({ color: couleur })));
      scene.add(m);
      return m;
    };
    const pF1 = point(C.cyan), pF2 = point(C.rose), pB1 = point(C.jaune);
    const image = fleche(C.menthe, 0.035);
    const impact = cercle(C.jaune, { epaisseur: 2.5, segments: 64 }), anneau = cercle(C.texte, { epaisseur: 2, segments: 64 });
    impact.ligne.rotation.z = anneau.ligne.rotation.z = PI / 2; // cercles dans le plan de front
    scene.add(image.objet, impact.ligne, anneau.ligne);

    // Étiquettes.
    const nomAstre = etiquette(L('Astre à l\'infini', 'Object at infinity'), { couleur: C.jaune, taille: 13 });
    const nomL1 = etiquette(L('Objectif L1', 'Objective L1'), { couleur: C.cyan, taille: 13 });
    const nomL2 = etiquette(L('Oculaire L2', 'Eyepiece L2'), { couleur: C.rose, taille: 13 });
    const nomO1 = etiquette('O1', { couleur: C.cyan, taille: 13 }), nomO2 = etiquette('O2', { couleur: C.rose, taille: 13 });
    const nomEcran = etiquette(L('Écran', 'Screen'), { couleur: C.discret, taille: 13 });
    const nomOeil = etiquette(L('Œil', 'Eye'), { couleur: C.discret, taille: 13 });
    const nomF1 = etiquette('F\'1', { couleur: C.cyan, taille: 13 }), nomF2 = etiquette('F2', { couleur: C.rose, taille: 13 });
    const nomB1 = etiquette('B1', { couleur: C.menthe, taille: 13 });
    const nomTh = etiquette('θ', { couleur: C.cyan, taille: 16 }), nomThP = etiquette('θ\'', { couleur: C.rose, taille: 16 });
    const valF1 = etiquette('', { couleur: C.cyan, taille: 13 }), valF2 = etiquette('', { couleur: C.rose, taille: 13 });
    for (const e of [nomO1, nomO2, nomF1, nomF2, nomB1, valF1, valF2]) e.el.style.fontFamily = 'var(--mono)';
    // Petit écran : les cotes (valeurs déjà données par les curseurs) et O1, O2 s'effacent pour ne pas se chevaucher.
    for (const e of [nomO1, nomO2, valF1, valF2]) e.el.classList.add('l3d-large');

    // Calque : légende en haut à gauche (masquée sur petit écran), relations en bas à gauche, médaillons en haut à droite.
    const html = (parent: HTMLElement, contenu: string, style = '', classe = '') => {
      const d = document.createElement('div');
      d.innerHTML = contenu;
      d.style.cssText = style;
      d.className = classe;
      parent.appendChild(d);
      return d;
    };
    const puce = (c: string) => `<span style="display:inline-block;width:18px;height:3px;border-radius:2px;background:${c};vertical-align:middle;margin-right:.45rem"></span>`;
    const carre = (c: string) => `<span style="display:inline-block;width:11px;height:11px;border-radius:3px;border:1.5px solid ${c};vertical-align:-1px;margin-right:.45rem"></span>`;
    const legende = html(calque, '', 'top:.6rem;left:.6rem;max-width:calc(100% - 5rem)', 'l3d-panneau');
    const legFaisceau = html(legende, puce(C.jaune) + L('Faisceau issu de l\'astre', 'Beam from the object'), '', 'l3d-large');
    const legImage = html(legende, puce(C.menthe) + L('Image intermédiaire A1B1', 'Intermediate image A1B1'), '', 'l3d-large');
    const legPlan = html(legende, carre(C.menthe) + L('Plan focal commun', 'Common focal plane'), '', 'l3d-large');
    html(legende, L('Dilaté 10 fois perpendiculairement à l\'axe', 'Stretched 10 times perpendicular to the axis'), `color:${C.discret};font-weight:500`, 'l3d-large');
    const encart = html(calque, '', `left:.6rem;bottom:.6rem;border-color:${C.jaune};font-family:var(--mono)`, 'l3d-panneau');
    const rel1 = html(encart, 'tan θ  = A1B1 / f\'1', `color:${C.cyan};white-space:pre`);
    const rel2 = html(encart, 'tan θ\' = A1B1 / f\'2', `color:${C.rose};white-space:pre`);
    const relG = html(encart, '', `color:${C.jaune};font-size:14px`);
    const vues = html(calque, '', 'top:.6rem;right:3.6rem;flex-direction:row;gap:.6rem;text-align:center', 'l3d-panneau');
    const vueNu = html(vues, `<div style="color:${C.discret}">${L('À l\'œil nu', 'Naked eye')}</div>${medaillonSvg(C.metal, 7)}`);
    const vueLu = html(vues, `<div style="color:${C.jaune}"></div>${medaillonSvg(C.jaune, 11)}`);
    vueNu.querySelector('.astre')!.setAttribute('transform', 'rotate(-20) scale(0.44)');
    const astreLu = vueLu.querySelector('.astre')!, txtLu = vueLu.firstElementChild as HTMLElement;
    const montrer = (d: HTMLElement, o: number) => {
      d.style.display = o > 0.01 ? '' : 'none';
      d.style.opacity = String(clamp(o));
    };

    const src = new Float32Array(15), dst = new Float32Array(15), arc = new Float32Array(25 * 3);
    const q0 = new THREE.Vector3(), q1 = new THREE.Vector3();

    return ({ etape, t, T, p }) => {
      // Même chronologie et mêmes formules que scene.ts.
      const img = { etape, t };
      const [a0, a1, a2, a3, a4] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));
      const l: Lunette = { f1: p.f1, f2: p.f2 };
      const G = grossissement(l);
      const thDeg = THETA * (1 - seg(a3, 0, 0.16) + seg(a3, 0.2, 0.86));
      const th = thDeg * DEG;
      const thP = angleEmergent(th, l) / DEG;
      const e = l.f1 + l.f2 * lerp(TIRAGE0, 1, seg(a1, 0.5, 0.84, ease.backOut));
      const xOeilCm = l.f1 + l.f2 + cercleOculaire(l);
      const xF = X(l.f1), xL2 = X(e), xOeil = X(xOeilCm);
      const yB1 = imageIntermediaire(th, l);

      // Matériel : chaque élément entre par le haut, puis l'écran se retire.
      objectif.g.position.set(X(0), lerp(0.6, 0, seg(a0, 0, 0.14, ease.backOut)), 0);
      fondu(objectif.g, seg(a0, 0, 0.09));
      ecran.position.set(xF, lerp(0.6, 0, seg(a0, 0.05, 0.19, ease.backOut)) + 0.8 * seg(a1, 0, 0.13, ease.in), 0);
      fondu(ecran, seg(a0, 0.05, 0.14) * (1 - seg(a1, 0.02, 0.13)));
      oculaire.g.position.set(xL2, lerp(0.6, 0, seg(a1, 0.06, 0.2, ease.backOut)), 0);
      fondu(oculaire.g, seg(a1, 0.06, 0.15));
      // Épaisseur indicative : une lentille est d'autant plus bombée que sa focale est courte.
      objectif.verre.scale.y = 0.1 + 3.2 / l.f1;
      oculaire.verre.scale.y = 0.1 + 3.2 / l.f2;
      oeil.position.set(xOeil + lerp(0.8, 0, seg(a1, 0.86, 1, ease.out)), 0, 0);
      fondu(oeil, seg(a1, 0.86, 0.96));

      // Rayons : marche de model.ts dans les deux directions transverses (lentilles minces : y et z indépendants).
      const tanTh = Math.tan(th);
      const stations = (hy: number, hz: number, out: Float32Array) => {
        const my = marche(hy, th, l, e), mz = marche(hz, 0, l, e);
        out.set([
          X(-D0), propager({ y: hy, pente: -tanTh }, -D0).y, hz,
          X(0), hy, hz,
          xF, propager(my.apresObjectif, l.f1).y, propager(mz.apresObjectif, l.f1).y,
          xL2, my.apresOculaire.y, mz.apresOculaire.y,
          xOeil, propager(my.apresOculaire, xOeilCm - e).y, propager(mz.apresOculaire, xOeilCm - e).y,
        ]);
      };
      // Le rayon passant par O1 part en tête ; le front s'arrête à l'écran puis file jusqu'à l'œil.
      const suite = lerp(xF, xOeil, seg(a1, 0.16, 0.42));
      const frontAxe = a1 > 0 ? suite : lerp(X(-D0), xF, seg(a0, 0.12, 0.5));
      const frontBord = a1 > 0 ? suite : lerp(X(-D0), xF, seg(a0, 0.24, 0.62));
      const oAxe = a0 >= 0.12 ? 1 : 0, oBord = a0 >= 0.24 ? 1 : 0;

      const s0 = (T * 1.3) % PAS_G;
      const grainsLe = (r: number, visible: boolean) => {
        let g = 0, acc = 0;
        for (let k = 0; k < 4 && visible; k++) {
          const i = 3 * k, dx = dst[i + 3] - dst[i], dy = dst[i + 4] - dst[i + 1], dz = dst[i + 5] - dst[i + 2];
          const len = Math.hypot(dx, dy, dz);
          for (; g < NG && s0 + g * PAS_G < acc + len; g++) {
            const u = (s0 + g * PAS_G - acc) / len;
            posGrains.setXYZ(r * NG + g, dst[i] + u * dx, dst[i + 1] + u * dy, dst[i + 2] + u * dz);
          }
          acc += len;
        }
        // Grains hors du faisceau tracé : rangés très loin, hors du champ.
        for (; g < NG; g++) posGrains.setXYZ(r * NG + g, 0, 1e6, 0);
      };

      stations(0, 0, src);
      tronquer(src, frontAxe, dst);
      rayonAxe.poly(dst, 5);
      rayonAxe.fin(4, oAxe);
      grainsLe(0, oAxe > 0);
      let n = 0;
      for (let i = 0; i < NB; i++) {
        const phi = (2 * PI * i) / NB;
        stations(H * Math.sin(phi), H * Math.cos(phi), src);
        tronquer(src, frontBord, dst);
        for (let k = 0; k < 5; k++) posTube.setXYZ(k * NB + i, dst[3 * k], dst[3 * k + 1], dst[3 * k + 2]);
        if (i % (NB / NR) === 0) {
          n = rayonsBord.poly(dst, 5, n);
          grainsLe(1 + i / (NB / NR), oBord > 0);
        }
      }
      rayonsBord.fin(NR * 4, 0.85 * oBord);
      posTube.needsUpdate = posGrains.needsUpdate = true;
      tube.visible = oBord > 0;
      (tube.material as THREE.MeshBasicMaterial).opacity = sombre ? 0.17 : 0.14;

      // Image intermédiaire A1B1, foyer F'1, cote f'1.
      const eclat = seg(a0, 0.6, 0.78, ease.out);
      impact.ligne.position.set(xF, yB1, 0);
      impact.ligne.scale.setScalar(lerp(0.06, 0.34, eclat));
      impact.mat.opacity = 1 - eclat;
      impact.ligne.visible = eclat > 0 && eclat < 1;
      pB1.position.set(xF, yB1, 0);
      fondu(pB1, seg(a0, 0.6, 0.66));
      image.maj(q0.set(xF, 0, 0), q1.set(0, lerp(0, yB1, seg(a0, 0.66, 0.8, ease.out)), 0), 1);
      const dx = -0.4;
      nomB1.pos.set(xF + dx, yB1 - 0.28, 0);
      nomB1.opacite = seg(a0, 0.76, 0.86) * clamp(thDeg * 4);
      pF1.position.set(xF, 0, 0);
      fondu(pF1, seg(a0, 0.8, 0.9));
      nomF1.pos.set(xF + dx, 0.3, 0);
      nomF1.opacite = seg(a0, 0.8, 0.9);
      const zc = 0, yc = -2.25;
      const dep1 = seg(a0, 0.84, 0.97), xb1 = lerp(X(0), xF, dep1);
      cote1.seg(0, X(0), yc, zc, xb1, yc, zc);
      cote1.seg(1, X(0), yc - 0.1, zc, X(0), yc + 0.1, zc);
      cote1.seg(2, xb1, yc - 0.1, zc, xb1, yc + 0.1, zc);
      cote1.fin(3, dep1 * 3);
      valF1.pos.set(Math.max((X(0) + xF) / 2, X(0) + 1.3), yc + 0.27, zc);
      valF1.el.textContent = `f'1 = ${fmt(l.f1, 1)} cm`;
      valF1.opacite = clamp(dep1 * 3);

      // Foyer objet F2 de l'oculaire, cote f'2, éclat quand F2 rejoint F'1.
      const xF2 = X(e - l.f2);
      pF2.position.set(xF2, 0, 0);
      fondu(pF2, seg(a1, 0.34, 0.44));
      // Assez haut au-dessus de F'1 pour ne pas le chevaucher sur petit écran.
      nomF2.pos.set(xF2 - 0.35, 1.05, 0);
      nomF2.opacite = seg(a1, 0.34, 0.44);
      const dep2 = seg(a1, 0.36, 0.5), xb2 = lerp(xL2, xF2, dep2);
      cote2.seg(0, xL2, yc, zc, xb2, yc, zc);
      cote2.seg(1, xL2, yc - 0.1, zc, xL2, yc + 0.1, zc);
      cote2.seg(2, xb2, yc - 0.1, zc, xb2, yc + 0.1, zc);
      cote2.fin(3, dep2 * 3);
      valF2.pos.set(xL2 + 1.25, yc + 0.27, zc);
      valF2.el.textContent = `f'2 = ${fmt(l.f2, 1)} cm`;
      valF2.opacite = clamp(dep2 * 3);
      const accord = seg(a1, 0.8, 0.97, ease.out);
      anneau.ligne.position.set(xF, 0, 0);
      anneau.ligne.scale.setScalar(lerp(0.1, 0.6, accord));
      anneau.mat.opacity = 1 - accord;
      anneau.ligne.visible = accord > 0 && accord < 1;
      plan.position.set(xF, 0, 0);
      fondu(plan, seg(a1, 0.84, 0.97));

      // Étape 3 : triangles, rayon fictif B1O2, angles (pente apparente multipliée par la dilatation).
      const phi = Math.atan(tanTh / U), phiP = Math.atan(Math.tan(thP * DEG) / U);
      tri1.attr.set([X(0), 0, 0, xF, 0, 0, xF, yB1, 0]);
      tri2.attr.set([xL2, 0, 0, xF, 0, 0, xF, yB1, 0]);
      tri1.attr.needsUpdate = tri2.attr.needsUpdate = true;
      (tri1.m.material as THREE.MeshBasicMaterial).opacity = (sombre ? 0.22 : 0.2) * seg(a2, 0.02, 0.18);
      (tri2.m.material as THREE.MeshBasicMaterial).opacity = (sombre ? 0.3 : 0.26) * seg(a2, 0.56, 0.7);
      tri1.m.visible = a2 > 0.02;
      tri2.m.visible = a2 > 0.56;
      const tracerArc = (cx: number, r: number, a: number, sens: number) => {
        for (let k = 0; k <= 24; k++) arc.set([cx - r * Math.cos((a * k) / 24), sens * r * Math.sin((a * k) / 24), 0], 3 * k);
      };
      tracerArc(X(0), 1.6, phi * seg(a2, 0.06, 0.24), 1);
      arcTheta.poly(arc, 25);
      arcTheta.fin(24, seg(a2, 0.06, 0.1));
      nomTh.pos.set(X(0) - 1.85, 0.5, 0);
      nomTh.opacite = seg(a2, 0.16, 0.26);
      const ouverture = seg(a2, 0.6, 0.78);
      tracerArc(xL2, 0.058 * l.f2, phiP * ouverture, -1);
      arcsThetaP.poly(arc, 25);
      tracerArc(xOeil, Math.min(0.85, 0.8 * (xOeil - xL2)), phiP * ouverture, -1);
      arcsThetaP.poly(arc, 25, 24);
      arcsThetaP.fin(48, seg(a2, 0.6, 0.64));
      nomThP.pos.set(xOeil + 0.05, -0.9, 0);
      nomThP.opacite = seg(a2, 0.7, 0.8);
      // Rayon fictif en tirets de B1 vers O2, prolongé jusqu'à l'œil.
      const xFin = lerp(xF, xOeil - 0.15, seg(a2, 0.3, 0.56));
      const yFin = lerp(yB1, 0, (xFin - xF) / (xL2 - xF));
      const long = Math.hypot(xFin - xF, yFin - yB1), nbT = Math.min(40, Math.ceil(long / 0.2));
      for (let k = 0; k < nbT; k++) {
        const u0 = (k * 0.2) / Math.max(long, 1e-6), u1 = Math.min(1, (k * 0.2 + 0.12) / Math.max(long, 1e-6));
        fictif.seg(k, lerp(xF, xFin, u0), lerp(yB1, yFin, u0), 0, lerp(xF, xFin, u1), lerp(yB1, yFin, u1), 0);
      }
      fictif.fin(nbT, seg(a2, 0.3, 0.34));

      // Étiquettes du matériel.
      nomAstre.pos.set(X(-D0) + 0.9, H + D0 * tanTh + 0.5, 0);
      nomAstre.opacite = seg(a0, 0.08, 0.2);
      nomL1.pos.set(X(0), objectif.g.position.y + R1 + 0.38, 0);
      nomL1.opacite = seg(a0, 0, 0.09);
      // O1 à gauche de l'objectif, hors de son disque vu en perspective.
      nomO1.pos.set(X(0) - 0.8, -0.32, 0);
      nomO1.opacite = seg(a0, 0, 0.09);
      nomL2.pos.set(xL2, oculaire.g.position.y + R2 + 0.38, 0);
      nomL2.opacite = seg(a1, 0.06, 0.15);
      nomO2.pos.set(xL2 + 0.28, -0.32, 0);
      nomO2.opacite = seg(a1, 0.06, 0.15);
      nomEcran.pos.set(xF, ecran.position.y + 2.05, 0);
      nomEcran.opacite = seg(a0, 0.05, 0.14) * (1 - seg(a1, 0.02, 0.13));
      nomOeil.pos.set(oeil.position.x + 0.6, 0.62, 0);
      nomOeil.opacite = seg(a1, 0.86, 0.96);

      // Calque : légende, relations, ce que voit l'œil.
      montrer(legFaisceau, seg(a0, 0.12, 0.24));
      montrer(legImage, seg(a0, 0.66, 0.8));
      montrer(legPlan, seg(a1, 0.84, 0.97));
      legende.style.display = '';
      legende.style.display = [legFaisceau, legImage, legPlan].some((x) => x.checkVisibility()) ? '' : 'none';
      montrer(encart, seg(a2, 0.04, 0.2, ease.backOut));
      montrer(rel1, seg(a2, 0.12, 0.26));
      montrer(rel2, seg(a2, 0.66, 0.8));
      relG.textContent = `G = θ'/θ = f'1/f'2 = ${fmt(G, 1)}`;
      montrer(relG, seg(a3, 0.88, 0.99, ease.out));
      // Petit écran : une fois G affiché, l'encart ne garde que cette ligne.
      rel1.classList.toggle('l3d-large', a3 >= 0.88);
      rel2.classList.toggle('l3d-large', a3 >= 0.88);
      // Petit écran, étape 5 : les noms des lentilles laissent la place aux médaillons.
      nomL1.el.classList.toggle('l3d-large', a4 > 0.1);
      nomL2.el.classList.toggle('l3d-large', a4 > 0.1);
      montrer(vues, seg(a4, 0.1, 0.24, ease.backOut));
      montrer(vueLu, seg(a4, 0.18, 0.32, ease.backOut));
      const zoom = seg(a4, 0.34, 0.8);
      astreLu.setAttribute('transform', `rotate(${(-20 + 180 * zoom).toFixed(1)}) scale(${(0.44 * G ** zoom).toFixed(3)})`);
      txtLu.textContent = L(`Lunette : ×${fmt(G ** zoom, 1)}`, `Telescope: ×${fmt(G ** zoom, 1)}`);
    };
  },
});
