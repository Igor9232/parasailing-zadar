import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import TakeOff from "@/components/TakeOff";
import Safety from "@/components/Safety";
import Pricing from "@/components/Pricing";
import Experiences from "@/components/Experiences";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-black text-white overflow-hidden">
            <Navbar locale={locale} />
            <Hero />
            <Marquee />
            <Experiences />
            <Stats />
            <TakeOff />
            <Gallery />
            <Pricing />
            <Safety />
            <Location />
            <Booking />
            <Footer />
        </main>
    );
}
