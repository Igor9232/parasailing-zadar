"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export default function Stats() {
    const t = useTranslations("Stats");

    const stats = [
        { value: 100, suffix: "m", label: t("height") },
        { value: 10000, suffix: "+", label: t("happy_flyers") },
        { value: 10, suffix: " min", label: t("duration") },
        { value: 100, suffix: "%", label: t("safety") },
    ];

    return (
        <section
            className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden"
            aria-label="Parasailing Zadar key facts"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-adrenaline-red)_0%,_transparent_70%)] opacity-[0.04]" />

            <div className="w-full px-5 sm:px-8 md:px-16 xl:px-24 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16 xl:gap-24">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.08 }}
                            className="text-center group"
                        >
                            <div className="text-4xl sm:text-6xl md:text-8xl lg:text-[5.5rem] xl:text-[7rem] font-black italic tracking-tighter text-white leading-none mb-3 sm:mb-4 group-hover:text-adrenaline-red transition-colors duration-500">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] text-white/60 uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
