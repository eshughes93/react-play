/*
React index view.
Rendering components using React.
Each component has its own state and props (properties).
Components can have local state if they need it.
  i.e. keeping track of values for different fields in a form.

Props are just properties that get passed into a component
from their parent or owner (in the tree of components).

Re-rendering is usually needed when props or state changes.

You cannot change your own props, but you can change your own state.
Similarly, only you can see your state.
*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {list} from '../actions/todoactions';
import Remove from './removetodo';
@connect( state => ({
  todos: state.todos,
  loaded: state.loaded,
  isLoading: state.isLoading
}))
export default class Index extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    loaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };
  componentWillMount() {
    if (!this.props.loaded) {
      this.props.dispatch(list());
    }
  }
  render() {
    const {todos, loaded, isLoading} = this.props;
    return (<div className="row">
      {(loaded ? todos : []).map((todo, i) =>
       <div className="well" key={i}>
       {todo.title}
       <Remove {...this.props} itemIndex={i} />
       </div>
      )}
      {isLoading && <img src="http://media.giphy.com/media/10kTz4r3ishQwU/giphy.gif" />}
      <p>
        <Link to="/edit">Add To This List</Link>
      </p>
    </div>);
  }
}
