const router = require("express").Router();
const { Social, User, Status } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    const constellationData = await User.findAll({
      attributes: { exclude: ["password"] },
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
    const constellations = constellationData.map((constellation) =>
      constellation.get({ plain: true })
    );
    console.log('Session HERE: ', req.session);
    res.render("homepage", { constellations, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// YOUR OWN PROFILE
router.get("/profile", withAuth, async (req, res) => {
  try {
    constellationData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Social,
        },
        {
          model: Status,
        },
      ],
    });

    const constellation = constellationData.get({ plain: true });
    console.log(constellation);
    res.render("profile", { constellation, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// SOMEONE ELSES
//// clicking 'view profile' from one of the cards on the homepage brings you to that users profile
router.get("/profile/:id", async (req, res) => {
  try {
    console.log("iD: ", req.params.id);
    const constellationData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Social,
        },
        {
          model: Status,
        },
      ],
    });
    console.log(constellationData);
    const constellation = constellationData.get({ plain: true });
    res.render("profile", { constellation, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/socials", (req, res) => {
  // if (req.session.logged_in) {
  //     res.redirect('/profile');
  //     return;
  // }
  res.render("socials");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/profile');
      return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/socials');
      return;
  }
  res.render("signup");
});

module.exports = router;
