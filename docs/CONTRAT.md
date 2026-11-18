# Contrat de contribution

Site statique Astro 7 de physique-chimie : fiches de cours en Markdown et TP animés. Ce document fixe les règles communes à tous les contributeurs. Les fichiers de référence à lire avant d'écrire quoi que ce soit sont listés en fin de document.

## Règles générales

- Langue : français, orthographe et typographie soignées (espaces insécables avant `: ; ? !` non requises, mais accents obligatoires).
- **Jamais de tiret cadratin** (caractère U+2014) ni de demi-cadratin en incise : utiliser virgule, deux-points ou parenthèses.
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
- Une formule en bloc dans une citation doit avoir ses `$` seuls sur leur ligne, chaque ligne préfixée par `>`, avec une ligne `>` vide avant et après. Écrite sur une seule ligne (`> $ ... $`), elle s'affiche en petit, comme une formule en ligne.
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
3. Renvoyer les **mesures** en direct `[{ label, valeur }]` (2 à 4), formatées avec `fmt()` (virgule décimale en français, point en anglais) et unités.
4. Pas de `setTimeout`, `requestAnimationFrame`, `Math.random()` (utiliser `rng(graine)`), ni d'écouteur d'événement : le lecteur pilote tout.
5. **Aucun id SVG en dur** : une scène est montée plusieurs fois par page. Utiliser `uid()` pour tout `clipPath`, `gradient`, `filter`.
6. Dernière étape = exploitation : résultat mis en évidence (encart, repère sur le graphique) et invitation à jouer avec les curseurs.

