import React from "react";
import { connect } from "react-redux";
import { fetchAchar, updateTheAchar } from "../store/singleAchar";

export default class UpdateAchar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="updateAchar">
        <form id="updateAchar" onSubmit={this.props.handleSubmit}>
          <label>Name:</label>
          <input name="name"></input>
          <label>Price</label>
          <input name="price"></input>
          <label>Description</label>
          <input name="description"></input>
          <label>Spice Level</label>
          <input name="spiceLevel"></input>
          <label>Stock Quantity:</label>
          <input name="stockQty"></input>
          <label>Image Url:</label>
          <input name="imageUrl"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
