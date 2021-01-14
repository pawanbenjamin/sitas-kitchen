import React from "react";
import { connect } from "react-redux";
import { addAnAchar, fetchAchars } from "../store/achars";

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
    await this.props.addAchar({
      name,
      price,
      description,
      spiceLevel,
      stockQty,
      imageUrl,
    });
    await this.props.getAchars();
    const form = document.getElementById("addAchar");
    form.reset();
  }

  render() {
    console.log(this.props.user);

    return (
      <div className="addAchar">
        <h3>Add an Achar!</h3>
        <form onSubmit={this.handleSubmit} id="addAchar">
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

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  addAchar: (achar) => dispatch(addAnAchar(achar)),
  getAchars: () => dispatch(fetchAchars()),
});

export default connect(mapState, mapDispatch)(AddAchar);
