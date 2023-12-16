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

//New user SIGNUP
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

///// SOCIALS
router.post("/socials", async (req, res) => {
    try {
        const userID = req.session.user_id
        console.log("request body:", req.body)
        console.log("request session user_id: ", req.session.user_id)
        const alreadySocial = await Social.findOne({
            where: { id: req.session.user_id }
        })
        console.log(alreadySocial);
        if (alreadySocial) {
            console.log('existing social');
            const userData = await Social.update(req.body, {
                where: { id: req.session.user_id },
            });

            if (!userData) {
                console.log('BAD USER DATA');
                res
                    .status(400)
                    .json({
                        message:
                            "Failed to update socials",
                    });
                return;
            }
            /////////////// test

            const alreadyStatus = await Status.findOne({
                where: { user_id: req.session.user_id },
            });

            if (alreadyStatus) {
                // Update existing status
                const updatedStatus = await Status.update(
                    { status: req.body.status },
                    {
                        where: { user_id: req.session.user_id },
                    }
                );

                if (!updatedStatus) {
                    console.log("BAD STATUS DATA");
                    res.status(400).json({
                        message: "Failed to update status",
                    });
                    return;
                }
            } else {
                // Create a new status
                const newStatus = await Status.create({
                    status: req.body.status,
                    user_id: req.session.user_id,
                });

                console.log("New status");
                res.json(newStatus);
                return;
            }

            ////////////// test ^
            res.redirect(`/profile/${req.session.user_id}`)
        } else {
            const newSocialData = await Social.create({
                ...req.body,
                user_id: req.session.user_id,
            });

            // Create a new status
            const newStatus = await Status.create({
                status: req.body.status,
                user_id: req.session.user_id,
            });

            console.log("New user and status");
            res.json({ newSocialData, newStatus });
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Internal server error. Uh oh!" });
    }
});

// user LOGIN
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

// user LOGOUT
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;