import { combineReducers } from 'redux';

import tasksReducer from './tasksReducer';
import userReducer from './userReducer';

export default combineReducers({
    tasks: tasksReducer,
    user: userReducer
});
