---
titre: "Force des acides et des bases"
description: "Constante d'acidité, produit ionique de l'eau, taux d'avancement, diagrammes de prédominance, indicateurs colorés et solutions tampon."
niveau: terminale
theme: matiere
ordre: 9
duree: "30 min"
motsCles: ["Ka", "pKa", "produit ionique de l'eau", "taux d'avancement", "diagramme de prédominance", "indicateur coloré", "solution tampon", "acide alpha-aminé"]
tp: ["constante-acidite"]
---

> **L'essentiel.** Un acide est d'autant plus fort qu'il cède facilement son proton à l'eau. Cette aptitude se mesure par la **constante d'acidité** $K_A$ (ou par $\mathrm{p}K_A$). Un acide fort réagit totalement avec l'eau ($\tau = 1$), un acide faible partiellement ($\tau < 1$). La comparaison du pH au $\mathrm{p}K_A$ indique quelle forme du couple prédomine : c'est la clé des indicateurs colorés, des acides aminés et des solutions tampon.

## 1. Constante d'acidité et produit ionique de l'eau

Un acide $\mathrm{HA}$ réagit avec l'eau selon l'équilibre :

$$
\mathrm{HA\,(aq) + H_2O\,(l) \rightleftarrows A^-\,(aq) + H_3O^+\,(aq)}
$$

> **Définition.** La constante d'acidité $K_A$ du couple $\mathrm{HA/A^-}$ est la constante d'équilibre de cette réaction :
>
> $$
> K_A = \frac{[\mathrm{A^-}]_{\text{éq}}\,[\mathrm{H_3O^+}]_{\text{éq}}}{[\mathrm{HA}]_{\text{éq}}\,c^\circ} \qquad \text{et} \qquad \mathrm{p}K_A = -\log K_A
> $$
>
> avec $c^\circ = 1\ \mathrm{mol \cdot L^{-1}}$. $K_A$ ne dépend que de la température.

Plus $K_A$ est grand (donc plus $\mathrm{p}K_A$ est petit), plus l'acide est dissocié : **l'acide est plus fort**. Sa base conjuguée est alors plus faible.

L'eau est un ampholyte : elle subit l'**autoprotolyse** $\mathrm{2\,H_2O\,(l) \rightleftarrows H_3O^+\,(aq) + HO^-\,(aq)}$.

> **Produit ionique de l'eau.** Dans toute solution aqueuse :
>
> $$
> K_e = \frac{[\mathrm{H_3O^+}]\,[\mathrm{HO^-}]}{c^{\circ 2}} = 1{,}0 \times 10^{-14} \quad \text{à } 25\ \mathrm{^\circ C}, \qquad \mathrm{p}K_e = 14{,}0
> $$

Une solution est neutre si $[\mathrm{H_3O^+}] = [\mathrm{HO^-}]$, soit $\mathrm{pH} = 7{,}0$ à $25\ \mathrm{^\circ C}$. Elle est acide si $\mathrm{pH} < 7{,}0$ et basique si $\mathrm{pH} > 7{,}0$.

Les couples de l'eau fixent les bornes de l'échelle : $\mathrm{H_3O^+/H_2O}$ a un $\mathrm{p}K_A$ de $0$ et $\mathrm{H_2O/HO^-}$ un $\mathrm{p}K_A$ de $14$.

## 2. Acides et bases forts ou faibles

> **Définition.** Un acide (ou une base) est **fort** dans l'eau si sa réaction avec l'eau est **totale**. Il est **faible** si elle est limitée (équilibre).

Une base faible $\mathrm{A^-}$ réagit avec l'eau selon $\mathrm{A^-\,(aq) + H_2O\,(l) \rightleftarrows HA\,(aq) + HO^-\,(aq)}$.

Pour une concentration apportée $C$, on compare l'avancement final $x_f$ à l'avancement maximal $x_{\max}$ grâce au **taux d'avancement final** :

$$
\tau = \frac{x_f}{x_{\max}} \qquad \text{pour un acide : } \tau = \frac{[\mathrm{H_3O^+}]_f}{C} = \frac{c^\circ \times 10^{-\mathrm{pH}}}{C}
$$

