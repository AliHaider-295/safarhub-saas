const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // ✅ Verify token with SAME config used in login
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "safarhub",
      audience: "safarhub-users",
    });

    // ✅ Extra safety check
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ✅ Attach user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      error: "Invalid token",
      details: error.message, // 🔥 helps debugging
    });
  }
};

module.exports = { protect };