const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
    res.render("login", { layout: "main" });
});

module.exports = router;
