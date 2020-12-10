import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAchars } from "../store/achars";

class Achars extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAchars();
  }

  render() {
    return (
      <div>
        <h3>All the Achars</h3>
        {this.props.achars
          ? this.props.achars.map((achar) => (
              <h3 key={achar.id}>{achar.name}</h3>
            ))
          : null}
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapState = (state) => ({
  achars: state.achars,
});

const mapDis = (dispatch) => ({
  getAchars: () => dispatch(fetchAchars()),
});

export default connect(mapState, mapDis)(Achars);
