import React from 'react'
import PropertyCard from '../property/PropertyCard';

export default function Properties() {
    const sampleProperties = [
      {
        id: "1",
        title: "Luxury Beachfront Villa",
        description:
          "Experience the ultimate in coastal living with this stunning beachfront villa. Features include a private pool, direct beach access, and panoramic ocean views.",
        pricePerNight: 299,
        location: "Malibu, California",
        hostId: "host123",
        imageUrl:
          "/property.avif",
        rating: 4.8,
        isAvailable: true,
      },
      {
        id: "2",
        title: "Cozy Mountain Cabin",
        description:
          "Escape to this charming mountain cabin surrounded by nature. Perfect for a romantic getaway or a peaceful retreat.",
        pricePerNight: 150,
        location: "Aspen, Colorado",
        hostId: "host456",
        imageUrl:
          "/property.avif",
        rating: 4.6,
        isAvailable: true,
      },
      {
        id: "3",
        title: "Modern City Loft",
        description:
          "Stay in the heart of the city in this stylish loft apartment. Walking distance to major attractions and gourmet restaurants.",
        pricePerNight: 200,
        location: "New York City, New York",
        hostId: "host789",
        imageUrl:
          "/property.avif",
        rating: 4.7,
        isAvailable: true,
      },
      {
        id: "4",
        title: "Secluded Treehouse Retreat",
        description:
          "Experience a unique stay in this custom-built treehouse. Surrounded by forest with modern amenities for a comfortable stay.",
        pricePerNight: 180,
        location: "Portland, Oregon",
        hostId: "host101",
        imageUrl:
          "/property.avif",
        rating: 4.9,
        isAvailable: true,
      },
    ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Available Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties available
            for your next stay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {
            sampleProperties.map((property) => (
                <PropertyCard
                    key={property.id}
                    {...property}
                    currentUserId={""}
                />
            ))
          }
        </div>
      </div>
    </section>
  );
}
