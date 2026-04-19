"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Safety() {
    const t = useTranslations("Safety");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqCount = 6;

    return (
        <section
            className="bg-adrenaline-red text-black min-h-screen py-20 sm:py-24 md:py-32 flex flex-col justify-center selection:bg-black selection:text-white"
            aria-label="Safety information and frequently asked questions"
        >
            <div className="container mx-auto px-5 sm:px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="mb-16 sm:mb-20 md:mb-24 border-b-[4px] sm:border-b-[6px] border-black pb-6 sm:pb-8"
                >
                    <h2 className="text-[15vw] sm:text-8xl md:text-[11rem] font-black tracking-tighter uppercase italic leading-[0.9]">
                        {t("title_1")}<br />{t("title_2")}
                    </h2>
                </motion.div>

                <div className="space-y-0">
                    {Array.from({ length: faqCount }).map((_, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ type: "spring", stiffness: 150, damping: 20, delay: idx * 0.04 }}
                                className="border-b-[2px] sm:border-b-[3px] border-black/30 hover:border-black transition-colors duration-300"
                            >
                                <button
                                    type="button"
                                    className="w-full py-6 sm:py-10 md:py-12 flex justify-between items-center text-left group gap-4 min-h-[64px]"
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${idx}`}
                                >
                                    <h3 className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter pr-4 leading-tight">
                                        {t(`faqs.${idx}.q`)}
                                    </h3>
                                    <motion.span
                                        initial={false}
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                        className="text-black font-black text-3xl sm:text-5xl flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                                        aria-hidden="true"
                                    >
                                        {isOpen ? "×" : "+"}
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-answer-${idx}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 sm:pb-10 md:pb-12 pt-2 text-black/85 font-semibold text-lg sm:text-2xl md:text-3xl uppercase tracking-wider max-w-3xl border-l-[4px] sm:border-l-[6px] border-black pl-5 sm:pl-8 ml-2 sm:ml-4">
                                                {t(`faqs.${idx}.a`)}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
