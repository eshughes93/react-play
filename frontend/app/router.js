/*
react-router

*/
import {Router as BaseRouter, Route} from 'react-router';
import React, {Component} from 'react';
import Index from './components/index';
import Edit from './components/edittodo';

export default class Router extends Component {
  render() {
    return (
      <BaseRouter>
        <Route path="/" component={Index} />
        <Route path="/edit" component={Edit} />
      </BaseRouter>
    );
  }
}
