---
titre: "Mécanique des fluides : poussée d'Archimède et écoulements"
description: "Poussée d'Archimède, débit volumique, conservation du débit et relation de Bernoulli : comprendre pourquoi un fluide accélère quand la conduite se rétrécit."
niveau: terminale
theme: mouvement
ordre: 17
duree: "25 min"
motsCles: ["poussée d'Archimède", "débit volumique", "fluide incompressible", "relation de Bernoulli", "effet Venturi"]
tp: ["poussee-archimede", "effet-venturi"]
---

> **L'essentiel.** Un corps plongé dans un fluide subit une force verticale vers le haut, la **poussée d'Archimède**, égale au poids du fluide déplacé. Quand un fluide incompressible s'écoule en régime permanent, son **débit volumique** se conserve : il accélère là où la conduite se rétrécit. La **relation de Bernoulli** relie alors vitesse, pression et altitude : là où la vitesse augmente, la pression diminue (**effet Venturi**).

## 1. La poussée d'Archimède

Un fluide (liquide ou gaz) exerce sur toute surface en contact avec lui des forces pressantes. Sur un corps immergé, la pression est plus forte en bas qu'en haut, car elle augmente avec la profondeur : la résultante de ces forces est dirigée vers le haut.

> **Loi.** Tout corps immergé, totalement ou partiellement, dans un fluide au repos subit de la part de ce fluide une force verticale, orientée vers le haut, dont la valeur est égale au poids du volume de fluide déplacé :
>
> $$
> \vec{\Pi} = -\rho_{\text{fluide}}\,V_{\text{imm}}\,\vec{g} \qquad\text{soit}\qquad \Pi = \rho_{\text{fluide}}\,V_{\text{imm}}\,g
> $$
>

| Grandeur | Signification | Unité |
|---|---|---|
| $\Pi$ | valeur de la poussée d'Archimède | $\mathrm{N}$ |
| $\rho_{\text{fluide}}$ | masse volumique du **fluide** (pas du corps) | $\mathrm{kg \cdot m^{-3}}$ |
| $V_{\text{imm}}$ | volume de la partie **immergée** du corps | $\mathrm{m^3}$ |
| $g$ | intensité de la pesanteur | $\mathrm{N \cdot kg^{-1}}$ |

Exemple : un bloc de $1{,}0\ \mathrm{L}$ totalement immergé dans l'eau ($\rho = 1{,}0 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$) subit $\Pi = 1{,}0 \times 10^{3} \times 1{,}0 \times 10^{-3} \times 9{,}81 \approx 9{,}8\ \mathrm{N}$, quelle que soit sa matière.

Un corps lâché sans vitesse dans un fluide, soumis à son poids $P = \rho_{\text{corps}}\,V\,g$ et à la poussée d'Archimède, a un comportement fixé par la comparaison des masses volumiques :

- $\rho_{\text{corps}} > \rho_{\text{fluide}}$ : le poids l'emporte, le corps **coule** ;
- $\rho_{\text{corps}} < \rho_{\text{fluide}}$ : le corps **remonte**, puis flotte en équilibre avec une partie seulement immergée, telle que $\rho_{\text{fluide}}\,V_{\text{imm}} = \rho_{\text{corps}}\,V$.

Dans l'air ($\rho \approx 1{,}2\ \mathrm{kg \cdot m^{-3}}$), la poussée d'Archimède est presque toujours négligeable devant le poids, sauf pour les ballons gonflés à l'hélium ou à l'air chaud.

## 2. Écoulement en régime permanent et débit volumique

On décrit l'écoulement d'un fluide par la vitesse $\vec{v}$ de ses particules en chaque point. Les **lignes de courant** sont les courbes tangentes en chaque point à ce vecteur vitesse.

> **Définition.** Un écoulement est en **régime permanent** (ou stationnaire) si, en tout point fixe de l'espace, la vitesse et la pression du fluide ne dépendent pas du temps.

En régime permanent, les lignes de courant ne bougent pas : elles coïncident avec les trajectoires des particules de fluide. Une particule peut toutefois accélérer en se déplaçant d'un point à un autre.

