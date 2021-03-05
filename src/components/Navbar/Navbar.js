import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import ImageTest from "./../../../src/assests/images/leaf-logo.png";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn, isAdmin } = this.props;

    return (
      <nav className="navbar flexsb">
        <div className="flex">
          <img src={ImageTest} alt="logo" id="logo" />
          <Link to={"/"} id="home-btn">
            <h4>RESTI-CLUSTER</h4>
          </Link>
        </div>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <>
                <Link
                  to={"/dark-manager"}
                  id="dark-manager-btn"
                  className="nav-link"
                >
                  Dark Manager
                </Link>
              </>
            ) : (
              <> </>
            )}
            <div className="flex">
              <p>
                {user.name.firstName} {user.name.lastName}
              </p>
              <button className="navbar-button button is-success" onClick={logout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex">
            <Link to="/login">
              <button className="navbar-button button is-success">Login</button>{" "}
            </Link>
            <br />
            <Link to="/signup">
              <button className="navbar-button">Sign Up</button>{" "}
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
