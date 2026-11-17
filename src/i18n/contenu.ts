// Accès aux fiches de cours et de TP dans une langue, avec repli sur le français quand la traduction manque.
import { getCollection, type CollectionEntry } from 'astro:content';
import { slugDe } from '../data/site';
import { lien, type Lang } from './index';

// src/content.config.ts déclare ses quatre collections avec un même type de schéma (union cours | TP) :
// on retrouve ici les données propres à chaque collection grâce à un champ qui n'existe que dans l'une.
type Entree<C extends 'cours' | 'coursEn' | 'tp' | 'tpEn', Champ extends string> = CollectionEntry<C> & {
  data: Extract<CollectionEntry<C>['data'], Record<Champ, unknown>>;
};
export type Cours = Entree<'cours' | 'coursEn', 'motsCles'>;
export type Tp = Entree<'tp' | 'tpEn', 'chapitre'>;

/** Langue réelle d'une fiche : une fiche française peut apparaître sur une page anglaise (traduction absente). */
export const langDe = (e: Cours | Tp): Lang => (e.collection.endsWith('En') ? 'en' : 'fr');

const parOrdre = (a: Cours | Tp, b: Cours | Tp) => a.data.ordre - b.data.ordre;
const terminale = (e: Cours | Tp) => e.data.niveau === 'terminale';

/** Chapitres dans l'ordre du programme. En anglais, un chapitre non traduit reste présent en français. */
export async function lesCours(lang: Lang): Promise<Cours[]> {
  const fr = (await getCollection('cours')) as Cours[];
  if (lang === 'fr') return fr.sort(parOrdre);
  const en = (await getCollection('coursEn')) as Cours[];
  return fr.map((c) => en.find((e) => e.id === c.id) ?? c).sort(parOrdre);
}

/** TP dans l'ordre du programme, avec le même repli. */
export async function lesTp(lang: Lang): Promise<Tp[]> {
  const fr = (await getCollection('tp')) as Tp[];
  if (lang === 'fr') return fr.sort(parOrdre);
  const en = (await getCollection('tpEn')) as Tp[];
  return fr.map((t) => en.find((e) => e.id === t.id) ?? t).sort(parOrdre);
}

/** Adresse d'une fiche, dans sa langue réelle : un contenu anglais absent mène à la page française. */
export const lienCours = (c: Cours) => lien(langDe(c), `/${c.data.niveau}/cours/${slugDe(c.id)}/`);
export const lienTp = (t: Tp) => lien(langDe(t), `/${t.data.niveau}/tp/${slugDe(t.id)}/`);

/** getStaticPaths des pages de chapitre : seules les fiches écrites dans la langue demandée génèrent une page. */
export async function cheminsCours(lang: Lang) {
  const tous = (await lesCours(lang)).filter(terminale);
  const traduits = new Set((await getCollection('coursEn')).map((c) => c.id));
  return tous.flatMap((c, i) =>
    langDe(c) !== lang ? [] : [{ params: { slug: slugDe(c.id) }, props: { cours: c, precedent: tous[i - 1], suivant: tous[i + 1], traduit: traduits.has(c.id) } }],
  );
}

/** getStaticPaths des pages de TP. */
export async function cheminsTp(lang: Lang) {
  const tous = (await lesTp(lang)).filter(terminale);
  const traduits = new Set((await getCollection('tpEn')).map((t) => t.id));
  return tous.flatMap((t) => (langDe(t) !== lang ? [] : [{ params: { slug: slugDe(t.id) }, props: { tp: t, traduit: traduits.has(t.id) } }]));
}
