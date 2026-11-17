---
titre: "Titrage conductimétrique d'un sérum physiologique"
description: "Suivez la conductivité pendant l'ajout de nitrate d'argent, repérez la rupture de pente et retrouvez la concentration en chlorure de sodium du sérum."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 2
duree: "1 h 30"
chapitre: "titrages"
objectifs:
  - "Réaliser un titrage avec suivi conductimétrique"
  - "Interpréter le changement de pente avec la loi de Kohlrausch"
  - "Repérer l'équivalence à l'intersection de deux portions de droite"
  - "Calculer une concentration et la comparer à l'indication de l'étiquette"
materiel:
  - "Burette graduée de 25 mL et potence"
  - "Pipette jaugée de 10,0 mL et propipette"
  - "Bécher de 400 mL, agitateur magnétique"
  - "Conductimètre étalonné et sa cellule"
  - "Sérum physiologique, pissette d'eau distillée"
  - "Solution de nitrate d'argent à 0,100 mol/L"
---

## Principe

Le sérum physiologique est une solution de chlorure de sodium annoncée à 9 g/L. On titre ses ions chlorure par une solution de nitrate d'argent de concentration connue $C_1$. La réaction support est une précipitation, totale et rapide :

$$
\mathrm{Ag^+\,(aq) + Cl^-\,(aq) \rightarrow AgCl\,(s)}
$$

Aucune espèce n'est colorée et le pH ne varie pas : on suit la **conductivité** $\sigma$ de la solution. D'après la loi de Kohlrausch, chaque ion y contribue en proportion de sa concentration :

$$
\sigma = \sum_i \lambda_i\,[X_i]
$$

Les ions $\mathrm{Na^+}$ sont spectateurs. Avant l'équivalence, chaque ion $\mathrm{Cl^-}$ consommé est remplacé par un ion $\mathrm{NO_3^-}$ un peu moins conducteur : $\sigma$ diminue faiblement. Après l'équivalence, les ions $\mathrm{Ag^+}$ et $\mathrm{NO_3^-}$ s'accumulent : $\sigma$ augmente nettement.

| Ion | $\mathrm{Na^+}$ | $\mathrm{Cl^-}$ | $\mathrm{Ag^+}$ | $\mathrm{NO_3^-}$ |
|---|---|---|---|---|
| $\lambda$ en $\mathrm{mS \cdot m^2 \cdot mol^{-1}}$ | 5,01 | 7,63 | 6,19 | 7,14 |

## Protocole

1. Prélever $V_0 = 10{,}0\ \mathrm{mL}$ de sérum à la pipette jaugée, les verser dans le bécher puis ajouter environ 200 mL d'eau distillée.
2. Remplir la burette de nitrate d'argent et ajuster le zéro. Plonger la cellule du conductimètre, lancer l'agitation et relever la conductivité initiale.
3. Verser la solution titrante millilitre par millilitre en relevant $\sigma$ après chaque ajout : la solution se trouble, la conductivité baisse lentement.
4. Poursuivre jusqu'à 25 mL : la conductivité remonte franchement.
5. Tracer $\sigma = f(V)$, modéliser chaque série de points par une droite et lire $V_E$ à l'abscisse de leur intersection.
6. Calculer la concentration $C_0$ du sérum.

## Exploitation

Avec les réglages par défaut, la conductivité passe de 92,7 mS/m à 83,0 mS/m à l'équivalence, puis atteint 134,1 mS/m pour 25 mL versés. Les deux droites se coupent en $V_E \approx 15{,}3\ \mathrm{mL}$. À l'équivalence, les réactifs ont été introduits dans les proportions stœchiométriques :

$$
C_0 V_0 = C_1 V_E \qquad\Longrightarrow\qquad C_0 = \frac{C_1\,V_E}{V_0} = \frac{0{,}100 \times 15{,}3}{10{,}0} = 0{,}153\ \mathrm{mol \cdot L^{-1}}
$$

La concentration en masse vaut $t = C_0 \times M(\mathrm{NaCl}) = 0{,}153 \times 58{,}4 = 8{,}9\ \mathrm{g \cdot L^{-1}}$, soit un écart inférieur à 1 % avec les 9 g/L de l'étiquette.

## Questions

1. Pourquoi n'est-il pas nécessaire de resserrer les mesures autour de l'équivalence, contrairement à un titrage pH-métrique ?
2. Dans l'animation, faites varier la concentration en ions chlorure. Que devient le point de rupture ? Les pentes changent-elles beaucoup ?
3. Réduisez le volume d'eau distillée à 50 mL. Qu'observe-t-on sur les points et sur la valeur de $V_E$ ?

<details>
<summary>Voir les réponses</summary>

1. L'équivalence est repérée par l'intersection de deux droites tracées avec des points éloignés d'elle : quelques mesures régulières de part et d'autre suffisent.
2. $V_E$ est proportionnel à $C_0$ : la rupture se déplace vers la droite quand la concentration augmente. Les pentes changent peu, car elles dépendent surtout de $C_1$ et des conductivités molaires ioniques.
3. Le volume versé n'est plus négligeable devant le volume total : la dilution courbe les deux portions, les droites modèles s'ajustent moins bien et $V_E$ est sous-estimé (environ 15,1 mL). D'où l'ajout d'un grand volume d'eau.

</details>

## Sécurité

Le nitrate d'argent est corrosif, tache la peau et est toxique pour les organismes aquatiques : blouse, lunettes et gants, récupération des solutions et du précipité dans le bidon prévu.