| | Acide fort | Acide faible | Base forte | Base faible |
|---|---|---|---|---|
| Réaction avec l'eau | totale, $\tau = 1$ | limitée, $\tau < 1$ | totale, $\tau = 1$ | limitée, $\tau < 1$ |
| Exemple | $\mathrm{HCl}$ | $\mathrm{CH_3COOH}$ | $\mathrm{HO^-}$ (soude) | $\mathrm{NH_3}$ |
| pH (concentration $C$) | $\mathrm{pH} = -\log \dfrac{C}{c^\circ}$ | $\mathrm{pH} > -\log \dfrac{C}{c^\circ}$ | $\mathrm{pH} = 14 + \log \dfrac{C}{c^\circ}$ | $\mathrm{pH} < 14 + \log \dfrac{C}{c^\circ}$ |

Pour un acide faible, $\tau$ augmente quand on dilue la solution : la dilution favorise la dissociation. Pour comparer la force de deux acides, on mesure le pH de solutions de **même concentration** : le plus fort donne le pH le plus bas.

## 3. Diagrammes de prédominance et de distribution

En prenant le logarithme de l'expression de $K_A$, on obtient une relation entre pH et $\mathrm{p}K_A$ :

$$
\mathrm{pH} = \mathrm{p}K_A + \log \frac{[\mathrm{A^-}]}{[\mathrm{HA}]}
$$

On en déduit :

- si $\mathrm{pH} < \mathrm{p}K_A$, alors $[\mathrm{HA}] > [\mathrm{A^-}]$ : la **forme acide prédomine** ;
- si $\mathrm{pH} = \mathrm{p}K_A$, les deux formes sont en concentrations égales ;
- si $\mathrm{pH} > \mathrm{p}K_A$, la **forme basique prédomine**.

Le **diagramme de prédominance** résume ces cas sur un axe gradué en pH, coupé à la valeur du $\mathrm{p}K_A$ : $\mathrm{HA}$ à gauche, $\mathrm{A^-}$ à droite.

Le **diagramme de distribution** est plus précis : il représente les pourcentages de chaque forme en fonction du pH. Pour la forme acide :

$$
\%\,\mathrm{HA} = \frac{100}{1 + 10^{\,\mathrm{pH} - \mathrm{p}K_A}}
$$

Les deux courbes se croisent à 50 % pour $\mathrm{pH} = \mathrm{p}K_A$ : c'est une méthode graphique pour **lire un $\mathrm{p}K_A$**. Une forme est largement majoritaire (plus de 90 %) dès que le pH s'écarte d'une unité du $\mathrm{p}K_A$.

## 4. Indicateurs colorés et acides alpha-aminés

> **Définition.** Un indicateur coloré acido-basique est un couple $\mathrm{HIn/In^-}$ dont les deux formes ont des **couleurs différentes**.

En première approximation, la couleur de la forme acide s'observe pour $\mathrm{pH} < \mathrm{p}K_A - 1$, celle de la forme basique pour $\mathrm{pH} > \mathrm{p}K_A + 1$. Entre les deux s'étend la **zone de virage**, où la teinte est un mélange.

| Indicateur | Forme acide | Zone de virage | Forme basique |
|---|---|---|---|
| Hélianthine | rouge | $3{,}1$ à $4{,}4$ | jaune |
| Bleu de bromothymol | jaune | $6{,}0$ à $7{,}6$ | bleu |
| Phénolphtaléine | incolore | $8{,}2$ à $10{,}0$ | rose |

Un **acide $\alpha$-aminé** porte sur le même carbone un groupe carboxyle $-\mathrm{COOH}$ et un groupe amine $-\mathrm{NH_2}$. Il possède donc deux couples acide-base. Pour la glycine :

- $\mathrm{^+H_3N{-}CH_2{-}COOH / {}^+H_3N{-}CH_2{-}COO^-}$, de $\mathrm{p}K_{A1} = 2{,}3$ ;
- $\mathrm{^+H_3N{-}CH_2{-}COO^- / H_2N{-}CH_2{-}COO^-}$, de $\mathrm{p}K_{A2} = 9{,}6$.

Le diagramme de prédominance comporte trois domaines : la forme cationique pour $\mathrm{pH} < 2{,}3$, l'**amphion** (ou zwitterion) $\mathrm{^+H_3N{-}CH_2{-}COO^-}$ entre $2{,}3$ et $9{,}6$, la forme anionique au-delà. Au pH physiologique, l'amphion prédomine.

## 5. Solutions tampon

