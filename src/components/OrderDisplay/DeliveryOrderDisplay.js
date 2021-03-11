import React, { Component } from "react";
import orderService from "../../services/order-service";
import { withAuth } from "./../../context/auth-context";
import Map from "./../../components/Map/Map";
import "./OrderDisplay.css";

class DeliveryOrderDisplay extends Component {
  state = {
    deliveryOrders: [],
    cookingOrders: [],
    cooking: [],
    delivery: [],
  };

  handleDelete = async (event) => {
    const { id } = event.target;
    await orderService.deleteOrder(id);
    let newOrders = [...this.state.deliveryOrders].filter(
      (order) => String(order._id) !== id
    );
    this.setState({ deliveryOrders: newOrders });
  };

  handleStage = async (event) => {
    const { id, value } = event.target;
    const userId = this.props.user._id;

    await orderService.updateStageOrder(id, value, userId);
    let newOrders = [...this.state.deliveryOrders].filter(
      (order) => String(order._id) !== id
    );
    this.setState({ deliveryOrders: newOrders });
  };

  loadAllOrders = () => {
    orderService.getAllOrdersPopulated().then((orders) => {
      if (orders) {
        const deliveryOrders = orders.filter(
          (order) => order.stage === "Delivery"
        );
        const cookingOrders = orders.filter(
          (order) => order.stage === "Cooking"
        );
        let cooking = [];
        let delivery = [];
        deliveryOrders.forEach((order) => {
          cooking.push({
            name: `${order.clientId.name.firstName} ${order.clientId.name.lastName}`,
            coordinates: order.clientId.location,
          });
        });
        cookingOrders.forEach((order) => {
          delivery.push({
            name: `${order.clientId.name.firstName} ${order.clientId.name.lastName}`,
            coordinates: order.clientId.location,
          });
        });

        this.setState({ deliveryOrders, cookingOrders, delivery, cooking });
      }
    });
  };

  componentDidMount() {
    this.loadAllOrders();
  }

  render() {
    const { deliveryOrders, cooking, delivery } = this.state;

    console.log(cooking);

    return (
      <div className="order-display">
        <label>Delivery orders:</label>
        {deliveryOrders.map((order) => (
          <div key={order._id}>
            <h3>
              {order.clientId.name.firstName} {order.clientId.name.lastName} -{" "}
              {order._id}
            </h3>
            <p></p>
            <div className="flex">
              <button
                id={order._id}
                value="Cooking"
                onClick={this.handleStage}
              >{`<-- Move to cooking`}</button>
              <button id={order._id} onClick={this.handleDelete}>
                Delete order
              </button>
              <button
                id={order._id}
                value="Done"
                onClick={this.handleStage}
              >{`Move to done -->`}</button>
            </div>
          </div>
        ))}
        {cooking.length > 0 || delivery.length > 0 ? (
          <Map cooking={cooking} delivery={delivery} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default withAuth(DeliveryOrderDisplay);
