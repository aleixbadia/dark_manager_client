import axios from "axios";

class IngredientService {
  constructor() {
    this.ingredientApi = axios.create({
      baseURL: "http://localhost:5000/api/ingredients",
      withCredentials: true,
    });
  }

  createIngredient(
    name,
    currentStock,
    minimum,
    priceKg,
  ) {
    const pr = this.ingredientApi
      .post("/create", {
       name,
       currentStock,
       minimum,
       priceKg,
      })
      .then((response) => response.data)
      .catch((err) => console.log("ingredient-service - createIngredient error => ", err));
    return pr;
  }

  getAllIngredients() {
    const pr = this.ingredientApi
      .get("/")
      .then((response) => response.data)
      .catch((err) => console.log("ingredient-service - getAllIngredients error => ", err));
    return pr;
  }

  getIngredientById(id) {
    const pr = this.ingredientApi
      .get(`/:${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("ingredient-service - getIngredientById error => ", err));
    return pr;
  }

  updateIngredient(id) {
    const pr = this.ingredientApi
      .post(`/update/:${id}`, {
        name,
        currentStock,
        minimum,
        priceKg,
      })
      .then((response) => response.data)
      .catch((err) => console.log("ingredient-service - updateIngredient error => ", err));
    return pr;
  }

  deleteUser(id) {
    const pr = this.ingredientApi
      .get(`/delete/:${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("ingredient-service - deleteIngredient error => ", err));
    return pr;
  }
}

const ingredientService = new IngredientService();

export default ingredientService;