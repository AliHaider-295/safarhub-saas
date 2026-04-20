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