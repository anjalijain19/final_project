/*importing the necessary components*/
import React, { Component } from "react";

class ListView extends Component {
  onClickHandler = event => {
    if (event.key === "Enter" || event.type === "click") {
      this.props.handleListItem(this.props);
    }
  };
  render() {
    return (
      <li
        tabIndex={0}
        className="restaurant-li"
        aria-labelledby="sideList"
        onClick={this.onClickHandler}
      >
        {this.props.name}
      </li>
    );
  }
}
export default ListView;
