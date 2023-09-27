const {Pokemon}= require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req,res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            const message = 'Un pokemon a bien été trouvé'
            res.json({message, data:pokemons})
        })
        .catch(error => {
            const message = 'La liste des pokémons n a pas pu etre recupérée. Réessayez dans quelques instants'
            res.status(500).json({message, data:error })
        })
    })
}