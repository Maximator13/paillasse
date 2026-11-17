// Décroissance radioactive : loi exponentielle, demi-vie, activité, tirage aléatoire des désintégrations. Fonctions pures, sans dépendance.
// Unités : temps en secondes (ou toute autre unité, pourvu qu'elle soit la même partout), constante radioactive en s^-1, activité en becquerels.

/** Constante radioactive λ à partir de la demi-vie : λ = ln 2 / t1/2. */
export const constanteRadioactive = (demiVie: number) => Math.LN2 / demiVie;

/** Demi-vie à partir de la constante radioactive : t1/2 = ln 2 / λ. */
export const demiVie = (lambda: number) => Math.LN2 / lambda;

/** Loi de décroissance : nombre moyen de noyaux restants, N(t) = N0.exp(-λt). */
export const noyauxRestants = (n0: number, lambda: number, t: number) => n0 * Math.exp(-lambda * t);

/** Activité (Bq, désintégrations par seconde) d'un échantillon de n noyaux : A = λN. */
export const activite = (n: number, lambda: number) => lambda * n;

/**
 * Instant de désintégration d'un noyau pour un tirage uniforme u dans [0, 1[.
 * La durée de vie d'un noyau suit une loi exponentielle de paramètre λ : P(durée > t) = exp(-λt), d'où t = -ln(1 - u) / λ.
 */
export const instantDesintegration = (u: number, lambda: number) => -Math.log(1 - u) / lambda;

/** Nombre de noyaux encore intacts à la date t, connaissant l'instant de désintégration de chacun. */
export const compterRestants = (instants: number[], t: number) => instants.reduce((n, td) => n + (td > t ? 1 : 0), 0);

/** Âge d'un échantillon dont il reste n noyaux sur n0 : t = ln(n0 / n) / λ. */
export const age = (n: number, n0: number, lambda: number) => Math.log(n0 / n) / lambda;
