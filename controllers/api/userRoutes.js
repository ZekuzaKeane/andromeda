const router = require("express").Router();
const { User, Social, Status } = require("../../models");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// New user signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUserCheck = await User.findOne({
            where: {
                username: username,
                email: email,
            },
        });

        if (existingUserCheck) {
            return res
                .status(400)
                .json({
                    message: "Username or Email already exists! Both must be unique",
                });
        }

        const newUser = await User.create({ username, email, password });

        // log user in directly after signing up
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res
                .status(302)
                .location('/signup')
                .json({ user: newUser, message: "User created successfully!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. Uhoh!" });
    }
});

router.post("/socials", async (req, res) => {
    try {
        console.log("request body:", req.body)
        console.log("request session user_id: ", req.session.user_id)
        //const userData = await Social.create({ ...req.body, user_id: req.session.user_id })
        //const userData = await Social.create(req.body, {
        //   where: { id: req.session.user_id },
        //});
        const alreadySocial = await Social.findOne({
            where: { id: req.session.user_id }
        })
        if (alreadySocial) {
            const userData = await Social.update(req.body, {
                where: { id: req.session.user_id },
            });
            if (!userData) {
                console.log('BAD USER DATA');
                res
                    .status(400)
                    .json({
                        message:
                            "The username was not found",
                    });
                return;
            } else {
                res.redirect(/profile/${req.session.user_id})
            }
        } else {
            const userData = await Social.create({ ...req.body, user_id: req.session.user_id })
            res.redirect(/profile/${req.session.user_id})
        }

       // if (!userData) {
           // console.log('BAD USER DATA');
          //  res
             //   .status(400)
            //    .json({
              //      message:
              //          "The username was not found",
              //  });
         //   return;
       // }
        console.log('BEFORE constellationData: line 75');
        const constellationData = await User.findByPk(req.session.user_id, {
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
        //   console.log('constellationData: ', constellationData);
        const constellation = constellationData.get({ plain: true });
        console.log('constellation: ', constellation);
        res.render("profile", { constellation, logged_in: req.session.logged_in });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Internal server error. Uh oh!" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        if (!userData) {
            res
                .status(400)
                .json({
                    message:
                        "The username or password you provided is incorrect, please try again",
                });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (!validPassword) {
            res
                .status(400)
                .json({
                    message:
                        "The username or password you provided is incorrect, please try again",
                });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({
                user: userData,
                message: `You've successfully logged in!`,
                redirect: `/profile/${userData.id}`
            });
        });
    } catch (err) {
        console.log("Login error:", err);
        res.status(500).json({ message: "Internal server error. Uh oh!" });
    }
});

router.post("/logout", (req, res) => {
    console.log('HELLO 123');
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;