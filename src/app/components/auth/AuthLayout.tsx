import { Leaf } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

import treeIcon from '@/assets/tree-icon.png';

/**
 * Two-panel auth layout.
 * - Desktop: left branding panel + right form panel.
 * - Mobile: single-column form only.
 * 
 * Note: uses a beautiful 3D style tree icon for the hero area.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Left branding panel (desktop only) ────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] flex-col justify-between bg-primary p-12 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-white/5" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Leaf className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Tree Sorter</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          {/* Big decorative tree icon */}
          <div className="w-32 h-32 select-none" aria-hidden="true">
            <img 
              src={treeIcon} 
              alt="Tree Icon" 
              className="w-full h-full object-contain drop-shadow-xl animate-in fade-in zoom-in duration-700" 
            />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            Your personal<br />plant companion
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-sm">
            Identify plants, track your favourites, get expert advice from our AI Tree Guide,
            and keep your garden thriving — all in one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['🌿 Plant Library', '🌦 Weather', '🤖 AI Guide', '🔍 Disease Scan'].map((f) => (
              <span
                key={f}
                className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm text-white/90 backdrop-blur-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs text-white/50">
          © {new Date().getFullYear()} Tree Sorter. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10">
        {/* Mobile-only logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary">
            <Leaf className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Tree Sorter</span>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
