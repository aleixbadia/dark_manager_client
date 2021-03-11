import React, { Component } from "react";
//import BarChart from "./BarChart";
import { Bar } from "react-chartjs-2";
import "./Stats.css";

import { withAuth } from "./../../context/auth-context";

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
          data: [1],
        },
      ],
    }
  };

  // data son el numero de orders??

  componentDidMount() {
    this.loadAllOrders();
  }

  loadAllOrders = () => {
    orderService.getAllOrders()
    .then((orders) => {
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

      // console.log('DATA', data)
      // console.log('DATA1', data[1])
      // console.log('New', New)
      // console.log('Done', Done)
      // console.log('Delivery', Delivery)
      // console.log('Cooking', Cooking)
      // console.log("data", data)

      let array = []
      array.push(New)
      array.push(Cooking)
      array.push(Delivery)
      array.push(Done)
    //  console.log('array', array)

      const updatedData = {
          labels: ["New", "Cooking", "Delivery", "Done"],
    
          datasets: [
            {
              label: "Orders",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: array,
            },
          ]
      }
      


        
       this.setState({data: updatedData})
   
      })
      .catch((err) => console.log(err))
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
            scales: {
            yAxes: [{
              ticks: {
                scaleStartValue:0,
                beginAtZero: true,
                min: 0,
                max: 7,
                stepSize: 1,
              }
            }]
          }
          }}
        />
  

     <footer className="footer-class">
          Dark Manager 2021
        </footer>
      </div>
    );
  }
}

export default withAuth(Stats);

