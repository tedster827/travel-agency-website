"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Full_User {
  address: {
    city: string;
    geo: {
      lat: string;
      long: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface Simple_User {
  id: number;
  name: string;
}

const UserList_Axios: React.FunctionComponent = () => {
  const [users, setUsers] = useState<Simple_User[]>([]);

  useEffect(() => {
    axios
      .get<Simple_User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data));
  }, []); // Note: Never forget to add this! Without this it will cause infinite renders!

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.id} | {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList_Axios;
