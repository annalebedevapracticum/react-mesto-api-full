const handleErrors = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  res.status(errorStatus).send({ message: errorStatus === 500 ? 'На сервере произошла ошибка' : err.message });
  next();
};

module.exports = {
  handleErrors,
};
