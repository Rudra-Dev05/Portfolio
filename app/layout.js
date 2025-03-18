import './globals.css'
import { Inter, Syne, Space_Grotesk, Playfair_Display, DM_Serif_Display } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext'
import { CursorProvider } from './context/CursorContext'
import Cursor from './components/Cursor'
import Navbar, { PageTransition } from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
  weight: ['400'],
})

export const metadata = {
  title: 'Rudradev Myadara',
  description: 'Creative Developer & Designer',
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hide-cursor">
      <body className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${playfair.variable} ${dmSerif.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CursorProvider>
            <Cursor />
            <Navbar />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 