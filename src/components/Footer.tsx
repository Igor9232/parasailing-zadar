"use client";

import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-black border-t border-white/10 py-14 sm:py-16 md:py-20" role="contentinfo">
            <div className="container mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-8 mb-12 sm:mb-16">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white mb-4">
                            PARASAILING<br /><span className="text-adrenaline-red">ZADAR</span>
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                            {t("description")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs sm:text-sm font-bold tracking-[0.3em] text-white/60 uppercase mb-4 sm:mb-6">{t("contact")}</h4>
                        <a
                            href="tel:+38598460466"
                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                        >
                            <Phone size={16} strokeWidth={2} className="text-adrenaline-red" />
                            <span className="text-sm font-semibold">+385 98 460 466</span>
                        </a>
                        <a
                            href="https://wa.me/38598460466"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                        >
                            <MessageCircle size={16} strokeWidth={2} className="text-[#25D366]" />
                            <span className="text-sm font-semibold">WhatsApp</span>
                        </a>
                        <div className="flex items-start gap-3 text-white/70">
                            <MapPin size={16} strokeWidth={2} className="text-adrenaline-red mt-0.5 flex-shrink-0" />
                            <address className="text-sm font-medium not-italic leading-relaxed">
                                Obala 5, 23231 Petrčane<br />
                                Zadar, Croatia
                            </address>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <Clock size={16} strokeWidth={2} className="text-adrenaline-red" />
                            <span className="text-sm font-medium">{t("hours")}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs sm:text-sm font-bold tracking-[0.3em] text-white/60 uppercase mb-4 sm:mb-6">{t("quick_links")}</h4>
                        <nav className="flex flex-col gap-3" aria-label="Footer navigation">
                            <a href="#experiences" className="text-sm text-white/60 hover:text-white transition-colors">{t("link_experience")}</a>
                            <a href="#gallery" className="text-sm text-white/60 hover:text-white transition-colors">{t("link_gallery")}</a>
                            <a href="#book" className="text-sm text-white/60 hover:text-white transition-colors">{t("link_book")}</a>
                            <a
                                href="https://maps.google.com/?q=Obala+5,+23231,+Petrcane"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white/60 hover:text-white transition-colors"
                            >
                                {t("link_directions")}
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-[11px] sm:text-xs text-white/40">
                        &copy; {new Date().getFullYear()} Parasailing Zadar. {t("rights")}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/30">
                        Petrčane, Zadar — Croatia
                    </p>
                </div>
            </div>
        </footer>
    );
}
