const { Pokemon} = require('../db/sequelize')
const {ValidationError, UniqueConstraintError } = require ('sequelize')
//const { User} = require ('../db/sequelize')
//const auth = require ('../auth/auth')

module.exports = (app) => {
    app.post ('/api/pokemons' ,(req, res) => {
        Pokemon.create(req, body)
            .then(pokemon => {
                const message ='Le pokémon ${req.body.name} a bien été crée'
                res.json({message, data: pokemon})
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.statut(400).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({ message: error.message, data: error})
                }
                const message = 'La liste des pokémons n\'a pas pu etre recupérée. Réessayez dans quelques instants'
                res.status(400).json({message, data:error })
            })
            const message = 'Le pokemon n\' a pas pu etre ajouté. Réessayez dans quelques instants.'
            res.status(500).json({message, data:error})
        })

    }
