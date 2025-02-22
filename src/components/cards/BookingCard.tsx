import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

interface BookingCardProps {
  name: string
  status: string;
  bookingId: string;
  isHost: boolean;
}

export default function BookingCard({ name = "New Booking", status = "pending", isHost }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/15 text-green-600 hover:bg-green-500/25"
      case "cancelled":
        return "bg-red-500/15 text-red-600 hover:bg-red-500/25"
      case "rejected":
        return "bg-destructive/15 text-destructive hover:bg-destructive/25"
      case "pending":
        return "bg-orange-500/15 text-orange-600 hover:bg-orange-500/25"
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }
  }


  

  const handleConfirm = () => {

  }

  const handleReject = () => {

  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex items-center justify-between p-6">
        <h3 className="text-lg font-medium">{name}</h3>
        <Badge variant="secondary" className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardContent>
      {status === "pending" && isHost && (
        <CardFooter className="flex justify-end gap-2 px-6 pb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            <Check className="mr-2 h-4 w-4" />
            Confirm
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

