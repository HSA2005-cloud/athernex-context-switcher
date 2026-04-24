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
        colorBackground: '#ffffff',
        colorText: '#1a1a2e',
        colorTextSecondary: '#5c5b78',
        colorInputBackground: '#f0f0f4',
        colorInputText: '#1a1a2e',
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
