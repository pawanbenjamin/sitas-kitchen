import React from "react";
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

import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 100,
    disableRipple: true,
  },
  media: {
    height: 100,
  },
});

class Achars extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getAchars();
    this.props.clearSingle();
    const classes = useStyles();
  }

  async handleDelete(e) {
    e.preventDefault();
    await this.props.deleteAchar(e.target.id);
    await this.props.getAchars();
  }

  render() {
    console.log(this.props.achars);
    return (
      <>
        <Typography>All the Achars</Typography>
        {this.props.achars
          ? this.props.achars.map((achar) => (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={achar.imageUrl} />
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
      </>
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

export default connect(mapState, mapDis)(Achars);
