import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { L, avancement, clamp, ease, fmt, lerp, mix, seg } from '../../lib/anim';
import { definirScene3d } from '../../lib/kit3d';
import { C, themeSombre } from '../../lib/palette';
import { couleur, differenceMarche, interfrange, longueurOnde, nature, type Young } from './model';

// Repère : axe optique selon x (laser à gauche, fentes en x = 0, écran en x = D), verticale selon y.
// Les fentes sont verticales et séparées selon z ; le point d'abscisse x (mm) de l'écran est en z = -x.
// Mêmes facteurs d'échelle que la vue 2D (un pixel vaut U unités) : l'interfrange dessiné reste
// exactement proportionnel au vrai, et les fronts d'onde tombent sur les franges.
const U = 1 / 30;
const X_MAX = 20; // mm, demi-largeur d'écran représentée
const DEMI = 130 * U; // la même en unités de scène
const MM = DEMI / X_MAX; // unités par millimètre sur l'écran
const K_D = 140 * U; // unités par mètre de D
const K_B = 330 * U; // unités par millimètre d'écart entre les fentes
const K_L = (MM * K_B) / (K_D * 1e3); // unités par nanomètre
const V = 36 * U; // célérité des fronts d'onde à l'écran (unités/s)
const X_LASER = -58 * U; // sortie du laser
const HP = 100 * U; // demi-largeur de la plaque
const HF = 0.7, HE = 1.4;// demi-hauteurs de la plaque et de l'écran
const Y_RAIL = -2; // dessus du rail
const KX = 4;
const PI = Math.PI;

const rgb = (v: number[]) => `rgb(${v.map(Math.round).join(',')})`;
const rvbDe = (h: string) => [1, 3, 5].map((q) => parseInt(h.slice(q, q + 2), 16));
const versCouleur = (c: THREE.Color, v: number[]) => c.setRGB(v[0] / 255, v[1] / 255, v[2] / 255, THREE.SRGBColorSpace);

