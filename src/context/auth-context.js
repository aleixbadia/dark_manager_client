import React from "react";
import authService from "../services/auth-service";

const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isAdmin: false,
    isLoading: true,
    user: null,
  };

  componentDidMount() {
    authService
      .me()
      .then((user) => {
        if (user.role === "client") {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: false,
            isLoading: false,
          });
        } else {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: true,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null, isLoading: false });
        console.log("auth-context - DidMount error => ", err);
      });
  }

  signup = (
    role,
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    city,
    postCode,
    profilePic
  ) => {
    authService
      .signup(
        role,
        firstName,
        lastName,
        email,
        password,
        phone,
        street,
        city,
        postCode,
        profilePic
      )
      .then((user) => {
        if (user.role === "client") {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: false,
          });
        } else {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: true,
          });
        }
      })
      .catch((err) => {
        console.log("auth-context - signup error => ", err);
      });
  };

  login = (email, password) => {
    authService
      .login(email, password)
      .then((user) => {
        if (user.role === "client") {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: false,
          });
        } else {
          this.setState({
            user,
            isLoggedIn: true,
            isAdmin: true,
          });
        }
      })
      .catch((err) => {
        console.log("auth-context - login error => ", err);
      });
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log("auth-context - logout error => ", err));
  };

  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return (
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout }}>
        {this.props.children}
      </Provider>
    );
  }
}

// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  return function (props) {
    return (
      <Consumer>
        {(value) => {
          const { isLoggedIn, isAdmin, isLoading, user, signup, login, logout } = value;

          return (
            <WrappedComponent
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              isLoading={isLoading}
              user={user}
              signup={signup}
              login={login}
              logout={logout}
              {...props}
            />
          );
        }}
      </Consumer>
    );
  };
};

export { AuthProvider, withAuth };
