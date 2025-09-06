"use client";
import { Reservation } from "@/lib/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface ReservationContextType {
  reservations: Reservation[];
  seatingFilter: "all" | "indoor" | "outdoor";
  setSeatingFilter: React.Dispatch<
    React.SetStateAction<"all" | "indoor" | "outdoor">
  >;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addReservation: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
  getAvailableSeats: (
    date: string,
    time: string,
    seatingType: string
  ) => number;
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

  const [seatingFilter, setSeatingFilter] = useState<
    "all" | "indoor" | "outdoor"
  >("all");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const addReservation = (newReservation: Reservation) => {
    setReservations((prev) => [...prev, newReservation]);
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const getAvailableSeats = (
    date: string,
    time: string,
    seatingType: string
  ): number => {
    const reservedSeats = reservations
      .filter(
        (res) =>
          res.date === date &&
          res.time === time &&
          res.seatingType === seatingType
      )
      .reduce((total, res) => total + res.guests, 0);

    return Math.max(0, MAX_SEATS_PER_HOUR - reservedSeats);
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesFilter =
      seatingFilter === "all" || r.seatingType === seatingFilter;
    const matchesSearch =
      !searchQuery || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ReservationContext.Provider
      value={{
        reservations: filteredReservations,
        seatingFilter,
        setSeatingFilter,
        setSearchQuery,
        addReservation,
        deleteReservation,
        getAvailableSeats,
      }}
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
