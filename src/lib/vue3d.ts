// Moteur de la vue 3D : rendu WebGL, caméra orbitale, étiquettes, thème, libération.
// Chargé à la demande par le lecteur ; la scène elle-même vient de src/tp/<slug>/scene3d.ts.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { clamp, ease } from './anim';
import type { Etiquette3d, Scene3d } from './kit3d';
import { C } from './palette';
import type { Image } from './scene';

/** Levée quand le navigateur ne fournit pas de contexte WebGL. */
export class SansWebGL extends Error {
  name = 'SansWebGL';
}

export interface Vue3d {
  dessiner(img: Image): void;
  /** Remonte la scène avec la palette du thème courant, caméra inchangée. */
  theme(): void;
  recentrer(): void;
  liberer(): void;
}

/** Ouvre la vue 3D dans cadre (élément positionné qui contient le SVG de scène). perdue() est appelé si le contexte WebGL est perdu. */
export function creerVue3d(cadre: HTMLElement, def: Scene3d, label: string, perdue: () => void): Vue3d {
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'lecteur-3d';
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', label);
  // Test préalable sur un canvas jetable : évite les erreurs console de three.js quand WebGL 2 manque.
  const essai = document.createElement('canvas').getContext('webgl2');
  if (!essai) throw new SansWebGL('WebGL 2 indisponible');
  essai.getExtension('WEBGL_lose_context')?.loseContext();
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch (err) {
    throw new SansWebGL(String(err));
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const calque = document.createElement('div');
  calque.className = 'lecteur-calque';
  cadre.append(canvas, calque);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
  const depart = new THREE.Vector3(...def.camera.position), cible = new THREE.Vector3(...(def.camera.cible ?? [0, 0, 0]));
  camera.position.copy(depart);
  const ctrl = new OrbitControls(camera, canvas);
  ctrl.target.copy(cible);
  ctrl.enableDamping = !reduit;
  ctrl.dampingFactor = 0.08;
  ctrl.enablePan = false;
  ctrl.minDistance = def.camera.min;
  ctrl.maxDistance = def.camera.max;
  ctrl.minPolarAngle = 0.05;
  ctrl.maxPolarAngle = Math.PI - 0.05;
  ctrl.update();

  let etiquettes: Etiquette3d[] = [];
  let dessinerScene: (img: Image) => void = () => {};
  let derniere: Image | null = null;
  let w = 1, h = 1;
  const v = new THREE.Vector3();

  function rendre() {
    renderer.render(scene, camera);
    for (const e of etiquettes) {
      v.copy(e.pos).project(camera);
      const vis = e.opacite > 0.01 && v.z < 1;
      e.el.style.display = vis ? '' : 'none';
      if (!vis) continue;
      e.el.style.opacity = String(clamp(e.opacite));
      e.el.style.transform = `translate(${(((v.x + 1) / 2) * w).toFixed(1)}px, ${(((1 - v.y) / 2) * h).toFixed(1)}px) translate(-50%, -50%)`;
    }
  }

  function vider() {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      for (const mat of [m.material ?? []].flat()) {
        for (const val of Object.values(mat)) if (val instanceof THREE.Texture) val.dispose();
        mat.dispose();
      }
    });
    scene.clear();
    calque.replaceChildren();
    etiquettes = [];
  }

  function monter() {
    scene.background = new THREE.Color(C.fond);
    dessinerScene = def.monter({
      scene,
      camera,
      calque,
      etiquette(texte, { couleur = C.texte, taille = 14 } = {}) {
        const el = document.createElement('span');
        el.className = 'l3d';
        el.textContent = texte;
        el.style.color = couleur;
        el.style.fontSize = `${Math.max(13, taille)}px`;
        calque.appendChild(el);
        const e = { pos: new THREE.Vector3(), el, opacite: 1 };
        etiquettes.push(e);
        return e;
      },
    });
  }

  const taille = () => {
    w = Math.max(1, cadre.clientWidth);
    h = Math.max(1, cadre.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    rendre();
  };
  const ro = new ResizeObserver(taille);
  ro.observe(cadre);

  // Recentrage : glissement doux de la caméra vers la vue initiale (immédiat si mouvements réduits).
  let retour: { de: THREE.Vector3; t0: number } | null = null;
  let boucle = 0;
  const animer = (maintenant: number) => {
    if (retour) {
      const k = ease.inOut(clamp((maintenant - retour.t0) / 600));
      camera.position.lerpVectors(retour.de, depart, k);
      ctrl.target.copy(cible);
      if (k >= 1) retour = null;
    }
    ctrl.update();
    boucle = requestAnimationFrame(animer);
  };
  ctrl.addEventListener('change', rendre);
  boucle = requestAnimationFrame(animer);

  // Clavier : flèches pour tourner, + et - pour zoomer, 0 pour recentrer.
  const sph = new THREE.Spherical();
  canvas.addEventListener('keydown', (ev) => {
    const pas = 0.12;
    const d = { ArrowLeft: [-pas, 0, 1], ArrowRight: [pas, 0, 1], ArrowUp: [0, -pas, 1], ArrowDown: [0, pas, 1], '+': [0, 0, 0.88], '=': [0, 0, 0.88], '-': [0, 0, 1.14] }[ev.key];
    if (ev.key === '0') vue.recentrer();
    else if (d) {
      sph.setFromVector3(v.copy(camera.position).sub(ctrl.target));
      sph.theta += d[0];
      sph.phi = clamp(sph.phi + d[1], ctrl.minPolarAngle, ctrl.maxPolarAngle);
      sph.radius = clamp(sph.radius * d[2], ctrl.minDistance, ctrl.maxDistance);
      camera.position.setFromSpherical(sph).add(ctrl.target);
      ctrl.update();
    } else return;
    ev.preventDefault();
  });

  let libere = false;
  canvas.addEventListener('webglcontextlost', (ev) => {
    ev.preventDefault();
    if (!libere) perdue();
  });

  const vue: Vue3d = {
    dessiner(img) {
      derniere = img;
      dessinerScene(img);
      rendre();
    },
    theme() {
      vider();
      monter();
      if (derniere) vue.dessiner(derniere);
    },
    recentrer() {
      if (reduit) {
        camera.position.copy(depart);
        ctrl.target.copy(cible);
        ctrl.update();
      } else retour = { de: camera.position.clone(), t0: performance.now() };
    },
    liberer() {
      libere = true;
      cancelAnimationFrame(boucle);
      ro.disconnect();
      ctrl.dispose();
      vider();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      calque.remove();
    },
  };

  try {
    monter();
    taille();
  } catch (err) {
    vue.liberer();
    throw err;
  }
  return vue;
}
