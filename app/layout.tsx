import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PII Firewall - Privacy-first AI applications',
  description:
    'A best-in-class, multi-language, domain-aware PII anonymization library for AI applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}