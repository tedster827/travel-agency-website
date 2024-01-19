"use client";
import axios, { AxiosError, CanceledError } from "axios";
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
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Note: Whenever using a fetch operation for a web request always include a cleanup function so that the fetch
  //  can be cancelled! Use AbortController a Browser API for modern browsers! It is used to cancel or abort
  //  asynchronous, or any long, operations. This also prevents calling the server twice!
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      // GET --Returns--> Promoise --Returns If Resolved--> Response !--Return If Error--> Error
      .get<Simple_User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // If the message is because of an abortion, then do not update the error state variable.
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });
    // finally method is for when the promise above has been resolved regardless if it resulted in error or not.
    // .finally(() => {
    //   setIsLoading(false);
    // });
    return () => {
      controller.abort();
    };
  }, []); // Note: Never forget to add this! Without this it will cause infinite renders!

  // Web Call with await and async
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get<Simple_User[]>(
  //         "https://jsonplaceholder.typicode.com/users",
  //       );
  //       setUsers(response.data);
  //     } catch (error) {
  //       // Note: Type annotation is not allowed in catch clause you must wrap your data in parenthesis and then tell
  //       //  the Typescript compiler what object the data is.
  //       setError((error as AxiosError).message);
  //     }
  //   };
  //
  //   fetchUsers();
  // }, []); // Note: Never forget to add this! Without this it will cause infinite renders!

  // Note: We're using an optimistic approach where we're hoping that the server will not return an error and we're
  //  going to immediately going to update the UI, even if there could be an error.
  const deleteUser = (user: Simple_User) => {
    // Saving the original users for UI changes on error
    const originalUsers = [...users];
    // Updating the UI first!
    setUsers(
      users.filter((savedUser) => {
        if (user.name !== savedUser.name) {
          return user;
        }
      }),
    );
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div>
      <div>
        {isLoading && (
          <span className={"loading loading-spinner text-info"}></span>
        )}
        <div className={"overflow-x-auto"}>
          <table className={"table table-xs table-pin-rows table-pin-cols"}>
            <thead>
              <tr>
                <th></th>
                <td>Name</td>
                <td>Action</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    {/*Note: Whitespace is needed because JSX will remove all the whitespace in this markup outside of the
                   elements*/}
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {error && (
        <div>
          <h1 className={"text-rose-500"}>An Error Occurred!</h1>
          <h2>Details:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UserList_Axios;
