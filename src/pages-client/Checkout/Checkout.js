import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import userService from "../../services/user-service";
import { Link } from "react-router-dom";


class Checkout extends Component {
  state = {
    user: {},
  };

  loadCurrentUser = () => {
    //obtener user by id, cargar su currentCart en state.cart
    const id = this.props.user._id;
    userService.getUserById(id).then((user) => {
      this.setState({ user: user });
    });
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    console.log("first name", this.props.user._id);
    return (
      <div>
        <div className= 'checkout'>
          <h1>Thank you!</h1>
          <h2>your order has been processed</h2>
          <Link to={`/`}>
            <h2>Return to main page</h2>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Checkout);
