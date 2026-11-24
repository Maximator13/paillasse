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

// Prépa (français seulement) : un fichier = un chapitre, src/content/prepa/<filiere>/<slug>.md, id = "tsi/phys1-circuits-arqs".
// Format détaillé dans docs/CONTRAT.md (section Prépa), contrôlé par src/content/prepa/chapitres.test.ts.
// Les chaînes des formules et du QCM peuvent contenir du LaTeX entre $...$ (rendu par src/lib/maths.ts).
const schemaPrepa = z.object({
  titre: z.string(),
  description: z.string().min(50).max(170),
  filiere: z.enum(['tsi']),
  annee: z.union([z.literal(1), z.literal(2)]),
  matiere: z.enum(['physique', 'chimie', 'maths', 'si']),
  // Intitulé de la partie du programme officiel, identique pour tous les chapitres de la partie.
  partie: z.string(),
  // Rang dans la matière et l'année.
  ordre: z.number(),
  duree: z.string(),
  motsCles: z.array(z.string()).default([]),
  // Vrai une fois le chapitre relu (exactitude, programme, QCM) : seuls les chapitres relus sont publiés.
  relu: z.boolean().default(false),
  // formule : LaTeX sans délimiteurs.
  formules: z.array(z.object({ nom: z.string(), formule: z.string(), conditions: z.string().optional() })).min(6),
  qcm: z
    .array(
      z
        .object({ question: z.string(), choix: z.array(z.string()).min(3).max(5), reponse: z.number().int().min(0), explication: z.string() })
        .refine((q) => q.reponse < q.choix.length, { message: 'reponse doit être un index de choix (0 pour le premier)' }),
    )
    .min(10),
});

// Les versions anglaises reprennent les mêmes slugs et le même schéma, sous src/content/en/.
const col = (base: string, schema: typeof schemaCours | typeof schemaTp) => defineCollection({ loader: glob({ pattern: '**/*.md', base }), schema });
export const collections = {
  cours: col('./src/content/cours', schemaCours),
  tp: col('./src/content/tp', schemaTp),
  coursEn: col('./src/content/en/cours', schemaCours),
  tpEn: col('./src/content/en/tp', schemaTp),
  prepa: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/prepa' }), schema: schemaPrepa }),
};
