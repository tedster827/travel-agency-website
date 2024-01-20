import createHTTPService from "src/services/http-service";
// Note: This is only defined for later development
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

export default createHTTPService("/users/");
