import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return;
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return;
    }
    req.user = user;
    next();
  });
};
