import React, { Component } from "react";
import { connect } from "react-redux";
import carService from "../../services/car.service";
import { updateCar, setCurrentCar } from "../../actions/car.action";

class Car extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getCarToShow = this.getCarToShow.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);

        this.state = {
            currentCar: {
                id: "",
                title: "",
                description: ""
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getCarToShow(this.props.match.params.id);
    }

    onChangeTitle(e) {
        let newCurrentCar = this.state.currentCar;
        const newTitle = e.target.value;
        newCurrentCar.title = newTitle;
        this.setState({
            currentCar: newCurrentCar
        });
    }

    onChangeDescription(e) {
        let newCurrentCar = this.state.currentCar;
        const newDescription = e.target.value;
        newCurrentCar.description = newDescription;
        this.setState({
            currentCar: newCurrentCar
        });
    }

    getCarToShow(id) {
        let newCurrentCar = this.state.currentCar;
        carService.get(id)
        .then((carToShow) => {
            newCurrentCar.id = carToShow.data._id;
            newCurrentCar.title = carToShow.data.title;
            newCurrentCar.description = carToShow.data.description;
            this.setState({
                currentCar: newCurrentCar
            })
            console.log("Car to show : " + JSON.stringify(newCurrentCar));
        })
        .catch((e) => {
            console.log("Error on retrieving car : " + e);
        })
    }

    onCancelClick(e) {
        //this.props.history.push('/cars');
        this.props.history.goBack();
    }

    onUpdateClick(e) { 
        const updatedCar = {
            title: this.state.currentCar.title,
            description: this.state.currentCar.description
        }
        this.props.updateCar(this.state.currentCar.id,  updatedCar);
        this.props.setCurrentCar(this.state.currentCar.id);
        this.setState({
            message: "Mise à jour effectuée avec succès !"
        });
    }

    render() {
        const { currentCar, message } = this.state;

        return (
            <div className="container">
                <h3>Car View</h3>
                <div className="input-field col s12">
                    <input
                    id="title"
                    type="text"
                    className=""
                    value={ currentCar.title }
                    onChange={ this.onChangeTitle }
                    />
                    <label htmlFor="title">Title</label>
                    <span className="red-text"></span>
                </div>
                <div className="input-field col s12">
                    <input
                    id="description"
                    type="text"
                    className=""
                    value={ currentCar.description }
                    onChange={ this.onChangeDescription }
                    />
                    <label htmlFor="description">Description</label>
                    <span className="red-text"></span>
                </div>
                <p>{ message }</p>
                <button
                    style={{
                        width: "125px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        marginRight: "10px"
                    }}
                    onClick={this.onCancelClick}
                    className="btn red lighten-1"
                    >
                    Cancel<i className="material-icons right">cancel</i>
                </button>
                <button
                    style={{
                        width: "125px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        marginRight: "10px"
                    }}
                    onClick={this.onUpdateClick}
                    className="btn green lighten-1"
                    >
                    Update<i className="material-icons right">save</i>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      currentCar: state.currentCar,
    };
  };
  
export default connect(
    mapStateToProps, 
    { 
        updateCar,
        setCurrentCar 
    }
)(Car);