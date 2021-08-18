import React from "react";
import reactDom from "react-dom";

import "./style.css";

import bulbizarre from "./img/pokemon/Bulbasaur.gif"
import herbizarre from "./img/pokemon/Ivysaur.gif"
import florizarre from "./img/pokemon/Venusaur.gif"

import carapuce from "./img/pokemon/Squirtle.gif"
import carabaffe from "./img/pokemon/Wartortle.gif"
import tortank from "./img/pokemon/Blastoise.gif"

import salameche from "./img/pokemon/Charmander.gif"
import reptincel from "./img/pokemon/Charmeleon.gif"
import dracaufeu from "./img/pokemon/Charizard.gif"

import pichu from "./img/pokemon/Pichu.gif"
import pikachu from "./img/pokemon/Pikachu.gif"
import raichu from "./img/pokemon/Raichu.gif"

import fantominus from "./img/pokemon/Gastly.gif"
import spectrum from "./img/pokemon/Haunter.gif"
import ectoplasma from "./img/pokemon/Gengar.gif"

import melo from "./img/pokemon/Cleffa.gif"
import melofee from "./img/pokemon/Clefairy.gif"
import melodelfe from "./img/pokemon/Clefable.gif"

import feu from "./img/type/feu.png"
import plante from "./img/type/plante.png"
import eau from "./img/type/eau.png"
import electrik from "./img/type/electrik.png"
import spectre from "./img/type/spectre.png"
import fee from "./img/type/fee.png"

let matmeca = [salameche,reptincel,dracaufeu];
let elec = [carapuce,carabaffe,tortank];
let info = [bulbizarre,herbizarre,florizarre];
let telecom = [pichu,pikachu,raichu];
let rsi = [fantominus, spectrum, ectoplasma];
let see = [melo, melofee, melodelfe];

let element = [feu,eau,plante,electrik,spectre,fee];

let n_matmeca = ["Salameche","Reptincel","Dracaufeu"];
let n_elec = ["Carapuce","Carabaffe","Tortank"];
let n_info = ["Bulbizarre","Herbizarre","Florizarre"];
let n_telecom = ["Pichu","Pikachu","Raichu"];
let n_rsi = ["Fantominus", "Spectrum", "Ectoplasma"];
let n_see = ["Melo", "Melofee", "Melodelfe"];

const max_hp = 100;
const max_xp = 100;

class Pokemon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            evo : 0,
            filieres : [matmeca,elec,info,telecom,rsi,see],
            f_id : props.filiere_id,
            hp : max_hp,
            exp : 0,
            names : [n_matmeca,n_elec,n_info,n_telecom,n_rsi,n_see]
        }
    }

    render() {
        return (
            <div class="pokemon-container">
                <div class="pokemon-img-container">
                    <img src={this.state.filieres[this.state.f_id][this.state.evo]} alt="d" class="pokemon-img"></img>
                </div>
                <div class="bar-container">
                    <div class="element-cont">
                        <img src={element[this.state.f_id]} alt="elt"></img>
                    </div>
                    <div class="info-cont">
                        <h2 class="name">{this.state.names[this.state.f_id][this.state.evo]}</h2>
                        <div class="health-bar-container">
                            <div class="health-bar-empty">
                                <div class="health-bar" style={{width : (this.state.hp*400/100)}}></div>
                            </div>
                        </div>
                        <div class="exp-bar-container">
                            <div class="exp-bar-empty">
                                <div class="exp-bar" style={{width : this.state.exp*400/100}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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

const rootElement = document.getElementById("root");
reactDom.render(<App />, rootElement);