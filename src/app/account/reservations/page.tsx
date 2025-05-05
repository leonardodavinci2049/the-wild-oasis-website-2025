import { BookingsReservationType } from "@/services/types/booking/bookinsType";
import ReservationCard from "./_components/ReservationCard";
import Link from "next/link";

const page = () => {
  // CHANGE
  const bookings: BookingsReservationType[] = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default page;
