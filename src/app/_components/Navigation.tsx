import { auth } from "@/services/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  //  console.log("session", session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                // Important to display google profile images
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                width={32}
                height={32}
                unoptimized
              />

              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
               className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              
              <Image
                className="h-8 rounded-full"
                src="/default-avatar.png"
                alt="User avatar"
                referrerPolicy="no-referrer"
                width={32}
                height={32}
              />
              <span> Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
