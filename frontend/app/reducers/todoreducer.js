/*
Reducer defines how to change the state based on what actions we dispatch.

Reducer definitions only have one exported function.
Take a state and an action, and return a new state.

Typically have a large switch statement.

Switch on the action's type.

State is always flat (usually immutable) json. Simple, easily serialized.


*/

const initialState = {
  loaded: false,
  todos: [],
  isLoading: false,
  isSaving: false,
  error: null
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
  case 'LIST_LOAD': return {
    ...state,
    isLoading: true
  };
  case 'LIST_SUCCESS': return {
    ...state,
    isLoading: false,
    loaded: true,
    todos: action.result.body
  };
  case 'LIST_FAIL': return {
    ...state,
    isLoading: false,
    error: action.error
  };
  case 'ITEM_SAVE': return {
    ...state,
    isSaving: true
  };
  case 'ITEM_SAVE_SUCCESS': return {
    ...state,
    isSaving: false,
    todos: [...state.todos, action.item]
  };
  case 'ITEM_SAVE_FAIL': return {
    ...state,
    isSaving: false,
    error: action.error
  };
  default: return state;
  }
}
