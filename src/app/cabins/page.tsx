import { Suspense } from "react";
import CabinList from "./_components/CabinList";
import Spinner from "@/Common_components/Spinner";
import Filter from "./_components/Filter";
import ReservationReminder from "./_components/ReservationReminder";
import { ReservationProvider } from "./_context/ReservationContext";

export const metadata = {
  title: "cabins",
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

interface PageProps {
  searchParams?: {
    capacity?: string;
    [key: string]: string | undefined;
  };
}

const allowedFilters = ["all", "small", "medium", "large"] as const;
type FilterType = (typeof allowedFilters)[number];

const page = async ({ searchParams }: PageProps) => {
  const params = await Promise.resolve(searchParams);

  const rawFilter = params?.capacity;
  const filter: FilterType = allowedFilters.includes(rawFilter as FilterType)
    ? (rawFilter as FilterType)
    : "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <ReservationProvider>
          <CabinList filter={filter} />
          <ReservationReminder />
        </ReservationProvider>
      </Suspense>
    </div>
  );
};

export default page;
