import { getBookedDatesByCabinId } from '@/services/apiBooking';
import { getSettings } from '@/services/apiSettings';
import React from 'react'
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { CabinType } from '@/services/types/cabin/CabinsType';
import { auth } from '@/services/auth';
import LoginMessage from '@/app/account/_components/LoginMessage';


const Reservation = async ({ cabin }: { cabin: CabinType }) => {
  if (typeof cabin.id !== 'number') {
    // Optionally, you can render an error or fallback UI here
    throw new Error('Invalid cabin id');
  }

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

    const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={{
            name: session.user.name ?? 'Guest',
            image: session.user.image ?? '/default-avatar.png',
          }}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation