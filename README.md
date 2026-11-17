# Paillasse

La physique-chimie qui se regarde : fiches de cours en Markdown et travaux pratiques animés (motion design SVG) pour la spécialité physique-chimie de Terminale. Site statique Astro, sans compte, sans formulaire, sans base de données.

## Commandes

| Commande | Rôle |
|---|---|
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement sur `http://localhost:4321` |
| `npm run build` | Génère le site statique dans `dist/` |
| `npm run preview` | Sert `dist/` en local |
| `npx astro check` | Vérifie les types et les composants |
| `node --test src/tp/<slug>/model.test.ts` | Teste le modèle physique d'un TP |
| `node scripts/capture.mjs <chemin> <sortie.png> [--mobile]` | Capture une page du serveur de développement (Chrome requis) |

## Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `SITE_URL` | oui en production | URL publique (ex. `https://www.exemple.fr`), utilisée pour les URL canoniques, Open Graph, le sitemap et `robots.txt` |
| `PUBLIC_PLAUSIBLE_DOMAIN` | non | Domaine déclaré dans Plausible. Sans elle, aucune mesure d'audience. Avec elle, le script n'est chargé qu'après un « Accepter » dans le bandeau cookies |
| `PUBLIC_GSC_VERIFICATION` | non | Jeton de la balise `google-site-verification` (Google Search Console) |

## Ajouter un chapitre ou un TP

Toutes les règles (frontmatter, structure, scènes animées, vérifications) sont dans [`docs/CONTRAT.md`](docs/CONTRAT.md).

- Chapitre : un fichier `src/content/cours/terminale/<slug>.md`.
- TP : une fiche `src/content/tp/terminale/<slug>.md` et une scène `src/tp/<slug>/` (`model.ts`, `model.test.ts`, `scene.ts`).

## Déploiement

`vercel.json` force les barres obliques finales et pose les en-têtes de sécurité (HSTS, CSP, X-Frame-Options, etc.). Vercel sert le site en HTTPS et redirige HTTP automatiquement.

## Reste à faire avant la mise en ligne

1. Compléter l'objet `LEGAL` de `src/data/site.ts` (rechercher « À COMPLÉTER ») : éditeur, statut, adresse, courriel, téléphone, directeur de la publication, hébergeur.
2. Définir `SITE_URL` (et, si souhaité, `PUBLIC_PLAUSIBLE_DOMAIN` et `PUBLIC_GSC_VERIFICATION`) dans les variables du projet Vercel.
3. Créer le site dans Plausible, puis valider la propriété dans Google Search Console et y soumettre `sitemap-index.xml`.
4. Faire relire les pages légales (notamment la clause de réutilisation des CGU) par l'éditeur.
5. Après le premier déploiement : vérifier les en-têtes (securityheaders.com) et l'absence de blocage CSP dans la console.
6. Sauvegardes : le dépôt Git fait foi (aucune base de données) ; garder une copie distante du dépôt.
