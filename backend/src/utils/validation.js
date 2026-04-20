function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeEmail(email) {
  if (!isNonEmptyString(email)) return "";
  return email.trim().toLowerCase();
}

function validateSignup(body) {
  const companyName = body?.companyName;
  const email = normalizeEmail(body?.email);
  const password = body?.password;

  if (!isNonEmptyString(companyName)) {
    return { ok: false, message: "companyName is required" };
  }
  if (!isNonEmptyString(email)) {
    return { ok: false, message: "email is required" };
  }
  if (!isNonEmptyString(password)) {
    return { ok: false, message: "password is required" };
  }
  if (password.trim().length < 8) {
    return { ok: false, message: "Password must be at least 8 characters" };
  }

  return {
    ok: true,
    data: { companyName: companyName.trim(), email, password: password },
  };
}

function validateLogin(body) {
  const email = normalizeEmail(body?.email);
  const password = body?.password;

  if (!isNonEmptyString(email)) {
    return { ok: false, message: "email is required" };
  }
  if (!isNonEmptyString(password)) {
    return { ok: false, message: "password is required" };
  }

  return { ok: true, data: { email, password } };
}

module.exports = { validateSignup, validateLogin, normalizeEmail };
