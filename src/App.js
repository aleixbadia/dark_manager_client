import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

// Pages - Client
import Login from "./pages-client/Login/Login";
import Signup from "./pages-client/Signup/Signup";
import Profile from "./pages-client/Profile/Profile";
import Home from "./pages-client/Home/Home";
import Brand from "./pages-client/Brand/Brand";
import Checkout from "./pages-client/Checkout/Checkout";

// Pages - Employee
import AdminHome from "./pages-employee/AdminHome/AdminHome";
import Orders from "./pages-employee/Orders/Orders";
import Stock from "./pages-employee/Stock/Stock";
import Stats from "./pages-employee/Stats/Stats";
import Create from "./pages-employee/Create/Create";
import OrderDetails from "./pages-employee/OrderDetails/OrderDetails";
import UserDetails from "./pages-employee/UserDetails/UserDetails";
import RecipeDetails from "./pages-employee/RecipeDetails/RecipeDetails";
import IngredientDetails from "./pages-employee/IngredientDetails/IngredientDetails";
import PackagingDetails from "./pages-employee/PackagingDetails/PackagingDetails";
import BrandDetails from "./pages-employee/BrandDetails/BrandDetails";

// Components
import Navbar from "./components/Navbar/Navbar";
import AnonRoute from "./components/AnonRoute/AnonRoute";
import ClientPrivateRoute from "./components/PrivateRoute/ClientPrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoute/AdminPrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          {/*CLIENT ROUTES*/}
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <ClientPrivateRoute exact path="/checkout" component={Checkout} />
          <ClientPrivateRoute exact path="/profile/:userId" component={Profile} />
          <Route exact path="/:brandName" component={Brand} />
          {/*EMPLOYEE ROUTES*/}
          <AdminPrivateRoute
            exact
            path="/dark-manager"
            component={AdminHome}
          />{" "}
          <AdminPrivateRoute
            exact
            path="/dark-manager/orders"
            component={Orders}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/stock"
            component={Stock}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/stats"
            component={Stats}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/create"
            component={Create}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/order/:id"
            component={OrderDetails}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/user/:id"
            component={UserDetails}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/recipe/:id"
            component={RecipeDetails}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/ingredient/:id"
            component={IngredientDetails}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/packaging/:id"
            component={PackagingDetails}
          />
          <AdminPrivateRoute
            exact
            path="/dark-manager/brand/:id"
            component={BrandDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
