"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Item = {
    type: "image" | "video";
    src: string;
    poster?: string;
    accentColor: string;
    tag: string;
};

const momentMedia: Item[] = [
    {
        type: "image",
        src: "/takeoff.jpg",
        accentColor: "#D4380D",
        tag: "TAKE-OFF",
    },
    {
        type: "video",
        src: "/inflight.mp4",
        poster: "/flight-view.jpg",
        accentColor: "#0066FF",
        tag: "IN FLIGHT",
    },
    {
        type: "image",
        src: "/flight-view.jpg",
        accentColor: "#00D4AA",
        tag: "THE VIEW",
    },
    {
        type: "video",
        src: "/splash.mp4",
        poster: "/hero-social.jpg",
        accentColor: "#FFB800",
        tag: "SPLASH",
    },
];

function VideoBackground({ item, className, isActive }: { item: Item; className: string; isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isActive) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isActive]);

    return (
        <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.poster}
            className={className}
            src={item.src}
        />
    );
}

function MobileCard({ item, index, total, t }: { item: Item; index: number; total: number; t: ReturnType<typeof useTranslations> }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.4 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="relative w-full h-[100svh] flex-shrink-0 snap-start snap-always overflow-hidden"
        >
            {item.type === "video" ? (
                <VideoBackground
                    item={item}
                    isActive={isInView}
                    className="absolute inset-0 w-full h-full object-cover saturate-[1.3] contrast-[1.05]"
                />
            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-center saturate-[1.3] contrast-[1.05]"
                    style={{ backgroundImage: `url(${item.src})` }}
                    role="img"
                    aria-label={item.tag}
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-6 right-5 z-20 flex items-center gap-2">
                <span className="text-xs font-black tracking-[0.4em]" style={{ color: item.accentColor }}>
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 text-xs font-bold">/ {String(total).padStart(2, "0")}</span>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-14 pt-16"
                style={{
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    opacity: visible ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block h-[2px] w-6" style={{ backgroundColor: item.accentColor }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: item.accentColor }}>
                        {item.tag}
                    </span>
                </div>

                <h3
                    className="font-black italic tracking-tighter text-white leading-[0.85] mb-3 text-[16vw]"
                    style={{ textShadow: `0 0 60px ${item.accentColor}66` }}
                >
                    {t(`moments.${index}.title`)}
                </h3>

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/90 mb-2">
                    {t(`moments.${index}.subtitle`)}
                </p>

                <p className="text-[10px] tracking-[0.3em] text-white/60 font-medium uppercase">
                    {t(`moments.${index}.description`)}
                </p>

                <div className="mt-6 h-[2px] w-12" style={{ backgroundColor: item.accentColor, opacity: 0.6 }} />
            </div>
        </div>
    );
}

export default function Experiences() {
    const t = useTranslations("Experiences");
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useLayoutEffect(() => {
        if (isMobile) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const progress = progressRef.current;
            if (!track) return;

            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                onUpdate() {
                    const raw = this.progress();
                    setActiveIndex(Math.round(raw * (momentMedia.length - 1)));
                    if (progress) {
                        gsap.set(progress, { scaleX: raw, transformOrigin: "left center" });
                    }
                }
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1.2,
                invalidateOnRefresh: true,
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isMobile]);

    if (isMobile) {
        return (
            <section id="experiences" aria-label="Parasailing experience moments">
                {momentMedia.map((item, i) => (
                    <MobileCard key={i} item={item} index={i} total={momentMedia.length} t={t} />
                ))}
            </section>
        );
    }

    return (
        <section
            ref={containerRef}
            className="h-screen w-full bg-black overflow-hidden relative"
            id="experiences"
            aria-label="Parasailing experience moments"
        >
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-50">
                <div
                    ref={progressRef}
                    className="h-full w-full origin-left scale-x-0"
                    style={{ background: momentMedia[activeIndex]?.accentColor }}
                />
            </div>

            <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
                <span
                    className="text-xs font-black tracking-[0.4em] uppercase transition-all duration-500"
                    style={{ color: momentMedia[activeIndex]?.accentColor }}
                >
                    {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20 text-xs font-bold">/ {String(momentMedia.length).padStart(2, "0")}</span>
            </div>

            <div className="absolute bottom-8 right-8 z-50 flex items-center gap-2 text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
                <svg width="24" height="10" viewBox="0 0 24 10" fill="none" aria-hidden="true">
                    <path d="M0 5H22M22 5L17 1M22 5L17 9" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                SCROLL
            </div>

            <div
                ref={trackRef}
                className="flex h-screen will-change-transform"
                style={{ width: `${momentMedia.length * 100}vw` }}
            >
                {momentMedia.map((item, i) => (
                    <div
                        key={i}
                        className="exp-panel w-screen h-screen relative flex-shrink-0 overflow-hidden"
                    >
                        {item.type === "video" ? (
                            <VideoBackground
                                item={item}
                                isActive={activeIndex === i}
                                className="absolute inset-0 w-full h-full object-cover scale-[1.05] saturate-[1.3] contrast-[1.05]"
                            />
                        ) : (
                            <div
                                className="absolute inset-0 bg-cover bg-center scale-[1.05] saturate-[1.3] contrast-[1.05]"
                                style={{ backgroundImage: `url(${item.src})` }}
                                role="img"
                                aria-label={item.tag}
                            />
                        )}

                        <div className="absolute right-0 bottom-0 z-[5] overflow-hidden pointer-events-none select-none leading-none">
                            <span
                                className="block text-[40vw] font-black italic leading-none"
                                style={{
                                    WebkitTextStroke: `1px ${item.accentColor}`,
                                    color: "transparent",
                                    opacity: 0.06,
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="absolute inset-0 z-[10] flex flex-col justify-start pt-28 pl-16 lg:pl-24 pr-16">
                            <div className="exp-tag flex items-center gap-3 mb-6">
                                <span
                                    className="inline-block h-[2px] w-8"
                                    style={{ backgroundColor: item.accentColor }}
                                />
                                <span
                                    className="text-xs font-black uppercase tracking-[0.5em]"
                                    style={{ color: item.accentColor }}
                                >
                                    {item.tag}
                                </span>
                            </div>

                            <p className="exp-subtitle text-base lg:text-lg font-bold uppercase tracking-[0.3em] text-white mb-4">
                                {t(`moments.${i}.subtitle`)}
                            </p>

                            <h3
                                className="exp-title font-black italic tracking-tighter text-white leading-[0.82] mb-6"
                                style={{
                                    fontSize: "clamp(4rem, 13vw, 14rem)",
                                    textShadow: `0 0 80px ${item.accentColor}66`,
                                }}
                            >
                                {t(`moments.${i}.title`)}
                            </h3>

                            <p className="text-sm tracking-[0.4em] text-white/80 font-medium uppercase">
                                {t(`moments.${i}.description`)}
                            </p>

                            <div
                                className="mt-8 h-[2px] w-16"
                                style={{ backgroundColor: item.accentColor, opacity: 0.6 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
