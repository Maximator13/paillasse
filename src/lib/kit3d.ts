// Vue 3D d'un TP : contrat des fichiers src/tp/<slug>/scene3d.ts et petits outils three.js partagés.
// Ce module n'est chargé qu'à l'ouverture de la vue 3D (import dynamique depuis le lecteur).
import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { Image } from './scene';

/** Étiquette HTML accrochée à un point de la scène 3D : texte net et lisible, quel que soit le zoom. */
export interface Etiquette3d {
  /** Point de la scène où se place le centre de l'étiquette (à déplacer dans dessiner()). */
  pos: THREE.Vector3;
  /** Élément HTML : modifier textContent au besoin. */
  el: HTMLSpanElement;
  /** Opacité de 0 à 1 ; 0 masque l'étiquette. */
  opacite: number;
}

export interface Contexte3d {
  /** Scène à remplir. Fond déjà réglé sur C.fond. Tout ce qui y est ajouté est libéré par le lecteur. */
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Calque HTML posé sur le canvas (sans clic) : encarts et légendes fixes. Vidé par le lecteur. */
  calque: HTMLElement;
  /** Crée une étiquette (couleur de la palette, taille en px, 13 minimum). */
  etiquette(texte: string, opts?: { couleur?: string; taille?: number }): Etiquette3d;
}

export interface Scene3d {
  /** Vue initiale (et bouton Recentrer) : position de la caméra, point visé, distances de zoom permises. */
  camera: { position: [number, number, number]; cible?: [number, number, number]; min: number; max: number };
  /**
   * Construit la scène une fois (lire C ici, jamais dans une constante de module), puis renvoie
   * dessiner(img) : même contrat que la vue 2D, fonction PURE de l'image (etape, t, T, p).
   * Les mesures et le graphique restent ceux de scene.ts : dessiner() ne renvoie rien.
   */
  monter(ctx: Contexte3d): (img: Image) => void;
}

export const definirScene3d = (s: Scene3d) => s;

/**
 * Cercle unité du plan horizontal (point d'angle θ : cos θ, 0, -sin θ), en trait épais d'épaisseur
 * constante à l'écran (pixels). scale.set(a, 1, b) en fait une ellipse ; geometry.instanceCount = k
 * n'en trace que les k premiers segments (arc qui se dessine).
 */
export function cercle(couleur: string, { epaisseur = 2, tirets = 0, segments = 192 } = {}) {
  const pts: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const th = (2 * Math.PI * i) / segments;
    pts.push(Math.cos(th), 0, -Math.sin(th));
  }
  const geo = new LineGeometry();
  geo.setPositions(pts);
  const mat = new LineMaterial({ color: new THREE.Color(couleur), linewidth: epaisseur, transparent: true, dashed: tirets > 0, dashSize: tirets, gapSize: tirets * 2 });
  const ligne = new Line2(geo, mat);
  ligne.computeLineDistances();
  return { ligne, segments, mat };
}

/** Vecteur : tige et pointe pleines, couleur unie (non éclairée, pour garder la couleur exacte de la palette). */
export function fleche(couleur: string, rayon = 0.045) {
  const mat = new THREE.MeshBasicMaterial({ color: couleur, transparent: true });
  const tige = new THREE.Mesh(new THREE.CylinderGeometry(rayon, rayon, 1, 12), mat);
  const pointe = new THREE.Mesh(new THREE.ConeGeometry(rayon * 2.8, 1, 20), mat);
  const objet = new THREE.Group();
  objet.add(tige, pointe);
  const haut = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
  return {
    objet,
    /** Place la flèche de origine à origine + vecteur, avec l'opacité o. */
    maj(origine: THREE.Vector3, vecteur: THREE.Vector3, o = 1) {
      const l = vecteur.length();
      objet.visible = l > 1e-3 && o > 0.01;
      if (!objet.visible) return;
      const hp = Math.min(rayon * 7, l * 0.45);
      objet.position.copy(origine);
      objet.quaternion.setFromUnitVectors(haut, dir.copy(vecteur).divideScalar(l));
      tige.scale.set(1, l - hp, 1);
      tige.position.y = (l - hp) / 2;
      pointe.scale.set(1, hp, 1);
      pointe.position.y = l - hp / 2;
      mat.opacity = o;
    },
  };
}
