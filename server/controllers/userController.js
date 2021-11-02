const User = require("../models/userSchema");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

//User functions
exports.showMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(res.locals.user.id);

  if (!user) return next(new AppError("Could not find user with given id"));

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    res.locals.user.id,
    {
      login: res.body.login,
      email: res.body.email,
      password: res.body.password,
    },
    {
      new: true,
      omitUndefined: true,
      validate: true,
    }
  );

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(res.locals.user.id);

  res.status(201).json({
    status: "success",
    message: "user deleted",
  });
});

//Admin functions
exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(
    {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    },
    {
      new: true,
      omitUndefined: true,
      validate: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "user created",
    user,
  });
});

exports.showUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .fields()
    .sort()
    .pagination();
  const users = await features.queryDB;

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.showUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    },
    {
      new: true,
      omitUndefined: true,
      validate: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "user updated",
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "user deleted",
  });
});
