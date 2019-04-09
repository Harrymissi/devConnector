import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';

class CommentItem extends Component{

    onDeleteClick = (postId, commentId) => {
        this.props.onDeleteComment(postId, commentId)
    };
    render() {
        const {comment, postId, auth} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block"
                                 src={comment.avatar} alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {comment.text}
                        </p>
                        {comment.user === auth.user.id ? (
                            <button
                                className="btn btn-danger mr-1"
                                type="button"
                                onClick={() => this.onDeleteClick(postId, comment._id)}>
                                <i className="fas fa-times"/>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteComment: (postId, commentId) => dispatch(actions.deleteComment(postId, commentId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);