let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let queryUsers = require('./routes/query-users/query-users.js');    //用户信息
let loginAuthority = require('./routes/authority/login.js');        //登录权限
let lesson = require('./routes/lesson/lesson');                     //课程
let labs = require('./routes/labs/labs');                           //实验室
let usersManage = require('./routes/users/users');                  //用户管理

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'webs')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/users', users);
app.use('/api/v1/queryUsers', queryUsers);      //用户信息
app.use('/api/v1/login', loginAuthority);       //登录
app.use('/api/v1/lesson', lesson);              //课程
app.use('/api/v1/labs', labs);                  //实验室
app.use('/api/v1/users', usersManage);          //用户管理

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
