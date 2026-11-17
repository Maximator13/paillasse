// Satellites et lois de Kepler. Fonctions pures, sans dépendance. Unités SI : m, s, kg.

/** Constante de gravitation universelle (N·m²/kg²). */
export const G = 6.674e-11;
/** Masse de la Terre (kg). */
export const M_TERRE = 5.972e24;
/** Rayon moyen de la Terre (m). */
export const R_TERRE = 6.371e6;
/** Jour sidéral : durée d'un tour de la Terre sur elle-même (s), soit 23 h 56 min 4 s. */
export const JOUR_SIDERAL = 86164;

/** Champ de gravitation à la distance r du centre (m/s²) : force subie par kilogramme. */
export const champ = (r: number, M = M_TERRE) => (G * M) / r ** 2;

/** Vitesse sur une orbite circulaire de rayon r (m/s) : v = racine(G.M/r). */
export const vitesse = (r: number, M = M_TERRE) => Math.sqrt((G * M) / r);

/** Période de révolution (s) : T = 2.pi.racine(r³/(G.M)). Vaut aussi pour une ellipse de demi-grand axe r. */
export const periode = (r: number, M = M_TERRE) => 2 * Math.PI * Math.sqrt(r ** 3 / (G * M));

/** Constante de la troisième loi de Kepler (s²/m³) : T²/r³ = 4.pi²/(G.M). */
export const constanteKepler = (M = M_TERRE) => (4 * Math.PI ** 2) / (G * M);

/** Masse de l'astre attracteur (kg) déduite de la pente k de la droite T² = k.r³. */
export const masseDepuisPente = (k: number) => (4 * Math.PI ** 2) / (G * k);

/** Rayon de l'orbite circulaire de période T (m). */
export const rayonPourPeriode = (T: number, M = M_TERRE) => Math.cbrt((G * M * T ** 2) / (4 * Math.PI ** 2));

/** Pente de la droite passant par l'origine ajustée sur les points (x, y), par moindres carrés. */
export function pente(pts: [number, number][]): number {
  let sxy = 0, sxx = 0;
  for (const [x, y] of pts) { sxy += x * y; sxx += x * x; }
  return sxy / sxx;
}

/** Anomalie excentrique E solution de l'équation de Kepler E - e.sin E = Mm (méthode de Newton). */
export function anomalieExcentrique(Mm: number, e: number): number {
  let E = Mm + e * Math.sin(Mm);
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - Mm) / (1 - e * Math.cos(E));
  return E;
}

/** Point de l'ellipse (demi-grand axe a, excentricité e) d'anomalie excentrique E. Foyer à l'origine, périgée sur l'axe des x positifs. */
export function pointEllipse(E: number, a: number, e: number) {
  const x = a * (Math.cos(E) - e), y = a * Math.sqrt(1 - e * e) * Math.sin(E);
  return { x, y, r: a * (1 - e * Math.cos(E)) };
}

/** Position sur l'ellipse à l'anomalie moyenne Mm = 2.pi.t/T (t compté depuis le passage au périgée). */
export const positionEllipse = (Mm: number, a: number, e: number) => pointEllipse(anomalieExcentrique(Mm, e), a, e);

/** Vitesse sur une orbite elliptique de demi-grand axe a, à la distance r du foyer (m/s). */
export const vitesseEllipse = (r: number, a: number, M = M_TERRE) => Math.sqrt(G * M * (2 / r - 1 / a));

/** Aire balayée par le rayon vecteur pendant la durée dt (m²) : la même partout sur l'orbite (deuxième loi). */
export const aireBalayee = (a: number, e: number, dt: number, M = M_TERRE) =>
  (Math.PI * a * a * Math.sqrt(1 - e * e) * dt) / periode(a, M);
