import React, { Component } from "react";
import orderService from "../../services/order-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";
import "./CreateForm.css";

class CreateOrderForm extends Component {
  state = {
    clientId: "",
    cart: [],
    orderPackaging: [],
    allUsers: [],
    allRecipes: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { clientId, cart } = this.state;

    cart = cart.filter((ingredient) => ingredient.quantity > 0);

    orderService.createOrder(clientId, cart);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleArrChange = (event) => {
    const { name, value, id } = event.target;
    let newCart = this.state.cart;
    newCart.forEach((cartObj, index) => {
      if (cartObj.recipeId === id) {
        newCart[index].quantity = value;
      }
    });
    this.setState({ [name]: newCart });
  };

  loadAllUsers = () => {
    userService.getAllUsers().then((brands) => {
      if (brands) this.setState({ allUsers: brands });
    });
  };

  loadAllRecipes = () => {
    recipeService.getAllRecipes().then((allRecipes) => {
      if (allRecipes) {
        let cart = [];
        allRecipes.forEach((recipe) => {
          cart.push({
            recipeId: recipe._id,
            quantity: 0,
          });
        });

        this.setState({ allRecipes, cart });
      }
    });
  };

  componentDidMount() {
    this.loadAllUsers();
    this.loadAllRecipes();
  }

  render() {
    const {
      cart,
      allUsers,
      allRecipes,
    } = this.state;
    return (
      <div className="flex">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <div className="checkboxes-list">
            <div className="radio">
              <label>Client:</label>
              {allUsers.map((user) => (
                <div key={user._id}>
                  <input
                    type="radio"
                    id={user.name.firstName}
                    name="clientId"
                    value={user._id}
                    onChange={this.handleChange}
                  ></input>
                  <label for={user.name.firstName}>
                    {user.name.firstName} {user.name.lastName}
                  </label>
                </div>
              ))}
            </div>

            <div className="radio">
              <label>Recipes:</label>
              {cart.map((cartObj) => (
                <div key={cartObj.recipeId}>
                  <label for={cartObj.recipeId}>
                    {
                      allRecipes.find(
                        (recipeObj) => recipeObj._id === cartObj.recipeId
                      ).name
                    }
                  </label>
                  <input
                    type="number"
                    id={cartObj.recipeId}
                    name="cart"
                    value={cartObj.quantity}
                    onChange={this.handleArrChange}
                  ></input>
                </div>
              ))}
            </div>
          </div>
          <input type="submit" value="Create order" />
        </form>
      </div>
    );
  }
}

export default CreateOrderForm;
