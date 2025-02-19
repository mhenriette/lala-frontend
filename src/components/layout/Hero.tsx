import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import axios from "axios";

export const Hero = () => {
   const login = useCallback(async (credentialResponse: any ) => {
     const googleAuthToken = credentialResponse.credential;
     axios.post("http://localhost:3000/api/auth/signin", {
       token: googleAuthToken,
     });
   }, []);
  return (
    <section className="relative min-h-[700px] flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.avif"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />{" "}
        {/* Black overlay with 50% opacity */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">
            Buy or rent properties with no commission
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Embark On The Journey To Discover Your Ideal Home, Where Comfort And
            Dreams Converge Seamlessly. Your Perfect Living Space Awaits – Find
            It Today!
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            Learn More
          </Button>
          <GoogleLogin onSuccess={login} useOneTap />
        </div>

        <div className="bg-white rounded-lg p-4 mt-8 shadow-lg max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder="Search location..."
              className="w-full"
            />
            <Select>
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </Select>
            <Select>
              <option value="">All Beds</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </Select>
            <div className="flex gap-2">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-1">
                For Rent
              </Button>
              <Button variant="outline" className="flex-1">
                For Sale
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 