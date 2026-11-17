---
titre: "Titrages : doser une espèce par une réaction chimique"
description: "Principe du titrage, équivalence, suivi pH-métrique et conductimétrique : la méthode pour déterminer une concentration inconnue."
niveau: terminale
theme: matiere
ordre: 3
duree: "25 min"
motsCles: ["titrage", "équivalence", "pH-métrie", "conductimétrie", "dosage"]
tp: ["titrage-ph-metrique", "titrage-conductimetrique"]
---

> **L'essentiel.** Titrer, c'est déterminer une quantité de matière en la faisant réagir totalement avec une espèce de concentration connue. Tout repose sur un instant précis, l'**équivalence**, où les réactifs ont été introduits dans les proportions stœchiométriques. On repère cette équivalence par le saut de pH (suivi pH-métrique), la rupture de pente de la conductivité (suivi conductimétrique) ou le virage d'un indicateur coloré.

## 1. Le principe d'un titrage

Un **dosage** détermine la concentration d'une espèce en solution. Quand il met en jeu une réaction chimique, on parle de **titrage** : c'est une méthode destructive, car l'espèce dosée est consommée. Dans un **titrage direct**, l'espèce à doser réagit directement avec le réactif titrant versé à la burette, sans réaction intermédiaire.

Deux solutions interviennent :

- la **solution titrée**, dans le bécher : elle contient l'espèce dont on cherche la concentration $C_A$. On en prélève un volume précis $V_A$ à la pipette jaugée ;
- la **solution titrante**, dans la burette graduée : sa concentration $C_B$ est connue avec précision.

La réaction qui sert de support au titrage doit être :

| Critère | Pourquoi |
|---|---|
| **Totale** | tout le réactif titré doit être consommé à l'équivalence |
| **Rapide** | chaque ajout doit agir immédiatement |
| **Unique** | le réactif titrant ne doit réagir qu'avec l'espèce titrée |

## 2. L'équivalence

Au début, le réactif titrant versé est entièrement consommé : il est **limitant**. Passé un certain volume, c'est le réactif titré qui a disparu et le titrant s'accumule.

> **Définition.** L'équivalence est l'état du système pour lequel les réactifs titré et titrant ont été introduits dans les **proportions stœchiométriques**. Les deux sont alors totalement consommés.

Pour une réaction de titrage d'équation $a\,\mathrm{A} + b\,\mathrm{B} \rightarrow \text{produits}$, la relation à l'équivalence s'écrit :

