import $ from 'jquery'
import {getPokemon} from './api'


obtenerPokemon();

//quitar actualizacion con enter
$('#inputPokemon').keypress(function(e){
    if(e.keyCode == 13){//Enter key pressed
        e.preventDefault();
        return false;
    }
});

//evento boton
$('#buscar').on('click', ()=>{
    let nombre=$('#inputPokemon').val();

    let pokemon= getPokemon(nombre);
    pokemon.then((res)=>res.json())
    .then((res2)=>{
        console.log(res2);
        let{name, sprites, stats,types} = res2;
        llenarInformacion(name, sprites, stats,types);
    })
    .catch((e)=>{
        alert('Pokemon no encontrado, intentelo de nuevo');
        window.location.reload();
    })
})
function obtenerPokemon() {
    let random = numeroRandom(150)+1;
    let pokemon= getPokemon(random);
    pokemon.then((res)=>res.json())
    .then((res2)=>{
        console.log(res2);
        let{name, sprites, stats,types} = res2;
        llenarInformacion(name, sprites, stats,types);
    })
   
}

//funcion numero random

function numeroRandom(max){
    let numero = Math.floor(Math.random() * max);
    return numero;
}

//funcion llenar informacion

function llenarInformacion(name, sprites, stats,types){
    let input = document.getElementById('inputPokemon');
    input.placeholder=name;
    let div=$('.datos_pokemon');
    div.empty();

    let tabla=(`<table class="table"> <tr><td class="negrillas"> ${name.toUpperCase()} </td></tr>`)

    for(let i=0 ; i<stats.length; i++){
        tabla+=(`<tr>`)
        tabla+=(`<td> ${stats[i].stat.name} </td>`)
        tabla+=(`<td> ${stats[i].base_stat} </td>`)
        tabla+=(`</tr>`)
    }
    tabla+=(`</table>`)
    div.append(tabla);

    let tabla2=(`<table class="table"> <tr><td class="negrillas"> TYPES </td>`)
    for(let i=0 ; i<types.length; i++){
        tabla2+=(`<td> ${types[i].type.name} </td>`)
    }
    tabla2+=(`</tr></table>`)
    div.append(tabla2);


    let imagen= document.getElementById('pokemon_img');
    imagen.src=sprites.other.dream_world.front_default;
}