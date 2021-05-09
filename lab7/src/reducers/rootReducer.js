import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import searchReducer from './searchReducer';
import singleReducer from './singleReducer';

const rootReducer = combineReducers({
    page: pageReducer,
    search: searchReducer,
    single: singleReducer,
});
export default rootReducer;
