import React from "react";

export default class UpdateAchar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="updateAchar">
        <form id="updateAchar" onSubmit={this.props.handleSubmit}>
          <input name="name" placeholder="Name"></input>

          <input name="price" placeholder="Price"></input>

          <input name="description" placeholder="Description"></input>

          <input name="spiceLevel" placeholder="Spice Level"></input>

          <input name="stockQty" placeholder="Stock Qty"></input>

          <input name="imageUrl" placeholder="Image URL"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
