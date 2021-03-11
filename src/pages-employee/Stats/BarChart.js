// import React, { Component } from "react";

// import { Bar } from "react-chartjs-2";
// import "./Stats.css";

// import { withAuth } from "./../../context/auth-context";
// import brandService from "../../services/brand-service";
// import recipeService from "../../services/recipe-service";
// import userService from "../../services/user-service";
// import orderService from "../../services/order-service";

// // en barchart vamos a mostrar las recipes mas populares
// //get recipe

// class BarChart extends Component {

//   // state = {
//   //   data: {
//   //     labels: ["New", "Cooking", "Delivery", "Done"],

//   //     datasets: [
//   //       {
//   //         label: "Orders",
//   //         backgroundColor: "rgba(75,192,192,1)",
//   //         borderColor: "rgba(0,0,0,1)",
//   //         borderWidth: 2,
//   //         data: [1],
//   //       },
//   //     ],
//   //   },
//   // };

//   // data son el numero de orders??

//   componentDidMount() {
//     this.loadOrdersAndRecipes();
//   }

//   loadOrdersAndRecipes = () => {


//     orderService.getAllOrders().then((orders) => {
//       console.log('orders',orders)
//       orders.map((order)=>{
    
//       })
     
//       // const id = order.cart.recipeId
//       // recipeService.getRecipeById(id).then((recipes) => {
     
//       //   console.log("recipes", recipes);

     
//       // });
//     });
//   }; 
   

//   render() {
//     return (
//       <div className="graph">
//      <p>hi</p> 
//         {/* <Bar
//           data={this.state.data}
//           options={{
//             title: {
//               display: true,
//               text: "Current orders",
//               fontSize: 20,
//             },
//           }}
//         /> */}

//       </div>
//     );
//   }
// }

// export default withAuth(BarChart);