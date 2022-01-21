const fetch = require('node-fetch');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

//On recherche un pokemon avec son nom dans l'api
async function getPokemon(pokemon) {
    let response = await fetch(`${BASE_URL}/${pokemon}`);
    return await response.json();
}

module.exports = { getPokemon };