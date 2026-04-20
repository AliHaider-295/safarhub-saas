const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Prisma } = require("@prisma/client");

const { prisma } = require("../db/prisma");
const { created, fail, ok } = require("../utils/respond");
const { validateLogin, validateSignup } = require("../utils/validation");

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required");

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: "7d" }
  );
}

function safeUser(user) {
  return {
    id: user.id,
    companyName: user.companyName,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function getAuthErrorResponse(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { status: 409, message: "Email already exists" };
    }
    if (error.code === "P1001") {
      return {
        status: 500,
        message:
          "Database connection failed. Please verify DATABASE_URL and that PostgreSQL is reachable.",
      };
    }
    return { status: 500, message: error.message };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      status: 500,
      message:
        "Database client initialization failed. Check DATABASE_URL and Prisma adapter setup.",
    };
  }

  return { status: 500, message: error?.message || "Internal server error" };
}

async function signup(req, res) {
  try {
    const parsed = validateSignup(req.body);
    if (!parsed.ok) return fail(res, 400, parsed.message);

    const { companyName, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return fail(res, 409, "Email already exists");

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { companyName, email, password: hashed },
    });

    return created(res, "Signup successful", { data: safeUser(user) });
  } catch (error) {
    console.error("[AUTH][SIGNUP]", error);
    const authError = getAuthErrorResponse(error);
    return fail(res, authError.status, authError.message);
  }
}

async function login(req, res) {
  try {
    const parsed = validateLogin(req.body);
    if (!parsed.ok) return fail(res, 400, parsed.message);

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return fail(res, 401, "Invalid credentials");

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return fail(res, 401, "Invalid credentials");

    const token = signToken(user);
    return ok(res, "Login successful", { token, data: safeUser(user) });
  } catch (error) {
    console.error("[AUTH][LOGIN]", error);
    const authError = getAuthErrorResponse(error);
    return fail(res, authError.status, authError.message);
  }
}

module.exports = { signup, login };
