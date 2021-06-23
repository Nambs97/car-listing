import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postComment, findCommentsByCar } from "../../actions/comment.action";
import { retrieveCommentors } from "../../actions/commentor.action";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onPostComment = this.onPostComment.bind(this);

        this.state = {
            currentCar: null,
            comments: {},
            newComment: ""
        }
    }

    componentDidMount() {
        if (this.props.currentCar) {
            this.props.findCommentsByCar(this.props.currentCar._id);
        }
    }

    onChangeComment(e) {
        this.setState({
            newComment: e.target.value
        })
    }

    onPostComment(e) {
        e.preventDefault();
        if (this.state.newComment !== "") {
            let commentData = {
                user_id: this.props.auth.user.id,
                car_id: this.props.currentCar._id,
                content: this.state.newComment
            }
            this.props.postComment(commentData);
            this.setState({
                newComment: ""
            })
        }
    }

    render() {
        const isAuthenticated = this.props.auth.isAuthenticated;
        const comments = this.props.comments;
        const newComment = this.state.newComment;
        const commentors = this.props.commentors;
          
        return (
            <div className="main-comment">
                {isAuthenticated ? (
                    <>
                        <ul className="collection with-header">
                            <li className="collection-header"><h5>Comments</h5></li>
                            {comments.length === 0 ? (
                                <p style={{textAlign: "center"}}>Be the first to comment this car</p>
                            ) : (
                                <p></p>
                            )}
                            {comments &&
                                comments.map((comment, index) => (
                                    <li 
                                    className="collection-item avatar"
                                    key={index}>
                                        <i className="material-icons circle green">account_circle</i>
                                        <span className="title" style={{fontWeight: "bold"}}>{ commentors ? (commentors.payload[comment.user_id]) : ((comment.user_id).substring(0,6)) }</span>
                                        <p style={{marginTop: "10px"}}>
                                            {comment.content}
                                        </p>
                                        <a href="#!" className="secondary-content"><i className="material-icons">insert_emoticon</i></a>
                                    </li>
                                ))}
                        </ul>
                        <div className="comment-form row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea 
                                            id="icon_prefix2" 
                                            className="materialize-textarea"
                                            value={ newComment }
                                            onChange={this.onChangeComment}></textarea>
                                        <label htmlFor="icon_prefix2">Your comment</label>
                                        <a href="#!" onClick={this.onPostComment}><i className="material-icons prefix">send</i></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>
                        Please <Link to="/login">Log in</Link> to view comments on this post !
                    </p> 
                )}
                                
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      currentCar: state.currentCar,
      comments: state.comments,
      auth: state.auth,
      commentors: state.commentors
    };
};

export default connect(
    mapStateToProps,
    {
        postComment,
        findCommentsByCar,
        retrieveCommentors
    }
)(Comment);