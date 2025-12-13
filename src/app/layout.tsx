import { ThemeProvider } from '@/components/global/theme-provider';
import { AlertDialog } from '@/components/ui/alert-dialog';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Project Manager - Organize Projects, Ship Faster',
  description:
    'A minimal project management system that helps your team stay organized and deliver on time. Track tasks, collaborate in real-time, and ship faster.',
  generator: 'v0.app',
  metadataBase: new URL('https://example.com'),
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Project Manager - Organize Projects, Ship Faster',
    description: 'A minimal project management system for modern teams',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Manager - Organize Projects, Ship Faster',
    description: 'A minimal project management system for modern teams',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <AlertDialog />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
