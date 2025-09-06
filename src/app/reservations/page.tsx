"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReservation } from "@/context/reservation-context";
import ReservationCard from "@/components/reservations/reservation-card";
import { Label } from "@/components/ui/label";
import ReservationSearch from "@/components/reservations/reservation-search";


export default function ReservationsPage() {
  const { reservations,seatingFilter,setSeatingFilter} = useReservation();

  const buttonsFilter  = ["all", "indoor", "outdoor"] as const;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Reservations
          </h1>
          <p className="text-muted-foreground">
            Manage your dining reservations at Bella Vista
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="col-span-1">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {reservations.length}
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {seatingFilter} Reservations
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2  p-4">
            <div>
              <Label>Filters by</Label>
              <div className="grid grid-cols-3 mt-1 gap-2">
                {buttonsFilter.map((filter,index) => (
                  <Button
                    key={index}
                    variant={filter === seatingFilter ? "default" : "outline"}
                    onClick={() => setSeatingFilter(filter )}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <ReservationSearch />
            </div>
          </Card>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">
                No Reservations Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                You haven&apos;t made any reservations yet. Book your first
                table to get started!
              </p>
              <Button asChild>
                <a href="/book">Book a Table</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
