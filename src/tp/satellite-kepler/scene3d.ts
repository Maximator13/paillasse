import * as THREE from 'three';
import { L, avancement, clamp, ease, fmt, lerp, rng, seg } from '../../lib/anim';
import { cercle, definirScene3d, fleche } from '../../lib/kit3d';
import { C, themeSombre } from '../../lib/palette';
import { JOUR_SIDERAL, M_TERRE, R_TERRE, anomalieExcentrique, champ, masseDepuisPente, pente, periode, pointEllipse, vitesseEllipse } from './model';
import { R_MAX, S, SATS, sci } from './scene';

// Repère : Terre au centre, plan de l'orbite horizontal. Le point (x, y) du modèle devient (x, 0, -y).
const K = 10 / R_MAX; // unités de scène par mètre : la plus grande orbite a un rayon de 10
const PX = 10 / 190; // un pixel de la vue 2D en unités de scène (longueurs des vecteurs identiques)
const RT = R_TERRE * K;
const PI = Math.PI;
const TEINTES = ['rose', 'orange', 'violet', 'jaune'] as const; // couleurs de SATS, relues dans C au montage

const P = (x: number, y: number, v = new THREE.Vector3()) => v.set(x * K, 0, -y * K);

/** Bruit de valeur 3D lissé, en octaves (fbm). Échantillonné sur la sphère : pas de couture sur la texture. */
function bruit(graine: number) {
  const alea = rng(graine), perm = new Uint8Array(512), val = new Float32Array(256);
  for (let i = 0; i < 256; i++) { perm[i] = i; val[i] = alea(); }
  for (let i = 255; i > 0; i--) { const j = Math.floor(alea() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  const h = (x: number, y: number, z: number) => val[perm[perm[perm[x & 255] + (y & 255)] + (z & 255)]];
  const l = (t: number) => t * t * (3 - 2 * t);
  const n = (x: number, y: number, z: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const u = l(x - xi), v = l(y - yi), w = l(z - zi);
    const c = (dx: number, dy: number) => lerp(h(xi + dx, yi + dy, zi), h(xi + dx, yi + dy, zi + 1), w);
    return lerp(lerp(c(0, 0), c(1, 0), u), lerp(c(0, 1), c(1, 1), u), v);
  };
  return (x: number, y: number, z: number, oct: number) => {
    let s = 0, amp = 0.5, f = 1;
    for (let o = 0; o < oct; o++) { s += amp * n(x * f, y * f, z * f); amp *= 0.5; f *= 2; }
    return s / (1 - 0.5 ** oct);
  };
}

const rgb = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const melange = (a: number[], b: number[], k: number) => a.map((x, i) => lerp(x, b[i], clamp(k)));

/** Textures procédurales de la Terre (sol et nuages), aux couleurs de la palette courante. */
function texturesTerre() {
  const W = 512, H = 256;
  const relief = bruit(3), sec = bruit(5), ciel = bruit(9);
  const fond = rgb(C.bleu).map((x) => x * 0.45), haut = melange(rgb(C.bleu), rgb(C.cyan), 0.6), herbe = rgb(C.menthe), sable = melange(rgb(C.menthe), rgb(C.jaune), 0.7), glace = rgb(C.blanc);
  const toiles = [0, 1].map(() => Object.assign(document.createElement('canvas'), { width: W, height: H }));
  const [ctxSol, ctxNuages] = toiles.map((c) => c.getContext('2d')!);
  const sol = ctxSol.createImageData(W, H), nuages = ctxNuages.createImageData(W, H);
  for (let j = 0; j < H; j++) {
    const lat = (0.5 - (j + 0.5) / H) * PI, cl = Math.cos(lat), y = Math.sin(lat);
    for (let i = 0; i < W; i++) {
      const lon = ((i + 0.5) / W) * 2 * PI, x = cl * Math.cos(lon), z = cl * Math.sin(lon);
      const hh = relief(x * 1.25 + 4, y * 1.25, z * 1.25, 6);
      let c = hh < 0.53
        ? melange(fond, haut, (hh - 0.38) / 0.15)
        : melange(melange(herbe, sable, (sec(x * 2.2, y * 2.2, z * 2.2, 3) - 0.42) * 4), fond, (hh - 0.55) * 1.6);
      c = melange(c, glace, (Math.abs(lat) - 1.18 - 0.12 * relief(x * 3, y * 3, z * 3, 2)) * 8);
      const k = 4 * (j * W + i);
      sol.data.set([c[0], c[1], c[2], 255], k);
      const a = clamp((ciel(x * 2.4 + 9, y * 4, z * 2.4, 5) - 0.58) * 4) * 0.75;
      nuages.data.set([255, 255, 255, a * 255], k);
    }
  }
  ctxSol.putImageData(sol, 0, 0);
  ctxNuages.putImageData(nuages, 0, 0);
  return toiles.map((c) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  });
}

/** Lueur d'atmosphère. halo : sphère vue de l'intérieur, qui s'estompe vers l'espace ; sinon liseré sur le bord du disque. */
function atmosphere(rayon: number, halo: boolean) {
  const seuil = Math.sqrt(1 - (RT / rayon) ** 2);
  const mat = new THREE.ShaderMaterial({
    uniforms: { couleur: { value: new THREE.Color(C.cyan) }, force: { value: themeSombre() ? 0.9 : 0.55 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 couleur; uniform float force; varying vec3 vN; varying vec3 vV;
      void main() {
        float d = dot(normalize(vN), normalize(vV));
        float i = ${halo ? `pow(clamp(-d / ${seuil.toFixed(4)}, 0.0, 1.0), 2.6)` : 'pow(1.0 - max(d, 0.0), 3.0) * 0.8'};
        gl_FragColor = vec4(couleur, i * force);
        #include <colorspace_fragment>
      }`,
    side: halo ? THREE.BackSide : THREE.FrontSide,
    transparent: true,
    depthWrite: false,
    blending: themeSombre() ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(rayon, 64, 48), mat);
}

export default definirScene3d({
  camera: { position: [0, 13.5, 23.4], min: 3.2, max: 60 },

  monter({ scene, calque, etiquette }) {
    const sombre = themeSombre();

    // Lumières : un soleil fixe (jour et nuit visibles) et une ambiance douce.
    const soleil = new THREE.DirectionalLight(C.blanc, 2.8);
    soleil.position.set(-12, 7, 9);
    scene.add(soleil, new THREE.HemisphereLight(C.blanc, C.bleu, sombre ? 0.35 : 0.7));

    // Étoiles lointaines.
    const alea = rng(11), pos: number[] = [];
    for (let i = 0; i < 1400; i++) {
      const u = alea() * 2 - 1, th = alea() * 2 * PI, s = Math.sqrt(1 - u * u);
      pos.push(300 * s * Math.cos(th), 300 * u, 300 * s * Math.sin(th));
    }
    const geoEt = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geoEt, new THREE.PointsMaterial({ color: sombre ? C.verre : C.metal, size: 1.6, sizeAttenuation: false, transparent: true, opacity: sombre ? 0.7 : 0.35 })));

    // Plan de l'orbite : grille polaire discrète, ouverte autour de la Terre (pas de traits devant son disque).
    const traits: number[] = [];
    for (let rr = 4; rr <= 10; rr += 2) {
      for (let i = 0; i < 128; i++) {
        const t0 = (2 * PI * i) / 128, t1 = (2 * PI * (i + 1)) / 128;
        traits.push(rr * Math.cos(t0), -0.02, rr * Math.sin(t0), rr * Math.cos(t1), -0.02, rr * Math.sin(t1));
      }
    }
    for (let i = 0; i < 12; i++) {
      const th = (2 * PI * i) / 12;
      traits.push(3.2 * Math.cos(th), -0.02, 3.2 * Math.sin(th), 10.6 * Math.cos(th), -0.02, 10.6 * Math.sin(th));
    }
    const geoGr = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(traits, 3));
    scene.add(new THREE.LineSegments(geoGr, new THREE.LineBasicMaterial({ color: C.grille, transparent: true, opacity: 0.9 })));

    // Terre : sol et nuages procéduraux, liseré et halo d'atmosphère.
    const [texSol, texNuages] = texturesTerre();
    const terre = new THREE.Mesh(new THREE.SphereGeometry(RT, 96, 64), new THREE.MeshStandardMaterial({ map: texSol, roughness: 0.85, metalness: 0 }));
    const nuages = new THREE.Mesh(new THREE.SphereGeometry(RT * 1.012, 96, 64), new THREE.MeshStandardMaterial({ map: texNuages, transparent: true, depthWrite: false, roughness: 1 }));
    scene.add(terre, nuages, atmosphere(RT * 1.003, false), atmosphere(RT * 1.16, true));

    // Secteurs balayés : éventail de 16 triangles depuis le foyer, mis à jour à chaque image.
    const secteur = (couleur: string) => {
      const attr = new THREE.BufferAttribute(new Float32Array(18 * 3), 3);
      const geo = new THREE.BufferGeometry().setAttribute('position', attr);
      geo.setIndex(Array.from({ length: 16 }, (_, i) => [0, i + 1, i + 2]).flat());
      const plein = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: couleur, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
      // Contour : mêmes sommets, sans l'index de l'éventail (sinon chaque rayon serait tracé).
      const bord = new THREE.LineLoop(new THREE.BufferGeometry().setAttribute('position', attr), new THREE.LineBasicMaterial({ color: couleur, transparent: true }));
      scene.add(plein, bord);
      return { geo, plein, bord };
    };
    const secA = secteur(C.rose), secP = secteur(C.jaune);

    // Orbites : satellites de référence (pointillés), orbite de l'élève (tirets), sillage d'un tour.
    const refs = SATS.map((s, i) => {
      const couleur = C[TEINTES[i]];
      const orbite = cercle(couleur, { epaisseur: 2, tirets: 0.012 });
      orbite.ligne.scale.setScalar(s.r * K);
      const corps = new THREE.Group();
      corps.add(
        new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 16), new THREE.MeshBasicMaterial({ color: couleur })),
        new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 16), new THREE.MeshBasicMaterial({ color: couleur, transparent: true, opacity: 0.22, depthWrite: false })),
      );
      scene.add(orbite.ligne, corps);
      return { ...s, orbite, corps, lab: etiquette(s.nom, { couleur, taille: 13 }) };
    });
    const orbite = cercle(C.cyan, { epaisseur: 2, tirets: 0.03 });
    const sillage = cercle(C.cyan, { epaisseur: 4.5 });
    sillage.ligne.rotation.y = 1.6 * PI;
    scene.add(orbite.ligne, sillage.ligne);

    // Satellite de l'élève : corps, panneaux solaires, halo.
    const sat = new THREE.Group();
    const panneau = new THREE.MeshStandardMaterial({ color: C.bleu, metalness: 0.5, roughness: 0.35 });
    sat.add(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), new THREE.MeshStandardMaterial({ color: C.cyan, metalness: 0.25, roughness: 0.4 })));
    for (const z of [-0.39, 0.39]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.44), panneau);
      p.position.z = z;
      sat.add(p);
    }
    sat.add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.16, depthWrite: false })));
    scene.add(sat);

    const vF = fleche(C.corail, 0.06), vV = fleche(C.menthe, 0.06);
    scene.add(vF.objet, vV.objet);
    const nomF = etiquette('F', { couleur: C.corail, taille: 16 }), nomV = etiquette('v', { couleur: C.menthe, taille: 16 });
    const perigee = etiquette(L('Périgée', 'Perigee'), { couleur: C.jaune, taille: 13 }), apogee = etiquette(L('Apogée', 'Apogee'), { couleur: C.rose, taille: 13 });

    // Calque HTML : légende en haut à gauche, encart du résultat en bas à gauche.
    const html = (parent: HTMLElement, contenu: string, style = '') => {
      const d = document.createElement('div');
      d.innerHTML = contenu;
      d.style.cssText = style;
      parent.appendChild(d);
      return d;
    };
    const legende = html(calque, '', 'top:.6rem;left:.6rem;max-width:calc(100% - 5rem)');
    legende.className = 'l3d-panneau';
    const puce = (c: string) => `<span style="display:inline-block;width:18px;height:3px;border-radius:2px;background:${c};vertical-align:middle;margin-right:.45rem"></span>`;
    const carre = (c: string) => `<span style="display:inline-block;width:11px;height:11px;border-radius:3px;background:${c};vertical-align:-1px;margin-right:.2rem"></span>`;
    const legF = html(legende, puce(C.corail) + L('Force de gravitation', 'Gravitational force'));
    const legV = html(legende, puce(C.menthe) + L('Vitesse (tangente)', 'Velocity (tangent)'));
    legF.className = legV.className = 'l3d-large';
    const legChrono = html(legende, '', `font-family:var(--mono);color:${C.cyan}`);
    const legAires = html(legende, `${carre(C.rose)}${carre(C.jaune)} ${L('Aires égales', 'Equal areas')} <span class="l3d-large" style="color:${C.discret};font-weight:500">${L('balayées en Δt = T/10', 'swept in Δt = T/10')}</span>`);
    const encart = html(calque, '', `left:.6rem;bottom:.6rem;border-color:${C.jaune};min-width:11rem`);
    encart.className = 'l3d-panneau';
    html(encart, L('Pente k (s²/m³)', 'Gradient k (s²/m³)'), `color:${C.discret}`);
    const txtK = html(encart, '', 'font-family:var(--mono);font-size:15px');
    html(encart, L('Masse de l\'astre', 'Mass of the body'), `color:${C.discret}`);
    const txtM = html(encart, '', `font-family:var(--mono);font-size:16px;color:${C.jaune}`);
    const montrer = (d: HTMLElement, o: number) => {
      d.style.display = o > 0.01 ? '' : 'none';
      d.style.opacity = String(clamp(o));
    };

    const vs = new THREE.Vector3(), vu = new THREE.Vector3(), vt = new THREE.Vector3(), q = new THREE.Vector3();

    return ({ etape, t, T, p }) => {
      // Même cinématique que scene.ts : orbite, anomalie moyenne pilotée par les étapes puis par l'horloge.
      const img = { etape, t };
      const [a1, a2, a3, a4, a5] = [0, 1, 2, 3, 4].map((i) => avancement(img, i));
      const M = p.m * M_TERRE;
      const r = R_TERRE + p.h * 1e3;
      const f = seg(a3, 0, 0.12) * (1 - seg(a4, 0, 0.25));
      const a = lerp(r, clamp(r, 9.4e6 / (1 - p.e), R_MAX / (1 + p.e)), f), e = p.e * f;
      const b = a * Math.sqrt(1 - e * e);
      const Tp = periode(a, M);

      orbite.ligne.scale.set(a * K, 1, b * K);
      orbite.ligne.position.x = -a * e * K;
      orbite.mat.opacity = seg(a1, 0.5, 0.7);
      orbite.ligne.visible = orbite.mat.opacity > 0.01;

      const Mm = etape >= 3 ? 1 + (2 * PI * T * S) / Tp : 1.6 * PI * a1 + 2 * PI * a2 + 4 * PI * a3;
      const E = anomalieExcentrique(Mm, e);
      const pt = pointEllipse(E, a, e);
      const k = lerp(R_TERRE / pt.r, 1, seg(a1, 0.1, 0.6));
      P(pt.x * k, pt.y * k, vs);
      const d = pt.r * k;
      let tx = -a * Math.sin(E), ty = b * Math.cos(E);
      const nt = Math.hypot(tx, ty);
      tx /= nt; ty /= nt;
      const retour = etape >= 3 ? seg(a4, 0, 0.08) : 1;
      const oSat = seg(a1, 0.03, 0.1) * retour;
      sat.visible = oSat > 0.01;
      sat.scale.setScalar(1.4 * Math.max(oSat, 0.01));
      sat.position.copy(vs);
      sat.lookAt(q.set(vs.x + tx, 0, vs.z - ty));

      // Vecteurs : force vers la Terre, vitesse tangente, longueurs de la vue 2D.
      const v = vitesseEllipse(pt.r, a, M);
      const oF = seg(a1, 0.62, 0.78, ease.backOut) * retour, oV = seg(a1, 0.78, 0.94, ease.backOut) * retour;
      const LF = Math.max(0, Math.min(d * K / PX - 8, 18 + 14 * Math.sqrt(champ(pt.r, M))) * oF) * PX;
      const LV = Math.max(0, Math.min(80, (7 * v) / 1000) * oV) * PX;
      vu.copy(vs).normalize().multiplyScalar(-1);
      vt.set(tx, 0, -ty);
      vF.maj(vs, q.copy(vu).multiplyScalar(LF), clamp(oF));
      vV.maj(vs, q.copy(vt).multiplyScalar(LV), clamp(oV));
      // Noms au-delà de la pointe ; sur une orbite basse, celui de F passe à côté de sa flèche, près du satellite, à l'opposé de v (comme en 2D).
      nomF.pos.copy(vs).addScaledVector(vu, LF + 0.35);
      if (nomF.pos.length() < RT + 0.5) nomF.pos.copy(vs).addScaledVector(vu, Math.min(LF, 0.5)).addScaledVector(vt, -0.75).add(q.set(0, 0.3, 0));
      nomF.opacite = clamp(oF);
      nomV.pos.copy(vs).addScaledVector(vt, LV + 0.35);
      nomV.opacite = clamp(oV);
      montrer(legF, seg(a1, 0.62, 0.78));
      montrer(legV, seg(a1, 0.78, 0.94));

      // Étape 2 : sillage d'un tour et chronomètre.
      sillage.ligne.scale.setScalar(r * K);
      sillage.ligne.geometry.instanceCount = Math.ceil(sillage.segments * a2);
      sillage.mat.opacity = a2 > 0 ? 1 - seg(a3, 0, 0.1) : 0;
      sillage.ligne.visible = sillage.mat.opacity > 0.01;
      const tour = etape > 1 || a2 >= 1;
      legChrono.textContent = tour ? `T = ${fmt(Tp / 3600, 2)} h` : `t = ${fmt((a2 * Tp) / 3600, 2)} h`;
      montrer(legChrono, seg(a2, 0, 0.06));

      // Étape 3 : deux secteurs balayés pendant T/10, à l'apogée puis au périgée.
      const u = -0.4 * PI + 4 * PI * a3;
      const oAires = 1 - seg(a4, 0, 0.15);
      const remplir = (s: ReturnType<typeof secteur>, m0: number, part: number) => {
        const vis = part > 0 && oAires > 0.01;
        s.plein.visible = s.bord.visible = vis;
        if (!vis) return;
        const attr = s.geo.getAttribute('position') as THREE.BufferAttribute;
        attr.setXYZ(0, 0, 0.004, 0);
        for (let i = 0; i <= 16; i++) {
          const c = pointEllipse(anomalieExcentrique(m0 + (part * 0.2 * PI * i) / 16, e), a, e);
          attr.setXYZ(i + 1, c.x * K, 0.004, -c.y * K);
        }
        attr.needsUpdate = true;
        s.geo.computeBoundingSphere();
        s.bord.geometry.computeBoundingSphere();
        (s.plein.material as THREE.MeshBasicMaterial).opacity = 0.42 * oAires;
        (s.bord.material as THREE.LineBasicMaterial).opacity = oAires;
      };
      remplir(secA, 0.9 * PI, clamp((u - 0.9 * PI) / (0.2 * PI)));
      remplir(secP, 1.9 * PI, clamp((u - 1.9 * PI) / (0.2 * PI)));
      montrer(legAires, seg(a3, 0.64, 0.76) * oAires);
      const oAxes = seg(a3, 0.08, 0.2) * oAires;
      P(a * (1 - e) + 1.2 / K, 0, perigee.pos);
      P(-a * (1 + e) - 1.2 / K, 0, apogee.pos);
      perigee.opacite = apogee.opacite = oAxes;

      // Étape 4 : satellites de référence, un à un.
      refs.forEach((s, i) => {
        const o = seg(a4, 0.12 + 0.18 * i, 0.3 + 0.18 * i);
        const Ts = periode(s.r, M), th = s.phase + (2 * PI * T * S) / Ts;
        s.orbite.mat.opacity = 0.75 * o;
        s.orbite.ligne.visible = s.corps.visible = o > 0.01;
        P(s.r * Math.cos(th), s.r * Math.sin(th), s.corps.position);
        s.corps.scale.setScalar(Math.max(o, 0.01));
        // Orbite rasante (ISS) : le nom, posé juste au-dessus, couvrirait la Terre ; il s'écarte vers l'extérieur.
        if (s.r * K < 3) P((3.6 / K) * Math.cos(th), (3.6 / K) * Math.sin(th), s.lab.pos).add(q.set(0, 0.3, 0));
        else s.lab.pos.copy(s.corps.position).add(q.set(0, 0.5, 0));
        s.lab.el.textContent = `${s.nom} · ${fmt(Ts / 3600, 2)} h`;
        s.lab.opacite = o;
      });

      // Étape 5 : pente de T² = f(r³) et masse de l'astre.
      const kS = pente([...SATS.map((s) => s.r), a].map((x) => [x ** 3, periode(x, M) ** 2]));
      txtK.textContent = sci(kS);
      txtM.textContent = `${sci(masseDepuisPente(kS))} kg`;
      montrer(encart, seg(a5, 0.5, 0.75, ease.backOut));
      // Légende masquée quand aucune ligne n'est visible (sur petit écran, certaines lignes sont masquées par la feuille de style).
      legende.style.display = '';
      legende.style.display = [legF, legV, legChrono, legAires].some((x) => x.checkVisibility()) ? '' : 'none';

      // Rotation propre de la Terre (un jour sidéral) : Météosat, géostationnaire, reste au-dessus du même point.
      terre.rotation.y = 2.2 + (2 * PI * T * S) / JOUR_SIDERAL;
      nuages.rotation.y = terre.rotation.y + 0.02 * T;
    };
  },
});
