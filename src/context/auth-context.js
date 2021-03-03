import React from "react";
import authService from "../services/auth-service";

const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null,
  };

  componentDidMount() {
    authService
      .me()
      .then((user) =>
        this.setState({ isLoggedIn: true, user, isLoading: false })
      )
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null, isLoading: false });
        console.log("auth-context - DidMount error => ", err);
      });
  }

  signup = (username, password) => {
    authService
      .signup(username, password)
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
        console.log("auth-context - signup error => ", err);
      });
  };

  login = (username, password) => {
    authService
      .login(username, password)
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
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
          const { isLoggedIn, isLoading, user, signup, login, logout } = value;

          return (
            <WrappedComponent
              isLoggedIn={isLoggedIn}
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