import axios from "axios";

class BrandService {
  constructor() {
    this.brandApi = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/brands`,
      withCredentials: true,
    });
  }

  createBrand(
    name,
    nameUrl
  ) {
    const pr = this.brandApi
      .post("/create", {
       name,
       nameUrl
      })
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - createBrand error => ", err));
    return pr;
  }

  getAllBrands() {
    const pr = this.brandApi
      .get("/")
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - getAllBrands error => ", err));
    return pr;
  }

  getBrandById(id) {
    const pr = this.brandApi
      .get(`/${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - getBrandById error => ", err));
    return pr;
  }

  updateBrand(id, name, nameUrl) {
    const pr = this.brandApi
      .post(`/update/${id}`, {
       name,
       nameUrl,
      })
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - updateBrand error => ", err));
    return pr;
  }

  deleteBrand(id) {
    const pr = this.brandApi
      .get(`/delete/${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - deleteBrand error => ", err));
    return pr;
  }

  getBrandByNameUrl(nameUrl) {
    const pr = this.brandApi
      .get(`/name/${nameUrl}`)
      .then((response) => response.data)
      .catch((err) => console.log("brand-service - getBrandByNameUrl error => ", err));
    return pr;
  }
}

const brandService = new BrandService();

export default brandService;
