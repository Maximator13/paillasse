---
titre: "Diffraction et interférences : quand les ondes se rencontrent"
description: "Angle caractéristique de diffraction, interférences constructives et destructives, fentes d'Young et interfrange : les propriétés propres aux ondes."
niveau: terminale
theme: ondes
ordre: 21
duree: "30 min"
motsCles: ["diffraction", "interférences", "fentes d'Young", "interfrange", "différence de chemin optique"]
tp: ["diffraction", "interferences-young"]
---

> **L'essentiel.** Une onde qui traverse une ouverture de taille comparable à sa longueur d'onde s'étale : c'est la **diffraction**, d'angle caractéristique $\theta = \lambda / a$. Deux ondes cohérentes qui se superposent s'ajoutent ou s'annulent selon leur **différence de chemin optique** : ce sont les **interférences**, qui donnent avec les fentes d'Young des franges régulièrement espacées de $i = \lambda D / b$.

## 1. La diffraction par une ouverture

Quand une onde (lumineuse, sonore, à la surface de l'eau) rencontre une ouverture ou un obstacle, elle ne se propage plus seulement en ligne droite : elle s'étale derrière l'ouverture. Ce phénomène est la **diffraction**.

> **Définition.** La diffraction est la modification de la direction de propagation d'une onde qui rencontre une ouverture ou un obstacle. Elle est d'autant plus marquée que la dimension $a$ de l'ouverture est proche de la longueur d'onde $\lambda$, ou plus petite qu'elle.

Elle ne change ni la fréquence, ni la longueur d'onde : seule la direction de propagation est modifiée.

Avec un laser éclairant une fente fine verticale, on observe sur un écran une **tache centrale** très lumineuse, étalée horizontalement (perpendiculairement à la fente), encadrée de taches secondaires moins intenses. Les zones sombres sont appelées extinctions.

> **Loi.** Pour une fente de largeur $a$ (ou un fil de diamètre $a$) éclairée par une onde de longueur d'onde $\lambda$, l'**écart angulaire** $\theta$ entre le milieu de la tache centrale et la première extinction vérifie :
>
> $$
> \theta = \frac{\lambda}{a}
> $$
>
> avec $\theta$ en radian, $\lambda$ et $a$ dans la même unité.

Conséquences directes :

- plus la fente est **étroite**, plus la tache centrale est **large** ;
- à fente donnée, la lumière rouge ($\lambda \approx 650\ \mathrm{nm}$) diffracte plus que la lumière bleue ($\lambda \approx 450\ \mathrm{nm}$).

Un fil de diamètre $a$ donne la même figure qu'une fente de même largeur (théorème de Babinet, admis, hors programme) : c'est ainsi qu'on mesure le diamètre d'un cheveu au laser.

## 2. Mesurer l'angle de diffraction

L'angle $\theta$ se déduit de la largeur $L$ de la tache centrale, mesurée sur un écran placé à la distance $D$ de la fente. La tache est symétrique : sa demi-largeur vaut $L/2$, et :

$$
\tan\theta = \frac{L/2}{D} = \frac{L}{2D}
$$

L'écran est très éloigné ($D \gg L$), donc $\theta$ est petit et $\tan\theta \approx \theta$ (en radian). En combinant avec la loi précédente :

$$
\theta = \frac{L}{2D} = \frac{\lambda}{a}
\qquad\text{soit}\qquad
L = \frac{2\lambda D}{a}
$$

La largeur $L$ est **inversement proportionnelle** à $a$. Expérimentalement, on trace $\theta$ en fonction de $1/a$ pour plusieurs fentes : on obtient une droite passant par l'origine, de coefficient directeur $\lambda$.

| Grandeur | Effet sur la tache centrale |
|---|---|
| $a$ diminue | $L$ augmente |
| $\lambda$ augmente | $L$ augmente |
| $D$ augmente | $L$ augmente, $\theta$ ne change pas |

## 3. Les interférences de deux ondes

Lorsque deux ondes se superposent en un même point, leurs effets s'additionnent. Pour obtenir une figure stable dans le temps, les deux sources doivent être **cohérentes** : elles émettent des ondes de **même fréquence** et présentent un **déphasage constant**. En pratique, on obtient deux sources cohérentes en dédoublant une source unique (deux fentes éclairées par le même laser).

> **Définition.** Les interférences sont le phénomène de superposition de deux ondes cohérentes, qui conduit à une amplitude résultante variable d'un point à l'autre de l'espace.

Au point $M$, l'onde issue de $S_2$ a parcouru un chemin différent de celle issue de $S_1$. On définit la **différence de chemin optique** (dans l'air, elle se confond avec la différence de distances) :

$$
\delta = S_2M - S_1M
$$

Deux cas extrêmes se présentent.

> **Interférences constructives.** Les ondes arrivent **en phase** en $M$ : l'amplitude est maximale. C'est le cas lorsque $\delta$ est un multiple entier de la longueur d'onde :
>
> $$
> \delta = k\,\lambda \qquad (k \in \mathbb{Z})
> $$

> **Interférences destructives.** Les ondes arrivent **en opposition de phase** en $M$ : l'amplitude est minimale (nulle si les deux ondes ont la même amplitude). C'est le cas lorsque $\delta$ est un multiple impair de la demi-longueur d'onde :
>
> $$
> \delta = \left(k + \frac{1}{2}\right)\lambda \qquad (k \in \mathbb{Z})
> $$

