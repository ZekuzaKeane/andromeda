const router = require("express").Router();
const { User } = require("../../models");
const bcrypt =require('bcrypt');

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
                .location('/login')
                .json({ user: newUser, message: "User created successfully!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error. Uhoh!" });
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
            res.json({ user: userData, message: `You've successfully logged in!` });
        });
    } catch (err) {
        console.log("Login error:", err);
        res.status(500).json({ message: "Internal server error. Uh oh!" });
    }
});

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
