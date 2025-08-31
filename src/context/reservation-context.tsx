"use client";
import { Reservation } from "@/lib/types";
import React, { createContext, useState, useContext, ReactNode } from "react";


export interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  getAvailableSeats: (date: string, time: string, seatingType: string) => number;
}

const MAX_SEATS_PER_HOUR = 20;
const DUMMY_RESERVATIONS: Reservation[] = [];

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reservations, setReservations] =
    useState<Reservation[]>(DUMMY_RESERVATIONS);

  const addReservation = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation]);
  };

  const getAvailableSeats = (date: string, time: string , seatingType: string): number => {
    const reservedSeats = reservations
      .filter((res) => res.date === date && res.time === time && res.seatingType === seatingType)
      .reduce((total, res) => total + res.guests, 0);

    return Math.max(0, MAX_SEATS_PER_HOUR - reservedSeats);
  };

  return (
    <ReservationContext.Provider
      value={{ reservations, addReservation, getAvailableSeats }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};
