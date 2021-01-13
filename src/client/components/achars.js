import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAchars } from "../store/achars";
import { deleteTheAchar, clearAchar } from "../store/singleAchar";

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
    console.log(this.props.achars);
    return (
      <div className="achars">
        <h3>All the Achars</h3>
        {this.props.achars
          ? this.props.achars.map((achar) => (
              <div key={achar.id}>
                <h3>{achar.name}</h3>
                <Link to={`/achars/${achar.id}`}>View</Link>
                {/* <button id={achar.id} onClick={this.handleDelete}>
                  Delete from DB
                </button> */}
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  achars: state.achars,
});

const mapDis = (dispatch) => ({
  getAchars: () => dispatch(fetchAchars()),
  deleteAchar: (id) => dispatch(deleteTheAchar(id)),
  clearSingle: () => dispatch(clearAchar()),
});

export default connect(mapState, mapDis)(Achars);
