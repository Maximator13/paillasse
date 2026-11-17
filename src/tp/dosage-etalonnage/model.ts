// Dosage par étalonnage spectrophotométrique du bleu patenté V (colorant E131). Fonctions pures, sans dépendance.

/** Longueur d'onde du maximum d'absorption du bleu patenté V (nm). */
export const LAMBDA_MAX = 640;
/** Coefficient d'absorption molaire à 640 nm (L/mol/cm). */
export const EPSILON_MAX = 1.06e5;
/** Écart type de la bande d'absorption (nm), soit une largeur à mi-hauteur d'environ 60 nm. */
const SIGMA = 25;

/**
 * Coefficient d'absorption molaire (L/mol/cm) à la longueur d'onde lambda (nm).
 * Modèle simplifié : la bande d'absorption est assimilée à une gaussienne centrée sur 640 nm.
 */
export const epsilon = (lambda: number) => EPSILON_MAX * Math.exp(-0.5 * ((lambda - LAMBDA_MAX) / SIGMA) ** 2);

/** Loi de Beer-Lambert : A = epsilon.l.c, avec c en mol/L, l en cm, eps en L/mol/cm. */
export const absorbance = (c: number, eps: number, l: number) => eps * l * c;

/** Fraction de la lumière incidente qui ressort de la cuve : I/I0 = 10^(-A). */
export const transmittance = (a: number) => 10 ** -a;

/** Concentration de la solution fille : cMere.vPreleve = cFille.vFiole (volumes dans la même unité). */
export const dilution = (cMere: number, vPreleve: number, vFiole: number) => (cMere * vPreleve) / vFiole;

/** Concentrations nominales de la gamme étalon (mol/L). */
export const GAMME = [2e-6, 4e-6, 6e-6, 8e-6, 10e-6];

/**
 * Écarts relatifs de préparation des étalons (lecture des volumes, verrerie) : quelques pour cent, comme en TP.
 * La somme des c².écart est nulle : les points sont dispersés, mais la pente ajustée reste epsilon.l.
 */
export const ECARTS = [0.05, -0.04, 0.03, -0.025, 0.0096];

/** Points (C nominale, A mesurée) de la gamme étalon, pour une cuve d'épaisseur l (cm) à la longueur d'onde lambda (nm). */
export const gamme = (l: number, lambda = LAMBDA_MAX): [number, number][] =>
  GAMME.map((c, i) => [c, absorbance(c * (1 + ECARTS[i]), epsilon(lambda), l)]);

/** Pente k de la droite A = k.C passant par l'origine, ajustée par les moindres carrés sur les points (C, A). */
export function pente(points: [number, number][]): number {
  let sxy = 0, sxx = 0;
  for (const [x, y] of points) {
    sxy += x * y;
    sxx += x * x;
  }
  return sxy / sxx;
}

/** Concentration lue sur la droite d'étalonnage : C = A / k. */
export const concentration = (a: number, k: number) => a / k;
