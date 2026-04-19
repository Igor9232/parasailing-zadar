"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const LANG_LABELS: Record<string, string> = {
    en: "English",
    hr: "Croatian",
    de: "German",
    it: "Italian",
    slo: "Slovenian",
};

export default function Navbar({ locale }: { locale: string }) {
    const t = useTranslations("Nav");
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const languages = ["en", "hr", "de", "it", "slo"];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
                : "bg-gradient-to-b from-black/40 to-transparent py-4 sm:py-5"
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
                <Link
                    href="/"
                    className="text-base sm:text-xl font-black tracking-[0.2em] text-white shrink-0"
                    aria-label="Parasailing Zadar - Home"
                >
                    {t('brand')}
                </Link>

                <div className="flex items-center gap-2 sm:gap-5">
                    <a
                        href="tel:+38598460466"
                        className="flex items-center gap-2 bg-adrenaline-red text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 min-h-[44px] hover:bg-white hover:text-black transition-colors duration-300 font-black tracking-wider uppercase text-xs sm:text-sm"
                        aria-label="Call Parasailing Zadar now — +385 98 460 466"
                    >
                        <Phone size={16} strokeWidth={2.5} />
                        <span>{t('call')}</span>
                    </a>

                    <div
                        className="flex gap-2 sm:gap-4 text-[11px] sm:text-[13px] font-semibold tracking-wide"
                        role="list"
                        aria-label="Language selection"
                    >
                        {languages.map((l) => (
                            <Link
                                key={l}
                                href={pathname}
                                locale={l as any}
                                className={`uppercase transition-opacity duration-300 min-w-[24px] text-center py-1.5 ${locale === l ? "opacity-100 text-adrenaline-red" : "opacity-50 hover:opacity-100"
                                    }`}
                                aria-label={`Switch to ${LANG_LABELS[l] ?? l}`}
                                aria-current={locale === l ? "true" : undefined}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
