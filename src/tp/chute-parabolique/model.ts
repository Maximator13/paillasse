// Mouvement d'un projectile dans le champ de pesanteur uniforme (chute libre, frottements négligés).
// Repère (O ; x, y) : O au sol, à la verticale du point de lancement, y vers le haut. Fonctions pures, sans dépendance.

export interface Tir {
  /** Norme de la vitesse initiale (m/s). */
  v0: number;
  /** Angle de tir au-dessus de l'horizontale (degrés). */
  alpha: number;
  /** Intensité de la pesanteur (m/s²). */
  g: number;
  /** Altitude du point de lancement (m). */
  h: number;
}

export interface Point {
  t: number;
  x: number;
  y: number;
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Composantes de la vitesse initiale (m/s). */
export const vitesseInitiale = ({ v0, alpha }: Tir) => ({ vx: v0 * Math.cos(rad(alpha)), vy: v0 * Math.sin(rad(alpha)) });

/** Équations horaires : x = v0.cos(alpha).t et y = -g.t²/2 + v0.sin(alpha).t + h. */
export function position(t: number, tir: Tir) {
  const { vx, vy } = vitesseInitiale(tir);
  return { x: vx * t, y: -0.5 * tir.g * t * t + vy * t + tir.h };
}

/** Vitesse à la date t : vx constante, vy = -g.t + v0.sin(alpha). */
export function vitesse(t: number, tir: Tir) {
  const { vx, vy } = vitesseInitiale(tir);
  return { vx, vy: vy - tir.g * t };
}

/** Sommet S de la trajectoire (vy = 0). Son ordonnée y est la flèche. */
export function sommet(tir: Tir): Point {
  const t = vitesseInitiale(tir).vy / tir.g;
  return { t, ...position(t, tir) };
}

/** Date du retour au sol (y = 0) : racine positive de -g.t²/2 + v0.sin(alpha).t + h = 0. */
export function dureeVol(tir: Tir) {
  const { vy } = vitesseInitiale(tir);
  return (vy + Math.sqrt(vy * vy + 2 * tir.g * tir.h)) / tir.g;
}

/** Portée : abscisse du point de chute (m). */
export const portee = (tir: Tir) => vitesseInitiale(tir).vx * dureeVol(tir);

/** Équation de la trajectoire y(x) : parabole obtenue en éliminant t. */
export function trajectoire(x: number, tir: Tir) {
  const { vx } = vitesseInitiale(tir);
  return (-tir.g * x * x) / (2 * vx * vx) + x * Math.tan(rad(tir.alpha)) + tir.h;
}

/** Énergies cinétique, potentielle de pesanteur (référence au sol) et mécanique (J) d'une balle de masse m (kg). */
export function energies(t: number, tir: Tir, m: number) {
  const { vx, vy } = vitesse(t, tir);
  const ec = 0.5 * m * (vx * vx + vy * vy), epp = m * tir.g * position(t, tir).y;
  return { ec, epp, em: ec + epp };
}

/** Intervalle de temps entre deux images pointées (s) : on garde une image sur k d'une vidéo à `cadence` images/s, pour au plus nMax intervalles sur le vol. */
export function intervalle(tir: Tir, cadence = 25, nMax = 24) {
  return Math.max(1, Math.ceil((dureeVol(tir) * cadence) / nMax - 1e-9)) / cadence;
}

/** Positions successives de la balle, toutes les dt secondes, du lancement au dernier instant avant le sol. */
export function pointage(tir: Tir, dt: number): Point[] {
  const n = Math.floor(dureeVol(tir) / dt + 1e-9);
  return Array.from({ length: n + 1 }, (_, i) => ({ t: i * dt, ...position(i * dt, tir) }));
}

/** Vitesse au point i estimée comme en TP, par différence centrée entre les points i - 1 et i + 1. */
export function vitessePointee(pts: Point[], i: number) {
  const a = pts[i - 1], b = pts[i + 1];
  return { vx: (b.x - a.x) / (b.t - a.t), vy: (b.y - a.y) / (b.t - a.t) };
}
