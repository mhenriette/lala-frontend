import { Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "First-time Buyer",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The team at M-Seller made my first home buying experience incredibly smooth. Their expertise and guidance were invaluable throughout the process.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Property Investor",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "I've worked with many real estate agencies, but M-Seller stands out for their professionalism and attention to detail. They've helped me build an impressive property portfolio.",
      rating: 5,
    },
    {
      name: "Michael Roberts",
      role: "Commercial Client",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Their knowledge of the commercial property market is exceptional. They found us the perfect office space that met all our requirements and budget.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear from some of our satisfied
            clients
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array(testimonial.rating)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
