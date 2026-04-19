"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

const titleVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
        },
    },
};

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.7 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.8,
        },
    },
};

export default function Hero() {
    const t = useTranslations("Hero");
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={ref}
            className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-black"
            aria-label="Parasailing Zadar - Fly above the Adriatic Sea"
        >
            <motion.div style={{ y }} className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-10" />
                <Image
                    src="/hero.jpg"
                    alt="Parasailing above the Adriatic Sea in Zadar, Croatia"
                    fill
                    priority
                    sizes="100vw"
                    quality={85}
                    className="object-cover object-center contrast-110 saturate-[1.1]"
                />
            </motion.div>

            <div className="relative z-20 w-full px-5 sm:px-6 flex flex-col items-center lg:items-start text-center lg:text-left container mx-auto mt-24 sm:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                    className="inline-block bg-white text-black font-black uppercase px-5 py-2 mb-6 sm:mb-8 text-xs sm:text-base md:text-xl transform -skew-x-12"
                >
                    <span className="inline-block skew-x-12">{t('subtitle')}</span>
                </motion.div>

                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[15vw] sm:text-7xl md:text-[9rem] lg:text-[14rem] font-black italic tracking-tighter text-white leading-[0.85] mb-8 sm:mb-12"
                    style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
                >
                    <span className="block">
                        {"PARASAILING".split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block origin-bottom">
                                {char}
                            </motion.span>
                        ))}
                    </span>
                    <span className="block text-adrenaline-red stroke-text">
                        {"ZADAR".split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block origin-bottom">
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
                >
                    <Link
                        href="/#book"
                        className="w-full sm:w-auto min-h-[56px] px-8 sm:px-12 py-4 sm:py-6 bg-adrenaline-red text-white font-black text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center uppercase tracking-widest italic shadow-2xl shadow-adrenaline-red/30"
                    >
                        {t('cta_book')}
                    </Link>
                    <Link
                        href="/#experiences"
                        className="w-full sm:w-auto min-h-[56px] px-8 sm:px-12 py-4 sm:py-6 bg-white/10 backdrop-blur-md border-2 border-white/60 text-white font-black text-lg sm:text-2xl hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center uppercase tracking-widest italic group"
                    >
                        {t('cta_explore')}
                        <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 items-center gap-3 text-white/50 text-[10px] font-bold tracking-[0.4em] uppercase"
                    aria-hidden="true"
                >
                    <span>{t('scroll_hint')}</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="w-[1px] h-8 bg-white/50"
                    />
                </motion.div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 2px #D4380D;
                    color: transparent;
                }
                @media (min-width: 1024px) {
                    .stroke-text {
                        -webkit-text-stroke: 4px #D4380D;
                    }
                }
            `}</style>
        </section>
    );
}
