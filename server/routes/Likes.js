const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { CommentId } = req.body;
  const UserId = req.user.id;
  console.log(UserId);
  const found = await Likes.findOne({
    where: { CommentId: CommentId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ CommentId: CommentId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { CommentId: CommentId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});

module.exports = router;
