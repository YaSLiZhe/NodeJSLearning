const fs = require('fs');
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value:${value},Please use another use`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(' . ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid Token. Please log it again', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token is expired, please login it again', 401);

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    //RENDERED
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    //Operational Error We trusted:Send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
      });
    }
    //Programming Error, don't leak detail to client

    //1} Log Error
    // console.error('Error', err);
    //2} Send Generic Error
    return res.status(err.statusCode).render('error', {
      title: 'Something wen wrong',
      message: 'Something went Wrong!',
    });
  }
  //Rendered web
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later',
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {
      ...err,
      name: err.name,
      code: err.code,
      message: err.message,
    };
    //Bug error.name = undefined, solved by adding name: err.name, code: err.code

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    //Bug error.name = undefined, solved by adding name: err.name, code: err.code
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
