const router = require('express').Router();
const { Constellation, User } = require('../models');
// const withAuth = require('../utils/auth');

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

router.get('/constellation/:id', async (req, res) => {
    try {
        const constellationData = await Constellation.findbyPK(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const constellation = constellationData.get({ plain: true });
        res.render('profile', { constellation });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        userData = await User.findbyPK(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Constellation }],
        });

        const user = UserData.get({ plain: true });

        res.render('profile', { user });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

module.exports = router;
