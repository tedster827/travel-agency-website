import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList_Fetch: React.FunctionComponent = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    // Passing Options Object
    { cache: "no-store" }, // Disable Caching for frequently changing data or data that must be updated in
    // realtime. This will change this to a dynamic server-rendered on demand using Node.js component
    // Accessing Next.JS Config - Get Fresh Data Every 10 seconds
    // This will keep this a static pre-rendered component
    // { next: { revalidate: 10 } }
  );
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>Last Rendered Time: {new Date().toLocaleString()}</p>
      <table className={"table table-ordered"}>
        {/*Table header*/}
        <thead>
          {/*Table Row*/}
          <tr>
            {/*Table Header Names*/}
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList_Fetch;
