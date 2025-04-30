import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Image
        src="/images/bg.png"
        fill
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." // exemplo, use seu próprio base64
        quality={80}
        className="object-cover object-top fixed inset-0 -z-10"
        alt="Mountains and forests with two cabins"
      />

      <main className="mt-24 min-h-screen">
        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    </>
  );
}
