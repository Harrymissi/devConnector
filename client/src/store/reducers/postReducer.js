import * as actionTypes from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts] // is equal to state.posts.concat(action.payload)
            };
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case actionTypes.GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        case  actionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state
    }
};

export default postReducer;