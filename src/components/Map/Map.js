import React, { Component } from "react";
import "./Map.css";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxlaXhiYWRpYSIsImEiOiJja20zYmI3emgyZzEzMm9vNng1dGE0ZHlnIn0.lns4HkC-kSmLr9YCZpiG3g";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 2.0195,
      lat: 41.5633,
      zoom: 12,
    };
    this.mapContainer = React.createRef();
    this.cooking = this.props.cooking
    this.delivery = this.props.delivery
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    
    console.log(this.props.cooking);
    
    this.props.cooking.forEach((marker) => {
      let popup = new mapboxgl.Popup().setText(`${marker.name}`).addTo(map);
      new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat(marker.coordinates)
        .addTo(map)
        .setPopup(popup);
    });
    this.props.delivery.forEach((marker) => {
      let popup = new mapboxgl.Popup().setText(`${marker.name}`).addTo(map);
      new mapboxgl.Marker({ color: "#00ff00" })
        .setLngLat(marker.coordinates)
        .addTo(map)
        .setPopup(popup);
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }
  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default Map;
