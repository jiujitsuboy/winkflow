const authMiddleware = (req, res, next) => {
  req.isAuth = false;

  const authHeader = req.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1].replace(/"/g, "");
    req.token = token
  }
  next();
};

module.exports = authMiddleware
