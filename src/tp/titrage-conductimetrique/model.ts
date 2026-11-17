// Titrage conductimétrique des ions chlorure (sérum physiologique) par le nitrate d'argent.
// Réaction support : Ag+(aq) + Cl-(aq) -> AgCl(s), totale (Ks = 1,8e-10 : la solubilité du précipité est négligée).
// Fonctions pures, sans dépendance.

/** Conductivités molaires ioniques à 25 °C, en S·m²/mol. */
export const LAMBDA = { Na: 5.01e-3, Cl: 7.63e-3, Ag: 6.19e-3, NO3: 7.14e-3 } as const;
export type Ion = keyof typeof LAMBDA;
export const IONS = Object.keys(LAMBDA) as Ion[];

/** Masse molaire du chlorure de sodium (g/mol). */
export const M_NACL = 58.44;

export interface Titrage {
  /** Concentration en ions chlorure de la solution titrée (mol/L). */
  c0: number;
  /** Volume de la prise d'essai (mL). */
  v0: number;
  /** Volume d'eau distillée ajouté (mL). */
  eau: number;
  /** Concentration du nitrate d'argent (mol/L). */
  c1: number;
}

/** Volume de nitrate d'argent versé à l'équivalence (mL) : c0.v0 = c1.vE. */
export const volumeEquivalent = ({ c0, v0, c1 }: Titrage) => (c0 * v0) / c1;

/** Quantités de matière (mmol) dans le bécher après ajout de v mL de solution titrante. */
export function quantites(v: number, { c0, v0, c1 }: Titrage) {
  const n0 = c0 * v0, n1 = c1 * v;
  return { Na: n0, Cl: Math.max(0, n0 - n1), Ag: Math.max(0, n1 - n0), NO3: n1, AgCl: Math.min(n0, n1) };
}

/** Contribution de chaque ion à la conductivité (S/m) : lambda_i.[X_i], avec [X_i] en mol/m³. */
export function contributions(v: number, tit: Titrage): Record<Ion, number> {
  const n = quantites(v, tit), vTot = tit.v0 + tit.eau + v;
  // mmol/mL = mol/L = 1000 mol/m³
  const part = (i: Ion) => (LAMBDA[i] * 1000 * n[i]) / vTot;
  return { Na: part('Na'), Cl: part('Cl'), Ag: part('Ag'), NO3: part('NO3') };
}

/** Conductivité de la solution (S/m), loi de Kohlrausch : somme des lambda_i.[X_i]. */
export function conductivite(v: number, tit: Titrage): number {
  const c = contributions(v, tit);
  return c.Na + c.Cl + c.Ag + c.NO3;
}

/** Relevé (v, sigma) de 0 à vMax, un point tous les `pas` mL. */
export function releve(tit: Titrage, vMax: number, pas = 1): [number, number][] {
  return Array.from({ length: Math.round(vMax / pas) + 1 }, (_, i) => [i * pas, conductivite(i * pas, tit)] as [number, number]);
}

export interface Droite {
  pente: number;
  ordonnee: number;
}

/** Droite des moindres carrés passant au plus près des points. */
export function regression(pts: [number, number][]): Droite {
  const n = pts.length;
  const mx = pts.reduce((s, [x]) => s + x, 0) / n, my = pts.reduce((s, [, y]) => s + y, 0) / n;
  const sxy = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0), sxx = pts.reduce((s, [x]) => s + (x - mx) ** 2, 0);
  const pente = sxy / sxx;
  return { pente, ordonnee: my - pente * mx };
}

const residus = (pts: [number, number][], d: Droite) => pts.reduce((s, [x, y]) => s + (y - d.pente * x - d.ordonnee) ** 2, 0);

/**
 * Modélise un relevé par deux portions de droite : on essaie toutes les coupures (au moins 3 points de chaque côté)
 * et on garde celle qui laisse les plus petits résidus. vE est l'abscisse de l'intersection des deux droites.
 */
export function deuxDroites(pts: [number, number][]): { avant: Droite; apres: Droite; vE: number } {
  let meilleur = { avant: regression(pts), apres: regression(pts), vE: NaN }, min = Infinity;
  for (let k = 3; k <= pts.length - 3; k++) {
    const avant = regression(pts.slice(0, k)), apres = regression(pts.slice(k));
    const r = residus(pts.slice(0, k), avant) + residus(pts.slice(k), apres);
    if (r < min) {
      min = r;
      meilleur = { avant, apres, vE: (apres.ordonnee - avant.ordonnee) / (avant.pente - apres.pente) };
    }
  }
  return meilleur;
}
