import axios from "axios";

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  signup(
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
    const pr = this.auth
      .post("/auth/signup", {
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
      .catch((err) => console.log("auth-service - signup error => ", err));
    return pr;
  }

  login(email, password) {
    const pr = this.auth
      .post("/auth/login", { email, password })
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - login error => ", err));
    return pr;
  }

  logout() {
    const pr = this.auth
      .get("/auth/logout")
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - logout error => ", err));
    return pr;
  }

  me() {
    const pr = this.auth
      .get("/auth/me")
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - me error => ", err));

    return pr;
  }
}

const authService = new AuthService();

export default authService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
