/* necessary imports for the project here*/
import React, { Component } from "react";
import VenueList from "./VenueList";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  //filtering of the markers on the map
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  //cross checking of the search query
  handleChange = event => {
    this.setState({ query: event.target.value });

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };
  //the sidemenu that contains information about the restaurant of indore
  render() {
    return (
      <div className="sidebar">
      <div className="marker-list">
      <div className="filters"><input tabIndex={0}
          id="search" type="text" onChange={this.handleChange} placeholder="Filter"/></div>
    <div>
        <VenueList
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItem={this.props.handleListItem}
        />
         </div>
        </div>
      </div>
    );
  }
}
export default SideBar;
