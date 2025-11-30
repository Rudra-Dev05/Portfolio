import './globals.css'
import { Inter, Syne, Space_Grotesk, Playfair_Display, DM_Serif_Display, Kanit, Outfit, Unbounded, Bodoni_Moda } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext'
import Navbar, { PageTransition } from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import { personalInfo } from './data/content'

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

const kanit = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  weight: ['200', '300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} | ${personalInfo.role}`,
    template: `%s | ${personalInfo.name}`
  },
  description: personalInfo.bio.long,
  keywords: ['Creative Developer', 'Web Developer', 'Portfolio', 'React', 'Next.js', 'TypeScript', 'Frontend Engineer', 'UI/UX Design', 'Salesforce Developer', 'System Engineer'],
  authors: [{ name: personalInfo.name, url: 'https://rudradev.com' }],
  creator: personalInfo.name,
  metadataBase: new URL('https://rudradev.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.bio.short,
    url: 'https://rudradev.com',
    siteName: personalInfo.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.bio.short,
    creator: '@RMyadara',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.role,
    worksFor: {
      '@type': 'Organization',
      name: personalInfo.company
    },
    url: 'https://rudradev.com',
    sameAs: [
      personalInfo.social.linkedin,
      personalInfo.social.github,
      personalInfo.social.twitter
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: personalInfo.education.college
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressCountry: 'India'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${playfair.variable} ${dmSerif.variable} ${kanit.variable} ${outfit.variable} ${unbounded.variable} ${bodoni.variable} antialiased`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:font-medium focus:rounded-full focus:shadow-xl transition-all"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <Navbar />
            <PageTransition>
              <main id="main-content">{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}