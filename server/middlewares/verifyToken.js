import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log("no token");
    return;
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("unauthprised");
      return;
    }
    req.user = user;
    next();
  });
  console.log(verify);
};
