import bcrypt from 'bcrypt';
import sequelize from '../database/config.js';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El nombre es requerido" },
            notEmpty: { msg: "El nombre no puede estar vacío" }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El apellido es requerido" },
            notEmpty: { msg: "El apellido no puede estar vacío" }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "El nombre de usuario ya está en uso" },
        validate: {
            notNull: { msg: "El nombre de usuario es requerido" },
            notEmpty: { msg: "El nombre de usuario no puede estar vacío" }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El teléfono es requerido" },
            notEmpty: { msg: "El teléfono no puede estar vacío" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "El correo electrónico ya está en uso" },
        validate: {
            isEmail: { msg: "Debe ser un correo electrónico válido" },
            notNull: { msg: "El correo electrónico es requerido" },
            notEmpty: { msg: "El correo electrónico no puede estar vacío" }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "La contraseña es requerida" },
            notEmpty: { msg: "La contraseña no puede estar vacía" }
        }
    },
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: { msg: "El estado de bloqueo es requerido"},
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client',
        validate: {
            isIn: [[ 'admin', 'moderator', 'veterinarian','client']],
            notNull: { msg: "El rol es requerido" },
            notEmpty: { msg: "El rol no puede estar vacío" }
        }
    },
    deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);

            const count = await User.count();
            if (count === 0) {
                user.role = 'admin';
            } else {
                user.role = 'client';
            }
        }
    },
    indexes: [ 
        { unique: true, fields: [ 'username' ] },
        { unique: true, fields: [ 'email' ] }
    ]
});

export default User;