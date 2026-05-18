const jwt = require("jsonwebtoken");
const { prisma } = require("../db/prisma");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

   const token = req.headers.authorization?.split(" ")[1];

if (!token) {
  return res.status(401).json({ message: "No token" });
}

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "safarhub",
      audience: "safarhub-users",
    });

    // ✅ Fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account disabled",
      });
    }

    // ✅ Attach user
    req.user = {
      id: user.id,
      sub: user.id,     // ← backward compatibility
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { protect };