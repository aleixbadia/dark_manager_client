import axios from "axios";

class UserService {
  constructor() {
    this.userApi = axios.create({
      baseURL: "http://localhost:5000/api/users",
      withCredentials: true,
    });
  }

  createUser(
    role,
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    city,
    postCode,
    profilePic
  ) {
    const pr = this.userApi
      .post("/create", {
        role,
        firstName,
        lastName,
        email,
        password,
        phone,
        street,
        city,
        postCode,
        profilePic,
      })
      .then((response) => response.data)
      .catch((err) => console.log("user-service - createUser error => ", err));
    return pr;
  }

  getAllUsers() {
    const pr = this.userApi
      .get("/")
      .then((response) => response.data)
      .catch((err) => console.log("user-service - getAllUsers error => ", err));
    return pr;
  }

  getUserById(id) {
    const pr = this.userApi
      .get(`/:${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("user-service - getUserById error => ", err));
    return pr;
  }

  updateUser(
    id,
    firstName,
    lastName,
    phone,
    street,
    city,
    postCode,
    profilePic
  ) {
    const pr = this.userApi
      .post(`/update/:${id}`, {
        firstName,
        lastName,
        phone,
        street,
        city,
        postCode,
        profilePic,
      })
      .then((response) => response.data)
      .catch((err) => console.log("user-service - updateUser error => ", err));
    return pr;
  }

  deleteUser(id) {
    const pr = this.userApi
      .get(`/delete/:${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("user-service - deleteUser error => ", err));
    return pr;
  }
}

const userService = new UserService();

export default userService;
