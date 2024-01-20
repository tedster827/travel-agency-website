// noinspection ES6UnusedImports

import React from "react";
import UserList_Fetch from "src/app/components/UsersPage/UserList_Fetch";
import UserList_Axios from "src/app/components/UsersPage/UserList_Axios";

const UsersPage: React.FunctionComponent = async () => {
  return (
    <>
      {/*<UserList_Fetch />*/}
      <UserList_Axios />
    </>
  );
};

export default UsersPage;
