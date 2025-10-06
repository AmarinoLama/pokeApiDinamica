// Elementos del buscador
const btnSearch = document.getElementById("buscar-btn");
const searchName = document.getElementById("search-name");

// Elementos de la info del Pokémon
const imgNormal = document.getElementById('pokemon-image-normal');
const imgShiny = document.getElementById('pokemon-image-shiny');
const lblNombre = document.getElementById('pokemon-name');
const audioPlayer = document.getElementById('audio-source');
const typeContainer = document.getElementById('types-container');
const btnFlip = document.getElementById('btn-flip')

// Elementos del swap de imágenes
const front = document.getElementById("img-front");
const back = document.getElementById("img-back");
const btn = document.getElementById("swap-btn");

// Variables
let isFirstSearch = true;
let isFlipped = false;
let currentPokemonData = null;

btnSearch.addEventListener("click", () => {

    let pokemonName = searchName.value.trim().toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((patata) => {
            return patata.json()
        })
        .then((datosProcesados) => {
            limpiarCampos()
            buscarPokemon(datosProcesados)
        }).catch((error) => {
            console.log("Hubo un error: " + error);
            searchName.value = "No se encontró"
        });
})

searchName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click();
    }
});

btnFlip.addEventListener("click", () => {
    console.log("Click detectado!", new Date().getTime());
    flipImages();
})

function buscarPokemon(datosProcesados) {
    currentPokemonData = datosProcesados;

    // Alternamos visibilidades
    document.getElementById('block-info').classList.remove('oculto');
    document.getElementById('img-pokedex').classList.add('oculto');

    imgNormal.src = datosProcesados.sprites.other.showdown.front_default
    imgShiny.src = datosProcesados.sprites.other.showdown.front_shiny
    lblNombre.textContent = datosProcesados.name.toUpperCase()
    for (tipo of datosProcesados.types) {
        const span = document.createElement('span');
        span.textContent = tipo.type.name;
        span.className = `type type-${tipo.type.name}`;
        typeContainer.appendChild(span);
    }
    audioPlayer.src = datosProcesados.cries.latest;
    const audioElement = document.querySelector('audio');
    audioElement.load();
}

function flipImages() {
    if (isFlipped) {
        imgNormal.src = currentPokemonData.sprites.other.showdown.front_default
        imgShiny.src = currentPokemonData.sprites.other.showdown.front_shiny
    } else {
        imgNormal.src = currentPokemonData.sprites.other.showdown.back_default
        imgShiny.src = currentPokemonData.sprites.other.showdown.back_shiny
    }
    isFlipped = !isFlipped;
}

function limpiarCampos() {
    searchName.textContent = ""
    imgNormal.src = ""
    imgShiny.src = ""
    lblNombre.textContent = ""
    audioPlayer.src = ""
    typeContainer.innerHTML = ""
}