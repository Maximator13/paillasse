# Paillasse

La physique-chimie qui se regarde : fiches de cours en Markdown et travaux pratiques animés (motion design SVG) pour la spécialité physique-chimie de Terminale. Site statique Astro, sans compte, sans formulaire, sans base de données. Bilingue : français à la racine, anglais sous `/en/` avec les mêmes adresses.

## Commandes

| Commande | Rôle |
|---|---|
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement sur `http://localhost:4321` |
| `npm run build` | Génère le site statique dans `dist/` |
| `npm run preview` | Sert `dist/` en local |
| `npx astro check` | Vérifie les types et les composants |
| `node --test src/tp/<slug>/model.test.ts` | Teste le modèle physique d'un TP |
| `node scripts/capture.mjs <chemin> <sortie.png> [--mobile]` | Capture une page du serveur de développement (Chrome requis). Ajouter `--base paillasse` si le serveur tourne avec `BASE_PATH` |

## Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `SITE_URL` | oui en production | Origine publique (ex. `https://www.exemple.fr`), utilisée pour les URL canoniques, hreflang, Open Graph, le sitemap et `robots.txt` |
| `BASE_PATH` | si le site n'est pas à la racine | Sous-chemin de déploiement (ex. `/paillasse` pour `https://maximator13.github.io/paillasse/`). `/` par défaut |
| `PUBLIC_PLAUSIBLE_DOMAIN` | non | Domaine déclaré dans Plausible. Sans elle, aucune mesure d'audience. Avec elle, le script n'est chargé qu'après un « Accepter » dans le bandeau cookies |
| `PUBLIC_GSC_VERIFICATION` | non | Jeton de la balise `google-site-verification` (Google Search Console) |

## Ajouter un chapitre ou un TP

Toutes les règles (frontmatter, structure, scènes animées, vérifications) sont dans [`docs/CONTRAT.md`](docs/CONTRAT.md).

- Chapitre : un fichier `src/content/cours/terminale/<slug>.md`.
- TP : une fiche `src/content/tp/terminale/<slug>.md` et une scène `src/tp/<slug>/` (`model.ts`, `model.test.ts`, `scene.ts`).

## Deux langues

- Le français est la langue par défaut ; l'anglais est servi sous `/en/` avec la même arborescence et les mêmes slugs.
- `src/i18n/index.ts` : type `Lang`, dictionnaire `UI` des textes d'interface, `lien(lang, chemin)` pour tout lien interne et `actif(fichier)` pour les fichiers de `public/`. Aucun `href="/..."` en dur : ces deux fonctions ajoutent la base de déploiement.
- `src/i18n/contenu.ts` : `lesCours(lang)` et `lesTp(lang)`. En anglais, une fiche non traduite reste listée en français et son lien mène à la page française.
- Chaque page est une vue partagée (`src/components/vues/`) qui reçoit `lang` ; les fichiers de `src/pages/` et `src/pages/en/` ne sont que des enveloppes.
- Contenu anglais : `src/content/en/cours/terminale/<slug>.md` et `src/content/en/tp/terminale/<slug>.md` (mêmes slugs, même frontmatter). Textes des scènes : `L('français', 'English')`. Détails dans [`docs/CONTRAT.md`](docs/CONTRAT.md).
- Contrôle d'une scène en anglais : `node scripts/capture.mjs "dev/planche/<slug>/?lang=en"`.

## Déploiement

GitHub Pages : `.github/workflows/deploy.yml` construit le site à chaque poussée sur `main` avec `SITE_URL=https://maximator13.github.io` et `BASE_PATH=/paillasse`, puis publie `dist/`. Dans les réglages du dépôt, choisir « GitHub Actions » comme source de Pages et laisser « Enforce HTTPS » coché. GitHub Pages ne permet pas de poser des en-têtes HTTP (CSP, X-Frame-Options) et ne lit `robots.txt` qu'à la racine du domaine : sous un sous-chemin, celui du site n'est pas pris en compte par les moteurs.

Vercel (domaine propre, sans `BASE_PATH`) : `vercel.json` force les barres obliques finales et pose les en-têtes de sécurité (HSTS, CSP, X-Frame-Options, etc.). Vercel sert le site en HTTPS et redirige HTTP automatiquement.

## Reste à faire avant la mise en ligne

1. Compléter l'objet `LEGAL` de `src/data/site.ts` (rechercher « À COMPLÉTER ») : éditeur, statut, adresse, courriel, téléphone, directeur de la publication, hébergeur. Ces valeurs sont reprises telles quelles dans les pages légales anglaises, dont la version française fait foi.
2. Définir `SITE_URL` et, si besoin, `BASE_PATH` (ainsi que `PUBLIC_PLAUSIBLE_DOMAIN` et `PUBLIC_GSC_VERIFICATION` si souhaité) dans les variables de l'hébergeur ou du workflow.
3. Créer le site dans Plausible, puis valider la propriété dans Google Search Console et y soumettre `sitemap-index.xml`.
4. Faire relire les pages légales (notamment la clause de réutilisation des CGU) par l'éditeur.
5. Après le premier déploiement : vérifier les en-têtes (securityheaders.com) et l'absence de blocage CSP dans la console.
6. Sauvegardes : le dépôt Git fait foi (aucune base de données) ; garder une copie distante du dépôt.
