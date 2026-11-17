---
titre: "Suivi cinétique d'une décoloration par spectrophotométrie"
description: "Regardez le bleu de méthylène se décolorer dans la cuve, mesurez le temps de demi-réaction et testez l'effet de la température et d'un catalyseur."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 4
duree: "1 h 30"
chapitre: "cinetique-chimique"
objectifs:
  - "Suivre l'évolution d'une concentration par mesure d'absorbance"
  - "Déterminer graphiquement un temps de demi-réaction"
  - "Vérifier qu'une loi de vitesse est d'ordre 1"
  - "Mettre en évidence l'effet de la température et d'un catalyseur"
materiel:
  - "Spectrophotomètre réglé sur 665 nm et ses cuves"
  - "Solution de bleu de méthylène à 1,6 × 10⁻⁵ mol/L"
  - "Solution d'acide ascorbique (vitamine C) en large excès"
  - "Acide chlorhydrique (source d'ions H3O+, catalyseur)"
  - "Bain thermostaté et thermomètre"
  - "Pipettes graduées et propipette"
  - "Chronomètre"
---

## Principe

L'ion bleu de méthylène $\mathrm{BM^+}$, d'un bleu intense, est réduit lentement par l'acide ascorbique en une espèce incolore, notée $\mathrm{BMH_2^+}$ en milieu acide :

$$
\mathrm{BM^+(aq) + C_6H_8O_6(aq) \rightarrow BMH_2^+(aq) + C_6H_6O_6(aq)}
$$

$\mathrm{BM^+}$ est la seule espèce qui absorbe à 665 nm. D'après la loi de Beer-Lambert, $A = \varepsilon\,\ell\,[\mathrm{BM^+}]$ : mesurer l'absorbance au cours du temps revient à suivre la disparition du colorant. L'acide ascorbique étant en large excès, sa concentration reste quasi constante et la vitesse ne dépend que de $[\mathrm{BM^+}]$.

## Protocole

1. Placer les deux solutions dans le bain thermostaté. Régler le spectrophotomètre sur 665 nm, faire le blanc, puis introduire le bleu de méthylène dans la cuve.
2. Ajouter l'acide ascorbique acidifié, refermer le capot et déclencher aussitôt le chronomètre.
3. Relever l'absorbance toutes les 12 s pendant 6 min et tracer $A = f(t)$.
4. Lire le temps de demi-réaction $t_{1/2}$ : la date à laquelle $A = A_0 / 2$.
5. Tracer $\ln A = f(t)$ et modéliser par une droite.
6. Recommencer en changeant un seul facteur à la fois : température, quantité de catalyseur, concentration initiale du colorant.

## Exploitation

Dans la cuve, le colorant est dilué par l'ajout d'acide ascorbique (5 volumes de colorant pour 3 volumes ajoutés). Avec $[\mathrm{BM^+}]_0 = 1{,}0 \times 10^{-5}\ \mathrm{mol \cdot L^{-1}}$ dans le mélange, $\varepsilon = 7{,}4 \times 10^{4}\ \mathrm{L \cdot mol^{-1} \cdot cm^{-1}}$ et une cuve de $1{,}0\ \mathrm{cm}$, on attend $A_0 = 0{,}74$. À 25 °C, avec $0{,}05\ \mathrm{mol \cdot L^{-1}}$ d'ions $\mathrm{H_3O^+}$ ajoutés, l'absorbance vaut $0{,}37$ à $t_{1/2} = 69\ \mathrm{s}$, puis elle est encore divisée par 2 à 139 s et à 208 s.

Cette régularité est la signature d'une loi de vitesse d'**ordre 1** :

$$
[\mathrm{BM^+}](t) = [\mathrm{BM^+}]_0\,\mathrm{e}^{-kt}
$$

L'absorbance étant proportionnelle à $[\mathrm{BM^+}]$, il vient :

$$
\ln A = \ln A_0 - k\,t
$$

Les points $\ln A = f(t)$ sont alignés. La pente donne $k = 1{,}0 \times 10^{-2}\ \mathrm{s^{-1}}$, et l'on retrouve :

$$
t_{1/2} = \frac{\ln 2}{k} = \frac{0{,}693}{1{,}0 \times 10^{-2}} = 69\ \mathrm{s}
$$

À l'échelle microscopique, chauffer rend les chocs entre entités plus fréquents et plus efficaces. Le catalyseur, lui, ouvre un chemin réactionnel plus facile : il accélère la transformation sans figurer dans son équation, et se retrouve intact à la fin.

## Questions

1. Pourquoi travailler avec un large excès d'acide ascorbique ?
2. Dans l'animation, ramenez le curseur du catalyseur à zéro. Que devient $t_{1/2}$ ? L'état final est-il modifié ?
3. Doublez la concentration initiale du colorant, puis passez de 25 °C à 35 °C. Lequel de ces deux réglages change $t_{1/2}$ ?

<details>
<summary>Voir les réponses</summary>

1. Sa concentration reste alors pratiquement constante : la vitesse ne dépend plus que de $[\mathrm{BM^+}]$, ce qui permet de tester l'ordre 1 par rapport au colorant.
2. $t_{1/2}$ double, de 69 s à 139 s : la réaction est deux fois plus lente. L'absorbance tend toujours vers zéro, car un catalyseur modifie la durée de la transformation, pas son état final.
3. Doubler la concentration fait partir la courbe de $A_0 = 1{,}48$, mais $t_{1/2}$ reste égal à 69 s (propriété de l'ordre 1). Chauffer de 10 °C le fait tomber à 38 s environ : la température est un facteur cinétique.

</details>

## Sécurité

L'acide chlorhydrique est irritant et le bleu de méthylène tache durablement : blouse, lunettes et gants. Les solutions usagées vont dans le bidon de récupération.
