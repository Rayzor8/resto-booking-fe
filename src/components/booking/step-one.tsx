"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookingStepOneSchema, type BookingStepOne } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookingStepOneProps {
  onComplete: (data: BookingStepOne) => void;
  initialData?: BookingStepOne | null;
}

export default function BookingStepOne({
  onComplete,
}: BookingStepOneProps) {
  const form = useForm<BookingStepOne>({
    resolver: zodResolver(bookingStepOneSchema),
    defaultValues: {
      date: "",
      seatingType: undefined,
    },
  });


  const onSubmit = (data: BookingStepOne) => {
    onComplete(data);
    alert(JSON.stringify(data, null, 2));  
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Date</FormLabel>
              <FormControl>
                <Input type="date" min={today} {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seatingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seating Preference</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    field.value === "indoor"
                      ? "ring-2 ring-primary bg-primary/5"
                      : ""
                  )}
                  onClick={() => {
                    field.onChange("indoor");
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">🏛️</div>
                    <h3 className="font-semibold">Indoor</h3>
                    <p className="text-sm text-muted-foreground">
                      Elegant interior dining
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    field.value === "outdoor"
                      ? "ring-2 ring-primary bg-primary/5"
                      : ""
                  )}
                  onClick={() => {
                    field.onChange("outdoor");
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">🌿</div>
                    <h3 className="font-semibold">Outdoor</h3>
                    <p className="text-sm text-muted-foreground">
                      Garden terrace dining
                    </p>
                  </CardContent>
                </Card>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Continue to Time Selection
        </Button>
      </form>
    </Form>
  );
}
