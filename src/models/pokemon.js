const validTypes = ['feu','serpent']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define ('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate :{
                notEmpty : {msg: 'Le nom ne peut pas etre vide'},
                notNull:{msg: 'Le nom est une priorité requise'}

            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'utilisez uniquement des nombres entiers pour les points de vie'},
                min :{
                    args:[0],
                    msg:'Les points de vie doivent etre superieures ou egales à 0'
                },
                max :{
                    args:[1000] ,
                    msg: 'Les points de vie doivent etre inférieures ou egal a 1000'
                },
                notNull: {msg: 'les points de vie sont une propriété requise'}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'utilisez uniquement des nombres entiers pour les points de degats'},
                min :{
                    args:[0],
                    msg:'Les points de degats doivent etre superieures ou egales à 0'
                },
                max :{
                    args:[999] ,
                    msg: 'Les points de degats doivent etre inférieures ou egal a 999'
                },
                notNull: {msg: 'les points de degats sont une propriété requise'}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'utilisez uniquement une url valide pour l\'image'},
                notNull: {msg: 'L\image est une propriété requise'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types',types.join())
            },
            validate: {
                isTypesValue(value) {
                    if(!value) {
                        throw new Error('Un pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error("un pokémon ne peut pas avoir plus de trois types.")
                    }
                    value.split(',').forEach((type )=>{
                    if(validTypes.includes(type)){
                        throw new Error('Le pokemon doit appartenir a la liste suivante: ${validTypes}')
                    }
                        
                    });
                }
            }
        }
        },{
        timestamps: true,
            createdAt: 'created',
            updateAt: false
        })
    }

