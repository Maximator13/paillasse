// Diffraction d'un faisceau laser par une fente fine, dans l'approximation des petits angles.
// Fonctions pures, sans dépendance. Unités SI (mètres, radians) sauf mention contraire.

/** Angle caractéristique de diffraction (rad) : theta = lambda / a. */
export const angle = (lambda: number, a: number) => lambda / a;

/** Largeur de la tache centrale (m) sur un écran placé à la distance D de la fente : L = 2.lambda.D / a. */
export const largeurTache = (lambda: number, a: number, D: number) => (2 * lambda * D) / a;

/** Intensité relative I/I0 au point d'abscisse x de l'écran : sinus cardinal au carré. */
export function intensite(x: number, lambda: number, a: number, D: number): number {
  const u = (Math.PI * a * x) / (lambda * D);
  return Math.abs(u) < 1e-9 ? 1 : (Math.sin(u) / u) ** 2;
}

/**
 * Série de mesures : pour chaque largeur de fente a, le point (1/a, L).
 * L est lue à la règle : elle est arrondie à la résolution de lecture (1 mm par défaut).
 */
export const serie = (lambda: number, D: number, fentes: number[], resolution = 1e-3): [number, number][] =>
  fentes.map((a) => [1 / a, Math.round(largeurTache(lambda, a, D) / resolution) * resolution]);

/** Pente de la droite passant par l'origine ajustée aux points (x, y) par les moindres carrés. */
export function pente(pts: [number, number][]): number {
  let sxy = 0, sxx = 0;
  for (const [x, y] of pts) {
    sxy += x * y;
    sxx += x * x;
  }
  return sxy / sxx;
}

/** Longueur d'onde (m) déduite de la pente (m²) de la droite L = f(1/a) : pente = 2.lambda.D. */
export const longueurOnde = (pente: number, D: number) => pente / (2 * D);

/** Couleur perçue d'une radiation monochromatique : longueur d'onde en nm (380 à 780) vers [R, V, B] entre 0 et 255. */
export function couleurLaser(nm: number): [number, number, number] {
  let r = 0, v = 0, b = 0;
  if (nm < 440) [r, b] = [(440 - nm) / 60, 1];
  else if (nm < 490) [v, b] = [(nm - 440) / 50, 1];
  else if (nm < 510) [v, b] = [1, (510 - nm) / 20];
  else if (nm < 580) [r, v] = [(nm - 510) / 70, 1];
  else if (nm < 645) [r, v] = [1, (645 - nm) / 65];
  else r = 1;
  // L'œil est moins sensible aux extrémités du spectre visible.
  const f = nm < 420 ? 0.3 + (0.7 * (nm - 380)) / 40 : nm > 700 ? 0.3 + (0.7 * (780 - nm)) / 80 : 1;
  const canal = (c: number) => Math.round(255 * Math.max(0, c * f) ** 0.8);
  return [canal(r), canal(v), canal(b)];
}
