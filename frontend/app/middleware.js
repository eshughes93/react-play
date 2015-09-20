/*
Middleware used by dispatch to break up async actions into smaller sync actions.

function takes dispatch and getsate (important redux features)
and returns a function that takes next
  and returns another function that takes an action
    which finally defines the three little actions.
*/
import Client from './api';

const client = new Client();

export default function middleware(dispatch, getState) {
  return next => action => {
    const {types, promise, ...rest} = action;
    if (!promise) return next(action);
    const [START, SUCCESS, ERROR] = types;
    next({...rest, type: START});
    return promise(client, dispatch, getState).then(result => {
      next({...rest, type: SUCCESS, result});
    }, (error) => {
      next({...rest, type: ERROR, error});
    });
  };
}
