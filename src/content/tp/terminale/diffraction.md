---
titre: "Diffraction d'un faisceau laser par une fente"
description: "Resserrez une fente sur le trajet d'un laser, mesurez la tache centrale et tracez L en fonction de 1/a pour déterminer la longueur d'onde."
niveau: terminale
theme: ondes
matiere: physique
ordre: 16
duree: "1 h 30"
chapitre: "diffraction-interferences"
objectifs:
  - "Observer la diffraction d'une onde lumineuse par une fente"
  - "Exploiter la relation entre l'angle de diffraction, la longueur d'onde et la largeur de la fente"
  - "Mesurer la largeur de la tache centrale pour plusieurs fentes"
  - "Déterminer une longueur d'onde à partir de la pente d'une droite"
materiel:
  - "Diode laser rouge de classe 2 sur support"
  - "Banc d'optique gradué"
  - "Jeu de fentes calibrées de 40 µm à 200 µm"
  - "Écran blanc mat"
  - "Règle graduée au millimètre ou papier millimétré"
  - "Mètre ruban pour mesurer D"
---

## Principe

Lorsqu'une onde lumineuse de longueur d'onde $\lambda$ rencontre une fente fine, dont la largeur $a$ n'est pas trop grande devant $\lambda$ (ici de l'ordre de cent fois $\lambda$), elle ne se propage plus en ligne droite : elle s'étale. C'est la **diffraction**. Sur un écran placé à la distance $D$, on observe une tache centrale très lumineuse, deux fois plus large que les taches secondaires qui l'entourent, séparées par des extinctions.

L'angle caractéristique de diffraction $\theta$, entre l'axe du faisceau et la première extinction, vérifie :

$$
\theta = \frac{\lambda}{a}
$$

avec $\theta$ en radians, $\lambda$ et $a$ en mètres. Plus la fente est fine, plus le faisceau s'étale.

## Protocole

1. Aligner sur le banc d'optique le laser, le porte-fente et l'écran. Placer l'écran à $D = 2{,}00\ \mathrm{m}$ de la fente.
2. Allumer le laser, fente grande ouverte : le faisceau forme un simple point sur l'écran.
3. Resserrer la fente jusqu'à $a = 100\ \mathrm{\mu m}$ et observer la figure, perpendiculaire à la direction de la fente.
4. Repérer les deux extinctions qui bordent la tache centrale et mesurer sa largeur $L$ à la règle.
5. Recommencer pour les six fentes calibrées (200, 120, 100, 70, 50 et 40 µm) sans modifier $D$.
6. Tracer $L$ en fonction de $1/a$ et déterminer la pente de la droite obtenue.

## Exploitation

La première extinction se trouve à la distance $L/2$ du centre de la figure. Comme l'angle est très petit, $\tan\theta \approx \theta$ :

$$
\tan\theta = \frac{L}{2D} \approx \theta
$$

Avec $\theta = \lambda/a$, on obtient :

$$
L = \frac{2\lambda D}{a}
$$

$L$ est donc proportionnelle à $1/a$ : les points s'alignent sur une droite passant par l'origine, de pente $k = 2\lambda D$. Les largeurs $L$ ci-dessous sont lues à la règle, au millimètre près.

| $a$ (µm) | $1/a$ ($\mathrm{mm^{-1}}$) | $L$ (mm) |
|---|---|---|
| 200 | 5,0 | 13 |
| 120 | 8,3 | 22 |
| 100 | 10,0 | 26 |
| 70 | 14,3 | 37 |
| 50 | 20,0 | 52 |
| 40 | 25,0 | 65 |

La pente vaut $k = 2{,}60\ \mathrm{mm^2} = 2{,}60 \times 10^{-6}\ \mathrm{m^2}$, d'où :

$$
\lambda = \frac{k}{2D} = \frac{2{,}60 \times 10^{-6}}{2 \times 2{,}00} = 650\ \mathrm{nm}
$$

Cette valeur correspond bien au rouge d'une diode laser. Utiliser la pente plutôt qu'une seule mesure réduit l'effet des erreurs de lecture sur $L$.

## Questions

1. Pourquoi mesure-t-on la largeur de la tache centrale entre deux extinctions plutôt que d'estimer directement ses bords lumineux ?
2. Dans l'animation, réglez le laser sur 450 nm sans toucher à la fente. Comment évolue la tache centrale ? Que devient la pente de la droite ?
3. Reculez l'écran jusqu'à $D = 2{,}5\ \mathrm{m}$. L'angle $\theta$ change-t-il ? Et la largeur $L$ ?

<details>
<summary>Voir les réponses</summary>

1. L'intensité décroît progressivement vers les bords : leur position est floue. Une extinction est une zone sombre nette, repérable au millimètre près.
2. $L$ est proportionnelle à $\lambda$ : la tache se resserre (18,0 mm au lieu de 26,0 mm pour $a = 100\ \mathrm{\mu m}$). La pente $2\lambda D$ diminue dans le même rapport : le bleu est moins diffracté que le rouge.
3. $\theta = \lambda/a$ ne dépend pas de $D$ : il reste égal à 6,5 mrad. En revanche $L = 2D\theta$ augmente, de 26,0 mm à 32,5 mm : éloigner l'écran améliore la précision relative sur $L$.

</details>

## Sécurité

Même de classe 2, un laser peut léser la rétine. Ne jamais regarder dans l'axe du faisceau, ni directement ni après réflexion : retirer montres et bijoux, écarter tout objet réfléchissant. Garder le faisceau horizontal, sous la hauteur des yeux, et travailler debout. Éteindre le laser avant chaque changement de fente ou réglage.
