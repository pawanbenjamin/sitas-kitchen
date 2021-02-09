import React from "react";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAchars } from "../store/achars";
import { deleteTheAchar, clearAchar } from "../store/singleAchar";
import AddAchar from "./addAchar";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";

const styles = () => ({});

class Achars extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getAchars();
    this.props.clearSingle();
  }

  async handleDelete(e) {
    e.preventDefault();
    await this.props.deleteAchar(e.target.id);
    await this.props.getAchars();
  }

  render() {
    return (
      <div className="achars">
        <Typography className="desc">All the Achars</Typography>
        {this.props.achars
          ? this.props.achars.map((achar) => (
              <Card
                key={achar.id}
                className="achar-card"
                style={{ disableRipple: true }}
              >
                <CardActionArea>
                  <CardMedia
                    style={{ height: "100px", padding: "20px" }}
                    image={achar.imageUrl}
                  />
                  <CardContent>
                    <Typography>{achar.name}</Typography>
                    <Typography>{`$${achar.price / 100}`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={`/achars/${achar.id}`}>
                      Details
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            ))
          : null}
        <div>{this.props.user.isAdmin ? <AddAchar /> : null}</div>
      </div>
    );
  }
}

const mapState = (state) => ({
  achars: state.achars,
  user: state.user,
});

const mapDis = (dispatch) => ({
  getAchars: () => dispatch(fetchAchars()),
  deleteAchar: (id) => dispatch(deleteTheAchar(id)),
  clearSingle: () => dispatch(clearAchar()),
});

export default compose(connect(mapState, mapDis), withStyles(styles))(Achars);
