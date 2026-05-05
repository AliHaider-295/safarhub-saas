export const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("safarhub_token");
  
    console.log("🚀 SENDING TOKEN:", token); // debug only
  
    return fetch(`http://localhost:5000/api${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  };