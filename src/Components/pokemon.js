import React from "react";

import "../style.css";

import { max_hp, max_xp} from "./constants";

import bulbizarre from "../img/pokemon/Bulbasaur.gif"
import herbizarre from "../img/pokemon/Ivysaur.gif"
import florizarre from "../img/pokemon/Venusaur.gif"

import carapuce from "../img/pokemon/Squirtle.gif"
import carabaffe from "../img/pokemon/Wartortle.gif"
import tortank from "../img/pokemon/Blastoise.gif"

import salameche from "../img/pokemon/Charmander.gif"
import reptincel from "../img/pokemon/Charmeleon.gif"
import dracaufeu from "../img/pokemon/Charizard.gif"

import pichu from "../img/pokemon/Pichu.gif"
import pikachu from "../img/pokemon/Pikachu.gif"
import raichu from "../img/pokemon/Raichu.gif"

import fantominus from "../img/pokemon/Gastly.gif"
import spectrum from "../img/pokemon/Haunter.gif"
import ectoplasma from "../img/pokemon/Gengar.gif"

import melo from "../img/pokemon/Cleffa.gif"
import melofee from "../img/pokemon/Clefairy.gif"
import melodelfe from "../img/pokemon/Clefable.gif"

import feu from "../img/type/feu.png"
import plante from "../img/type/plante.png"
import eau from "../img/type/eau.png"
import electrik from "../img/type/electrik.png"
import spectre from "../img/type/spectre.png"
import fee from "../img/type/fee.png"

import pokeball from "../img/pokeball.png"

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


//Class pokemon, etat de chaque pokemon et affichage poke + status bar
class Pokemon extends React.Component {

    constructor(props) {
        super(props);

        this.img_ref = React.createRef();

        this.state = {
            evo : 0,
            filieres : [matmeca,elec,info,telecom,rsi,see],
            f_id : props.filiere_id, //id entre 0 et 5
            hp : max_hp,
            ko : false,
            exp : 0,
            names : [n_matmeca,n_elec,n_info,n_telecom,n_rsi,n_see],
            animationImg : "", //css animation
            keyframes : "", //keyframes animation
            class_img : "pokemon-img"
        }
    }

    healthBarColor (hp) { //changement couleur barre hp
        if(hp/max_hp > 0.5) {
            return "#2afc00"
        }
        else if (hp/max_hp > 0.2){
            return "#fc9300"
        }

        else{
            return "#f00000"
        }
    }

    spriteReturn(state) {
        if(state.ko === false){
            return state.filieres[state.f_id][state.evo]
        }
        else if (state.ko === true) {
            return pokeball
        }
    }

    render() {
        return (
            <div class="pokemon-container">
                <div class="pokemon-img-container" id={`img-${this.state.f_id}`}>
                    <img src={this.spriteReturn(this.state)} ref={this.img_ref} alt="d" class={this.state.class_img} style={{animation : this.state.animationImg}}></img>
                </div>
                <div class="bar-container">
                    <div class="element-cont">
                        <img src={element[this.state.f_id]} alt="elt"></img>
                    </div>
                    <div class="info-cont">
                        <h2 class="name">{this.state.names[this.state.f_id][this.state.evo]}</h2>
                        <div class="health-bar-container">
                            <div class="health-bar-empty">
                                <div class="health-bar" style={{width : (this.state.hp*400/max_hp), backgroundColor : (this.healthBarColor(this.state.hp))}}></div>
                            </div>
                        </div>
                        <div class="exp-bar-container">
                            <div class="exp-bar-empty">
                                <div class="exp-bar" style={{width : this.state.exp*400/max_xp[this.state.f_id]}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    {this.state.keyframes}
                </style>
            </div>
        );
    }
}

export {Pokemon};