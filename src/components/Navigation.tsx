import Link from "next/link";

export default function Navigation() {
  return (
    <ul className="flex gap-5 list-none mt-4 mb-5">
      <li className="text-blue-500 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
        <Link href="/">Home</Link>
      </li>
      <li className="text-blue-500 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
        <Link href="/cabins">Cabins</Link>
      </li>

      <li className="text-blue-500 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
        <Link href="/about">About</Link>
      </li>
      <li className="text-blue-500 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
        <Link href="/account">Your account</Link>
      </li>
    </ul>
  );
}
