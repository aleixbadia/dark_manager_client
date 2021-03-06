import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";
import orderService from "../../services/order-service";
import { Link } from "react-router-dom";

class Brand extends Component {
  state = {
    brand: {},
    recipes: [],
    cart: [],
  };

  loadBrandAndRecipes = () => {
    console.log("loading brand and recipes_______");
    const nameUrl = this.props.match.params.nameUrl;

    brandService.getBrandByNameUrl(nameUrl).then((brand) => {
      recipeService.getRecipeByBrandId(brand._id).then((recipes) => {
        console.log("estamos dentro del recipeService.getRecipeByBrandId");
        console.log("recipes", recipes);

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

  handleOrderClick = () => {
    const clientId = this.props.user._id;
    const cart = this.state.cart;

    if (cart.length > 0) {
      orderService.createOrder(clientId, cart).then(() => {
        this.loadCurrentUser();
      });
    }
  };

  componentDidMount() {
    this.loadBrandAndRecipes();

    if (this.props.user) {
      this.loadCurrentUser();
    }
  }

  render() {
    const { brand, recipes, cart } = this.state;

    return (
      <div className="main" key={brand._id}>
        <div className="brands">
          <h1>Welcome to {brand.name} !</h1>
         <div className= 'menu-card'>
          <h1>Menu</h1>

          {this.props.user ? (
            <div>
              {recipes.map((recipe) => (
                <div key={recipe._id}>
                  <div className="recipe-card">
                    <h2>{recipe.name}</h2>
                    <button
                      onClick={() => {
                        this.handleAddClick(recipe._id);
                      }}
                    >
                      <img
                        className="logos"
                        src={recipe.picture}
                        alt="recipe"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {recipes.map((recipe) => (
                <div key={recipe._id}>
                  <div className="recipe-card">
                    <Link to={`/login`}>
                      <h2>{recipe.name}</h2>
                      <img
                        className="logos"
                        src={recipe.picture}
                        alt="recipe"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
        <div>
          {cart.length > 0 ? (<></>) : (<h2>Your cart is empty    (⌣́_⌣̀) </h2>)}
        
          <div  className={cart.length>0? "cart" : 'hi'}>
          {cart.length > 0 ? (<h2>Your cart </h2>) : (<></>)}
            {cart.map((cartObj) => (
            
              <div key={cartObj.recipeId._id}>
             
                <div className="recipe-card">
                  <h2>
                    {cartObj.recipeId.name} - {cartObj.quantity}
                  </h2>
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
                    Remove
                  </button>
                </div>
              </div>
            ))}

          {cart.length > 0 ? (
            
            <Link to={`/checkout`}>
              <button
                onClick={() => {
                  this.handleOrderClick();
                }}
              >
                Proceed to checkout
              </button>
            </Link>
          ) : (
            <> </>
          )}
          </div>
        </div>
        <footer>
          Dark Manager 2021
        </footer>
      </div>
    );
  }
}

export default withAuth(Brand);



// <div>
// {cart.map((cartObj) => (
//   <div  className='cart' key={cartObj.recipeId._id}>
//     <div className="recipe-card">
//       <h2>
//         {cartObj.recipeId.name} - {cartObj.quantity}
//       </h2>
//       <img
//         className="logos"
//         src={cartObj.recipeId.picture}
//         alt="recipe"
//       />
//       <button
//         onClick={() => {
//           this.handleDeleteClick(cartObj.recipeId._id);
//         }}
//       >
//         Remove from cart
//       </button>
//     </div>
//   </div>
// ))}
// </div>

// {cart.length > 0 ? (
// <Link to={`/checkout`}>
//   <button
//     onClick={() => {
//       this.handleOrderClick();
//     }}
//   >
//     Proceed to checkout
//   </button>
// </Link>
// ) : (
// <> </>
// )}
// </div>
// </div>