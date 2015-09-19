// This is our model

import fs from 'mz/fs';
import _ from 'lodash';
const tdlist = 'todolist';

function ensureListExists() {
  return fs.exists(tdlist).then((exists) => {
    if (!exists) {
      return fs.writeFile(tdlist, '');
    }
  });
}

export function getAllTodo() {
  return ensureListExists().then(() => {
    return fs.readFile(tdlist, 'utf-8');
  }).then(items => {
    return items.split(/\n/).slice(0, -1).map( title => ({title}));
  });
}

export function addTodoItem(item) {
  return ensureListExists().then(() => {
    return fs.appendFile(tdlist, item.title + '\n');
  });
}

export function rmTodoItem(index) {
  return ensureListExists().then(() => {
    return getAllTodo();
  }).then(items => {
    items.splice(index, 1);
    const itemsWithNL = items.map(i => [i, '\n']);
    return fs.writeFile(tdlist, _.flatten(itemsWithNL));
  });
}
