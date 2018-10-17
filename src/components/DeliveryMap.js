import React, { Component } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import jsonp from "jsonp";

class DeliveryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: undefined,
      lng: undefined
    };
  }
  componentDidMount() {
    // let address = this.props.address.replace(/ /g, "+");
    // let url =
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //   address +
    //   "&key=";
    // console.log("url", url);
    // jsonp(url, response => console.log(JSON.parse(response.data)));
  }
  render() {
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <Map
          style={{
            width: "90%",
            height: "400px",
            margin: "50px auto"
          }}
          google={this.props.google}
          zoom={12}
          center={{
            lat: 33.6866447,
            lng: -117.8435997
          }}
        >
          <Marker name={"current location"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(DeliveryMap);
