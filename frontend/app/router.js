/*
  extend the backbone router
  so that we can render the appropriate views
*/

import {Router as BaseRouter} from 'backbone';
import IndexView from './views/index';
import EditView from './views/edittodo';
import {TodoList} from './models/todo';
import $ from 'jquery';

const list = new TodoList();
list.fetch();

export default class Router extends BaseRouter {
  routes() {
    // empty string is a root route known by backbone
    return {
      '': 'index',
      'edit': 'edit'
    };
  }
  index() {
    const view = new IndexView({model: list, el: $('#body')});
    view.render();
  }
  edit() {
    const view = new EditView({model: list, el: $('#body')});
    view.render();
  }
}
