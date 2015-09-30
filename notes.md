## React-Play Notes
***

Quick document to go over what we did in this simple todo application
using React. We will go over some react paradigms, the app structure,
and the purpose of each file.

We separate our application into a frontend and a backend.
The frontend as a whole is 'stateless'. It is in charge of rendering HTML.

The backend has state (global state, the database). It communicates using
json, sending and receiving information. It interfaces with the database.

Both coexist in the server.

You could potentially, easily, load-balance the frontend.
It is more difficult to do this with the backend.
You could run into race conditions.

The browser is it's own separate entity that simply receives HTML.

***

### Miscellaneous notes

Useful Links
- [Redux Docs](https://rackt.github.io/redux/docs/introduction/index.html)
- [React Docs](http://facebook.github.io/react/docs/getting-started.html)

Global state is really just the backend (database).

State here is referring to the state of components in your browser.
React will let us wire up events.
Provide us with a tree of components.

Redux helps us retain state in our application.

We have a global store (app object) that holds on to a 'state'.
(What is currently in your browser. state changes when your page loads, etc.
Different states like loading, successful, failed).


3 main features:
1) get state
2) dispatch action
  - we define actions which will be dispatched
  - dispatching an action causes your state to be changed, according to a 'reducer'

- a reducer is a 'pure' function that goes from state -> action -> state
- react components are dependent on state, so when state changes so do the react components

3) connect (using react-redux)
  - 'connects' react components to the state

***
### The Backend

- backend/
  - index.js
  - todo.js
  - todolist
The backend consists of a simple router that returns a few things
in json format.

- `todo.js`
This is the program which interacts with a file (`todolist`) that
contains our todo items (which would be a real database in a larger,
more legitimate application). todo.js in an MVC architecture would be
the *model*.

- `index.js`
This is the program that does the routing. We are using an Express js
framework. We define various actions to compose a RESTful API. This
means we design and define different routes in a URL to make various
GET, PUT, DELETE, POST, etc, calls. This program has simple GET and POST calls to a `/todos` route.
Running on localhost on port 3001, then, means that these routes
are accessible via `http://localhost:3001/todos`.

However, this is just the backend. We actually want to proxy to these
routes hidden behind an API route from the frontend.
So, the backend will listen on port 3001, in order to send or receive
information from the frontend. You'll notice that there is no HTML or
anything that might be considered part of a VIEW in an MVC architecture
in the backend.

### The Frontend

- frontend/
  - index.js
  - app/
    - actions/
      - todoactions.js
    - components/
      - edittodo.js
      - index.js
    - reducers/
      - todoreducer.js
    - api.js
    - app.js
    - history.js
    - page.js
    - router.js

This is the basic structure of the frontend of the application.

Mostly everything is contained within the `app` directory.
There is also, however, `index.js`, stored at the top level.

We are using `index.js` to initialize another instance of express.
This one serves as a proxy interface to the backend instance.
This way, we can define routes that simply make api calls to the
backend where the actual database management is done.

Next is the `app` directory.
Within it are 3 directories that are core components of react-redux,
but first we will look at the standalone files.

### `api.js`
A simple class wrapper that represents our frontend client.
It uses superagent to make http requests that are handled by
our frontend express instance, which ultimately talks to the
backend.

### `app.js`
There is some magic happening here, that I don't yet fully understand.
We are using redux here to define the store, a single object
that holds the state of the entire tree for the application.
We are using React to render a view into the document body,
and that view is handled by react-redux.
React-redux is wrapping our root React component in a <Provider>,
which makes the Redux store available to the connect() calls, which
connect the React components to the Redux store.

### `middleware.js`
The custom middleware we have written here is used by dispatch (a redux
feature) to break up async actions into smaller synchronous actions.

We have a function that takes dispatch and getState (important redux features)
and returns a function that takes 'next'.

