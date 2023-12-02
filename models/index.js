const User = require('./User');
const Status = require('./Status'); 
const Constellation = require('./Constellation');
const Social = require('./Social');


// Associations:

User.hasOne(Social, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Social.belongsTo(User, { foreignKey: 'user_id' });

//

Constellation.hasOne(Social, { foreignKey: 'constellation_id' });
Social.belongsTo(Constellation, {foreignKey: 'constellation_id' })

//

User.hasOne(Constellation, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Constellation.belongsTo(User, { foreignKey: ''})

//

User.hasOne(Status, {foreignKey: 'user_id' })
Status.belongsTo(User, {foreignKey: 'user_id' })

//

module.exports = { User, Status, Constellation, Social };