"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { setToken } from "@/utils/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { getApiErrorMessage, login } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("[AUTH][LOGIN] Request", { email });
      const response = await login({ email, password });
      console.log("[AUTH][LOGIN] Response", response);
      if (response.token) {
        setToken(response.token);
      }
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("[AUTH][LOGIN] Error", error);
      const message = getApiErrorMessage(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 sm:gap-5" noValidate onSubmit={handleSubmit}>
      <Input
        id="login-email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        required
        leftIcon={<Mail strokeWidth={2} />}
      />
      <PasswordInput
        id="login-password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        required
        variant="login"
      />

      <div className="pt-1">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </div>
    </form>
  );
}
