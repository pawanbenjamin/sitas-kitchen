import React from "react";
import { connect } from "react-redux";
import { fetchAchar } from "../store/singleAchar";
import { fetchAchars } from "../store/achars";
import { deleteTheAchar, updateTheAchar } from "../store/singleAchar";
import { addToCart, fetchCart } from "../store/cart";
import Paper from "@material-ui/core/Paper";

import UpdateAchar from "./updateAchar";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class SingleAchar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.props.getAchar(this.props.match.params.id);
    this.props.getAchars();
  }
  async handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const spiceLevel = e.target.spiceLevel.value;
    const stockQty = e.target.stockQty.value;
    const imageUrl = e.target.imageUrl.value;
    await this.props.updateAchar({
      name,
      price,
      description,
      spiceLevel,
      stockQty,
      imageUrl,
      id: this.props.achar.id,
    });
    await this.props.getAchar(this.props.match.params.id);
    const form = document.getElementById("updateAchar");
    form.reset();
  }

  async handleDelete(e) {
    e.preventDefault();
    await this.props.deleteAchar(this.props.match.params.id);
    await this.props.getAchar(this.props.match.params.id);
    this.setState({
      isDeleted: true,
    });
  }

  async handleAdd(e) {
    e.preventDefault();
    console.log(window.localStorage.cart);
    if (!this.props.user.id) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      if (!cart[this.props.achar.id]) {
        cart[this.props.achar.id] = 1;
      } else {
        cart[this.props.achar.id]++;
      }
      const stringedCart = JSON.stringify(cart);
      window.localStorage.setItem("cart", stringedCart);
    }
    if (this.props.user.id) {
      await this.props.getCart(this.props.user.id);
      await this.props.addToTheCart(this.props.achar.id, this.props.cart.id);
      await this.props.getCart(this.props.user.id);
      await this.props.getAchars();
    }
    // }
    // }
  }

  render() {
    const { achar, cart } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {this.state.isDeleted ? (
          <Typography className="singleAchar">No Product!</Typography>
        ) : (
          <Paper
            style={{ borderRadius: "10px" }}
            style={{
              marginTop: "4em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 300,
            }}
          >
            <img src={achar.imageUrl} height={150} width={150} />
            <Typography>{achar.name}</Typography>

            <Button onClick={this.handleAdd}>Add to Cart</Button>

            <Typography>{achar.description}</Typography>
            <Typography>Price: ${achar.price / 100}</Typography>

            <UpdateAchar
              handleDelete={this.handleDelete}
              user={this.props.user}
              handleSubmit={this.handleSubmit}
            />
          </Paper>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  achar: state.singleAchar,
  cart: state.cart,
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  getAchar: (id) => dispatch(fetchAchar(id)),
  getAchars: () => dispatch(fetchAchars()),
  deleteAchar: (id) => dispatch(deleteTheAchar(id)),
  updateAchar: (achar) => dispatch(updateTheAchar(achar)),
  addToTheCart: (acharId, orderId) => dispatch(addToCart(acharId, orderId)),
});

export default connect(mapState, mapDispatch)(SingleAchar);
