import sequelize from '../database/config.js';
import { DataTypes, Model } from 'sequelize';

class Pet extends Model {}

Pet.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'pet',
    tableName: 'pets',
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default Pet;