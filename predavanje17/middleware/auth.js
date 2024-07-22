const JWTData = require("../config/JWT_SECRET");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authData = req.header("Authorization");
  if (authData === undefined) {
    res.status(400).send("Token is not defined");
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWTData.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authenticate };
