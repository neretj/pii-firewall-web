import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Spotlight from './components/ui/Spotlight';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pii-firewall-web.vercel.app';
const siteName = 'PII Firewall';
const siteDescription =
  'Domain-aware PII anonymization for AI. Detect, pseudonymize and rehydrate sensitive data before it reaches any LLM. 55+ languages. GDPR-ready.';

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
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PII Firewall - Privacy-first LLM applications',
    template: '%s | PII Firewall',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'PII firewall',
    'LLM privacy',
    'data anonymization',
    'PII detection',
    'GDPR compliance',
    'AI security',
    'privacy firewall',
    'presidio',
    'healthcare AI privacy',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: 'PII Firewall - Privacy-first LLM applications',
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'PII Firewall Shield Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PII Firewall - Privacy-first LLM applications',
    description: siteDescription,
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
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