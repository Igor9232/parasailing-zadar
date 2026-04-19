"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Item = {
    id: number;
    type: "image" | "video";
    src: string;
    thumb: string;
    alt: string;
};

export default function Gallery() {
    const t = useTranslations("Gallery");

    const galleryItems: Item[] = [
        { id: 1, type: "video", src: "/inflight.mp4", thumb: "/hero-social.jpg", alt: t("alt_video") },
        { id: 2, type: "image", src: "/hero-social.jpg", thumb: "/hero-social.jpg", alt: t("alt_img1") },
        { id: 3, type: "image", src: "/gallery-1.jpg", thumb: "/gallery-1.jpg", alt: t("alt_img2") },
        { id: 4, type: "video", src: "/splash.mp4", thumb: "/flight-view.jpg", alt: t("alt_video") },
        { id: 5, type: "image", src: "/takeoff.jpg", thumb: "/takeoff.jpg", alt: t("alt_img1") },
    ];

    const [activeItem, setActiveItem] = useState<Item | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        if (!activeItem) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveItem(null);
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [activeItem]);

    return (
        <section className="py-20 sm:py-24 md:py-32 bg-black text-white relative" id="gallery" aria-label="Parasailing photo gallery">
            <div className="container mx-auto px-5 sm:px-6 mb-10 sm:mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9]"
                >
                    {t("title_1")}<br /><span className="text-adrenaline-red">{t("title_2")}</span>
                </motion.h2>
            </div>

            {/* Mobile: stacked grid */}
            <div className="md:hidden flex flex-col gap-3 px-4">
                {galleryItems.map((item, idx) => (
                    <motion.button
                        key={item.id}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.05 }}
                        className="w-full aspect-[4/3] overflow-hidden relative group text-left"
                        onClick={() => setActiveItem(item)}
                        aria-label={item.alt}
                    >
                        <Image
                            src={item.thumb}
                            alt={item.alt}
                            fill
                            sizes="100vw"
                            loading="lazy"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-adrenaline-red/90 backdrop-blur-md flex items-center justify-center border-2 border-white/30 shadow-xl">
                                    <Play className="text-white w-6 h-6 ml-1" strokeWidth={2.5} fill="white" />
                                </div>
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Desktop: drag carousel */}
            <motion.div ref={carouselRef} className="cursor-grab overflow-hidden hidden md:block">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-6 px-6"
                >
                    {galleryItems.map((item) => (
                        <motion.button
                            key={item.id}
                            type="button"
                            className="relative min-w-[500px] h-[650px] overflow-hidden group focus-visible:outline-3 focus-visible:outline-adrenaline-red"
                            onClick={() => setActiveItem(item)}
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            aria-label={item.alt}
                        >
                            <Image
                                src={item.thumb}
                                alt={item.alt}
                                fill
                                sizes="(min-width: 768px) 500px, 100vw"
                                loading="lazy"
                                className="object-cover pointer-events-none transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {item.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-20 h-20 rounded-full bg-adrenaline-red/90 backdrop-blur-md flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                        <Play className="text-white w-8 h-8 ml-1" strokeWidth={2.5} fill="white" />
                                    </div>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
                        onClick={() => setActiveItem(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Fullscreen media viewer"
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
                            onClick={(e) => { e.stopPropagation(); setActiveItem(null); }}
                            aria-label="Close fullscreen view"
                        >
                            <X className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-6xl max-h-[85vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeItem.type === "image" ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={activeItem.src} className="w-full h-full object-contain" alt={activeItem.alt} />
                            ) : (
                                <video src={activeItem.src} controls autoPlay playsInline className="w-full h-full object-contain bg-black" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
