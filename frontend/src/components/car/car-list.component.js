/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveCars, findCarsByTitle, deleteAllCars } from "../../actions/car.action"
import { setCurrentCar } from "../../actions/car.action";
import { findCommentsByCar } from "../../actions/comment.action";
import { retrieveCommentors } from "../../actions/commentor.action";
import Comment from "../comment/comment.component";

class CarsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllCars = this.removeAllCars.bind(this);
        this.state = {
            currentCar: null,
            currentIndex: -1,
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveCars();
        this.setState({
            currentCar: this.props.currentCar
        });
    }

    onChangeSearchTitle(e) {
        this.setState({
            searchTitle: e.target.value
        })
    }

    refreshData() {
        this.setState({
          currentCar: null,
          currentIndex: -1,
        });
    }

    setActiveCar(car, index) {
        this.setState({
            currentCar: car,
            currentIndex: index
        })
        this.props.setCurrentCar(car._id);
        this.props.findCommentsByCar(car._id);
        this.props.retrieveCommentors(car._id);
    }

    removeAllCars() {
        this.props
        .deleteAllCars()
        .then((response) => {
            console.log(response);
            this.refreshData();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    findByTitle() {
        this.refreshData();
        this.props.findCarsByTitle(this.state.searchTitle);
    }

    render(){
        const { searchTitle, currentCar, currentIndex } = this.state;
        const { cars } = this.props;
        const { auth } = this.props;

        return (
            <div className="container">
                <div className="main row">
                    <div className="search-bar col s12" style={{marginBottom: 20}}>
                        <div className="col s10">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                            />
                        </div>
                        <div className="col s2">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="carlist col s8">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="collection with-header">
                                    <li className="collection-header"><h5>Cars List</h5></li>
                                    {cars &&
                                        cars.map((car, index) => (
                                            <li
                                            className={
                                                "collection-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveCar(car, index)}
                                            key={index}
                                            >
                                            {car.title}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="comment col s4" style={{marginTop: "30px"}}>
                        <div className="details row">
                            <div className="col s12">
                                {currentCar ? (
                                    <div>
                                    <h5>Details</h5>
                                    <div>
                                        <label>
                                        <strong>Title:</strong>
                                        </label>{" "}
                                        {currentCar.title}
                                    </div>
                                    <div>
                                        <label>
                                        <strong>Description:</strong>
                                        </label>{" "}
                                        {currentCar.description}
                                    </div>
                                    <br />
                                    { auth.isAuthenticated && auth.user.name === "admin" ? (
                                        <Link
                                        to={"/cars/" + currentCar._id}
                                        className="waves-effect waves-light btn-small"
                                    >
                                        Edit<i className="material-icons right">edit</i>
                                    </Link>
                                    ) : (
                                        <p></p>
                                    )}
                                    
                                    </div>
                                ) : (
                                    <div>
                                    <br />
                                    <p>Please click on a Car to view details or comment...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="comment-list row">
                            <div className="col s12">
                                {currentCar ? (
                                    <Comment />
                                ) : (
                                <p></p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        cars: state.cars,
        currentCar: state.currentCar
    };
};
  
export default connect(
    mapStateToProps, 
    { 
        retrieveCars, 
        findCarsByTitle, 
        deleteAllCars,
        setCurrentCar ,
        findCommentsByCar,
        retrieveCommentors
    })(CarsList);