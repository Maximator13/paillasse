---
titre: "Interférences lumineuses avec les fentes d'Young"
description: "Superposez les ondes issues de deux fentes, observez les franges sur l'écran et mesurez l'interfrange pour retrouver la longueur d'onde du laser."
niveau: terminale
theme: ondes
matiere: physique
ordre: 17
duree: "1 h"
chapitre: "diffraction-interferences"
objectifs:
  - "Observer une figure d'interférences lumineuses et en décrire les franges"
  - "Relier la différence de marche à la nature constructive ou destructive de l'interférence"
  - "Mesurer un interfrange avec précision en comptant plusieurs franges"
  - "Déterminer une longueur d'onde à partir de la relation de l'interfrange"
materiel:
  - "Diode laser rouge (650 nm) sur support"
  - "Jeu de bifentes d'Young d'écarts connus (0,10 à 0,30 mm)"
  - "Banc d'optique de 2 m avec cavaliers"
  - "Écran blanc recouvert de papier millimétré"
  - "Mètre ruban et règle graduée"
---

## Principe

Un faisceau laser éclaire deux fentes fines et parallèles, distantes de $b$. Chaque fente diffracte la lumière et se comporte comme une source : $S_1$ et $S_2$ émettent deux ondes **cohérentes** (même fréquence, déphasage constant), qui se superposent dans tout l'espace situé derrière la plaque.

En un point $M$ de l'écran, d'abscisse $x$, les deux ondes n'ont pas parcouru la même distance. La **différence de marche** vaut, pour un écran placé à une distance $D$ très grande devant $b$ et $x$ :

$$
\delta = S_2M - S_1M = \frac{b\,x}{D}
$$

- Si $\delta = k\,\lambda$ ($k$ entier), les ondes arrivent en phase : interférence **constructive**, frange brillante.
- Si $\delta = \left(k + \dfrac{1}{2}\right)\lambda$, elles arrivent en opposition de phase : interférence **destructive**, frange sombre.

## Protocole

1. Aligner sur le banc le laser, la bifente ($b = 0{,}20\ \mathrm{mm}$) et l'écran. Mesurer la distance $D = 2{,}00\ \mathrm{m}$ entre le plan des fentes et l'écran.
2. Allumer le laser et centrer le faisceau sur les deux fentes : les deux ondes diffractées se recouvrent derrière la plaque.
3. Observer sur l'écran l'alternance régulière de franges brillantes et sombres : les franges sont parallèles aux fentes et se succèdent dans la direction perpendiculaire.
4. Repérer la frange centrale ($\delta = 0$), puis la première frange sombre ($\delta = \lambda / 2$) et la frange brillante suivante ($\delta = \lambda$).
5. Mesurer la distance qui sépare plusieurs franges brillantes (ici 4 interfranges) et en déduire l'interfrange $i$.
6. Calculer la longueur d'onde du laser et la comparer à la valeur du constructeur.

## Exploitation

Deux franges brillantes consécutives correspondent à $\delta$ qui augmente de $\lambda$, donc à $x$ qui augmente de l'**interfrange** :

$$
i = \frac{\lambda\,D}{b} \qquad\Longrightarrow\qquad \lambda = \frac{i\,b}{D}
$$

On mesure $4\,i = 26{,}0\ \mathrm{mm}$, soit $i = 6{,}50\ \mathrm{mm}$. Avec $b = 0{,}20\ \mathrm{mm}$ et $D = 2{,}00\ \mathrm{m}$ :

$$
\lambda = \frac{6{,}50 \times 10^{-3} \times 0{,}20 \times 10^{-3}}{2{,}00}\ \mathrm{m}
$$

soit $\lambda = 6{,}5 \times 10^{-7}\ \mathrm{m} = 650\ \mathrm{nm}$, la valeur annoncée par le constructeur.

Mesurer $4\,i$ plutôt que $i$ divise par 4 l'incertitude de lecture : une erreur de $0{,}5\ \mathrm{mm}$ sur $26{,}0\ \mathrm{mm}$ ne pèse que 2 %, contre 8 % sur un seul interfrange. La courbe $I / I_{max} = f(x)$ est une sinusoïde de période $i$, maximale en $x = 0$.

## Questions

1. Pourquoi deux lasers distincts éclairant chacun une fente ne donneraient-ils pas de franges ?
2. Dans l'animation, faites passer l'écart $b$ de 0,20 à 0,10 mm. Comment évolue l'interfrange ? Combien de franges brillantes restent visibles sur l'écran ?
3. Remettez $b = 0{,}20\ \mathrm{mm}$, réglez la longueur d'onde sur 450 nm, puis rapprochez l'écran à $D = 1{,}2\ \mathrm{m}$. Prévoyez l'interfrange par le calcul, puis vérifiez sur les mesures.

<details>
<summary>Voir les réponses</summary>

1. Deux lasers indépendants ne sont pas cohérents : leur déphasage varie au hasard, très rapidement, et les franges se brouillent. Les deux fentes éclairées par le même faisceau, elles, gardent un déphasage constant.
2. $i$ est inversement proportionnel à $b$ : il double et passe de 6,5 mm à 13 mm. Les franges sont deux fois plus larges, donc deux fois moins nombreuses sur la même largeur d'écran (3 au lieu de 7 entre $-20$ et $+20\ \mathrm{mm}$).
3. $i$ est proportionnel à $\lambda$ et à $D$. Avec $b = 0{,}20\ \mathrm{mm}$ : $i = \dfrac{450 \times 10^{-9} \times 1{,}2}{0{,}20 \times 10^{-3}} = 2{,}7\ \mathrm{mm}$. Les franges sont bleues et bien plus serrées.

</details>

## Sécurité

Ne jamais regarder le faisceau laser en face ni le diriger vers un camarade. Retirer montres et bijoux réfléchissants, et travailler faisceau horizontal, sous le niveau des yeux.
