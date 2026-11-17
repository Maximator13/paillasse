---
titre: "Décroissance radioactive et demi-vie"
description: "Regardez des noyaux de radon 220 se désintégrer au hasard, comptez les particules émises et retrouvez la loi exponentielle et la demi-vie."
niveau: terminale
theme: matiere
matiere: physique
ordre: 5
duree: "1 h"
chapitre: "radioactivite"
objectifs:
  - "Relier le caractère aléatoire d'une désintégration à la loi de décroissance d'une population de noyaux"
  - "Déterminer une demi-vie à partir de la courbe N(t)"
  - "Calculer la constante radioactive et l'activité d'un échantillon"
materiel:
  - "Source scellée de radon 220 (fiole à thoron)"
  - "Compteur de radioactivité et son tube détecteur"
  - "Chronomètre"
  - "Ordinateur avec tableur-grapheur"
  - "Écran de protection et pince de manipulation"
---

## Principe

Un noyau radioactif est instable : il se transforme spontanément en un autre noyau en émettant une particule. Le radon 220 est radioactif α :

$$
\mathrm{^{220}_{86}Rn \rightarrow {}^{216}_{84}Po + {}^{4}_{2}He}
$$

Il est impossible de prévoir l'instant où un noyau donné se désintègre. En revanche, chaque noyau a la même probabilité $\lambda$ de se désintégrer par unité de temps. Pour une population de $N$ noyaux, le nombre de désintégrations par seconde, appelé **activité**, vaut donc $A = \lambda N$, et le nombre de noyaux restants suit la loi de décroissance :

$$
N(t) = N_0\,\mathrm{e}^{-\lambda t}
$$

Dans l'animation, chaque particule émise est dirigée vers le compteur. Un vrai détecteur n'en reçoit qu'une fraction, mais le nombre de coups enregistrés reste proportionnel à l'activité.

## Protocole

1. Placer l'échantillon de radon 220 dans l'enceinte, face au tube du compteur. Noter le nombre initial de noyaux $N_0$.
2. Observer une désintégration isolée : identifier le noyau père, le noyau fils et la particule émise.
3. Déclencher le chronomètre et le comptage. Relever le nombre de noyaux restants toutes les dix secondes pendant $300\ \mathrm{s}$.
4. Tracer $N = f(t)$, superposer la courbe modèle $N_0\,\mathrm{e}^{-\lambda t}$, puis lire la demi-vie $t_{1/2}$ à l'ordonnée $N_0/2$.
5. Calculer la constante radioactive $\lambda$ et l'activité initiale $A_0$.

## Exploitation

La **demi-vie** $t_{1/2}$ est la durée au bout de laquelle la moitié des noyaux initialement présents se sont désintégrés. En écrivant $N(t_{1/2}) = N_0/2$ dans la loi de décroissance, on obtient :

$$
t_{1/2} = \frac{\ln 2}{\lambda} \qquad\Longleftrightarrow\qquad \lambda = \frac{\ln 2}{t_{1/2}}
$$

Avec les réglages par défaut, $N_0 = 160$ et $t_{1/2} = 56\ \mathrm{s}$ :

$$
\lambda = \frac{0{,}693}{56} = 1{,}24 \times 10^{-2}\ \mathrm{s^{-1}}
$$

$$
A_0 = \lambda N_0 = 1{,}24 \times 10^{-2} \times 160 \approx 2{,}0\ \mathrm{Bq}
$$

Après deux demi-vies ($112\ \mathrm{s}$), il reste $N_0/4 = 40$ noyaux, et après $300\ \mathrm{s}$ il en reste environ $160 \times \mathrm{e}^{-3{,}71} \approx 4$. L'activité est divisée par deux à chaque demi-vie, comme $N$.

La courbe expérimentale est un escalier irrégulier : elle fluctue autour de la courbe modèle, parce que les désintégrations sont aléatoires. La demi-vie lue sur un seul tirage peut ainsi s'écarter de plusieurs secondes de la valeur attendue.

## Questions

1. Modifiez plusieurs fois le curseur « Tirage au sort ». Qu'est-ce qui change, qu'est-ce qui ne change pas ?
2. Réglez le nombre de noyaux sur 64 puis sur 208. Dans quel cas la courbe mesurée colle-t-elle le mieux au modèle ? Que se passerait-il avec un échantillon réel ?
3. Un échantillon a une demi-vie de $56\ \mathrm{s}$. Au bout de combien de temps son activité est-elle divisée par 8 ? Vérifiez en plaçant le curseur de demi-vie sur 56 s.

<details>
<summary>Voir les réponses</summary>

1. Les noyaux qui se désintègrent et les instants précis changent, donc le détail de l'escalier aussi. La courbe modèle, la demi-vie et la constante radioactive ne changent pas : elles caractérisent le noyau, pas le tirage.
2. Avec 208 noyaux, les fluctuations relatives sont plus faibles (elles varient comme $1/\sqrt{N}$). Un échantillon réel en contient bien davantage (plusieurs centaines de milliers dans une fiole à thoron dont l'activité est de quelques kilobecquerels) : la courbe mesurée se rapproche beaucoup plus de l'exponentielle.
3. Diviser par $8 = 2^3$ demande trois demi-vies, soit $3 \times 56 = 168\ \mathrm{s}$. Sur le graphique, il reste alors environ $N_0/8 = 20$ noyaux.

</details>

## Sécurité

Une source radioactive scellée ne s'ouvre jamais et se manipule à la pince, derrière un écran, pendant une durée aussi courte que possible. Elle est rangée dans son conteneur dès la fin des mesures.
