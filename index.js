require('dotenv').config();

const express            = require('express');
const mustacheExpress    = require('mustache-express');
const bodyParser         = require('body-parser');
const pgp                = require('pg-promise')();

const session            = require('express-session');
const cookieParser       = require('cookie-parser');

const logger             = require('morgan');

const port               = process.env.PORT || 3000;

const flash              = require('flash');
const app                = express();

const router             = require('express').Router();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(logger('dev'));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Articles = require('./models/articles-model');

app.get('/',
  Articles.getRandomArticle,
  (req, res) => {
    function messageTimeOut() {
      return function(value, render) {
        if (res.locals.flash.length !== 0) {
          var elDeleted = res.locals.flash.shift();
          return elDeleted.message;
        }
        else {
          return "";
        }
      }
    };
    res.render('index', {
       messageTimeOut: messageTimeOut,
       article: res.locals.article
 });
});

const userController = require('./controllers/user-controller');
app.use('/user', userController);

const rememboxController = require('./controllers/remembox-controller');
app.use('/home', rememboxController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
