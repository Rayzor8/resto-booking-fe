"use client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CopyCheck } from "lucide-react";
export default function ReservationDialog({
  isOpenDialog,
  onClose,
  bookingNumber,
}: {
  isOpenDialog: boolean;
  onClose: () => void;
  bookingNumber: string | null;
}) {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard", {
        duration: 500,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  };
  return (
    <Dialog open={isOpenDialog} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Your Booking is created successfully</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <span className="font-bold">Booking Number:</span>
          <span className="flex items-center gap-2">
            <b className=" bg-primary text-white px-2 text-lg">
              {bookingNumber}
            </b>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => copy(bookingNumber!)}
            >
              <CopyCheck />
            </Button>
          </span>
        </DialogDescription>

        <DialogFooter>
          <Button onClick={onClose}> Go to Reservations</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
