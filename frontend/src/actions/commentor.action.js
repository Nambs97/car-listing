import { 
    RETRIEVE_COMMENTORS,
    GET_ERRORS
} from "./types";
import userService from "../services/user.service";
import commentService from "../services/comment.service";

export const retrieveCommentors = (car_id) => async (dispatch) => {
    try {
        let users = [];
        let usernames = {};
        commentService.findByCar(car_id).then(res => {
            const comments = res.data;
            comments.forEach(comment => {
                users.push(comment.user_id);
            });
            users.forEach(user => {
                userService.get(user).then(res => {
                    usernames[user] = res.data.username
                    //console.log("ACTUAL COMMENTORS : " + JSON.stringify(usernames));
                    dispatch({
                        type: RETRIEVE_COMMENTORS,
                        payload: usernames,
                    });
                })
            })
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    }
    
}