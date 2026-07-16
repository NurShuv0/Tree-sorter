import { Leaf } from 'lucide-react';

/**
 * Full-screen loading indicator displayed while AuthContext restores the
 * session from stored tokens. Prevents a flash of protected content.
 */
export function AuthLoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background"
      role="status"
      aria-label="Loading your session…"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 animate-pulse">
        <Leaf className="size-8 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
    </div>
  );
}
