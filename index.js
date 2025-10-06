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
const btnGender = document.getElementById('btn-gender')

// Variables
let isFirstSearch = true;
let isFlipped = false;
let isMasculine = true;
let currentPokemonData = null;

// Ruta de imagen por defecto (fallback)
const DEFAULT_POKEMON_IMG = "assets/img/fotoPokemon.png";

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
    isFlipped = !isFlipped
    updateImages();
})

btnGender.addEventListener("click", () => {
    isMasculine = !isMasculine
    updateImages();
})

function buscarPokemon(datosProcesados) {
    currentPokemonData = datosProcesados;

    // Alternamos visibilidades
    document.getElementById('block-info').classList.remove('oculto');
    document.getElementById('img-pokedex').classList.add('oculto');

    imgNormal.src = resolveSprite(datosProcesados?.sprites?.other?.showdown?.front_default)
    imgShiny.src = resolveSprite(datosProcesados?.sprites?.other?.showdown?.front_shiny)
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

function updateImages() {
    if (isMasculine) {
        if (isFlipped) {
            imgNormal.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.front_default)
            imgShiny.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.front_shiny)
        } else {
            imgNormal.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.back_default)
            imgShiny.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.back_shiny)
        }
    } else {
        if (isFlipped) {
            imgNormal.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.front_female)
            imgShiny.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.front_shiny_female)
        } else {
            imgNormal.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.back_female)
            imgShiny.src = resolveSprite(currentPokemonData?.sprites?.other?.showdown?.back_shiny_female)
        }
    }
}

function resolveSprite(url) {
    if (!url || typeof url !== 'string' || url.trim() === '') return "https://tepeseo.com/wp-content/uploads/2019/05/404notfound-1024x683.png";
    return url;
}

function limpiarCampos() {
    searchName.textContent = ""
    imgNormal.src = ""
    imgShiny.src = ""
    lblNombre.textContent = ""
    audioPlayer.src = ""
    typeContainer.innerHTML = ""
}