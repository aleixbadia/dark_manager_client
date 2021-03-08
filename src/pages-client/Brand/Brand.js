import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";

class Brand extends Component {
  state = {
    brand: {},
    recipes: [],
    cart: [],
  };

  loadBrandAndRecipes = () => {
    const nameUrl = this.props.match.params.nameUrl;
    brandService.getBrandByNameUrl(nameUrl).then((brand) => {
      recipeService.getRecipeByBrandId(brand._id).then((recipes) => {
        this.setState({ recipes: recipes, brand: brand });
      });
    });
  };

  loadCurrentUser = () => {
    //obtener user by id, cargar su currentCart en state.cart
    const id = this.props.user._id;
    userService.getUserById(id).then((user) => {
      this.setState({ cart: user.currentCart });
    });
  };

  //en addToCart se mete recipeID
  handleAddClick = async (recipeId) => {
    await userService.addToCart(recipeId);
    this.loadCurrentUser();
    
  };

  handleDeleteClick = async (recipeId) => {
    await userService.deleteFromCart(recipeId);
    this.loadCurrentUser();
  };

  componentDidMount() {
    this.loadBrandAndRecipes();
    this.loadCurrentUser();
  }

  render() {
    console.log("cart", this.state.cart);

    const { brand, recipes, cart } = this.state;
    console.log(cart);
    

    return (
      <div className="main" key={brand._id}>
        <div className="brands">
          <h1>Brand details</h1>
          <h2>Welcome to {brand.name}</h2>

          <h2>Menu</h2>
          {recipes.map((recipe) => (
            <div key={recipe._id}>
              <div className="recipe-card">
                <h2>{recipe.name}</h2>
                <img className="logos" src={recipe.picture} alt="recipe" />
                <button
                  onClick={() => {
                    this.handleAddClick(recipe._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>User cart </h2>
          <div>
            {cart.map((cartObj) => (
              <div key={cartObj.recipeId._id}>
                <div className="recipe-card">
                  <h2>{cartObj.recipeId.name} - {cartObj.quantity}</h2>
                  <img
                    className="logos"
                    src={cartObj.recipeId.picture}
                    alt="recipe"
                  />
                  <button
                    onClick={() => {
                      this.handleDeleteClick(cartObj.recipeId._id);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    );
  }
}

export default withAuth(Brand);
