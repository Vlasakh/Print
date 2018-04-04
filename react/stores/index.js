import { combineReducers } from 'redux';

import PagesStore from './PagesStore';


const reducers = {
    pages: () => ({
        pages: 4,
        start: 1,
    })
    // pages: Framework.getHandler(mainPageReducer),
};

export default combineReducers(reducers);
