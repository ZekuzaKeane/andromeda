const router = require('express').Router();
const { Constellation, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const constellationData = await Constellation.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // serialize the data

        const constellations = constellationData.map((constellation) => constellation.get({ plain: true }));
        console.log(constellations);

        res.render('homepage', { constellations });
    } catch (err) {
        res.status(500).json(err);
    }
});

