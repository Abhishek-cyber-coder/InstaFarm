const commonError = (err, req, res, next) => {
  console.log(err);
  return res.status(400).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = commonError;
