require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/user');
const catRouter = require('./routes/cats');

mongoose.connect(
  process.env.DB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, 
  () => {
    console.log('connected to mongodb');
  }
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);



app.use('/auth', authRouter);
app.use('/user', usersRouter);
app.use('/cat', catRouter);
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


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`connected to port ${process.env.PORT}`);
});

module.exports = app;
