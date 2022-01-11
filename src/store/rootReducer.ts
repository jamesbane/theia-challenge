import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from './modules/User/reducer';
import appReducer from './modules/App/reducer';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    router: routerReducer,
});

export default rootReducer;