const { Pokemon } = require('../db/sequelize')
//const auth = require ('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id',(req,res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = 'Le pokemon demandé n\' existe pas . reessayez avec un autre identifiant'
                return res.status(404).json({message})
            } 
            const pokemonDeleted = pokemon;
            Pokemon.destroy ({
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = 'Le pokémon avec l\' identifiant numero ${pokemonDeleted.id} a bien été supprimé.'
                res.json({message, data: pokemonDeleted }) 
            })
            .catch(error => {
                const message = 'La liste des pokémons n a pas pu etre recupérée. Réessayez dans quelques instants'
                res.status(500).json({message, data:error })
            })
        })
    })
}