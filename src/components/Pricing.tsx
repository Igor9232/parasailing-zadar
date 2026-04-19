"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function PricingRow({ title, duration, price, delay }: { title: string, duration: string, price: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
            className="group relative w-full border-b-[3px] border-white/20 transition-all duration-300 hover:border-transparent py-8 sm:py-12 px-5 sm:px-6 overflow-hidden"
        >
            <div className="absolute inset-0 bg-adrenaline-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end w-full group-hover:text-black transition-colors duration-300 gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-[10px] sm:text-sm font-bold tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100">
                        {duration}
                    </p>
                    <h3 className="text-[14vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-none">
                        {title}
                    </h3>
                </div>

                <div className="text-5xl sm:text-6xl md:text-7xl font-black opacity-90 group-hover:opacity-100 italic">
                    {price}
                </div>
            </div>
        </motion.div>
    );
}

export default function Pricing() {
    const t = useTranslations("Pricing");

    return (
        <section
            className="relative py-20 sm:py-24 md:py-32 bg-black flex flex-col justify-center overflow-hidden"
            aria-label="Parasailing flight prices and packages"
        >
            <div className="container mx-auto px-0 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-10 sm:mb-16 px-5 sm:px-6"
                >
                    <h2 className="text-[13vw] sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                        {t("title_1")}<br /><span className="text-adrenaline-red">{t("title_2")}</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col w-full">
                    <PricingRow title={t("single")} duration={t("duration")} price="60 €" delay={0} />
                    <PricingRow title={t("tandem")} duration={t("duration")} price="100 €" delay={0.1} />
                    <PricingRow title={t("triple")} duration={t("duration")} price="150 €" delay={0.2} />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                    className="mt-12 sm:mt-16 mx-5 sm:mx-6 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 border border-white/10 p-6 sm:p-8"
                >
                    <p className="text-sm sm:text-lg md:text-2xl font-bold uppercase tracking-widest text-white/70 text-center md:text-left">
                        {t("extra")} <span className="text-adrenaline-red">10 €</span>
                    </p>
                    <a
                        href="#book"
                        className="w-full md:w-auto min-h-[56px] px-10 py-4 bg-white text-black font-black text-base sm:text-xl hover:bg-adrenaline-red hover:text-white transition-colors uppercase tracking-widest italic text-center flex items-center justify-center"
                    >
                        {t("book_now")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
