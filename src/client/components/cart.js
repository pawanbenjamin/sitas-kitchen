import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { fetchAchars } from "../store/achars";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { fetchAchar } from "../store/singleAchar";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      guestCart: {},
    };
  }
  componentDidMount() {
    this.props.getAchars();
    if (!this.props.user.id) {
      const localCart = JSON.parse(window.localStorage.getItem("cart"));
      console.log("Local Cart----->", localCart);
      this.setState({ guestCart: localCart });
      for (let item in localCart) {
        let itemId = item.id;
        let qty = localCart[item];
      }
    } else {
      this.props.getCart(this.props.user.id);
    }
  }

  render() {
    let achars = this.props.cart.achars;
    let allAchars = this.props.achars;
    console.log("guestCart", this.state.guestCart);
    return (
      <>
        {achars !== undefined ? (
          achars.map((achar) => (
            <Card key={achar.id}>
              <CardActionArea>
                <CardMedia image={achar.imageUrl} />
                <CardContent>
                  <Typography>{achar.name}</Typography>
                  <Typography>${achar.price}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : 
        
        ?

        {   
          

        }
        
        :
        (
          <Typography style={{ textAlign: "center" }}>
            Your cart is Empty!
          </Typography>
        )}
      </>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  cart: state.cart,
  achars: state.achars,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  getAchars: () => dispatch(fetchAchars()),
});

export default connect(mapState, mapDispatch)(Cart);
