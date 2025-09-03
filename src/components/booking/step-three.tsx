"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  bookingStepThreeSchema,
  type BookingStepThree,
  type BookingStepOne,
  type BookingStepTwo,
  type Reservation,
} from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useReservation } from "@/context/reservation-context";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import ReservationDialog from "../reservations/reservation-dialog";

interface BookingStepThreeProps {
  onBack: () => void;
  initialData?: BookingStepThree | null;
  bookingData: BookingStepOne & BookingStepTwo;
}

export default function BookingStepThree({
  onBack,
  initialData,
  bookingData,
}: BookingStepThreeProps) {
  const router = useRouter();

  const { addReservation } = useReservation();
  const [isComplete, setIsComplete] = useState(false);
  const [bookNumber, setBookNumber] = useState<string | null>(null);

  const form = useForm<BookingStepThree>({
    resolver: zodResolver(bookingStepThreeSchema),
    defaultValues: initialData || {
      fullName: "",
      email: "",
      phoneNumber: "",
      specialRequests: "",
    },
  });

  const onSubmit = (data: BookingStepThree) => {
    const reservation: Reservation = {
      id: `res_${Date.now()}_${Math.random().toString(36)}`,
      ...bookingData,
      ...data,
      createdAt: new Date().toISOString(),
    };

    alert(JSON.stringify(reservation, null, 2));

    addReservation(reservation);

    setIsComplete(true);
    setBookNumber(reservation.id);
  };

  const onCompleteClose = () => {
    setIsComplete(false);
    toast.success("Reservation created successfully");
    setBookNumber(null);
    setTimeout(() => {
      router.push("/reservations");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reservation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{formatDate(bookingData.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seating:</span>
            <span className="font-medium capitalize">
              {bookingData.seatingType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests:</span>
            <span className="font-medium">
              {bookingData.guests}{" "}
              {bookingData.guests === 1 ? "person" : "people"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any dietary restrictions, special occasions, or other requests..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 bg-transparent"
            >
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Reservation
            </Button>
          </div>
        </form>
      </Form>

      <ReservationDialog
        isOpenDialog={isComplete}
        onClose={onCompleteClose}
        bookingNumber={bookNumber}
      />
    </div>
  );
}
