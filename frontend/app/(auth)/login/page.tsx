import LoginForm from "@/components/forms/LoginForm";
import AuthCenteredLayout from "@/components/layout/AuthCenteredLayout";
import TextLink from "@/components/ui/TextLink";

export default function LoginPage() {
  return (
    <AuthCenteredLayout
      title="Log in"
      description="Welcome back. Sign in to your workspace."
      footer={
        <p className="text-center text-sm text-slate-600 sm:text-base">
          Don&apos;t have an account?{" "}
          <TextLink href="/signup">Sign up</TextLink>
        </p>
      }
    >
      <LoginForm />
    </AuthCenteredLayout>
  );
}