[middleware documentation](https://rackt.github.io/redux/docs/api/applyMiddleware.html)
From the redux applyMiddleware(...middlewares) documentation...

Middleware is the suggested way to extend Redux with custom functionality.
Middleware lets us wrap the store's dispatch method.
Each middleware receives Store's dispatch and getState functions as named
arguments, and returns a function. That function is given to the **next**
middleware's dispatch method and is expected to return a function of **action**
calling `next(action)` with a potentially different argument, or at a different
time, or maybe not calling it at all.
The last middleware in the chain will receive the real store's **dispatch** method
as the **next** parameter, thus ending the chain.
The middleware signature is `({getState, dispatch}) => next => action`.

This is exactly what our middleware does.

### `router.js`
This file helps us use the React routing library (react-router). It keeps our UI
in sync with the URL. We create our own Router class extending the Component class
of React, adding a method to render (in JSX) react-router components that define our
frontend route paths ('/' and '/edit' in our case).


Finally we'll get into the subdirectories of the frontend.
We have 3 -- `actions`, `components`, and `reducers`.

### `actions/todoactions.js`
This is a Redux file that defines **actions**.
**Actions** define how we can actually change our application.
They define exactly what we **can** do, as opposed to actually doing anything.

By default, there are 2 types of actions. There can be more, but these
make sense on their own already.

First we have 'simple', synchronous actions that deal with simple objects or
other data. These have one key 'type'.

Secondly, and more importantly, we have asynchronous actions.
Async actions have two *keys*.
There is the key 'types' which can be 1 of 3 values:
  - 'start'
  - 'completed'
  - 'error'
There is also the key 'promise'.

An asynchronous action is really made up of 3 synchronous actions.
These 3 sync actions are the 'types', hence the simple sync actions
each having a single 'type' key (being one of the 3 async 'types').

We define each action as a function that returns an object. For our purpose
we have two functions, one to list our todo items on the page, and one to
create a new item. Each action has a list of types, with our own named
start, completed, and error 'types'. We also have a promise key that maps to a
function that takes a client (as we defined in `api.js`), and returns a client
action (GET for listing our items, POST for creating a new one).

Keep in mind we may want to add extra keys or values to our actions, so that we can
access them when we want to use an action.

For example, our create action defines what we can do when we want to create
an item. Our types are 'ITEM_SAVE' (we need to *start* saving the item to the server),
'ITEM_SAVE_SUCCESS' (we *completed* saving the item), and 'ITEM_SAVE_FAIL' (there
was an *error* when we tried to save the item to the server). We have a *promise*
that makes a call to the backend using the client (just look at the code for that one).

Finally, we pass in a third key, **item**. Our action is defined as a function that
takes an item (that we want to add to our todo list), but we need to hold on to this
item so that we can render it on the page along with the other items (which we
already have from when we initially loaded the page), without talking to the server
about the new item (aside from sending the item to the server. Why get the new item or
the already existing list from the server when we already have both these things?).
Since our action holds on to the new item we are creating, and the existing list is
already accessible, we can easily access them when the time comes to render it all.

### `reducers/todoreducer.js`

Reducers are the most important component of Redux. Implementing a functional
programming paradigm, reducers are **pure functions** that take a state and an
action (as we defined in `todoactions.js`), and returning a **new** state based
on that action. They define how we can mutate the state (returning a new state,
not actually changing the old one) based on what actions we want to dispatch.

Reducers only have one exported function, typically composed of a large switch
statement that switches based on the action's type.

The state is always flat (usually immutable) JSON. Simple, easily serialized.

In our case, we set up an initialState that we call upon in the case of an
uninitialized state. The state should tell you what you need to know about a
component. In our case, we have 'loaded', a boolean telling us if a component
has loaded or not, 'todos', a list of todo items, 'isLoading' and 'isSaving',
booleans telling us whether or not a component is in the process of loading or
saving, and 'error', which doesn't really have a type and starts out as null.

So, inside our reducer function, we look at the type of action we want to dispatch.
Then, based on the type of this action (i.e. an item is saving to the server, so we
have a type 'ITEM_SAVE', or an item has finished saving to the server, so we have a
type 'ITEM_SAVE_SUCCESS', as discussed preivously), we mutate the state. We first
take in the old state to preserve the properties of the state that won't be changing,
and then mutate the ones that are. in the case of an action type like
'ITEM_SAVE_SUCCESS', we set 'isSaving' to false (we are done saving), and we mutate
the list of todo items in 'todos' to be the previous state's todos plus the new
item (under action.item, as we added this extra property to the state since we
knew we would need it later).

### `components/` , `edittodo.js` and `index.js`
Under the components directory we define our different React components.
Using react, our VIEW in MVC is composed of a tree of components. Each component
has it's own state and properties (props). Components can have local state if they
need it, such as a form component that keeps track of values for different fields.

Props are just properties that get passed into a component from their parent or
owner in the tree of components. When a component's state or props change, it usually
means that the component needs to re-render to represent the change.

A component cannot change it's own properties. It can, however, change it's own state.
Similarly, a component's state is only visible to itself, which is not the case with
props.

Similar to our `router.js` file that extends the React Component class, each file
in the `components/` directory will export a single class that also extends the
React Component class. React is all about the VIEW in MVC, and here is where
we define these different views. `index.js` gives us our default view that displays
the todo list, and `edittodo.js` provides us with the view we see when we want to
edit the list and add something new.

An important thing here is the fact that we **connect** our React components to
redux. Redux helps us keep track of our state, which affects the way the view is
represented to the user.

So, each component has an object propTypes. propTypes contains the props of the
state in an action that we want to monitor for a given component. In propTypes
we validate the type (here referring to actual programming type) of each property
based on what is available via the [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) class of React.

We also define the render() method to define how we want to represent the view.
Although we can use pure JavaScript with React, it is often easier to use JSX
in these render methods. The render() method returns a JSX block that is ultimately
turned into HTML for the browser to present to the user.

This part is a little bit easier understood by looking at the code.
