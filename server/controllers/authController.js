const catchAsync = require("../utils/catchAsync");
const { signAndSaveToken } = require("../utils/jwt");
const User = require("../models/userSchema");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = catchAsync(async (req, res, next) => {
  if (!req.body || !req.body.login || !req.body.email || !req.body.password)
    return next(new AppError("Name, Email and Password are required", 401));
  const { login, email, password } = req.body;

  const user = await User.create({ login, email, password });
  console.log(user.socketId);
  res.status(200).json({
    status: "success",
    message: "user created",
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body)
    return next(new AppError("Email and Password are required", 401));

  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Email and Password are required", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return next(new AppError("Could not find user with given email", 401));

  const isPasswordCorrect = await user.comparePassword(password, user.password);

  if (!isPasswordCorrect) return next(new AppError("Wrong password"), 401);

  signAndSaveToken(user, res);

  res.status(200).json({
    status: "success",
    message: "Logged in",
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now * 10 * 1000),
  });

  res.status(200).json({
    status: "success",
    message: "logged out",
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user)
    return next(new AppError("Could not find user with given email"), 401);

  const resetToken = await user.createResetToken();

  const resetLink = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

  const message = ``;

  user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      to: email,
      subject: "",
      message: resetLink,
    });

    res.status(200).json({
      status: "success",
      message: "Reset token send",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const resetToken = req.params.resetKey;

  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Invalid or expired token", 401));

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.password = req.body.password;

  user.save();

  signAndSaveToken(user, res);

  res.status(200).json({
    status: "success",
    message: "password changed",
  });
});
