import React from "react";

import "../style.css";
import {Pokemon} from "./pokemon.js"
import {max_hp, max_xp} from "./constants.js"

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

        if (this.state.key_cache === "")
        {
            this.setState({key_cache : event.key});
        }
        else {
            this.attack(this.state.key_cache, event.key);
            this.setState({key_cache : ""})
        }
        
    }

    attack(p1,p2){
        const filiere_key = ["m", "e", "i", "t", "r", "s"];

        this.exp_up(filiere_key.indexOf(p1), 10);
        this.hp_down(filiere_key.indexOf(p2), 1);
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