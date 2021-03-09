import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import ingredientService from "../../services/ingredient-service";
import "./Stock.css";
import { Link } from "react-router-dom";

class Stock extends Component {
  state = {
    ingredients: [],
    isReady: false,
  };

  componentDidMount() {
    this.loadAllIngredients();
  }

  loadAllIngredients = () => {
    ingredientService.getAllIngredients().then((response) => {
      if (response) this.setState({ ingredients: response, isReady: true });
    });
  };

  render() {
    const { ingredients, isReady } = this.state;

    if (!isReady) return <h2>Loading</h2>;
    console.log(ingredients);
    return (
      <div>
        <h1>Current stock:</h1>
        <div>
          <table>
            <tr>
              <th>Ingredient</th>
              <th>Current Stock</th>
              <th>Minimum quantity</th>
            </tr>
            {ingredients.map((ingredient) => (
              <tr key={ingredient._id}>
                <Link to={`/${ingredient._id}`}><td>{ingredient.name}</td></Link>
                <td className={ingredient.currentStock<ingredient.minimum? "red": "green"}>{ingredient.currentStock}</td>
                <td>{ingredient.minimum}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default withAuth(Stock);
