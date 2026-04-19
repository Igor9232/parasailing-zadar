import type { MetadataRoute } from 'next';

const SITE_URL = 'https://parasailing-zadar.com';

const LOCALE_TO_BCP47: Record<string, string> = {
    en: 'en',
    hr: 'hr',
    de: 'de',
    it: 'it',
    slo: 'sl',
};

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = Object.keys(LOCALE_TO_BCP47);
    const lastModified = new Date();

    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[LOCALE_TO_BCP47[loc]] = `${SITE_URL}/${loc}`;
    }
    languages['x-default'] = `${SITE_URL}/en`;

    return locales.map((locale) => ({
        url: `${SITE_URL}/${locale}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: locale === 'en' ? 1 : 0.8,
        alternates: { languages },
    }));
}
