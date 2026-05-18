import { Profile } from "@/types/profile";

const BASE_URL =
  "http://localhost:5000/api";

interface AuthFetchOptions
  extends RequestInit {
  headers?: HeadersInit;
}

export const authFetch = async (
  url: string,
  options: AuthFetchOptions = {}
) => {
  const token =
    localStorage.getItem(
      "safarhub_token"
    );

    console.log("TOKEN:", token);

  const headers: HeadersInit = {
    "Content-Type":
      "application/json",
    ...options.headers,
  };

  if (token) {
    (
      headers as Record<
        string,
        string
      >
    ).Authorization = `Bearer ${token}`;
  }

  console.log("HEADERS:", headers);

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });
};

// ================================
// PROFILE APIs
// ================================

// GET PROFILE
export const getProfile = async (): Promise<Profile> => {
  const res = await authFetch("/profile");

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch profile");
  }

  return result.data;
};

// UPDATE PROFILE
export const updateProfile =
  async (
    data: Partial<Profile>
  ): Promise<Profile> => {
    const res = await authFetch(
      "/profile",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData =
        await res.json();

      throw new Error(
        errorData.message ||
          "Failed to update profile"
      );
    }

    return res.json();
  };

// CHANGE PASSWORD
export const changePassword =
  async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const res = await authFetch(
      "/profile/change-password",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData =
        await res.json();

      throw new Error(
        errorData.message ||
          "Failed to change password"
      );
    }

    return res.json();
  };