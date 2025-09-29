    const btnSearch = document.getElementById("buscar-btn");
    const searchName = document.getElementById("search-name");

    const imgNormal = document.getElementById('pokemon-image-normal');
    const imgShiny = document.getElementById('pokemon-image-shiny');
    const lblNombre = document.getElementById('pokemon-name');
    const audioPlayer = document.getElementById('audio-source');
    const typeContainer = document.getElementById('types-container');

    let isFirstSearch = true;

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
        });
    })

    searchName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            btnSearch.click();
        }
    });


    function buscarPokemon(datosProcesados) {

        // Alternamos visibilidades
        document.getElementById('block-info').classList.remove('oculto');
        document.getElementById('img-pokedex').classList.add('oculto');

        imgNormal.src = datosProcesados.sprites.front_default
        imgShiny.src = datosProcesados.sprites.front_shiny
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

    function limpiarCampos(){
        imgNormal.src = ""
        imgShiny.src = ""
        lblNombre.textContent = ""
        audioPlayer.src = ""
        typeContainer.innerHTML = ""
    }