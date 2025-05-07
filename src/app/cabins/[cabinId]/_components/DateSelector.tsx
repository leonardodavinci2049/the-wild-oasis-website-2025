"use client";


import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";


import { SettingsType } from "@/services/types/setting/SettingsType";
import { CabinReservationType } from "@/services/types/cabin/CabinsType";
import { useReservationContext } from "../../_context/ReservationContext";

// Mantida a interface pois agora estamos em um arquivo TSX
interface DateSelectorProps {
  settings: SettingsType;
  cabin: CabinReservationType;
  bookedDates: Date[];
}

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  if (!range || !range.from || !range.to) return false;

  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}


const DateSelector = ({ settings, cabin, bookedDates }: DateSelectorProps) => {
  const { range, setRange, resetRange } = useReservationContext();

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { to: undefined, from: undefined }
    : range;

  const { regularPrice = 23, discount = 23 } = cabin;
  const numNights = differenceInDays(
    displayRange?.to || "",
    displayRange?.from || ""
  );
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;



return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

       {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DateSelector;
