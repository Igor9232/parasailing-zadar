"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TakeOff() {
    const t = useTranslations("TakeOff");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const steps = [
        t("steps.0"),
        t("steps.1"),
        t("steps.2"),
        t("steps.3"),
        t("steps.4"),
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
    };

    return (
        <section
            className="bg-black text-white min-h-[80vh] py-20 sm:py-28 md:py-32 flex items-center relative z-20 overflow-hidden"
            aria-label="How parasailing works — the flight process"
        >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-adrenaline-red/5 -skew-x-[20deg] translate-x-32 pointer-events-none" />

            <div className="container mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col justify-center"
                >
                    <div className="inline-block bg-adrenaline-red text-white font-black uppercase tracking-widest px-4 py-2 mb-6 text-xs sm:text-sm w-fit">
                        {t("badge")}
                    </div>
                    <h2 className="text-[15vw] sm:text-6xl md:text-8xl lg:text-[8rem] font-black uppercase italic leading-[0.85] tracking-tighter">
                        {t("title_1")}<br /><span className="text-white/25">{t("title_2")}</span><br />{t("title_3")}
                    </h2>
                </motion.div>

                <div className="relative flex flex-col justify-center">
                    <motion.ol
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex flex-col relative z-10"
                    >
                        {steps.map((step, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                className="group flex flex-row items-center space-x-4 md:space-x-8 border-b-2 border-white/10 py-6 sm:py-8 hover:border-adrenaline-red transition-colors"
                            >
                                <span className="text-adrenaline-red font-black text-3xl sm:text-5xl md:text-7xl italic leading-none w-12 sm:w-20 md:w-24 flex-shrink-0">
                                    0{index + 1}
                                </span>
                                <p className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white group-hover:translate-x-3 transition-transform duration-300 leading-tight">
                                    {step}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
}
