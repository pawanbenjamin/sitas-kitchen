import React from "react";
import { connect } from "react-redux";
import { fetchAchar } from "../store/singleAchar";
import { deleteTheAchar, updateTheAchar } from "../store/singleAchar";

import UpdateAchar from "./updateAchar";

class SingleAchar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.getAchar(this.props.match.params.id);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const spiceLevel = e.target.spiceLevel.value;
    const stockQty = e.target.stockQty.value;
    const imageUrl = e.target.imageUrl.value;
    await this.props.updateAchar({
      name,
      price,
      description,
      spiceLevel,
      stockQty,
      imageUrl,
      id: this.props.achar.id,
    });
    await this.props.getAchar(this.props.match.params.id);
    const form = document.getElementById("updateAchar");
    form.reset();
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
            <UpdateAchar handleSubmit={this.handleSubmit} />
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
  updateAchar: (achar) => dispatch(updateTheAchar(achar)),
});

export default connect(mapState, mapDispatch)(SingleAchar);
