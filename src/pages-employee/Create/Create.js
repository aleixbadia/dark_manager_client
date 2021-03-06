import React, { Component } from "react";
import "./Create.css";
import CreateUserForm from "./../../components/CreateForm/CreateUserForm";
import CreateBrandForm from "./../../components/CreateForm/CreateBrandForm";
import CreateIngredientForm from "./../../components/CreateForm/CreateIngredientForm";
import CreateOrderForm from "./../../components/CreateForm/CreateOrderForm";
import CreatePackagingForm from "./../../components/CreateForm/CreatePackagingForm";
import CreateRecipeForm from "./../../components/CreateForm/CreateRecipeForm";

export class Create extends Component {
  state = {
    services: ["order", "recipe", "ingredient", "packaging", "brand", "user"],
    orderShow: false,
    recipeShow: false,
    ingredientShow: false,
    packagingShow: false,
    brandShow: false,
    userShow: false,
  };

  handleClick = (event) => {
    const { name } = event.target;
    this.setState({
      orderShow: false,
      recipeShow: false,
      ingredientShow: false,
      packagingShow: false,
      brandShow: false,
      userShow: false,
    });
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const {
      services,
      orderShow,
      recipeShow,
      ingredientShow,
      packagingShow,
      brandShow,
      userShow,
    } = this.state;

    return (
      <div className="create">
        <div className="services">
          {services.map((service) => (
            <button
              className="title"
              onClick={this.handleClick}
              key={service}
              name={`${service}Show`}
            >
              {service.toUpperCase()}
            </button>
          ))}
        </div>

        {userShow ? <CreateUserForm /> : <></>}
        {brandShow ? <CreateBrandForm /> : <></>}
        {ingredientShow ? <CreateIngredientForm /> : <></>}
        {orderShow ? <CreateOrderForm /> : <></>}
        {packagingShow ? <CreatePackagingForm /> : <></>}
        {recipeShow ? <CreateRecipeForm /> : <></>}
      </div>
    );
  }
}

export default Create;
