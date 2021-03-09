import React, { Component } from "react";
import orderService from "../../services/order-service";
import { withAuth } from "./../../context/auth-context";
import "./OrderDisplay.css";

class NewOrderDisplay extends Component {
  state = {
    allOrders: [],
  };

  handleDelete = async (event) => {
    const { id } = event.target;
    await orderService.deleteOrder(id);
    let newOrders = [...this.state.allOrders].filter(
      (order) => String(order._id) !== id
    );
    this.setState({ allOrders: newOrders });
  };

  handleStage = async (event) => {
    const { id, value } = event.target;

    await orderService.updateStageOrder(id, value);
    let newOrders = [...this.state.allOrders].filter(
      (order) => String(order._id) !== id
    );
    this.setState({ allOrders: newOrders });
  };

  loadAllOrders = () => {
    orderService.getAllOrdersPopulated().then((orders) => {
      if (orders) {
        const newOrders = orders.filter((order) => order.stage === "New");
        this.setState({ allOrders: newOrders });
      }
    });
  };

  componentDidMount() {
    this.loadAllOrders();
  }

  render() {
    const { allOrders } = this.state;

    return (
      <div className="order-display">
        <label>New orders:</label>
        {allOrders.map((order) => (
          <div key={order._id}>
            <h3>
              {order.clientId.name.firstName} {order.clientId.name.lastName} -{" "}
              {order._id}
            </h3>
            <p></p>
            <div className="flex">
              <button
                id={order._id}
                onClick={this.handleDelete}
              >{`<-- Delete order`}</button>
              <button
                id={order._id}
                value="Cooking"
                onClick={this.handleStage}
              >{`Move to cooking -->`}</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withAuth(NewOrderDisplay);
