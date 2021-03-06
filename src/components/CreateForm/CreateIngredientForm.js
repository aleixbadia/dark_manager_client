import React, { Component } from "react";
import ingredientService from "../../services/ingredient-service";
import "./CreateForm.css";

class CreateIngredientForm extends Component {
  state = {
    name: "",
    currentStock: 0,
    minimum: 0,
    priceKg: 0,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, currentStock, minimum, priceKg } = this.state;

    ingredientService.createIngredient(name, currentStock, minimum, priceKg);

    this.setState({
      name: "",
      currentStock: 0,
      minimum: 0,
      priceKg: 0,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, currentStock, minimum, priceKg } = this.state;
    return (
      <div className="flex form-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Ingredient name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Current stock:</label>
          <input
            type="number"
            name="currentStock"
            value={currentStock}
            onChange={this.handleChange}
          />

          <label>Minimum stock:</label>
          <input
            type="number"
            name="minimum"
            value={minimum}
            onChange={this.handleChange}
          />

          <label>Price/Kg:</label>
          <input
            type="number"
            name="priceKg"
            value={priceKg}
            onChange={this.handleChange}
          />

          <input type="submit" value="Create ingredient" />
        </form>
      </div>
    );
  }
}

export default CreateIngredientForm;
