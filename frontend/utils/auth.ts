export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("safarhub_token");
};

export const setToken = (token: string) => {
  localStorage.setItem("safarhub_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("safarhub_token");
};

// 🔥 ADD THIS
export const logout = () => {
  // remove cookie (middleware uses this)
  document.cookie = "token=; path=/; max-age=0";

  // remove local storage (frontend uses this)
  removeToken();

  // redirect to login
  window.location.href = "/login";
};