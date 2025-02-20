import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PropertyCard } from "@/components/property/PropertyCard";
import AboutSection from "@/components/sections/About";
import FAQSection from "@/components/sections/Faq";
import Footer from "@/components/layout/Footer";

const properties = [
  {
    id: 1,
    title: "Villa in Tokyo site",
    location: "Tokyo Street, Plot 78, 4526, Japan",
    price: 420000,
    beds: 4,
    baths: 2,
    area: 2400,
    type: "sale" as const,
    image: "/property.avif",
  },
  {
    id: 2,
    title: "Modern Apartment in New York",
    location: "Manhattan, NY 10001, USA",
    price: 850000,
    beds: 3,

    baths: 2,
    area: 1800,
    type: "sale" as const,
    image: "/property.avif",
  },
  {
    id: 3,
    title: "Luxury Villa in Dubai",
    location: "Palm Jumeirah, Dubai, UAE",
    price: 1200000,
    beds: 5,
    baths: 4,
    area: 3500,
    type: "sale" as const,
    image: "/property.avif",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Latest Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Discover Latest Properties</h2>
              <h1 className="text-4xl font-bold mb-2"> damn text</h1>
              <p className="text-gray-600">Newest Properties Around You</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">For Rent</Button>
              <Button variant="outline">For Sale</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        </div>
      </section>

      <AboutSection/>
      <FAQSection/>
      <Footer/>
    </main>
  );
}
