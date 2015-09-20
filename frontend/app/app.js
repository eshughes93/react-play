/*
webpack is bundling everything together.
This way all of our frontend javascript is placed in a single file.
Webpack handles dependencies, modules, ES6 etc.

Webpack is the "newer" way of doing this (as compared to Browserify)
*/
import Router from './router';
import reducer from './reducers/todoreducer';
import middleware from './middleware';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

const store = applyMiddleware(middleware)(createStore)(reducer);
React.render(
  <Provider store={store}>{() => <Router />}</Provider>,
  document.getElementById('body')
);
