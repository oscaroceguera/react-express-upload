var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload')
var cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(fileUpload())
app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res, next) => {
  // console.log(req)
  let imageFile = req.files.file

  // console.log('imageFile', imageFile)
  // console.log('imageFile.mv', imageFile.mv)
  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.json({ file: `public/${req.body.filename}.jpg` })
  })
})

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
