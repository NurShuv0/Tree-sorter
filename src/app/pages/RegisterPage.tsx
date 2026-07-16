import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/app/components/auth/AuthLayout';
import { PasswordField } from '@/app/components/auth/PasswordField';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useAuth } from '@/auth/useAuth';
import type { FieldErrors } from '@/auth/authTypes';

function getFieldError(errors: FieldErrors | undefined, field: string): string | undefined {
  return errors?.[field]?.[0];
}

export function RegisterPage() {
  const { register, isSubmitting } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    display_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setFieldErrors(undefined);

    // Client-side quick checks
    if (!form.username.trim() || !form.email.trim() || !form.password) {
      setServerError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirm_password) {
      setFieldErrors({ confirm_password: ['Passwords do not match.'] });
      return;
    }

    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        confirm_password: form.confirm_password,
        display_name: form.display_name.trim(),
      });
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: FieldErrors };
      if (error?.errors) {
        setFieldErrors(error.errors);
        setServerError(error.message ?? 'Please correct the highlighted fields.');
      } else {
        setServerError(error?.message ?? 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-muted-foreground">
            Join Tree Sorter and start your plant journey.
          </p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="flex flex-col gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
            {fieldErrors?.non_field_errors && (
              <ul className="list-disc pl-9 space-y-1">
                {fieldErrors.non_field_errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Display name */}
          <div className="space-y-1.5">
            <Label htmlFor="reg-display-name">Display name</Label>
            <Input
              id="reg-display-name"
              type="text"
              autoComplete="name"
              value={form.display_name}
              onChange={set('display_name')}
              placeholder="Your name (optional)"
              disabled={isSubmitting}
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="reg-username">
              Username <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id="reg-username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={set('username')}
              placeholder="plant_lover_42"
              disabled={isSubmitting}
              required
              aria-invalid={!!getFieldError(fieldErrors, 'username')}
              aria-describedby={
                getFieldError(fieldErrors, 'username') ? 'reg-username-error' : undefined
              }
            />
            {getFieldError(fieldErrors, 'username') && (
              <p id="reg-username-error" className="text-xs text-destructive" role="alert">
                {getFieldError(fieldErrors, 'username')}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="reg-email">
              Email <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              disabled={isSubmitting}
              required
              aria-invalid={!!getFieldError(fieldErrors, 'email')}
              aria-describedby={
                getFieldError(fieldErrors, 'email') ? 'reg-email-error' : undefined
              }
            />
            {getFieldError(fieldErrors, 'email') && (
              <p id="reg-email-error" className="text-xs text-destructive" role="alert">
                {getFieldError(fieldErrors, 'email')}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordField
            id="reg-password"
            label="Password"
            value={form.password}
            onChange={set('password')}
            autoComplete="new-password"
            disabled={isSubmitting}
            required
            helpText="At least 8 characters."
            error={getFieldError(fieldErrors, 'password')}
          />

          {/* Confirm password */}
          <PasswordField
            id="reg-confirm-password"
            label="Confirm password"
            value={form.confirm_password}
            onChange={set('confirm_password')}
            autoComplete="new-password"
            disabled={isSubmitting}
            required
            error={getFieldError(fieldErrors, 'confirm_password')}
          />

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Creating account…</span>
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
