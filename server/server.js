const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config("./.env");

app.listen(process.env.PORT, () => {
  console.log("server started");
});

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
