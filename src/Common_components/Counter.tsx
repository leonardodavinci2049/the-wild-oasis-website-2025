"use client";

import { useState } from "react";

type CounterProps = {
  users: any[]; // Replace 'any' with a more specific type if possible, e.g., 'User[]'
};

export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
