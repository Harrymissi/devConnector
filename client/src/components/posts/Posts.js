import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import * as actions from "../../store/actions";

class Posts extends Component{
    componentDidMount() {
        this.props.onGetPost();
    }
    render() {
        const {posts, loading} = this.props.post;
        let postContent;

        if (posts === null || loading) {
            postContent = <Spinner/>;
        } else {
            postContent = <PostFeed posts={posts} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm/>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    onGetPost   : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

const mapDispatchToProps = dispatch => {
    return {
        onGetPost: () => dispatch(actions.getPost())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);