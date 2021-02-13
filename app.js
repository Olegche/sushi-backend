var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
app.use(cors())
//-----
var app = express();
const {port, databaseName}=require('./config')
     
console.log(`Your port    : ${port}`);  
console.log(`Database name: ${databaseName}`); 
require('./db')
var cors = require('cors')
app.use(cors())
const ProductRouter= require('./app_api/routes/products')
const UserRouter = require('./routes/users')
const OrderRouter = require('./app_api/routes/orders')
const { parseBearer } = require("./utils/token");


const indexRouter = require('./routes')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const openPathes = ['/', '/users/login', '/users/signup', '/products','/orders','/orders/add' ];
  
  if (!openPathes.includes(req.path)) {
    try {
      console.log("req.headers.authorization");
      console.log(req.headers.authorization);

      req.user = parseBearer(req.headers.authorization, req.headers);
    } catch (err) {
      return res.status(401).json({ result: "Access Denied" });
    }
  }
  next();
});

app.use('/', indexRouter);
// app.use('/products', productsRouter);
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
