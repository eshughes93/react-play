/*
Simple web service to act like a blog
and do simple CRUD operations.
Or maybe something simpler.
Architecture:

Separate into frontend and backend.

Frontend is stateless. In charge of rendering HTML.

Backend has state. Communicates using json (sends and receives).
Interfaces with database.

Both coexist in the server.

Could load-balance the front end easily
(not so for the backend - may run into race conditions).

Browser is a separate entity - simply receives HTML.
*/
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import proxy from 'express-http-proxy';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

const backend = 'http://localhost:3001';

app.use('/api', proxy(backend));
app.use(express.static('public'));
app.use(express.static('build'));

app.listen(3000, () => {
  /* eslint no-console:0 */
  console.log('listening on 3000');
});
