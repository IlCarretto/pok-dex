// DOM
const inputSearch = document.getElementById('inputSearch');
const formBtn = document.getElementById('formBtn');
const defaultSprite = document.getElementById('default-img-btn');
const shinySprite = document.getElementById('shiny-img-btn');

// Basic Pokemon Info
let pkmnName = document.getElementById('pkmnName');
let pkmnWeight = document.getElementById('pkmnWeight');
let pkmnHeight = document.getElementById('pkmnHeight');
let pkmnImg = document.getElementById('pkmnImg');
let pokedex = [];
let myPokemonData = null;
let resetData = false;

// Pokemon Stats
let pkmnStats = document.getElementById('stats');

// Pokedex
const addToPokedexBtn = document.getElementById("pokedex-btn");
const pokedexContainer = document.getElementById("personal-pokemons");

// EVENTS
formBtn.addEventListener('click', function() {
    const nomePokemon = inputSearch.value;
    if (nomePokemon == "") {
        alert('Inserisci un Pokemon');
    } else {
        getPokemon(nomePokemon);
    }
});

// API Call
const apiURL = "https://pokeapi.co/api/v2/pokemon/"
// Variabile falsa quando devo ancora cercare un pokemon e quindi pokemonData è vuoto, altrimenti ripulisco i campi e chiamo la funzione
function getPokemon(pokemonName) {
    fetch(`${apiURL}${pokemonName}/`)
    .then(resp => resp.json())
    .then(pokemonData => {
        myPokemonData = pokemonData;

        // Basic Info
        pokemonDetails(pokemonData);

        // Stats
        // Faccio un ciclo per la lunghezza dell'array di stats, per ogni item creo nuovi elementi stat-name, stat-bar-base e stat-bar e assegno al primo il valore preso dall'array, il secondo lo creo e basta e all'ultimo assegno il numero sottoforma di width
        pkmnStats.innerHTML = "";
        pokemonStats(myPokemonData);
        
        // Funzione eventlistener sia per bottone default che shiny, e cambiare src
        defaultSprite.addEventListener('click', function() {
            pkmnImg.src = pokemonData.sprites.front_default
        });
        shinySprite.addEventListener('click', function() {
            pkmnImg.src = pokemonData.sprites.front_shiny
        });
    })
}

function pokemonDetails(pokemonData) {
    pkmnName.innerHTML = pokemonData.name;
    pkmnWeight.innerHTML = pokemonData.weight;
    pkmnHeight.innerHTML = pokemonData.height;
    pkmnImg.src = pokemonData.sprites.front_default;
}

function pokemonStats(myPokemonData) {
    pkmnStats.innerHTML = "";
    for (let i = 0; i < myPokemonData.stats.length; i++) {
        let pkmnSingleStat = document.createElement("div");
        pkmnSingleStat.classList.add("single-stat", "mb-1");
        let pkmnStatsName = document.createElement("h5");
        pkmnStatsName.id = "stats-name";
        pkmnStatsName.innerHTML += myPokemonData.stats[i].stat.name;
        let pkmnStatsBarBase = document.createElement("div");
        pkmnStatsBarBase.id = "stats-bar-base";
        let pkmnStatsBar = document.createElement("div");
        pkmnStatsBar.id = "stats-bar";

        pkmnStats.appendChild(pkmnSingleStat);
        pkmnSingleStat.appendChild(pkmnStatsName);
        pkmnSingleStat.appendChild(pkmnStatsBarBase);
        pkmnStatsBarBase.appendChild(pkmnStatsBar);
        pkmnStatsBar.style.width = `${myPokemonData.stats[i].base_stat}%`
    };
}

// Creo il pokedex, lo resetto se necessario e aggiungo le informazioni del pokemon in questione, per ogni item di pokedex 
function createPokedex() {
    pokedexContainer.innerHTML = "";
    for (let i = 0; i < pokedex.length; i++) {
        pokedexContainer.innerHTML +=
        `<div class="column column-20">
            <div class="pokemon">
                <h4>${pokedex[i].name}</h4>
                <img src="${pokedex[i].sprites.front_default}" alt="">
                <a class="button" onclick="showPokemon(${i})">Mostra</a>
                <a class="button button-outline" onclick="deletePokemon(${i})">Elimina</a>
            </div>
        </div>`
    }
}

// Qualvolta si preme il pulsante
// SE pokemonData non è null e il pokedex è inferiore a 10 items 
// ALLORA pusho il dato nell'array pokedex e creo il pokedex DOM con i details
addToPokedexBtn.addEventListener('click', function() {
    if (myPokemonData !== null && pokedex.length < 10) {
        pokedex.push(myPokemonData);
        createPokedex();
    }
})

function showPokemon(index) {
   myPokemonData = pokedex[index];
   pokemonDetails(myPokemonData);
   pokemonStats(myPokemonData);
}

function deletePokemon(index) {
    const newPokedex = [];
    for (let i = 0; i < pokedex.length; i++) {
        if (i !== index) {
            newPokedex.push(pokedex[i]);
        }
    }
    pokedex = newPokedex;
    createPokedex();
}





