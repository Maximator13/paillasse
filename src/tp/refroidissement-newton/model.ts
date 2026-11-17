// Refroidissement d'un système incompressible au contact d'un thermostat (loi phénoménologique de Newton).
// Fonctions pures, sans dépendance. Temps en secondes, températures en °C (seuls des écarts interviennent).

export interface Systeme {
  /** Masse du système (kg). */
  m: number;
  /** Capacité thermique massique (J/(kg.K)). */
  c: number;
  /** Coefficient d'échange conducto-convectif (W/(m².K)). */
  h: number;
  /** Surface d'échange avec le thermostat (m²). */
  s: number;
  /** Température du thermostat (°C). */
  tExt: number;
  /** Température initiale du système (°C). */
  t0: number;
}

/** Capacité thermique massique de l'eau liquide (J/(kg.K)). */
export const C_EAU = 4180;

/** Temps caractéristique tau = m.c/(h.S) (s). */
export const tempsCaracteristique = ({ m, c, h, s }: Systeme) => (m * c) / (h * s);

/** Flux thermique reçu par le système à la température temp (W) : Phi = h.S.(Text - T). Négatif si le système est plus chaud que le thermostat. */
export const flux = (temp: number, { h, s, tExt }: Systeme) => h * s * (tExt - temp);

/** Premier principe : m.c.dT/dt = Phi. Renvoie dT/dt (°C/s). */
export const pente = (temp: number, sys: Systeme) => flux(temp, sys) / (sys.m * sys.c);

/** Solution de l'équation différentielle : T(t) = Text + (T0 - Text).exp(-t/tau). */
export const temperature = (t: number, sys: Systeme) =>
  sys.tExt + (sys.t0 - sys.tExt) * Math.exp(-t / tempsCaracteristique(sys));

/** Résolution numérique par la méthode d'Euler : température après la durée donnée, pas dt (s). */
export function euler(sys: Systeme, duree: number, dt = 1): number {
  let temp = sys.t0;
  for (let t = 0; t < duree - 1e-9; t += dt) temp += pente(temp, sys) * dt;
  return temp;
}

/** Points (t, T) de 0 à duree (s). */
export function courbe(sys: Systeme, duree: number, n = 180): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (duree * i) / n;
    return [t, temperature(t, sys)] as [number, number];
  });
}
