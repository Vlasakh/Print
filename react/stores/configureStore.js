import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../stores/index';


export default function configureStore(initialState = {})
{
    // const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
window.storeRedux = store;
    // const store = createStore(rootReducer, initialState);
    // const logger = createLogger();
    // const store = createStore(rootReducer, initialState, applyMiddleware(logger));
    // if (module.hot)
    // {
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers');
    //         store.replaceReducer(nextRootReducer);
    //     })
    // }
    return store;
}
