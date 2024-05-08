import { MEMBER_SELECTED } from '../actions/member';

const initialState = { bookId: 0 };

function bookReducer(state = initialState, action) {
    switch (action.type) {
        case MEMBER_SELECTED:
            return { ...state, memberId: action.state.memberId };
        default:
            return state;
    }
}

export default bookReducer;