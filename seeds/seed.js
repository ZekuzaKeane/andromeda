// const sequelize = require('../config/connection');
// const { User, Constellation, Social, Status } = require('../models');

// const userData = require('./userData.json');
// const constellationData = require('./constellationData.json');
// const socialData = require('./socialData.json');
// const statusData = require('./statusData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });
  
//   const users = await User.bulkCreate(userData, { individualHooks: true,  returning: true });
//   const constellations = await Constellation.bulkCreate( constellationData, { returning: true });
//   const socials = await Social.bulkCreate(socialData, {returning: true });
//   const statuses = await Status.bulkCreate(statusData, { returning: true });


// };

// seedDatabase();