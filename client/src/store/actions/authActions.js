import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

//  Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }));
};

// Login  - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            // Set token to Auth Header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwtDecode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        }));
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
};

// Log user out
export const logoutUser = () =>dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setCurrentUser(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};