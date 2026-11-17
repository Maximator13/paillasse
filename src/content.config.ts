import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const niveau = z.enum(['terminale']);
const theme = z.enum(['matiere', 'mouvement', 'energie', 'ondes']);

// Un fichier = un chapitre. id = "<niveau>/<slug>", ex. "terminale/titrages".
const schemaCours = z.object({
    titre: z.string(),
    description: z.string().min(50).max(170),
    niveau,
    theme,
    ordre: z.number(),
    duree: z.string().default('20 min'),
    motsCles: z.array(z.string()).default([]),
    // slugs des TP liés (sans le niveau), ex. ["titrage-ph-metrique"]
    tp: z.array(z.string()).default([]),
  });

// Un fichier = la fiche d'un TP. Le slug doit correspondre au dossier src/tp/<slug>/.
const schemaTp = z.object({
    titre: z.string(),
    description: z.string().min(50).max(170),
    niveau,
    theme,
    matiere: z.enum(['physique', 'chimie']),
    ordre: z.number(),
    duree: z.string().default('1 h'),
    // slug du chapitre de cours associé (sans le niveau)
    chapitre: z.string(),
    objectifs: z.array(z.string()).min(1),
    materiel: z.array(z.string()).min(1),
  });

// Les versions anglaises reprennent les mêmes slugs et le même schéma, sous src/content/en/.
const col = (base: string, schema: typeof schemaCours | typeof schemaTp) => defineCollection({ loader: glob({ pattern: '**/*.md', base }), schema });
export const collections = {
  cours: col('./src/content/cours', schemaCours),
  tp: col('./src/content/tp', schemaTp),
  coursEn: col('./src/content/en/cours', schemaCours),
  tpEn: col('./src/content/en/tp', schemaTp),
};
