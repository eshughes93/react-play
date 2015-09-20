/*
REDUX
Actions will define how we can actually change our application.

Defines exactly what we can do.

Here we don't actually 'do' anything, only define what we *can* do.

By default 2 types of actions (can have more but these make more sense).
- simple, synchronous actions (simple objects or other data)
  - one 'type'
- async actions
  - key 'types' containing start, completed, or error 'types'
  - key 'promise'

An asynchronous action is really 3 synchronous actions (the types)

*/

// An action to 'list' todo items.
// Simply returns our todo action.
// can think of this like a 'constructor' for an action.
// Nothing happens until we *dispatch* these actions.
// List will be asynchronous (we are loading from the server).
// the object we return needs the two keys of an asynchronous action (types and promise)
export function list() {
  return {
    types: [
      'LIST_LOAD',
      'LIST_SUCCESS',
      'LIST_FAIL'
    ],
    promise: client => {
      return client.get('/todos');
    }
  };
}

export function create(item) {
  return {
    types: [
      'ITEM_SAVE',
      'ITEM_SAVE_SUCCESS',
      'ITEM_SAVE_FAIL'
    ],
    promise: client => {
      return client.post('/todos', item);
    },
    item
  };
}
