import {View} from 'backbone';
import template from '../templates/edittodo.hbs';

export default class EditView extends View {
  render() {
    this.$el.html(template({todos: this.model.toJSON()}));
    this.input = this.$('#newitem');
  }
  events() {
    return {'submit form': 'submit'};
  }
  submit(evt) {
    evt.preventDefault();
    this.model.create({title: this.input.val()});
    window.router.navigate('');
  }
}
