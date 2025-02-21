import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import FAQSection from "@/components/sections/Faq";
import Footer from "@/components/layout/Footer";
import Properties from "@/components/sections/Properties";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Properties />
      <AboutSection/>
      <FAQSection/>
      <Footer/>
    </main>
  );
}
