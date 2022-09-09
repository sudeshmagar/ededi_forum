const express = require("express");
const router = express.Router();
const { Topics, Posts, Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfTopics = await Topics.findAll({
    include: [{ model: Posts, include: [Comments] }],
  });
  res.json(listOfTopics);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Topics.findByPk(id);
  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const topic = req.body;
  const username = req.user.username;
  topic.username = username;
  const createdTopic = await Topics.create(topic);
  res.json(createdTopic);
});

module.exports = router;
