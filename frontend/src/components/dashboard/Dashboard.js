import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onViewClick = e => {
    e.preventDefault();
    this.props.history.push("/cars");
  }

  onAddClick = e => {
    e.preventDefault();
    this.props.history.push("/post-car");
  }
  
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into {" "}
                <span style={{ fontFamily: "monospace" }}>CAR LISTING</span> app 👏
              </p>
              <p className="flow-text grey-text text-darken-1">
                You can see all avalaible cars by clicking "View" or add a new one by the "Post" button :
              </p>
            </h4>
            <button
              style={{
                width: "125px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginRight: "10px"
              }}
              onClick={this.onViewClick}
              className="btn orange lighten-1"
            >
              View<i className="material-icons right">visibility</i>
            </button>
            <button
              style={{
                width: "125px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginLeft: "10px"
              }}
              onClick={this.onAddClick}
              className="btn green accent-3"
            >
              Post<i className="material-icons right">add</i>
            </button>
            <br />
            <br />
            <hr />
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);