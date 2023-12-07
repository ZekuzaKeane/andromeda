const sequelize = require("../config/connection");
const { User, Social, Status } = require("../models");

const userData = require("./userData.json");
const socialData = require("./socialData.json");
const statusData = require("./statusData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const socials = await Social.bulkCreate(socialData, { returning: true });
  const statuses = await Status.bulkCreate(statusData, { returning: true });
};

seedDatabase();
