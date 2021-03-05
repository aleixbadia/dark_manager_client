import React, { Component } from "react";
import userService from "../../services/user-service";

// userService.getAllUsers()
export class Home extends Component {
  state = {
    users: [],
    isReady: false,
  };

  componentDidMount() {
    this.loadAllUsers();
  }

  loadAllUsers = () => {
    userService.getAllUsers().then((response) => {
      console.log("response", response);
      if(response) this.setState({ users: response, isReady: true });
    });
  };

  render() {
    const { users, isReady } = this.state;

    if (!isReady) return <h2>Loading</h2>;

    return (
      <div>
        <h1>Users List</h1>
        {users.map((user) => (
          <div key={user._id}>
            <h2>
              {user.name.firstName} {user.name.lastName}
            </h2>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
