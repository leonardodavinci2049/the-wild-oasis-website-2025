import { getBookedDatesByCabinId } from "@/services/apiBooking";
import { getCabin } from "@/services/apiCabins";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { cabinId: string } }
) {
  try {
    const { cabinId } = params;
    const numericCabinId = Number(cabinId);
    const [cabin, bookedDates] = await Promise.all([
      getCabin(numericCabinId),
      getBookedDatesByCabinId(numericCabinId),
    ]);

    return NextResponse.json({ success: true, data: { cabin, bookedDates } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cabin data" },
      { status: 500 }
    );
  }
}

// export async function POST() {}
