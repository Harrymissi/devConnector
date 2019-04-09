import * as actionTypes from '../actions/types';

const initialState = {
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERRORS:
            return action.payload;
        case actionTypes.CLEAR_ERROR:
            return {};
        default:
            return state;
    }
};

export default reducer;