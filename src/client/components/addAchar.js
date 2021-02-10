import React from "react";
import { connect } from "react-redux";
import { addAnAchar, fetchAchars } from "../store/achars";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    return (
      <div className="addAchar">
        <h3>Welcome Admin! Add and Achar:</h3>
        <form onSubmit={this.handleSubmit} id="addAchar">
          <TextField name="name" placeholder="Name" />

          <TextField name="price" placeholder="Price" />

          <TextField name="description" placeholder="Description" />

          <TextField name="spiceLevel" placeholder="Spice Level" />

          <TextField name="stockQty" placeholder="Stock Qty" />

          <TextField name="imageUrl" placeholder="Image Url" />
          <Button type="submit">Submit</Button>
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
