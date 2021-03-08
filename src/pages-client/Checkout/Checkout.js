import React, { Component } from "react";
import { withAuth } from './../../context/auth-context';
import userService from "../../services/user-service";
import orderService from "../../services/order-service";

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
    console.log('first name', this.props.user._id)
    return (
      <div>
        <h1>Checkout Route</h1>
        <h2>your order has been processed</h2>
        <h2>hello {this.state.user.firstName}</h2>
        <h2>Welcome {this.props.user.name.firstName && this.props.user.username}</h2>
        
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}

      </div>
    );
  }
}


export default withAuth(Checkout);