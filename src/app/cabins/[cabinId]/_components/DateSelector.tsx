"use client";

import { DayPicker } from "react-day-picker";

import { SettingsType } from "@/services/types/setting/SettingsType";
import { CabinType } from "@/services/types/cabin/CabinsType";
import { useReservation } from "../../_context/ReservationContext";

// Mantida a interface pois agora estamos em um arquivo TSX
interface DateSelectorProps {
  settings: SettingsType;
  cabin?: CabinType;
  bookedDates?: Date[];
}

const DateSelector = ({ settings, cabin }: DateSelectorProps) => {
  const { range, setRange, resetRange } = useReservation();


  // CHANGE - idealmente esses valores devem vir do cabin e cálculos reais
  const regularPrice = cabin?.regularPrice || 23;
  const discount = cabin?.discount || 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range) =>
          setRange({
            from: range?.from ?? null,
            to: range?.to ?? null,
          })
        }
        selected={{
          from: range.from ?? undefined,
          to: range.to ?? undefined,
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
    
        
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

        {range.from || range.to ? (
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
