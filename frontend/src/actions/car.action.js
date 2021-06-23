import {
    POST_CAR,
    RETRIEVE_CARS,
    UPDATE_CAR,
    DELETE_CAR,
    DELETE_ALL_CARS,
    GET_ERRORS,
    SET_CURRENT_CAR
  } from "./types";
import carService from "../services/car.service";

// Post a new car
export const postCar = (carData, history) => dispatch => {
    carService.create(carData)
    .then(res => {
        history.push('/cars'); // re-direct to car list on successful post
        dispatch({
            type: POST_CAR,
            payload: res.data
        })
    })
    .catch(error => {
        let err;
        if (error.response) {
            // Request made and server responded
            err = error.response.data;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            err = error.request;
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            err = error.message
            console.log('Error', error.message);
          }
        dispatch({
            type: GET_ERRORS,
            payload: err
          })
    });
}

// Get all saved cars
export const retrieveCars = () => async (dispatch) => {
    try {
      const res = await carService.getAll();
  
      dispatch({
        type: RETRIEVE_CARS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

// Update a car by ID
export const updateCar = (id, carData) => async (dispatch) => {
    try {
        const res = await carService.update(id, carData);

        dispatch({
            type: UPDATE_CAR,
            payload: carData
        })
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}


// Delete a car by ID
export const deleteCar = (id) => async (dispatch) => {
    try {
      await carService.delete(id);
  
      dispatch({
        type: DELETE_CAR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
};

// Delete all cars
export const deleteAllCars = () => async (dispatch) => {
    try {
      const res = await carService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_CARS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

// Retrieve cars by Title
export const findCarsByTitle = (title) => async (dispatch) => {
    try {
      const res = await carService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_CARS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

// Retrieve cars by Description
export const findCarsByDescription = (description) => async (dispatch) => {
    try {
      const res = await carService.findByDescription(description);
  
      dispatch({
        type: RETRIEVE_CARS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

// Retrieve cars by Title and Description
export const findCarsByTitleAndDescription = (title, description) => async (dispatch) => {
    try {
      const res = await carService.findByTitleAndDescription(title, description);
  
      dispatch({
        type: RETRIEVE_CARS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

// Set current/active car
export const setCurrentCar = (id) => async (dispatch) => {
    try {
      const res = await carService.get(id);
  
      dispatch({
        type: SET_CURRENT_CAR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};