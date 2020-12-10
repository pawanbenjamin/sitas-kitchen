import React from "react";
import { connect } from "react-redux";
import { fetchAchar } from "../store/singleAchar";
import { deleteTheAchar } from "../store/singleAchar";

class SingleAchar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      isDeleted: false,
    };
  }

  componentDidMount() {
    this.props.getAchar(this.props.match.params.id);
  }

  async handleDelete(e) {
    e.preventDefault();
    await this.props.deleteAchar(this.props.match.params.id);
    await this.props.getAchar(this.props.match.params.id);
    this.setState({
      isDeleted: true,
    });
  }

  render() {
    const { achar } = this.props;
    return (
      <div className="singleAchar">
        {this.state.isDeleted ? (
          <h3>No Product!</h3>
        ) : (
          <div>
            <img src={achar.imageUrl} height={150} width={150} />
            <h3>{achar.name}</h3>
            <p>{achar.description}</p>
            <h4>Price: ${achar.price / 100}</h4>
            <button onClick={this.handleDelete}>Delete from DB</button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  achar: state.singleAchar,
});

const mapDispatch = (dispatch) => ({
  getAchar: (id) => dispatch(fetchAchar(id)),
  deleteAchar: (id) => dispatch(deleteTheAchar(id)),
});

export default connect(mapState, mapDispatch)(SingleAchar);
