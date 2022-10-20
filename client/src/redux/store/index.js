import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import listenerSaga from '../sagas';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
    const composeEnhancer =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        persistedReducer,
        composeEnhancer(applyMiddleware(sagaMiddleware))
    );
    const persistor = persistStore(store);
    sagaMiddleware.run(listenerSaga);
    return { store, persistor };
};

export default configureStore;
