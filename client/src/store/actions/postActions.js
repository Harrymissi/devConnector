import * as actionTypes from './types';
import axios from 'axios';

// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    dispatch(clearErrors());
    axios.post('http://localhost:5000/api/posts', postData)
        .then(res => dispatch({
            type: actionTypes.ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
};

// Get Post
export const getPost = () => dispatch => {
    dispatch(setPostLoading());
    axios.get('http://localhost:5000/api/posts')
        .then(res => dispatch({
            type: actionTypes.GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_POSTS,
            payload: null
        }))
};

// Get Post by ID
export const getPostById = (id) => dispatch => {
    dispatch(setPostLoading());
    axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_POST,
            payload: null
        }))
};

// Set Loading State
export const setPostLoading = () => {
    return {
        type: actionTypes.POST_LOADING
    }
};

// Clear Errors
export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
};
// Delete Post
export const deletePost = id => dispatch => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
        .then(res => dispatch({
            type: actionTypes.DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
};

// Add like: It actually adds the users into likes array
export const addLike = id => dispatch => {
    axios.post(`http://localhost:5000/api/posts/like/${id}`)
        .then(res => dispatch(getPost()))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
};

// Remove like
export const removeLike = id => dispatch => {
    axios.post(`http://localhost:5000/api/posts/unlike/${id}`)
        .then(res => dispatch(getPost()))
            .catch(err => dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }))
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`http://localhost:5000/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
};