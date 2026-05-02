const jwt = require("jsonwebtoken");
const { prisma } = require("../db/prisma");


const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "safarhub",
      audience: "safarhub-users",
    });

    console.log("DECODED:", decoded);

    // 🔥 THIS LINE IS CRITICAL
    req.user = decoded;

    console.log("USER SET:", req.user);

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect };