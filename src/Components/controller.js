import React from "react";

import "../style.css";
import {Pokemon} from "./pokemon.js"
import {max_hp, max_xp, filiere_key} from "./constants.js"

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemons : [new Pokemon({ filiere_id : 0}), 
                new Pokemon({ filiere_id : 1}), 
                new Pokemon({ filiere_id : 2}), 
                new Pokemon({ filiere_id : 3}), 
                new Pokemon({ filiere_id : 4}), 
                new Pokemon({ filiere_id : 5})],
            key_cache : ""
        }
    }

    componentDidMount(){
        //link appuie touche, détection front montant
        let onKeyDown = (event) => {
            this.key_press(event);
            document.removeEventListener('keypress', onKeyDown, false);
        }

        let bindKeyDown = () => {
          document.addEventListener('keypress', onKeyDown, false);
        }
        document.addEventListener('keyup',bindKeyDown, false)   
        bindKeyDown();
    }

    componentWillUnmount(){
        document.removeEventListener("keypress", this.key_press.bind(this), false);
    }

    key_press(event) {
        if(event.key !== "x")
        {
            if(filiere_key.includes(event.key))
            {
                if (this.state.key_cache === "")
                {
                    this.setState({key_cache : event.key});
                }
                else {
                    if(event.key !== this.state.key_cache)
                    {
                        this.attack(this.state.key_cache, event.key);
                        this.setState({key_cache : ""})
                    }
                }
            }
        }
        else
        {
            this.setState({key_cache : ""})
        }
        
    }

    attack(p1,p2){
        const i1 = filiere_key.indexOf(p1);
        const i2 = filiere_key.indexOf(p2)

        if(this.state.pokemons[i1].state.ko === false && this.state.pokemons[i2].state.ko === false)
        {
            this.exp_up(i1, 10);
            this.hp_down(i2, 10);
            this.attackAnimate(i1, i2);
        }
    }

    attackAnimate(i1, i2) { 
        const pokemons = this.state.pokemons.slice();
        pokemons[i1].state.animationImg = "";
        pokemons[i1].state.keyframes = "";
        this.setState({pokemons : pokemons})

        let p1_y = document.getElementById('img-'+i1).offsetTop;
        let p1_x = document.getElementById('img-'+i1).offsetLeft;
        let p2_y = document.getElementById('img-'+i2).offsetTop;
        let p2_x = document.getElementById('img-'+i2).offsetLeft;
        console.log(i1, i2);

        let keyframes =
        `@-webkit-keyframes attack-${i1} {
            0% {-webkit-transform:translate(0px, 0px); z-index : 1;} 
            50% {-webkit-transform:translate(${p2_x - p1_x}px, ${p2_y - p1_y}px); z-index : 1;}
            100% {-webkit-transform:translate(0px, 0px); z-index : 0;}
        }`;

        pokemons[i1].state.animationImg = " 0.5s linear attack-" + i1
        pokemons[i1].state.keyframes = keyframes;
        this.setState({pokemons : pokemons})
    }

    hp_up = (i, n) => {
        const pokemons = this.state.pokemons.slice();
        pokemons[i].state.hp = pokemons[i].state.hp + n;

        if (pokemons[i].state.hp > max_hp)
        {
            pokemons[i].state.hp = max_hp;
        }

        this.setState({pokemons : pokemons});
    }

    hp_down = (i, n) => {
        const pokemons = this.state.pokemons.slice();
        pokemons[i].state.hp = pokemons[i].state.hp - n;

        if (pokemons[i].state.hp < 0)
        {
            pokemons[i].state.hp = 0;
        }

        if(pokemons[i].state.hp === 0)
        {
            pokemons[i].state.ko = true;
        }

        this.setState({pokemons : pokemons});
    }

    exp_up(i,n) {
        const pokemons = this.state.pokemons.slice();

        if(!(pokemons[i].state.evo === 2 && pokemons[i].state.exp === max_xp )){
            pokemons[i].state.exp = pokemons[i].state.exp + n;
        }

        this.exp_check(i, pokemons);
        this.setState({pokemons : pokemons});
    }

    exp_check(i, pokemons) {
        if(pokemons[i].state.exp >= max_xp && pokemons[i].state.evo !== 2) {
            pokemons[i].state.exp = pokemons[i].state.exp - max_xp;
            pokemons[i].state.evo = pokemons[i].state.evo + 1;
            pokemons[i].state.hp = pokemons[i].state.hp + 30;
            if(pokemons[i].state.hp > max_hp)
            {
                pokemons[i].state.hp = max_hp;
            }
        }
        else if (pokemons[i].state.exp >= max_xp && pokemons[i].state.evo === 2) {
            pokemons[i].state.exp = max_xp;
        }
    }

    render() {
        const pokemon_show = this.state.pokemons.map((p) => {return p.render()})
        return (
            <div class="pokemon-grid">
                {pokemon_show}
            </div>
        );
    }
}

export {App};