import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/app/components/auth/AuthLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { authApi } from '@/api/authApi';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Always results in the same generic backend response – safe to fire-and-forget.
      await authApi.forgotPassword({ email: email.trim() });
    } catch {
      // Intentionally ignore all errors – the UI always shows the generic success state.
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {submitted ? (
          /* ── Generic success state ────────────────────────────────────── */
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Check your inbox</h1>
              <p className="text-muted-foreground">
                If an account exists for{' '}
                <span className="font-medium text-foreground">{email}</span>, you'll receive
                password reset instructions shortly.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Didn't receive it? Check your spam folder or{' '}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-medium text-primary hover:underline"
              >
                try again
              </button>
              .
            </p>
            <Link
              to="/login"
              className="block text-sm font-medium text-primary hover:underline"
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          /* ── Email form ──────────────────────────────────────────────── */
          <>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Forgot password?
              </h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send reset instructions if an account
                exists.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="forgot-email">Email address</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    <span>Sending…</span>
                  </>
                ) : (
                  'Send reset instructions'
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                ← Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
