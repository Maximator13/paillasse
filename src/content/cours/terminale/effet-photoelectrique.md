---
titre: "Effet photoélectrique : la lumière, un flux de photons"
description: "Énergie du photon, travail d'extraction, bilan énergétique, absorption et émission, cellules photovoltaïques, capteurs et DEL."
niveau: terminale
theme: ondes
ordre: 23
duree: "30 min"
motsCles: ["photon", "effet photoélectrique", "travail d'extraction", "rendement", "cellule photovoltaïque", "DEL"]
tp: ["effet-photoelectrique"]
---

> **L'essentiel.** La lumière échange de l'énergie avec la matière par paquets indivisibles, les **photons**, d'énergie $E = h\nu$. Un photon arrache un électron à un métal seulement si son énergie est au moins égale au **travail d'extraction** $W$ : c'est l'effet photoélectrique, et l'excédent $h\nu - W$ devient au plus l'énergie cinétique de l'électron. Ce même modèle explique l'absorption et l'émission de photons par les atomes, les capteurs de lumière, les cellules photovoltaïques (caractérisées par leur rendement) et les diodes électroluminescentes.

## 1. Le photon, quantum d'énergie lumineuse

Le modèle ondulatoire décrit très bien la diffraction et les interférences, mais il échoue à expliquer certains échanges d'énergie entre lumière et matière. En 1905, Einstein propose que la lumière soit constituée de **photons**.

> **Définition.** Le photon est une particule de masse nulle, se déplaçant à la vitesse $c$ dans le vide et transportant un quantum d'énergie $E = h\nu = \dfrac{hc}{\lambda}$,
> avec $h = 6{,}63 \times 10^{-34}\ \mathrm{J \cdot s}$ (constante de Planck), $\nu$ la fréquence en $\mathrm{Hz}$ et $\lambda$ la longueur d'onde dans le vide en $\mathrm{m}$.

À l'échelle atomique, on exprime souvent les énergies en **électronvolts** : $1\ \mathrm{eV} = 1{,}60 \times 10^{-19}\ \mathrm{J}$. Un photon visible transporte entre $1{,}6$ et $3{,}1\ \mathrm{eV}$ environ : plus la longueur d'onde est courte, plus le photon est énergétique (un photon UV l'est davantage qu'un photon rouge).

Un faisceau de puissance $\mathcal{P}$ et de fréquence $\nu$ est un **flux de photons** : le nombre de photons transportés par seconde vaut

$$
N = \frac{\mathcal{P}}{h\nu}
$$

Ce nombre est considérable : un laser rouge ($\lambda = 633\ \mathrm{nm}$) de $1\ \mathrm{mW}$ émet environ $3 \times 10^{15}$ photons par seconde.

## 2. L'effet photoélectrique

Une plaque de zinc chargée négativement se décharge quand on l'éclaire en ultraviolet, mais pas en lumière visible, même très intense. La lumière arrache des électrons au métal : c'est l'**effet photoélectrique**.

Les observations expérimentales sont les suivantes :

| Observation | Ce que prévoit le modèle ondulatoire | Ce qu'explique le modèle du photon |
|---|---|---|
| Il existe une **fréquence seuil** $\nu_0$ en dessous de laquelle aucun électron n'est émis | l'émission devrait finir par se produire à forte intensité | un photon trop peu énergétique ne peut pas arracher l'électron, quel que soit leur nombre |
| Au-dessus du seuil, l'émission est **immédiate** | il faudrait un temps d'accumulation | l'interaction photon-électron est individuelle et instantanée |
| L'énergie des électrons dépend de $\nu$, **pas de l'intensité** | elle devrait croître avec l'intensité | chaque électron reçoit l'énergie $h\nu$ d'un seul photon ; l'intensité ne fixe que le nombre de photons, donc d'électrons émis |

> **Définition.** Le **travail d'extraction** $W$ d'un métal est l'énergie minimale à fournir pour arracher un électron à ce métal. Il dépend du métal : environ $2{,}1\ \mathrm{eV}$ pour le césium, $2{,}3\ \mathrm{eV}$ pour le sodium, $4{,}3\ \mathrm{eV}$ pour le zinc.

