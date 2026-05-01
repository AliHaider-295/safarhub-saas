"use client";

import { Building2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { getApiErrorMessage, signup } from "@/services/auth.service";

export default function SignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = new FormData(event.currentTarget);
    const companyName = String(form.get("companyName") || "").trim();
    let email = String(form.get("email") || "").trim().toLowerCase(); // ✅ force lowercase
    const password = String(form.get("password") || "");

    // ✅ Required fields
    if (!companyName || !email || !password) {
      toast.error("Company name, email and password are required");
      return;
    }

    // ✅ Email validation (real-world)
    const emailRegex =
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|co|pk|org|net|edu)$/;

    if (!email.includes("@")) {
      toast.error("Email must include @ symbol");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email (e.g. user@company.com)");
      return;
    }

    // ✅ Password validation (strong)
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, number and special character"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[AUTH][SIGNUP] Request", { companyName, email });

      const response = await signup({ companyName, email, password });

      if (!response || response.error) {
        throw new Error(response?.error || "Signup failed");
      }

      toast.success("Signup successful");

      router.push("/login");
    } catch (error) {
      console.error("[AUTH][SIGNUP] Error", error);
      const message = getApiErrorMessage(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 sm:gap-5"
      noValidate
      onSubmit={handleSubmit}
    >
      <Input
        id="signup-company"
        name="companyName"
        label="Company name"
        type="text"
        placeholder="Acme Transport Ltd."
        autoComplete="organization"
        required
        leftIcon={<Building2 strokeWidth={2} />}
      />

      <Input
        id="signup-email"
        name="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        required
        leftIcon={<Mail strokeWidth={2} />}
      />

      <PasswordInput
        id="signup-password"
        name="password"
        label="Password"
        placeholder="Create a strong password"
        required
        variant="signup"
      />

      <div className="pt-1">
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Signup"}
        </Button>
      </div>
    </form>
  );
}