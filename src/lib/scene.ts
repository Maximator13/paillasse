import type { ConfigGraphique, Graphique } from './graphique';

/** Curseur réglable par l'élève. */
export interface Parametre {
  id: string;
  label: string;
  min: number;
  max: number;
  pas: number;
  valeur: number;
  unite?: string;
  decimales?: number;
}

/** Étape guidée du protocole. duree en secondes. texte : phrase(s) courtes, balises <strong>, <em>, <sub>, <sup> admises. */
export interface Etape {
  titre: string;
  texte: string;
  duree: number;
}

/** Instant à dessiner. etape : index (0 = première). t : progression dans l'étape (0..1). T : horloge d'ambiance en secondes (boucles : agitation, bulles). p : valeurs des paramètres. */
export interface Image {
  etape: number;
  t: number;
  T: number;
  p: Record<string, number>;
}

/** Valeur affichée dans le bandeau de mesures sous la scène. */
export interface Mesure {
  label: string;
  valeur: string;
}

export interface Contexte {
  /** SVG de la paillasse, viewBox 0 0 640 480, fond sombre fourni par le lecteur. */
  scene: SVGSVGElement;
  /** Graphique partagé, présent si la scène déclare `graphique`. */
  graphique: Graphique | null;
}

export interface Scene {
  etapes: Etape[];
  parametres?: Parametre[];
  graphique?: ConfigGraphique;
  /** Image fixe utilisée pour les vignettes. Par défaut : fin de la dernière étape. */
  affiche?: { etape: number; t: number };
  /**
   * Construit le DOM une seule fois, puis renvoie la fonction de dessin.
   * Le dessin doit être une fonction PURE de l'image : même image, même rendu,
   * quel que soit l'ordre des appels (le lecteur saute librement d'une étape à l'autre).
   */
  monter(ctx: Contexte): (img: Image) => Mesure[] | void;
}

export const definirScene = (s: Scene) => s;
