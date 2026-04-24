import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContextMind — AI Context Preservation',
  description: 'Save and restore full AI session context across Claude, ChatGPT, Gemini',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#7c6dfa',
          colorBackground: '#16161f',
          colorText: '#f0effe',
          colorTextSecondary: '#9b99b8',
          colorInputBackground: '#1a1a25',
          colorInputText: '#f0effe',
          borderRadius: '10px',
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
