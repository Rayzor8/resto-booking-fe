"use client";

import { useState } from "react";
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
import {
  bookingStepTwoSchema,
  type BookingStepTwo,
  type BookingStepOne,
} from "@/lib/types";
import { formatDate, isPastForToday, isToday } from "@/lib/utils";
import { useReservation } from "@/context/reservation-context";
import { Badge } from "../ui/badge";


interface BookingStepTwoProps {
  onComplete: (data: BookingStepTwo) => void;
  onBack: () => void;
  dateData: BookingStepOne;
}
export default function BookingStepTwo({
  onComplete,
  onBack,
  dateData,
}: BookingStepTwoProps) {
  const [timeSlot, setTimeSlot] = useState<string>("");
  const { getAvailableSeats } = useReservation();

  const timeSlots = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  const form = useForm<BookingStepTwo>({
    resolver: zodResolver(bookingStepTwoSchema),
    defaultValues: {
      time: "",
      guests: 1,
    },
  });

  const onSubmit = (data: BookingStepTwo) => {
    alert(JSON.stringify(data, null, 2));
    onComplete(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Your Selection</h3>
        <p className="text-sm text-muted-foreground">
          {formatDate(dateData.date)} •{" "}
          {dateData.seatingType === "indoor" ? "Indoor" : "Outdoor"} seating
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Times</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => {
                    const isSelected = field.value === time;
                    const disabledByPast =
                      isToday(dateData.date) && isPastForToday(time);

                    return (
                      <Button
                        key={time}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className="flex flex-col gap-1 h-14 cursor-pointer"
                        onClick={() => {
                          field.onChange(time);
                          setTimeSlot(time);
                        }}
                        disabled={
                          !getAvailableSeats(
                            dateData.date,
                            time,
                            dateData.seatingType
                          ) || disabledByPast
                        }
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span>{time}</span>
                          <Badge
                            variant={isSelected ? "outline" : "default"}
                            className="text-white"
                          >
                            {getAvailableSeats(
                              dateData.date,
                              time,
                              dateData.seatingType
                            )}{" "}
                            Seats left {disabledByPast && "(Passed)"}
                          </Badge>
                        </div>
                      </Button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Guests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    max={getAvailableSeats(
                      dateData.date,
                      timeSlot,
                      dateData.seatingType
                    )}
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
              Continue to Details
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
