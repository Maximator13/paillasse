// Pile Daniell (cuivre-zinc) débitant dans un conducteur ohmique. Fonctions pures, sans dépendance.
// Réaction de fonctionnement : Zn (s) + Cu2+ (aq) -> Zn2+ (aq) + Cu (s), 2 électrons échangés.
// Modèle de Terminale : tension à vide constante pendant le débit (pas de loi de Nernst),
// lame de zinc en excès, les ions Cu2+ sont le réactif limitant.

/** Constante de Faraday (C/mol). */
export const F = 96485;
/** Masses molaires (g/mol). */
export const M_ZN = 65.4;
export const M_CU = 63.5;
/** Tension à vide de la pile Daniell (V). */
export const E_VIDE = 1.1;

export interface Pile {
  /** Tension à vide (V). */
  e: number;
  /** Résistance interne (ohm). */
  r: number;
  /** Résistance du conducteur ohmique branché aux bornes (ohm). Infinity : circuit ouvert. */
  R: number;
  /** Concentration initiale en ions Cu2+ (mol/L). */
  c: number;
  /** Volume de la solution de sulfate de cuivre (L). */
  v: number;
}

/** Intensité débitée tant que la pile n'est pas usée (A) : loi de Pouillet, I = E / (R + r). */
export const intensite = ({ e, r, R }: Pile) => e / (R + r);

/** Tension aux bornes en fonctionnement (V) : U = E - r.I (égale à R.I). */
export const tension = (pile: Pile) => pile.e - pile.r * intensite(pile);

/** Capacité (C) : charge maximale, atteinte quand tous les ions Cu2+ ont été réduits. */
export const capacite = ({ c, v }: Pile) => 2 * c * v * F;

/** Durée de fonctionnement avant usure (s). */
export const dureeVie = (pile: Pile) => capacite(pile) / intensite(pile);

/** Charge débitée après t secondes (C) : Q = I.t, plafonnée par la capacité. */
export const charge = (t: number, pile: Pile) => Math.min(intensite(pile) * Math.max(0, t), capacite(pile));

/** Quantité d'électrons échangés (mol) : n = Q / F. */
export const quantiteElectrons = (q: number) => q / F;

/** Masse de zinc consommé (g) : n(Zn) = n(e-) / 2. */
export const masseZinc = (q: number) => (q / (2 * F)) * M_ZN;

/** Masse de cuivre déposé (g) : n(Cu) = n(e-) / 2. */
export const masseCuivre = (q: number) => (q / (2 * F)) * M_CU;

/** Concentration restante en ions Cu2+ (mol/L). */
export const concentrationCuivre = (q: number, { c, v }: Pile) => Math.max(0, c - q / (2 * F) / v);
