/*react imports*/
import React, { Component } from "react";
import ListView from "./ListView";

//creating list with foursquare API request
class VenueList extends Component {
  render() {
    return (
      <ul className="venueList">
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListView
              key={idx}
              {...venue}
              handleListItem={this.props.handleListItem}
            />
          ))}
      </ul>
    );
  }
}
export default VenueList;
