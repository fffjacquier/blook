import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Heart } from 'react-feather';
import { cookies } from 'next/headers';
import { DARK_COLORS, LIGHT_COLORS, THEME_LIGHT } from '@/constants';
import { CSSProperties } from 'react';
import DarkLightToggle from '@/components/DarkLightToggle/DarkLightToggle';

const mainFont = Open_Sans({
  subsets: ['latin'],
  variable: '--main-font',
});

export const metadata: Metadata = {
  title: 'A blog of books',
  description: 'books, photos and code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const savedTheme = cookies().get('theme');
  const theme = savedTheme?.value || THEME_LIGHT;

  const themeColors =
    theme === THEME_LIGHT
      ? (LIGHT_COLORS as CSSProperties)
      : (DARK_COLORS as CSSProperties);

  return (
    <html lang="en" data-theme={theme} style={themeColors}>
      <body className={mainFont.className}>
        <header>
          <nav aria-labelledby="main navigation">
            <Link href="/" className="logo">
              <BookOpen />
            </Link>
            <DarkLightToggle initialTheme={theme} />
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <span>&copy; 2023</span>
          <Heart fill="var(--color-text)" />
        </footer>
      </body>
    </html>
  );
}
