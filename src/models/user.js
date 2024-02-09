import sequelize from './config.js';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {}

User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashshPassword = await bcrypt.hash(user.password, salt);
            user.password = hashshPassword;
        },
    }
});