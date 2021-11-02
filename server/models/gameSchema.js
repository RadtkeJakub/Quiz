const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  players: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    immutable: true,
  },
  winner: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    immutable: true,
  },
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
      diff: {
        type: String,
        required: true,
        enum: ["easy", "medium", "hard"],
      },
      questions: [
        {
          content: {
            type: String,
            required: true,
          },
          players: {
            type: [mongoose.Schema.ObjectId],
            ref: "User",
            immutable: true,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Game = new mongoose.model("Game", gameSchema);

module.exports = Game;
