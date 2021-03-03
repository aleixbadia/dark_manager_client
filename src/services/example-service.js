import axios from "axios";

// THIS IS AN EXAMPLE THAT YOU CAN USE
// TO CREATE A SERVICE FOR YOUR AXIOS CALLS

class ExampleService {
  constructor() {
    // this.api  is a reusable axios request base containing the base url (baseURL)
    // of the API and the Headers options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getAll = () => {
    const pr = this.api.get("/example");

    return pr;
  };

  getOne = (id) => {
    const pr = this.api.get(`/example/${id}`);

    return pr;
  };

  create = (data) => {
    const pr = this.api.post(`/example/${id}`, data);

    return pr;
  };

  deleteOne = (id) => {
    const pr = this.api.delete(`/example/${id}`);

    return pr;
  };
}

// Create instance (object) containing all axios calls as methods
const exampleService = new ExampleService();

export default exampleService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
