import React, { Component } from "react";
import orderService from "../../services/order-service";
import recipeService from "../../services/recipe-service";
import packagingService from "../../services/packaging-service";
import userService from "../../services/user-service";
import "./CreateForm.css";

class CreateOrderForm extends Component {
  state = {
    client: "",
    cart: [],
    orderPackaging: [],
    allUsers: [],
    allRecipes: [],
    allPackagings: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { client, cart, orderPackaging } = this.state;

    cart = cart.filter((ingredient) => ingredient.quantity > 0);
    orderPackaging = orderPackaging.filter(
      (packaging) => packaging.quantity > 0
    );

    orderService.createOrder(client, cart, orderPackaging);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleArrChange = (event) => {
    const { name, value, id } = event.target;

    if (name === "cart") {
      let newCart = this.state.cart;
      newCart.forEach((cartObj, index) => {
        if (cartObj.recipeId === id) {
          newCart[index].quantity = value;
        }
      });
      this.setState({ [name]: newCart });
    } else if (name === "orderPackaging") {
      let newPackagings = this.state.orderPackaging;
      newPackagings.forEach((packagingObj, index) => {
        if (packagingObj.packagingId === id) {
          newPackagings[index].quantity = value;
        }
      });
      this.setState({ [name]: newPackagings });
    }

    console.log(this.state);
    
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

  loadAllPackagings = () => {
    packagingService.getAllPackagings().then((allPackagings) => {
      if (allPackagings) {
        let orderPackaging = [];
        allPackagings.forEach((packaging) => {
          orderPackaging.push({
            packagingId: packaging._id,
            quantity: 0,
          });
        });
        this.setState({ allPackagings, orderPackaging });
      }
    });
  };

  componentDidMount() {
    this.loadAllUsers();
    this.loadAllRecipes();
    this.loadAllPackagings();
  }

  render() {
    const {
      client,
      cart,
      orderPackaging,
      allUsers,
      allRecipes,
      allPackagings,
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
                    name="client"
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
                        (recipeObj) =>
                          recipeObj._id === cartObj.recipeId
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

            <div className="radio">
            <label>Packagings:</label>
              {orderPackaging.map((packaging) => (
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
                    name="orderPackaging"
                    value={packaging.quantity}
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
