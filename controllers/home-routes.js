const router = require("express").Router();
const { Post, User } = require("../models");

// GET all posts for homepage
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

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
