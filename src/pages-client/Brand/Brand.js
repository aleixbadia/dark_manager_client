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

  loadBrand = () => {
    const nameUrl = this.props.match.params.nameUrl;
    brandService.getBrandByNameUrl(nameUrl).then((brand) => {
      recipeService.getRecipeByBrandId(brand._id).then((recipes) => {
        this.setState({ recipes: recipes, brand: brand });
      });
    });
  };

  //en updateCart se mete recipeID
  handleClick = (recipe) => {
    const id = recipe._id;
    userService.updateCart(1, id).then((response) => {
      this.setState({ cart: response.currentCart });
      console.log("carttt", this.state.cart);
    });

    //this.props.user.currentCart.push(recipe._id)
    console.log("usercurrentcartttt", this.props.user.currentCart);
  };

  loadCartRecipes = () => {
    const id = this.props.user.currentCart[0].recipeId;
    recipeService.getRecipeById(id).then((recipe) => {
      this.setState({ cart: recipe });
    });
  };

  componentDidMount() {
    this.loadBrand();
    this.loadCartRecipes();
  }

  render() {
    const { user } = this.props;

    // console.log("user.currentCart", user.currentCart);
    // console.log('user.currentCart[0].recipeId', user.currentCart[0].recipeId )
    // console.log('this.state.cart.name', this.state.cart.name)
    // console.log('this.state.cart.picture', this.state.cart.picture)

    const { brand, recipes, cart } = this.state;

    console.log("this.state.cart", this.state.cart);
    console.log("this.props.user.currentCart", this.props.user.currentCart);
    console.log("cart.name", cart.name);
    console.log("cart", cart);

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
                    this.handleClick(recipe);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>user cart </h2>
          <div className="recipe-card">
            <h3>aqui va el carroo --</h3>

            
            {cart.map((element) => (
              <div key={element._id}>
                <div className="recipe-card">
                  <h2>{element.name}</h2>
                  <img className="logos" src={element.picture} alt="recipe" />
               </div>
              </div>
            ))}
            
            {cart.name}

            <img className="logos" src={cart.picture} alt="recipe pic" />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Brand);
