'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

function ClerkThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const clerkVars = theme === 'dark'
    ? {
        colorPrimary: '#7c6dfa',
        colorBackground: '#16161f',
        colorText: '#f0effe',
        colorTextSecondary: '#9b99b8',
        colorInputBackground: '#1a1a25',
        colorInputText: '#f0effe',
        borderRadius: '10px',
        fontFamily: "'Inter', sans-serif",
      }
    : {
        colorPrimary: '#6c5ce7',
        colorBackground: '#f6f5fb',
        colorText: '#2d2b3d',
        colorTextSecondary: '#5e5c73',
        colorInputBackground: '#e8e7f0',
        colorInputText: '#2d2b3d',
        borderRadius: '10px',
        fontFamily: "'Inter', sans-serif",
      };

  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: clerkVars,
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClerkThemeWrapper>
        {children}
      </ClerkThemeWrapper>
    </ThemeProvider>
  );
}
