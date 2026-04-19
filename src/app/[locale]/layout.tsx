import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const SITE_URL = 'https://parasailing-zadar.com';

const LOCALE_META: Record<string, { ogLocale: string; bcp47: string; title: string; description: string; keywords: string[] }> = {
    en: {
        ogLocale: 'en_US',
        bcp47: 'en',
        title: 'Parasailing Zadar | Fly 100m Above The Adriatic Sea',
        description: 'Parasailing in Zadar, Croatia. Fly 100m above the Adriatic Sea with breathtaking views of the Zadar archipelago. Single, tandem & triple flights. Book on WhatsApp.',
        keywords: [
            'parasailing zadar', 'parasailing croatia', 'zadar parasailing',
            'zadar water sports', 'parasailing petrcane', 'parasailing adriatic',
            'parasailing price zadar', 'things to do in zadar', 'zadar activities',
            'croatia adventure', 'fly above sea zadar', 'tandem parasailing zadar',
        ],
    },
    hr: {
        ogLocale: 'hr_HR',
        bcp47: 'hr',
        title: 'Parasailing Zadar | Letovi 100m Iznad Jadrana',
        description: 'Parasailing u Zadru, Hrvatska. Letite 100m iznad Jadranskog mora s pogledom na zadarske otoke. Solo, tandem i triple letovi. Rezervirajte preko WhatsAppa.',
        keywords: [
            'parasailing zadar', 'parasailing hrvatska', 'let padobranom zadar',
            'zadar aktivnosti', 'parasailing petrčane', 'paragliding zadar',
            'vodeni sportovi zadar', 'adrenalin zadar', 'avantura zadar',
        ],
    },
    de: {
        ogLocale: 'de_DE',
        bcp47: 'de',
        title: 'Parasailing Zadar | Fliegen Sie 100m über der Adria',
        description: 'Parasailing in Zadar, Kroatien. Fliegen Sie 100m über der Adria mit atemberaubendem Blick auf den Archipel von Zadar. Einzel, Tandem & Triple. Jetzt buchen.',
        keywords: [
            'parasailing zadar', 'parasailing kroatien', 'fallschirm fliegen zadar',
            'zadar aktivitäten', 'wassersport kroatien', 'adriatisches meer fliegen',
            'urlaub zadar aktivitäten', 'adrenalin zadar',
        ],
    },
    it: {
        ogLocale: 'it_IT',
        bcp47: 'it',
        title: 'Parasailing Zadar | Vola 100m sopra l\'Adriatico',
        description: 'Parasailing a Zara, Croazia. Volate a 100m sopra il Mare Adriatico con vista panoramica sull\'arcipelago di Zara. Singolo, tandem, triplo. Prenota ora.',
        keywords: [
            'parasailing zara', 'parasailing croazia', 'paracadute zara',
            'sport acquatici croazia', 'attività zara', 'adrenalina croazia',
            'volo parasailing adriatico',
        ],
    },
    slo: {
        ogLocale: 'sl_SI',
        bcp47: 'sl',
        title: 'Parasailing Zadar | Letite 100m nad Jadranom',
        description: 'Parasailing v Zadru, Hrvaška. Letite 100m nad Jadranskim morjem z razgledom na zadarski arhipelag. Solo, tandem, triple. Rezervirajte na WhatsAppu.',
        keywords: [
            'parasailing zadar', 'parasailing hrvaška', 'padalstvo zadar',
            'vodni šport hrvaška', 'aktivnosti zadar', 'adrenalin zadar',
            'počitnice zadar',
        ],
    },
};

