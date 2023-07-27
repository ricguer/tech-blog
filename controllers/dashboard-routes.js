const router = require("express").Router();
const { Post, User } = require("../models");

// Create a route that renders the dashboard page if a user is logged in, otherwise, redirect the user to the login page
router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        req.session.save(() => {
            if (req.session.countVisit) {
                req.session.countVisit++;
            } else {
                req.session.countVisit = 1;
            }
        });

        if (!req.session.loggedIn) {
            res.redirect("/login");
            return;
        }
        else {
            res.render("dashboard", {
                posts,
                loggedIn: req.session.loggedIn
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
