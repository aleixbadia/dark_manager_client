import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Brand from './pages/Brand/Brand';

// Components
import Navbar from './components/Navbar/Navbar';
import AnonRoute from './components/AnonRoute/AnonRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          {/*CLIENT ROUTES*/}
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/:userId" component={Profile} />

          <Route exact path="/" component={Home} />
          <Route exact path="/:brandName" component={Brand} />
          <PrivateRoute exact path="/checkout" component={Checkout} />

          {/*EMPLOYEE ROUTES*/}
          <AnonRoute exact path="/dark-manager/login" component={Signup} />
          <PrivateRoute exact path="/dark-manager" component={AdminHome} /> {/*We need to create a new AnonRoute for the employees part*/}
          <PrivateRoute exact path="/dark-manager/orders" component={Orders} />
          <PrivateRoute exact path="/dark-manager/stock" component={Stock} />
          <PrivateRoute exact path="/dark-manager/stats" component={Stats} />
          <PrivateRoute exact path="/dark-manager/create" component={Create} />
          <PrivateRoute exact path="/dark-manager/order/:id" component={OrderDetails} />
          <PrivateRoute exact path="/dark-manager/user/:id" component={UserDetails} />
          <PrivateRoute exact path="/dark-manager/recipe/:id" component={RecipeDetails} />
          <PrivateRoute exact path="/dark-manager/ingridient/:id" component={IngridientDetails} />
          <PrivateRoute exact path="/dark-manager/packaging/:id" component={PackagingDetails} />
          <PrivateRoute exact path="/dark-manager/brand/:id" component={BrandDetails} />


        </Switch>
      </div>
    );
  }
}

export default App;
