const apirouter = "https://pokeapi.co/api/v2/pokemon"
const axios = require("axios")
/***
 * Esta función regresa todos los pokémon 
 */
async function listPokemon(req,res){

   
    try {
        const response = await axios.get(apirouter+"?limit=150")

        console.log(response.data)

        if (response.data && response.data.results){
            console.log(response.data.results)
            return res.status(200).json({pokémon: response.data.results})
          
        }else{
            return res.status(200).json({})
        }
        
    } catch (error) {
        return res.status(500).send("Ocurrio un error")
    }
    
}   

/***
 * Esta función regresa la información del pokemon especifico
 */
async function pokemonInfo(req,res){

    const pokemonName= req.query.pName;
    if (pokemonName){

        const response = await axios.get(`${apirouter}/${pokemonName}`)
        console.log(response)

        try {

            if (response.data){
                return res.status(200).json({"data": response.data})
            }else{
                return res.status(200).send("Pokémon no encontrado")
            }
            
        } catch (error) {
            res.status(500).send("Ocurrio un error")
        }
    }else{
        res.status(400).send("Ingrese un pokémon")
    }

    
}

async function pokemonInfo(req, res) {

    const pokemonName = req.query.pName;

    if (!pokemonName) 
    return res.status(400).json({ "success": false, "message": "Pokemon name required" });

    try {
        const response = await axios.get(`${apiRoute}/${pokemonName}`);

        if (response.data) {
            return res.status(200).json({ "success": true, "data": response.data });
        } else {
            return res.status(200).json({ "success": true, "data": [] });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "success": false });
    }
}

module.exports= {
    pokemonInfo,
    listPokemon
}