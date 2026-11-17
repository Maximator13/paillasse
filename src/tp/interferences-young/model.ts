// Interférences lumineuses avec les fentes d'Young. Fonctions pures, sans dépendance.
// Unités d'usage au lycée : lambda en nm, b en mm, D en m, positions sur l'écran et interfrange en mm.

export interface Young {
  /** Longueur d'onde du laser (nm). */
  lambda: number;
  /** Distance entre les deux fentes (mm). */
  b: number;
  /** Distance entre le plan des fentes et l'écran (m). */
  D: number;
}

/** Interfrange i = lambda.D / b (mm). */
export const interfrange = ({ lambda, b, D }: Young) => ((lambda * D) / b) * 1e-3;

/** Différence de marche delta = b.x / D (nm) au point d'abscisse x (mm), valable pour x et b très petits devant D. */
export const differenceMarche = (x: number, { b, D }: Young) => ((b * x) / D) * 1e3;

/** Différence de marche exacte S2M - S1M (nm), sans approximation. Sert à contrôler la formule précédente. */
export function differenceMarcheExacte(x: number, { b, D }: Young): number {
  const d = D * 1e3; // mm
  const r1 = Math.hypot(d, x - b / 2), r2 = Math.hypot(d, x + b / 2);
  return ((2 * x * b) / (r1 + r2)) * 1e6; // r2 - r1 = (r2² - r1²) / (r2 + r1)
}

/** Ordre d'interférence p = delta / lambda (sans unité). */
export const ordre = (x: number, y: Young) => differenceMarche(x, y) / y.lambda;

/** Intensité relative I / Imax = cos²(pi.delta / lambda), pour deux fentes fines identiques. */
export const intensite = (x: number, y: Young) => Math.cos(Math.PI * ordre(x, y)) ** 2;

/** Nature de l'interférence pour une différence de marche delta (même unité que lambda). */
export function nature(delta: number, lambda: number, tolerance = 0.02): 'constructive' | 'destructive' | 'quelconque' {
  const p = Math.abs(delta / lambda), ecart = p - Math.floor(p);
  if (ecart < tolerance || ecart > 1 - tolerance) return 'constructive';
  return Math.abs(ecart - 0.5) < tolerance ? 'destructive' : 'quelconque';
}

/** Abscisse (mm) de la frange brillante d'ordre k : x = k.i. */
export const frangeBrillante = (k: number, y: Young) => k * interfrange(y);
/** Abscisse (mm) de la frange sombre située entre les ordres k et k + 1 : x = (k + 1/2).i. */
export const frangeSombre = (k: number, y: Young) => (k + 0.5) * interfrange(y);

/** Longueur d'onde (nm) déduite de l'interfrange mesuré i (mm) : lambda = i.b / D. */
export const longueurOnde = (i: number, b: number, D: number) => ((i * b) / D) * 1e3;

/** Points (x, I / Imax) de -xMax à +xMax (mm). */
export function courbe(y: Young, xMax: number, n = 400): [number, number][] {
  return Array.from({ length: n + 1 }, (_, j) => {
    const x = -xMax + (2 * xMax * j) / n;
    return [x, intensite(x, y)] as [number, number];
  });
}

/** Couleur approchée d'une radiation visible : composantes rouge, verte, bleue de 0 à 255. Noir hors de 380 à 780 nm. */
export function couleur(lambda: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (lambda >= 380 && lambda < 440) { r = (440 - lambda) / 60; b = 1; }
  else if (lambda >= 440 && lambda < 490) { g = (lambda - 440) / 50; b = 1; }
  else if (lambda >= 490 && lambda < 510) { g = 1; b = (510 - lambda) / 20; }
  else if (lambda >= 510 && lambda < 580) { r = (lambda - 510) / 70; g = 1; }
  else if (lambda >= 580 && lambda < 645) { r = 1; g = (645 - lambda) / 65; }
  else if (lambda >= 645 && lambda <= 780) r = 1;
  // L'œil est moins sensible aux extrémités du spectre.
  const s = lambda < 380 || lambda > 780 ? 0 : lambda < 420 ? 0.3 + (0.7 * (lambda - 380)) / 40 : lambda > 700 ? 0.3 + (0.7 * (780 - lambda)) / 80 : 1;
  return [r, g, b].map((c) => Math.round(255 * (c * s) ** 0.8)) as [number, number, number];
}
