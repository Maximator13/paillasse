// Effet Doppler sonore : source en mouvement rectiligne uniforme, récepteur fixe. Fonctions pures, sans dépendance.

/** Célérité du son dans l'air (m/s), valeur usuelle au lycée. */
export const C_SON = 340;

/** Fréquence perçue (Hz) quand la source s'approche à la vitesse v (m/s) : fE.c/(c - v). */
export const frequenceApproche = (fE: number, v: number, c = C_SON) => (fE * c) / (c - v);

/** Fréquence perçue (Hz) quand la source s'éloigne à la vitesse v (m/s) : fE.c/(c + v). */
export const frequenceEloignement = (fE: number, v: number, c = C_SON) => (fE * c) / (c + v);

/** Décalage approché (Hz), valable pour v petit devant c : fE.v/c. */
export const decalageApproche = (fE: number, v: number, c = C_SON) => (fE * v) / c;

/** Vitesse de la source (m/s) déduite des fréquences perçues à l'approche (fA) et à l'éloignement (fB). */
export const vitesseSource = (fA: number, fB: number, c = C_SON) => (c * (fA - fB)) / (fA + fB);

/** Longueur d'onde (m) devant la source (sens = 1) ou derrière elle (sens = -1) : (c -/+ v)/fE. */
export const longueurOnde = (fE: number, v = 0, sens: 1 | -1 = 1, c = C_SON) => (c - sens * v) / fE;

export interface Passage {
  /** Fréquence émise (Hz). */
  fE: number;
  /** Vitesse de la source (m/s). */
  v: number;
  /** Distance du micro à la trajectoire (m). */
  d: number;
  c?: number;
}

/**
 * Fréquence perçue (Hz) à la date t (s) par un micro placé à la distance d de la trajectoire.
 * La source passe au plus près du micro à t = 0. Le son reçu à t a été émis à la date te < t,
 * solution de c.(t - te) = distance source-micro à te. Seule compte la vitesse radiale à l'émission.
 */
export function frequencePercue(t: number, { fE, v, d, c = C_SON }: Passage): number {
  const te = (c * c * t - Math.sqrt(c * c * v * v * t * t + (c * c - v * v) * d * d)) / (c * c - v * v);
  const distance = Math.hypot(d, v * te);
  const vRadiale = distance === 0 ? 0 : (v * v * te) / distance; // négative à l'approche
  return fE / (1 + vRadiale / c);
}

/** Points (t, f perçue) de tMin à tMax. */
export function courbePassage(p: Passage, tMin: number, tMax: number, n = 400): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = tMin + ((tMax - tMin) * i) / n;
    return [t, frequencePercue(t, p)];
  });
}

export interface Front {
  /** Abscisse du centre : position de la source à l'instant de l'émission. */
  x: number;
  rayon: number;
  /** Temps écoulé depuis l'émission. */
  age: number;
}

/**
 * Fronts d'onde à la date t d'une source d'abscisse x = v.t qui émet un front à chaque multiple de la période.
 * Chaque front est un cercle centré sur la position de la source à l'émission, de rayon c fois son âge.
 * Unités libres mais cohérentes (m et s, ou pixels et secondes d'animation). Du plus récent au plus ancien.
 */
export function frontsOnde(t: number, o: { v: number; c: number; periode: number; depuis?: number; rayonMax: number }): Front[] {
  const fronts: Front[] = [];
  const debut = Math.max(o.depuis ?? -Infinity, t - o.rayonMax / o.c);
  for (let k = Math.floor(t / o.periode + 1e-9); k * o.periode >= debut - 1e-9; k--) {
    const age = Math.max(0, t - k * o.periode);
    fronts.push({ x: o.v * k * o.periode, rayon: o.c * age, age });
  }
  return fronts;
}
