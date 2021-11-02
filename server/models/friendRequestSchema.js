const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["send", "accept", "denied"],
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = new mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
