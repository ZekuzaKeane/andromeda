const router = require('express').Router();
const { Social, User, Status } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const constellationData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Social,
                },
                {
                    model: Status,
                },   
            ],
        });
        // serialize the data
        console.log('HELLO');
        console.log(constellationData);
        // process.exit(0);
        const constellations = constellationData.map((constellation) => constellation.get({ plain: true }));
        console.log('HELLO CONSTELLATIONS');
        console.log(constellations);
        res.render('homepage', {constellations});
    } catch (err) {
        res.status(500).json(err);
    }
});


///// ---> clicking contellation from homepages brings to PROFILE - no need for constellation/id route, right?

// router.get('/constellation/:id', async (req, res) => {
//     try {
//         const constellationData = await User.findbyPK(req.params.id, {
//             attributes: { exclude: ['password'] },
//             include: [
//                 {
//                     model: Social,
//                 },
//                 {
//                     model: Status,
//                 },   
//             ],
//         });

//         const constellation = constellationData.get({ plain: true });
//         res.render('profile', { constellation });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('signup');
});


module.exports = router;