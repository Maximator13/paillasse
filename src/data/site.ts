export const SITE = {
  nom: 'Paillasse',
  slogan: 'La physique-chimie qui se regarde',
  description:
    'Cours de physique-chimie et travaux pratiques animés : chaque TP se déroule sous vos yeux, étape par étape, avec des paramètres à régler pour voir le phénomène changer.',
};

export const THEMES = {
  matiere: { label: 'Constitution et transformations de la matière', court: 'Matière', matiere: 'Chimie' },
  mouvement: { label: 'Mouvement et interactions', court: 'Mouvement', matiere: 'Physique' },
  energie: { label: "L'énergie : conversions et transferts", court: 'Énergie', matiere: 'Physique' },
  ondes: { label: 'Ondes et signaux', court: 'Ondes', matiere: 'Physique' },
} as const;
export type Theme = keyof typeof THEMES;
export const ORDRE_THEMES = Object.keys(THEMES) as Theme[];

export const CYCLES = [
  { id: 'college', titre: 'Collège', classes: '5e, 4e, 3e', url: '/college/', dispo: false, resume: 'Les premières expériences : états de la matière, circuits, lumière, vitesse.' },
  { id: 'terminale', titre: 'Lycée', classes: 'Terminale spécialité', url: '/terminale/', dispo: true, resume: 'Tout le programme de spécialité : titrages, cinétique, mécanique de Newton, ondes, circuit RC.' },
  { id: 'prepa', titre: 'Prépa', classes: 'MPSI, PCSI', url: '/prepa/', dispo: false, resume: 'Mécanique du point, thermodynamique, optique, cinétique et équilibres chimiques.' },
] as const;

/** Slug d'une entrée de collection : "terminale/titrages" -> "titrages". */
export const slugDe = (id: string) => id.split('/').pop()!;

/**
 * Informations légales que seul le propriétaire du site connaît, reprises dans les pages
 * Mentions légales, Confidentialité et CGU. Toute valeur entre crochets est provisoire :
 * la remplacer avant la mise en ligne (rechercher « À COMPLÉTER »).
 */
export const LEGAL = {
  editeur: {
    nom: "[À COMPLÉTER : nom de l'éditeur]",
    statut: "[À COMPLÉTER : statut de l'éditeur (particulier, association, société) et numéro d'immatriculation éventuel]",
    adresse: "[À COMPLÉTER : adresse postale de l'éditeur]",
    courriel: '[À COMPLÉTER : adresse électronique de contact]',
    telephone: "[À COMPLÉTER : numéro de téléphone de l'éditeur]",
  },
  directeurPublication: '[À COMPLÉTER : nom du directeur de la publication]',
  hebergeur: {
    nom: "[À COMPLÉTER : nom de l'hébergeur]",
    adresse: "[À COMPLÉTER : adresse de l'hébergeur]",
    telephone: "[À COMPLÉTER : numéro de téléphone de l'hébergeur]",
  },
  /** Date de dernière mise à jour des textes légaux, à actualiser à chaque modification. */
  miseAJour: '12 novembre 2026',
} as const;
