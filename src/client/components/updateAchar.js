import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class UpdateAchar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.user ? (
          <div className="updateAchar">
            <Button onClick={this.props.handleDelete}>
              {" "}
              ** Delete from DB **
            </Button>
            <form id="updateAchar" onSubmit={this.props.handleSubmit}>
              <TextField name="name" placeholder="Name"></TextField>

              <TextField name="price" placeholder="Price"></TextField>

              <TextField
                name="description"
                placeholder="Description"
              ></TextField>

              <TextField
                name="spiceLevel"
                placeholder="Spice Level"
              ></TextField>

              <TextField name="stockQty" placeholder="Stock Qty"></TextField>

              <TextField name="imageUrl" placeholder="Image URL"></TextField>
              <Button style={{ marginTop: "25px" }} type="submit">
                Submit
              </Button>
            </form>
          </div>
        ) : null}
      </>
    );
  }
}
