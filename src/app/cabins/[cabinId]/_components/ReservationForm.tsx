"use client";

import { User } from "next-auth";

import { CabinType } from "@/services/types/cabin/CabinsType";
import { useReservationContext } from "../../_context/ReservationContext";
import SubmitButton from "@/app/account/profile/_components/SubmitButton";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/services/actions";
import Image from "next/image";

interface ReservationFormProps {
  cabin: CabinType;
  user: User;
}

const ReservationForm = ({ cabin, user }: ReservationFormProps) => {
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { range, resetRange } = useReservationContext();
  const startDate = range?.from || "";
  const endDate = range?.to || "";

  const numNights = differenceInDays(+endDate, +startDate);
  const cabinPrice = +numNights * (+(regularPrice ?? 0) - +(discount ?? 0));

  if (typeof id !== "number") {
    throw new Error("Cabin ID is required and must be a number.");
  }
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  // storing bookingData and bind it into createReservation action instead of making hidden inputs
  const createReservationWithBookingData = createReservation.bind(
    null,
    bookingData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user?.image || ""}
            alt={user?.name || ""}
            width={32}
            height={32}
            unoptimized
          />

          <p>{user?.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await createReservationWithBookingData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity ?? 1 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
};
export default ReservationForm;
