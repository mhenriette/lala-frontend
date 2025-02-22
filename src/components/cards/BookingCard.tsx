import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmBooking, rejectBooking } from "@/utils/bookings";

interface BookingCardProps {
  name: string;
  status: string;
  bookingId: string;
  isHost: boolean;
  id: string;
}

export default function BookingCard({
  name = "New Booking",
  status = "pending",
  isHost,
  id,
}: BookingCardProps) {
  const queryClient = useQueryClient();
  const confirmMutation = useMutation({
    mutationKey: ["confirm-booking"],
    mutationFn: confirmBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-properties"] });
    },
  });
  const rejectMutation = useMutation({
    mutationKey: ["reject-booking"],
    mutationFn: rejectBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-properties"] });
    },
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
      case "cancelled":
        return "bg-red-500/15 text-red-600 hover:bg-red-500/25";
      case "rejected":
        return "bg-destructive/15 text-destructive hover:bg-destructive/25";
      case "pending":
        return "bg-orange-500/15 text-orange-600 hover:bg-orange-500/25";
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
  };

  const handleConfirm = () => {
    confirmMutation.mutate(id);
  };

  const handleReject = () => {
    rejectMutation.mutate(id);
  };

  console.log(status, "==== status");

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
            disabled={rejectMutation.isPending || confirmMutation.isPending}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            {rejectMutation.isPending ? (
              "Rejecting..."
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Reject
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={rejectMutation.isPending || confirmMutation.isPending}
          >
            {confirmMutation.isPending ? (
              "Confirming..."
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