// Champ des deux ondes dans le plan horizontal de l'axe optique. INCIDENT : onde plane avant les fentes.
const SOMMETS = `varying vec2 vP;
  void main() { vP = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAGMENTS = `uniform vec3 couleur; uniform float opacite, lam, s, front, plein, moyenne; uniform vec2 s1, s2;
  varying vec2 vP;
  void main() {
    float k = 6.2831853 / lam;
  #ifdef INCIDENT
    float c = max(cos(k * (vP.x - s)), 0.0);
    float a = 0.2 + 0.75 * pow(c, 8.0);
  #else
    float r1 = distance(vP, s1), r2 = distance(vP, s2);
    float w1 = clamp((front - r1) / 0.8 + plein, 0.0, 1.0) * smoothstep(0.0, 0.33, r1) * mix(1.0, 0.5, clamp(r1 / 12.0, 0.0, 1.0));
    float w2 = clamp((front - r2) / 0.8 + plein, 0.0, 1.0) * smoothstep(0.0, 0.33, r2) * mix(1.0, 0.5, clamp(r2 / 12.0, 0.0, 1.0));
    // Instantané : crêtes de la somme des deux ondes. Moyenne : intensité cos² des zones de renfort.
    float f = 0.5 * (w1 * cos(k * (r1 - s)) + w2 * cos(k * (r2 - s)));
    float m = 0.25 * (w1 * w1 + w2 * w2 + 2.0 * w1 * w2 * cos(k * (r2 - r1)));
    float a = mix(pow(max(f, 0.0), 1.4), 0.8 * m, moyenne);
  #endif
    gl_FragColor = vec4(couleur, a * opacite);
    #include <colorspace_fragment>
  }`;

// Face de l'écran : passe au noir, puis franges I = cos²(π·x / i) révélées du centre vers les bords.
const FACE = `uniform vec3 fond, nuit, lumiere; uniform float periode, eclaire, revele, demi, haut;
  varying vec2 vP;
  void main() {
    float z = abs(vP.x);
    float noir = 1.0 - smoothstep(eclaire * demi - 0.04, eclaire * demi, z);
    float vu = 1.0 - smoothstep(revele * demi - 0.06, revele * demi, z);
    float env = 1.0 - 0.55 * smoothstep(0.35, 1.0, abs(vP.y) / haut);
    float I = pow(cos(3.14159265 * vP.x / periode), 2.0);
    vec3 c = mix(fond, nuit, noir);
    gl_FragColor = vec4(mix(c, lumiere, I * env * vu), 1.0);
    #include <colorspace_fragment>
  }`;

export default definirScene3d({
  camera: { position: [-7.7, 10, 12.5], cible: [2.2, -1.3, 0.6], min: 4, max: 45 },

  monter({ scene, calque, etiquette }) {
    const sombre = themeSombre();
    const NUIT = sombre ? rvbDe(C.fond) : rvbDe(C.ombre).map((v, q) => lerp(v, rvbDe(C.fond)[q], 0.06));

    scene.add(new THREE.HemisphereLight(C.blanc, C.ombre, sombre ? 1.1 : 1.6));
    const soleil = new THREE.DirectionalLight(C.blanc, sombre ? 1.6 : 2.2);
    soleil.position.set(-4, 10, 8);
    scene.add(soleil);

    // Table : grille discrète sous le banc.
    const traits: number[] = [];
    for (let x = -6; x <= 12; x += 1) traits.push(x, -2.35, -6, x, -2.35, 6);
    for (let z = -6; z <= 6; z += 1) traits.push(-6, -2.35, z, 12, -2.35, z);
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(traits, 3)), new THREE.LineBasicMaterial({ color: C.grille })));

    const standard = (c: string, metal = 0.2, rugueux = 0.55) => new THREE.MeshStandardMaterial({ color: c, metalness: metal, roughness: rugueux, transparent: true });
    const boite = new THREE.BoxGeometry(1, 1, 1);
    const pave = (mat: THREE.Material, sx: number, sy: number, sz: number, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(boite, mat);
      m.scale.set(sx, sy, sz);
      m.position.set(x, y, z);
      return m;
    };
    const fut = new THREE.CylinderGeometry(0.07, 0.07, 1, 16);
    const pied = (mat: THREE.Material, haut: number) => {
      const m = new THREE.Mesh(fut, mat);
      m.scale.y = haut - Y_RAIL;
      m.position.y = (haut + Y_RAIL) / 2;
      return m;
    };

    // Banc : rail qui se déroule depuis la gauche.
    const matRail = standard(mix(C.panneau, C.metal, sombre ? 0.35 : 0.25), 0.4, 0.5);
    const rail = pave(matRail, 1, 0.3, 0.8, 0, Y_RAIL - 0.15, 0);
    const departRail = -148 * U, LONG_RAIL = 480 * U;
    scene.add(rail);

    // Laser : boîtier, sortie métallique, voyant.
    // Un matériau métal par objet : chacun a son propre fondu d'apparition.
    const metal = () => standard(C.metal, 0.6, 0.35);
    const matMetal = metal();
    const matBoitier = standard(mix(C.panneau, C.metal, sombre ? 0.45 : 0.12), 0.25, 0.5);
    const laser = new THREE.Group();
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), new THREE.MeshBasicMaterial({ color: C.grille, transparent: true }));
    led.position.set(-4.2, 0.2, 0.56);
    const sortie = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.27, 24), matMetal);
    sortie.rotation.z = PI / 2;
    sortie.position.x = X_LASER - 0.135;
    laser.add(pave(matBoitier, 2.53, 1.2, 1.1, -3.47), sortie, led, pave(matMetal, 0.5, -0.6 - Y_RAIL, 0.6, -3.47, (Y_RAIL - 0.6) / 2));
    scene.add(laser);

    // Bifente : trois lames qui laissent passer la lumière par deux fentes verticales.
    const matPlaque = standard(mix(C.metal, C.blanc, sombre ? 0.15 : 0.3), 0.55, 0.4);
    const plaque = new THREE.Group();
    const lames = [0, 1, 2].map(() => pave(matPlaque, 0.1, 2 * HF, 1));
    plaque.add(...lames, pied(metal(), -HF));
    scene.add(plaque);

    // Écran : panneau, face éclairée (shader), graduations en mm sous la face.
    const ecran = new THREE.Group();
    const matCadre = standard(mix(C.panneau, C.metal, sombre ? 0.25 : 0.1), 0.15, 0.7);
    const HAUT_CADRE = HE + 0.2, BAS_CADRE = -HE - 0.55;
    ecran.add(pave(matCadre, 0.12, HAUT_CADRE - BAS_CADRE, 2 * DEMI + 0.4, 0.06, (HAUT_CADRE + BAS_CADRE) / 2), pied(metal(), BAS_CADRE));
    const uFace = {
      fond: { value: new THREE.Color(sombre ? mix(C.panneau, C.verre, 0.4) : C.panneau) }, nuit: { value: versCouleur(new THREE.Color(), NUIT) }, lumiere: { value: new THREE.Color() },
      periode: { value: 1 }, eclaire: { value: 0 }, revele: { value: 0 }, demi: { value: DEMI }, haut: { value: HE },
    };
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2 * DEMI, 2 * HE), new THREE.ShaderMaterial({ uniforms: uFace, vertexShader: SOMMETS.replace('position.xz', 'position.xy'), fragmentShader: FACE }));
    face.rotation.y = -PI / 2;
    face.position.x = -0.005;
    const graduations: number[] = [];
    for (let mm = -X_MAX; mm <= X_MAX; mm += 5) graduations.push(-0.01, -HE, -mm * MM, -0.01, -HE - (mm % 10 === 0 ? 0.14 : 0.08), -mm * MM);
    const regle = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(graduations, 3)), new THREE.LineBasicMaterial({ color: C.trait, transparent: true }));
    ecran.add(face, regle);
    scene.add(ecran);

    // Ondes : faisceau incident (onde plane) et champ des deux ondes issues des fentes.
    const uniformes = () => ({
      couleur: { value: new THREE.Color() }, opacite: { value: 0 }, lam: { value: 1 }, s: { value: 0 }, front: { value: 0 }, plein: { value: 0 }, moyenne: { value: 0 },
      s1: { value: new THREE.Vector2() }, s2: { value: new THREE.Vector2() },
    });
    const matOnde = (incident: boolean) => new THREE.ShaderMaterial({
      uniforms: uniformes(), vertexShader: SOMMETS, fragmentShader: FRAGMENTS, defines: incident ? { INCIDENT: 1 } : {},
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: sombre ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const quad = (mat: THREE.ShaderMaterial) => {
      const attr = new THREE.BufferAttribute(new Float32Array(12), 3);
      const geo = new THREE.BufferGeometry().setAttribute('position', attr);
      geo.setIndex([0, 1, 2, 0, 2, 3]);
      const m = new THREE.Mesh(geo, mat);
      m.frustumCulled = false;
      scene.add(m);
      return { m, attr, u: mat.uniforms };
    };
    const faisceau = quad(matOnde(true)), champ = quad(matOnde(false));

    // Lignes de renfort (pleines) et d'extinction (pointillées), depuis le milieu des fentes : segment unité orienté.
    const segment = (largeur: number, pointille: boolean) => {
      const geo = new LineGeometry();
      geo.setPositions([0, 0, 0, 1, 0, 0]);
      const mat = new LineMaterial({ color: new THREE.Color(C.discret), linewidth: largeur, transparent: true, dashed: pointille, dashSize: 0.002, gapSize: 0.014 });
      const l = new Line2(geo, mat);
      l.computeLineDistances();
      l.position.y = 0.012;
      scene.add(l);
      return { l, mat };
    };
    const renforts = Array.from({ length: 2 * KX + 1 }, () => segment(2.6, false));
    const extinctions = Array.from({ length: 2 * KX }, () => segment(2.2, true));
    const orienter = (l: Line2, x: number, z: number, part: number) => {
      l.rotation.y = Math.atan2(-z, x);
      l.scale.x = Math.max(Math.hypot(x, z) * part, 1e-4);
    };

    // Différence de marche : rayons S1M et S2M, surlongueur δ, point M.
    const geoTige = new THREE.CylinderGeometry(1, 1, 1, 10);
    const haut = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
    const tige = (c: string, rayon: number) => {
      const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true });
      const m = new THREE.Mesh(geoTige, mat);
      scene.add(m);
      return {
        mat,
        maj(a: THREE.Vector3, b: THREE.Vector3, o: number) {
          const l = dir.subVectors(b, a).length();
          m.visible = o > 0.01 && l > 1e-3;
          if (!m.visible) return;
          m.position.addVectors(a, b).multiplyScalar(0.5);
          m.quaternion.setFromUnitVectors(haut, dir.divideScalar(l));
          m.scale.set(rayon, l, rayon);
          mat.opacity = o;
        },
      };
    };
    const rayon1 = tige(C.cyan, 0.03), rayon2 = tige(C.rose, 0.03), surlong = tige(C.jaune, 0.065), perp = tige(C.texte, 0.012);
    const matM = new THREE.MeshBasicMaterial({ color: C.texte, transparent: true });
    const ptM = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 14), matM);
    const matHalo = new THREE.MeshBasicMaterial({ color: C.texte, transparent: true, depthWrite: false });
    const haloM = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), matHalo);
    scene.add(ptM, haloM);

    // Mesure de plusieurs interfranges : deux mâchoires sur la face de l'écran, cote et repères des franges brillantes.
    const matJaune = new THREE.MeshBasicMaterial({ color: C.jaune, transparent: true });
    const machoires = [0, 1].map(() => pave(matJaune, 0.03, 2 * HE + 0.3, 0.05));
    const coteN = tige(C.jaune, 0.02);
    const geoPion = new THREE.SphereGeometry(0.06, 14, 10);
    const pions = Array.from({ length: 11 }, () => new THREE.Mesh(geoPion, matJaune));
    scene.add(...machoires, ...pions);

    // Cote D le long du rail.
    const cotes = [tige(C.discret, 0.015), tige(C.discret, 0.015), tige(C.discret, 0.015)];

    // Étiquettes.
    const etLaser = etiquette('Laser', { taille: 14 });
    const etLambda = etiquette('', { taille: 13 });
    const etPlaque = etiquette(L('Bifente', 'Double slit'), { taille: 14 });
    const etB = etiquette('', { couleur: C.discret, taille: 13 });
    const etEcran = etiquette(L('Écran', 'Screen'), { taille: 14 });
    const etD = etiquette('', { couleur: C.discret, taille: 13 });
    const etMm = [-X_MAX, -10, 0, 10, X_MAX].map((mm) => ({ mm, e: etiquette(mm === -X_MAX ? `${mm} mm` : String(mm), { couleur: C.discret, taille: 13 }) }));
    const etS1 = etiquette('S1', { couleur: C.cyan, taille: 14 }), etS2 = etiquette('S2', { couleur: C.rose, taille: 14 });
    const etDelta = etiquette('δ', { couleur: C.jaune, taille: 17 }), etM = etiquette('M', { taille: 15 });
    const etN = etiquette('', { couleur: C.jaune, taille: 14 });
    for (const e of [etLambda, etB, etD, etN, ...etMm.map((x) => x.e)]) e.el.style.fontFamily = 'var(--mono)';

    // Calque : légende en bas à gauche (sur la table, libre aux étapes 2 et 3, y compris sur mobile), encarts en bas à gauche, résultat en haut.
    const html = (parent: HTMLElement, contenu: string, style = '') => {
      const d = document.createElement('div');
      d.innerHTML = contenu;
      d.style.cssText = style;
      parent.appendChild(d);
      return d;
    };
    const legende = html(calque, '', 'bottom:.6rem;left:.6rem;max-width:min(30rem, calc(100% - 1.2rem))');
    legende.className = 'l3d-panneau';
    const legRenfort = html(legende, '');
    const puceRenfort = html(legRenfort, '', 'display:inline-block;width:20px;height:3px;border-radius:2px;vertical-align:middle;margin-right:.45rem');
    legRenfort.append(L('Renfort : δ = k·λ, les ondes arrivent en phase', 'Reinforcement: δ = k·λ, the waves arrive in phase'));
    const legExt = html(legende, `<span style="display:inline-block;width:20px;border-top:3px dotted ${C.discret};vertical-align:middle;margin-right:.45rem"></span>`, `color:${C.discret}`);
    legExt.append(L('Extinction : δ = (k + 1/2)·λ, elles arrivent en opposition', 'Cancellation: δ = (k + 1/2)·λ, they arrive in antiphase'));
    const encart = (bord: string, place = 'left:.6rem;bottom:.6rem') => {
      const d = html(calque, '', `${place};border-color:${bord};min-width:10rem`);
      d.className = 'l3d-panneau';
      return d;
    };
    const enM = encart(C.grille);
    html(enM, L('Différence de marche en M', 'Path difference at M'), `color:${C.discret}`).className = 'l3d-large';
    const tDelta = html(enM, '', `font-family:var(--mono);font-size:15px;color:${C.jaune}`);
    const tEtat = html(enM, ''), tFrange = html(enM, '');
    const enMesure = encart(C.grille);
    html(enMesure, L('Mesure sur plusieurs interfranges', 'Measuring several fringe spacings'), `color:${C.discret}`).className = 'l3d-large';
    const tNi = html(enMesure, '', 'font-family:var(--mono);font-size:14px');
    const tI = html(enMesure, '', `font-family:var(--mono);font-size:16px;color:${C.jaune}`);
    const enResultat = encart(C.jaune, 'left:.6rem;top:.6rem');
    html(enResultat, L('Longueur d\'onde du laser', 'Wavelength of the laser'), `color:${C.discret}`).className = 'l3d-large';
    html(enResultat, 'λ = i·b / D', 'font-family:var(--mono);font-size:14px').className = 'l3d-large';
    const tLambda = html(enResultat, '', `font-family:var(--mono);font-size:17px;color:${C.jaune}`);
    const montrer = (d: HTMLElement, o: number) => {
      d.style.display = o > 0.01 ? '' : 'none';
      d.style.opacity = String(clamp(o));
    };

    // Fondu des objets « réels » : opacité de leurs matériaux.
    const fondu = (g: THREE.Object3D, o: number) => {
      g.visible = o > 0.01;
      g.traverse((x) => {
        const m = (x as THREE.Mesh).material as THREE.Material | undefined;
        if (m && m !== led.material) m.opacity = o;
      });
    };

    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    const ledAllumee = new THREE.Color(), ledEteinte = new THREE.Color(C.grille);
    let cle = '';

    return ({ etape, t, T, p }) => {
      const y: Young = { lambda: p.lambda, b: p.b, D: p.D };
      const i = interfrange(y), iU = i * MM, lam = K_L * p.lambda, sep = K_B * p.b, xE = K_D * p.D;
      const n = clamp(Math.floor(18 / i), 1, 5); // interfranges mesurés de part et d'autre du centre, comme en 2D
      const [a1, a2, a3, a4, a5, a6] = [0, 1, 2, 3, 4, 5].map((k) => avancement({ etape, t }, k));

      // Ce qui ne dépend que des curseurs : couleurs, lames de la bifente, textes.
      if (cle !== `${p.lambda}|${p.b}|${p.D}`) {
        cle = `${p.lambda}|${p.b}|${p.D}`;
        const vrai = couleur(p.lambda), clair = vrai.map((v) => v + (255 - v) * 0.22);
        const trait = sombre ? clair : vrai.map((v) => v * 0.75);
        const teinte = rgb(trait);
        versCouleur(ledAllumee, trait);
        versCouleur(uFace.lumiere.value, clair);
        versCouleur(faisceau.u.couleur.value as THREE.Color, trait);
        versCouleur(champ.u.couleur.value as THREE.Color, trait);
        for (const r of renforts) versCouleur(r.mat.color, trait);
        puceRenfort.style.background = teinte;
        etLambda.el.style.color = sombre ? teinte : rgb(vrai.map((v) => v * 0.55));
        uFace.periode.value = iU;
        for (const u of [faisceau.u, champ.u]) u.lam.value = lam;
        (champ.u.s1.value as THREE.Vector2).set(0, -sep / 2);
        (champ.u.s2.value as THREE.Vector2).set(0, sep / 2);
        const g = 0.05, bords = [[-HP, -sep / 2 - g], [-sep / 2 + g, sep / 2 - g], [sep / 2 + g, HP]];
        lames.forEach((l, k) => {
          l.scale.z = bords[k][1] - bords[k][0];
          l.position.z = (bords[k][0] + bords[k][1]) / 2;
        });
        champ.attr.setXYZ(0, 0.06, 0, -HP);
        champ.attr.setXYZ(1, xE, 0, -DEMI);
        champ.attr.setXYZ(2, xE, 0, DEMI);
        champ.attr.setXYZ(3, 0.06, 0, HP);
        champ.attr.needsUpdate = true;
        etLambda.el.textContent = `λ = ${fmt(p.lambda, 0)} nm`;
        etB.el.textContent = `b = ${fmt(p.b, 2)} mm`;
        etD.el.textContent = `D = ${fmt(p.D, 2)} m`;
        etN.el.textContent = `${2 * n} i`;
        tNi.textContent = `${2 * n} i = ${fmt(2 * n * i, 1)} mm`;
        tI.textContent = `i = ${fmt(2 * n * i, 1)} / ${2 * n} = ${fmt(i, 2)} mm`;
        tLambda.textContent = `λ = ${fmt(longueurOnde(i, p.b, p.D), 0)} nm`;
      }

      // Étape 1 : le rail se déroule, le laser, la bifente et l'écran se posent, puis le laser s'allume.
      const r = Math.max(seg(a1, 0, 0.22, ease.out), 1e-3);
      rail.scale.x = LONG_RAIL * r;
      rail.position.x = departRail + (LONG_RAIL * r) / 2;
      const oLaser = seg(a1, 0.08, 0.2), oPlaque = seg(a1, 0.26, 0.36), oEcran = seg(a1, 0.42, 0.54);
      fondu(laser, oLaser);
      laser.position.x = -3 * (1 - seg(a1, 0.08, 0.34, ease.out));
      fondu(plaque, oPlaque);
      plaque.position.y = 2 * (1 - seg(a1, 0.26, 0.52, ease.backOut));
      fondu(ecran, oEcran);
      ecran.position.x = xE + 2.3 * (1 - seg(a1, 0.42, 0.68, ease.out));
      const allume = a1 > 0.76;
      (led.material as THREE.MeshBasicMaterial).color.copy(allume ? ledAllumee : ledEteinte);
      (led.material as THREE.MeshBasicMaterial).opacity = oLaser;
      etLaser.pos.set(-3.47 + laser.position.x, 1.75, 0);
      etLambda.pos.set(-3.47 + laser.position.x, 1.0, 0);
      etLaser.opacite = etLambda.opacite = oLaser;
      etPlaque.pos.set(0, plaque.position.y + HF + 1.25, -HP);
      etB.pos.set(0, plaque.position.y + HF + 0.5, -HP);
      etPlaque.opacite = etB.opacite = oPlaque;
      etEcran.pos.set(ecran.position.x, HE + 0.45, -DEMI + 0.7);
      etEcran.opacite = oEcran;

      // Cote D : posée sur la table, devant le banc et hors du champ des ondes vu de la caméra initiale.
      const oCote = seg(a1, 0.62, 0.76);
      const yc = -2.2, zc = 3.2;
      cotes[0].maj(a.set(0, yc, zc), b.set(xE, yc, zc), oCote);
      cotes[1].maj(a.set(0, yc - 0.15, zc), b.set(0, yc + 0.15, zc), oCote);
      cotes[2].maj(a.set(xE, yc - 0.15, zc), b.set(xE, yc + 0.15, zc), oCote);
      etD.pos.set(xE / 2, yc + 0.32, zc);
      etD.opacite = oCote;

      // Faisceau incident : il avance jusqu'à la bifente en s'élargissant ; ses plans d'onde défilent à la célérité V.
      const parcours = T * V;
      const xFront = lerp(X_LASER, -0.06, seg(a1, 0.78, 0.97));
      const demiF = (x: number) => lerp(5 * U, sep / 2 + 9 * U, (x - X_LASER) / (-0.06 - X_LASER));
      faisceau.attr.setXYZ(0, X_LASER, 0, -5 * U);
      faisceau.attr.setXYZ(1, xFront, 0, -demiF(xFront));
      faisceau.attr.setXYZ(2, xFront, 0, demiF(xFront));
      faisceau.attr.setXYZ(3, X_LASER, 0, 5 * U);
      faisceau.attr.needsUpdate = true;
      faisceau.m.visible = xFront > X_LASER + 0.01;
      const s = (((parcours + X_LASER) % lam) + lam) % lam;
      faisceau.u.s.value = s;
      faisceau.u.opacite.value = 1;

      // Étape 2 : les fronts partent des deux fentes et gagnent l'écran ; les lignes de renfort et d'extinction se tracent.
      const rMax = Math.hypot(xE, DEMI + sep / 2);
      champ.m.visible = a2 > 0;
      champ.u.front.value = rMax * seg(a2, 0.02, 0.5, ease.lin);
      champ.u.plein.value = a2 >= 0.5 ? 1 : 0;
      champ.u.s.value = s;
      champ.u.opacite.value = (sombre ? 0.9 : 1) * (0.85 - 0.3 * seg(a2, 0.5, 0.8) - 0.37 * seg(a4, 0, 0.15) + 0.27 * seg(a6, 0, 0.3)) / 0.85;
      // Étape 3 : l'image instantanée laisse place à l'intensité moyenne, qui dessine les faisceaux de renfort.
      champ.u.moyenne.value = 0.65 * seg(a3, 0.02, 0.4);
      const opLignes = 1 - 0.72 * seg(a4, 0, 0.15) + 0.6 * seg(a6, 0, 0.3);
      renforts.forEach((ligne, j) => {
        const k = j - KX, d = Math.abs(k), pr = seg(a2, 0.5 + 0.035 * d, 0.7 + 0.035 * d, ease.out);
        orienter(ligne.l, xE - 0.02, -k * iU, pr);
        ligne.mat.opacity = clamp(opLignes) * 0.9;
        ligne.l.visible = d * iU <= DEMI && pr > 0;
      });
      extinctions.forEach((ligne, j) => {
        const z = -(j - KX + 0.5) * iU;
        orienter(ligne.l, xE - 0.02, z, 1);
        ligne.mat.opacity = clamp(0.85 * opLignes * seg(a2, 0.74, 0.9));
        ligne.l.visible = Math.abs(z) <= DEMI && ligne.mat.opacity > 0.01;
      });
      montrer(legende, seg(a2, 0.56, 0.7) * (1 - seg(a4, 0, 0.08)));
      montrer(legExt, seg(a2, 0.74, 0.9));

      // Étape 3 : l'écran passe au noir, les franges se révèlent du centre vers les bords ; la règle apparaît.
      const revele = seg(a3, 0.42, 0.92);
      uFace.eclaire.value = seg(a3, 0.02, 0.3, ease.out);
      uFace.revele.value = revele;
      const oRegle = seg(a3, 0.2, 0.3) * oEcran;
      regle.visible = oRegle > 0.01;
      (regle.material as THREE.LineBasicMaterial).opacity = oRegle;
      for (const { mm, e } of etMm) {
        e.pos.set(ecran.position.x - 0.05, -HE - 0.36, -mm * MM);
        e.opacite = oRegle;
      }

      // Étape 4 : M part du centre (δ = 0), s'arrête sur la première frange sombre (δ = λ/2), puis sur la brillante suivante (δ = λ).
      const xM = ((seg(a4, 0.3, 0.48) + seg(a4, 0.66, 0.84)) * i) / 2;
      const delta = differenceMarche(xM, y), ordreM = delta / p.lambda, zM = -xM * MM;
      const vis4 = seg(a4, 0.02, 0.1) * (1 - seg(a5, 0, 0.14));
      const tir = seg(a4, 0.04, 0.22, ease.out);
      const S1 = a.set(0, 0.03, -sep / 2), S2 = b.set(0, 0.03, sep / 2);
      rayon1.maj(S1, c.set(lerp(0, xE, tir), 0.03, lerp(-sep / 2, zM, tir)), vis4);
      rayon2.maj(S2, c.set(lerp(0, xE, tir), 0.03, lerp(sep / 2, zM, tir)), vis4);
      // Surlongueur portée sur S2M depuis S2, à l'échelle des fronts d'onde (δ = λ vaut l'écart entre deux fronts).
      const l2 = Math.hypot(xE, zM - sep / 2), dU = ordreM * lam;
      c.set((xE / l2) * dU, 0.03, sep / 2 + ((zM - sep / 2) / l2) * dU);
      surlong.maj(S2, c, dU > 0.015 ? vis4 : 0);
      perp.maj(S1, c, dU > 0.015 ? 0.85 * vis4 : 0);
      etDelta.pos.set(c.x + 0.5, 0.25, c.z);
      etDelta.opacite = seg(a4, 0.32, 0.42) * vis4;
      etS1.pos.set(0, plaque.position.y + HF + 0.45, -sep / 2);
      etS2.pos.set(0, plaque.position.y + HF + 0.45, sep / 2);
      etS1.opacite = etS2.opacite = vis4;
      const oM = seg(a4, 0.18, 0.26) * vis4;
      ptM.visible = haloM.visible = oM > 0.01;
      ptM.position.set(xE - 0.04, 0.03, zM);
      haloM.position.copy(ptM.position);
      haloM.scale.setScalar(1 + 0.2 * Math.sin(T * 4));
      matM.opacity = oM;
      matHalo.opacity = (sombre ? 0.3 : 0.2) * oM;
      etM.pos.set(xE - 0.1, 0.45, zM);
      etM.opacite = oM;
      const nat = nature(delta, p.lambda);
      const ton = nat === 'constructive' ? C.menthe : nat === 'destructive' ? C.corail : C.discret;
      tDelta.textContent = `δ = ${fmt(ordreM, 2)} λ = ${fmt(delta, 0)} nm`;
      tEtat.textContent = nat === 'constructive' ? L('Ondes en phase', 'Waves in phase') : nat === 'destructive' ? L('Opposition de phase', 'In antiphase') : L('Déphasage partiel', 'Partial phase shift');
      tFrange.textContent = nat === 'constructive' ? L('Frange brillante', 'Bright fringe') : nat === 'destructive' ? L('Frange sombre', 'Dark fringe') : L('Éclairement moyen', 'Medium brightness');
      tEtat.style.color = tFrange.style.color = ton;
      montrer(enM, seg(a4, 0.1, 0.26, ease.out) * (1 - seg(a5, 0, 0.14)));

      // Étape 5 : deux mâchoires s'écartent du centre jusqu'aux franges brillantes d'ordre -n et +n.
      const ouvre = seg(a5, 0.22, 0.6), demiU = n * iU * ouvre;
      const oPied = seg(a5, 0.12, 0.22);
      matJaune.opacity = oPied;
      machoires.forEach((m, k) => {
        m.visible = oPied > 0.01;
        m.position.set(xE - 0.03, 0, (k ? 1 : -1) * demiU);
      });
      const yN = HE + 0.22;
      coteN.maj(a.set(xE - 0.06, yN, -demiU), b.set(xE - 0.06, yN, demiU), demiU > 0.01 ? oPied : 0);
      pions.forEach((m, j) => {
        const k = j - 5;
        m.position.set(xE - 0.06, yN, -k * iU);
        m.visible = oPied > 0.01 && Math.abs(k) <= n && Math.abs(k) * iU <= demiU + 0.01;
      });
      etN.pos.set(xE - 0.06, yN + 0.42, 0);
      etN.opacite = seg(a5, 0.58, 0.7);
      montrer(enMesure, seg(a5, 0.12, 0.3, ease.out));
      tNi.style.opacity = String(seg(a5, 0.6, 0.72));
      tI.style.opacity = String(seg(a5, 0.78, 0.92));

      // Étape 6 : résultat.
      montrer(enResultat, seg(a6, 0.05, 0.35, ease.backOut));
    };
  },
});
