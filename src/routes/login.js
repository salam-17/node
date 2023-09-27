const { User } = require ('../db/sequelize')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
//const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login',(req,res) => {

        User.findOne ( {where : {username: req, bodyusername}}).then(user => {

            if (!user) {
                const message ='l\'utilisateur demandé n\'existe pas'
                return res.status(404).json({message}) 
            }
            bcrypt.compare(req.body.password, user.password).then (isPasswordValid => {
                if (!isPasswordValid) {
                    const message = 'Le mot de passe est incorrect.'
                    return res.status(401).json({message})
                }

                //jwt
                const token = jwt.sign(
                    {userId: user.id},
                    //privateKey,
                    { expiresIn: '24h'}

                )
                const message ='L\'utilisateur a été connecté avec succes';
                return res.json({ message , data: user, token})
            })
            
        })
        .catch(error => {
            const message = 'L\'utilisateur n\'a pas pu etre connecté. Réessayez dans un instant'
            return res.json({ message, data: error});
        })
    })
}