import SignInForm from "../../components/SignInForm";

function SignInPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">Sign In</h1>

        <p className="mt-3 text-[var(--muted)]">
          Sign in to continue with your order.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <SignInForm />
      </div>
    </section>
  );
}

export default SignInPage;
