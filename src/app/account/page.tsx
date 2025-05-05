import { auth } from "@/services/auth";

export const metadata = {
  title: "Guest area",
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const page = async () => {
  const session = await auth();
  const firstName =
    session?.user?.name?.split(" ").at(0) ?? "Guest";

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
};

export default page;
