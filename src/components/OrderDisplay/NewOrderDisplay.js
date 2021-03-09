import React, { Component } from "react";
import "./OrderDisplay.css";

class NewOrderDisplay extends Component {
  state = {
    clientId: "",
    cart: [],
    orderPackaging: [],
    allUsers: [],
    allRecipes: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { cart, allUsers, allRecipes } = this.state;
    const { orders } = this.props;
    console.log(orders);

    return (
      <div className="order-display">
        <label>New orders:</label>
        {orders.map((order) => (
          <div key={order._id}>
            <h3>
              {order.clientId.name.firstName} {order.clientId.name.lastName} -{" "}
              {order._id}
            </h3>
            <p></p>
            <div className="flex">
              <button
                name="orders"
                onClick={this.handleChange}
              >{`<-- Delete order`}</button>
              <button
                name="orders"
                onClick={this.handleChange}
              >{`Move to cooking -->`}</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default NewOrderDisplay;
