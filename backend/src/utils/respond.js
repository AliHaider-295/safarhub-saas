function ok(res, message, payload = {}) {
  return res.status(200).json({
    success: true,
    message,
    ...payload,
  });
}

function created(res, message, payload = {}) {
  return res.status(201).json({
    success: true,
    message,
    ...payload,
  });
}

function fail(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

module.exports = { ok, created, fail };
