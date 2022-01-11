import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { get } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import { disconnect } from './modules/User/actions';

const createHistory = require('history');

const authenticationMiddleware = store => next => (action) => {
    if (
        get(action, 'payload.error.data.statusCode') === 401
    || get(action, 'payload.error.data.message') === 'Unauthorized'
    ) {
        return store.dispatch(disconnect());
    }

    return next(action);
};

export default function configureStore(initialState={}) {
    const isProduction = process.env.NODE_ENV === 'production';
    const history = createHistory.createBrowserHistory();
    const routeMiddleware = routerMiddleware(history);
    const middleware = [
        thunk,
        routeMiddleware,
        authenticationMiddleware
    ];

    const composeEnhancers = isProduction ? compose : window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose; // add support for Redux dev tools

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        ));

    const persist = persistStore(store);

    return { store, history, persist };
}
