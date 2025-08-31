"use client";

import { useReservation } from "@/context/reservation-context";
import React from "react";

export default function Reservations() {
  const { reservations } = useReservation();
  console.log(reservations);
  return <div>{JSON.stringify(reservations, null, 2)}</div>;
}
