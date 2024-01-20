"use client";
import React, { useEffect, useState } from "react";
import UserService, { Simple_User } from "src/services/user-service";
import { CanceledError } from "src/services/api-client";

const UserList_Axios: React.FunctionComponent = () => {
  const [users, setUsers] = useState<Simple_User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Note: Whenever using a fetch operation for a web request always include a cleanup function so that the fetch
  //  can be cancelled! Use AbortController a Browser API for modern browsers! It is used to cancel or abort
  //  asynchronous, or any long, operations. This also prevents calling the server twice!
  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = UserService.getAll<Simple_User>();
    request
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
    // The finally method is for when the promise above has been resolved regardless if it resulted in error or not.
    // .finally(() => {
    //   setIsLoading(false);
    // });
    return () => cancel();
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
    const { request } = UserService.delete(user.id);
    request.catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  // Note: This is using an optimistic updated method, update UI first even if there may be an error. However, it
  //  will revert the UI if an error is returned.
  const createUser = () => {
    setIsLoading(true);
    const originalUsers: Simple_User[] = [...users];
    const newUser: Simple_User = { id: 0, name: "Tedster" };
    setUsers([...users, newUser]);

    const { request } = UserService.create(newUser);

    request
      // This form of destructing is adding a reference to data to be referred to as savedUser
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
        setIsLoading(false);
      });
  };

  // Note: This is using an optimistic updated method, update UI first even if there may be an error. However, it
  //  will revert the UI if an error is returned.
  const updateUser = (user: Simple_User) => {
    setIsLoading(true);
    const originalUsers: Simple_User[] = [...users];
    const updatedUser: Simple_User = {
      ...user,
      name: user.name + "! - Edited",
    };
    setUsers(
      users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      }),
    );

    const { request } = UserService.update(updatedUser);

    request
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        {isLoading && (
          <span className={"loading loading-spinner text-info"}></span>
        )}
        <button className={"btn btn-primary mb-3"} onClick={createUser}>
          Add User
        </button>
        <div className={"overflow-x-auto"}>
          <table className={"table table-xs table-pin-rows table-pin-cols"}>
            <thead>
              <tr>
                <th></th>
                <td>Name</td>
                <td>Actions</td>
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
                    <td>
                      <div className={"m-1"}>
                        <button
                          className={"btn btn-outline-secondary mx-1"}
                          onClick={() => {
                            updateUser(user);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => deleteUser(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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
