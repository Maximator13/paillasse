---
titre: "Électrolyse de l'eau acidifiée"
description: "Forcez la décomposition de l'eau avec un générateur, recueillez deux fois plus de dihydrogène que de dioxygène et reliez ces volumes à la charge."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 8
duree: "1 h"
chapitre: "electrolyse"
objectifs:
  - "Réaliser une électrolyse et identifier l'anode et la cathode"
  - "Relier la charge Q = I·Δt à la quantité d'électrons échangés"
  - "Prévoir les volumes de gaz formés et les comparer aux mesures"
materiel:
  - "Électrolyseur à électrodes inattaquables (cuve et socle à bornes)"
  - "Deux tubes à essai gradués"
  - "Générateur de tension continue réglable"
  - "Ampèremètre et fils de connexion"
  - "Chronomètre"
  - "Solution d'acide sulfurique à 0,5 mol/L"
---

## Principe

L'eau ne se décompose pas spontanément en dihydrogène et dioxygène. Un générateur peut cependant **forcer** cette transformation en imposant le sens de circulation des électrons : c'est une électrolyse. L'eau est acidifiée pour que la solution, riche en ions, conduise le courant.

À la **cathode**, reliée à la borne négative, les électrons arrivent et une réduction a lieu :

$$
\mathrm{2\,H^+\,(aq) + 2\,e^- \rightarrow H_2\,(g)}
$$

À l'**anode**, reliée à la borne positive, les électrons repartent et une oxydation a lieu :

$$
\mathrm{2\,H_2O\,(l) \rightarrow O_2\,(g) + 4\,H^+\,(aq) + 4\,e^-}
$$

Le bilan s'écrit $\mathrm{2\,H_2O\,(l) \rightarrow 2\,H_2\,(g) + O_2\,(g)}$ : il se forme deux fois plus de dihydrogène que de dioxygène.

## Protocole

1. Remplir la cuve d'eau acidifiée. Remplir les deux tubes gradués de la même solution, les boucher du doigt (avec des gants) et les retourner sur les électrodes sans laisser entrer d'air.
2. Brancher en série le générateur, l'ampèremètre et l'électrolyseur. Repérer la cathode (borne négative) et l'anode (borne positive).
3. Allumer le générateur et régler l'intensité à $I = 0{,}50\ \mathrm{A}$. Observer les bulles sur chaque électrode.
4. Déclencher le chronomètre et relever régulièrement le volume de gaz dans chaque tube, en maintenant l'intensité constante.
5. Après $\Delta t = 300\ \mathrm{s}$, ouvrir le circuit, lire les volumes finaux et les comparer aux valeurs prévues.

## Exploitation

La charge qui a traversé le circuit vaut :

$$
Q = I\,\Delta t = 0{,}50 \times 300 = 150\ \mathrm{C}
$$

Elle correspond à une quantité d'électrons (avec $F = 96\,500\ \mathrm{C \cdot mol^{-1}}$) :

$$
n(\mathrm{e^-}) = \frac{Q}{F} = \frac{150}{96\,500} = 1{,}55 \times 10^{-3}\ \mathrm{mol}
$$

D'après les demi-équations, il faut 2 électrons par molécule de $\mathrm{H_2}$ et 4 par molécule de $\mathrm{O_2}$ :

$$
n(\mathrm{H_2}) = \frac{n(\mathrm{e^-})}{2} = 7{,}8 \times 10^{-4}\ \mathrm{mol}
$$

$$
n(\mathrm{O_2}) = \frac{n(\mathrm{e^-})}{4} = 3{,}9 \times 10^{-4}\ \mathrm{mol}
$$

Avec un volume molaire $V_m = 24{,}0\ \mathrm{L \cdot mol^{-1}}$ à 20 °C, on prévoit $V(\mathrm{H_2}) = 18{,}7\ \mathrm{mL}$ et $V(\mathrm{O_2}) = 9{,}3\ \mathrm{mL}$, comme dans l'animation. Sur le graphique, les deux volumes sont des fonctions linéaires du temps, et la droite du dihydrogène a une pente double.

## Questions

1. Pourquoi faut-il un générateur pour réaliser cette transformation ?
2. Dans l'animation, portez l'intensité à 0,80 A sans changer la durée. Comment évoluent les volumes ? Leur rapport ?
3. À 0,30 A, quelle durée faut-il choisir pour retrouver à peu près les volumes obtenus avec 0,50 A pendant 300 s ? Vérifiez avec les curseurs.

<details>
<summary>Voir les réponses</summary>

1. La transformation n'est pas spontanée : le générateur apporte l'énergie électrique et impose le sens de circulation des électrons, opposé à celui que l'on observerait lors de la transformation spontanée (fonctionnement en pile).
2. Les volumes sont proportionnels à $Q = I\,\Delta t$ : ils sont multipliés par 1,6 (29,8 mL et 14,9 mL). Leur rapport reste égal à 2, car il est fixé par la stœchiométrie.
3. Il faut la même charge : $\Delta t = Q / I = 150 / 0{,}30 = 500\ \mathrm{s}$. Le curseur s'arrête à 480 s, où l'on recueille 17,9 mL de dihydrogène, soit un peu moins que 18,7 mL.

</details>

## Sécurité

L'acide sulfurique est corrosif : blouse, lunettes et gants obligatoires. Le dihydrogène est inflammable : aucune flamme à proximité, et de faibles volumes seulement.
