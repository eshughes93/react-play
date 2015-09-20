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
import {create} from '../actions/todoactions';

@connect( state => ({isSaving: state.isSaving}))
export default class Edit extends Component {
  static propTypes = {
    history: PropTypes.any,
    isSaving: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };
  submit(evt) {
    evt.preventDefault();
    const input = React.findDOMNode(this.refs.newtodo);
    this.props.dispatch(create({title: input.value})).then(() => {
      this.props.history.replaceState(null, '/');
    });
  }
  render() {
    const {isSaving} = this.props;
    return (
      <form className="form" action="#" onSubmit={::this.submit}>
      <p className="lead">
        New todo item:
      </p>
      <div className="input-group input-group-lg">
        <input type="text" className="form-control" ref="newtodo" placeholder="Todo Item" aria-describedby="sizing-addon1" id="newitem" />
      </div>
      <div className="input-group input-group-lg">
        <Link className="btn btn-primary" to="/">Back</Link>
        <input className="btn btn-primary" type="submit"
          value={isSaving ? 'Saving...' : 'Submit'} disabled={isSaving} />
      </div>
    </form>
  );
  }
}
