import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { cn } from '@/app/components/ui/utils';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string;
  helpText?: string;
  /** Defaults to 'current-password'. Use 'new-password' for new/confirm fields. */
  autoComplete?: 'current-password' | 'new-password';
}

/**
 * Reusable password input with accessible show/hide toggle.
 * Correctly sets aria-invalid, aria-describedby, and autocomplete.
 */
export function PasswordField({
  id,
  label,
  error,
  helpText,
  autoComplete = 'current-password',
  disabled,
  required,
  className,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const describedBy = [error ? errorId : null, helpText ? helpId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
      </Label>

      <div className="relative">
        <Input
          {...props}
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className="pr-10"
        />
        {/* type="button" prevents accidental form submission */}
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {helpText && !error && (
        <p id={helpId} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
