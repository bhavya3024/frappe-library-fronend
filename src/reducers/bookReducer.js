import { BOOK_SELECTED } from '../actions/books';

const initialState = { bookId: 0 };

function bookReducer(state = initialState, action) {
    switch (action.type) {
        case BOOK_SELECTED:
            return { ...state, bookId: action.state.bookId };
        default:
            return state;
    }
}

export default bookReducer;