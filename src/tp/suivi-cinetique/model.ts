// Décoloration du bleu de méthylène (ion BM+, bleu) par l'acide ascorbique (vitamine C) :
//   BM+ (aq) + C6H8O6 (aq) -> BMH2+ (aq, incolore) + C6H6O6 (aq)
// L'acide ascorbique est en large excès : v = k.[BM+], loi de vitesse d'ordre 1.
// Les ions H3O+ de l'acide chlorhydrique catalysent la transformation : un second chemin réactionnel, de barrière
// plus basse, s'ajoute au premier. k = k0(T) + kc(T).[H3O+], chaque terme suivant la loi d'Arrhenius.
// Fonctions pures, sans dépendance. Valeurs : ordres de grandeur d'un TP de lycée (décoloration en quelques minutes).

/** Constante des gaz parfaits (J/(mol.K)). */
export const R = 8.314;
/** Coefficient d'absorption molaire du bleu de méthylène à 665 nm (L/(mol.cm)). */
export const EPSILON = 7.4e4;
/** Largeur de la cuve (cm). */
export const LARGEUR_CUVE = 1.0;
/** Température de référence (K) : 25 °C. */
export const T_REF = 298.15;
/** Chemin non catalysé à 25 °C : constante apparente (1/s), acide ascorbique en large excès. */
export const K0_REF = 5.0e-3;
/** Chemin catalysé par les ions H3O+ à 25 °C (L/(mol.s)). */
export const KC_REF = 0.10;
/** Énergies d'activation (J/mol) : le chemin catalysé franchit une barrière plus basse. */
export const EA0 = 50e3;
export const EAC = 40e3;

export const kelvin = (theta: number) => theta + 273.15;

/** Loi d'Arrhenius : constante à la température t (K), connaissant kRef à T_REF et l'énergie d'activation ea. */
export const arrhenius = (kRef: number, ea: number, t: number) =>
  kRef * Math.exp((-ea / R) * (1 / t - 1 / T_REF));

/** Constante de vitesse k = k0 + kc.[H3O+] (1/s). theta en °C, cCat = [H3O+] en mol/L. */
export const constanteVitesse = (theta: number, cCat: number) =>
  arrhenius(K0_REF, EA0, kelvin(theta)) + arrhenius(KC_REF, EAC, kelvin(theta)) * cCat;

/** Loi d'ordre 1 : [BM+](t) = c0.exp(-k.t). */
export const concentration = (t: number, c0: number, k: number) => c0 * Math.exp(-k * t);

/** Loi de Beer-Lambert : A = epsilon.l.c (c en mol/L). */
export const absorbance = (c: number) => EPSILON * LARGEUR_CUVE * c;

/** Fraction de la lumière incidente qui ressort de la cuve : 10^(-A). */
export const transmission = (a: number) => 10 ** -a;

/** Temps de demi-réaction d'une loi d'ordre 1 (s) : indépendant de la concentration initiale. */
export const demiReaction = (k: number) => Math.LN2 / k;

/** Relevés (t, A) toutes les dt secondes, de 0 à tMax. c0 en mol/L. */
export function releves(c0: number, k: number, tMax: number, dt: number): [number, number][] {
  return Array.from({ length: Math.floor(tMax / dt + 1e-9) + 1 }, (_, i) =>
    [i * dt, absorbance(concentration(i * dt, c0, k))] as [number, number]);
}

/** Droite des moindres carrés y = pente.x + ordonnee. */
export function regression(pts: [number, number][]) {
  const n = pts.length;
  const mx = pts.reduce((s, [x]) => s + x, 0) / n, my = pts.reduce((s, [, y]) => s + y, 0) / n;
  const sxy = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0);
  const sxx = pts.reduce((s, [x]) => s + (x - mx) ** 2, 0);
  const pente = sxy / sxx;
  return { pente, ordonnee: my - pente * mx };
}
