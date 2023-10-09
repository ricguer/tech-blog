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

    const posts = dbPostData.map((post) => {
      const newPost = post.get({ plain: true });
      const createdAt = new Date(newPost.createdAt);
      newPost.createdAt = createdAt.toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      return newPost;
    });

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
    } else {
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
