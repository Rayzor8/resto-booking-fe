import { z } from "zod";

// Reservation schemas
export const bookingStepOneSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  seatingType: z.enum(["indoor", "outdoor"]),
});

export const bookingStepTwoSchema = z.object({
  time: z.string().min(1, "Please select a time"),
  guests: z
    .number()
    .min(1, "At least 1 guest required")
    .max(12, "Maximum 12 guests allowed"),
});

export const bookingStepThreeSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  specialRequests: z.string().optional(),
});

export const completeBookingSchema = bookingStepOneSchema
  .extend(bookingStepTwoSchema.shape)
  .extend(bookingStepThreeSchema.shape);

export type BookingStepOne = z.infer<typeof bookingStepOneSchema>;
export type BookingStepTwo = z.infer<typeof bookingStepTwoSchema>;
export type BookingStepThree = z.infer<typeof bookingStepThreeSchema>;
export type CompleteBooking = z.infer<typeof completeBookingSchema>;

export interface Reservation extends CompleteBooking {
  id: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

// Menu item schema
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(["antipasti", "primi", "secondi", "dolci", "bevande"]),
  image: z.string().optional(),
  isVegetarian: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
});

export type MenuItem = z.infer<typeof menuItemSchema>;