$$
\frac{n(\mathrm{A})_{\text{initial}}}{a} = \frac{n(\mathrm{B})_{\text{versé à l'équivalence}}}{b}
\qquad\text{soit}\qquad
\frac{C_A V_A}{a} = \frac{C_B V_E}{b}
$$

Dans le cas très courant où $a = b = 1$ :

$$
C_A = \frac{C_B\,V_E}{V_A}
$$

Tout l'enjeu expérimental est donc de repérer le **volume équivalent** $V_E$.

## 3. Titrage avec suivi pH-métrique

Quand la réaction support est **acido-basique**, le pH varie au cours du titrage. On relève le pH après chaque ajout et on trace $\mathrm{pH} = f(V)$.

La courbe présente un **saut de pH** : une variation brutale autour de l'équivalence. Deux méthodes permettent de lire $V_E$ :

1. **Méthode de la dérivée.** On trace $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$ en fonction de $V$ : son extremum (maximum si l'on verse une base, minimum si l'on verse un acide) a pour abscisse $V_E$.
2. **Méthode des tangentes.** On trace deux tangentes parallèles de part et d'autre du saut, puis la parallèle équidistante : elle coupe la courbe au point d'équivalence.

On peut aussi utiliser un **indicateur coloré** : sa zone de virage doit être contenue dans le saut de pH, donc contenir le pH à l'équivalence. L'équivalence est alors repérée par le changement de teinte de la solution. Pour le titrage d'un acide faible par la soude, le pH à l'équivalence est supérieur à 7 : la phénolphtaléine (zone de virage de 8,2 à 10,0) convient, alors que l'hélianthine (3,1 à 4,4) virerait bien avant l'équivalence.

## 4. Titrage avec suivi conductimétrique

Quand la réaction fait intervenir des **ions**, la conductivité $\sigma$ de la solution change au fil des ajouts. D'après la loi de Kohlrausch :

$$
\sigma = \sum_i \lambda_i\,[X_i]
$$

où $\lambda_i$ est la conductivité molaire ionique de l'ion $X_i$, avec $\sigma$ en $\mathrm{S \cdot m^{-1}}$, $\lambda_i$ en $\mathrm{S \cdot m^2 \cdot mol^{-1}}$ et $[X_i]$ en $\mathrm{mol \cdot m^{-3}}$ (et non en $\mathrm{mol \cdot L^{-1}}$). Avant et après l'équivalence, les ions dont la quantité varie ne sont pas les mêmes : la courbe $\sigma = f(V)$ est formée de **deux portions de droite** de pentes différentes. Leur point d'intersection a pour abscisse $V_E$.

Exemple : titrage de l'acide éthanoïque par la soude. Avant l'équivalence, chaque ion $\mathrm{HO^-}$ versé est consommé et remplacé par un ion $\mathrm{CH_3COO^-}$, tandis que des ions $\mathrm{Na^+}$ s'accumulent : $\sigma$ augmente lentement. Après l'équivalence, les ions $\mathrm{HO^-}$, de conductivité molaire ionique très élevée, s'accumulent avec les ions $\mathrm{Na^+}$ : $\sigma$ augmente beaucoup plus vite.

Pour que les portions soient bien des droites, on ajoute un grand volume d'eau dans le bécher : la dilution due aux ajouts devient négligeable.

## Exercice type

On titre $V_A = 20{,}0\ \mathrm{mL}$ de vinaigre dilué dix fois par de la soude à $C_B = 0{,}100\ \mathrm{mol \cdot L^{-1}}$. La réaction support est :

$$
\mathrm{CH_3COOH\,(aq) + HO^-\,(aq) \rightarrow CH_3COO^-\,(aq) + H_2O\,(l)}
$$

Le volume équivalent mesuré vaut $V_E = 13{,}6\ \mathrm{mL}$. Quelle est la concentration en acide éthanoïque du vinaigre commercial ?

<details>
<summary>Voir la correction</summary>

Les nombres stœchiométriques valent 1, donc à l'équivalence $C_A V_A = C_B V_E$ :

$$
C_A = \frac{0{,}100 \times 13{,}6}{20{,}0} = 6{,}80 \times 10^{-2}\ \mathrm{mol \cdot L^{-1}}
$$

Le vinaigre a été dilué dix fois : $C_{\text{vinaigre}} = 10 \times C_A = 0{,}680\ \mathrm{mol \cdot L^{-1}}$.

</details>

## À retenir

- Un titrage repose sur une réaction **totale, rapide et unique**.
- À l'équivalence, les réactifs sont dans les proportions stœchiométriques : $\dfrac{C_A V_A}{a} = \dfrac{C_B V_E}{b}$.
- Suivi pH-métrique : $V_E$ est l'abscisse de l'**extremum de la dérivée** $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$, ou se lit par la méthode des tangentes.
- Indicateur coloré : sa zone de virage doit être contenue dans le saut de pH.
- Suivi conductimétrique : $V_E$ est l'abscisse de la **rupture de pente**.

## Erreurs fréquentes

- Confondre **équivalence** et **neutralité** : le pH à l'équivalence ne vaut 7 (à 25 °C) que pour un titrage entre un acide fort et une base forte.
- Laisser la concentration en $\mathrm{mol \cdot L^{-1}}$ dans la loi de Kohlrausch : elle doit être en $\mathrm{mol \cdot m^{-3}}$.
- Oublier le **facteur de dilution** quand la solution a été diluée avant le titrage.
- Écrire $C_A V_A = C_B V_E$ sans vérifier les nombres stœchiométriques de l'équation.
