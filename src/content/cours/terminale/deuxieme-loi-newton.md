---
titre: "Deuxième loi de Newton : relier forces et mouvement"
description: "Centre de masse, référentiel galiléen, principe fondamental de la dynamique et équilibre : la méthode pour passer des forces à l'accélération."
niveau: terminale
theme: mouvement
ordre: 14
duree: "25 min"
motsCles: ["deuxième loi de Newton", "centre de masse", "référentiel galiléen", "accélération", "équilibre", "dynamique"]
tp: []
---

> **L'essentiel.** Dans un référentiel galiléen, la somme des forces extérieures appliquées à un système est égale au produit de sa masse par l'accélération de son **centre de masse** : $\sum \vec{F}_{\text{ext}} = m\,\vec{a}_G$. Connaître les forces permet de prévoir le mouvement ; connaître le mouvement permet de retrouver les forces.

## 1. Le centre de masse d'un système

Un système réel (un ballon, une voiture, un plongeur) est formé d'une infinité de points qui n'ont pas tous le même mouvement : un ballon tourne sur lui-même pendant qu'il avance. Pour décrire simplement son mouvement d'ensemble, on étudie un point particulier.

> **Définition.** Le **centre de masse** $G$ d'un système est le point dont le mouvement est le plus simple : c'est en ce point que l'on peut considérer toute la masse $m$ du système concentrée pour étudier sa translation.

Quelques repères pour le situer qualitativement :

- pour un solide homogène possédant un centre de symétrie (boule, cube, cylindre), $G$ est ce **centre de symétrie** ;
- $G$ est plus proche des zones où la masse est la plus importante (un marteau a son centre de masse près de la tête) ;
- $G$ peut se trouver **hors de la matière** (anneau, boomerang, sauteur en hauteur en position dorsale).

Quand on lance en l'air un bâton qui tournoie, chaque point décrit une trajectoire compliquée, mais celle de $G$ reste une parabole simple (frottements de l'air négligés) : c'est tout l'intérêt de ce point.

## 2. Le référentiel galiléen

Un mouvement se décrit toujours par rapport à un **référentiel**, solide de référence muni d'un repère d'espace et d'une horloge. Les lois de Newton ne sont pas valables dans tous les référentiels.

> **Définition.** Un référentiel est **galiléen** si le principe d'inertie (première loi de Newton) y est vérifié : un système isolé ou pseudo-isolé y est immobile ou en mouvement rectiligne uniforme.

Tout référentiel en translation rectiligne uniforme par rapport à un référentiel galiléen est lui aussi galiléen. En pratique :

| Référentiel | Solide de référence | Considéré galiléen pour |
|---|---|---|
| **Terrestre** | le sol, un laboratoire | les mouvements courts sur Terre (quelques minutes) |
| **Géocentrique** | centre de la Terre et trois étoiles lointaines | les satellites et la Lune |
| **Héliocentrique** | centre du Soleil et trois étoiles lointaines | les planètes et les sondes interplanétaires |

Un manège qui tourne ou une voiture qui freine ne sont **pas** des référentiels galiléens : un objet posé « sans raison » s'y met en mouvement.

## 3. Énoncé de la deuxième loi de Newton

On rappelle que le vecteur accélération est la dérivée du vecteur vitesse par rapport au temps : $\vec{a} = \dfrac{\mathrm{d}\vec{v}}{\mathrm{d}t}$, en $\mathrm{m \cdot s^{-2}}$.

> **Loi.** Dans un référentiel galiléen, la somme vectorielle des forces extérieures appliquées à un système de masse $m$ constante est égale au produit de sa masse par le vecteur accélération de son centre de masse :
>
> $$
> \sum \vec{F}_{\text{ext}} = m\,\vec{a}_G
> $$
>
> avec $F$ en newtons ($\mathrm{N}$), $m$ en kilogrammes ($\mathrm{kg}$) et $a_G$ en $\mathrm{m \cdot s^{-2}}$.

Trois conséquences à bien comprendre :

1. $\vec{a}_G$ a **la même direction et le même sens** que la somme des forces. Ce n'est pas le cas de la vitesse : une balle lancée vers le haut monte alors que la force (son poids) est dirigée vers le bas.
2. Pour une même somme des forces, plus la masse est grande, plus l'accélération est faible : la masse mesure l'**inertie** du système.
3. Si $\sum \vec{F}_{\text{ext}} = \vec{0}$, alors $\vec{a}_G = \vec{0}$ : on retrouve le principe d'inertie, cas particulier de la deuxième loi.

En projetant la relation vectorielle sur les axes d'un repère, on obtient des équations scalaires, une par axe :

$$
\sum F_x = m\,a_{Gx} \qquad \sum F_y = m\,a_{Gy}
$$

## 4. Équilibre d'un système

> **Définition.** Un système est à l'**équilibre** dans un référentiel galiléen lorsque son centre de masse y est immobile : $\vec{v}_G = \vec{0}$ à chaque instant, donc $\vec{a}_G = \vec{0}$.

La deuxième loi impose alors :

