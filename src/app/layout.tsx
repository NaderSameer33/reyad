import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import Script from "next/script";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const siteDomain = "https://nobalaa-iso.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteDomain),
  title: {
    default: "شركة المعمورة الحديثة لعزل الأسطح وكشف التسربات بالرياض | معتمد 15 سنة",
    template: "%s | شركة المعمورة الحديثة بالرياض",
  },
  description:
    "شركة المعمورة الحديثة معتمدة لكشف تسربات المياه بدون تكسير بالرياض وعزل الفوم والبولي يوريثان والعزل المائي والحراري للأسطح والخزانات مع تقرير معتمد لشركة المياه وضمان 15 سنة.",
  keywords: [
    "شركة المعمورة الحديثة",
    "شركة كشف تسربات المياه بالرياض",
    "كشف تسربات المياه بدون تكسير",
    "افضل شركة عزل فوم بالرياض",
    "عزل مائي وحراري بالرياض",
    "شركة عزل خزانات بالرياض",
    "عزل اسطح بالرياض",
    "عزل فوم بولي يوريثان",
    "تقرير معتمد لشركة المياه بالرياض",
    "تخفيض فاتورة المياه بالرياض",
    "عزل بولي يوريا الرياض",
    "شركة عزل معتمدة بالرياض",
  ],
  authors: [{ name: "شركة المعمورة الحديثة للعزل والمقاولات" }],
  creator: "شركة المعمورة الحديثة للعزل والمقاولات",
  publisher: "شركة المعمورة الحديثة",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteDomain,
  },
  openGraph: {
    title: "شركة المعمورة الحديثة لعزل الأسطح وكشف التسربات بالرياض | ضمان 15 سنة",
    description:
      "الشركة الأولى المعتمدة بالرياض لكشف التسربات بدون تكسير وأعمال عزل الفوم والمائي والحراري مع تقارير رسمية معتمد.",
    url: siteDomain,
    siteName: "شركة المعمورة الحديثة للعزل والمقاولات",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/images/projects/project_real_01.jpg",
        width: 1200,
        height: 630,
        alt: "شركة المعمورة الحديثة لعزل الأسطح وكشف التسربات بالرياض",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة المعمورة الحديثة لعزل الأسطح وكشف التسربات بالرياض",
    description: "كشف تسربات المياه بدون تكسير وعزل الفوم المعتمد مع ضمان 15 سنة.",
    images: ["/images/projects/project_real_01.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Global LocalBusiness Structured Data Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "شركة المعمورة الحديثة لعزل الأسطح وكشف التسربات بالرياض",
    "image": `${siteDomain}/images/projects/project_real_01.jpg`,
    "@id": siteDomain,
    "url": siteDomain,
    "telephone": "+966501884483",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق الملك فهد، حي الصحافة",
      "addressLocality": "الرياض",
      "addressRegion": "الرياض",
      "postalCode": "13321",
      "addressCountry": "SA",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7946,
      "longitude": 46.6372,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
    "sameAs": [
      "https://wa.me/966501884483",
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3420",
    },
  };

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${cairo.variable}`}>
      <head>
        <Script
          id="global-jsonld-nobalaa"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-brand-navyDark font-tajawal text-brand-light overflow-x-hidden antialiased">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
