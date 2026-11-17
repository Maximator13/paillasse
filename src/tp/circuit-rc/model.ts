// Circuit RC série : charge puis décharge d'un condensateur. Fonctions pures, sans dépendance. Unités SI.

export interface CircuitRC {
  /** Tension aux bornes du générateur idéal (V). */
  e: number;
  /** Résistance du conducteur ohmique (ohm). */
  r: number;
  /** Capacité du condensateur (F). */
  c: number;
}

/** Temps caractéristique tau = R.C (s). */
export const tau = ({ r, c }: CircuitRC) => r * c;

/** Charge : solution de R.C.duC/dt + uC = E avec uC(0) = u0 (V). */
export const uCharge = (t: number, k: CircuitRC, u0 = 0) => k.e + (u0 - k.e) * Math.exp(-t / tau(k));

/** Décharge : solution de R.C.duC/dt + uC = 0 avec uC(0) = u0 (V). Par défaut, le condensateur part de E. */
export const uDecharge = (t: number, k: CircuitRC, u0 = k.e) => u0 * Math.exp(-t / tau(k));

/** Intensité pendant la charge (A), comptée positivement vers l'armature reliée au conducteur ohmique. */
export const iCharge = (t: number, k: CircuitRC, u0 = 0) => ((k.e - u0) / k.r) * Math.exp(-t / tau(k));

/** Intensité pendant la décharge (A) : négative, le courant s'inverse. */
export const iDecharge = (t: number, k: CircuitRC, u0 = k.e) => (-u0 / k.r) * Math.exp(-t / tau(k));

/** Charge portée par l'armature positive (C) : q = C.uC. */
export const charge = (uC: number, { c }: CircuitRC) => c * uC;

export interface Etat {
  uC: number;
  i: number;
  q: number;
}

/** Séquence complète : condensateur déchargé à t = 0, charge jusqu'à tBascule, puis décharge. */
export function etat(t: number, k: CircuitRC, tBascule: number): Etat {
  const tt = Math.max(0, t);
  if (tt <= tBascule) {
    const uC = uCharge(tt, k);
    return { uC, i: iCharge(tt, k), q: charge(uC, k) };
  }
  const u0 = uCharge(tBascule, k);
  const uC = uDecharge(tt - tBascule, k, u0);
  return { uC, i: iDecharge(tt - tBascule, k, u0), q: charge(uC, k) };
}

/** Points (t, uC) de 0 à tMax, resserrés sur les 5 premiers tau de chaque phase (là où la courbe tourne). */
export function courbe(k: CircuitRC, tBascule: number, tMax: number, n = 400): [number, number][] {
  const dates = Array.from({ length: n + 1 }, (_, j) => (tMax * j) / n);
  for (const t0 of [0, tBascule]) for (let j = 1; j <= 50; j++) dates.push(t0 + (tau(k) * j) / 10);
  return dates
    .filter((t) => t <= tMax)
    .sort((a, b) => a - b)
    .map((t) => [t, etat(t, k, tBascule).uC] as [number, number]);
}
