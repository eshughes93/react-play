/*
webpack is bundling everything together.
This way all of our frontend javascript is placed in a single file.
Webpack handles dependencies, modules, ES6 etc.

Webpack is the "newer" way of doing this (as compared to Browserify)
*/
import $ from 'jquery';

$(() => {
  $('#body').html('23');
});
