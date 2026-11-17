---
titre: "Effet photoélectrique et constante de Planck"
description: "Éclairez une cathode avec des photons de fréquence croissante, repérez le seuil d'émission et tirez la constante de Planck de la droite obtenue."
niveau: terminale
theme: ondes
matiere: physique
ordre: 19
duree: "1 h"
chapitre: "effet-photoelectrique"
objectifs:
  - "Mettre en évidence l'existence d'une fréquence seuil"
  - "Distinguer le rôle de la fréquence et celui de l'intensité lumineuse"
  - "Exploiter la droite d'Einstein pour mesurer h et le travail d'extraction"
materiel:
  - "Cellule photoélectrique à vide (cathode au potassium)"
  - "Lampe à vapeur de mercure et jeu de filtres colorés"
  - "Diaphragme pour régler l'intensité lumineuse"
  - "Microampèremètre"
  - "Générateur de tension réglable et voltmètre (potentiel d'arrêt)"
  - "Fils de connexion"
---

## Principe

La lumière de fréquence $\nu$ est constituée de photons, chacun d'énergie $E = h\nu$. Lorsqu'un photon est absorbé par le métal de la cathode, il cède toute son énergie à un électron. Si cette énergie dépasse le **travail d'extraction** $W$ du métal, l'électron est arraché et emporte le surplus sous forme d'énergie cinétique :

$$
E_{c\,\mathrm{max}} = h\nu - W
$$

L'émission n'a donc lieu que si $\nu > \nu_0$, avec la **fréquence seuil** $\nu_0 = \dfrac{W}{h}$. L'intensité lumineuse fixe le nombre de photons reçus par seconde, donc le nombre d'électrons émis, mais pas leur énergie.

## Protocole

1. Relier la cathode et l'anode de la cellule au microampèremètre. Placer la lampe face à la cathode.
2. Éclairer en lumière rouge ($\nu = 4{,}3 \times 10^{14}\ \mathrm{Hz}$). Ouvrir le diaphragme en grand : relever l'intensité du courant.
3. Changer de filtre pour augmenter la fréquence, du rouge vers l'ultraviolet. Pour chaque fréquence, noter si un courant apparaît et mesurer $E_{c\,\mathrm{max}}$ (par le potentiel d'arrêt $U_0$ qui annule le courant : $E_{c\,\mathrm{max}} = e\,U_0$).
4. À fréquence fixée, faire varier l'intensité lumineuse et relever le courant ainsi que $E_{c\,\mathrm{max}}$.
5. Tracer $E_{c\,\mathrm{max}} = f(\nu)$ et modéliser la partie croissante par une droite.

## Exploitation

En lumière rouge, le courant reste nul quelle que soit l'intensité : un photon rouge apporte $1{,}78\ \mathrm{eV}$, moins que le travail d'extraction du potassium ($W = 2{,}3\ \mathrm{eV}$). Le modèle ondulatoire, qui prévoit une accumulation progressive d'énergie, ne peut pas l'expliquer.

Au-delà du seuil, les points s'alignent sur une droite de pente $h$ et d'ordonnée à l'origine $-W$. Avec les énergies en électronvolts, la pente vaut $4{,}14 \times 10^{-15}\ \mathrm{eV \cdot s}$, soit :

$$
h = 4{,}14 \times 10^{-15} \times 1{,}602 \times 10^{-19} = 6{,}63 \times 10^{-34}\ \mathrm{J \cdot s}
$$

La droite coupe l'axe des abscisses à la fréquence seuil :

$$
\nu_0 = \frac{W}{h} = \frac{2{,}3 \times 1{,}602 \times 10^{-19}}{6{,}63 \times 10^{-34}} = 5{,}56 \times 10^{14}\ \mathrm{Hz}
$$

Pour $\nu = 7{,}5 \times 10^{14}\ \mathrm{Hz}$, on lit $E_{c\,\mathrm{max}} = 3{,}10 - 2{,}3 = 0{,}80\ \mathrm{eV}$, valeur qui ne bouge pas quand l'intensité varie, alors que le courant lui est proportionnel.

## Questions

1. Pourquoi une lumière rouge très intense n'arrache-t-elle aucun électron au potassium ?
2. Dans l'animation, réglez la fréquence sur $7{,}5 \times 10^{14}\ \mathrm{Hz}$ puis augmentez le travail d'extraction. À partir de quelle valeur de $W$ le courant s'annule-t-il ? La pente de la droite change-t-elle ?
3. Faites passer l'intensité lumineuse de 20 % à 100 %. Que deviennent le courant et $E_{c\,\mathrm{max}}$ ?

<details>
<summary>Voir les réponses</summary>

1. Chaque électron n'interagit qu'avec un seul photon. Un photon rouge apporte $1{,}78\ \mathrm{eV}$, ce qui est inférieur à $W$ : augmenter le nombre de photons n'y change rien.
2. Un photon de cette fréquence apporte $3{,}10\ \mathrm{eV}$ : le courant s'annule dès que $W$ dépasse cette valeur (curseur sur 3,2 eV). La droite se décale vers la droite, mais sa pente reste égale à $h$, constante universelle.
3. Le courant est multiplié par 5 (de 0,16 à 0,80 µA), car cinq fois plus de photons arrivent chaque seconde. $E_{c\,\mathrm{max}}$ reste égale à 0,80 eV : elle ne dépend que de la fréquence et du métal.

</details>

## Sécurité

La lampe à vapeur de mercure émet des ultraviolets : ne jamais regarder directement la source et laisser son capot en place. La lampe chauffe, attendre son refroidissement avant de la manipuler.
