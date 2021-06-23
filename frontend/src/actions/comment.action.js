import { 
    POST_COMMENT,
    RETRIEVE_COMMENTS,
    GET_ERRORS
} from "./types";
import commentService from "../services/comment.service";

export const postComment = (commentData) => dispatch => {
    commentService.create(commentData)
    .then(res => {
        dispatch({
            type: POST_COMMENT,
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
    })
}

/*async function getUsersForComments(comments) {
    let usernames = {};
    comments.forEach(comment => {
        let user_id = comment.user_id;
        userService.get(user_id).then(res => {
            usernames[user_id] = res.data.username;
            console.log("RETRIEVED USERNAMES ==> " + JSON.stringify(usernames));
        })
    });
}*/

export const findCommentsByCar = (car_id) => async (dispatch) => {
    try {
        const res = await commentService.findByCar(car_id);
        /*res.data.forEach(comment => {
            let user_id = comment.user_id;
            userService.get(user_id).then(res => {
                usernames[user_id] = res.data.username;
                console.log("RETRIEVED USERNAMES ==> " + JSON.stringify(usernames));
                dispatch({
                    type: RETRIEVE_COMMENTS,
                    payload: {
                        list: res.data,
                        usernames: usernames
                    }
                });
            })
        });*/
        
        dispatch({
            type: RETRIEVE_COMMENTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
    
}