export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("safarhub_token");

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    ...(options.headers || {}),
  };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers,
  });
};