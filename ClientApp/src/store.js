import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { MainReducer } from './components/MainReducer';
import { AcquireReducer } from './components/Acquire/AcquireReducer';
import { MonetizationReducer } from './components/Monetization/MonetizationReducer';
import { ErrorModalReducer } from './components/ErrorModal/ErrorModalReducer';

const enhancers = [];

const isDevelopment = process.env.NODE_ENV === 'development';
if(isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())

const configureStore = createStore(

    combineReducers({
        Main: MainReducer,
        Acquire: AcquireReducer,
        Monetization: MonetizationReducer,
        Err: ErrorModalReducer
    }),

    compose(
        applyMiddleware(thunk),
        ...enhancers
    )
);

export default configureStore;