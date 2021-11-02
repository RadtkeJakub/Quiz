const jwt = require("jsonwebtoken");

exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.signAndSaveToken = (user, res) => {
  const token = this.signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  return token;
};
