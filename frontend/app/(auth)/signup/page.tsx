import SignupForm from "@/components/forms/SignupForm";
import AuthCenteredLayout from "@/components/layout/AuthCenteredLayout";
import TextLink from "@/components/ui/TextLink";

export default function SignupPage() {
  return (
    <AuthCenteredLayout
      title="Create account"
      description="Set up your company on SafarHub in a few steps."
      footer={
        <p className="text-center text-sm text-slate-600 sm:text-base">
          Already have an account? <TextLink href="/login">Log in</TextLink>
        </p>
      }
    >
      <SignupForm />
    </AuthCenteredLayout>
  );
}
