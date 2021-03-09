import React, { Component } from "react";
import "./Orders.css";

import NewOrderDisplay from "./../../components/OrderDisplay/NewOrderDisplay";
import CookingOrderDisplay from "./../../components/OrderDisplay/CookingOrderDisplay";
import DeliveryOrderDisplay from "./../../components/OrderDisplay/DeliveryOrderDisplay";

export class Orders extends Component {
  state = {
    stages: ["new", "cooking", "delivery"],
    newShow: false,
    cookingShow: false,
    deliveryShow: false,
  };

  handleClick = (event) => {
    const { name } = event.target;
    this.setState({
      newShow: false,
      cookingShow: false,
      deliveryShow: false,
    });
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const { stages, newShow, cookingShow, deliveryShow } = this.state;

    return (
      <div className="orders">
        <div className="stages">
          {stages.map((stage) => (
            <button
              className="title"
              onClick={this.handleClick}
              key={stage}
              name={`${stage}Show`}
            >
              {stage.toUpperCase()}
            </button>
          ))}
        </div>

        {newShow ? <NewOrderDisplay /> : <></>}
        {cookingShow ? <CookingOrderDisplay /> : <></>}
        {deliveryShow ? <DeliveryOrderDisplay /> : <></>}
      </div>
    );
  }
}

export default Orders;
