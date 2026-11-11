# Contrat de contribution

Site statique Astro 7 de physique-chimie : fiches de cours en Markdown et TP animés. Ce document fixe les règles communes à tous les contributeurs. Les fichiers de référence à lire avant d'écrire quoi que ce soit sont listés en fin de document.

## Règles générales

- Langue : français, orthographe et typographie soignées (espaces insécables avant `: ; ? !` non requises, mais accents obligatoires).
- **Jamais de tiret cadratin** (caractère U+2014) ni de demi-cadratin en incise : utiliser virgule, deux-points ou parenthèses.
- Aucune mention d'IA, d'assistant ou d'outil de génération, nulle part (contenu, code, commentaires, commits).
- Ne pas faire de commit git, ne pas installer de dépendance, ne pas modifier les fichiers hors de son périmètre (en particulier `src/lib/`, `src/layouts/`, `src/components/`, `src/styles/`, `astro.config.mjs`, `src/content.config.ts`, `package.json`).
- Si le socle semble insuffisant ou bogué : ne pas le modifier, contourner localement dans son propre fichier et le signaler dans le rapport final.
- Contenu conforme au programme officiel de spécialité physique-chimie de Terminale générale (BO spécial n°8 du 25 juillet 2019). Exactitude scientifique prioritaire : unités SI, chiffres significatifs cohérents, notations du lycée français.
- Ne jamais lancer `npm run build` ni `npm run dev` : un serveur de développement tourne déjà sur `http://localhost:4321` et plusieurs contributeurs travaillent en parallèle.

## Fiches de cours : `src/content/cours/terminale/<slug>.md`

Modèle : `src/content/cours/terminale/titrages.md`. Schéma du frontmatter : `src/content.config.ts`.

- `description` : entre 50 et 170 caractères, unique, sans redite du titre.
- `theme` : `matiere` | `mouvement` | `energie` | `ondes`. `ordre` : numéro imposé du chapitre.
- `tp` : slugs des TP liés (liste imposée, ne pas en inventer).
- Structure du corps : encadré « L'essentiel » en citation (`>`), sections numérotées `## 1. ...` (3 à 6), `## Exercice type` avec correction dans `<details><summary>Voir la correction</summary>` (laisser une ligne vide après `<summary>` et avant `</details>`), `## À retenir`, `## Erreurs fréquentes`.
- Longueur : 900 à 1500 mots. Dense, clair, niveau élève de Terminale. Définitions et lois dans des citations (`> **Définition.** ...`).
- Formules : KaTeX, `$...$` en ligne et `$$...$$` en bloc (lignes vides autour des blocs). Unités en `\mathrm{}`, virgule décimale `{,}` (ex. `$0{,}10\ \mathrm{mol \cdot L^{-1}}$`). Espèces chimiques en `\mathrm{}` (ex. `$\mathrm{H_3O^+}$`).
- Pas de titre `# H1` (la page le génère), pas d'image externe, pas de HTML hors `<details>`.
- Tableaux Markdown bienvenus pour comparer ou récapituler.

## Fiches de TP : `src/content/tp/terminale/<slug>.md`

Modèle : `src/content/tp/terminale/titrage-ph-metrique.md`.

