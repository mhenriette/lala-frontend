import Image from "next/image"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  title: string
  location: string
  price: number
  beds: number
  baths: number
  area: number
  type: "sale" | "rent"
  image: string
  className?: string
}

export const PropertyCard = ({
  title,
  location,
  price,
  beds,
  baths,
  area,
  type,
  image,
  className,
}: PropertyCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-md", className)}>
      <div className="relative h-64">
        <Image 
          src={image}
          alt={title}
          fill 
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm">
          For {type === "sale" ? "Sale" : "Rent"}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${price.toLocaleString()}</span>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{beds} beds</span>
            <span>{baths} baths</span>
            <span>{area} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  )
} 