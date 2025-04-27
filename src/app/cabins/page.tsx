import Counter from "../../components/Counter";

const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: { id: number; name: string }[] = await res.json();

  console.log("data", data);

  return (
    <div className="flex flex-col gap-5">
      <h1>-- CABIN PAGES --</h1>

      <ol className="list-decimal *:marker:text-blue-500">
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>
      <div className="flex flex-col gap-5 mt-4 mb-5">
        <h2 className="text-2xl font-bold ">-- Counte --</h2>
        <Counter users={data} />
      </div>
    </div>
  );
};

export default page;
