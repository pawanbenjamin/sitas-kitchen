import React, { useEffect } from "react";
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
  Grid,
} from "@material-ui/core";

import { mergeClasses, withStyles } from "@material-ui/styles";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    toolbar: theme.mixins.toolbar,
  },
}));

const Achars = ({ achars, user, getAchars, clearSingle, deleteAchar }) => {
  const classes = useStyles();

  useEffect(() => {
    getAchars();
    clearSingle();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteAchar(e.target.id);
    await getAchars();
  };

  return (
    <Grid container className={classes.container}>
      <Typography className="desc">All the Achars</Typography>
      <Grid container className="achars">
        {achars.length > 1
          ? achars.map((achar) => (
              <Grid item component={Link} to={`/achars/${achar.id}`}>
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
              </Grid>
            ))
          : null}
        <Grid>{user.isAdmin ? <AddAchar /> : null}</Grid>
      </Grid>
    </Grid>
  );
};

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
