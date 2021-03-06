import React, { Component } from "react";
import brandService from "../../services/brand-service";
import { Link } from "react-router-dom";

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
        {brands.map((brand) => (
          <div key={brand._id}>
           <Link to={`/${brand.nameUrl}`}>
              <h2>{brand.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
