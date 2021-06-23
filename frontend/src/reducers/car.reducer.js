import {
    POST_CAR,
    RETRIEVE_CARS,
    UPDATE_CAR,
    DELETE_CAR,
    DELETE_ALL_CARS
  } from "../actions/types";

const initialState = [];

function carReducer(cars = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case POST_CAR:
            return [...cars, payload];

        case RETRIEVE_CARS:
            return payload;

        case UPDATE_CAR:
            return cars.map((car) => {
                if (car.id === payload.id) {
                  return {
                    ...car,
                    ...payload,
                  };
                } else {
                  return car;
                }
            });

        case DELETE_CAR:
            return cars.filter(({ id }) => id !== payload.id);
        
        case DELETE_ALL_CARS:
            return [];

        default:
            return cars;
    }
}

export default carReducer;