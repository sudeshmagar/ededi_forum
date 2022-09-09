const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  var token;
  if (req.headers["authorization"])
    token = req.headers["authorization"].split(" ")[1];
  if (req.headers["x-access-token"])
    token = req.headers["x-access-token"].split(" ")[1];
  if (req.headers["token"]) token = req.headers["token"].split(" ")[1];
  if (req.query.token) token = req.query.token.split(" ")[1];
  if (!token) return res.json({ error: "User not logged in !" });

  try {
    const validToken = verify(token, "importantSecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
