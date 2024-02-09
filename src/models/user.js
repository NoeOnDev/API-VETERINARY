import sequelize from '../database/config.js';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
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

export default User;