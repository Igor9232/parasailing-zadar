"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Location() {
    const t = useTranslations("Location");

    return (
        <section
            className="bg-black text-white min-h-[70vh] py-20 sm:py-28 md:py-32 relative flex flex-col items-center justify-center"
            aria-label="Parasailing Zadar location in Petrčane"
        >
            <div className="container mx-auto px-5 sm:px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-1/2 space-y-8 sm:space-y-12"
                >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9]">
                        {t("title")}
                    </h2>
                    <div className="flex items-start space-x-4 sm:space-x-6 border-l-2 border-adrenaline-red pl-5 sm:pl-8">
                        <MapPin className="text-adrenaline-red w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" strokeWidth={2} />
                        <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white leading-tight">
                            {t("address")}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[500px] relative group border border-white/10 p-1.5"
                >
                    <div className="w-full h-full relative overflow-hidden bg-[#111]">
                        <iframe
                            src="https://maps.google.com/maps?q=55J5%2BG6+Petr%C4%8Dane&t=&z=17&ie=UTF8&iwloc=&output=embed"
                            className="absolute inset-0 w-full h-full border-0 filter invert-[100%] hue-rotate-180 contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Parasailing Zadar location map — Petrčane, Zadar, Croatia"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
