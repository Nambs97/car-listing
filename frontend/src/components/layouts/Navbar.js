import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    this.props.logoutUser();
  }

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    return (
      <div className="navbar-fixed" style={{
        marginBottom: "20px"
      }}>
        <nav>
          <div className="nav-wrapper white">
            <Link
                to="/"
                style={{
                  fontFamily: "monospace",
                  marginLeft: "10px"
                }}
                className="col s5 brand-logo left black-text"
              >
                <i className="material-icons">directions_car</i>
                CAR LISTING
            </Link>
            <ul className="right">
            {isAuthenticated ? (
              <>
                <li><Link className="black-text" to="/post-car"><i className="material-icons left black-text">add_circle</i>Post new car</Link></li>
                <li><a className="black-text" href="#!" onClick={this.onLogoutClick}><i className="material-icons left black-text">exit_to_app</i>Logout</a></li>
              </>
            ) : (
              <li><Link className="black-text" to="/login"><i className="material-icons left black-text">lock</i>Login</Link></li>
            )}
              
            </ul>
          </div>
        </nav> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);