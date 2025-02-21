import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Trash2, Info } from "lucide-react";
import { format, addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  hostId: string;
  currentUserId?: string;
  imageUrl: string;
  rating: number;
  isAvailable: boolean;
  nextAvailableDate?: Date;
}

export default function PropertyCard({
  id,
  title,
  description,
  pricePerNight,
  location,
  hostId,
  currentUserId,
  imageUrl,
  rating,
  isAvailable,
  nextAvailableDate,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isBooking, setIsBooking] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  // const isHost = currentUserId === hostId;
  const isHost = true;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Deleting property", id);
    }
  };

  // const handleBook = async () => {
  //   if (!dateRange?.from || !dateRange?.to) return;

  //   setIsBooking(true);
  //   try {
  //     // Add your booking API call here
  //     await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         propertyId: id,
  //         startDate: dateRange.from,
  //         endDate: dateRange.to,
  //         guestCount,
  //         totalPrice: calculateTotalPrice(),
  //       }),
  //     });
  //     setShowBookingDialog(false);
  //   } catch (error) {
  //     console.error("Failed to book property:", error);
  //   } finally {
  //     setIsBooking(false);
  //   }
  // };

const getDaysBetween = (start: Date | undefined, end: Date | undefined) => {
  if (!start || !end) return 0;
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

  const calculateTotalPrice = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    return pricePerNight * getDaysBetween(dateRange.from, dateRange.to);
  };

  const disabledDays = [
    { from: new Date(0, 0, 0), to: addDays(new Date(), -1) },
    { from: addDays(new Date(), 90), to: new Date(3000, 0, 0) },
  ];

  if (nextAvailableDate && !isAvailable) {
    disabledDays.push({
      from: new Date(),
      to: addDays(new Date(nextAvailableDate), -1),
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="group relative bg-card rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge
                  variant={isAvailable ? "success" : "destructive"}
                  className="text-xs font-medium"
                >
                  {isAvailable ? "Available" : "Booked"}
                </Badge>
                {rating && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {rating}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                {isHost && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{location}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {description}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold">${pricePerNight}</span>
                  <span className="text-muted-foreground text-sm"> /night</span>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 bg-primary/5 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative h-[300px] w-full mb-4">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={isAvailable ? "success" : "destructive"}>
                  {isAvailable ? "Available" : "Booked"}
                </Badge>
                {rating && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {rating}
                  </Badge>
                )}
              </div>
              <></>
              <div>
                <span className="text-xl font-bold">${pricePerNight}</span>
                <span className="text-muted-foreground"> /night</span>
              </div>
              {/* <Button
                onClick={() => setShowBookingDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Book Now
              </Button> */}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Description</h4>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {isHost && (
              <div className="flex justify-end">
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Property
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Your Stay at {title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check-in">Check-in</Label>
                <Input
                  id="check-in"
                  value={
                    dateRange?.from
                      ? format(dateRange.from, "MMM dd, yyyy")
                      : ""
                  }
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="check-out">Check-out</Label>
                <Input
                  id="check-out"
                  value={
                    dateRange?.to ? format(dateRange.to, "MMM dd, yyyy") : ""
                  }
                  readOnly
                />
              </div>
            </div>
            <div>
              <Label htmlFor="guests">Guests</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={10}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              />
            </div>
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={disabledDays}
              className="rounded-md border"
            />
            {dateRange?.from && dateRange?.to && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total nights:</span>
                  <span>{getDaysBetween(dateRange.from, dateRange.to)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total price:</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex-col items-stretch space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={() => {}}
                      disabled={!dateRange?.from || !dateRange?.to || isBooking}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isBooking ? "Booking..." : "Confirm Booking"}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Click to confirm your booking for{" "}
                    {getDaysBetween(dateRange?.from!, dateRange?.to!)} nights.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="text-center text-sm text-muted-foreground">
              <Info className="inline-block w-4 h-4 mr-1" />
              You won't be charged yet
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
