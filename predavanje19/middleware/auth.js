const { JWT_SECRET } = require("../config/JWT_SECRET");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send("Token is not defined");
  }
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authenticate };
