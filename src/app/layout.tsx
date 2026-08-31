import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import Script from "next/script";
import ClientWrapper from "@/components/ClientWrapper";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "افضل شركة عزل اسطح بالرياض | شركة المعمورة الحديثة للعزل في الرياض",
    template: "%s | شركة المعمورة الحديثة - افضل شركة عزل بالرياض",
  },
  description:
    "شركة المعمورة الحديثة افضل شركة عزل اسطح بالرياض متخصصة في عزل مائي وحراري وفوم بأعلى معايير الجودة وضمان معتمد 15 سنة. تواصل مع افضل شركة عزل في الرياض الآن للحصول على معاينة مجانية.",
  keywords: [
    "شركة عزل اسطح بالرياض",
    "افضل شركة عزل في الرياض",
    "شركة عزل بالرياض",
    "عزل في الرياض",
    "عزل اسطح بالرياض",
    "شركة المعمورة الحديثة",
    "شركة كشف تسربات المياه بالرياض",
    "كشف تسربات المياه بدون تكسير",
    "افضل شركة عزل فوم بالرياض",
    "عزل مائي وحراري بالرياض",
    "شركة عزل خزانات بالرياض",
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
    canonical: SITE_URL,
  },
  openGraph: {
    title: "افضل شركة عزل اسطح بالرياض | شركة المعمورة الحديثة للعزل في الرياض",
    description:
      "شركة المعمورة الحديثة افضل شركة عزل اسطح بالرياض متخصصة في عزل مائي وحراري وفوم مع تقارير رسمية معتمدة وضمان 15 سنة.",
    url: SITE_URL,
    siteName: "شركة المعمورة الحديثة - افضل شركة عزل بالرياض",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/images/projects/project_real_01.jpg",
        width: 1200,
        height: 630,
        alt: "افضل شركة عزل اسطح بالرياض - شركة المعمورة الحديثة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "افضل شركة عزل اسطح بالرياض | شركة المعمورة الحديثة",
    description: "شركة عزل اسطح بالرياض متخصصة في عزل مائي وحراري وفوم معتمد مع ضمان 15 سنة.",
    images: ["/images/projects/project_real_01.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Global LocalBusiness Structured Data Schema - محسّن لاستهداف كلمات عزل الأسطح بالرياض
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "شركة المعمورة الحديثة لعزل الاسطح بالرياض",
    "alternateName": [
      "افضل شركة عزل في الرياض",
      "شركة عزل اسطح بالرياض",
      "شركة عزل بالرياض",
      "عزل في الرياض",
    ],
    "image": `${SITE_URL}/images/projects/project_real_01.jpg`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "+966501884483",
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": "Riyadh",
    },
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
    "description": "افضل شركة عزل اسطح بالرياض متخصصة في عزل الفوم والعزل المائي والحراري المعتمد مع ضمان 15 سنة.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3420",
    },
  };

  // FAQPage Schema لتعزيز الظهور في نتائج البحث المحلي
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هي افضل شركة عزل اسطح بالرياض؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "شركة المعمورة الحديثة هي افضل شركة عزل اسطح بالرياض، متخصصة في عزل الفوم والعزل المائي والحراري مع ضمان رسمي 15 سنة."
        }
      },
      {
        "@type": "Question",
        "name": "كيف أجد شركة عزل بالرياض بأسعار مناسبة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تواصل مع شركة المعمورة الحديثة أفضل شركة عزل في الرياض للحصول على معاينة مجانية وأسعار تنافسية لجميع أعمال العزل في الرياض."
        }
      },
      {
        "@type": "Question",
        "name": "ما هي خدمات العزل في الرياض التي تقدمها شركة المعمورة؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تقدم شركة المعمورة الحديثة خدمات العزل في الرياض الشاملة: عزل اسطح بالفوم، العزل المائي، العزل الحراري، عزل خزانات المياه، وكشف التسربات بدون تكسير."
        }
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${cairo.variable}`}>
      <head>
        <Script
          id="global-jsonld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <Script
          id="global-jsonld-faqpage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-brand-navyDark font-tajawal text-brand-light overflow-x-hidden antialiased">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
