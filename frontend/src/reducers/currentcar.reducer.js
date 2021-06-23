import { SET_CURRENT_CAR } from "../actions/types";

const initialState = null;

function currentCarReducer(currentCar = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_CAR:
            return payload;

        default:
            return currentCar;
    }
}

export default currentCarReducer;