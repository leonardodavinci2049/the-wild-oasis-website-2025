"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { BookingsReservationType } from "@/services/types/booking/bookingsType";
import { deleteReservation } from "@/services/actions";

function ReservationList({
  bookings,
}: {
  bookings: BookingsReservationType[];
}) {


  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }


  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
          
        />
      ))}
    </ul>
  );
}

export default ReservationList;
