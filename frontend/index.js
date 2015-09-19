/*
Simple web service to act like a blog
and do simple CRUD operations.
Or maybe something simpler.

This is our controller.
*/
import express from 'express';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import request from 'superagent';

const app = express();

app.engine('hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

const backend = 'http://localhost:3001';

app.get('/', (req, res, next) => {
  request.get(`${backend}/todos`).then( ({body: list}) => {
    res.render('index', {
      title: 'Slick Todo List',
      todos: list
    });
  }, (err) => {
    next(err);
  });
});

app.post('/', (req, res, next) => {
  request.post(`${backend}/todos`).send({title: req.body.newtodoitem})
  .then(() => {
    res.redirect('/');
  }, (err) => {
    next(err);
  });
});

app.get('/edit', (req, res) => {
  res.render('edittodo', {
    title: 'Edit todo list'
  });
});

app.listen(3000, () => {
  /* eslint no-console:0 */
  console.log('listening on 3000');
});
