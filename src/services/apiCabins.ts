import { notFound } from "next/navigation";

import { supabase } from "./supabase";

/////////////
// GET

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase.from("cabins").select("*");



/*   const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");
  console.log('datacabins : ',data); */
  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};


export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}



