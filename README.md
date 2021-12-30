# P-fighters

P-fighters est une application web faisant combattre des pokémons grace aux commandes entrée par l'utilisateur. Cette application a été développée dans le cadre d'une soirée organisée par le Bureau des Elèves de l'ENSEIRB-MATMECA, opposant les participants qui étaient organiser en plusieurs équipes, chacune controllant un Pokémon.

## Fonctionnement

Les controles de l'application se font grâce aux touches 1 à 6, et la touche Echap. Le maitre du jeu appuie en premier sur la touche correspondant à l'attanquant, puis celle correspondant à l'attaqué. Le premier Pokémon attaque le second, gagnant 1 point d'expérience et faisant perdre 1 point de vie à la victime. Si il fait une fausse manipulation, l'utilisateur peut appuyer sur Echap pour remettre sa commande à zero. 

Quand un Pokémon n'a plus de points de vie, il est KO et ne peut plus attaquer. Quand un Pokémon rempli sa barre d'expérience, il évolue et regagne des points de vie. Le dernier Pokémon en vie est déclaré vainqueur.

## Configuration

La configuration de l'application se fait dans le fichier constants.js, et se fait par la modification de trois constantes :

### `max_hp`

Défini le maximum de points de vie d'un Pokémon.

### `max_xp`

Tableau du maximum d'expérience pour évoluer par Pokémon, dans l'ordre d'apparition.

### `filiere_key`

Tableau des touches correspondantes à chaque Pokémon.
