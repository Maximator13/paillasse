// Titrage d'un acide faible AH par une base forte (soude). Fonctions pures, sans dépendance.

export interface Titrage {
  /** Concentration de l'acide titré (mol/L). */
  ca: number;
  /** Volume de la prise d'essai (mL). */
  va: number;
  /** Concentration de la soude (mol/L). */
  cb: number;
  pKa: number;
}

const KE = 1e-14;

/** Volume de soude versé à l'équivalence (mL) : ca.va = cb.vE. */
export const volumeEquivalent = ({ ca, va, cb }: Titrage) => (ca * va) / cb;

/** pH du mélange après ajout de v mL de soude, par résolution de l'électroneutralité. */
export function pH(v: number, { ca, va, cb, pKa }: Titrage): number {
  const ka = 10 ** -pKa;
  const cA = (ca * va) / (va + v); // acide sous toutes ses formes
  const cNa = (cb * v) / (va + v);
  // [H3O+] + [Na+] = [A-] + [HO-]. Le membre de gauche moins celui de droite croît avec [H3O+] : dichotomie sur le pH.
  let bas = 0, haut = 14;
  for (let i = 0; i < 50; i++) {
    const milieu = (bas + haut) / 2, h = 10 ** -milieu;
    if (h + cNa - (cA * ka) / (ka + h) - KE / h > 0) bas = milieu;
    else haut = milieu;
  }
  return (bas + haut) / 2;
}

/** Dérivée dpH/dV (par mL), par différence centrée. */
export const derivee = (v: number, tit: Titrage, dv = 0.05) =>
  (pH(v + dv, tit) - pH(Math.max(0, v - dv), tit)) / (v + dv - Math.max(0, v - dv));

/** Points (v, pH) de 0 à vMax. */
export function courbe(tit: Titrage, vMax: number, n = 250): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const v = (vMax * i) / n;
    return [v, pH(v, tit)] as [number, number];
  });
}
