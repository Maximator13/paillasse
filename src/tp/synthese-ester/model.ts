// Estérification : acide + alcool = ester + eau. Transformation lente et limitée. Fonctions pures, sans dépendance.

/** Constante d'équilibre de l'estérification d'un alcool primaire (sans unité). */
export const K_ESTER = 4;

/** Masse molaire (g/mol) et masse volumique (g/mL) des espèces du TP. */
export const ALCOOL = { M: 88.15, rho: 0.81 }; // 3-méthylbutan-1-ol
export const ACIDE = { M: 60.05, rho: 1.049 }; // acide éthanoïque
export const ESTER = { M: 130.19, rho: 0.876 }; // éthanoate de 3-méthylbutyle

/** Volume (mL) d'une quantité n (mol) de liquide pur. */
export const volume = (n: number, e: { M: number; rho: number }) => (n * e.M) / e.rho;

export interface Melange {
  /** Quantités initiales (mol). */
  nAcide: number;
  nAlcool: number;
  /** Constante d'équilibre. */
  K: number;
}

/** Avancement maximal (mol) : celui d'une transformation totale. */
export const avancementMax = ({ nAcide, nAlcool }: Melange) => Math.min(nAcide, nAlcool);

/** Avancement à l'équilibre (mol) : racine physique de K = x² / ((nAcide - x)(nAlcool - x)). */
export function avancementEquilibre({ nAcide, nAlcool, K }: Melange): number {
  const a = 1 - 1 / K, s = nAcide + nAlcool, p = nAcide * nAlcool;
  // Forme stable de la racine de a.x² - s.x + p = 0, valable aussi pour K = 1.
  return (2 * p) / (s + Math.sqrt(s * s - 4 * a * p));
}

/** Rendement à l'équilibre (0 à 1). */
export const rendementEquilibre = (m: Melange) => avancementEquilibre(m) / avancementMax(m);

/** Quotient de réaction pour un avancement x (l'eau n'est pas le solvant : elle compte). */
export const quotient = (x: number, { nAcide, nAlcool }: Melange) => (x * x) / ((nAcide - x) * (nAlcool - x));

/**
 * Constante de vitesse k (mol⁻¹·min⁻¹) du modèle, volume du mélange supposé constant.
 * Loi d'Arrhenius (Ea = 50 kJ/mol) et catalyse proportionnelle à la quantité d'acide sulfurique.
 * Référence : 0,50 mol⁻¹·min⁻¹ à 120 °C avec 5 gouttes. Sans catalyseur, il reste une voie cent fois plus lente.
 */
export function constanteVitesse(thetaC: number, gouttes: number): number {
  const EA = 50e3, R = 8.314, T_REF = 393.15, K_REF = 0.5, G_REF = 5, G0 = 0.05;
  const arrhenius = Math.exp((-EA / R) * (1 / (thetaC + 273.15) - 1 / T_REF));
  return (K_REF * arrhenius * (gouttes + G0)) / (G_REF + G0);
}

/** Vitesse d'évolution dx/dt (mol/min) : sens direct moins sens inverse. Nulle à l'équilibre. */
export const vitesse = (x: number, { nAcide, nAlcool, K }: Melange, k: number) =>
  k * ((nAcide - x) * (nAlcool - x) - (x * x) / K);

/** Avancement (mol) à la date t (min) : solution exacte de dx/dt = vitesse(x), avec x(0) = 0. */
export function avancementA(t: number, m: Melange, k: number): number {
  const a = 1 - 1 / m.K, p = m.nAcide * m.nAlcool, x1 = avancementEquilibre(m);
  const e = Math.exp(k * (p / x1 - a * x1) * t);
  return Number.isFinite(e) ? (x1 * (e - 1)) / (e - (a * x1 * x1) / p) : x1;
}

/** Points (t, x) de 0 à tMax. */
export function cinetique(m: Melange, k: number, tMax: number, n = 240): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (tMax * i) / n;
    return [t, avancementA(t, m, k)] as [number, number];
  });
}
