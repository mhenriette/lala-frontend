import { Building2, Users2, Trophy, Gem } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose M-Seller
          </h2>
          <p className="text-lg text-muted-foreground">
            With years of experience and dedication to excellence, we help you
            find the perfect property that matches your lifestyle and investment
            goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Building2,
              title: "Extensive Portfolio",
              description:
                "Access to thousands of premium properties across prime locations",
            },
            {
              icon: Users2,
              title: "Expert Guidance",
              description:
                "Professional real estate agents to guide you through every step",
            },
            {
              icon: Trophy,
              title: "Proven Track Record",
              description:
                "Over 10,000 successful property transactions completed",
            },
            {
              icon: Gem,
              title: "Premium Service",
              description:
                "Personalized attention and seamless property buying experience",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F25F4C] mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
