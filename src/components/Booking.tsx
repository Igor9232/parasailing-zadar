"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Navigation, MessageCircle, Send, User, Calendar, Users, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

const PHONE_INTL = "+385 98 460 466";
const WHATSAPP_NUMBER = "38598460466";

function todayISO() {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
}

export default function Booking() {
    const t = useTranslations("Booking");

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [people, setPeople] = useState("2");
    const [pkg, setPkg] = useState("tandem");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pkgLabel =
            pkg === "single" ? t("form.package_single") :
            pkg === "tandem" ? t("form.package_tandem") :
            t("form.package_triple");

        const lines = [
            t("form.greeting"),
            "",
            `• ${t("form.name")}: ${name || "-"}`,
            `• ${t("form.date")}: ${date || "-"}`,
            `• ${t("form.people")}: ${people}`,
            `• ${t("form.package")}: ${pkgLabel}`,
        ];
        const message = encodeURIComponent(lines.join("\n"));
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20 sm:py-28 md:py-32"
            id="book"
            aria-label="Book your parasailing flight"
        >
            <div className="absolute top-0 right-0 w-3/4 h-full bg-adrenaline-red/10 -skew-x-[30deg] translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-adrenaline-red/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-5 sm:px-6 relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* LEFT: Title & hours */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="flex flex-col items-start text-left"
                >
                    <div className="inline-block bg-adrenaline-red text-white font-black uppercase px-4 py-2 mb-6 text-xs sm:text-sm tracking-widest">
                        {t("badge")}
                    </div>
                    <h2 className="text-[14vw] sm:text-7xl md:text-[7rem] lg:text-[9rem] font-black italic tracking-tighter text-white leading-[0.85] mb-10 sm:mb-12">
                        {t("title_1")}<br />
                        {t("title_2")}<br />
                        <span className="text-adrenaline-red">{t("title_3")}</span>
                    </h2>
                    <div className="flex flex-col gap-2 border-l-[6px] border-adrenaline-red pl-5 sm:pl-6">
                        <p className="text-[11px] sm:text-sm text-white/40 tracking-[0.2em] font-bold uppercase">
                            {t("hours_label")}
                        </p>
                        <p className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider italic leading-tight">
                            {t("hours")}
                        </p>
                        <p className="text-[10px] sm:text-xs font-bold text-adrenaline-red tracking-widest uppercase mt-2">
                            {t("hours_note")}
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT: Form + quick actions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 18 }}
                    className="w-full flex flex-col gap-6"
                >
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                        <div className="mb-6">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
                                {t("form.title")}
                            </h3>
                            <p className="text-sm text-white/60">{t("form.subtitle")}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                            <label className="flex flex-col gap-2">
                                <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 flex items-center gap-2">
                                    <User size={14} strokeWidth={2.5} /> {t("form.name")}
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    placeholder={t("form.name")}
                                    className="w-full bg-black/60 border-2 border-white/15 px-4 py-4 min-h-[52px] text-white text-base font-semibold focus:border-adrenaline-red outline-none transition-colors placeholder:text-white/30"
                                />
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 flex items-center gap-2">
                                        <Calendar size={14} strokeWidth={2.5} /> {t("form.date")}
                                    </span>
                                    <input
                                        type="date"
                                        value={date}
                                        min={todayISO()}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-black/60 border-2 border-white/15 px-4 py-4 min-h-[52px] text-white text-base font-semibold focus:border-adrenaline-red outline-none transition-colors [color-scheme:dark]"
                                    />
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 flex items-center gap-2">
                                        <Users size={14} strokeWidth={2.5} /> {t("form.people")}
                                    </span>
                                    <select
                                        value={people}
                                        onChange={(e) => setPeople(e.target.value)}
                                        className="w-full bg-black/60 border-2 border-white/15 px-4 py-4 min-h-[52px] text-white text-base font-semibold focus:border-adrenaline-red outline-none transition-colors appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-2">
                                <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 flex items-center gap-2">
                                    <Tag size={14} strokeWidth={2.5} /> {t("form.package")}
                                </span>
                                <select
                                    value={pkg}
                                    onChange={(e) => setPkg(e.target.value)}
                                    className="w-full bg-black/60 border-2 border-white/15 px-4 py-4 min-h-[52px] text-white text-base font-semibold focus:border-adrenaline-red outline-none transition-colors appearance-none"
                                >
                                    <option value="single">{t("form.package_single")}</option>
                                    <option value="tandem">{t("form.package_tandem")}</option>
                                    <option value="triple">{t("form.package_triple")}</option>
                                </select>
                            </label>

                            <button
                                type="submit"
                                className="mt-2 w-full min-h-[64px] bg-[#25D366] text-white font-black text-lg sm:text-xl py-4 hover:bg-adrenaline-red transition-colors duration-300 flex items-center justify-center gap-3 uppercase italic tracking-wider shadow-xl shadow-[#25D366]/30"
                            >
                                <Send size={20} strokeWidth={2.5} />
                                {t("form.submit")}
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] sm:text-xs text-white/40 font-bold tracking-[0.3em] uppercase">
                        <span className="h-px flex-1 bg-white/10" />
                        {t("form.or")}
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[60px] py-4 bg-[#25D366] text-white font-black text-sm sm:text-base hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                            aria-label="Chat on WhatsApp"
                        >
                            <MessageCircle size={18} strokeWidth={2.5} />
                            {t("whatsapp")}
                        </a>
                        <a
                            href="tel:+38598460466"
                            className="min-h-[60px] py-4 bg-white text-black font-black text-sm sm:text-base hover:bg-adrenaline-red hover:text-white transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                            aria-label={`Call ${PHONE_INTL}`}
                        >
                            <Phone size={18} strokeWidth={2.5} />
                            {t("call_now")}
                        </a>
                        <a
                            href="https://maps.google.com/?q=Obala+5,+23231,+Petrcane"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[60px] py-4 bg-black border-2 border-white/25 text-white font-black text-sm sm:text-base hover:border-adrenaline-red hover:bg-adrenaline-red/10 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                            aria-label="Get directions to Parasailing Zadar"
                        >
                            <Navigation size={18} strokeWidth={2.5} />
                            {t("directions")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
