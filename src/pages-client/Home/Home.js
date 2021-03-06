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
        <h1>What would you like to eat today?</h1>
        <div className= 'wrapper'>
        {brands.map((brand) => (
          <div key={brand._id}  className = 'brand-card'>
           <Link to={`/${brand.nameUrl}`}>
              
              <img className='logos' src={brand.brandPic} alt='brandPic'/>
            </Link>
          </div>
        ))}
        </div>
        <footer>
          Dark Manager 2021
        </footer>
      </div>
    );
  }
}

export default Home;
