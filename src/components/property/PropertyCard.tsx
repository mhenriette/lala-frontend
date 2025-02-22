import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Trash2, CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "@/utils/properties";
import { useRouter } from "next/router";
import { bookProperty } from "@/utils/bookings";

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
  imageUrl,
  rating,
  isAvailable,
  nextAvailableDate,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["delete-property"],
    mutationFn: () => {
      return deleteProperty(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-properties"] });
      router.push("/hosts/properties");
    },
  });

  const bookingMutation = useMutation({
    mutationKey: ["book-property"],
    mutationFn: ({
      from,
      to,
      propertyId,
    }: {
      from: Date;
      to: Date;
      propertyId: string;
    }) => {
      return bookProperty({ from, to, propertyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-properties"] });
    }
  });

  const isHost = userData?.role === "HOST";

  const [date, setDate] = useState<DateRange>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 8),
  });
  const handleBooking = (e: SubmitEvent) => {
    e.preventDefault();
    if (!date.from || !date.to) return;
    bookingMutation.mutate({ from: date.from, to: date.to, propertyId: id });
  };

  // const isHost = currentUserId === hostId;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Deleting property", id);
      deleteMutation.mutate();
    }
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
            {!isHost ? (
              <form onSubmit={handleBooking} className="grid gap-4 py-4">
                <div>
                  <h2 className="font-bold mb-0">Book Your Stay</h2>
                  <h3>
                    Select your check-in and check-out dates to book this
                    property.
                  </h3>
                </div>

                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick your dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        required
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={{ before: new Date() }}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={bookingMutation.isPending}
                >
                  {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
                </Button>
              </form>
            ) : null}
            {isHost && (
              <div className="flex justify-end gap-2">
                <Button variant={"ghost"} asChild>
                  <Link href={`/hosts/properties/edit/${id}`}>
                    Edit Property
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Property
                    </>
                  )}
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
