const AppError = require('../utils/appError');

const handleCastError = (err) => {
  const message = `Không hợp lệ ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const message = `Tên tài khoản đã tồn tại: ${err.keyValue.name}. Sử dụng tên tài khoản khác!`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => new AppError(err.message, 400);

const handleJWTError = () =>
  new AppError('Mã xác nhận sai', 401);

const handleJWTExpiredError = () =>
  new AppError('Mã xác nhận hết thời hạn', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Lỗi');

    res.status(500).json({
      status: 'error',
      message: 'Lỗi ',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'development '
  )
    sendErrorDev(err, res);
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'production '
  ) {
    let error = Object.assign(err);

    if (error.name === 'Lỗi hiển thị') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'Lỗi xác thực') error = handleValidationError(error);
    if (error.name === 'Lỗi mã') error = handleJWTError();
    if (error.name === 'Mã xác nhận quá hạn') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
