const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const constellationRoutes = require('./constellationRoutes');

router.use('/users', userRoutes);
// router.use('/constellation', constellationRoutes);

module.exports = router;

