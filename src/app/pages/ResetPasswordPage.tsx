import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/app/components/auth/AuthLayout';
import { PasswordField } from '@/app/components/auth/PasswordField';
import { Button } from '@/app/components/ui/button';
import { authApi } from '@/api/authApi';
import type { FieldErrors } from '@/auth/authTypes';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') ?? '';
  const token = searchParams.get('token') ?? '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();

  // Missing parameters – show invalid-link state immediately.
  if (!uid || !token) {
    return (
      <AuthLayout>
        <InvalidLink />
      </AuthLayout>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setFieldErrors(undefined);

    if (newPassword !== confirmPassword) {
      setFieldErrors({ confirm_new_password: ['Passwords do not match.'] });
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({
        uid,
        token,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: FieldErrors };
      if (error?.errors) {
        setFieldErrors(error.errors);
        setServerError(error.message ?? 'Please correct the highlighted fields.');
      } else {
        setServerError(
          error?.message ?? 'This password-reset link is invalid or has expired.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Password reset!</h1>
            <p className="text-muted-foreground">
              Your password has been reset successfully. Sign in with your new password.
            </p>
          </div>
          <Link to="/login">
            <Button className="w-full" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reset your password
          </h1>
          <p className="text-muted-foreground">Choose a new, strong password.</p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <PasswordField
            id="reset-new-password"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            disabled={loading}
            required
            helpText="At least 8 characters."
            error={fieldErrors?.new_password?.[0]}
          />

          <PasswordField
            id="reset-confirm-password"
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            disabled={loading}
            required
            error={fieldErrors?.confirm_new_password?.[0]}
          />

          <Button type="submit" className="w-full" disabled={loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Resetting…</span>
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

function InvalidLink() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-8 text-destructive" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Invalid reset link</h1>
        <p className="text-muted-foreground">
          This password-reset link is missing required parameters, is invalid, or has
          expired. Please request a new one.
        </p>
      </div>
      <Link to="/forgot-password">
        <Button className="w-full" size="lg">
          Request a new link
        </Button>
      </Link>
      <Link to="/login" className="block text-sm font-medium text-primary hover:underline">
        ← Back to sign in
      </Link>
    </div>
  );
}
