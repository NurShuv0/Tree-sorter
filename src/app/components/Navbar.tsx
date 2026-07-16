import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Bot, Heart, Leaf, LogOut, Menu, Moon, ScanSearch, Sun, User } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserMenu } from './auth/UserMenu';
import { useAuth } from '@/auth/useAuth';

function getInitials(displayName: string, username: string): string {
  const name = displayName || username;
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout, isSubmitting } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/', label: 'Home', icon: Leaf, end: true },
    { href: '/plants', label: 'Plants', icon: Leaf },
    { href: '/weather', label: 'Weather', icon: Sun },
    { href: '/tree-assistant', label: 'AI Tree Guide', icon: Bot },
    { href: '/disease-scan', label: 'Disease Scan', icon: ScanSearch },
    { href: '/favorites', label: 'Favourites', icon: Heart },
  ];

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary">
              <Leaf className="size-6 text-primary-foreground" />
            </div>
            <span className="hidden text-lg font-semibold text-foreground sm:inline-block">
              Tree Sorter
            </span>
          </Link>

          {/* ── Desktop navigation ─────────────────────────────────── */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex xl:gap-1.5">
            {navLinks.map(({ href, label, icon: Icon, end }) => (
              <NavLink
                key={href}
                to={href}
                end={end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium transition-colors xl:px-2.5 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-primary'
                  }`
                }
              >
                <Icon className="size-3.5 xl:size-4" />
                <span>{label}</span>
              </NavLink>
            ))}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-1 shrink-0"
              aria-label="Toggle colour theme"
            >
              <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Auth – desktop */}
            {isAuthenticated && user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Create account</Link>
                </Button>
              </div>
            )}
          </div>

          {/* ── Mobile controls ────────────────────────────────────── */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle colour theme"
            >
              <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(19rem,86vw)]">
                <div className="mt-8 flex flex-col gap-2">
                  {/* Mobile auth state */}
                  {isAuthenticated && user ? (
                    <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 mb-2">
                      <Avatar className="size-9">
                        {user.avatar_url ? (
                          <AvatarImage src={user.avatar_url} alt={user.display_name || user.username} />
                        ) : null}
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {getInitials(user.display_name, user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.display_name || user.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  ) : null}

                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Explore Tree Sorter
                  </p>

                  {navLinks.map(({ href, label, icon: Icon, end }) => (
                    <NavLink
                      key={href}
                      to={href}
                      end={end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted hover:text-primary'
                        }`
                      }
                    >
                      <Icon className="size-5" />
                      {label}
                    </NavLink>
                  ))}

                  {/* Mobile auth links */}
                  <div className="mt-2 border-t pt-2">
                    {isAuthenticated ? (
                      <>
                        <NavLink
                          to="/profile"
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground hover:bg-muted hover:text-primary'
                            }`
                          }
                        >
                          <User className="size-5" />
                          Profile
                        </NavLink>
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={isSubmitting}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                        >
                          <LogOut className="size-5" />
                          {isSubmitting ? 'Signing out…' : 'Sign out'}
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                        >
                          Log in
                        </NavLink>
                        <NavLink
                          to="/register"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-primary hover:bg-primary/10"
                        >
                          Create account
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
