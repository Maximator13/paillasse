import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const niveau = z.enum(['terminale']);
const theme = z.enum(['matiere', 'mouvement', 'energie', 'ondes']);

// Un fichier = un chapitre. id = "<niveau>/<slug>", ex. "terminale/titrages".
const cours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cours' }),
  schema: z.object({
    titre: z.string(),
    description: z.string().min(50).max(170),
    niveau,
    theme,
    ordre: z.number(),
    duree: z.string().default('20 min'),
    motsCles: z.array(z.string()).default([]),
    // slugs des TP liés (sans le niveau), ex. ["titrage-ph-metrique"]
    tp: z.array(z.string()).default([]),
  }),
});

// Un fichier = la fiche d'un TP. Le slug doit correspondre au dossier src/tp/<slug>/.
const tp = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tp' }),
  schema: z.object({
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
  }),
});

export const collections = { cours, tp };
