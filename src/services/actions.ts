"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import type { BookingDataType, InsertBookingType } from "./types/booking/bookingsType";
import { getBookings } from "./apiBooking";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const nationalityValue = formData.get("nationality");
  if (!nationalityValue) throw new Error("Nationality is required");
  if (typeof nationalityValue !== "string")
    throw new Error("Invalid nationality value");
  const [nationality, countryFlag] = nationalityValue.split("%");

  if (typeof nationalID !== "string" || !/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: InsertBookingType,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: (() => {
      const obs = formData.get("observations");
      return typeof obs === "string" ? obs.slice(0, 1000) : null;
    })(),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestId = Number(session.user.guestId);
  if (!guestId || isNaN(guestId)) {
    throw new Error("Invalid guest ID");
  }
  const guestBookings = await getBookings(guestId.toString());
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestId = Number(session.user.guestId);
  if (!guestId || isNaN(guestId)) {
    throw new Error("Invalid guest ID");
  }
  const guestBookings = await getBookings(guestId.toString());
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: (() => {
      const obs = formData.get("observations");
      return typeof obs === "string" ? obs.slice(0, 1000) : null;
    })(),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}


export async function updateReservation(formData: FormData) {
  const observations = formData.get("observations");
  const numGuests = formData.get("numGuests");
  const bookingId = formData.get("bookingId");

  if (!observations || !numGuests || !bookingId)
    throw new Error("observation and numGuests are required");

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // checking reservation ownership
  const guestBookings = await getBookings(String(session?.user?.guestId));
  const guestBookingsIds = guestBookings.map((booking) => String(booking.id));

  if (!guestBookingsIds.includes(String(bookingId)))
    throw new Error("Booking could not be updated");

  const { error } = await supabase
    .from("bookings")
    .update({ observations: observations.slice(0, 1000), numGuests })
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function createReservation(
  bookingData: BookingDataType,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // for big formData objects
  // Object.entries(formData.entries());

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuest")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData?.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // checking reservation ownership for protected actions
  const guestBookings = await getBookings(String(session?.user?.guestId));
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(Number(bookingId)))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}




export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
