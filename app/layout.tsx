import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Spotlight from './components/ui/Spotlight';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PII Firewall — Privacy-first LLM applications',
  description:
    'Domain-aware PII anonymization for AI. Detect, pseudonymize and rehydrate sensitive data before it reaches any LLM. 55+ languages. GDPR-ready.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className='antialiased'>
        <Spotlight />
        {children}
      </body>
    </html>
  );
}