- Frontmatter : `matiere` (`physique` | `chimie`), `chapitre` (slug du cours lié, imposé), `objectifs` (3 ou 4), `materiel` (4 à 8 éléments), `duree`, `ordre` imposé.
- Corps : `## Principe`, `## Protocole` (liste numérotée qui suit les étapes de l'animation), `## Exploitation` (calculs, valeurs numériques cohérentes avec l'animation), `## Questions` (3 questions dont au moins 2 demandent de manipuler les curseurs de l'animation, réponses dans `<details>`), `## Sécurité` si pertinent.
- 350 à 600 mots.

## Scènes de TP : `src/tp/<slug>/`

Trois fichiers par TP. Modèle complet : `src/tp/titrage-ph-metrique/`.

### `model.ts` : la physique

- Fonctions **pures**, sans aucun import (ou seulement des imports relatifs avec extension `.ts`). Pas de DOM.
- Vraies lois, vraies valeurs, vraies unités. Les ordres de grandeur doivent être ceux d'un vrai TP de lycée.

### `model.test.ts` : le contrôle

- `node:test` + `node:assert/strict`, import de `./model.ts` (avec l'extension).
- 4 à 8 tests sur des valeurs connues (cas limites, valeurs de référence calculées à la main).
- Exécution : `node --test src/tp/<slug>/model.test.ts`.

### `scene.ts` : l'animation

`export default definirScene({ etapes, parametres, graphique, affiche, monter })`. Types dans `src/lib/scene.ts`.

- `etapes` : 4 à 6 étapes guidées `{ titre, texte, duree }`. Durée de 4 à 14 s. Texte : 1 à 3 phrases, balises `<strong>`, `<em>`, `<sub>`, `<sup>` admises.
- `parametres` : 2 ou 3 curseurs qui changent **visiblement** le phénomène (et le graphique). Bornes choisies pour que la scène reste lisible sur toute la plage.
- `graphique` : fortement recommandé (courbe tracée en direct pendant l'expérience). Axes avec unités.
- `affiche` : `{ etape, t }` de l'image la plus parlante (vignette des cartes).
- `monter({ scene, graphique })` construit le SVG **une fois** et renvoie `dessiner(img)`.

Règles de `dessiner({ etape, t, T, p })` :

1. **Fonction pure de l'image.** Le lecteur saute librement d'une étape à l'autre et en arrière : aucun état accumulé entre deux appels, aucune dépendance à l'ordre. Tout se calcule depuis `etape`, `t` (0 à 1 dans l'étape), `T` (horloge d'ambiance en secondes, pour les boucles : agitation, bulles, gouttes) et `p` (valeurs des curseurs).
2. Utiliser `avancement(img, i)` (0 avant l'étape i, t pendant, 1 après) puis `seg(a, debut, fin, ease.xxx)` pour séquencer les mouvements à l'intérieur d'une étape. Ce qui a été fait à une étape reste visible aux suivantes.
3. Renvoyer les **mesures** en direct `[{ label, valeur }]` (2 à 4), formatées avec `fmt()` (virgule décimale) et unités.
4. Pas de `setTimeout`, `requestAnimationFrame`, `Math.random()` (utiliser `rng(graine)`), ni d'écouteur d'événement : le lecteur pilote tout.
5. **Aucun id SVG en dur** : une scène est montée plusieurs fois par page. Utiliser `uid()` pour tout `clipPath`, `gradient`, `filter`.
6. Dernière étape = exploitation : résultat mis en évidence (encart, repère sur le graphique) et invitation à jouer avec les curseurs.

Qualité visuelle attendue (c'est une vitrine de motion design) :

- Repère de la scène : `viewBox 0 0 640 480`, fond sombre fourni. Paillasse à `y = 440`. Garder 16 px de marge, ne rien faire déborder.
- Couleurs uniquement depuis `C` (`src/lib/palette.ts`), polices `POLICE` et `MONO`, trait `TRAIT`.
- Matériel de chimie : réutiliser `src/lib/labkit.ts` (bécher, erlenmeyer, fiole, éprouvette, tube à essai, burette, potence, agitateur, barreau, appareil de mesure, sonde, gouttes, bulles, thermomètre, étiquette, flèche, paillasse). Dessiner soi-même, dans le même style (contour clair de 2,5 px, aplats lumineux, coins arrondis), ce qui manque.
- Mouvements avec easing (`ease.inOut`, `ease.out`, `ease.backOut`, `ease.bounceOut`), entrées décalées, jamais de téléportation : un objet entre, agit, se range.
- Montrer le **phénomène**, pas seulement le matériel : particules, ions, vecteurs, fronts d'onde, rayons, changement de couleur, niveau qui monte. Le lien entre ce qui se passe sur la paillasse et la courbe doit sauter aux yeux.
- Texte dans la scène : taille 13 minimum, via `etiquette()` (lisible sur fond sombre), jamais de chevauchement avec un objet. Indices en texte simple (`VE`, `CB`) dans le SVG.
- Le graphique s'utilise via l'objet `graphique` (`courbe`, `nuage`, `repere`, `verticale`, `horizontale`, `opacite`, `effacer`, `axes`), voir `src/lib/graphique.ts`.

### Vérification obligatoire d'une scène

1. `node --test src/tp/<slug>/model.test.ts` : tout vert.
2. Planche de contrôle (toutes les étapes à t = 0,05 / 0,5 / 1) :
   `node scripts/capture.mjs dev/planche/<slug>/ .captures/<slug>-planche.png`
   puis **ouvrir l'image avec l'outil de lecture de fichier et la regarder** : pas de chevauchement, pas de débordement, progression claire, graphique cohérent. Pour tester un curseur : ajouter `?<id>=<valeur>` au chemin.
3. Page réelle, bureau puis mobile :
   `node scripts/capture.mjs "terminale/tp/<slug>/?etape=3&t=0.6" .captures/<slug>-page.png`
   `node scripts/capture.mjs "terminale/tp/<slug>/?etape=3&t=0.6" .captures/<slug>-mobile.png --mobile`
4. Le script affiche `ERREURS CONSOLE` et sort en code 2 si la page lève une erreur : corriger jusqu'à disparition.
5. Itérer au moins deux fois sur le rendu : une scène correcte mais terne n'est pas terminée.

Note : donner les chemins au script **sans barre oblique initiale** (Git Bash la réécrit).

## Fichiers de référence

| Fichier | Rôle |
|---|---|
| `src/lib/scene.ts` | Types `Scene`, `Etape`, `Parametre`, `Image`, `Mesure` |
| `src/lib/anim.ts` | `clamp`, `lerp`, `remap`, `ease`, `seg`, `avancement`, `mix`, `fmt`, `rng`, `uid`, `el`, `set`, `texte`, `show`, `trace` |
| `src/lib/labkit.ts` | Matériel de laboratoire en SVG |
| `src/lib/graphique.ts` | Graphique partagé |
| `src/lib/palette.ts` | Couleurs et polices des scènes |
| `src/tp/titrage-ph-metrique/` | Scène, modèle et test de référence |
| `src/content/tp/terminale/titrage-ph-metrique.md` | Fiche de TP de référence |
| `src/content/cours/terminale/titrages.md` | Fiche de cours de référence |
