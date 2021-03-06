import React, { Component } from "react";
import brandService from "../../services/brand-service";
import "./CreateForm.css";

class CreateBrandForm extends Component {
  state = { name: "", nameUrl:"", brandPic: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, nameUrl, brandPic } = this.state;

    brandService.createBrand(name, nameUrl, brandPic);

    this.setState({ name: "", nameUrl:"", brandPic: "" })
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, nameUrl, brandPic } = this.state;
    return (
      <div className="flex form-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Brand name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Brand URL:</label>
          <input
            type="text"
            name="nameUrl"
            value={nameUrl}
            onChange={this.handleChange}
          />

          <label>Brand picture:</label>
          <input
            type="text"
            name="brandPic"
            value={brandPic}
            onChange={this.handleChange}
          />
          <input type="submit" value="Create brand" />
        </form>
      </div>
    );
  }
}

export default CreateBrandForm;
