import { 
    POST_COMMENT,
    RETRIEVE_COMMENTS
} from "../actions/types";

let initialState = [];

function commentReducer(comments = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case POST_COMMENT:
            return [...comments, payload];
        
        case RETRIEVE_COMMENTS:
            return payload;

        default:
            return comments;
    }
}

export default commentReducer;