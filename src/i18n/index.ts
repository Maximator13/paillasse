// Langues du site, liens internes et textes d'interface.
// Le français est servi à la racine, l'anglais sous /en/ avec les mêmes chemins.

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];

// Base de déploiement sans barre finale : '' à la racine, '/paillasse' sous un sous-chemin.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Adresse d'un fichier de public/ (favicon, image de partage, sitemap) : actif('og.png'). */
export const actif = (chemin: string) => `${BASE}/${chemin.replace(/^\//, '')}`;

/** Adresse d'une page dans une langue : lien('en', '/tp/') -> '/paillasse/en/tp/'. Tout lien interne passe par ici. */
export const lien = (lang: Lang, chemin = '/') => actif((lang === 'en' ? 'en/' : '') + chemin.replace(/^\//, ''));

/** Chemin d'une page sans base ni préfixe de langue : '/paillasse/en/tp/' -> '/tp/'. */
export const cheminNeutre = (pathname: string) => {
  const p = pathname.slice(BASE.length) || '/';
  return /^\/en(\/|$)/.test(p) ? p.slice(3) || '/' : p;
};

const fr = {
  locale: 'fr-FR',
  og: 'fr_FR',
  /** Deux-points typographiques : espace avant en français, pas en anglais. */
  deuxPoints: ' : ',
  evitement: 'Aller au contenu',
  accueil: 'Accueil',
  logo: (nom: string) => `${nom}, accueil`,
  navLabel: 'Navigation principale',
  nav: { terminale: 'Terminale', tp: 'TP animés', college: 'Collège', prepa: 'Prépa' },
  /** Libellé du lien vers l'autre langue, écrit dans cette autre langue. */
  autreLangue: 'English version',
  pied: { mentions: 'Mentions légales', confidentialite: 'Confidentialité', cgu: 'CGU', cookies: 'Gérer les cookies' },
  cookies: {
    titre: "Mesure d'audience",
    texte: "Avec votre accord, nous comptons les visites de façon anonyme (Plausible, sans cookie publicitaire) pour savoir quels cours et TP sont utiles. Refuser n'empêche rien : tout le site reste accessible.",
    plus: 'En savoir plus',
    refuser: 'Refuser',
    accepter: 'Accepter',
  },
  lecteur: {
    animation: (titre: string) => `Animation du TP : ${titre}`,
    graphique: (titre: string) => `Graphique du TP : ${titre}`,
    mesures: 'Mesures en direct',
    progression: 'Progression du TP',
    precedente: 'Étape précédente',
    lecture: 'Lecture',
    suivante: 'Étape suivante',
    recommencer: 'Recommencer le TP',
    enchainer: 'Enchaîner les étapes',
    aVous: 'À vous de jouer',
  },
  cours: 'Cours',
  tpAnimes: 'TP animés',
  tpAnime: 'TP animé',
  nTpAnimes: (n: number) => `${n} TP animé${n > 1 ? 's' : ''}`,
  disponible: 'Disponible',
  aVenir: 'À venir',
  chapitresPrevus: 'Chapitres prévus',
  tpEnvisages: 'TP animés envisagés',
  miseAJour: 'Dernière mise à jour',
};

const en: typeof fr = {
  locale: 'en-GB',
  og: 'en_GB',
  deuxPoints: ': ',
  evitement: 'Skip to content',
  accueil: 'Home',
  logo: (nom) => `${nom}, home`,
  navLabel: 'Main navigation',
  nav: { terminale: 'Terminale', tp: 'Animated practicals', college: 'Collège', prepa: 'Prépa' },
  autreLangue: 'Version française',
  pied: { mentions: 'Legal notice', confidentialite: 'Privacy', cgu: 'Terms of use', cookies: 'Manage cookies' },
  cookies: {
    titre: 'Audience measurement',
    texte: 'With your consent, we count visits anonymously (Plausible, with no advertising cookie) to find out which lessons and practicals are useful. Declining blocks nothing: the whole site remains accessible.',
    plus: 'Learn more',
    refuser: 'Decline',
    accepter: 'Accept',
  },
  lecteur: {
    animation: (titre) => `Animation of the practical: ${titre}`,
    graphique: (titre) => `Graph of the practical: ${titre}`,
    mesures: 'Live measurements',
    progression: 'Progress of the practical',
    precedente: 'Previous step',
    lecture: 'Play',
    suivante: 'Next step',
    recommencer: 'Restart the practical',
    enchainer: 'Play the steps in sequence',
    aVous: 'Your turn',
  },
  cours: 'Lessons',
  tpAnimes: 'Animated practicals',
  tpAnime: 'Animated practical',
  nTpAnimes: (n) => `${n} animated practical${n > 1 ? 's' : ''}`,
  disponible: 'Available',
  aVenir: 'Coming soon',
  chapitresPrevus: 'Planned chapters',
  tpEnvisages: 'Animated practicals under consideration',
  miseAJour: 'Last updated',
};

/** Textes d'interface partagés : UI[lang].accueil. Les textes propres à une page vivent dans sa vue (src/components/vues/). */
export const UI: Record<Lang, typeof fr> = { fr, en };
