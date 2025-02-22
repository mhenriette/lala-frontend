import React from "react";
import BookingCard from "../cards/BookingCard";
import { useAuth } from "@/context/AuthContext";

interface PropertiesProps {
  data: {
    id: string;
    status: string;
    from: string;
    until: string;
    property: {
      title: string;
      location: string;
      pricePerNight: number;
      hostId: string;
      rating: number;
      isAvailable: boolean;
    };
  }[] ;
  hostId?: string;
  header?: React.ReactNode;
  
}

export default function Bookings({ data, header }: PropertiesProps) {
  const { userData } = useAuth();
  const isHost = userData?.role === "HOST";

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {header ? (
          header
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Your Bookings
            </h2>
          </div>
        )}
        {!data.length && (
          <div className="text-center text-lg text-gray-500">
            No bookings yet
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((booking) => (
            <BookingCard
              isHost={isHost}
              key={booking.id}
              name={booking.property.title}
              status={booking.status}
              bookingId={booking.id}
              id={booking.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
