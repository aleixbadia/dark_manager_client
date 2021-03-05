import axios from "axios";

class OrderService {
  constructor() {
    this.orderApi = axios.create({
      baseURL: "http://localhost:5000/api/orders",
      withCredentials: true,
    });
  }

  createOrder(
    value,
    stage,
    client,
    orderPackaging,
    recipes,
    deliveredBy,
    cookedBy
  ) {
    const pr = this.orderApi
      .post("/create", {
        value,
        stage,
        client,
        orderPackaging,
        recipes,
        deliveredBy,
        cookedBy,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("order-service - createOrder error => ", err)
      );
    return pr;
  }

  getAllOrders() {
    const pr = this.orderApi
      .get("/")
      .then((response) => response.data)
      .catch((err) =>
        console.log("order-service - getAllOrders error => ", err)
      );
    return pr;
  }

  getOrderById(id) {
    const pr = this.orderApi
      .get(`/:${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("order-service - getOrderById error => ", err)
      );
    return pr;
  }

  updateOrder(
    id,
    value,
    stage,
    client,
    orderPackaging,
    recipes,
    deliveredBy,
    cookedBy
  ) {
    const pr = this.orderApi
      .post(`/update/:${id}`, {
        value,
        stage,
        client,
        orderPackaging,
        recipes,
        deliveredBy,
        cookedBy,
      })
      .then((response) => response.data)
      .catch((err) =>
        console.log("order-service - updateOrder error => ", err)
      );
    return pr;
  }

  deleteOrder(id) {
    const pr = this.orderApi
      .get(`/delete/:${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("order-service - deleteOrder error => ", err)
      );
    return pr;
  }
}

const orderService = new OrderService();

export default orderService;