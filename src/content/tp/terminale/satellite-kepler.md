---
titre: "Satellites et lois de Kepler : peser la Terre"
description: "Mettez un satellite en orbite, vérifiez la loi des aires sur une ellipse, puis tracez T² en fonction de r³ pour en déduire la masse de la Terre."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 11
duree: "1 h"
chapitre: "mouvement-champ-gravitation"
objectifs:
  - "Montrer que le mouvement circulaire d'un satellite est uniforme"
  - "Illustrer la loi des aires sur une orbite elliptique"
  - "Vérifier la troisième loi de Kepler avec plusieurs satellites"
  - "Déterminer la masse de la Terre à partir de la pente de la droite"
materiel:
  - "Animation de cette page (curseurs altitude, excentricité, masse)"
  - "Données orbitales de quatre satellites : ISS, GPS, Galileo, Météosat"
  - "Tableur-grapheur avec modélisation linéaire"
  - "Calculatrice"
---

## Principe

Dans le référentiel géocentrique, supposé galiléen, un satellite de masse $m$ n'est soumis qu'à la force de gravitation exercée par la Terre, de masse $M$. Sur une orbite circulaire de rayon $r$, la deuxième loi de Newton s'écrit dans le repère de Frenet :

$$
\frac{G\,M\,m}{r^2} = m\,\frac{v^2}{r} \;\Longrightarrow\; v = \sqrt{\frac{G\,M}{r}}
$$

La force est centripète, perpendiculaire à la vitesse : la valeur de $v$ reste constante, le mouvement est **circulaire uniforme**. La période vaut $T = \dfrac{2\pi r}{v}$, d'où la troisième loi de Kepler :

$$
\frac{T^2}{r^3} = \frac{4\pi^2}{G\,M}
$$

## Protocole

1. Lancer le satellite jusqu'à son orbite. Repérer la direction de la force (vers le centre de la Terre) et celle de la vitesse (tangente à la trajectoire).
2. Chronométrer un tour complet pour mesurer la période $T$, puis placer le point $(r^3\ ;\ T^2)$ sur le graphique.
3. Rendre l'orbite elliptique. Comparer les aires balayées par le rayon Terre-satellite pendant deux durées égales $\Delta t = T/10$, à l'apogée puis au périgée.
4. Ajouter les satellites ISS, GPS, Galileo et Météosat. Relever pour chacun $r$ et $T$, puis reporter les points.
5. Modéliser le nuage de points par une droite passant par l'origine et relever sa pente $k$.

## Exploitation

Avec les réglages de départ (altitude de $30\,000\ \mathrm{km}$), $r = 3{,}64 \times 10^{7}\ \mathrm{m}$ : l'animation affiche $v = 3{,}31\ \mathrm{km \cdot s^{-1}}$ et $T = 19{,}18\ \mathrm{h}$.

| Satellite | $r$ (km) | $T$ (h) |
|---|---|---|
| ISS | 6 780 | 1,54 |
| GPS | 26 560 | 11,97 |
| Galileo | 29 600 | 14,08 |
| Météosat | 42 164 | 23,94 |

Les points sont alignés avec l'origine : $T^2 = k\,r^3$, avec $k = 9{,}90 \times 10^{-14}\ \mathrm{s^2 \cdot m^{-3}}$. On en déduit :

$$
M = \frac{4\pi^2}{G\,k} = 5{,}97 \times 10^{24}\ \mathrm{kg}
$$

Sur l'ellipse (excentricité 0,50, demi-grand axe $a = 28\,247\ \mathrm{km}$), la vitesse passe de $6{,}51\ \mathrm{km \cdot s^{-1}}$ au périgée à $2{,}17\ \mathrm{km \cdot s^{-1}}$ à l'apogée : le secteur balayé près de la Terre est court et large, l'autre long et étroit, mais leurs aires sont égales. La troisième loi reste valable en remplaçant $r$ par $a$.

## Questions

1. Diminuez l'altitude du satellite. Comment évoluent la vitesse et la période ? Le point reste-t-il sur la droite ?
2. Doublez la masse de l'astre. Que devient la pente de la droite ? Et la période de chaque satellite ?
3. Pourquoi un satellite géostationnaire doit-il se trouver à une altitude bien précise ?

<details>
<summary>Voir les réponses</summary>

1. La vitesse augmente ($v$ varie comme $1/\sqrt{r}$) et la période diminue. Le point glisse le long de la droite : le rapport $T^2/r^3$ ne dépend pas du satellite.
2. La pente $k = 4\pi^2/(G\,M)$ est divisée par 2. Chaque période est divisée par $\sqrt{2}$ : un astre plus massif impose des révolutions plus rapides.
3. Sa période doit être égale au jour sidéral ($86\,164\ \mathrm{s}$). La troisième loi n'autorise alors qu'un seul rayon, $r = 42\,164\ \mathrm{km}$, soit une altitude proche de $35\,800\ \mathrm{km}$, dans le plan de l'équateur.

</details>
