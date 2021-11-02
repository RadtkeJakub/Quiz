const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      minLength: [4, "Min name length: 4"],
      maxLength: [16, "Max name length: 16"],
      validate: /^[A-Za-z0-9_-]*$/,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: [8, "Min password length: 8"],
      maxLength: [16, "Max password length: 16"],
      validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/,
      unique: true,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
      unique: true,
      default: function () {
        return uuid();
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);

  next();
});

userSchema.methods.comparePassword = async function (
  passwordToConfirm,
  password
) {
  return await bcrypt.compare(passwordToConfirm, password);
};

userSchema.methods.createResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