function localeLanguagesMap(currentLocale: string) {
    const map: Record<string, string> = {};
    for (const [loc, meta] of Object.entries(LOCALE_META)) {
        map[meta.bcp47] = `${SITE_URL}/${loc}`;
    }
    map['x-default'] = `${SITE_URL}/en`;
    return map;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const meta = LOCALE_META[locale] ?? LOCALE_META.en;

    return {
        metadataBase: new URL(SITE_URL),
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        authors: [{ name: 'Parasailing Zadar' }],
        creator: 'Parasailing Zadar',
        publisher: 'Parasailing Zadar',
        category: 'travel',
        formatDetection: {
            email: false,
            address: false,
            telephone: true,
        },
        alternates: {
            canonical: `${SITE_URL}/${locale}`,
            languages: localeLanguagesMap(locale),
        },
        openGraph: {
            type: 'website',
            locale: meta.ogLocale,
            url: `${SITE_URL}/${locale}`,
            siteName: 'Parasailing Zadar',
            title: meta.title,
            description: meta.description,
            images: [
                {
                    url: '/hero-social.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Parasailing above the Adriatic Sea in Zadar, Croatia',
                    type: 'image/jpeg',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: ['/hero-social.jpg'],
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
        icons: {
            icon: '/favicon.ico',
        },
    };
}

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
};

function JsonLd({ locale }: { locale: string }) {
    const meta = LOCALE_META[locale] ?? LOCALE_META.en;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}/#business`,
                "name": "Parasailing Zadar",
                "description": meta.description,
                "url": SITE_URL,
                "telephone": "+385 98 460 466",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Obala 5",
                    "addressLocality": "Petrčane",
                    "postalCode": "23231",
                    "addressRegion": "Zadar County",
                    "addressCountry": "HR"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 44.1873155,
                    "longitude": 15.1584288
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "10:00",
                        "closes": "18:00"
                    }
                ],
                "priceRange": "€€",
                "image": `${SITE_URL}/hero-social.jpg`,
                "sameAs": [],
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 44.1873155,
                        "longitude": 15.1584288
                    },
                    "geoRadius": "30000"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Parasailing Flights",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Single Parasailing Flight",
                                "description": "Solo parasailing flight, 10 minutes above the Adriatic Sea at 100m height"
                            },
                            "price": "60",
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock"
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Tandem Parasailing Flight",
                                "description": "Tandem parasailing flight for 2 persons, 10 minutes above the Adriatic Sea"
                            },
                            "price": "100",
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock"
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Triple Parasailing Flight",
                                "description": "Triple parasailing flight for 3 persons, 10 minutes above the Adriatic Sea"
                            },
                            "price": "150",
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock"
                        }
                    ]
                }
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": SITE_URL,
                "name": "Parasailing Zadar",
                "description": "Parasailing in Zadar, Croatia — fly above the Adriatic Sea",
                "inLanguage": ["en", "hr", "de", "it", "sl"],
                "publisher": { "@id": `${SITE_URL}/#business` }
            },
            {
                "@type": "TouristAttraction",
                "name": "Parasailing Zadar",
                "description": "Parasailing adventure in Zadar — fly 100 meters above the crystal-clear Adriatic Sea with panoramic views of the Zadar archipelago and Croatian coastline.",
                "touristType": ["Adventure seekers", "Water sports enthusiasts", "Families", "Couples"],
                "availableLanguage": ["English", "Croatian", "German", "Italian", "Slovenian"],
                "isAccessibleForFree": false,
                "publicAccess": true,
                "image": `${SITE_URL}/hero-social.jpg`
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Are there age restrictions for parasailing in Zadar?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No age restrictions. Anyone meeting the minimum crew weight can fly."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the minimum weight for parasailing?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "45 kg total crew weight."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What happens if the weather is bad?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We reschedule or provide a 100% refund."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I bring my phone on the parasailing flight?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we offer waterproof cases for your device."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How much does parasailing cost in Zadar?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Single flight: 60€, Tandem (2 persons): 100€, Triple (3 persons): 150€. Each flight lasts 10 minutes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I book a parasailing flight in Zadar?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Book instantly via WhatsApp at +385 98 460 466 or use the online form on our website. Phone bookings accepted daily 10:00 – 18:00."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const bcp47 = LOCALE_META[locale]?.bcp47 ?? locale;
    const messages = await getMessages();

    return (
        <html lang={bcp47} className="scroll-smooth">
            <head>
                <JsonLd locale={locale} />
                <link rel="preload" as="image" href="/hero.webp" type="image/webp" />
                <link rel="preconnect" href="https://maps.google.com" />
                <link rel="dns-prefetch" href="https://wa.me" />
            </head>
            <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