Qualité visuelle attendue (c'est une vitrine de motion design) :

- Repère de la scène : `viewBox 0 0 640 480`, fond fourni par le lecteur (blanc en thème clair, nuit en thème sombre, voir « Couleurs des scènes »). Paillasse à `y = 440`. Garder 16 px de marge, ne rien faire déborder.
- Couleurs uniquement depuis `C` (`src/lib/palette.ts`), polices `POLICE` et `MONO`, trait `TRAIT`. Règles détaillées ci-dessous.
- Matériel de chimie : réutiliser `src/lib/labkit.ts` (bécher, erlenmeyer, fiole, éprouvette, tube à essai, burette, potence, agitateur, barreau, appareil de mesure, sonde, gouttes, bulles, thermomètre, étiquette, flèche, paillasse). Dessiner soi-même, dans le même style (contour `C.trait` de 2,5 px, aplats francs, coins arrondis), ce qui manque.
- Mouvements avec easing (`ease.inOut`, `ease.out`, `ease.backOut`, `ease.bounceOut`), entrées décalées, jamais de téléportation : un objet entre, agit, se range.
- Montrer le **phénomène**, pas seulement le matériel : particules, ions, vecteurs, fronts d'onde, rayons, changement de couleur, niveau qui monte. Le lien entre ce qui se passe sur la paillasse et la courbe doit sauter aux yeux.
- Texte dans la scène : taille 13 minimum, via `etiquette()` (lisible sur les deux fonds), jamais de chevauchement avec un objet. Indices en texte simple (`VE`, `CB`) dans le SVG.
- Le graphique s'utilise via l'objet `graphique` (`courbe`, `nuage`, `repere`, `verticale`, `horizontale`, `opacite`, `effacer`, `axes`), voir `src/lib/graphique.ts`.

### Couleurs des scènes (thèmes clair et sombre)

Le site a deux thèmes : réglage de l'appareil par défaut, bouton soleil/lune dans l'en-tête (choix mémorisé). Une scène doit être juste dans les deux.

- `C.xxx` renvoie la couleur du **thème courant au moment de la lecture**. Lire `C` dans `monter()` ou `dessiner()`, **jamais dans une constante de module** (`const ACIDE = C.corail` en tête de fichier fige le thème du chargement). Au changement de thème, le lecteur remonte la scène (`monter()` rappelé) et redessine la même image.
- **Aucune couleur en dur** (`'#8fc4ff'`, `'rgba(223,230,255,.06)'`, `'white'`) : tout passe par `C`, éventuellement via `mix()` ou une opacité (`fill-opacity`, `opacity`). Une teinte qui manque s'ajoute dans `palette.ts`, avec ses deux valeurs.
- Sens des clés : `fond` (fond de scène ; sert aussi à évider un cercle ou détourer un point), `panneau` (encart, cadran), `grille` (graduations discrètes), `verre` (teinte du verre et des liquides incolores, en aplat), `trait` (contour de la verrerie et des objets), `metal`, `texte` (texte principal et repère qui doit trancher au maximum sur le fond), `discret` (texte secondaire), `blanc` (lumière et reflets : blanc dans les deux thèmes, à poser sur un objet coloré, jamais seul sur le fond), `ombre` (avec faible opacité), puis les couleurs vives `cyan`, `menthe`, `jaune`, `orange`, `corail`, `rose`, `violet`, `bleu`.
- Contrastes garantis par la palette : `texte`, `discret` et toutes les couleurs vives au moins 4,5:1 sur `fond` (utilisables en étiquette), 3:1 sur `panneau` ; `trait` et `metal` au moins 3:1 sur `fond`.
- Contrôle : `node scripts/contrastes.mjs` (sortie 0 exigée) après toute retouche de `palette.ts` ou des jetons de `src/styles/global.css` ; planche dans les deux thèmes avec `?theme=light` et `?theme=dark` (combinables avec `?lang=en`) ; page avec `node scripts/capture.mjs <chemin> <sortie.png>` (thème clair) puis la même commande avec `--sombre`.

### Vérification obligatoire d'une scène

1. `node --test src/tp/<slug>/model.test.ts` : tout vert.
2. Planche de contrôle (toutes les étapes à t = 0,05 / 0,5 / 1), dans les deux thèmes :
   `node scripts/capture.mjs "dev/planche/<slug>/?theme=light" .captures/<slug>-planche.png`
   `node scripts/capture.mjs "dev/planche/<slug>/?theme=dark" .captures/<slug>-planche-sombre.png`
   puis **ouvrir l'image avec l'outil de lecture de fichier et la regarder** : pas de chevauchement, pas de débordement, progression claire, graphique cohérent. Pour tester un curseur : ajouter `?<id>=<valeur>` au chemin.
3. Page réelle, bureau puis mobile :
   `node scripts/capture.mjs "terminale/tp/<slug>/?etape=3&t=0.6" .captures/<slug>-page.png`
   `node scripts/capture.mjs "terminale/tp/<slug>/?etape=3&t=0.6" .captures/<slug>-mobile.png --mobile`
4. Le script affiche `ERREURS CONSOLE` et sort en code 2 si la page lève une erreur : corriger jusqu'à disparition.
5. Itérer au moins deux fois sur le rendu : une scène correcte mais terne n'est pas terminée.

Note : donner les chemins au script **sans barre oblique initiale** (Git Bash la réécrit).

## Vue 3D (facultative) : `src/tp/<slug>/scene3d.ts`

Un TP peut proposer une vraie vue 3D (WebGL, three.js) **en plus** de sa vue normale. Il suffit que le fichier `src/tp/<slug>/scene3d.ts` existe : le lecteur affiche alors le bouton « Vue 3D » / « Vue normale » à côté des commandes. Modèle complet : `src/tp/satellite-kepler/scene3d.ts`.

### Principe

- La vue normale reste la vue par défaut. La vue 3D réutilise **les mêmes** étapes, textes, curseurs, mesures et graphique : seule la zone de scène change (un canvas remplace le SVG, qui reste monté et masqué).
- Les **mesures** et le **graphique** viennent toujours de `scene.ts`. `scene3d.ts` ne fait que dessiner : il n'a ni étapes, ni curseurs, ni mesures à déclarer.
- La physique vient de `model.ts` (mêmes fonctions, mêmes formules que `scene.ts`) : 2D et 3D montrent exactement les mêmes positions et valeurs. Constantes ou petites fonctions de `scene.ts` utiles en 3D : les exporter depuis `scene.ts` sans changer son comportement (`export const ...`), ne jamais les recopier avec d'autres valeurs.
- three.js et `scene3d.ts` ne sont chargés qu'à l'ouverture de la vue 3D (import dynamique) : aucun poids ajouté aux pages tant que l'élève ne clique pas.

### API

```ts
import * as THREE from 'three';
import { L, avancement, seg } from '../../lib/anim';
import { cercle, definirScene3d, fleche } from '../../lib/kit3d';
import { C } from '../../lib/palette';

export default definirScene3d({
  // Vue initiale (et bouton Recentrer) : position de la caméra, point visé, distances de zoom permises.
  camera: { position: [0, 13.5, 23.4], cible: [0, 0, 0], min: 3.2, max: 60 },
  monter({ scene, camera, calque, etiquette }) {
    // Construire une fois : géométries, matériaux, lumières, étiquettes. Lire C ici.
    return ({ etape, t, T, p }) => {
      // Fonction PURE de l'image, comme en 2D : positions, opacités, échelles, textes.
    };
  },
});
```

Types dans `src/lib/kit3d.ts` (`Scene3d`, `Contexte3d`, `Etiquette3d`). Le moteur (`src/lib/vue3d.ts`) fournit le rendu, la caméra orbitale, le redimensionnement et la libération : la scène ne s'en occupe pas.

- `scene` : `THREE.Scene` à remplir, fond déjà réglé sur `C.fond`.
- `camera` : caméra perspective (champ 40°), pilotée par l'élève. Ne pas la déplacer dans `dessiner()`.
- `etiquette(texte, { couleur, taille })` : étiquette HTML accrochée à un point 3D (`e.pos`), nette à tout zoom, avec un halo de la couleur du fond. Dans `dessiner()` : `e.pos.set(...)`, `e.opacite = ...` (0 la masque), `e.el.textContent = ...` si le texte change.
- `calque` : élément HTML posé sur le canvas, sans clic, pour les légendes et encarts fixes (classe `l3d-panneau` pour l'habillage standard, positionnement par `style`).
- Outils de `kit3d.ts` : `cercle(couleur, { epaisseur, tirets })` (cercle unité du plan horizontal en trait épais d'épaisseur constante à l'écran ; `scale.set(a, 1, b)` en fait une ellipse, `geometry.instanceCount` n'en trace qu'un arc), `fleche(couleur, rayon)` (vecteur plein, `maj(origine, vecteur, opacite)`).

### Règles

1. **Même contrat de dessin qu'en 2D** : fonction pure de `{ etape, t, T, p }`, `avancement()` et `seg()` pour séquencer, rien d'accumulé, pas de `setTimeout`, `requestAnimationFrame`, `Math.random()` (utiliser `rng(graine)`) ni d'écouteur : le lecteur et le moteur pilotent tout.
2. **Palette** : toutes les couleurs viennent de `C` (`new THREE.Color(C.cyan)` ou directement `color: C.cyan`), lues dans `monter()`. Au changement de thème, le moteur vide la scène et rappelle `monter()` (caméra conservée). Lumières de couleur `C.blanc`. Les objets qui portent une information (vecteurs, trajectoires, repères) en `MeshBasicMaterial` ou `LineMaterial` pour garder la couleur exacte de la palette ; `MeshStandardMaterial` pour les objets « réels » (astre, satellite, verrerie). Juger le rendu dans les deux thèmes (`themeSombre()` permet d'ajuster une intensité ou une opacité).
3. **Bilingue** : tout texte affiché passe par `L('...', '...')` et les nombres par `fmt()`, comme en 2D.
4. **Performance** : construire une fois dans `monter()` ; dans `dessiner()`, seulement modifier positions, échelles, opacités, `visible` et attributs existants (`attr.setXYZ(...)`, `needsUpdate = true`). Ne jamais créer de géométrie, de matériau ni de texture par image. Textures procédurales (canvas 2D) de 512 × 256 au plus, aucune image téléchargée. Rester sous 200 objets et quelques centaines de milliers de triangles.
5. **Libération** : tout ce qui est ajouté à `scene` (géométries, matériaux et leurs textures) est libéré par le moteur au retour en vue normale et au changement de thème. Un objet three.js créé mais non ajouté à la scène doit l'être, ou être libéré à la main.
6. **Lisibilité** : étiquettes de 13 px au moins, jamais sur un objet ni sur une autre étiquette ; vue initiale cadrée pour que toute la scène soit visible à toutes les étapes et pour toutes les valeurs des curseurs ; légende du calque compacte (sous 600 px de large, la classe `l3d-large` masque une ligne secondaire).
7. **Mouvements réduits** : rien à faire dans la scène. Le lecteur gèle l'horloge `T` et le moteur coupe l'inertie de la caméra et l'animation du recentrage.

Interaction fournie par le moteur : glisser pour tourner, molette ou pincement pour zoomer, flèches du clavier pour tourner et touches `+` `-` pour zoomer (canvas focalisable), `0` ou bouton pour recentrer. Netteté : `devicePixelRatio` plafonné à 2. Sans WebGL 2 (ou contexte perdu), un message bilingue s'affiche et le lecteur revient à la vue normale.

### Contrôle visuel

L'URL accepte `?vue=3d` en plus de `etape`, `t` et des curseurs ; `data-pret` n'est posé qu'après la première image 3D, et `scripts/capture.mjs` lance Chrome avec le rendu WebGL logiciel autorisé.

1. Étapes clés dans les deux thèmes, par exemple :
   `node scripts/capture.mjs "terminale/tp/<slug>/?vue=3d&etape=3&t=0.6" .captures/<slug>-3d.png --el .lecteur-ecran`
   `node scripts/capture.mjs "terminale/tp/<slug>/?vue=3d&etape=3&t=0.6" .captures/<slug>-3d-sombre.png --el .lecteur-ecran --sombre`
   puis **ouvrir chaque image et la regarder**, à chaque étape et aux bornes des curseurs (`&<id>=<valeur>`).
2. Mobile : même commande avec `--mobile` (la légende du calque ne doit pas masquer la scène).
3. Anglais : `en/terminale/tp/<slug>/?vue=3d&...` ; aucun texte français ne doit rester.
4. Vue normale intacte : `node scripts/capture.mjs "terminale/tp/<slug>/?etape=3&t=0.6" .captures/<slug>-page.png --el .lecteur-ecran`.
5. `ERREURS CONSOLE` (code 2) interdit, comme en 2D. Une scène 3D qui lève une erreur au montage la signale en console et le lecteur revient à la vue normale.

## Version anglaise d'un contenu

Le site est bilingue : français à la racine, anglais sous `/en/` avec les mêmes slugs. Une page anglaise n'est générée que si sa fiche anglaise existe ; sinon les listes anglaises affichent la fiche française et pointent vers la page française.

- Chapitre : copier `src/content/cours/terminale/<slug>.md` vers `src/content/en/cours/terminale/<slug>.md` (même nom de fichier, mêmes `niveau`, `theme`, `ordre`, `tp`) et traduire `titre`, `description`, `duree`, `motsCles` et le corps.
- TP : même principe vers `src/content/en/tp/terminale/<slug>.md` (mêmes `matiere`, `chapitre`, `ordre`) ; traduire `titre`, `description`, `objectifs`, `materiel` et le corps.
- Scène : il n'y a qu'un seul `scene.ts` par TP. Tout texte affiché (titres et textes d'étapes, libellés de curseurs, axes, mesures, étiquettes) s'écrit `L('texte français', 'English text')` (import depuis `src/lib/anim.ts`). `L()` et `fmt()` suivent l'attribut `lang` de la page : `fmt()` écrit la virgule décimale en français et le point en anglais, ne jamais formater un nombre à la main.
- Anglais britannique (colour, metre, analyse), point décimal (dans le LaTeX : `20.0`, pas `20{,}0`), unités SI inchangées, « Terminale » non traduit.
- Titres de sections : Principe = Principle, Protocole = Method, Exploitation = Analysis, Questions = Questions, Sécurité = Safety, « Voir les réponses » = « Show answers » ; Exercice type = Worked example, À retenir = Key points, Erreurs fréquentes = Common mistakes, « Voir la correction » = « Show the solution ».
- Textes d'interface (navigation, boutons, libellés du lecteur) : dictionnaire `UI` de `src/i18n/index.ts`, une entrée par langue. Liens internes : toujours `lien(lang, '/chemin/')`, jamais de `href="/..."` en dur.
- Vérification : planche anglaise avec `node scripts/capture.mjs "dev/planche/<slug>/?lang=en" .captures/<slug>-planche-en.png`, page avec `node scripts/capture.mjs en/terminale/tp/<slug>/ .captures/<slug>-en.png`. Aucun texte français ne doit rester sur la page.

## Fichiers de référence

| Fichier | Rôle |
|---|---|
| `src/lib/scene.ts` | Types `Scene`, `Etape`, `Parametre`, `Image`, `Mesure` |
| `src/lib/anim.ts` | `clamp`, `lerp`, `remap`, `ease`, `seg`, `avancement`, `mix`, `L`, `fmt`, `rng`, `uid`, `el`, `set`, `texte`, `show`, `trace` |
| `src/i18n/index.ts` | `Lang`, `UI` (textes d'interface), `lien`, `actif` |
| `src/i18n/contenu.ts` | `lesCours`, `lesTp`, liens et chemins des fiches par langue |
| `src/lib/labkit.ts` | Matériel de laboratoire en SVG |
| `src/lib/graphique.ts` | Graphique partagé |
| `src/lib/palette.ts` | Couleurs et polices des scènes |
| `src/lib/kit3d.ts` | Contrat et outils des vues 3D (`definirScene3d`, `cercle`, `fleche`) |
| `src/tp/satellite-kepler/scene3d.ts` | Vue 3D de référence |
| `src/tp/titrage-ph-metrique/` | Scène, modèle et test de référence |
| `src/content/tp/terminale/titrage-ph-metrique.md` | Fiche de TP de référence |
| `src/content/cours/terminale/titrages.md` | Fiche de cours de référence |
