import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import fourSquare from "./API/";
import SideBar from "./components/SideBar";
import logo from './app-logo.png';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      zoom: 15,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      markers: Object.assign(this.state.markers, markers)
    });
  };

  handleMarker = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    //helps in copying marker into the state as given here
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    fourSquare.getVenue(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };
  //filtering the list of the venue to be displayed
  handleListItem = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarker(marker);
  };

togglesidebar = () => {
  let element = document.getElementById("main");
  if(element)
    element.classList.toggle("ml-main");
}
  //fetching the marker positions
  componentDidMount() {
    fourSquare
      .search({
        near: "indore",
        query: "restaurant", //displaying 15 restaurant of Indore
        limit: 20
      })
      .then(results => {
        const { venues } = results.response;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        // console.log(center);
        this.setState({ venues, markers });
      })
      .catch(function(err) {
        alert(
          `Uh oh some error occurred while fetching the requested data from the server, app may misbehave: ${err}`
        );
      });
  }
  render() {
    return (
        <div className="App">
      <header className="app-header">
      <div className="app-logo">
      <div className="logo"><img src={logo} width="50" height="50" alt="neighbourhood map logo"/></div>
      <div className="app-title"><span>Neighborhood Map</span></div>
  </div>
  <div className="menu-container" onClick={this.togglesidebar}>
<div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
    </div>
    </header>
    <div className="app-body">
        <SideBar {...this.state} handleListItem={this.handleListItem} />
<main id="main" className="main ml-main">
    <div id="map">
        <Map
          role="main"
          {...this.state}
          handleMarker={this.handleMarker}
          closeAllMarkers={this.closeAllMarkers}
        />
</div></main></div>
</div>
    );
  }
}
export default App;
