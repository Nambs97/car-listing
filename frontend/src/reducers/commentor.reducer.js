import { RETRIEVE_COMMENTORS } from "../actions/types";

const initialState = null;

function retrieveCommentorsReducer(commentors = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_COMMENTORS:
            return {...commentors, payload};

        default:
            return commentors;
    }
}

export default retrieveCommentorsReducer;