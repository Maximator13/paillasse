---
titre: "Lunette astronomique : un système afocal"
description: "Objectif, oculaire et image intermédiaire : comment deux lentilles convergentes grossissent un objet à l'infini, et calcul du grossissement."
niveau: terminale
theme: ondes
ordre: 22
duree: "25 min"
motsCles: ["lunette astronomique", "lentille mince", "système afocal", "grossissement", "image intermédiaire", "diamètre apparent"]
tp: ["lunette-astronomique"]
---

> **L'essentiel.** Une lunette astronomique associe deux lentilles convergentes : l'**objectif**, de grande distance focale, et l'**oculaire**, de petite distance focale. Le foyer image de l'objectif coïncide avec le foyer objet de l'oculaire : la lunette est **afocale**, elle donne d'un objet à l'infini une image à l'infini, vue sous un angle plus grand. Son grossissement vaut $G = \dfrac{f'_1}{f'_2}$.

## 1. Rappels sur les lentilles minces convergentes

Une **lentille mince convergente** est caractérisée par son centre optique $O$, son foyer objet $F$ et son foyer image $F'$, symétriques par rapport à $O$. Sa **distance focale** $f' = \overline{OF'}$ est positive.

Trois rayons particuliers permettent toute construction :

| Rayon incident | Rayon émergent |
|---|---|
| passant par le centre optique $O$ | non dévié |
| parallèle à l'axe optique | passe par le foyer image $F'$ |
| passant par le foyer objet $F$ | ressort parallèle à l'axe optique |

> **Relation de conjugaison.** Pour un objet $A$ sur l'axe et son image $A'$ :
>
> $$
> \frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'}
> $$
>

Le **grandissement** vaut $\gamma = \dfrac{\overline{A'B'}}{\overline{AB}} = \dfrac{\overline{OA'}}{\overline{OA}}$.

Deux cas limites sont essentiels pour la lunette :

- un objet **à l'infini** (rayons parallèles entre eux) donne une image dans le **plan focal image** ;
- un objet placé dans le **plan focal objet** donne une image **à l'infini** (rayons émergents parallèles entre eux).

Un rayon parallèle à l'axe optique converge en $F'$ ; plus généralement, des rayons parallèles entre eux, mais inclinés, convergent en un **foyer image secondaire**, situé à l'intersection du plan focal image et du rayon du faisceau qui passe par $O$.

## 2. Constitution de la lunette

Une lunette astronomique est formée de deux lentilles convergentes de même axe optique :

| Élément | Rôle | Distance focale |
|---|---|---|
| **Objectif** $L_1$ | tourné vers l'objet, il en forme une image réelle | grande : $f'_1$ de l'ordre du mètre |
| **Oculaire** $L_2$ | joue le rôle de loupe pour observer cette image | petite : $f'_2$ de quelques centimètres |

L'objet observé (astre) est si éloigné qu'on le considère **à l'infini** : les rayons issus d'un même point de l'objet arrivent parallèles entre eux.

> **Définition.** Un système optique est **afocal** s'il donne d'un objet à l'infini une image à l'infini. Pour la lunette, cela impose que le foyer image de l'objectif et le foyer objet de l'oculaire soient confondus : $F'_1 = F_2$.

Intérêt : l'œil normal observe une image à l'infini **sans accommoder**, donc sans fatigue. La longueur de la lunette vaut alors $O_1O_2 = f'_1 + f'_2$.

## 3. Image intermédiaire et construction du faisceau

On note $A$ un point de l'objet situé sur l'axe et $B$ un point situé hors de l'axe. Les rayons issus de $B$ arrivent sur l'objectif en faisant l'angle $\alpha$ avec l'axe optique (cet angle est le diamètre apparent de l'objet, défini au paragraphe 4).

La formation de l'image se fait en deux étapes :

$$
AB_{\,(\infty)} \xrightarrow{\ L_1\ } A_1B_1 \xrightarrow{\ L_2\ } A'B'_{\,(\infty)}
$$

1. **Par l'objectif.** L'objet étant à l'infini, son image $A_1B_1$, appelée **image intermédiaire**, se forme dans le plan focal image de l'objectif : $A_1 = F'_1$. Pour placer $B_1$, on trace le rayon issu de $B$ qui passe par $O_1$ : il n'est pas dévié et coupe le plan focal image en $B_1$. Tous les autres rayons du faisceau issu de $B$ convergent aussi en $B_1$. Cette image est **réelle et renversée**.
2. **Par l'oculaire.** $A_1B_1$ est dans le plan focal objet de l'oculaire (puisque $F'_1 = F_2$) : son image $A'B'$ est **à l'infini**. Pour trouver la direction du faisceau émergent, on trace le rayon issu de $B_1$ passant par $O_2$ : il n'est pas dévié, et tous les rayons émergents lui sont parallèles.

Pour construire le **faisceau** issu de $B$ et limité par l'objectif, on trace les deux rayons qui frappent les bords de $L_1$ : ils convergent en $B_1$, puis divergent jusqu'à l'oculaire, d'où ils ressortent parallèles au rayon $B_1O_2$. Le faisceau émergent est plus étroit et plus incliné que le faisceau incident.

Dans le plan focal image de l'objectif, la taille de l'image intermédiaire s'obtient dans le triangle $O_1F'_1B_1$ :

$$
\tan\alpha = \frac{A_1B_1}{f'_1} \quad\Longrightarrow\quad A_1B_1 \approx f'_1\,\alpha \quad (\alpha \text{ petit, en radian})
$$

## 4. Grossissement

L'objet est à l'infini : sa taille n'a pas de sens pour l'œil, seul compte l'angle sous lequel on le voit.

> **Définition.** Le **diamètre apparent** $\alpha$ d'un objet est l'angle sous lequel il est vu à l'œil nu. Le **grossissement** $G$ d'un instrument est le rapport entre le diamètre apparent $\alpha'$ de l'image vue à travers l'instrument et le diamètre apparent $\alpha$ de l'objet vu à l'œil nu :
>
> $$
> G = \frac{\alpha'}{\alpha}
> $$
>

Dans le triangle $O_2F_2B_1$, l'angle sous lequel l'image est vue à la sortie de l'oculaire vérifie :

$$
\tan\alpha' = \frac{A_1B_1}{f'_2} \quad\Longrightarrow\quad \alpha' \approx \frac{A_1B_1}{f'_2}
$$

> **Grossissement d'une lunette afocale.** Dans l'approximation des petits angles ($\tan\alpha \approx \alpha$, angles en radian) :
>
> $$
> G = \frac{\alpha'}{\alpha} = \frac{A_1B_1 / f'_2}{A_1B_1 / f'_1} = \frac{f'_1}{f'_2}
> $$
>

$G$ est sans unité. Pour grossir, il faut un objectif de **grande** distance focale et un oculaire de **petite** distance focale. Changer d'oculaire permet donc de changer de grossissement avec le même objectif.

L'image finale est **renversée** par rapport à l'objet : c'est sans gêne pour observer les astres, mais la lunette terrestre ajoute un système redresseur.

## Exercice type

Une lunette astronomique possède un objectif de distance focale $f'_1 = 900\ \mathrm{mm}$ et un oculaire de distance focale $f'_2 = 25\ \mathrm{mm}$. On observe la Lune, de diamètre apparent $\alpha = 9{,}0 \times 10^{-3}\ \mathrm{rad}$.

1. Quelle doit être la distance $O_1O_2$ entre les deux lentilles pour que la lunette soit afocale ?
2. Calculer la taille de l'image intermédiaire $A_1B_1$.
3. Calculer le grossissement $G$ puis le diamètre apparent $\alpha'$ de l'image de la Lune.

<details>
<summary>Voir la correction</summary>

1. La lunette est afocale si $F'_1 = F_2$, donc :

$$
O_1O_2 = f'_1 + f'_2 = 900 + 25 = 925\ \mathrm{mm}
$$

2. L'image intermédiaire se forme dans le plan focal image de l'objectif, et l'angle est petit :

$$
A_1B_1 = f'_1\,\alpha = 900 \times 9{,}0 \times 10^{-3} = 8{,}1\ \mathrm{mm}
$$

3. Le grossissement vaut :

$$
G = \frac{f'_1}{f'_2} = \frac{900}{25} = 36
$$

d'où $\alpha' = G\,\alpha = 36 \times 9{,}0 \times 10^{-3} = 0{,}32\ \mathrm{rad}$. On vérifie : $\alpha' = \dfrac{A_1B_1}{f'_2} = \dfrac{8{,}1}{25} = 0{,}32\ \mathrm{rad}$. La Lune est vue sous un angle 36 fois plus grand qu'à l'œil nu.

</details>

## À retenir

- Objectif et oculaire sont deux lentilles **convergentes** ; $f'_1 \gg f'_2$.
- Lunette **afocale** : $F'_1 = F_2$, objet et image à l'infini, longueur $f'_1 + f'_2$.
- L'**image intermédiaire** $A_1B_1$ est réelle, renversée, dans le plan focal image de l'objectif : $A_1B_1 \approx f'_1\,\alpha$.
- Construction : le rayon passant par le centre optique n'est pas dévié et donne la direction de tout le faisceau.
- Grossissement : $G = \dfrac{\alpha'}{\alpha} = \dfrac{f'_1}{f'_2}$.

## Erreurs fréquentes

- Confondre **grossissement** (rapport d'angles) et **grandissement** (rapport de tailles) : pour un objet à l'infini, seul le grossissement a un sens.
- Inverser les rôles : l'objectif a la plus **grande** distance focale, pas la plus petite.
- Exprimer les angles en degrés dans $A_1B_1 = f'_1\,\alpha$ : l'approximation des petits angles exige le **radian**.
- Dessiner un faisceau émergent convergent, ou parallèle à l'axe optique : à la sortie de l'oculaire, les rayons issus de $B$ sont **parallèles entre eux** et au rayon $B_1O_2$.
