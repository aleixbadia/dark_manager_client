import React, { Component } from "react";
import "./Orders.css";

import orderService from "./../../services/order-service";

import NewOrderDisplay from "./../../components/OrderDisplay/NewOrderDisplay";
import CookingOrderDisplay from "./../../components/OrderDisplay/CookingOrderDisplay";
import DeliveryOrderDisplay from "./../../components/OrderDisplay/NewOrderDisplay";

export class Orders extends Component {
  state = {
    stages: ["new", "cooking", "delivery"],
    newShow: false,
    cookingShow: false,
    deliveryShow: false,
    allOrders: [],
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

  loadAllOrders = () => {
    orderService.getAllOrdersPopulated().then((orders) => {
      if (orders) this.setState({ allOrders: orders });
    });
  };

  componentDidMount() {
    this.loadAllOrders();
  }

  render() {
    const {
      stages,
      newShow,
      cookingShow,
      deliveryShow,
      allOrders,
    } = this.state;

    const newOrders = allOrders.filter((order) => order.stage === "New");
    const cookingOrders = allOrders.filter(
      (order) => order.stage === "Cooking"
    );
    const deliveryOrders = allOrders.filter(
      (order) => order.stage === "Delivery"
    );

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

        {newShow ? <NewOrderDisplay orders={newOrders} /> : <></>}
        {cookingShow ? <CookingOrderDisplay orders={cookingOrders} /> : <></>}
        {deliveryShow ? (
          <DeliveryOrderDisplay orders={deliveryOrders} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Orders;
