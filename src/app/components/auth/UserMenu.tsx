import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { useAuth } from '@/auth/useAuth';

function getInitials(user: { display_name: string; username: string }): string {
  const name = user.display_name || user.username;
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Desktop user menu – avatar trigger with a dropdown containing profile links
 * and a logout action.
 */
export function UserMenu() {
  const { user, logout, isSubmitting } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        aria-label={`User menu for ${user.display_name || user.username}`}
      >
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8">
            {user.avatar_url ? (
              <AvatarImage
                src={user.avatar_url}
                alt={user.display_name || user.username}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden xl:inline-block max-w-[7rem] truncate text-foreground">
            {user.display_name || user.username}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">
              {user.display_name || user.username}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/favorites" className="flex items-center gap-2 cursor-pointer">
            <Heart className="size-4" />
            Favourites
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={loggingOut || isSubmitting}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="size-4" />
          {loggingOut ? 'Signing out…' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
