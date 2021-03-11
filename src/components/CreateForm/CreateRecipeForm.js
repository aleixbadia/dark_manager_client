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
    let {
      name,
      brandId,
      price,
      ingredients,
      recipePackaging,
      picture,
    } = this.state;

    ingredients = ingredients.filter((ingredient) => ingredient.quantity > 0);
    recipePackaging = recipePackaging.filter(
      (packaging) => packaging.quantity > 0
    );
    console.log('ingredientsCreate',ingredients)
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
      picture: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleArrChange = (event) => {
    const { name, value, id } = event.target;

    if (name === "ingredients") {
      let newIngredients = this.state.ingredients;
      newIngredients.forEach((ingredientObj, index) => {
        if (ingredientObj.ingredientId === id) {
          newIngredients[index].quantity = value;
        }
      });
      this.setState({ [name]: newIngredients });
    } else if (name === "recipePackaging") {
      let newPackagings = this.state.recipePackaging;
      newPackagings.forEach((packagingObj, index) => {
        if (packagingObj.packagingId === id) {
          newPackagings[index].quantity = value;
        }
      });
      this.setState({ [name]: newPackagings });
    }
  };

  loadAllBrands = () => {
    brandService.getAllBrands().then((brands) => {
      if (brands) this.setState({ allBrands: brands });
    });
  };

  loadAllIngredients = () => {
    ingredientService.getAllIngredients().then((allIngredients) => {
      if (allIngredients) {
        let ingredients = [];
        allIngredients.forEach((ingredient) => {
          ingredients.push({
            ingredientId: ingredient._id,
            quantity: 0,
          });
        });
        this.setState({ allIngredients, ingredients });
      }
    });
  };

  loadAllPackagings = () => {
    packagingService.getAllPackagings().then((allPackagings) => {
      if (allPackagings) {
        let recipePackaging = [];
        allPackagings.forEach((packaging) => {
          recipePackaging.push({
            packagingId: packaging._id,
            quantity: 0,
          });
        });
        this.setState({ allPackagings, recipePackaging });
      }
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
      ingredients,
      recipePackaging,
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
          <div className="checkboxes-list">
            <div className="radio">
              <label>Brands:</label>
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

            <div className="radio">
              <label>Ingredients:</label>
              {ingredients.map((ingredient) => (
                <div key={ingredient.ingredientId}>
                  <label for={ingredient.ingredientId}>
                    {
                      allIngredients.find(
                        (ingredientObj) =>
                          ingredientObj._id === ingredient.ingredientId
                      ).name
                    }
                  </label>
                  <input
                    type="number"
                    id={ingredient.ingredientId}
                    name="ingredients"
                    value={ingredient.quantity}
                    onChange={this.handleArrChange}
                  ></input>
                </div>
              ))}
            </div>

            <div className="radio">
              <label>Packagings:</label>
              {recipePackaging.map((packaging) => (
                <div key={packaging.packagingId}>
                  <label for={packaging.packagingId}>
                    {
                      allPackagings.find(
                        (packagingObj) =>
                          packagingObj._id === packaging.packagingId
                      ).name
                    }
                  </label>
                  <input
                    type="number"
                    id={packaging.packagingId}
                    name="recipePackaging"
                    value={packaging.quantity}
                    onChange={this.handleArrChange}
                  ></input>
                </div>
              ))}
            </div>
          </div>
          <input type="submit" value="Create recipe" />
        </form>
      </div>
    );
  }
}

export default CreateRecipeForm;
