const User = require("./user");
const Status = require("./Status");
const Social = require("./social");
// const multer = require("multer");


// Associations:

User.hasOne(Social, { foreignKey: "user_id" });
Social.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Status, { foreignKey: "user_id" });
Status.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Status, Social };