L'effet photoélectrique se produit si et seulement si $h\nu \geq W$. On en déduit la fréquence seuil et la longueur d'onde seuil :

$$
\nu_0 = \frac{W}{h}
\qquad\text{et}\qquad
\lambda_0 = \frac{hc}{W}
$$

L'effet a lieu pour $\nu \geq \nu_0$, c'est-à-dire pour $\lambda \leq \lambda_0$.

## 3. Bilan énergétique

Lors de l'interaction, un photon cède **toute** son énergie à **un seul** électron. Une partie sert à extraire l'électron, le reste se retrouve sous forme d'énergie cinétique :

> **Loi.** L'énergie cinétique maximale d'un électron émis par effet photoélectrique vaut $E_{c,\max} = h\nu - W$.

Le mot « maximale » rappelle que $W$ est le minimum d'énergie nécessaire : un électron plus profondément lié repart avec moins d'énergie. La courbe $E_{c,\max} = f(\nu)$ est une **droite** de pente $h$ (la même pour tous les métaux) qui coupe l'axe des abscisses en $\nu_0$.

On en tire la vitesse maximale des électrons émis, avec $m_e = 9{,}11 \times 10^{-31}\ \mathrm{kg}$ :

$$
v_{\max} = \sqrt{\frac{2\,E_{c,\max}}{m_e}}
$$

## 4. Absorption et émission de photons

Le modèle du photon s'applique à tous les échanges d'énergie entre lumière et matière. L'énergie d'un atome est **quantifiée** : elle ne peut prendre que certaines valeurs $E_1, E_2, E_3, \dots$ appelées niveaux d'énergie.

- **Absorption** : un atome dans l'état d'énergie $E_p$ absorbe un photon et passe au niveau supérieur $E_n$ uniquement si l'énergie du photon correspond exactement à l'écart, $h\nu = E_n - E_p$.
- **Émission** : en se désexcitant de $E_n$ vers $E_p$, l'atome émet un photon de fréquence $\nu = \dfrac{E_n - E_p}{h}$.

C'est l'origine des **spectres de raies**, d'absorption ou d'émission, qui caractérisent chaque élément chimique. Dans les solides semi-conducteurs, les niveaux forment des bandes séparées par une **bande interdite** d'énergie $E_g$ (le « gap »), qui joue le même rôle que l'écart entre deux niveaux.

## 5. Applications : cellules photovoltaïques, capteurs et DEL

**Cellule photovoltaïque.** Un photon d'énergie $h\nu \geq E_g$ absorbé dans le semi-conducteur (souvent du silicium, $E_g = 1{,}1\ \mathrm{eV}$) libère un électron qui participe à un courant : c'est l'**effet photoélectrique interne**. La cellule convertit l'énergie lumineuse en énergie électrique.

> **Définition.** Le rendement d'une cellule photovoltaïque est le rapport de la puissance électrique fournie à la puissance lumineuse reçue.

$$
\eta = \frac{\mathcal{P}_{\text{élec}}}{\mathcal{P}_{\text{lum}}} = \frac{U\,I}{E \cdot S}
$$

où $E$ est l'éclairement en $\mathrm{W \cdot m^{-2}}$ (à ne pas confondre avec l'énergie $E$ d'un photon) et $S$ la surface éclairée en $\mathrm{m^2}$.

Le rendement des cellules commerciales au silicium est de l'ordre de 15 à 22 %. Il est limité car les photons d'énergie inférieure à $E_g$ ne sont pas absorbés et l'excédent d'énergie des photons plus énergétiques est perdu sous forme thermique.

**Capteurs.** Photodiodes, photorésistances et capteurs CCD ou CMOS des appareils photo exploitent le même principe : le nombre d'électrons libérés est proportionnel au nombre de photons reçus, donc à l'éclairement. Chaque pixel mesure ainsi une quantité de lumière.

