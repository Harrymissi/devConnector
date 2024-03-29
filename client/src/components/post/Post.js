import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import * as actions from "../../store/actions";

class Post extends Component{
    componentDidMount() {
        this.props.onGetPostById(this.props.match.params.id);
    }
    render() {
        const {post, loading} = this.props.post;
        let postContent;
        
        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner/>;
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed comments={post.comments} postId={post._id}/>
                </div>
            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back to Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    onGetPostById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

const mapDispatchToProps = dispatch => {
    return {
        onGetPostById: (id) => dispatch(actions.getPostById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);