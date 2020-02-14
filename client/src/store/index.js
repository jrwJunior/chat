import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';

import tokenMiddleware from 'middlewares';
import rootSaga from 'sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
      tokenMiddleware,
      sagaMiddleware
    )
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;