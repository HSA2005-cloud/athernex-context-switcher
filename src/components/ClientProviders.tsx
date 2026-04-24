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
        colorPrimary: '#7c5ce7',
        colorBackground: '#f8f5f0',
        colorText: '#2e2a33',
        colorTextSecondary: '#635c6a',
        colorInputBackground: '#ece6ef',
        colorInputText: '#2e2a33',
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
import { SettingsProvider } from '@/components/SettingsProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ClerkThemeWrapper>
          {children}
        </ClerkThemeWrapper>
      </SettingsProvider>
    </ThemeProvider>
  );
}
