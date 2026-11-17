// Écoulement permanent d'un fluide parfait incompressible (eau) dans un tube de Venturi horizontal.
// Fonctions pures, sans dépendance. Unités SI partout : m, s, m³/s, Pa.

export const RHO = 1000; // kg/m³, masse volumique de l'eau
export const G = 9.81; // m/s², intensité de la pesanteur

/** Géométrie du tube (m) : diamètre D, col entre xCol et xDiv, raccordé par un convergent court et un divergent plus long. */
export const TUBE = { L: 0.4, D: 0.02, xConv: 0.12, xCol: 0.17, xDiv: 0.21, xFin: 0.3 };

/** Aire d'une section circulaire (m²). */
export const section = (diametre: number) => (Math.PI * diametre ** 2) / 4;

/** Conversion d'un débit de L/min en m³/s. */
export const debitSI = (litresParMinute: number) => litresParMinute / 60000;

/** Conservation du débit volumique : v = Dv / S (m/s). */
export const vitesse = (dv: number, s: number) => dv / s;

const raccord = (p: number) => (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, p)))) / 2;

/** Diamètre intérieur du tube (m) à l'abscisse x, pour un col de diamètre d. */
export function diametre(x: number, d: number): number {
  const { D, xConv, xCol, xDiv, xFin } = TUBE;
  if (x <= xConv || x >= xFin) return D;
  if (x < xCol) return D + (d - D) * raccord((x - xConv) / (xCol - xConv));
  if (x <= xDiv) return d;
  return d + (D - d) * raccord((x - xDiv) / (xFin - xDiv));
}

/** Relation de Bernoulli à altitude constante : écart de pression P1 - P2 (Pa) entre l'amont et le col. */
export function ecartPression(dv: number, d: number): number {
  const v1 = vitesse(dv, section(TUBE.D)), v2 = vitesse(dv, section(d));
  return 0.5 * RHO * (v2 * v2 - v1 * v1);
}

/** Hauteur d'eau (m) dans le tube manométrique là où le fluide va à la vitesse v, h0 étant le niveau au repos. */
export const hauteur = (v: number, h0: number) => h0 - (v * v) / (2 * G);

/** Pression relative P - Patm (Pa) sur l'axe du tube : rho.g.h. */
export const pressionRelative = (v: number, h0: number) => RHO * G * hauteur(v, h0);

/** Débitmètre de Venturi : débit volumique (m³/s) déduit de la dénivellation dh (m) entre l'amont et le col. */
export function debitVenturi(dh: number, d: number): number {
  const s1 = section(TUBE.D), s2 = section(d);
  return s2 * Math.sqrt((2 * G * dh) / (1 - (s2 / s1) ** 2));
}

/** Volume d'eau (m³) contenu entre l'entrée et les abscisses x_i = L.i/n, par la méthode des trapèzes. */
export function volumes(d: number, n = 400): number[] {
  const dx = TUBE.L / n, vol = [0];
  for (let i = 1; i <= n; i++) vol.push(vol[i - 1] + ((section(diametre((i - 1) * dx, d)) + section(diametre(i * dx, d))) / 2) * dx);
  return vol;
}

/** Durée (s) mise par une particule de fluide pour aller de l'entrée à l'abscisse x : volume balayé / débit. */
export function tempsParcours(x: number, dv: number, vol: number[]): number {
  const n = vol.length - 1, f = Math.min(1, Math.max(0, x / TUBE.L)) * n, i = Math.min(n - 1, Math.floor(f));
  return (vol[i] + (vol[i + 1] - vol[i]) * (f - i)) / dv;
}

/** Réciproque de tempsParcours : abscisse (m) atteinte t secondes après l'entrée dans le tube. */
export function positionAuTemps(t: number, dv: number, vol: number[]): number {
  const n = vol.length - 1, cible = Math.min(vol[n], Math.max(0, t * dv));
  let a = 0, b = n;
  while (b - a > 1) {
    const m = (a + b) >> 1;
    if (vol[m] <= cible) a = m;
    else b = m;
  }
  return (TUBE.L * (a + (cible - vol[a]) / (vol[b] - vol[a]))) / n;
}
