const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) 
  {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      req.user = decoded.user; // Attach user info to request
      next(); // Important: proceed to next middleware or controller
    });
  } 
  else 
  {
    res.status(401);
    throw new Error("Authorization token missing or invalid");
  }
});

module.exports = validateToken;
