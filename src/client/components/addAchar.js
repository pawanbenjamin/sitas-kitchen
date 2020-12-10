import React from "react";
import { connect } from "react-redux";
import { addAnAchar } from "../store/achars";

class AddAchar extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  async handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const spiceLevel = e.target.spiceLevel.value;
    const stockQty = e.target.stockQty.value;
    const imageUrl = e.target.imageUrl.value;
    this.props.addAchar({
      name,
      price,
      description,
      spiceLevel,
      stockQty,
      imageUrl,
    });
  }

  render() {
    return (
      <div className="addAchar">
        <form onSubmit={this.handleSubmit}>
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

// const mapState = (state) => ({

// });

const mapDispatch = (dispatch) => ({
  addAchar: (achar) => dispatch(addAnAchar(achar)),
});

export default connect(null, mapDispatch)(AddAchar);
