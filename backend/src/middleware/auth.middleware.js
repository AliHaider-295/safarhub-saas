const jwt = require("jsonwebtoken");
const { prisma } = require("../db/prisma");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "safarhub",
      audience: "safarhub-users",
    });

    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ✅ Check user in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // ✅ Attach clean user object
    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect };