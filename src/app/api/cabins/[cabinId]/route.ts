import { getBookedDatesByCabinId } from "@/services/apiBooking";
import { getCabin } from "@/services/apiCabins";


export async function GET(request: Request, { params }: { params: { cabinId: string } }) {
  const { cabinId } = params;

  try {
    const numericCabinId = Number(cabinId);
    const [cabin, bookedDates] = await Promise.all([
      getCabin(numericCabinId),
      getBookedDatesByCabinId(numericCabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
