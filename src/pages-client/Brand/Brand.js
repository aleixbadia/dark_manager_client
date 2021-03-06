import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import brandService from "../../services/brand-service";
import recipeService from "../../services/recipe-service";
import userService from "../../services/user-service";


class Brand extends Component {
  state = {
    brand: {},
    recipes: [],
  };

  loadBrand = () => {
    const nameUrl = this.props.match.params.nameUrl;
    brandService.getBrandByNameUrl(nameUrl).then((brand) => {

      recipeService.getRecipeByBrandId(brand._id).then((recipes) => {
        this.setState({ recipes: recipes, brand: brand });
      });
    });
  };

  componentDidMount() {
    this.loadBrand();
   
  }

  render() {
    const { brand, recipes } = this.state;
  
    console.log('this.state.recipes', this.state.recipes)
    
    return (
      <div key={brand._id}>
        <h1>Brand details</h1>
        <h2>Welcome to {brand.name}</h2>
       
       

        <h2>Menu</h2>
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            <div className='recipe-card'>
              <h2>{recipe.name}</h2>
              <img className='logos' src={recipe.picture} alt='recipe'/>
              <button  onClick={() => {
                    this.props.recipe.quantity = this.state.quantity + this.props.recipe.quantity;
                    this.props.updateTodayFood(this.props.recipe);
                  }}>Add to cart</button>
            </div>
          
          </div>
        ))} 
      </div>
    );
  }
}

export default withAuth(Brand);
