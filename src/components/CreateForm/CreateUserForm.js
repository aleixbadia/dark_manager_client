import React, { Component } from "react";
import userService from "../../services/user-service";
import "./CreateForm.css";

class CreateUserForm extends Component {
  state = {
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    postCode: 0,
    profilePic: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      postCode,
      profilePic,
    } = this.state;

    userService.createUser(
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      postCode,
      profilePic
    );

    this.setState({
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      street: "",
      city: "",
      postCode: 0,
      profilePic: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      postCode,
      profilePic,
    } = this.state;
    return (
      <div className="flex form-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Role:</label>
          <input
            type="radio"
            id="client"
            name="role"
            value="client"
            onChange={this.handleChange}
          ></input>
          <label for="client">Client</label>
          <input
            type="radio"
            id="employee"
            name="role"
            value="employee"
            onChange={this.handleChange}
          ></input>
          <label for="employee">Employee</label>

          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />

          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />

          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={street}
            onChange={this.handleChange}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={this.handleChange}
          />

          <label>Post code:</label>
          <input
            type="number"
            name="postCode"
            value={postCode}
            onChange={this.handleChange}
          />

          <label>Profile picture:</label>
          <input
            type="text"
            name="profilePic"
            value={profilePic}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input type="submit" value="Create user" />
        </form>
      </div>
    );
  }
}

export default CreateUserForm;
