export const errorHandler = (err, req, res, next) => {
  console.log("inside middleware");
  const status = err.statusCode || 500;
  console.log(status);
  console.log(err.message);
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