> **Définition.** Le **débit volumique** $D_V$ est le volume de fluide qui traverse une section de la conduite par unité de temps :
>
> $$
> D_V = \frac{V}{\Delta t} = v \times S
> $$
>
> avec $D_V$ en $\mathrm{m^3 \cdot s^{-1}}$, $v$ la vitesse moyenne du fluide dans la section en $\mathrm{m \cdot s^{-1}}$ et $S$ l'aire de la section en $\mathrm{m^2}$.

On rencontre aussi le $\mathrm{L \cdot s^{-1}}$ ou le $\mathrm{m^3 \cdot h^{-1}}$ : $1\ \mathrm{L \cdot s^{-1}} = 10^{-3}\ \mathrm{m^3 \cdot s^{-1}}$.

## 3. Conservation du débit

Un fluide est **incompressible** si sa masse volumique est constante : un volume donné de fluide ne peut être ni comprimé ni dilaté. Les liquides sont très bien décrits par ce modèle ; un gaz s'y prête tant que sa vitesse reste faible devant celle du son.

> **Loi.** En régime permanent, le débit volumique d'un fluide incompressible se conserve le long d'une conduite sans fuite ni dérivation. Entre deux sections A et B :
>
> $$
> D_V = v_A\,S_A = v_B\,S_B
> $$
>

Le volume qui entre en A pendant $\Delta t$ doit ressortir en B pendant la même durée, puisque le fluide ne peut ni s'accumuler ni se comprimer entre les deux.

Conséquence directe : **la vitesse est inversement proportionnelle à la section**. Pour une conduite circulaire, $S = \pi r^2$ : diviser le diamètre par 2 divise la section par 4 et **multiplie la vitesse par 4**. C'est ce qu'on fait en pinçant l'embout d'un tuyau d'arrosage pour que le jet porte plus loin.

## 4. La relation de Bernoulli

> **Loi (relation de Bernoulli).** Pour l'écoulement en régime permanent d'un fluide **incompressible** et **parfait** (frottements négligeables), en tout point d'une même ligne de courant :
>
> $$
> p + \frac{1}{2}\,\rho\,v^2 + \rho\,g\,z = \text{constante}
> $$
>

| Terme | Interprétation | Unité |
|---|---|---|
| $p$ | pression du fluide | $\mathrm{Pa}$ |
| $\dfrac{1}{2}\,\rho\,v^2$ | énergie cinétique par unité de volume | $\mathrm{J \cdot m^{-3}} = \mathrm{Pa}$ |
| $\rho\,g\,z$ | énergie potentielle de pesanteur par unité de volume, axe $(Oz)$ vertical vers le haut | $\mathrm{J \cdot m^{-3}} = \mathrm{Pa}$ |

Chaque terme est homogène à une pression. La relation de Bernoulli traduit la **conservation de l'énergie** le long d'une ligne de courant : un gain d'énergie cinétique ou potentielle se paie par une baisse de pression.

Entre deux points A et B d'une même ligne de courant :

$$
p_A + \frac{1}{2}\,\rho\,v_A^2 + \rho\,g\,z_A = p_B + \frac{1}{2}\,\rho\,v_B^2 + \rho\,g\,z_B
$$

Cas particuliers utiles :

- **fluide au repos** ($v_A = v_B = 0$) : on retrouve la loi de la statique des fluides, $p_A - p_B = \rho\,g\,(z_B - z_A)$ ;
- **vidange d'un réservoir** (surface libre et orifice à la pression atmosphérique, vitesse à la surface négligeable) : la vitesse de sortie vaut $v = \sqrt{2\,g\,h}$ (formule de Torricelli), où $h$ est la hauteur de liquide au-dessus de l'orifice.

## 5. L'effet Venturi

Dans une conduite **horizontale** ($z_A = z_B$), la relation de Bernoulli se simplifie :

$$
p_A - p_B = \frac{1}{2}\,\rho\,\left(v_B^2 - v_A^2\right)
$$

> **Effet Venturi.** Dans un rétrécissement, la vitesse du fluide augmente (conservation du débit), donc sa pression diminue (relation de Bernoulli).

Un **tube de Venturi** est une conduite munie d'un étranglement. En mesurant la différence de pression entre la partie large et l'étranglement (par exemple avec deux tubes verticaux dont les hauteurs de liquide diffèrent), on remonte aux vitesses, donc au débit : c'est un **débitmètre**.

