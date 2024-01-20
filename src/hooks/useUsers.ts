"use client";
import { useEffect, useState } from "react";
import UserService, { Simple_User } from "src/services/user-service";
import { CanceledError } from "src/services/api-client";

const useUsers = () => {
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

  return {
    users,
    setUsers,
    error,
    setError,
    isLoading,
    setIsLoading,
  };
};

export default useUsers;
