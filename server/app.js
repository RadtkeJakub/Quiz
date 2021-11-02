const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/users", userRouter);

app.use(errorHandler);

const port = process.env.PORT;

const io = require("socket.io")(port);

io.use((socket, next) => {
  socket.handshake.cookies;

  next();
});

io.on("connection", (socket) => {
  let id;

  socket.on("login");
});

module.exports = app;
