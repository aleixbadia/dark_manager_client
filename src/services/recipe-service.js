import axios from "axios";

class RecipeService {
  constructor() {
    this.recipeApi = axios.create({
      baseURL: "http://localhost:5000/api/recipes",
      withCredentials: true,
    });
  }

  createRecipe(name, brandId, price, ingredients, recipePackaging, picture) {
    const pr = this.recipeApi
      .post("/create", {
        name,
        brandId,
        price,
        ingredients,
        recipePackaging,
        picture,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("recipe-service - createRecipe error => ", err)
      );
    return pr;
  }

  getAllRecipes() {
    const pr = this.recipeApi
      .get("/")
      .then((response) => response.data)
      .catch((err) =>
        console.log("recipe-service - getAllRecipes error => ", err)
      );
    return pr;
  }

  getRecipeById(id) {
    const pr = this.recipeApi
      .get(`/${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("recipe-service - getRecipeById error => ", err)
      );
    return pr;
  }

  updateRecipe(
    id,
    name,
    brandId,
    price,
    ingredients,
    recipePackaging,
    picture
  ) {
    const pr = this.recipeApi
      .post(`/update/${id}`, {
        name,
        brandId,
        price,
        ingredients,
        recipePackaging,
        picture,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("recipe-service - updateRecipe error => ", err)
      );
    return pr;
  }

  deleteRecipe(id) {
    const pr = this.recipeApi
      .get(`/delete/${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("recipe-service - deleteRecipe error => ", err)
      );
    return pr;
  }
}

const recipeService = new RecipeService();

export default recipeService;
