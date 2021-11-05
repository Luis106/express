const express = require("express")
const router = express.Router();

const {
    pokemonInfo,
    listPokemon
} = require("./controllers/pokemon.controller.js")

router.get('/', listPokemon);
router.get('/poke', pokemonInfo);



module.exports = router;