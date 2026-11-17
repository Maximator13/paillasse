---
titre: "Effet Venturi et relation de Bernoulli"
description: "Regardez l'eau accélérer dans le col d'un tube de Venturi, lisez la chute de pression sur les tubes manométriques et retrouvez le débit."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 13
duree: "1 h"
chapitre: "mecanique-des-fluides"
objectifs:
  - "Exploiter la conservation du débit volumique pour comparer des vitesses"
  - "Relier une hauteur manométrique à une pression"
  - "Appliquer la relation de Bernoulli à un écoulement horizontal"
  - "Déduire un débit d'une dénivellation"
materiel:
  - "Tube de Venturi transparent (diamètre 20 mm, col de 12 mm)"
  - "Trois tubes manométriques verticaux gradués"
  - "Alimentation en eau à débit réglable et vanne de sortie"
  - "Éprouvette graduée de 1 L et chronomètre"
  - "Règle graduée au millimètre"
---

## Principe

De l'eau, fluide incompressible, s'écoule en régime permanent dans un tube horizontal dont la section diminue de $S_1$ (amont) à $S_2$ (col). Le débit volumique se conserve :

$$
D_v = v_1 S_1 = v_2 S_2
$$

L'eau va donc plus vite là où le tube est plus étroit. Le long d'une ligne de courant horizontale, la relation de Bernoulli s'écrit :

$$
P_1 + \tfrac{1}{2}\rho v_1^2 = P_2 + \tfrac{1}{2}\rho v_2^2
$$

Si la vitesse augmente, la pression diminue : c'est l'**effet Venturi**. Chaque tube manométrique traduit la pression sous sa prise par une hauteur d'eau, $P = P_\mathrm{atm} + \rho g h$.

## Protocole

1. Observer le montage, eau au repos : les trois niveaux sont identiques, la pression est la même partout dans le tube horizontal.
2. Ouvrir la vanne de sortie et attendre le régime permanent. Mesurer le débit en recueillant l'eau dans l'éprouvette pendant une durée chronométrée.
3. Relever les hauteurs $h_1$ (amont) et $h_2$ (col), puis la dénivellation $\Delta h = h_1 - h_2$. Vérifier que le niveau aval rejoint presque le niveau amont.
4. Calculer $v_1$ et $v_2$ à partir du débit, puis l'écart de pression prévu par la relation de Bernoulli. Le comparer à $\rho g \Delta h$.
5. Utiliser le tube en débitmètre : retrouver $D_v$ à partir de la seule mesure de $\Delta h$.

## Exploitation

Avec $D_v = 10{,}0\ \mathrm{L \cdot min^{-1}} = 1{,}67 \times 10^{-4}\ \mathrm{m^3 \cdot s^{-1}}$, $S_1 = 3{,}14 \times 10^{-4}\ \mathrm{m^2}$ et $S_2 = 1{,}13 \times 10^{-4}\ \mathrm{m^2}$ :

$$
v_1 = \frac{D_v}{S_1} = 0{,}53\ \mathrm{m \cdot s^{-1}}
$$

$$
v_2 = \frac{D_v}{S_2} = 1{,}47\ \mathrm{m \cdot s^{-1}}
$$

La relation de Bernoulli donne, avec $\rho = 1{,}00 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$ :

$$
P_1 - P_2 = \tfrac{1}{2}\rho\,(v_2^2 - v_1^2) = 0{,}95\ \mathrm{kPa}
$$

(calcul mené avec les vitesses non arrondies), soit $\Delta h = \dfrac{P_1 - P_2}{\rho g} = 9{,}6\ \mathrm{cm}$ avec $g = 9{,}81\ \mathrm{m \cdot s^{-2}}$, valeur lue sur les tubes. Inversement, la dénivellation donne la vitesse au col, puis le débit $D_v = v_2 S_2$ :

$$
v_2^2 = \frac{2 g \Delta h}{1 - (S_2 / S_1)^2}
$$

## Questions

1. Pourquoi le niveau du tube aval remonte-t-il presque à la hauteur du tube amont ?
2. Dans l'animation, réduisez le débit de 10 à 5 L/min. Que devient la dénivellation ?
3. Élargissez le col jusqu'à 16 mm, à débit constant. Comment évoluent $v_2$ et $\Delta h$ ? Le débitmètre reste-t-il précis ?

<details>
<summary>Voir les réponses</summary>

1. En aval, le tube retrouve la section $S_1$ : la vitesse redevient $v_1$ et, d'après Bernoulli, la pression aussi. Le léger écart réel vient des frottements, négligés dans le modèle.
2. Les vitesses sont divisées par 2, donc l'écart de pression, proportionnel à $v^2$, est divisé par 4 : $\Delta h$ passe de 9,6 cm à 2,4 cm.
3. $v_2$ tombe à $0{,}83\ \mathrm{m \cdot s^{-1}}$ et $\Delta h$ à environ 2,1 cm. Une dénivellation plus petite se lit avec une incertitude relative plus grande : un col étroit rend le débitmètre plus sensible.

</details>

## Sécurité

Vérifier le serrage des raccords avant d'ouvrir l'eau et éloigner les appareils électriques de la paillasse. Essuyer immédiatement toute flaque au sol.