On retrouve cet effet dans les trompes à eau de laboratoire (la dépression dans l'étranglement aspire l'air d'une fiole), les pulvérisateurs, les carburateurs, ou le rapprochement de deux bateaux qui naviguent côte à côte.

## Exercice type

De l'eau ($\rho = 1{,}00 \times 10^{3}\ \mathrm{kg \cdot m^{-3}}$) circule en régime permanent dans un tube de Venturi horizontal avec un débit $D_V = 2{,}4\ \mathrm{L \cdot s^{-1}}$. La partie large A a une section $S_A = 12\ \mathrm{cm^2}$, l'étranglement B une section $S_B = 3{,}0\ \mathrm{cm^2}$. La pression en A vaut $p_A = 1{,}50 \times 10^{5}\ \mathrm{Pa}$. L'eau est considérée comme un fluide parfait et incompressible.

1. Calculer les vitesses $v_A$ et $v_B$.
2. En déduire la pression $p_B$ dans l'étranglement.

<details>
<summary>Voir la correction</summary>

1. On convertit : $D_V = 2{,}4 \times 10^{-3}\ \mathrm{m^3 \cdot s^{-1}}$, $S_A = 12 \times 10^{-4}\ \mathrm{m^2}$, $S_B = 3{,}0 \times 10^{-4}\ \mathrm{m^2}$.

$$
v_A = \frac{D_V}{S_A} = \frac{2{,}4 \times 10^{-3}}{12 \times 10^{-4}} = 2{,}0\ \mathrm{m \cdot s^{-1}}
\qquad
v_B = \frac{D_V}{S_B} = \frac{2{,}4 \times 10^{-3}}{3{,}0 \times 10^{-4}} = 8{,}0\ \mathrm{m \cdot s^{-1}}
$$

La section est divisée par 4, la vitesse est bien multipliée par 4 (conservation du débit).

2. La conduite est horizontale ($z_A = z_B$), la relation de Bernoulli donne :

$$
p_B = p_A - \frac{1}{2}\,\rho\,\left(v_B^2 - v_A^2\right) = 1{,}50 \times 10^{5} - \frac{1}{2} \times 1{,}00 \times 10^{3} \times \left(8{,}0^2 - 2{,}0^2\right)
$$

$$
p_B = 1{,}50 \times 10^{5} - 3{,}0 \times 10^{4} = 1{,}20 \times 10^{5}\ \mathrm{Pa}
$$

La pression chute de $3{,}0 \times 10^{4}\ \mathrm{Pa}$ dans l'étranglement : c'est l'effet Venturi.

</details>

## À retenir

- Poussée d'Archimède : verticale, vers le haut, $\Pi = \rho_{\text{fluide}}\,V_{\text{imm}}\,g$.
- Régime permanent : vitesse et pression en un point fixe ne dépendent pas du temps.
- Débit volumique : $D_V = v\,S$, en $\mathrm{m^3 \cdot s^{-1}}$.
- Fluide incompressible en régime permanent : $v_A\,S_A = v_B\,S_B$, la vitesse augmente quand la section diminue.
- Relation de Bernoulli (fluide parfait, incompressible, régime permanent, même ligne de courant) : $p + \frac{1}{2}\rho v^2 + \rho g z = \text{cte}$.
- Effet Venturi : là où la vitesse augmente, la pression diminue.

## Erreurs fréquentes

- Utiliser la masse volumique du **corps** au lieu de celle du **fluide** dans la poussée d'Archimède, ou le volume total au lieu du volume **immergé** pour un corps qui flotte.
- Oublier les conversions : $1\ \mathrm{cm^2} = 10^{-4}\ \mathrm{m^2}$ et $1\ \mathrm{L} = 10^{-3}\ \mathrm{m^3}$.
- Croire que la vitesse est proportionnelle au diamètre : elle est inversement proportionnelle à la **section**, donc au **carré** du diamètre.
- Penser qu'un fluide plus rapide « pousse plus fort » : dans un étranglement, la pression **baisse**.
- Appliquer Bernoulli entre deux points de lignes de courant différentes, ou à un écoulement où les frottements ne sont pas négligeables.
