import React, { Component } from "react";
import { withAuth } from './../../context/auth-context';

class PackagingDetails extends Component {
  render() {
    return (
      <div>
        <h1>PackagingDetails Route</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}

      </div>
    );
  }
}


export default withAuth(PackagingDetails);