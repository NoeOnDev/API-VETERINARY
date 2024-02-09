import User from './user.js';
import Pet from './pet.js';

User.hasMany(Pet, { foreignKey: 'userId' });
Pet.belongsTo(User, { foreignKey: 'userId' });