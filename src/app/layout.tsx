import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, Playfair_Display } from 'next/font/google';
import { TrackingScripts } from '@/components/TrackingScripts';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'VMM – VendreMesMurs.fr | Vente de murs commerciaux',
  description:
    'Plateforme premium pour propriétaires souhaitant céder leurs murs commerciaux à Paris et en Banlieue.',
  metadataBase: new URL('https://vendremesmurs.fr'),
  openGraph: {
    title: 'VMM – VendreMesMurs.fr',
    description:
      'Déposez les informations essentielles de votre bien en quelques instants. Étude rapide et confidentielle.',
    type: 'website',
    locale: 'fr_FR'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18188089574"
          strategy="beforeInteractive"
        />
        <Script id="google-ads-gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18188089574');
          `}
        </Script>
      </head>
      <body>
        {children}
        <TrackingScripts />
      </body>
    </html>
  );
}
