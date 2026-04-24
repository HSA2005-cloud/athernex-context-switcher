import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContextMind — AI Context Preservation',
  description: 'Save and restore full AI session context across Claude, ChatGPT, Gemini',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
