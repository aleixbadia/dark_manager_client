import React, { Component } from "react";
//import BarChart from "./BarChart";

import { Bar } from "react-chartjs-2";
import "./Stats.css";

import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";
import orderService from "../../services/order-service";

class Stats extends Component {
  state = {
    data: {
      labels: ["New", "Cooking", "Delivery", "Done"],

      datasets: [
        {
          label: "Orders",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [],
        },
      ],
    },
  };
  // data son el numero de orders??

  componentDidMount() {
    this.loadAllOrders();
  }

  loadAllOrders = () => {
    orderService.getAllOrders().then((orders) => {
      console.log("orders", orders);
      console.log(
        "this.state.data.datasets[0].data",
        this.state.data.datasets[0].data
      );

      const data = this.state.data.datasets[0].data;

      let New = 0;
      let Cooking = 0;
      let Delivery = 0;
      let Done = 0;

      orders.forEach((order) => {
        if (order.stage === "New") {
          New ++;
        } else if (order.stage === "Cooking") {
          Cooking ++;
        } else if (order.stage === "Delivery") {
          Delivery ++;
        } else if (order.stage === "Done") {
          Done ++;
        }
      });
      console.log('DATA', data)
      console.log('DATA1', data[1])
      console.log('Done', Done)
      console.log('Cooking', Cooking)
      this.setState({ data: New, Cooking, Delivery, Done })
    });
  };  

  render() {
    return (
      <div className="graph">
        <Bar
          data={this.state.data}
          options={{
            title: {
              display: true,
              text: "Current orders",
              fontSize: 20,
            },
          }}
        />
      </div>
    );
  }
}

export default withAuth(Stats);

// loadAllOrders = () => {
//   orderService.getAllOrders().then((order) => {
//     recipeService.getRecipeById(order.cart.recipeId).then((recipe)=> {
//       recipe.map((recipe)=>(
//         this.setState({ labels: recipe})
//       ))
//       }
//     )
//   console.log('order', order)
//   console.log('order.cart', order[0].cart[0])

//   });
// };
