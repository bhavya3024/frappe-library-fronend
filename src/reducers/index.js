import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import memberReducer from './memberReducer';
import spinReducer from './spinReducer';

const rootReducer = combineReducers({
    bookReducer,
    memberReducer,
    spinReducer,
});

export default rootReducer;