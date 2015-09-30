/*
Simple web service to act like a blog
and do simple CRUD operations.
Or maybe something simpler.

This is our controller.
*/
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as todo from './todo.js';

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/todos', (req, res, next) => {
  todo.getAllTodo().then( list => {
    res.send(list);
  }).catch((err) => {
    next(err);
  });
});

app.post('/todos', (req, res, next) => {
  todo.addTodoItem(req.body).then(() => {
    res.send({msg: 'added todo item'});
  }).catch((err) => {
    next(err);
  });
});

app.put('/todos', (req, res, next) => {
  todo.rmTodoItem(req.body).then(() => {
    res.send({msg: 'removed todo item'});
  }).catch((err) => {
    next(err);
  });
});

app.listen(3001, () => {
  /* eslint no-console:0 */
  console.log('listening on 3001');
});
