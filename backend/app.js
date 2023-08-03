const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://r0-0ky.nomoreparties.co',
  ],
  credentials: true,
};

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', require('./requestValidation').loginBodyValidator, require('./controllers/login').login);
app.post('/signup', require('./requestValidation').createUserBodyValidator, require('./controllers/users').createUser);

app.get('/signout', (req, res) => res.clearCookie('jwt'));

app.use(require('./middlewares/auth'));
app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(require('./middlewares/errorHandle'));

app.listen(PORT);
