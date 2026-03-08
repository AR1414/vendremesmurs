import Script from 'next/script';
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from '@/lib/gtag';

export function TrackingScripts() {
  const primaryTagId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

  if (!primaryTagId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
