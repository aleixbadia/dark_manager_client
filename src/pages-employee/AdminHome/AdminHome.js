import React, { Component } from "react";
import "./AdminHome.css";
import { Link } from "react-router-dom";

export class AdminHome extends Component {
  state = {
    services: ["orders", "stock", "stats", "create"],
  };

  render() {
    const { services } = this.state;

    return (
      <div className="services">
        {services.map((service) => (
          <div key={service} className="title">
            <Link className="title-link" to={`/dark-manager/${service}`}>
              <h2 className="title-text">{service.toUpperCase()}</h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default AdminHome;
