import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from "../../store/actions";

class PostItem extends Component{
    onDeleteClick = id => {
        this.props.onDeletePost(id);
    };

    onLikeClick = id => {
        this.props.onAddLike(id);
    };

    onUnlikeClick = id => {
        this.props.onRemoveLike(id);
    };

    findUserLike = (likes) => {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false
        }
    };

    render() {
        const {post, auth, showActions} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block"
                                 src={post.avatar}
                                 alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions? (<span>
                             <button type="button"
                                     className="btn btn-light mr-1"
                                     onClick={() => this.onLikeClick(post._id)}
                             >
                            <i className={`${this.findUserLike(post.likes) ? "text-info" : "text-secondary"} fas fa-thumbs-up`}></i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-light mr-1"
                            onClick={() => this.onUnlikeClick(post._id)}
                        >
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                            {post.user === auth.user.id ? (
                                <button
                                    className="btn btn-danger mr-1"
                                    type="button"
                                    onClick={() => this.onDeleteClick(post._id)}>
                                    <i className="fas fa-times"/>
                                </button>
                            ) : null}
                        </span>) : null}
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onAddLike: PropTypes.func.isRequired,
    onRemoveLike: PropTypes.func.isRequired
};

PostItem.defaultProps = {
    showActions: true
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (id) => dispatch(actions.deletePost(id)),
        onAddLike: (id) => dispatch(actions.addLike(id)),
        onRemoveLike: (id) => dispatch(actions.removeLike( id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);