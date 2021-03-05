import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";

class Brand extends Component {
  state = {
    brand: {},
    
  };
  
  loadBrand = () => {
    const nameUrl = this.props.match.params.nameUrl
    brandService.getBrandByNameUrl(nameUrl).then((response) => {
      console.log("response", response);
      
      if (response) this.setState({ brand: response });
    });
  };  
  
  componentDidMount() {
  this.loadBrand()
  console.log('this.props.match.params.nameUrl', this.props.match.params.nameUrl)
  console.log('this.state', this.state)
    
    //this.setState({ allBrands: this.props.brand, brand:this.props.match.params });
  }

  render() {
    const { brand } = this.state;
    console.log('this.state', this.state)
    return (
      <div key={brand._id}>
        <h1>Brand details</h1>
        <h2>Welcome {brand.name}</h2>
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
      </div>
    );
  }
}

export default withAuth(Brand);
