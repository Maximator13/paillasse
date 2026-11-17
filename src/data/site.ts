// Textes bilingues : chaque libellé existe en français (fr) et en anglais (en), voir src/i18n.
export const SITE = {
  nom: 'Paillasse',
  slogan: { fr: 'La physique-chimie qui se regarde', en: 'Physics and chemistry you can watch' },
  description: {
    fr: 'Cours de physique-chimie et travaux pratiques animés : chaque TP se déroule sous vos yeux, étape par étape, avec des paramètres à régler pour voir le phénomène changer.',
    en: 'Physics and chemistry lessons and animated practicals: each experiment unfolds step by step before your eyes, with parameters to adjust to see the phenomenon change.',
  },
};

export const THEMES = {
  matiere: {
    fr: { label: 'Constitution et transformations de la matière', court: 'Matière', matiere: 'Chimie' },
    en: { label: 'Composition and transformations of matter', court: 'Matter', matiere: 'Chemistry' },
  },
  mouvement: {
    fr: { label: 'Mouvement et interactions', court: 'Mouvement', matiere: 'Physique' },
    en: { label: 'Motion and interactions', court: 'Motion', matiere: 'Physics' },
  },
  energie: {
    fr: { label: "L'énergie : conversions et transferts", court: 'Énergie', matiere: 'Physique' },
    en: { label: 'Energy: conversions and transfers', court: 'Energy', matiere: 'Physics' },
  },
  ondes: {
    fr: { label: 'Ondes et signaux', court: 'Ondes', matiere: 'Physique' },
    en: { label: 'Waves and signals', court: 'Waves', matiere: 'Physics' },
  },
} as const;
export type Theme = keyof typeof THEMES;
export const ORDRE_THEMES = Object.keys(THEMES) as Theme[];

/** `chemin` est relatif à la racine d'une langue : le lien se construit avec lien(lang, chemin). */
export const CYCLES = [
  {
    id: 'college', chemin: '/college/', dispo: false,
    fr: { titre: 'Collège', classes: '5e, 4e, 3e', resume: 'Les premières expériences : états de la matière, circuits, lumière, vitesse.' },
    en: { titre: 'Collège', classes: '5e, 4e, 3e (ages 12 to 15)', resume: 'The first experiments: states of matter, circuits, light, speed.' },
  },
  {
    id: 'terminale', chemin: '/terminale/', dispo: true,
    fr: { titre: 'Lycée', classes: 'Terminale spécialité', resume: 'Tout le programme de spécialité : titrages, cinétique, mécanique de Newton, ondes, circuit RC.' },
    en: { titre: 'Lycée', classes: 'Terminale speciality (ages 17 to 18)', resume: "The whole speciality syllabus: titrations, kinetics, Newton's mechanics, waves, the RC circuit." },
  },
  {
    id: 'prepa', chemin: '/prepa/', dispo: false,
    fr: { titre: 'Prépa', classes: 'MPSI, PCSI', resume: 'Mécanique du point, thermodynamique, optique, cinétique et équilibres chimiques.' },
    en: { titre: 'Prépa', classes: 'MPSI, PCSI (preparatory classes)', resume: 'Particle mechanics, thermodynamics, optics, kinetics and chemical equilibria.' },
  },
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
  /** Date de dernière mise à jour des textes légaux, à actualiser à chaque modification (dans les deux langues). */
  miseAJour: { fr: '12 novembre 2026', en: '12 November 2026' },
} as const;
