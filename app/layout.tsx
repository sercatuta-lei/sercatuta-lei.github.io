import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HorizontalNav from "@/components/HorizontalNav";
import StructuredData from "@/components/StructuredData";
import ThemeProvider from "@/components/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
});

export const metadata: Metadata = {
  title: {
    default: "Jeff Lei's Lab - Software Engineering Research Group",
    template: "%s | Jeff Lei's Lab"
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
  creator: "Jeff Lei's Lab",
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
    'DC.title': 'Jeff Lei\'s Lab - Software Engineering Research Group',
    'DC.creator': 'Jeff Lei',
    'DC.subject': 'Software Engineering, Research, Computer Science',
    'DC.description': 'Software Engineering Research Group at UTA',
    'DC.publisher': 'University of Texas at Arlington',
    'DC.contributor': 'Jeff Lei\'s Lab Team',
    'DC.date': '2024',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://sercatuta-lei.github.io',
    'DC.language': 'en',
    'DC.coverage': 'Software Engineering Research',
    'DC.rights': 'Copyright Jeff Lei\'s Lab',
    'citation_author': 'Jeff Lei',
    'citation_title': 'Jeff Lei\'s Lab - Software Engineering Research Group',
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

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