$$
\sum \vec{F}_{\text{ext}} = \vec{0}
$$

Cette condition est **nécessaire** mais pas suffisante : un système soumis à des forces qui se compensent peut aussi être en mouvement rectiligne uniforme. Elle permet de déterminer une force inconnue. Par exemple, pour une lampe de masse $m$ suspendue à un fil, la tension du fil compense le poids : $T = m\,g$.

Pour un objet posé sur un plan incliné d'un angle $\alpha$ et immobile grâce aux frottements, la projection sur l'axe parallèle à la pente donne $f = m\,g\sin\alpha$, et sur l'axe perpendiculaire $R_N = m\,g\cos\alpha$.

## 5. Méthode de résolution d'un problème de dynamique

Quel que soit l'exercice, la démarche est la même :

1. **Définir le système** étudié (et le modéliser par son centre de masse $G$).
2. **Choisir le référentiel** et justifier qu'il est galiléen.
3. **Faire le bilan des forces extérieures** et les représenter sur un schéma : poids $\vec{P} = m\,\vec{g}$, réaction du support, tension d'un fil, frottements, poussée d'Archimède, force motrice…
4. **Choisir un repère** adapté (un axe dans le sens du mouvement, par exemple).
5. **Appliquer la deuxième loi de Newton** sous forme vectorielle, puis la **projeter** sur chaque axe.
6. **Exploiter** : selon les données, calculer l'accélération à partir des forces connues, ou calculer une force à partir de l'accélération mesurée (par exemple sur une chronophotographie).

Le sens inverse est très utilisé : si un enregistrement montre que $\vec{a}_G$ est constant, on en déduit la valeur de la somme des forces, puis une force inconnue (frottements, force de poussée).

## Exercice type

Une luge de masse $m = 12{,}0\ \mathrm{kg}$ est tirée sur un sol horizontal enneigé par une corde horizontale qui exerce une force $F = 50{,}0\ \mathrm{N}$. Les frottements du sol sont modélisés par une force constante, horizontale, opposée au mouvement, de valeur $f = 14{,}0\ \mathrm{N}$. La luge part du repos. On prend $g = 9{,}81\ \mathrm{m \cdot s^{-2}}$.

1. Déterminer la valeur de l'accélération de la luge.
2. Déterminer la valeur de la réaction normale du sol.
3. Calculer la vitesse et la distance parcourue au bout de $4{,}0\ \mathrm{s}$.

<details>
<summary>Voir la correction</summary>

Système : la luge. Référentiel terrestre, supposé galiléen. Forces : poids $\vec{P}$ (vertical, vers le bas), réaction normale $\vec{R}_N$ (verticale, vers le haut), traction $\vec{F}$ et frottements $\vec{f}$ (horizontaux, de sens opposés). Axe $(Ox)$ horizontal dans le sens du mouvement, axe $(Oy)$ vertical vers le haut.

1. Projection sur $(Ox)$ : $F - f = m\,a_x$, donc

$$
a_x = \frac{F - f}{m} = \frac{50{,}0 - 14{,}0}{12{,}0} = 3{,}00\ \mathrm{m \cdot s^{-2}}
$$

2. Le mouvement est horizontal, donc $a_y = 0$. Projection sur $(Oy)$ : $R_N - m\,g = 0$, soit

$$
R_N = m\,g = 12{,}0 \times 9{,}81 = 118\ \mathrm{N}
$$

3. L'accélération est constante et la vitesse initiale nulle : $v(t) = a_x\,t$ et $x(t) = \dfrac{1}{2}\,a_x\,t^2$.

$$
v = 3{,}00 \times 4{,}0 = 12\ \mathrm{m \cdot s^{-1}} \qquad x = \frac{1}{2} \times 3{,}00 \times 4{,}0^2 = 24\ \mathrm{m}
$$

</details>

## À retenir

- On étudie le mouvement du **centre de masse** $G$, point où l'on concentre toute la masse du système.
- Les lois de Newton ne s'appliquent que dans un **référentiel galiléen** (terrestre, géocentrique, héliocentrique selon la durée et l'échelle).
- Deuxième loi : $\sum \vec{F}_{\text{ext}} = m\,\vec{a}_G$ ; l'accélération a le sens de la somme des forces.
- Équilibre : $\vec{a}_G = \vec{0}$, donc $\sum \vec{F}_{\text{ext}} = \vec{0}$.
- Méthode : système, référentiel, bilan des forces, repère, loi vectorielle, projections.

## Erreurs fréquentes

- Croire que la somme des forces est dans le sens de la **vitesse** : elle est dans le sens de l'**accélération** (variation de la vitesse).
- Oublier une force dans le bilan (souvent la réaction du support) ou ajouter une « force du mouvement » qui n'existe pas.
- Projeter sans tenir compte du sens des axes : une force opposée à l'axe donne une composante **négative**.
- Appliquer la loi dans un référentiel non galiléen (véhicule qui accélère, manège).
- Confondre masse ($\mathrm{kg}$) et poids ($\mathrm{N}$).
