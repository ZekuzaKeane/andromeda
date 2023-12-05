const User = require('./User');
const Status = require('./Status'); 
// const Constellation = require('./Constellation');
const Social = require('./Social');


// Associations:

User.hasOne(Social, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Social.belongsTo(User, { foreignKey: 'user_id' });


User.hasOne(Status, {foreignKey: 'user_id' });
Status.belongsTo(User, {foreignKey: 'user_id' });

//

module.exports = { User, Status, Social };