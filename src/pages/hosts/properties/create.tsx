import { useState } from "react"
import { useRouter } from "next/router"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Building2, DollarSign, MapPin, FileText } from "lucide-react"
import { createProperty } from "@/utils/properties"
import HostLayout from "@/components/layout/HostLayout"

interface PropertyFormData {
  title: string
  description: string
  pricePerNight: number
  location: string
  hostId: string
}

export default function CreateProperty() {
  const router = useRouter()
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    pricePerNight: 0,
    location: "",
    hostId: "" 
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      title: formData.title,
      description: formData.description,
      pricePerNight: formData.pricePerNight,
      location: formData.location,
    };

    try {

      await createProperty(data);
        router.push("/hosts/properties") // Redirect to properties list
    } catch (error) {
      console.error("Failed to create property:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "pricePerNight" ? parseFloat(value) : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-blue-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Property</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Share your space with travelers and earn extra income
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="flex items-center text-lg font-medium text-gray-700">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                Property Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Luxury Beachfront Villa"
                required
                className="text-lg"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center text-lg font-medium text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property's unique features, amenities, and atmosphere..."
                required
                className="min-h-[200px] text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Price Input */}
              <div className="space-y-2">
                <label htmlFor="pricePerNight" className="flex items-center text-lg font-medium text-gray-700">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Price per Night
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="pricePerNight"
                    name="pricePerNight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="pl-8 text-lg"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label htmlFor="location" className="flex items-center text-lg font-medium text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Miami Beach, FL"
                  required
                  className="text-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white mt-8 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Creating your listing..." : "Create Property Listing"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 


CreateProperty.getLayout = function getLayout(page) {
  return <HostLayout>{page}</HostLayout>;
};