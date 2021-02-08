import React from "react";
import { Link, withRouter } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    maxWidth: 150,
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
  }

  async handleDelete(e) {
    e.preventDefault();
    await this.props.deleteAchar(e.target.id);
    await this.props.getAchars();
  }

  render() {
    const classes = useStyles;
    console.log(this.props.achars);
    return (
      <div className="achars">
        <Typography>All the Achars</Typography>
        {this.props.achars
          ? this.props.achars.map((achar) => (
              <div key={achar.id} className="card">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={achar.imageUrl}
                      style={{ height: 0, width: "30 vw", paddingTop: "55%" }}
                    />
                    <CardContent>
                      <Typography>{achar.name}</Typography>
                      <Typography>{`$${achar.price / 100}`}</Typography>
                      <Link to={`/achars/${achar.id}`}>View</Link>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
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

export default connect(mapState, mapDis)(Achars);
