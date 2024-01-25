import $ from './node_modules/jquery/dist/jquery';
import {getPokemon} from './api'


obtenerPokemon();
listarPokemones();

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
// obtener pokemon random
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

// listar pokemones
function listarPokemones() {
    let numero = 1;
    for(let i=0; i<151; i++){
        numero=i;
        let pokemon= getPokemon(numero);
        pokemon.then((res)=>res.json())
        .then((res2)=>{
            console.log(res2);
            let{name, sprites, id} = res2;
            llenarLista(name, sprites.front_default, id);
            
        })
    }
    
}


function llenarLista(name, sprite, id) {
    let listaPokemones = document.getElementById('listaPokemones');

    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';

    let image = document.createElement('img');
    image.src = sprite;
    image.classList.add('card-img-top');
    image.alt = name;

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = ` ${id} ${name.toUpperCase()}`;


    

    cardBody.appendChild(cardTitle);
    card.appendChild(image);
    card.appendChild(cardBody);

    listaPokemones.appendChild(card);
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
        tabla+=(`<td> ${stats[i].stat.name.toUpperCase()} </td>`)
        tabla+=(`<td> ${stats[i].base_stat} </td>`)
        tabla+=(`</tr>`)
    }
    tabla+=(`</table>`)
    div.append(tabla);

    let tabla2=(`<table class="table"> <tr><td class="negrillas"> TYPES </td>`)
    for(let i=0 ; i<types.length; i++){
        tabla2+=(`<td> ${types[i].type.name.toUpperCase()} </td>`)
    }
    tabla2+=(`</tr></table>`)
    div.append(tabla2);


    let imagen= document.getElementById('pokemon_img');
    imagen.src=sprites.other.dream_world.front_default;
}
