export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("safarhub_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers,
  });
};