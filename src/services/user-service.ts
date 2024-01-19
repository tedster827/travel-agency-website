import apiClient from "src/services/api-client";
export interface Full_User {
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

export interface Simple_User {
  id: number;
  name: string;
}

// OOP: Abstraction
class UserService {
  // Note: Whenever using a fetch operation for a web request always include a cleanup function so that the fetch
  //  can be cancelled! Use AbortController a Browser API for modern browsers! It is used to cancel or abort
  //  asynchronous, or any long, operations. This also prevents calling the server twice!
  getAllUsers() {
    const controller: AbortController = new AbortController();
    // GET --Returns--> Promise --Returns If Resolved--> Response !--Return If Error--> Error
    const request = apiClient.get<Simple_User[]>("/users/", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  deleteSingleUser(user: Simple_User) {
    const request = apiClient.delete("/users/" + user.id);

    return { request };
  }

  addSingleUser(newUser: Simple_User) {
    const request = apiClient.post("/users/", newUser);

    return { request };
  }

  updateSingleUser(updatedUser: Simple_User) {
    const request = apiClient.patch("/users/" + updatedUser.id, updatedUser);

    return { request };
  }
}

export default new UserService();
