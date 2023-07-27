const router = require("express").Router();
const { Post, User } = require("../models");

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

        res.render("home", {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post
router.get("/post/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        res.render("post", {
            post
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
