"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {XIcon} from "lucide-react";
import { useReservation } from "@/context/reservation-context";

const formSchema = z.object({
  id: z.string().min(1, {
    message: "Booking number is required",
  }),
});

export default function ReservationSearch() {
  const {setSearchQuery} = useReservation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSearchQuery(values.id)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2  mt-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">
                Search by number booking
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Enter your booking number" {...field} />
                  {field.value && (
                    <button
                      type="button"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-gray-900 cursor-pointer"
                      onClick={() =>{
                        form.resetField('id')
                        setSearchQuery('')
                      }}
                    >
                      <XIcon className="h-4 w-4"/>
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">Search</Button>
      </form>
    </Form>
  );
}
