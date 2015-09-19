import {View} from 'backbone';
import template from '../templates/index.hbs';

export default class IndexView extends View {
  render() {
    // every view in backbone has an element $el, a jquery element for that view
    this.$el.html(template({todos: this.model.toJSON()}));
  }
  initialize() {
    this.listenTo(this.model, 'all', this.render);
  }

}
