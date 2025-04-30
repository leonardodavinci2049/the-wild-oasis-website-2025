"use client";

import { useState } from "react";

interface CounterProps {
  users: { id: number; name: string }[]; // Adjust the shape of the user object as needed
}

export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-4 mb-5 flex flex-col gap-5">
      <p>There are <span className="text-4xl font-bold">{users.length} </span>users</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => setCount((c) => c + 1)}
      >
        {count}
      </button>
    </div>
  );
}
