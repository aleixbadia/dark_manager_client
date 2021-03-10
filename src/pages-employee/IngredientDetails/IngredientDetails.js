import React, { Component } from "react";
import { withAuth } from "../../context/auth-context";
import ingredientService from "../../services/ingredient-service";
import "./IngredientDetails.css";

class IngredientDetails extends Component {
  state = {
    name: "",
    currentStock: 0,
    minimum: 0,
    priceKg: 0,
  };

  loadIngredient = () => {
    const id = this.props.match.params.id;
    console.log("id", id);

    ingredientService.getIngredientById(id).then((ingredient) => {
      this.setState({
        name: ingredient.name,
        currentStock: ingredient.currentStock,
        minimum: ingredient.minimum,
        priceKg: ingredient.priceKg,
      });
      console.log("this.state", this.state);
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, currentStock, minimum, priceKg } = this.state;
    const id = this.props.match.params.id;

    ingredientService.updateIngredient(id, name, currentStock, minimum, priceKg);

    this.setState({
      name: name,
      currentStock: currentStock,
      minimum: minimum,
      priceKg: priceKg,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.loadIngredient();
  }
  render() {
    const { name, currentStock, minimum, priceKg } = this.state;
    return (
      <div className="edit-card">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label><h1>{name}</h1></label>

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

          <input type="submit" value="Edit ingredient" />
        </form>
      </div>
    );
  }
}

export default withAuth(IngredientDetails);
