const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/dashboard", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        // req.session.save(() => {
        //     if (req.session.countVisit) 
        //     {
        //         req.session.countVisit++;
        //     } 
        //     else 
        //     {
        //         req.session.countVisit = 1;
        //     }

        //     res.render("dashboard", {
        //         posts,
        //         logged_in: req.session.logged_in
        //     });
        // });

        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    } 
    catch (err) {
        res.status(500).json(err);
    }
    });

module.exports = router;
