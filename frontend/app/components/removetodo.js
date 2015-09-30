/*
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
import {Glyphicon, Button} from 'react-bootstrap';
import {remove} from '../actions/todoactions';

@connect( state => ({isSaving: state.isSaving}))
export default class Remove extends Component {
  static propTypes = {
    history: PropTypes.any,
    itemIndex: PropTypes.number,
    isSaving: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };
  handleClick() {
    this.props.dispatch(remove(
      {itemIndex: this.props.itemIndex}
    )).then(() => {
      this.props.history.replaceState(null, '/');
    });
  }
  render() {
    return (
      <Button bsSize="xsmall"
        onClick={::this.handleClick} >
        <Glyphicon glyph="remove" />
      </Button>
    );
  }
}
