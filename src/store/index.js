import { createStore, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers());

  return store;
}

export default configureStore;