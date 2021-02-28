import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { logout } from "../store/user";
import { Typography } from "@material-ui/core";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  button: {
    ...theme.typography.tab,
    marginLeft: "2em",
    color: "white",
    opacity: ".7",
  },
  name: {
    ...theme.typography.tab,
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Nav = ({ isLoggedIn, handleClick, value, setValue }) => {
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appBar} position="fixed" justify="row">
          <Button
            className={classes.button}
            component={Link}
            to="/"
            disableRipple
          >
            Sita's Kitchen
          </Button>
          <Toolbar disableGutters className={classes.toolbar}>
            {isLoggedIn ? (
              <Tabs
                className={classes.tabsCont}
                value={value}
                onChange={handleChange}
              >
                <Tab component={Link} to="/" label="Home" />
                <Tab component={Link} to="/achars" label="Achars" />

                <Tab component={Link} to="/cart" label="Cart" />
                <Tab
                  className={classes.button}
                  component={"a"}
                  onClick={handleClick}
                  label="Log Out"
                ></Tab>
              </Tabs>
            ) : (
              <Tabs value={value} onChange={handleChange}>
                <Tab component={Link} to="/" label="Home" />
                <Tab component={Link} to="/achars" label="Achars" />
                <Tab component={Link} to="/cart" label="Cart" />
                <Tab component={Link} to="/signUp" label="Sign Up" />
                <Tab component={Link} to="/login" label="Log In" />
              </Tabs>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
