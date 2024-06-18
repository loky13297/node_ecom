const successHandler = (req, res, status, message = "success", data) => {
  return res.status(status).json({ message, data });
};

const errorHandler = (req, res, status, message = "error", data = {}) => {
  return res.status(status).json({ message, data });
};

module.exports = { successHandler, errorHandler };
