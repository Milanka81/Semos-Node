const { JWT_SECRET } = require("../config/JWT_SECRET");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = await req.header("authorization").replace("Bearer ", "");
  if (!token) {
    res.status(400).send("Token is not defined");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authenticate };
