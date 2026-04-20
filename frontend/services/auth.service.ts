import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export type AuthPayload = {
  email: string;
  password: string;
};

export type SignupPayload = AuthPayload & {
  companyName: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    id: string;
    companyName: string;
    email: string;
    createdAt: string;
  };
};

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/signup", payload);
  return res.data;
}

export async function login(payload: AuthPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/login", payload);
  return res.data;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Request failed"
    );
  }
  if (error instanceof Error) return error.message;
  return "Request failed";
}