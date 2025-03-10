/*
Consumir el endPoint de la API de pokemon disponible en: 
https://pokeapi.co/

Características para desarrollar: 
 - Cuando el sitio cargue se debe seleccionar aleatoriamente un pokemon de 1 a 1025 y enviar una solicitud con el número generado.
 - Cuando ser recibe la respuesta del servidor se debe cargar los datos del pokemon en la página.
 - Cuando el usuario ingrese el nombre o el id de un pokemon y de click en buscar se debe enviar una petición a la API.
 - Cuando el servidor responda la solicitud se deben cargar los datos del pokemon en la página. 
 - En caso de no encontrar el pokemon ingresado por el usuario en el servidor generar un alert con el mensaje "pokemon no encontrado"
*/


//URL BASE PARA PETICIONES HTTP
let url = "https://pokeapi.co/api/v2/pokemon/";
let iterPokemon = 1;
let idInterval = 0;
let selectedPokemon = 0;
let activeBuclePokemons = false;
let checkInterval = 0;
let pokemonCheck = 1;

//Funcion para cargar información de un pokemon en el DOM de nuestra página.
function cargarPokemon(pokemon){
    pokemonCheck = pokemon.id;
    document.getElementById("pokemon_name").innerText = pokemon.name.toUpperCase();
    document.getElementById("pokemon_id").innerText = String(pokemon.id).padEnd(5," ");
    document.getElementById("pokemon_height").innerText = String(pokemon.height).padEnd(5," ");
    document.getElementById("pokemon_weight").innerText = String(pokemon.weight).padEnd(5," ");
    document.getElementById("pokemon_image").src = pokemon.sprites.front_default;
    document.getElementById("pokemon_text").value = pokemon.name;
}

//Funcion para enviar peticiones a la API por el parámetro dado. 
function obtenerDatosPokemon(parameter){
    parameter = url+parameter;
    fetch(parameter)
       .then(response => {
           if(!response.ok){
            throw new error("Error en la petición")
           }
           return response.json();
       })
       .then(datos => {
           console.log("datos adquiridos", datos);
           cargarPokemon(datos);
       })
       .catch(error => {
           console.error("Error: ", error);
       })
}

function cargarIterPokemon(){
    if(iterPokemon == pokemonCheck){
    }else{
        iterPokemon = pokemonCheck;
        clearInterval(checkInterval);
    }
}
//Funcion para obtener el dato ingresado por el usuario.
function buscarPokemon(){
    selectedPokemon = document.getElementById("pokemon_text").value;
    obtenerDatosPokemon(selectedPokemon);
    if (isNaN(selectedPokemon)){
        checkInterval = setInterval(cargarIterPokemon,100);
    }else{ 
        iterPokemon = selectedPokemon;
    }
}

//Generar id de pokemon aleatorio
function buscarPokemonRandom(){
    let randomPokemon = Math.floor((Math.random()*1024)+2);
    obtenerDatosPokemon(randomPokemon);
    iterPokemon = randomPokemon;
}

function recorrerPokemons(){
    obtenerDatosPokemon(iterPokemon);
    incrementId();
}

function incrementId(){
    if (iterPokemon==1025){
        iterPokemon = 1;
    }else{
        iterPokemon++;
    }
}

function changeStateRecorrer(){
    activeBuclePokemons = !(activeBuclePokemons);
    if(activeBuclePokemons){
        obtenerDatosPokemon(iterPokemon);
        incrementId();
        idInterval = setInterval(recorrerPokemons,2000);
        document.getElementById("buscar").disabled = true;
        document.getElementById("random").disabled = true;
        document.getElementById("recorrer").textContent = "Detener";
    }else{
        clearInterval(idInterval);
        document.getElementById("buscar").disabled = false;
        document.getElementById("random").disabled = false;
        document.getElementById("recorrer").textContent = "Recorrer";  
    }
}

buscarPokemonRandom();

//Añadir listeners al botón
document.getElementById("buscar").addEventListener('click',buscarPokemon);
document.getElementById("random").addEventListener('click',buscarPokemonRandom);
document.getElementById("recorrer").addEventListener('click',changeStateRecorrer);


