---
titre: "Titrage pH-métrique d'un acide par la soude"
description: "Suivez le pH pendant que la soude tombe goutte à goutte, repérez le saut de pH et déduisez la concentration de l'acide."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 3
duree: "1 h 30"
chapitre: titrages
objectifs:
  - "Réaliser un titrage avec suivi pH-métrique"
  - "Repérer l'équivalence par la méthode de la dérivée"
  - "Calculer une concentration à partir du volume équivalent"
materiel:
  - "Burette graduée de 25 mL et potence"
  - "Pipette jaugée de 20,0 mL et propipette"
  - "Bécher de 100 mL, agitateur magnétique"
  - "pH-mètre étalonné et sa sonde"
  - "Soude à 0,100 mol/L, solution d'acide éthanoïque"
  - "Phénolphtaléine"
---

## Principe

On cherche la concentration $C_A$ d'une solution d'acide éthanoïque. On la fait réagir avec une solution de soude de concentration connue $C_B$, selon la réaction totale et rapide :

$$
\mathrm{CH_3COOH\,(aq) + HO^-\,(aq) \rightarrow CH_3COO^-\,(aq) + H_2O\,(l)}
$$

Le pH de la solution est mesuré après chaque ajout de soude. Autour de l'équivalence, il varie brutalement : ce **saut de pH** permet de repérer le volume équivalent $V_E$.

## Protocole

1. Prélever $V_A = 20{,}0\ \mathrm{mL}$ de solution d'acide à la pipette jaugée et les verser dans le bécher. Ajouter le barreau aimanté et quelques gouttes de phénolphtaléine.
2. Rincer puis remplir la burette avec la soude, ajuster le zéro. Plonger la sonde du pH-mètre, en veillant à ce que le barreau ne la heurte pas. Lancer l'agitation.
3. Verser la soude millilitre par millilitre en relevant le pH à chaque fois. Resserrer les ajouts (tous les 0,2 mL) dès que le pH varie plus vite.
4. Tracer $\mathrm{pH} = f(V)$ puis la dérivée $\dfrac{\mathrm{dpH}}{\mathrm{d}V}$. Lire $V_E$ à l'abscisse du maximum de la dérivée (dans l'animation, elle est tracée en unité arbitraire sur l'axe du pH).
5. Calculer $C_A$.

## Exploitation

À l'équivalence, l'acide et les ions hydroxyde ont été introduits dans les proportions stœchiométriques :

$$
C_A V_A = C_B V_E \qquad\Longrightarrow\qquad C_A = \frac{C_B\,V_E}{V_A}
$$

Avec $V_E = 20{,}0\ \mathrm{mL}$, $C_B = 0{,}100\ \mathrm{mol \cdot L^{-1}}$ et $V_A = 20{,}0\ \mathrm{mL}$, on trouve $C_A = 0{,}100\ \mathrm{mol \cdot L^{-1}}$.

Deux lectures utiles sur la courbe :

- à la **demi-équivalence** ($V = V_E / 2$), le pH est égal au $\mathrm{p}K_A$ du couple, soit environ 4,8 ;
- à l'**équivalence**, le pH est supérieur à 7 : la solution contient la base conjuguée $\mathrm{CH_3COO^-}$.

## Questions

1. Pourquoi resserrer les ajouts autour de l'équivalence ?
2. Dans l'animation, diminuez la concentration de l'acide. Comment évolue $V_E$ ? Le pH initial ?
3. Augmentez le $\mathrm{p}K_A$ jusqu'à 6,5. Que devient le saut de pH ? Le titrage reste-t-il précis ?

<details>
<summary>Voir les réponses</summary>

1. Le pH varie très vite près de l'équivalence : des ajouts trop espacés feraient manquer le saut et dégraderaient la précision sur $V_E$.
2. $V_E$ est proportionnel à $C_A$ : il diminue. Le pH initial augmente légèrement, car la solution est moins acide.
3. Plus l'acide est faible, plus le saut de pH est réduit : le maximum de la dérivée est moins marqué et $V_E$ est repéré avec moins de précision.

</details>

## Sécurité

La soude est corrosive : blouse, lunettes et gants obligatoires. Rincer immédiatement à l'eau en cas de contact.
