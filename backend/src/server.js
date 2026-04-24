require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const tripRoutes = require("./routes/trip.routes");
const { prisma } = require("./db/prisma");
const { fail } = require("./utils/respond");

const app = express();

/* ---------------- CORS ---------------- */
const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("[CORS] Blocked origin:", origin);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

/* ---------------- Middleware ---------------- */
app.use(express.json({ limit: "1mb" }));

app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------------- Routes ---------------- */
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "ok" });
});

app.use("/api/auth", authRoutes);            // ✅ ADD (you missed this)
app.use("/api/dashboard", dashboardRoutes); // ✅ KEEP
app.use("/api/trips", tripRoutes);
/* ---------------- 404 (MUST BE LAST) ---------------- */
app.use((req, res) => {
  console.log("❌ Not Found:", req.originalUrl);
  return fail(res, 404, "Not found");
});

/* ---------------- Error Handler ---------------- */
app.use((err, _req, res, _next) => {
  console.error(err);
  return fail(res, 500, err?.message || "Internal server error");
});

/* ---------------- Server ---------------- */
const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully");

    app.listen(PORT, () => {
      console.log(`SafarHub API listening on :${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error?.message || error);
    process.exit(1);
  }
}

startServer();