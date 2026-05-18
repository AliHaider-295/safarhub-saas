// src/middleware/role.middleware.js

const allowRoles = (...roles) => {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }
  
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({
            error: "Forbidden: insufficient permissions",
          });
        }
  
        next();
      } catch (error) {
        console.error("Role Middleware Error:", error);
        res.status(500).json({
          error: "Server error",
        });
      }
    };
  };
  
  module.exports = { allowRoles };