> **Définition.** Une solution tampon est une solution dont le pH varie **peu** par ajout modéré d'acide ou de base, ou par dilution.

On la prépare en mélangeant un acide faible et sa base conjuguée en quantités voisines : le pH vaut alors environ $\mathrm{p}K_A$. Un ajout d'ions $\mathrm{H_3O^+}$ est consommé par $\mathrm{A^-}$, un ajout d'ions $\mathrm{HO^-}$ par $\mathrm{HA}$ : le rapport $[\mathrm{A^-}]/[\mathrm{HA}]$ change peu, donc le pH aussi.

Le sang est tamponné à $\mathrm{pH} = 7{,}4$, principalement par le couple $\mathrm{CO_2,H_2O/HCO_3^-}$ ($\mathrm{p}K_A = 6{,}1$). Les solutions tampon servent aussi à étalonner les pH-mètres ($\mathrm{pH} = 4{,}0$, $7{,}0$ et $10{,}0$).

## Exercice type

On prépare une solution d'acide éthanoïque $\mathrm{CH_3COOH}$ de concentration apportée $C = 1{,}0 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}$. Son pH mesuré vaut $3{,}4$.

1. Calculer le taux d'avancement final. L'acide est-il fort ou faible ?
2. En déduire $K_A$ et $\mathrm{p}K_A$ du couple $\mathrm{CH_3COOH/CH_3COO^-}$.
3. Quelle forme prédomine dans la solution ?

<details>
<summary>Voir la correction</summary>

1. $[\mathrm{H_3O^+}]_f = 10^{-3{,}4} = 4{,}0 \times 10^{-4}\ \mathrm{mol \cdot L^{-1}}$, d'où :

$$
\tau = \frac{4{,}0 \times 10^{-4}}{1{,}0 \times 10^{-2}} = 4{,}0 \times 10^{-2} = 4{,}0\ \%
$$

$\tau < 1$ : la réaction avec l'eau est limitée, l'acide éthanoïque est un **acide faible**.

2. D'après l'équation, $[\mathrm{CH_3COO^-}]_f = [\mathrm{H_3O^+}]_f$ et $[\mathrm{CH_3COOH}]_f = C - [\mathrm{H_3O^+}]_f = 9{,}6 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$ :

$$
K_A = \frac{(4{,}0 \times 10^{-4})^2}{9{,}6 \times 10^{-3}} = 1{,}7 \times 10^{-5} \qquad \mathrm{p}K_A = -\log(1{,}7 \times 10^{-5}) = 4{,}8
$$

3. $\mathrm{pH} = 3{,}4 < \mathrm{p}K_A = 4{,}8$ : la forme acide $\mathrm{CH_3COOH}$ prédomine (elle représente 96 % de l'acide apporté, ce que confirme $\tau = 4{,}0\ \%$).

</details>

## À retenir

- $K_A = \dfrac{[\mathrm{A^-}][\mathrm{H_3O^+}]}{[\mathrm{HA}]\,c^\circ}$ : plus $\mathrm{p}K_A$ est petit, plus l'acide est fort.
- $K_e = \dfrac{[\mathrm{H_3O^+}][\mathrm{HO^-}]}{c^{\circ 2}} = 1{,}0 \times 10^{-14}$ à $25\ \mathrm{^\circ C}$.
- Acide ou base **fort** : $\tau = 1$ ; **faible** : $\tau < 1$.
- $\mathrm{pH} = \mathrm{p}K_A + \log \dfrac{[\mathrm{A^-}]}{[\mathrm{HA}]}$ : forme acide si $\mathrm{pH} < \mathrm{p}K_A$, forme basique si $\mathrm{pH} > \mathrm{p}K_A$.
- Un indicateur coloré vire autour de son $\mathrm{p}K_A$ ; une solution tampon a un pH proche du $\mathrm{p}K_A$ du couple qui la compose.

## Erreurs fréquentes

- Croire qu'un acide faible est un acide dilué : la force dépend de $K_A$, pas de la concentration.
- Appliquer $\mathrm{pH} = -\log C$ à un acide faible : cette formule ne vaut que pour un acide fort.
- Inverser le diagramme de prédominance : la forme **acide** est du côté des **petits** pH.
- Oublier que $K_e$, $K_A$ et donc la neutralité ($\mathrm{pH} = 7$) dépendent de la température.
