import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { BookOpen, Heart, Sun } from 'react-feather'

const mainFont = Open_Sans({
  subsets: ['latin'],
  variable: '--main-font'
})

export const metadata: Metadata = {
  title: 'A blog of books',
  description: 'books, photos and code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <header>
          <nav aria-labelledby='main navigation'>
            <Link href='/' className='logo'><BookOpen /></Link>
            <button><Sun /></button>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <span>&copy; 2023</span>
          <Heart />
        </footer>
      </body>
    </html>
  )
}