**Diode électroluminescente (DEL).** C'est le phénomène inverse : un électron qui franchit la bande interdite en sens inverse émet un photon d'énergie voisine de $E_g$. La couleur de la DEL dépend donc du matériau semi-conducteur : $\lambda \approx \dfrac{hc}{E_g}$. Une DEL convertit l'énergie électrique en lumière avec un bien meilleur rendement qu'une lampe à incandescence.

## Exercice type

On éclaire une plaque de sodium, de travail d'extraction $W = 2{,}28\ \mathrm{eV}$, avec une lumière monochromatique de longueur d'onde $\lambda = 400\ \mathrm{nm}$.

Données : $h = 6{,}63 \times 10^{-34}\ \mathrm{J \cdot s}$, $c = 3{,}00 \times 10^{8}\ \mathrm{m \cdot s^{-1}}$, $1\ \mathrm{eV} = 1{,}60 \times 10^{-19}\ \mathrm{J}$, $m_e = 9{,}11 \times 10^{-31}\ \mathrm{kg}$.

1. Calculer l'énergie d'un photon, en joule puis en électronvolt.
2. Y a-t-il effet photoélectrique ? Calculer la longueur d'onde seuil du sodium.
3. Calculer l'énergie cinétique maximale et la vitesse maximale des électrons émis.

<details>
<summary>Voir la correction</summary>

1. Énergie du photon :

$$
E = \frac{hc}{\lambda} = \frac{6{,}63 \times 10^{-34} \times 3{,}00 \times 10^{8}}{400 \times 10^{-9}} = 4{,}97 \times 10^{-19}\ \mathrm{J}
$$

soit $E = \dfrac{4{,}97 \times 10^{-19}}{1{,}60 \times 10^{-19}} = 3{,}11\ \mathrm{eV}$.

2. $E = 3{,}11\ \mathrm{eV} > W = 2{,}28\ \mathrm{eV}$ : l'effet photoélectrique se produit. Avec $W = 2{,}28 \times 1{,}60 \times 10^{-19} = 3{,}65 \times 10^{-19}\ \mathrm{J}$ :

$$
\lambda_0 = \frac{hc}{W} = \frac{6{,}63 \times 10^{-34} \times 3{,}00 \times 10^{8}}{3{,}65 \times 10^{-19}} = 5{,}45 \times 10^{-7}\ \mathrm{m} = 545\ \mathrm{nm}
$$

On vérifie bien $\lambda = 400\ \mathrm{nm} < \lambda_0$.

3. Bilan énergétique :

$$
E_{c,\max} = E - W = 4{,}97 \times 10^{-19} - 3{,}65 \times 10^{-19} = 1{,}32 \times 10^{-19}\ \mathrm{J}\ (0{,}83\ \mathrm{eV})
$$

$$
v_{\max} = \sqrt{\frac{2 \times 1{,}32 \times 10^{-19}}{9{,}11 \times 10^{-31}}} = 5{,}38 \times 10^{5}\ \mathrm{m \cdot s^{-1}}
$$

</details>

## À retenir

- Énergie d'un photon : $E = h\nu = \dfrac{hc}{\lambda}$ ; un faisceau de puissance $\mathcal{P}$ transporte $N = \dfrac{\mathcal{P}}{h\nu}$ photons par seconde.
- Effet photoélectrique si $h\nu \geq W$, soit $\lambda \leq \lambda_0 = \dfrac{hc}{W}$.
- Bilan énergétique : $E_{c,\max} = h\nu - W$.
- Absorption ou émission entre deux niveaux : $h\nu = E_n - E_p$.
- Rendement d'une cellule photovoltaïque : $\eta = \dfrac{\mathcal{P}_{\text{élec}}}{E \cdot S}$.

## Erreurs fréquentes

- Croire qu'une lumière **plus intense** permet de franchir le seuil : seule la fréquence compte, l'intensité ne change que le nombre d'électrons émis.
- Mélanger joules et électronvolts dans un même calcul : convertir avant de soustraire.
- Oublier de convertir les nanomètres en mètres dans $E = \dfrac{hc}{\lambda}$.
- Inverser le sens de l'inégalité : l'effet a lieu pour $\lambda$ **inférieure** à $\lambda_0$, pas supérieure.
