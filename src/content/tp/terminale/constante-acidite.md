---
titre: "Constante d'acidité d'un couple acide-base"
description: "Mesurez le pH de cinq mélanges d'un acide et de sa base conjuguée, tracez la droite obtenue et lisez-y le pKa du couple."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 7
duree: "1 h"
chapitre: "force-acides-bases"
objectifs:
  - "Préparer des mélanges d'un acide faible et de sa base conjuguée en proportions connues"
  - "Vérifier la relation entre le pH et le rapport des concentrations des deux formes"
  - "Déterminer graphiquement le pKa d'un couple acide-base"
  - "Exploiter un diagramme de prédominance"
materiel:
  - "Cinq béchers de 50 mL numérotés"
  - "Deux burettes graduées de 25 mL"
  - "pH-mètre, sonde et solutions tampons d'étalonnage"
  - "Solution d'acide éthanoïque à 0,10 mol/L"
  - "Solution d'éthanoate de sodium à 0,10 mol/L"
  - "Pissette d'eau distillée et papier absorbant"
---

## Principe

Un acide faible $\mathrm{AH}$ réagit de façon limitée avec l'eau :

$$
\mathrm{AH\,(aq) + H_2O\,(l) \rightleftharpoons A^-\,(aq) + H_3O^+\,(aq)}
$$

La constante d'acidité $K_A$ du couple $\mathrm{AH/A^-}$ relie les concentrations à l'équilibre. En passant au logarithme, on obtient :

$$
\mathrm{pH} = \mathrm{p}K_A + \log\frac{[\mathrm{A^-}]}{[\mathrm{AH}]}
$$

On mélange un volume $V_A$ de solution d'acide et un volume $V_B$ de solution de sa base conjuguée, de même concentration $C$. Les deux espèces réagissent très peu avec l'eau, donc le rapport $\dfrac{[\mathrm{A^-}]}{[\mathrm{AH}]}$ est pratiquement égal à $\dfrac{V_B}{V_A}$.

## Protocole

1. Préparer cinq mélanges de 20 mL avec les volumes $V_A + V_B$ suivants (en mL) : 18 + 2, 15 + 5, 10 + 10, 5 + 15 et 2 + 18. Homogénéiser.
2. Étalonner le pH-mètre avec les solutions tampons. Rincer la sonde à l'eau distillée et l'essuyer délicatement.
3. Plonger la sonde dans chaque bécher, attendre la stabilisation et relever le pH. Rincer la sonde entre deux mesures.
4. Placer les points $\mathrm{pH} = f\!\left(\log\dfrac{V_B}{V_A}\right)$ et tracer la droite qui passe au plus près des points.
5. Construire le diagramme de prédominance du couple.

## Exploitation

Avec le couple acide éthanoïque/ion éthanoate et $C = 0{,}10\ \mathrm{mol \cdot L^{-1}}$, l'animation donne :

| $V_A$ (mL) | $V_B$ (mL) | $V_B / V_A$ | $\log(V_B/V_A)$ | pH |
|---|---|---|---|---|
| 18 | 2 | 0,11 | $-0{,}95$ | 3,85 |
| 15 | 5 | 0,33 | $-0{,}48$ | 4,32 |
| 10 | 10 | 1,00 | 0,00 | 4,80 |
| 5 | 15 | 3,00 | 0,48 | 5,28 |
| 2 | 18 | 9,00 | 0,95 | 5,75 |

Les points sont alignés sur une droite de pente 1,00, ce qui valide la relation. Son ordonnée à l'origine vaut $\mathrm{p}K_A = 4{,}80$, d'où :

$$
K_A = 10^{-\mathrm{p}K_A} = 10^{-4{,}80} = 1{,}6 \times 10^{-5}
$$

Le mélange équimolaire ($V_A = V_B$) donne directement $\mathrm{pH} = \mathrm{p}K_A$. On en déduit le diagramme de prédominance : si $\mathrm{pH} < \mathrm{p}K_A$, l'acide $\mathrm{AH}$ prédomine ; si $\mathrm{pH} > \mathrm{p}K_A$, c'est la base $\mathrm{A^-}$.

## Questions

1. Pourquoi les deux solutions mères doivent-elles avoir la même concentration ?
2. Dans l'animation, réglez le $\mathrm{p}K_A$ sur 3,8 (couple de l'acide méthanoïque). Comment la droite et la frontière du diagramme de prédominance évoluent-elles ?
3. Avec un $\mathrm{p}K_A$ de 3,5, diminuez la concentration jusqu'à $0{,}002\ \mathrm{mol \cdot L^{-1}}$. Que deviennent la pente et le $\mathrm{p}K_A$ mesuré ? Expliquez.

<details>
<summary>Voir les réponses</summary>

1. Les deux espèces sont alors diluées de la même façon dans le mélange : le rapport des concentrations se réduit au rapport des volumes $V_B / V_A$, facile à connaître avec précision.
2. La droite garde une pente très proche de 1 (0,97) mais se décale d'une unité de pH vers le bas : son ordonnée à l'origine vaut 3,82, soit 3,8 à la précision des mesures. La frontière du diagramme se déplace à $\mathrm{pH} = 3{,}8$, et le domaine de $\mathrm{AH}$ se réduit.
3. La pente chute vers 0,67 et l'ordonnée à l'origine monte vers 3,8 : les points ne suivent plus la relation. En solution très diluée, l'acide se dissocie de façon notable, donc le rapport réel $[\mathrm{A^-}]/[\mathrm{AH}]$ n'est plus égal à $V_B / V_A$. La méthode exige des solutions assez concentrées.

</details>

## Sécurité

Les solutions utilisées sont peu concentrées : blouse et lunettes suffisent. La sonde du pH-mètre est fragile, elle ne doit ni toucher le fond du bécher ni rester à l'air libre.
