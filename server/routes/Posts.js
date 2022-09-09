const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});
router.get("/byTopicId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findAll({ where: { topicId: id } });
  res.json(post);
});
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  post.username = username;
  const createdPost = await Posts.create(post);
  res.json(createdPost);
});

router.get("/recent", async (req, res) => {
  const recentTopics = await Posts.findAll({
    limit: 5,
    order: [["id", "DESC"]],
  });
  res.json(recentTopics);
});

module.exports = router;
