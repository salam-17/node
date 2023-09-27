const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');
//const auth = require ('../auth/auth');

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5; // Correction : req.query.limit au lieu de req, query.limit
            if (name.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caractères.';
                return res.status(400).json({ message });
            }
            Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['name'],
                limit: limit
            })
            .then(({ count, rows }) => {
                const message = `Il y\'a ${count} pokémons qui correspondent au terme de recherche "${name}".`; // Utilisation de backticks pour inclure des variables dans la chaîne
                res.json({ message, data: rows }); // Correction : Utilisation de "rows" au lieu de "pokemons"
            })
            .catch(error => {
                const message = 'La liste des pokémons n\'a pas pu être récupérée, réessayez plus tard.';
                res.status(500).json({ message, data: error });
            });
        } else {
            Pokemon.findAll({ order: ['name'] })
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.';
                res.json({ message, data: pokemons });
            })
            .catch(error => {
                const message = 'La liste des pokémons n\'a pas pu être récupérée, réessayez plus tard.';
                res.status(500).json({ message, data: error });
            });
        }
    });
};
