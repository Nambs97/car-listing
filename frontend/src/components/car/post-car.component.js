import React, { Component } from "react";
import { Link } from "react-router-dom";
import { postCar } from "../../actions/car.action";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PostCar extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveCar = this.saveCar.bind(this);
        this.newCar = this.newCar.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            submitted: false,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    saveCar(e) {
        e.preventDefault();
        const carData = {
          title: this.state.title,
          description: this.state.description
        };
        console.log(carData);
        this.props.postCar(carData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      };

    newCar() {
        this.setState({
            id: null,
            title: "",
            description: "",
            submitted: false
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Post a Car</b> below
                    </h4>
                </div>
                <form noValidate onSubmit={this.saveCar}>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChangeTitle}
                    value={this.state.title || ''}
                    id="title"
                    type="text"
                    className={classnames("", {
                        invalid: errors.title
                    })}
                    />
                    <label htmlFor="title">Title</label>
                    <span className="red-text">{errors.title}</span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={this.onChangeDescription}
                    value={this.state.description || ''}
                    id="description"
                    type="text"
                    className={classnames("", {
                        invalid: errors.description
                    })}
                    />
                    <label htmlFor="description">Description</label>
                    <span className="red-text">
                        {errors.description}
                    </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Post
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        );
    }

}

PostCar.propTypes = {
    postCar: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { postCar }
  )(PostCar);