Ce résultat vaut pour toutes les ondes : deux haut-parleurs alimentés par le même générateur créent des zones de son fort et de silence relatif, deux pointes vibrant à la surface de l'eau dessinent des lignes immobiles.

## 4. Les fentes d'Young

Dans l'expérience des **fentes d'Young**, un laser éclaire deux fentes fines parallèles distantes de $b$. Chaque fente diffracte la lumière : les deux faisceaux diffractés se recouvrent et interfèrent. Sur un écran à la distance $D$ ($D \gg b$), on observe une alternance de **franges brillantes** (interférences constructives) et de **franges sombres** (interférences destructives), rectilignes et parallèles aux fentes.

Pour un point $M$ de l'écran situé à l'abscisse $x$ du centre de la figure, la différence de chemin optique s'écrit (approximation valable pour $b$ et $x$ petits devant $D$) :

$$
\delta = \frac{b\,x}{D}
$$

Les franges brillantes correspondent à $\delta = k\lambda$, donc à $x_k = k\,\dfrac{\lambda D}{b}$. Deux franges brillantes consécutives sont séparées d'une distance constante.

> **Définition.** L'**interfrange** $i$ est la distance entre les milieux de deux franges brillantes consécutives (ou de deux franges sombres consécutives) :
>
> $$
> i = \frac{\lambda\,D}{b}
> $$
>
> avec $i$, $\lambda$, $D$ et $b$ dans la même unité.

La frange centrale ($x = 0$, $\delta = 0$) est toujours brillante. Pour mesurer $i$ avec précision, on mesure la longueur occupée par **plusieurs** interfranges et on divise : l'incertitude relative s'en trouve réduite.

Les franges d'interférences n'apparaissent que là où les faisceaux diffractés par les deux fentes se recouvrent, essentiellement dans la tache centrale de diffraction : la figure observée combine les deux phénomènes.

## Exercice type

Un laser de longueur d'onde $\lambda = 650\ \mathrm{nm}$ éclaire successivement :

1. une fente simple de largeur $a = 0{,}10\ \mathrm{mm}$ ;
2. deux fentes d'Young distantes de $b = 0{,}50\ \mathrm{mm}$.

L'écran est à $D = 2{,}00\ \mathrm{m}$. Calculer l'écart angulaire $\theta$ et la largeur $L$ de la tache centrale dans le premier cas, puis l'interfrange $i$ dans le second. Quelle longueur occupent 10 interfranges ?

<details>
<summary>Voir la correction</summary>

**Diffraction.** On convertit en mètres : $\lambda = 650 \times 10^{-9}\ \mathrm{m}$, $a = 1{,}0 \times 10^{-4}\ \mathrm{m}$.

$$
\theta = \frac{\lambda}{a} = \frac{650 \times 10^{-9}}{1{,}0 \times 10^{-4}} = 6{,}5 \times 10^{-3}\ \mathrm{rad}
$$

$$
L = 2D\theta = 2 \times 2{,}00 \times 6{,}5 \times 10^{-3} = 2{,}6 \times 10^{-2}\ \mathrm{m} = 2{,}6\ \mathrm{cm}
$$

**Interférences.** Avec $b = 5{,}0 \times 10^{-4}\ \mathrm{m}$ :

$$
i = \frac{\lambda D}{b} = \frac{650 \times 10^{-9} \times 2{,}00}{5{,}0 \times 10^{-4}} = 2{,}6 \times 10^{-3}\ \mathrm{m} = 2{,}6\ \mathrm{mm}
$$

Dix interfranges occupent $10\,i = 26\ \mathrm{mm}$, une longueur facile à mesurer à la règle avec une bonne précision relative.

</details>

## À retenir

- La diffraction est d'autant plus marquée que l'ouverture est petite devant la longueur d'onde : $\theta = \dfrac{\lambda}{a}$, avec $\theta$ en radian.
- Avec un écran lointain : $\theta \approx \dfrac{L}{2D}$, donc $L = \dfrac{2\lambda D}{a}$.
- Deux ondes cohérentes interfèrent : **constructivement** si $\delta = k\lambda$, **destructivement** si $\delta = \left(k + \frac{1}{2}\right)\lambda$.
- Fentes d'Young : interfrange $i = \dfrac{\lambda D}{b}$.

## Erreurs fréquentes

- Utiliser la largeur totale $L$ au lieu de la demi-largeur $L/2$ dans $\tan\theta$ : on obtient un angle deux fois trop grand.
- Exprimer $\theta$ en degrés dans $\theta = \lambda/a$ : la relation n'est valable qu'en **radian**.
- Mélanger les unités : $\lambda$ en nanomètre, $a$ en millimètre et $D$ en mètre doivent être convertis dans la même unité avant le calcul.
- Confondre $a$ (largeur d'une fente, qui fixe la diffraction) et $b$ (distance entre les deux fentes, qui fixe l'interfrange).
- Croire que deux sources quelconques interfèrent : sans cohérence (même fréquence, déphasage constant), la figure n'est pas stable et ne s'observe pas.
