// Effet photoélectrique, interprétation d'Einstein : un photon d'énergie h.nu arrache un électron si h.nu > W.
// Fonctions pures, sans dépendance. Fréquences en Hz, travail d'extraction et énergies cinétiques en eV.

/** Constante de Planck (J.s). */
export const H = 6.626e-34;
/** Célérité de la lumière dans le vide (m/s). */
export const C_LUM = 2.998e8;
/** Charge élémentaire (C), soit aussi la valeur de 1 eV en joules. */
export const E = 1.602e-19;
/** Masse de l'électron (kg). */
export const M_E = 9.109e-31;

/** Travaux d'extraction usuels (eV), arrondis au dixième. */
export const METAUX = [
  { nom: 'césium', w: 2.1 },
  { nom: 'potassium', w: 2.3 },
  { nom: 'sodium', w: 2.4 },
  { nom: 'calcium', w: 2.9 },
  { nom: 'magnésium', w: 3.7 },
  { nom: 'zinc', w: 4.3 },
];

/** Métal dont le travail d'extraction vaut w (à 0,05 eV près), sinon null. */
export const metal = (w: number) => METAUX.find((m) => Math.abs(m.w - w) < 0.05)?.nom ?? null;

/** Énergie d'un photon de fréquence nu, en eV : E = h.nu. */
export const energiePhoton = (nu: number) => (H * nu) / E;

/** Longueur d'onde dans le vide (m) : lambda = c / nu. */
export const longueurOnde = (nu: number) => C_LUM / nu;

/** Fréquence seuil (Hz) d'un métal de travail d'extraction w (eV) : nu0 = W / h. */
export const frequenceSeuil = (w: number) => (w * E) / H;

/** Énergie cinétique maximale des électrons émis (eV) : Ec = h.nu - W, nulle sous le seuil. */
export const ecMax = (nu: number, w: number) => Math.max(0, energiePhoton(nu) - w);

/** Vitesse maximale des électrons émis (m/s), cas non relativiste : Ec = m.v² / 2. */
export const vitesseMax = (nu: number, w: number) => Math.sqrt((2 * ecMax(nu, w) * E) / M_E);

/**
 * Courant photoélectrique (A) pour un débit de photons donné (photons par seconde).
 * Modèle simplifié : au-dessus du seuil, une fraction constante des photons (rendement quantique) arrache un électron.
 */
export const courant = (debitPhotons: number, nu: number, w: number, rendement = 1e-3) =>
  ecMax(nu, w) > 0 ? rendement * debitPhotons * E : 0;

/**
 * Exploitation de la droite Ec max = h.nu - W par régression linéaire sur des points (nu en Hz, Ec en eV).
 * Renvoie h (J.s), la fréquence seuil nu0 (Hz) et le travail d'extraction W (eV).
 */
export function droite(pts: [number, number][]) {
  const n = pts.length;
  const mx = pts.reduce((s, [x]) => s + x, 0) / n, my = pts.reduce((s, [, y]) => s + y, 0) / n;
  const pente = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0) / pts.reduce((s, [x]) => s + (x - mx) ** 2, 0);
  const w = pente * mx - my;
  return { h: pente * E, nu0: w / pente, w };
}
