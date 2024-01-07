import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { open_sans, pt_serif } from './fonts';
import Header from '@/components/Header/header';

import './globals.css';
import Footer from '@/components/Footer/footer';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants';
import { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'Generic title',
  description: 'Generic description for this personal blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const savedTheme = cookies().get('theme');
  const theme = savedTheme?.value || 'light';

  const themeColors =
    theme === 'light' ? (LIGHT_COLORS as CSSProperties) : (DARK_COLORS as CSSProperties);

  return (
    <html lang="en" data-theme={theme} style={themeColors}>
      <body className={`${open_sans.variable} ${pt_serif.variable}`}>
        <Header theme={theme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
