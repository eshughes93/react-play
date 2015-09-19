/*
Utilizing backbone to manage our "todo" items
by extending backbone classes.

Backbone has default semantics for a RESTful interface (get, post, put, delete).
*/

import {Model, Collection} from 'backbone';

export class Todo extends Model {
  defaults() {
    return {title: 'none'};
    // title meaning the title of the todo item
  }
}

export class TodoList extends Collection {
  url() {
    return '/api/todos';
  }
  model = Todo;
}
