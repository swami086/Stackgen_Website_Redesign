import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/motion/MotionProvider';
import './globals.css';

const geist = localFont({
  variable: '--font-geist',
  display: 'swap',
  src: [
    { path: '../public/fonts/Geist-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Geist-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Geist-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s · StackGen',
    default: 'StackGen',
  },
  description: 'Infrastructure change, safe at machine speed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
