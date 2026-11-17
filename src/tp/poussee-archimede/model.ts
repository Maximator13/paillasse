// Poussée d'Archimède sur un cylindre vertical suspendu à un dynamomètre. Fonctions pures, unités SI.

/** Intensité de la pesanteur (N/kg). */
export const G = 9.81;
/** Pression atmosphérique normale (Pa). */
export const P0 = 101325;

/** Poids (N) d'un solide de masse volumique rhoSolide (kg/m³) et de volume V (m³). */
export const poids = (rhoSolide: number, volume: number) => rhoSolide * volume * G;

/** Poussée d'Archimède (N) : poids du fluide déplacé, rhoFluide (kg/m³), volume immergé (m³). */
export const poussee = (rhoFluide: number, volumeImmerge: number) => rhoFluide * volumeImmerge * G;

/** Valeur lue au dynamomètre (N) : P - PA, nulle si le fil est détendu. */
export const forceDynamometre = (rhoSolide: number, rhoFluide: number, volume: number, volumeImmerge: number) =>
  Math.max(0, poids(rhoSolide, volume) - poussee(rhoFluide, volumeImmerge));

/** Le solide flotte s'il est moins dense que le fluide. */
export const flotte = (rhoSolide: number, rhoFluide: number) => rhoSolide < rhoFluide;

/** Fraction du volume immergée à l'équilibre, solide libre : rhoSolide / rhoFluide s'il flotte, 1 sinon. */
export const fractionImmergee = (rhoSolide: number, rhoFluide: number) => Math.min(1, rhoSolide / rhoFluide);

/** Loi fondamentale de la statique des fluides : pression (Pa) à la profondeur z (m) sous la surface libre. */
export const pression = (rhoFluide: number, z: number, p0 = P0) => p0 + rhoFluide * G * Math.max(0, z);

/** Résultante (N, vers le haut) des forces pressantes sur un cylindre vertical de section s (m²) dont les faces sont aux profondeurs zHaut et zBas (m). */
export const resultantePression = (rhoFluide: number, section: number, zHaut: number, zBas: number) =>
  (pression(rhoFluide, zBas) - pression(rhoFluide, zHaut)) * section;

export interface Montage {
  /** Section du cylindre (m²). */
  s: number;
  /** Section intérieure de l'éprouvette (m²). */
  S: number;
  /** Hauteur du cylindre (m). */
  h: number;
  /** Masse volumique du liquide (kg/m³). */
  rhoFluide: number;
  /** Raideur du ressort du dynamomètre (N/m). */
  raideur: number;
}

/** Montée du niveau (m) dans l'éprouvette quand le cylindre est immergé sur une hauteur x (m) : s.x = S.montée. */
export const monteeNiveau = (x: number, { s, S }: Pick<Montage, 's' | 'S'>) => (s * x) / S;

/**
 * Descente du point de suspension (m), comptée depuis l'affleurement, nécessaire pour immerger le cylindre sur une hauteur x.
 * Le niveau monte à la rencontre du solide (s.x/S) et le ressort, soulagé de la poussée, se raccourcit de PA/raideur.
 */
export const descentePour = (x: number, { s, S, rhoFluide, raideur }: Montage) =>
  x * (1 - s / S + (rhoFluide * G * s) / raideur);

/** Hauteur immergée (m) pour une descente donnée du point de suspension, bornée par xMax (hauteur du solide, ou hauteur immergée à la flottaison). */
export function hauteurImmergee(descente: number, m: Montage, xMax = m.h): number {
  const x = descente / descentePour(1, m);
  return Math.min(xMax, Math.max(0, x));
}
