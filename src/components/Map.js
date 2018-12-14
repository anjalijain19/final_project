/* global google */
/*importing the required react components for this project*/
import React, { Component } from "react";
import mainLogo from "../nmap.png";
//import SelectBox from "./SelectBox";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

//rendering the infowindow and the marker as this will contain all the required information about the query
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8} //zoom level of the map
      zoom={props.zoom}
      defaultCenter={{ lat: 22.719568, lng: 75.857727 }}
      //latitude and longitude of Indore
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, id, markerCount) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );
            return (
              <Marker
                icon={mainLogo}
                key={id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarker(marker)}
                //the marker animations for project
                animation={
                  markerCount.length === 1
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >
                {marker.isOpen && (
                  <InfoWindow
                    onCloseClick={() => {
                      props.closeAllMarkers();
                    }}
                  >
                    <div className="info-window">
                      <h1> {venueInfo.name} </h1>
                      <p>{venueInfo.location.formattedAddress}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

//Checking for the authFailure and if it happens then render map with the Marker and the InfoWindow
class Map extends Component {
  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
  }
  gm_authFailure = () => {
    this.props.authFailure(
      "Authentication Failed :( Check your console for more info"
    );
  };
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlVQa0ULPTQu1LBd60c_jPEZQsWEY7xA0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
export default Map;
