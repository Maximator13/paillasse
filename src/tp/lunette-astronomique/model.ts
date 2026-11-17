// Lunette astronomique modélisée par deux lentilles minces convergentes. Fonctions pures, sans dépendance.
// Conventions : axe optique orienté dans le sens de la lumière, hauteurs comptées vers le haut.
// Longueurs en centimètres, angles en radians. La pente d'un rayon est la tangente de son inclinaison sur l'axe.

export interface Lunette {
  /** Distance focale image de l'objectif (cm). */
  f1: number;
  /** Distance focale image de l'oculaire (cm). */
  f2: number;
}

/** Rayon lumineux repéré dans un plan de front : hauteur (cm) et pente. */
export interface Rayon {
  y: number;
  pente: number;
}

/** Propagation rectiligne sur une distance d (cm). */
export const propager = (r: Rayon, d: number): Rayon => ({ y: r.y + r.pente * d, pente: r.pente });

/**
 * Traversée d'une lentille mince de distance focale f (cm).
 * Le rayon passant par le centre optique (y = 0) n'est pas dévié, les rayons parallèles entre eux
 * se coupent dans le plan focal image.
 */
export const refracter = (r: Rayon, f: number): Rayon => ({ y: r.y, pente: r.pente - r.y / f });

/** Grossissement d'une lunette afocale : G = f'1 / f'2. */
export const grossissement = ({ f1, f2 }: Lunette) => f1 / f2;

/** Distance O1O2 entre les deux lentilles quand la lunette est afocale (cm). */
export const longueur = ({ f1, f2 }: Lunette) => f1 + f2;

/** Hauteur algébrique (cm) de B1, image intermédiaire d'un point à l'infini vu sous l'angle theta au-dessus de l'axe. */
export const imageIntermediaire = (theta: number, { f1 }: Lunette) => -f1 * Math.tan(theta);

export interface Marche {
  /** Rayon juste après l'objectif. */
  apresObjectif: Rayon;
  /** Rayon juste après l'oculaire. */
  apresOculaire: Rayon;
}

/**
 * Marche d'un rayon issu d'un point à l'infini situé à l'angle theta au-dessus de l'axe,
 * qui frappe l'objectif à la hauteur h. e : distance O1O2 (par défaut, réglage afocal).
 */
export function marche(h: number, theta: number, l: Lunette, e = longueur(l)): Marche {
  const apresObjectif = refracter({ y: h, pente: -Math.tan(theta) }, l.f1);
  return { apresObjectif, apresOculaire: refracter(propager(apresObjectif, e), l.f2) };
}

/** Angle theta' (rad) sous lequel l'image finale est vue à travers la lunette afocale. */
export const angleEmergent = (theta: number, l: Lunette) => Math.atan(marche(0, theta, l).apresOculaire.pente) + 0; // + 0 : pas de zéro négatif

/** Distance (cm) entre l'oculaire et le cercle oculaire, image de l'objectif par l'oculaire : c'est là que se place l'œil. */
export const cercleOculaire = ({ f1, f2 }: Lunette) => (f2 * (f1 + f2)) / f1;

/** Points (theta, theta') en degrés, de 0 à thetaMax (degrés). */
export function caracteristique(l: Lunette, thetaMax: number, n = 40): [number, number][] {
  const deg = Math.PI / 180;
  return Array.from({ length: n + 1 }, (_, i) => {
    const th = (thetaMax * i) / n;
    return [th, angleEmergent(th * deg, l) / deg] as [number, number];
  });
}
