const router = require('express').Router();
const { Post } = require('../../models');

router.post("/save", async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
