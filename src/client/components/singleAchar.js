import React from "react";
import { connect } from "react-redux";
import { fetchAchar } from "../store/singleAchar";
import { deleteTheAchar } from "../store/achars";

class SingleAchar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getAchar(this.props.match.params.id);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteAchar(this.props.match.params.id);
  }

  render() {
    const { achar } = this.props;
    return (
      <div className="singleAchar">
        <img src={achar.imageUrl} height={150} width={150} />
        <h3>{achar.name}</h3>
        <p>{achar.description}</p>
        <h4>Price: ${achar.price / 100}</h4>
 
      </div>
    );
  }
}

const mapState = (state) => ({
  achar: state.singleAchar,
});

const mapDispatch = (dispatch) => ({
  getAchar: (id) => dispatch(fetchAchar(id)),
});

export default connect(mapState, mapDispatch)(SingleAchar);
