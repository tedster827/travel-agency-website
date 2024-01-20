"use client";
import React from "react";
import UserService, { Simple_User } from "src/services/user-service";
import useUsers from "src/hooks/useUsers";

const UserList_Axios: React.FunctionComponent = () => {
  const { users, setUsers, error, setError, isLoading, setIsLoading } =
    useUsers();
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
