import axios from "axios";

class PackagingService {
  constructor() {
    this.packagingApi = axios.create({
      baseURL: "http://localhost:5000/api/packagings",
      withCredentials: true,
    });
  }

  createPackaging(name, currentStock, minimum, price) {
    const pr = this.packagingApi
      .post("/create", {
        name,
        currentStock,
        minimum,
        price,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("packaging-service - createPackaging error => ", err)
      );
    return pr;
  }

  getAllPackagings() {
    const pr = this.packagingApi
      .get("/")
      .then((response) => response.data)
      .catch((err) =>
        console.log("packaging-service - getAllPackagings error => ", err)
      );
    return pr;
  }

  getPackagingById(id) {
    const pr = this.packagingApi
      .get(`/${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("packaging-service - getPackagingById error => ", err)
      );
    return pr;
  }

  updatePackaging(id, name, currentStock, minimum, price) {
    const pr = this.packagingApi
      .post(`/update/${id}`, {
        name,
        currentStock,
        minimum,
        price,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("packaging-service - updateUser error => ", err)
      );
    return pr;
  }

  deleteUser(id) {
    const pr = this.packagingApi
      .get(`/delete/${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("packaging-service - deleteUser error => ", err)
      );
    return pr;
  }
}

const packagingService = new PackagingService();

export default packagingService;
