import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";

class Signup extends Component {
  state = {
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

    this.props.signup(
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
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
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

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
