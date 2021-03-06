import React, { Component } from "react";
import packagingService from "../../services/packaging-service";
import "./CreateForm.css";

class CreatePackagingForm extends Component {
  state = {
    name: "",
    currentStock: 0,
    minimum: 0,
    price: 0,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, currentStock, minimum, price } = this.state;

    packagingService.createPackaging(name, currentStock, minimum, price);

    this.setState({
      name: "",
      currentStock: 0,
      minimum: 0,
      price: 0,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, currentStock, minimum, price } = this.state;
    return (
      <div className="flex form-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Packaging name:</label>
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

          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
          />

          <input type="submit" value="Create packaging" />
        </form>
      </div>
    );
  }
}

export default CreatePackagingForm;