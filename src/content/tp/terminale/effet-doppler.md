---
titre: "Effet Doppler : mesurer une vitesse avec un micro"
description: "Faites passer une source sonore devant un micro, observez les fronts d'onde se resserrer à l'avant et déduisez sa vitesse du décalage de fréquence."
niveau: terminale
theme: ondes
matiere: physique
ordre: 15
duree: "1 h"
chapitre: "ondes-sonores"
objectifs:
  - "Décrire qualitativement l'effet Doppler à partir des fronts d'onde"
  - "Exploiter l'enregistrement de la fréquence perçue par un récepteur fixe"
  - "Déterminer la vitesse d'une source à partir du décalage Doppler"
materiel:
  - "Source sonore mobile (buzzer ou avertisseur) de fréquence fixe"
  - "Voie rectiligne parcourue à vitesse constante"
  - "Micro et interface d'acquisition"
  - "Logiciel d'analyse spectrale (fréquence en fonction du temps)"
  - "Décamètre pour placer le micro"
---

## Principe

Une source émet un son de fréquence $f_E$ qui se propage dans l'air à la célérité $c = 340\ \mathrm{m \cdot s^{-1}}$. Chaque front d'onde est un cercle centré sur le point où il a été émis. Si la source avance à la vitesse $v$, elle rattrape en partie ses propres fronts : ils sont resserrés à l'avant et écartés à l'arrière.

> **Effet Doppler.** La fréquence perçue par un récepteur diffère de la fréquence émise lorsque la source et le récepteur sont en mouvement relatif.

Pour un micro fixe et une source qui se dirige vers lui, puis s'en éloigne :

$$
f_A = f_E\,\frac{c}{c - v} \qquad\text{et}\qquad f_B = f_E\,\frac{c}{c + v}
$$

Le son est plus aigu à l'approche ($f_A > f_E$), plus grave à l'éloignement ($f_B < f_E$).

## Protocole

1. Placer le micro à la distance $d$ de la voie et le relier à l'interface d'acquisition.
2. Source à l'arrêt, enregistrer le son et vérifier que la fréquence mesurée est bien $f_E$ (ici $680\ \mathrm{Hz}$).
3. Faire passer la source devant le micro à vitesse constante. La date $t = 0$ correspond au passage au plus près du micro.
4. Tracer la fréquence perçue en fonction du temps et relever les deux paliers : $f_A$ avant le passage, $f_B$ après.
5. Calculer la vitesse de la source.

## Exploitation

En divisant membre à membre les deux relations, la fréquence émise disparaît :

$$
\frac{f_A}{f_B} = \frac{c + v}{c - v} \quad\Longrightarrow\quad v = c\,\frac{f_A - f_B}{f_A + f_B}
$$

Pour $f_E = 680\ \mathrm{Hz}$ et $v = 25\ \mathrm{m \cdot s^{-1}}$, les paliers théoriques valent $f_A = 734\ \mathrm{Hz}$ et $f_B = 633\ \mathrm{Hz}$. Avec le micro à $10\ \mathrm{m}$ de la voie, l'enregistrement de 4 s donne $f_A = 733\ \mathrm{Hz}$ et $f_B = 634\ \mathrm{Hz}$, d'où :

$$
v = 340 \times \frac{733 - 634}{733 + 634} \approx 24{,}6\ \mathrm{m \cdot s^{-1}}
$$

Soit environ 89 km/h. L'animation, qui conserve les décimales des fréquences, affiche 24,5 m/s (88 km/h). La valeur est un peu inférieure à 25 m/s car, à 2 s du passage, la source ne se dirige pas encore exactement vers le micro.

Les longueurs d'onde confirment le schéma : $\lambda = \dfrac{c}{f_E} = 0{,}50\ \mathrm{m}$ au repos, $\dfrac{c - v}{f_E} = 0{,}46\ \mathrm{m}$ devant la source et $\dfrac{c + v}{f_E} = 0{,}54\ \mathrm{m}$ derrière. Sur l'animation, le son est ralenti trois fois et seuls quelques fronts sont dessinés, pour que cet écart se voie à l'œil nu ; les valeurs affichées, elles, sont les valeurs réelles.

La bascule n'est pas instantanée : seule compte la composante de la vitesse dirigée vers le micro, qui s'annule au plus près. La fréquence perçue vaut alors $f_E$.

## Questions

1. Pourquoi la relation donnant $v$ ne fait-elle pas intervenir $f_E$ ? Quel est l'intérêt pratique ?
2. Dans l'animation, portez la vitesse de la source à $40\ \mathrm{m \cdot s^{-1}}$. Comment évoluent les fronts d'onde et l'écart entre les deux paliers ?
3. Éloignez le micro jusqu'à $30\ \mathrm{m}$ avec une source lente ($10\ \mathrm{m \cdot s^{-1}}$). Que devient la bascule ? La vitesse mesurée est-elle encore correcte ?

<details>
<summary>Voir les réponses</summary>

1. Le rapport $f_A / f_B$ élimine $f_E$ : on peut mesurer la vitesse d'un véhicule sans connaître la fréquence de son avertisseur.
2. Les fronts se resserrent davantage à l'avant et s'écartent à l'arrière. L'écart $f_A - f_B$, voisin de $2 f_E\,v/c$, augmente : sur l'enregistrement, il passe d'environ 99 Hz à 161 Hz (100 Hz et 162 Hz pour les paliers théoriques).
3. La bascule s'étale sur toute la durée de l'enregistrement et les paliers ne sont pas atteints : la source ne se dirige jamais franchement vers le micro. La vitesse mesurée est nettement sous-estimée (moins de 6 m/s au lieu de 10). Il faut placer le micro près de la voie ou enregistrer plus longtemps.

</details>
