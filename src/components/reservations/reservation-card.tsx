import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Reservation } from "@/lib/types";
import { Trash2, Calendar, Clock, Users, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useReservation } from "@/context/reservation-context";

interface ReservationCardProps {
  reservation: Reservation;
}

export default function ReservationCard({
  reservation,
}: ReservationCardProps) {
  const { deleteReservation } = useReservation();

  const onDeleteReservation = (id: string) => {
    deleteReservation(id);
    toast.success("Reservation deleted successfully",{
      duration: 500
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col gap-1 py-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-bold">
            {"🍴"} Booking Under - {reservation.fullName}
          </CardTitle>

          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this reservation? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Keep Reservation</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDeleteReservation(reservation.id)}
                    className="bg-destructive  hover:bg-red-700 cursor-pointer"
                  >
                    Cancel Reservation
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{formatDate(reservation.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{reservation.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>
              {reservation.guests}{" "}
              {reservation.guests === 1 ? "guest" : "guests"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="capitalize">{reservation.seatingType}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-sm">
            <div className="mb-1">
              <strong>Booking Number:</strong> {reservation.id}
            </div>
            <div className="mb-1">
              <strong>Email:</strong> {reservation.email}
            </div>
            <div className="mb-1">
              <strong>Phone:</strong> {reservation.phoneNumber}
            </div>
            {reservation.specialRequests && (
              <div>
                <strong>Special Requests:</strong> {reservation.specialRequests}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
