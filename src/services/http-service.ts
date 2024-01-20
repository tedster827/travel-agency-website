import apiClient from "src/services/api-client";

interface Entity {
  id: number;
}

// OOP: Abstraction
class HTTPService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Note: Whenever using a fetch operation for a web request always include a cleanup function so that the fetch
  //  can be cancelled! Use AbortController a Browser API for modern browsers! It is used to cancel or abort
  //  asynchronous, or any long, operations. This also prevents calling the server twice!
  // <T> is the generic type argument for any object
  getAll<T>() {
    const controller: AbortController = new AbortController();
    // GET --Returns--> Promise --Returns If Resolved--> Response !--Return If Error--> Error
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    const request = apiClient.delete(this.endpoint + "/" + id);
    return { request };
  }

  create<T>(entity: T) {
    const request = apiClient.post(this.endpoint, entity);
    return { request };
  }

  // The "extends" key word means in this case that the generic T type will also include the interface Entity
  // that is defined in this file.
  update<T extends Entity>(entity: T) {
    const request = apiClient.patch(this.endpoint + "/" + entity.id, entity);

    return { request };
  }
}

const createHTTPService = (endpoint: string) => new HTTPService(endpoint);

export default createHTTPService;
