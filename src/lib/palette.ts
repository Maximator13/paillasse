// Palette unique des scènes (fond sombre). Toute scène pioche ici pour garder un rendu homogène.
export const C = {
  fond: '#0b1022',
  panneau: '#141a36',
  grille: '#232a4d',
  verre: '#dfe6ff',
  metal: '#7d86ad',
  texte: '#eef1ff',
  discret: '#8f97bd',
  blanc: '#ffffff',
  cyan: '#4dd0e1',
  menthe: '#3ddc97',
  jaune: '#ffd166',
  orange: '#ff9f43',
  corail: '#ff6b6b',
  rose: '#ff7ac6',
  violet: '#a78bfa',
  bleu: '#5b8cff',
} as const;

export const POLICE = "'Instrument Sans Variable', system-ui, sans-serif";
export const MONO = "'JetBrains Mono Variable', ui-monospace, monospace";
/** Épaisseur de trait standard de la verrerie et des objets. */
export const TRAIT = 2.5;
