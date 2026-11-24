// Rendu KaTeX au build des chaînes du frontmatter (QCM, formules de la prépa).
// Une erreur LaTeX lève une exception : la page (et le test du contenu) échoue au lieu d'afficher du code brut.
import katex from 'katex';

const ENTITES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
// Typographie française : espace insécable avant ? ! ; : pour qu'ils ne partent jamais seuls à la ligne.
const echapper = (s: string) => s.replace(/[&<>"]/g, (c) => ENTITES[c]).replace(/ ([?!;:])/g, ' $1');

/** Formule seule, en bloc : formule('U = R i'). */
export const formule = (tex: string) => katex.renderToString(tex, { displayMode: true, throwOnError: true });

/** Texte avec du LaTeX en ligne entre $...$ : le texte est échappé, chaque $...$ rendu par KaTeX. */
export function texteMaths(s: string): string {
  const morceaux = s.split('$');
  if (morceaux.length % 2 === 0) throw new Error(`Nombre impair de $ dans : ${s}`);
  return morceaux.map((m, i) => (i % 2 ? katex.renderToString(m, { throwOnError: true }) : echapper(m))).join('');
}
