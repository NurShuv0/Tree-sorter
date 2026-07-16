import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from '@/auth/AuthContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* AuthProvider must wrap RouterProvider so route guards can read auth state */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
