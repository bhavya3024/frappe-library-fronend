import { ENABLE_SPIN, DISABLE_SPIN } from '../actions/spinner';

const initialState = { enable: false };

function spinReducer(state = initialState, action) {
    switch (action.type) {
        case ENABLE_SPIN:
            return { ...state, enable: true };
        case DISABLE_SPIN:
            return { ...state, enable: false }
        default:
            return state;
    }
}

export default spinReducer;