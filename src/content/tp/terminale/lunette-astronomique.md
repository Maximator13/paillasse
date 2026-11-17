---
titre: "Lunette astronomique afocale"
description: "Construisez une lunette sur banc d'optique, suivez les rayons de l'objectif à l'œil et mesurez le grossissement à partir des angles."
niveau: terminale
theme: ondes
matiere: physique
ordre: 18
duree: "1 h 30"
chapitre: "lunette-astronomique"
objectifs:
  - "Modéliser une lunette par deux lentilles minces convergentes"
  - "Tracer la marche d'un faisceau issu d'un objet à l'infini"
  - "Régler la lunette pour la rendre afocale"
  - "Mesurer le grossissement et le comparer à f'1/f'2"
materiel:
  - "Banc d'optique gradué et cavaliers"
  - "Lentille convergente de 40 cm de distance focale (objectif)"
  - "Lentille convergente de 8 cm de distance focale (oculaire)"
  - "Objet à l'infini : source, mire et lentille collimatrice"
  - "Écran dépoli sur support"
  - "Œil fictif (lentille de 10 cm et écran) ou viseur"
  - "Règle graduée"
---

## Principe

Une lunette astronomique associe deux lentilles convergentes de même axe optique : un **objectif** $L_1$ de grande distance focale $f'_1$, tourné vers l'astre, et un **oculaire** $L_2$ de courte distance focale $f'_2$, derrière lequel se place l'œil.

L'astre est si éloigné que la lumière issue d'un de ses points arrive en faisceau parallèle, incliné d'un angle $\theta$ sur l'axe. L'objectif en donne une **image intermédiaire** $A_1B_1$, réelle et renversée, dans son plan focal image. L'oculaire joue ensuite le rôle d'une loupe. Si son foyer objet $F_2$ coïncide avec $F'_1$, l'image finale est rejetée à l'infini : la lunette est **afocale** et un œil normal observe sans accommoder. L'image est vue sous un angle $\theta'$, et le grossissement vaut :

$$
G = \frac{\theta'}{\theta}
$$

## Protocole

1. Placer l'objectif sur le banc, face à l'objet à l'infini. Déplacer l'écran jusqu'à obtenir une image nette : elle se forme à la distance $f'_1$ de $O_1$. Mesurer sa taille $A_1B_1$.
2. Retirer l'écran et installer l'oculaire. Le rapprocher jusqu'à ce que le faisceau émergent soit parallèle (image nette sur l'écran de l'œil fictif). Relever alors la distance $O_1O_2$.
3. Sur le schéma, tracer le rayon qui passe par $B_1$ et $O_2$ : il n'est pas dévié et donne la direction du faisceau émergent. Repérer les angles $\theta$ et $\theta'$.
4. Faire varier la direction de l'objet, relever $\theta'$ pour chaque valeur de $\theta$, puis tracer $\theta' = f(\theta)$.
5. Regarder l'objet à l'œil nu, puis à travers la lunette. Comparer la taille apparente et le sens de l'image.

## Exploitation

Dans les triangles $O_1A_1B_1$ et $O_2A_1B_1$, rectangles en $A_1$ :

$$
\tan\theta = \frac{A_1B_1}{f'_1} \qquad\text{et}\qquad \tan\theta' = \frac{A_1B_1}{f'_2}
$$

Les angles étant petits, $\tan\theta \approx \theta$ (en radians), d'où :

$$
G = \frac{\theta'}{\theta} = \frac{f'_1}{f'_2}
$$

Avec $f'_1 = 40\ \mathrm{cm}$ et $f'_2 = 8{,}0\ \mathrm{cm}$, la lunette afocale mesure $O_1O_2 = f'_1 + f'_2 = 48\ \mathrm{cm}$ et $G = 5{,}0$. Pour $\theta = 1{,}0°$, l'image intermédiaire mesure $A_1B_1 = f'_1 \tan\theta = 7{,}0\ \mathrm{mm}$ et l'on relève $\theta' = 5{,}0°$.

Les points du graphique s'alignent sur une droite passant par l'origine : sa pente est le grossissement. La droite de pente 1, en pointillés, correspond à l'observation à l'œil nu.

Sur le schéma de l'animation, les hauteurs sont dilatées dix fois pour que les angles restent visibles : les droites et les points de concours sont conservés, mais les angles ne se mesurent pas au rapporteur sur l'écran.

## Questions

1. Pourquoi l'image intermédiaire se forme-t-elle dans le plan focal image de l'objectif ?
2. Dans l'animation, portez $f'_1$ à 50 cm sans toucher à l'oculaire. Comment évoluent la longueur de la lunette, la taille de $A_1B_1$ et le grossissement ?
3. Réglez ensuite $f'_2$ sur 5,0 cm. Que devient la pente de la droite ? Quel inconvénient pratique accompagne ce gain ?

<details>
<summary>Voir les réponses</summary>

1. L'objet est à l'infini : les rayons issus d'un même point arrivent parallèles entre eux et convergent, après l'objectif, en un point du plan focal image.
2. La lunette s'allonge ($O_1O_2 = 58\ \mathrm{cm}$), l'image intermédiaire grandit ($A_1B_1 = 8{,}7\ \mathrm{mm}$ pour $\theta = 1{,}0°$) et le grossissement passe de 5,0 à 6,3.
3. La pente vaut $G = 50/5{,}0 = 10$. Le faisceau émergent est dix fois plus étroit que le faisceau incident : l'œil doit se placer plus près de l'oculaire et avec plus de précision, et l'image d'un objet étendu est moins lumineuse.

</details>

## Sécurité

Ne jamais pointer une lunette vers le Soleil : l'objectif concentre la lumière et la brûlure de la rétine est immédiate et irréversible. Manipuler les lentilles par la monture.
