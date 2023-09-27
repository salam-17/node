module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(191), // Longueur maximale réduite à 191 caractères
            unique :{
                msg:'Le nom est deja pris'
            }
        },
        
        password: {
            type: DataTypes.STRING
        }
    })
}