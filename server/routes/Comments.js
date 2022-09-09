const express = require("express");
const router = express.Router();
const { Comments, Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: postId },
    include: [Likes],
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  const cC = await Comments.create(comment);
  res.json(cC);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("deleted");
});

module.exports = router;
