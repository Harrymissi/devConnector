import axios from 'axios';

import * as actionTypes from './types';

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('peaceful-gorge-45148.herokuapp.com/api/profile')
        .then(res =>
            dispatch({
                type: actionTypes.GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: actionTypes.GET_PROFILE,   // 不一定所有的用户都有profile，所以找不到不算error，返回一个空的obj即可
            payload: {}
        }))
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('peaceful-gorge-45148.herokuapp.com/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            //console.log(err.response.data);
            dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        })});
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete('peaceful-gorge-45148.herokuapp.com/api/profile')
            .then(res => dispatch({
                type: actionTypes.SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }))
    }
};

// Profile Loading
export const setProfileLoading = () => {
    return {
        type: actionTypes.PROFILE_LOADING
    }
};

// Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_PROFILE
    }
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('peaceful-gorge-45148.herokuapp.com/api/profile/experience', expData)
        .then(res => {
            console.log(res.data);
            history.push('/dashboard')
        })
        .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }));
};

// Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios.delete(`peaceful-gorge-45148.herokuapp.com/api/profile/experience/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }));
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
    axios.post('peaceful-gorge-45148.herokuapp.com/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }));
};

// Delete Education
export const deleteEducation = (id) => dispatch => {
    axios.delete(`peaceful-gorge-45148.herokuapp.com/api/profile/education/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }));
};

// Get All Profiles
export const getAllProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('peaceful-gorge-45148.herokuapp.com/api/profile/all')
        .then(res =>
            dispatch({
                type: actionTypes.GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: null
        }))
};

// Get All Profiles by Handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`peaceful-gorge-45148.herokuapp.com/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: actionTypes.GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: null
        }))
};