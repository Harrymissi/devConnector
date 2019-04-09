import * as actionTypes from '../actions/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload)
            };
        default:
            return state;
    }
};

export default reducer;