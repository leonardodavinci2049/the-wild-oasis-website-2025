import Link from "next/link";

export default function Home() {
  return (
    <div className="">
         <h1 className="text-3xl font-bold">The Wild Oasis. Welcome to paradise.</h1>

      <Link className="text-blue-500 underline font-bold" href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
