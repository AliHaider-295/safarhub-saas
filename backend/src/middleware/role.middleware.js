const allowRoles = (...roles) => {
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }
  
        const userRole = req.user.role.toUpperCase();
  
        if (!roles.includes(userRole)) {
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