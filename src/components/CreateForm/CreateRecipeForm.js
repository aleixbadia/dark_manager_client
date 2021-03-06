import React, { Component } from "react";
import recipeService from "../../services/recipe-service";
import brandService from "../../services/brand-service";
import ingredientService from "../../services/ingredient-service";
import packagingService from "../../services/packaging-service";
import "./CreateForm.css";

class CreateRecipeForm extends Component {
  state = {
    name: "",
    brandId: "",
    price: 0,
    ingredients: [],
    recipePackaging: [],
    picture: "",
    allBrands: [],
    allIngredients: [],
    allPackagings: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    } = this.state;

    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].className === "ingredient-class") {
        ingredients.push(checkboxes[i].value);
      } else if (checkboxes[i].className === "packaging-class") {
        recipePackaging.push(checkboxes[i].value);
      }
    }

    recipeService.createRecipe(
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture
    );

    this.setState({
      name: "",
      brandId: "",
      price: 0,
      ingredients: [],
      recipePackaging: [],
      picture: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  loadAllBrands = () => {
    brandService.getAllBrands().then((brands) => {
      if (brands) this.setState({ allBrands: brands });
    });
  };

  loadAllIngredients = () => {
    ingredientService.getAllIngredients().then((ingredients) => {
      if (ingredients) this.setState({ allIngredients: ingredients });
    });
  };

  loadAllPackagings = () => {
    packagingService.getAllPackagings().then((packagings) => {
      if (packagings) this.setState({ allPackagings: packagings });
    });
  };

  componentDidMount() {
    this.loadAllBrands();
    this.loadAllIngredients();
    this.loadAllPackagings();
  }

  render() {
    const {
      name,
      price,
      picture,
      allBrands,
      allIngredients,
      allPackagings,
    } = this.state;
    return (
      <div className="flex">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Recipe name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Recipe picture:</label>
          <input
            type="text"
            name="picture"
            value={picture}
            onChange={this.handleChange}
          />

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
          />

          <label>Brands:</label>
          <div className="radio">
            {allBrands.map((brand) => (
              <div key={brand._id}>
                <input
                  type="radio"
                  id={brand.name}
                  name="brandId"
                  value={brand._id}
                  onChange={this.handleChange}
                ></input>
                <label for={brand.name}>{brand.name}</label>
              </div>
            ))}
          </div>

          <label>Ingredients:</label>
          <div className="radio">
            {allIngredients.map((ingredient) => (
              <div key={ingredient._id}>
                <input
                  type="checkbox"
                  id={ingredient.name}
                  name="ingredients"
                  value={ingredient._id}
                  className="ingredient-class"
                ></input>
                <label for={ingredient.name}>{ingredient.name}</label>
              </div>
            ))}
          </div>

          <label>Packaging:</label>
          <div className="radio">
            {allPackagings.map((packaging) => (
              <div key={packaging._id}>
                <input
                  type="checkbox"
                  id={packaging.name}
                  name="recipePackaging"
                  value={packaging._id}
                  className="packaging-class"
                ></input>
                <label for={packaging.name}>{packaging.name}</label>
              </div>
            ))}
          </div>

          <input type="submit" value="Create recipe" />
        </form>
      </div>
    );
  }
}

export default CreateRecipeForm;
