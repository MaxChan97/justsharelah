import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers'


const persistConfig = {
    key: 'reducer',
    storage: storage,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))
const persistor = persistStore(store);

export {persistor, store};

