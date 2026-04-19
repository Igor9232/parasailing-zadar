"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Marquee() {
    const t = useTranslations("Marquee");
    const reduce = useReducedMotion();
    const text = t("text");
    const repeated = text.repeat(4);

    return (
        <section
            className="py-4 sm:py-6 bg-adrenaline-red overflow-hidden relative select-none"
            aria-hidden="true"
        >
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap"
                >
                    <span className="text-xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight text-black px-4">
                        {repeated}
                    </span>
                    <span className="text-xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight text-black px-4">
                        {repeated}
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
