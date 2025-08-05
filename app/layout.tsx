import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HorizontalNav from "@/components/HorizontalNav";
import StructuredData from "@/components/StructuredData";
import ThemeProvider from "@/components/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jeff Lei Lab - Software Engineering Research Group",
    template: "%s | Jeff Lei Lab"
  },
  description: "The Software Engineering Research Group supervised by Dr. Jeff Lei at the University of Texas at Arlington. Conducting cutting-edge research in software design, specification, analysis, verification, and testing.",
  keywords: [
    "software engineering",
    "research",
    "Jeff Lei",
    "UTA",
    "University of Texas at Arlington",
    "software testing",
    "software verification",
    "software analysis",
    "PhD students",
    "computer science",
    "smart contracts",
    "IoT security",
    "program analysis",
    "software security",
    "blockchain",
    "artificial intelligence",
    "machine learning"
  ],
  authors: [{ name: "Jeff Lei" }],
  creator: "Jeff Lei Lab",
  publisher: "University of Texas at Arlington",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sercatuta-lei.github.io'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sercatuta-lei.github.io',
    title: 'Jeff Lei Lab - Software Engineering Research Group',
    description: 'The Software Engineering Research Group supervised by Dr. Jeff Lei at the University of Texas at Arlington.',
    siteName: 'Jeff Lei Lab',
    images: [
      {
        url: '/images/logo1.png',
        width: 1200,
        height: 630,
        alt: 'Jeff Lei Lab - Software Engineering Research Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeff Lei Lab - Software Engineering Research Group',
    description: 'The Software Engineering Research Group supervised by Dr. Jeff Lei at the University of Texas at Arlington.',
    images: ['/images/logo1.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'education',
  classification: 'research',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
    'DC.title': 'Jeff Lei Lab - Software Engineering Research Group',
    'DC.creator': 'Jeff Lei',
    'DC.subject': 'Software Engineering, Research, Computer Science',
    'DC.description': 'Software Engineering Research Group at UTA',
    'DC.publisher': 'University of Texas at Arlington',
    'DC.contributor': 'Jeff Lei Lab Team',
    'DC.date': '2024',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://sercatuta-lei.github.io',
    'DC.language': 'en',
    'DC.coverage': 'Software Engineering Research',
    'DC.rights': 'Copyright Jeff Lei Lab',
    'citation_author': 'Jeff Lei',
    'citation_title': 'Jeff Lei Lab - Software Engineering Research Group',
    'citation_publication_date': '2024',
    'citation_journal_title': 'Software Engineering Research',
    'citation_publisher': 'University of Texas at Arlington',
    'citation_technical_report_institution': 'University of Texas at Arlington',
    'citation_technical_report_number': 'SERC-2024',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50/30 dark:bg-gray-950 text-slate-800 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-slate-50/30 dark:bg-gray-950">
            <HorizontalNav />
            <main className="flex-1 min-h-[80vh] bg-slate-50/30 dark:bg-gray-950 text-slate-800 dark:text-white">
              {children}
            </main>
            {/* Footer */}
            <footer className="w-full bg-white/80 dark:bg-gray-950 border-t border-slate-200/60 dark:border-gray-800 py-6 mt-8 backdrop-blur-sm">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                {/* Social icons */}
                <div className="flex gap-4 text-2xl text-slate-600 dark:text-white/80">
                  <a href="#" aria-label="X" className="hover:text-slate-800 dark:hover:text-white transition-colors">✖️</a>
                  <a href="#" aria-label="YouTube" className="hover:text-slate-800 dark:hover:text-white transition-colors">▶️</a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-slate-800 dark:hover:text-white transition-colors">🔗</a>
                  <a href="#" aria-label="GitHub" className="hover:text-slate-800 dark:hover:text-white transition-colors">🐙</a>
                  <a href="#" aria-label="Instagram" className="hover:text-slate-800 dark:hover:text-white transition-colors">📸</a>
                  <a href="#" aria-label="TikTok" className="hover:text-slate-800 dark:hover:text-white transition-colors">🎵</a>
                  <a href="#" aria-label="Discord" className="hover:text-slate-800 dark:hover:text-white transition-colors">💬</a>
                </div>
                {/* Copyright */}
                <div className="text-center text-sm text-slate-600 dark:text-white/80">
                  Jeff Lei Lab © {new Date().getFullYear()} &nbsp;
                  <a href="#" className="underline hover:text-slate-800 dark:hover:text-white transition-colors">Manage Cookies</a>
                </div>
                {/* Language selector */}
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-slate-100/80 dark:bg-[#232323] px-6 py-2 text-slate-700 dark:text-white/90 text-base font-medium flex items-center gap-2 backdrop-blur-sm">
                    English <span className="text-slate-500 dark:text-white/60 text-sm">United States</span>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
