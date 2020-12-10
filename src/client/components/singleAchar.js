import React from "react";
import { connect } from "react-redux";
import { fetchAchar } from "../store/singleAchar";

class SingleAchar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAchar(this.props.match.params.id);
  }

  render() {
    return <h3>{this.props.achar.name}</h3>;
  }
}

const mapState = (state) => ({
  achar: state.singleAchar,
});

const mapDispatch = (dispatch) => ({
  getAchar: (id) => dispatch(fetchAchar(id)),
});

export default connect(mapState, mapDispatch)(SingleAchar);
