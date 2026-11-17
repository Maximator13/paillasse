---
titre: "Synthèse d'un ester par chauffage à reflux"
description: "Chauffez à reflux un acide et un alcool, suivez l'avancement jusqu'à l'équilibre et cherchez comment dépasser 67 % de rendement."
niveau: terminale
theme: matiere
matiere: chimie
ordre: 9
duree: "1 h 30"
chapitre: "strategie-synthese"
objectifs:
  - "Réaliser un montage de chauffage à reflux et justifier son intérêt"
  - "Relier avancement final, état d'équilibre et quotient de réaction"
  - "Calculer le rendement d'une synthèse"
  - "Identifier les facteurs qui modifient la vitesse ou le rendement"
materiel:
  - "Ballon à fond rond de 100 mL et chauffe-ballon"
  - "Réfrigérant à boules, tuyaux d'arrivée et de sortie d'eau"
  - "Potence, pinces et support élévateur"
  - "Deux éprouvettes graduées de 50 mL"
  - "3-méthylbutan-1-ol et acide éthanoïque pur"
  - "Acide sulfurique concentré (compte-gouttes), grains de pierre ponce"
---

## Principe

L'éthanoate de 3-méthylbutyle, à l'odeur de banane, est obtenu par réaction entre l'acide éthanoïque et le 3-méthylbutan-1-ol :

$$
\mathrm{CH_3COOH + C_5H_{11}OH \rightleftarrows CH_3COOC_5H_{11} + H_2O}
$$

Cette estérification est **lente** et **limitée** : elle conduit à un état d'équilibre, de constante $K \approx 4$ pour un alcool primaire. Pour l'accélérer, on chauffe et on ajoute un catalyseur (l'acide sulfurique). Le **chauffage à reflux** permet de maintenir le mélange à l'ébullition sans perte de matière : les vapeurs se condensent dans le réfrigérant et retombent dans le ballon.

## Protocole

1. Sous la hotte, introduire dans le ballon $21{,}8\ \mathrm{mL}$ de 3-méthylbutan-1-ol ($0{,}20\ \mathrm{mol}$), $11{,}4\ \mathrm{mL}$ d'acide éthanoïque ($0{,}20\ \mathrm{mol}$), 5 gouttes d'acide sulfurique concentré et quelques grains de pierre ponce.
2. Fixer le ballon à la potence, adapter le réfrigérant à boules verticalement. Brancher l'eau : entrée par le bas, sortie par le haut.
3. Mettre en marche le chauffe-ballon et maintenir une ébullition douce pendant 60 min. Les vapeurs ne doivent pas dépasser le premier tiers du réfrigérant.
4. Observer la courbe d'avancement : elle plafonne lorsque l'équilibre est atteint.
5. Couper le chauffage, abaisser le chauffe-ballon et laisser refroidir sans arrêter la circulation d'eau. Calculer le rendement.

## Exploitation

Le mélange est équimolaire : $x_\mathrm{max} = 0{,}20\ \mathrm{mol}$. À l'équilibre, le quotient de réaction est égal à $K$ (l'eau n'est pas le solvant, elle figure dans $Q_r$) :

$$
Q_{r,\mathrm{éq}} = \frac{x_f^2}{(0{,}20 - x_f)^2} = 4
$$

On en déduit :

$$
x_f = \frac{2}{3} \times 0{,}20 = 0{,}133\ \mathrm{mol}
$$

Le rendement vaut donc :

$$
\eta = \frac{x_f}{x_\mathrm{max}} = \frac{0{,}133}{0{,}20} = 67\ \%
$$

soit une masse d'ester $m = 0{,}133 \times 130{,}2 = 17{,}4\ \mathrm{g}$, au lieu de $26{,}0\ \mathrm{g}$ pour une transformation totale.

| Facteur | Vitesse | Rendement à l'équilibre |
|---|---|---|
| Température plus élevée | augmente | inchangé |
| Catalyseur | augmente | inchangé |
| Réactif en excès | augmente | augmente |

## Questions

1. Pourquoi l'eau doit-elle entrer par le bas du réfrigérant ?
2. Dans l'animation, portez la quantité d'acide à $0{,}40\ \mathrm{mol}$ puis $0{,}60\ \mathrm{mol}$. Que devient le rendement ? Quel réactif est limitant ?
3. Réglez la température sur 60 °C, puis retirez le catalyseur (0 goutte) à 120 °C. Le rendement après 60 min change-t-il ? Et le rendement à l'équilibre ?

<details>
<summary>Voir les réponses</summary>

1. Le manchon se remplit ainsi entièrement, sans poche d'air : toute la paroi est froide et la condensation des vapeurs est efficace.
2. Le rendement passe à 85 % puis 90 % : un excès d'un réactif déplace l'équilibre dans le sens de la formation de l'ester. L'alcool reste le réactif limitant, $x_\mathrm{max}$ vaut toujours $0{,}20\ \mathrm{mol}$.
3. Après 60 min, le rendement chute à 27 % à 60 °C et à 6 % sans catalyseur : l'équilibre n'est pas atteint. Le rendement à l'équilibre reste de 67 % : température et catalyseur sont des facteurs cinétiques, ils ne modifient pas l'état final. À 60 °C, le mélange ne bout plus : c'est bien l'ébullition entretenue par le reflux qui permet de chauffer fort, donc de gagner du temps.

</details>

## Sécurité

L'acide sulfurique concentré et l'acide éthanoïque pur sont corrosifs, l'alcool est inflammable : blouse, lunettes, gants et travail sous hotte. Ne jamais boucher le haut du réfrigérant : le montage doit rester ouvert à l'air pour éviter toute surpression.
