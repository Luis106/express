
///Requerimeintos
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

///Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var operationRouter = require('./routes/operator.js');
var pokemonRouter = require("./routes/pokemon.routes.js");
var Taskrouter = require("./routes/task.routes.js");
var authRouter = require("./routes/auth.routes.js");


var app = express();

///Mongoose 
const mongoose = require("mongoose");

const databaseUrl = "mongodb://localhost:27017/todoDB"
const databaseOptions = {
    useNewUrlParser: true
};
mongoose.connect(databaseUrl,databaseOptions );
mongoose.connection.on("open", function(){
    console.log("MongoDB connection opened");
});

//const redis = require("redis")
//global.client  = redis.createClient();

//const util = require("util")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/operaciones', operationRouter);
app.use("/pokemon", pokemonRouter)
app.use("/auth",authRouter)
app.use("/Task", Taskrouter)

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

  // Pass to next layer of middleware
  next();
});

module.exports = app;
