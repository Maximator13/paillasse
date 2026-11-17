// Mélanges d'un acide faible AH et de sa base conjuguée A- (apportée par le sel NaA). Fonctions pures, sans dépendance.

export interface Melange {
  /** Volume de solution d'acide AH (mL). */
  va: number;
  /** Volume de solution de base conjuguée A- (mL). */
  vb: number;
  /** Concentration commune des deux solutions mères (mol/L). */
  c: number;
  pKa: number;
}

const KE = 1e-14;

/** Constante d'acidité : Ka = 10^(-pKa). */
export const ka = (pKa: number) => 10 ** -pKa;

/** Rapport des concentrations apportées [A-]/[AH] : Vb/Va quand les deux solutions ont la même concentration. */
export const rapport = ({ va, vb }: Pick<Melange, 'va' | 'vb'>) => vb / va;

/** Relation attendue : pH = pKa + log([A-]/[AH]). */
export const pHRelation = (pKa: number, r: number) => pKa + Math.log10(r);

/** pH réel du mélange, par résolution de l'électroneutralité (sans négliger la dissociation de l'acide). */
export function pH({ va, vb, c, pKa }: Melange): number {
  const k = ka(pKa);
  const cTot = c; // AH et A- confondus : c.(va + vb)/(va + vb)
  const cNa = (c * vb) / (va + vb);
  // [H3O+] + [Na+] = [A-] + [HO-]. Le membre de gauche moins celui de droite croît avec [H3O+] : dichotomie sur le pH.
  let bas = 0, haut = 14;
  for (let i = 0; i < 50; i++) {
    const milieu = (bas + haut) / 2, h = 10 ** -milieu;
    if (h + cNa - (cTot * k) / (k + h) - KE / h > 0) bas = milieu;
    else haut = milieu;
  }
  return (bas + haut) / 2;
}

/** Fraction de la forme basique A- à un pH donné (diagramme de distribution) : 1 / (1 + 10^(pKa - pH)). */
export const fractionBase = (ph: number, pKa: number) => 1 / (1 + 10 ** (pKa - ph));

/** Droite des moindres carrés y = pente.x + ordonnee. */
export function regression(pts: [number, number][]) {
  const n = pts.length;
  const mx = pts.reduce((s, [x]) => s + x, 0) / n, my = pts.reduce((s, [, y]) => s + y, 0) / n;
  const pente = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0) / pts.reduce((s, [x]) => s + (x - mx) ** 2, 0);
  return { pente, ordonnee: my - pente * mx };
}
