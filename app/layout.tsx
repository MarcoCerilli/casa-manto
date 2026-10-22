import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'DentalLead B2B - Kit Promozionale Software Dentistico & Sanitario',
  description: 'Kit promozionale ad alta conversione per sviluppatori web e agenzie: script Reel 30s, post LinkedIn, carosello Instagram da 5 slide, copy landing page e demo interattiva per studi dentistici e cliniche veterinarie.',
  openGraph: {
    title: 'DentalLead B2B - Kit Promozionale Software Dentistico & Sanitario',
    description: 'Kit promozionale ad alta conversione per sviluppatori web e agenzie per promuovere software e demo interattive a studi medici, dentistici e cliniche.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentalLead B2B - Kit Promozionale Software Dentistico & Sanitario',
    description: 'Kit promozionale ad alta conversione per sviluppatori web e agenzie per promuovere software e demo interattive a studi medici, dentistici e cliniche.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="it" className="light">
      <body className="bg-slate-50 text-slate-800 antialiased font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
