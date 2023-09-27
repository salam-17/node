const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = "Vous n'avez pas fourni de jeton d'authentification. Ajoutez le jeton d'authentification dans l'en-tête 'Authorization'.";
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(' ')[1]; 

    jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            const message = "Le jeton d'authentification n'est pas valide.";
            return res.status(401).json({ message, data: error });
        }

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = "L'identifiant de l'utilisateur est invalide.";
            return res.status(401).json({ message });
        } else {
            next();
        }
    });
};