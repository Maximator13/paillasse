---
titre: "Chute parabolique : pointage vidéo d'un projectile"
description: "Pointez une balle image par image, tracez ses vecteurs vitesse et accélération, puis confrontez la trajectoire à la parabole du modèle."
niveau: terminale
theme: mouvement
matiere: physique
ordre: 10
duree: "1 h 30"
chapitre: "mouvement-champ-uniforme"
objectifs:
  - "Réaliser la chronophotographie d'un mouvement par pointage vidéo"
  - "Tracer les vecteurs vitesse et accélération à partir des positions"
  - "Confronter la trajectoire pointée à la parabole du modèle"
  - "Mesurer la flèche et la portée d'un tir"
materiel:
  - "Lanceur à ressort orientable, avec rapporteur"
  - "Balle dense de petite taille"
  - "Caméra ou smartphone sur pied (25 images par seconde)"
  - "Règle étalon de 1,00 m"
  - "Fond uni et éclairage suffisant"
  - "Ordinateur avec logiciel de pointage et tableur"
---

## Principe

Une balle lancée avec une vitesse initiale $\vec{v_0}$, inclinée d'un angle $\alpha$ au-dessus de l'horizontale, n'est soumise qu'à son poids si l'on néglige l'action de l'air. La deuxième loi de Newton donne alors $\vec{a} = \vec{g}$ : l'accélération est verticale, vers le bas, et ne dépend pas de la masse.

Dans le repère $(O\,;x,y)$, avec $O$ au sol à la verticale du lanceur et $h$ la hauteur de lancement, les équations horaires sont :

$$
x(t) = v_0 \cos\alpha \; t
$$

$$
y(t) = -\tfrac{1}{2}\,g\,t^2 + v_0 \sin\alpha \; t + h
$$

Le pointage vidéo fournit les positions successives de la balle. On en tire les vitesses, puis on compare la trajectoire au modèle.

## Protocole

1. Placer la caméra sur pied, bien de face, à plusieurs mètres du plan du mouvement. Disposer la règle étalon dans ce plan, régler l'angle du lanceur et filmer le tir.
2. Dans le logiciel, définir l'échelle avec l'étalon et l'origine du repère, puis pointer le centre de la balle sur chaque image : on obtient la chronophotographie, avec $\Delta t = 40\ \mathrm{ms}$ entre deux positions (l'animation passe à 80 ms pour les vols les plus longs).
3. Calculer les composantes de la vitesse au point $i$ par $v_x = \dfrac{x_{i+1} - x_{i-1}}{2\,\Delta t}$ (de même pour $v_y$). Tracer quelques vecteurs vitesse, puis les vecteurs accélération.
4. Superposer aux points la parabole du modèle et repérer le sommet $S$.
5. Mesurer la flèche et la portée.

## Exploitation

Le graphique montre que $v_x$ reste constante et que $v_y$ est une fonction affine du temps : $v_y = -g\,t + v_0 \sin\alpha$. La pente de cette droite vaut $-g$, soit $-9{,}81\ \mathrm{m \cdot s^{-2}}$.

En éliminant $t$, on obtient l'équation de la trajectoire :

$$
y = -\frac{g}{2\,v_0^2 \cos^2\alpha}\,x^2 + x\,\tan\alpha + h
$$

Avec $v_0 = 5{,}0\ \mathrm{m \cdot s^{-1}}$, $\alpha = 50°$ et $h = 0{,}80\ \mathrm{m}$ (réglages par défaut de l'animation) :

- le sommet est atteint quand $v_y = 0$, à $t_S = \dfrac{v_0 \sin\alpha}{g} = 0{,}39\ \mathrm{s}$ ;
- la flèche vaut $y_S = h + \dfrac{(v_0 \sin\alpha)^2}{2g} = 1{,}55\ \mathrm{m}$ ;
- la balle touche le sol à $t_P = 0{,}95\ \mathrm{s}$, d'où la portée $x_P = v_0 \cos\alpha \; t_P = 3{,}06\ \mathrm{m}$.

## Questions

1. Pourquoi les points de la chronophotographie sont-ils régulièrement espacés selon l'horizontale, mais pas selon la verticale ?
2. Dans l'animation, faites varier l'angle de tir de 20° à 70° sans toucher aux autres curseurs. Comment évoluent la flèche et la portée ? La portée est-elle maximale pour 45° ?
3. Augmentez la vitesse initiale. La pente de la droite $v_y(t)$ change-t-elle ? Que deviennent les vecteurs accélération ?

<details>
<summary>Voir les réponses</summary>

1. Aucune force n'agit selon l'horizontale : $v_x$ est constante et la balle parcourt la même distance horizontale pendant chaque $\Delta t$. Selon la verticale, le poids fait varier $v_y$ : les points se resserrent en montant, puis s'écartent en descendant.
2. La flèche augmente avec l'angle. La portée passe par un maximum, obtenu ici vers 38° et non 45° : la balle part d'une hauteur $h$ non nulle, ce qui favorise les tirs un peu plus tendus.
3. Non : la droite se décale vers le haut (son ordonnée à l'origine $v_0 \sin\alpha$ augmente), mais sa pente reste $-g$. Les vecteurs accélération restent tous identiques, égaux à $\vec{g}$.

</details>

## Sécurité

Ne jamais se placer dans l'axe du lanceur, ni viser une personne. Dégager la zone de réception avant chaque tir.
