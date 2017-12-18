// external modules
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// internal modules
import TennisScoreTracker from './src/main/Container';
import reducers from './src/main';
import { matchScoreFactory } from './src/main/scoreCalculator/scoreFactories';

const appReducers = combineReducers({
  ...reducers
});

const initialState = {
  score: matchScoreFactory()
};

const store = createStore(appReducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <TennisScoreTracker />
  </Provider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // $FlowIssue Enable Webpack hot module replacement for reducers
    module.hot.accept();
  }
}
