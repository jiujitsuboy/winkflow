const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

if (!process.env.ENVIRONMENT_NAME) {
  dotenv.config();
}

const authMiddleware = (req, res, next) => {
  req.isAuth = false;

  const authHeader = req.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1].replace(/"/g, "");

    let decodeToken;

    try {
      decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
      if (decodeToken) {
        req.userId = decodeToken.id;
        req.isAuth = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
  next();
};

module.exports = authMiddleware;
