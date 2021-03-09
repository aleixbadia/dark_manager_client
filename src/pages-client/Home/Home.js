import React, { Component } from "react";
import brandService from "../../services/brand-service";
import { Link } from "react-router-dom";
import "./Home.css";

// BrandService.getAllBrands()
export class Home extends Component {
  state = {
    brands: [],
    isReady: false,
  };

  componentDidMount() {
    this.loadAllBrands();
  }

  loadAllBrands = () => {
    brandService.getAllBrands().then((response) => {
      
      if (response) this.setState({ brands: response, isReady: true });
    });
  };

  render() {
    const { brands, isReady } = this.state;

    if (!isReady) return <h2>Loading</h2>;

    return (
      <div>
        <h1>Brands List </h1>
        <div className= 'wrapper'>
        {brands.map((brand) => (
          <div key={brand._id}  className = 'brand-card'>
           <Link to={`/${brand.nameUrl}`}>
              <h2>{brand.name}</h2>
              <img className='logos' src={brand.brandPic} alt='brandPic'/>
            </Link>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Home;
