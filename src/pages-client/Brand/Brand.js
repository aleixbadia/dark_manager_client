import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";

class Brand extends Component {
  state = {
    brand: {},
    recipes: [],
    cart: []
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
  handleClick = (recipe) => {
    const id = recipe._id;
    const copyCart = [...this.state.cart];
    //recipe._id
   // copyCart.recipeId._id

   
 
    userService.addToCart(1, id)
  };

  handleDeleteClick = (cartObj) => {
    const id = cartObj.recipeId._id;
    const copyCart = [...this.state.cart];

    copyCart.find(data => {      
      if(data._id === cartObj._id){
        data.quantity--;
    this.setState({ cart: copyCart });
if(data.quantity === 0){
  const filteredCart = copyCart.filter(data => data.recipeId._id !== cartObj.recipeId._id);
  this.setState({ cart: filteredCart });
}
      } 
    })


    userService.deleteFromCart(1, id)
    
  };

  componentDidMount() {
    this.loadBrand();
    this.loadCurrentUser();
  }
  // componentDidUpdate (){
  //   this.loadBrand();
  //   this.loadCurrentUser();
  // }

  render() {
    console.log("cart", this.state.cart);

    const { user } = this.props;

    const { brand, recipes, cart } = this.state;

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
          <div>
            {cart.map((cartObj) => (
              <div key={cartObj.recipeId._id}>
                <div className="recipe-card">
                  <h2>{cartObj.recipeId.name}</h2>
                  <img
                    className="logos"
                    src={cartObj.recipeId.picture}
                    alt="recipe"
                  />
                  <button
                    onClick={() => {
                      this.handleDeleteClick(cartObj);
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
