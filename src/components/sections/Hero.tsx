import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
]

export const Hero = () => {
  const [date, setDate] = useState<Date>()
  const [selectedCity, setSelectedCity] = useState("")

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/hero.avif')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Your Dream Property
        </h1>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Discover the perfect property that matches your lifestyle. Browse through our extensive collection of premium listings.
        </p>

        {/* Search and Filters */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Input 
                placeholder="Search properties..." 
                className="w-full pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* City Filter */}
            <div className="md:col-span-3">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="w-full min-w-[200px] bg-white z-[100] border-none">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="cursor-pointer hover:bg-gray-100">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker */}
            <div className="md:col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full min-w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Search
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-gray-600">Popular:</span>
            {["Apartments", "Houses", "Villas", "Offices", "Land"].map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 