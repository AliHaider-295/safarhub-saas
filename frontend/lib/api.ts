import { Profile } from "@/types/profile";

const BASE_URL = "http://localhost:5000/api";

/* ======================================================
   TOKEN HELPERS
====================================================== */

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("safarhub_token");
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("safarhub_token", token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("safarhub_token");
  }
};

/* ======================================================
   AUTH FETCH (AUTO TOKEN ATTACH)
====================================================== */

interface AuthFetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const authFetch = async (
  url: string,
  options: AuthFetchOptions = {}
) => {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>).Authorization =
      `Bearer ${token}`;
  }

  console.log("TOKEN:", token);
  console.log("HEADERS:", headers);

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  return res;
};

/* ======================================================
   PROFILE APIs
====================================================== */

// ✅ GET PROFILE
export const getProfile = async (): Promise<Profile> => {
  const res = await authFetch("/profile");

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to fetch profile"
    );
  }

  return result.data;
};

// ✅ UPDATE PROFILE
export const updateProfile = async (data: any) => {
  const res = await authFetch("/profile/update", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Profile update failed"
    );
  }

  return result;
};


/* ======================================================
   CREATE PROFILE
====================================================== */

export const createProfile = async (data: any) => {
  const res = await authFetch("/profile/create", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Profile creation failed"
    );
  }

  return result;
};
// ✅ CHANGE PASSWORD
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await authFetch("/profile/change-password", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to change password"
    );
  }

  return result;
};