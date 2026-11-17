---
titre: "Dosage par étalonnage spectrophotométrique"
description: "Préparez une gamme étalon de bleu patenté, mesurez les absorbances, tracez la droite d'étalonnage et lisez la concentration inconnue par report."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 1
duree: "1 h 30"
chapitre: "analyse-physique"
objectifs:
  - "Préparer une gamme étalon par dilution d'une solution mère"
  - "Mesurer une absorbance après avoir fait le blanc"
  - "Tracer une droite d'étalonnage et vérifier la loi de Beer-Lambert"
  - "Déterminer une concentration inconnue par report sur la droite"
materiel:
  - "Spectrophotomètre et cuves de 1,0 cm d'épaisseur"
  - "Solution mère de bleu patenté V (E131) à 50 µmol/L"
  - "Cinq fioles jaugées de 50,0 mL"
  - "Burette graduée de 25,0 mL ou pipette graduée de 10,0 mL"
  - "Eau distillée, béchers, tubes à essai et portoir"
  - "Solution X de bleu patenté de concentration inconnue"
---

## Principe

Une solution colorée absorbe une partie de la lumière qui la traverse. Le spectrophotomètre compare l'intensité incidente $I_0$ et l'intensité transmise $I$, et affiche l'absorbance $A = \log(I_0 / I)$, grandeur sans unité.

Pour une solution diluée, l'absorbance est proportionnelle à la concentration de l'espèce colorée : c'est la **loi de Beer-Lambert**.

$$
A = \varepsilon \, l \, C = k\,C
$$

$\varepsilon$ est le coefficient d'absorption molaire (il dépend de l'espèce et de la longueur d'onde), $l$ l'épaisseur de la cuve. En mesurant l'absorbance de solutions de concentrations connues, on obtient une **droite d'étalonnage** qui sert ensuite à lire la concentration d'une solution inconnue : aucune réaction chimique n'est nécessaire, le dosage est non destructif.

## Protocole

1. Préparer la gamme étalon : prélever 2,0 ; 4,0 ; 6,0 ; 8,0 et 10,0 mL de solution mère, verser dans les fioles de 50,0 mL, compléter à l'eau distillée jusqu'au trait de jauge et homogénéiser.
2. Régler le spectrophotomètre sur $\lambda = 640\ \mathrm{nm}$, maximum d'absorption du bleu patenté. Faire le blanc avec une cuve d'eau distillée.
3. Mesurer l'absorbance de chaque solution fille, de la moins concentrée à la plus concentrée, en rinçant la cuve avec la solution à mesurer.
4. Placer les points $(C\,;A)$ et tracer la droite passant par l'origine qui s'en approche le mieux.
5. Mesurer l'absorbance $A_X$ de la solution X dans les mêmes conditions et la reporter sur la droite.
6. Lire $C_X$ en abscisse et conclure.

## Exploitation

La dilution donne la concentration de chaque solution fille : $C_f = \dfrac{C_m V_m}{V_f}$, soit $4{,}0\ \mathrm{\mu mol \cdot L^{-1}}$ pour un prélèvement de 4,0 mL.

Les points sont alignés avec l'origine, aux incertitudes de préparation près. La pente de la droite vaut :

$$
k = \varepsilon\, l = 1{,}06 \times 10^{5}\ \mathrm{L \cdot mol^{-1}}
$$

Pour la solution X, on mesure $A_X = 0{,}678$. Le report sur la droite, ou le calcul $C_X = A_X / k$, donne :

$$
C_X = \frac{0{,}678}{1{,}06 \times 10^{5}}\ \mathrm{mol \cdot L^{-1}}
$$

soit $C_X = 6{,}4 \times 10^{-6}\ \mathrm{mol \cdot L^{-1}} = 6{,}4\ \mathrm{\mu mol \cdot L^{-1}}$.

Le résultat n'est valable que si $A_X$ se situe dans le domaine couvert par la gamme : au-delà, on dilue la solution X avant de la mesurer.

## Questions

1. Pourquoi faire le blanc avant les mesures ?
2. Dans l'animation, éloignez la longueur d'onde de 640 nm. Que devient la pente de la droite ? Pourquoi travaille-t-on au maximum d'absorption ?
3. Faites varier l'épaisseur de la cuve. Comment évoluent l'absorbance $A_X$, la pente $k$ et la concentration lue ?

<details>
<summary>Voir les réponses</summary>

1. La cuve et le solvant absorbent un peu de lumière. Le blanc règle l'absorbance à zéro pour que la valeur affichée ne soit due qu'à l'espèce colorée.
2. La pente diminue, car $\varepsilon$ est plus faible (lire la valeur de $k$ affichée et les graduations de l'axe des ordonnées, dont l'échelle s'adapte) : pour un même écart de concentration, l'écart d'absorbance est plus petit et la lecture moins précise. Au maximum d'absorption, la sensibilité est la meilleure.
3. $A_X$ et $k$ sont proportionnelles à $l$ : elles varient ensemble, et leur rapport $C_X = A_X / k$ ne change pas. La gamme et l'inconnue doivent simplement être mesurées avec la même cuve.

</details>

## Sécurité

Le bleu patenté est un colorant alimentaire, sans danger aux concentrations utilisées, mais très tachant : blouse conseillée. Manipuler les cuves par leurs faces dépolies et les essuyer avant de les placer dans l'appareil.
