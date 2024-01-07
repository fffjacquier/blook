import { Open_Sans, PT_Serif } from 'next/font/google';

export const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-for-title',
});
export const pt_serif = PT_Serif({
  subsets: ['latin'],
  display: 'fallback',
  weight: ['400'],
  variable: '--font-for-body',
});
