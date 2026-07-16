import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertCircle,
  Calendar,
  Clock,
  Edit2,
  KeyRound,
  Loader2,
  LogOut,
  MapPin,
  Save,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { PasswordField } from '@/app/components/auth/PasswordField';
import { useAuth } from '@/auth/useAuth';
import type { FieldErrors } from '@/auth/authTypes';
import { toast } from 'sonner';

function getInitials(displayName: string, username: string): string {
  const name = displayName || username;
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="text-xs text-destructive" role="alert">
      {error}
    </p>
  );
}

export function ProfilePage() {
  const { user, logout, updateProfile, changePassword, isSubmitting } = useAuth();
  const navigate = useNavigate();

  // ── Edit profile state ──────────────────────────────────────────────────
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    display_name: user?.display_name ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    avatar_url: user?.avatar_url ?? '',
    location: user?.location ?? '',
    bio: user?.bio ?? '',
  });
  const [profileErrors, setProfileErrors] = useState<FieldErrors | undefined>();
  const [profileServerError, setProfileServerError] = useState('');

  const setProfileField =
    (field: keyof typeof profileForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setProfileForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSaveProfile = async () => {
    setProfileErrors(undefined);
    setProfileServerError('');
    try {
      await updateProfile(profileForm);
      setEditing(false);
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: FieldErrors };
      if (error?.errors) {
        setProfileErrors(error.errors);
        setProfileServerError(error.message ?? 'Please correct the highlighted fields.');
      } else {
        setProfileServerError(error?.message ?? 'Failed to update profile.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setProfileErrors(undefined);
    setProfileServerError('');
    setProfileForm({
      display_name: user?.display_name ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      avatar_url: user?.avatar_url ?? '',
      location: user?.location ?? '',
      bio: user?.bio ?? '',
    });
  };

  // ── Change password state ───────────────────────────────────────────────
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<FieldErrors | undefined>();
  const [passwordServerError, setPasswordServerError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const setPasswordField = (field: keyof typeof passwordForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleChangePassword = async () => {
    setPasswordErrors(undefined);
    setPasswordServerError('');
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setPasswordErrors({ confirm_new_password: ['Passwords do not match.'] });
      return;
    }
    setPasswordLoading(true);
    try {
      await changePassword(passwordForm);
      toast.success('Password changed. Please sign in again.');
      navigate('/login', { replace: true });
    } catch (err: unknown) {
      const error = err as { message?: string; errors?: FieldErrors };
      if (error?.errors) {
        setPasswordErrors(error.errors);
        setPasswordServerError(error.message ?? 'Please correct the highlighted fields.');
      } else {
        setPasswordServerError(error?.message ?? 'Failed to change password.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await logout();
    navigate('/login', { replace: true });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        {/* ── Profile header ─────────────────────────────────────────── */}
        <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar className="size-20 text-2xl">
              {user.avatar_url ? (
                <AvatarImage src={user.avatar_url} alt={user.display_name || user.username} />
              ) : null}
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
                {getInitials(user.display_name, user.username)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-1">
              <h1 className="text-2xl font-bold text-foreground truncate">
                {user.display_name || user.username}
              </h1>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
              <p className="text-muted-foreground text-sm truncate">{user.email}</p>
              {user.location && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {user.location}
                </p>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              {!editing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="gap-2"
                >
                  <Edit2 className="size-3.5" />
                  Edit
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={loggingOut}
                className="gap-2 text-destructive hover:text-destructive"
              >
                {loggingOut ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <LogOut className="size-3.5" />
                )}
                {loggingOut ? 'Signing out…' : 'Sign out'}
              </Button>
            </div>
          </div>

          {user.bio && (
            <p className="mt-5 text-sm text-foreground/80 border-t pt-4">{user.bio}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 border-t pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              Joined {formatDate(user.date_joined)}
            </span>
            {user.last_login && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                Last seen {formatDate(user.last_login)}
              </span>
            )}
          </div>
        </div>

        {/* ── Edit profile form ───────────────────────────────────────── */}
        {editing && (
          <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Edit profile</h2>

            {profileServerError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
              >
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{profileServerError}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="prof-display-name">Display name</Label>
                <Input
                  id="prof-display-name"
                  value={profileForm.display_name}
                  onChange={setProfileField('display_name')}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prof-username">Username</Label>
                <Input
                  id="prof-username"
                  value={profileForm.username}
                  onChange={setProfileField('username')}
                  disabled={isSubmitting}
                  aria-invalid={!!profileErrors?.username?.[0]}
                />
                <FieldError id="prof-username-error" error={profileErrors?.username?.[0]} />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="prof-email">Email</Label>
                <Input
                  id="prof-email"
                  type="email"
                  value={profileForm.email}
                  onChange={setProfileField('email')}
                  disabled={isSubmitting}
                  aria-invalid={!!profileErrors?.email?.[0]}
                />
                <FieldError id="prof-email-error" error={profileErrors?.email?.[0]} />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="prof-avatar">Avatar URL</Label>
                <Input
                  id="prof-avatar"
                  type="url"
                  value={profileForm.avatar_url}
                  onChange={setProfileField('avatar_url')}
                  placeholder="https://…"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prof-location">Location</Label>
                <Input
                  id="prof-location"
                  value={profileForm.location}
                  onChange={setProfileField('location')}
                  placeholder="Dhaka, Bangladesh"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="prof-bio">Bio</Label>
                <textarea
                  id="prof-bio"
                  value={profileForm.bio}
                  onChange={setProfileField('bio')}
                  placeholder="Tell us about yourself…"
                  disabled={isSubmitting}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                className="gap-2"
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {isSubmitting ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        )}

        {/* ── Change password ─────────────────────────────────────────── */}
        <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Change password</h2>
          </div>

          {passwordServerError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              <span>{passwordServerError}</span>
            </div>
          )}

          <div className="space-y-4 max-w-sm">
            <PasswordField
              id="change-current-password"
              label="Current password"
              value={passwordForm.current_password}
              onChange={setPasswordField('current_password')}
              autoComplete="current-password"
              disabled={passwordLoading}
              required
              error={passwordErrors?.current_password?.[0]}
            />
            <PasswordField
              id="change-new-password"
              label="New password"
              value={passwordForm.new_password}
              onChange={setPasswordField('new_password')}
              autoComplete="new-password"
              disabled={passwordLoading}
              required
              helpText="At least 8 characters."
              error={passwordErrors?.new_password?.[0]}
            />
            <PasswordField
              id="change-confirm-password"
              label="Confirm new password"
              value={passwordForm.confirm_new_password}
              onChange={setPasswordField('confirm_new_password')}
              autoComplete="new-password"
              disabled={passwordLoading}
              required
              error={passwordErrors?.confirm_new_password?.[0]}
            />
          </div>

          <p className="text-xs text-muted-foreground max-w-sm">
            After changing your password you will be signed out and redirected to the
            login page.
          </p>

          <Button
            type="button"
            onClick={handleChangePassword}
            disabled={passwordLoading}
            variant="outline"
            className="gap-2"
          >
            {passwordLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <KeyRound className="size-4" />
            )}
            {passwordLoading ? 'Changing password…' : 'Change password'}
          </Button>
        </div>
      </div>
    </div>
  );
}
