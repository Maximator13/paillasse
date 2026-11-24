// Partie prépa (français seulement) : filières, matières, accès aux chapitres de la collection `prepa`.
import { getCollection, type CollectionEntry } from 'astro:content';
import { slugDe } from './site';
import { lien } from '../i18n';

export type Chapitre = CollectionEntry<'prepa'>;

/** Filières affichées sur /prepa/. Une filière passe à `dispo: true` quand ses premiers chapitres sont publiés. */
export const FILIERES = [
  {
    id: 'tsi', nom: 'TSI', dispo: true, intitule: 'Technologie et sciences industrielles',
    resume: 'Physique, chimie, mathématiques et sciences de l\'ingénieur, en première (TSI1) et deuxième année (TSI2).',
    titre: 'Prépa TSI : fiches, formules et QCM',
    description: 'Réviser la prépa TSI, première et deuxième années : fiches condensées, formules à retenir, QCM corrigés et exercices type concours, en physique, chimie, maths et SI.',
  },
  { id: 'mpsi', nom: 'MPSI', dispo: false, intitule: 'Mathématiques, physique et sciences de l\'ingénieur', resume: 'Puis MP ou PSI en deuxième année.' },
  { id: 'pcsi', nom: 'PCSI', dispo: false, intitule: 'Physique, chimie et sciences de l\'ingénieur', resume: 'Puis PC ou PSI en deuxième année.' },
  { id: 'ptsi', nom: 'PTSI', dispo: false, intitule: 'Physique, technologie et sciences de l\'ingénieur', resume: 'Puis PT ou PSI en deuxième année.' },
  { id: 'mp2i', nom: 'MP2I', dispo: false, intitule: 'Mathématiques, physique, ingénierie et informatique', resume: 'Puis MPI ou MP en deuxième année.' },
  { id: 'bcpst', nom: 'BCPST', dispo: false, intitule: 'Biologie, chimie, physique et sciences de la Terre', resume: 'Deux années, vers les écoles d\'agronomie, vétérinaires et de géologie.' },
] as const;

export const MATIERES = { physique: 'Physique', chimie: 'Chimie', maths: 'Mathématiques', si: "Sciences de l'ingénieur" } as const;
const ORDRE_MATIERES = Object.keys(MATIERES);
export const ANNEES = [1, 2] as const;

/** Chapitres publiés d'une filière (relus ; tous en développement), triés par année, matière puis ordre. */
export async function lesChapitres(filiere: string): Promise<Chapitre[]> {
  const rang = (c: Chapitre) => [c.data.annee, ORDRE_MATIERES.indexOf(c.data.matiere), c.data.ordre];
  return (await getCollection('prepa', (c) => c.data.filiere === filiere && (c.data.relu || import.meta.env.DEV))).sort((a, b) => {
    const [x, y] = [rang(a), rang(b)];
    return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
  });
}

export const lienChapitre = (c: Chapitre) => lien('fr', `/prepa/${c.data.filiere}/${slugDe(c.id)}/`);
/** « TSI1 », « TSI2 ». */
export const classe = (c: Chapitre) => `${c.data.filiere.toUpperCase()}${c.data.annee}`;
