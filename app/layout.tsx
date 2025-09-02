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
    default: "Jeff Lei's Lab - AI and Software Engineering Research Group",
    template: "%s | Jeff Lei's Lab"
  },
  description: "The AI and Software Engineering Research Group supervised by Dr. Jeff Lei at the University of Texas at Arlington. Conducting cutting-edge research in software design, specification, analysis, verification, and testing.",
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
      { url: '/uta-favicon.ico' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sercatuta-lei.github.io',
    title: 'Jeff Lei\'s Lab - AI and Software Engineering Research Group',
    description: 'The Software Engineering Research Group supervised by Dr. Jeff Lei at the University of Texas at Arlington.',
    siteName: 'Jeff Lei\'s Lab',
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
    title: 'Jeff Lei\'s Lab - AI and Software Engineering Research Group',
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
    'DC.rights': 'Copyright Jeff Lei&apos;s Lab',
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

                         {/* Footer */}
             <footer className="bg-slate-900 dark:bg-gray-950 border-t border-slate-800 dark:border-gray-800">
                               <div className="max-w-3xl mx-auto py-6 px-4">
                  <div className="grid grid-cols-1 gap-4">
                    
                    {/* Lab Information */}
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="text-blue-400 font-medium w-28 flex-shrink-0">Office Room:</span>
                        <span className="text-slate-300">Engineering Research Building (ERB), Room 513</span>
                      </div>
                      <div className="flex">
                        <span className="text-blue-400 font-medium w-28 flex-shrink-0">Post Address:</span>
                        <div className="text-slate-300 space-y-0.5">
                          <div>Department of Computer Science and Engineering</div>
                          <div>The University of Texas at Arlington</div>
                          <div>Box 19015</div>
                          <div>Arlington, Texas 76019-0015</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="border-t border-slate-800 dark:border-gray-800 mt-4 pt-4 text-center">
                    <p className="text-slate-400 text-sm">
                      © 2025 Jeff Lei&apos;s Research Lab. All rights reserved.
                    </p>
                  </div>
                </div>
            </footer>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
