import { getCabin, getCabins } from "@/services/apiCabins";

import React, { Suspense } from "react";
import Cabin from "./_components/Cabin";
import Spinner from "@/Common_components/Spinner";
import Reservation from "./_components/Reservation";
import ReservationContextProvider from "../_context/ReservationContext";


export async function generateMetadata({ params }: {  params: Promise<{ cabinId: string }>;}) {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

const page = async ({ params }: { params: { cabinId: string } }) => {
  // Await params antes de acessar suas propriedades
  const resolvedParams = await Promise.resolve(params);
  const cabinId = Number(resolvedParams.cabinId);

  // Agora podemos usar o cabinId com segurança
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <ReservationContextProvider>
            <Reservation cabin={cabin} />
          </ReservationContextProvider>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
