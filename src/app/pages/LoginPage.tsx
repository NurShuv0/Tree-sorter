import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
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

export function LoginPage() {
  const { login, isSubmitting } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setFieldErrors(undefined);

    if (!identifier.trim() || !password) {
      setServerError('Please enter your username/email and password.');
      return;
    }

    try {
      await login({ identifier: identifier.trim(), password });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: FieldErrors };
      if (error?.errors) {
        setFieldErrors(error.errors);
        setServerError(error.message ?? 'Please correct the highlighted fields.');
      } else {
        setServerError(error?.message ?? 'Invalid login credentials.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue caring for your garden.
          </p>
        </div>

        {/* Server error alert */}
        {serverError && !fieldErrors && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Identifier */}
          <div className="space-y-1.5">
            <Label htmlFor="login-identifier">
              Username or email
            </Label>
            <Input
              id="login-identifier"
              type="text"
              autoComplete="username email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="your@email.com or username"
              disabled={isSubmitting}
              required
              aria-invalid={!!getFieldError(fieldErrors, 'identifier')}
              aria-describedby={
                getFieldError(fieldErrors, 'identifier') ? 'login-identifier-error' : undefined
              }
            />
            {getFieldError(fieldErrors, 'identifier') && (
              <p id="login-identifier-error" className="text-xs text-destructive" role="alert">
                {getFieldError(fieldErrors, 'identifier')}
              </p>
            )}
          </div>

          {/* Password */}
          <PasswordField
            id="login-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isSubmitting}
            required
            error={getFieldError(fieldErrors, 'password')}
          />

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Signing in…</span>
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          New to Tree Sorter?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Create a free account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
